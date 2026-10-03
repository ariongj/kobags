import { db, bucket, audit, now, CmsError } from './core';

const tables = ['cms_records','cms_versions','cms_inquiries','cms_companies','cms_quotes','cms_artwork','cms_approvals','cms_orders','cms_media','cms_events','cms_outbox','cms_redirects'];
export async function backupData(actor:string) {
 await audit('backup',actor,'backup-export').run();
 const results=await db().batch(tables.map(table=>db().prepare(`SELECT * FROM ${table}`)));
 const data:Record<string,unknown>={format:'kobags-cms-backup-v1',createdAt:now(),files:'Original source assets are supplied in the website source bundle. Uploaded bytes are in the full backup archive.'};
 tables.forEach((table,index)=>{data[table]=results[index].results.map(row=>{const copy={...row as Record<string,unknown>};delete copy.portal_hash;delete copy.portal_expires;return copy;});});
 return data;
}

// A streamed, uncompressed ustar archive avoids loading videos into Worker memory.
function tarHeader(name:string,size:number) {
 const header=new Uint8Array(512),encoder=new TextEncoder();
 const set=(offset:number,text:string)=>header.set(encoder.encode(text),offset);
 set(0,name);set(100,'0000600\0');set(108,'0000000\0');set(116,'0000000\0');
 set(124,size.toString(8).padStart(11,'0')+'\0');set(136,Math.floor(Date.now()/1000).toString(8).padStart(11,'0')+'\0');
 header.fill(32,148,156);set(156,'0');set(257,'ustar\0');set(263,'00');
 set(148,header.reduce((sum,n)=>sum+n,0).toString(8).padStart(6,'0')+'\0 ');return header;
}
const padding=(size:number)=>new Uint8Array((512-size%512)%512);
export async function backupArchive(actor:string){
 const data=await backupData(actor);
 const media=(data.cms_media as {object_key:string;size:number}[]).filter(row=>!row.object_key.startsWith('asset:'));
 if(media.length>500)throw new CmsError(422,'This collection needs an operator-managed bucket export. Download the database backup and export the matching object keys.');
 const encoder=new TextEncoder(),json=encoder.encode(JSON.stringify(data));
 async function* entries(){
  yield tarHeader('backup.json',json.length);yield json;yield padding(json.length);
  for(const row of media){
   if(!/^(public|private)\/[a-f0-9-]+$/.test(row.object_key))throw new Error('Invalid stored object key');
   const object=await bucket().get(row.object_key);if(!object||object.size!==row.size)throw new Error('Backup object is missing or has changed');
   yield tarHeader('files/'+row.object_key,object.size);
   const reader=object.body.getReader();try{while(true){const chunk=await reader.read();if(chunk.done)break;yield chunk.value;}}finally{reader.releaseLock();}
   yield padding(object.size);
  }
  yield new Uint8Array(1024);
 }
 const iterator=entries();
 return new Response(new ReadableStream<Uint8Array>({async pull(controller){try{const item=await iterator.next();if(item.done)controller.close();else controller.enqueue(item.value);}catch(e){controller.error(e);}},async cancel(){await iterator.return(undefined);}}),{headers:{'Content-Type':'application/x-tar','Content-Disposition':'attachment; filename="kobags-cms-full-backup.tar"','Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff'}});
}
