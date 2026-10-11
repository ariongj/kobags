export type StockVariant = { id: string; gsm: number; color: string; colorSq: string; status: 'available'|'out'|'check' };
export type StockCollection = { dimensions: string; variants: StockVariant[] };
export const stockDefaults = ['thank-you','smiley'].map(slug=>({
 slug,title:{en:slug==='smiley'?'Smiley bags':'Thank you bags',sq:slug==='smiley'?'Çanta Smiley':'Çanta Thank you'},
 description:{en:'Finished, pre-printed T-Shirt bags. Order the existing design from stock.',sq:'Çanta T-Shirt të gatshme, me shtyp të përfunduar. Porositni dizajnin ekzistues nga stoku.'},
 collection:{dimensions:'L31 × H55 × W18 cm',variants:[50,60].map(gsm=>({id:'gsm-'+gsm,gsm,color:'To be confirmed',colorSq:'Për t’u konfirmuar',status:'check' as const}))}
}));
