export type StockVariant = { id: string; gsm: number; color: string; colorSq: string; status: 'available'|'out'|'check' };
export type StockCollection = { dimensions: string; variants: StockVariant[] };
// Client-confirmed finished T-Shirt stock, 12 October 2026. CMS edits remain
// authoritative; this only supplies defaults for a new installation/import.
export const tshirtStockVariants: StockVariant[] = [
 {id:'gsm-50-white',gsm:50,color:'White',colorSq:'E bardhë',status:'available'},
 {id:'gsm-60-white',gsm:60,color:'White',colorSq:'E bardhë',status:'available'},
 {id:'gsm-60-beige',gsm:60,color:'Beige',colorSq:'Bezhë',status:'available'},
 {id:'gsm-60-black',gsm:60,color:'Black',colorSq:'E zezë',status:'available'},
 {id:'gsm-60-red',gsm:60,color:'Red',colorSq:'E kuqe',status:'available'},
];
export const stockDefaults = ['thank-you','smiley'].map(slug=>({
 slug,title:{en:slug==='smiley'?'Smiley bags':'Thank you bags',sq:slug==='smiley'?'Çanta Smiley':'Çanta Thank you'},
 description:{en:'Finished, pre-printed T-Shirt bags. Order the existing design from stock.',sq:'Çanta T-Shirt të gatshme, me shtyp të përfunduar. Porositni dizajnin ekzistues nga stoku.'},
 collection:{dimensions:'L31 × H55 × W18 cm',variants:tshirtStockVariants.map(variant=>({...variant}))}
}));
