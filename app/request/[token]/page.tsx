import CustomerPortal from '@/components/cms/portal';
export const dynamic='force-dynamic';
export const metadata={title:'Private quotation review | Kobags',robots:{index:false,follow:false},referrer:'no-referrer'};
export default async function Page({params}:{params:Promise<{token:string}>}){return <CustomerPortal token={(await params).token}/>;}
