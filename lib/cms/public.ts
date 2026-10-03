import { publishedRecords } from './records';
import { products } from '@/lib/catalog';
export async function publicContent(path:string){return (await publishedRecords()).find(r=>r.published?.path===path&&['page','article','guide'].includes(r.kind)&&!r.published?.preserveLayout)?.published||null;}
export async function publicProducts(){const all=await publishedRecords();const records=all.filter(r=>r.kind==='product'&&r.published?.product);return all.some(r=>r.kind==='settings')?records.map(r=>({...r.published!.product!,copySq:r.published!.productSq})):products;}
