import { z } from "zod";
import { validSocialProfile, type SocialPlatform } from "@/lib/social-profiles";
const profile = (platform: SocialPlatform) => z.string().trim().max(500).refine(value => validSocialProfile(platform, value), "Enter the official HTTPS profile URL for this platform, or leave blank.").optional();
const socialProfiles = z.object({facebook:profile("facebook"),instagram:profile("instagram"),linkedin:profile("linkedin"),youtube:profile("youtube")});
import { products, colors } from "@/lib/catalog";
import { isCalendarDate } from "@/lib/design-validation";
import { CmsError } from "./core";
import type { Content, QuoteData } from "./types";
import { validContentPath } from './content-path';
const copy = z.object({en:z.string().max(12000),sq:z.string().max(12000)});
const safeLink = z.string().max(500).refine(s=>!s || /^\/(?!\/)[^\\\s]*$/.test(s) || /^https:\/\//.test(s),"Use a site path or HTTPS address.");
const media = z.string().max(500).refine(s=>!s || /^\/(assets\/|api\/media\/)[a-zA-Z0-9_./-]+$/.test(s),"Choose an uploaded or existing site asset.");
const date = z.string().refine(s=>!s || isCalendarDate(s),"Use a valid calendar date.");
const product = z.object({slug:z.enum(products.map(p=>p.slug) as [string,...string[]]),name:z.string().min(1).max(100),description:z.string().min(1).max(2000),use:z.string().min(1).max(100),handle:z.string().min(1).max(100),image:media,variants:z.array(z.object({name:z.enum(["Small","Medium","Large"]),dimensions:z.string().regex(/^\d+(?:\.\d+)? × \d+(?:\.\d+)?(?: × \d+(?:\.\d+)?)? cm$/),gsm:z.number().int().min(20).max(300)})).min(1).max(3).refine(v=>new Set(v.map(x=>x.name)).size===v.length)});
export const contentSchema = z.object({ preserveLayout:z.boolean().optional(), collection:z.object({dimensions:z.string().trim().min(3).max(100),variants:z.array(z.object({id:z.string().regex(/^[a-zA-Z0-9-]{1,80}$/),gsm:z.number().int().min(20).max(300),color:z.string().trim().min(1).max(80),colorSq:z.string().trim().min(1).max(80),status:z.enum(['available','out','check'])})).max(60).refine(v=>new Set(v.map(x=>x.id)).size===v.length,'Variant IDs must be unique.')}).optional(), title:copy, description:copy,image:media,seoTitle:copy,seoDescription:copy,path:z.string().max(200).refine(s=>!s || /^\/[a-z0-9/-]*$/.test(s)),sections:z.array(z.object({id:z.string().min(1).max(80),title:copy,body:copy,image:media,alt:copy,link:safeLink,linkLabel:copy,visible:z.boolean(),original:copy.optional()})).max(30),product:product.optional(),productSq:z.object({name:z.string().max(100),description:z.string().max(2000),use:z.string().max(100),handle:z.string().max(100)}).optional(),colors:z.array(z.enum(colors.map(c=>c.name) as [string,...string[]])).min(1).optional(),activeSizes:z.array(z.enum(["Small","Medium","Large"])).min(1).optional(),moq:z.number().int().min(1).max(10000000).optional(),printColors:z.number().int().min(1).max(4).optional(),source:safeLink.optional(),registration:z.string().max(150).optional(),issued:date.optional(),expires:date.optional(),start:z.string().max(30).optional(),end:z.string().max(30).optional(),settings:z.object({moq:z.number().int().min(1).max(10000000),leadTime:z.string().max(500),leadTimeSq:z.string().max(500).optional(),phone:z.string().max(40),email:z.string().email(),address:z.string().max(300),liveInquiries:z.boolean(),media:z.object({heroImage:media.optional(),printingVideo:media.optional(),printingPoster:media.optional(),heroAlt:copy.optional()}).optional(),social:socialProfiles.optional()}).optional()});
export function content(value: unknown, publish = false): Content {
 const parsed=contentSchema.safeParse(value);if(!parsed.success)throw new CmsError(422,parsed.error.issues[0].path.join(".")+": "+parsed.error.issues[0].message);
 const c=parsed.data; if(c.product){c.title={en:c.product.name,sq:c.productSq?.name||c.product.name};c.description={en:c.product.description,sq:c.productSq?.description||''};c.image=c.product.image;c.path='/products/'+c.product.slug;} if(!validContentPath(c.path))throw new CmsError(422,'Choose a public site path with one leading slash. Asset, document and application routes are reserved.');if(publish && (!c.title.en.trim() || !c.title.sq.trim() || !c.description.en.trim() || !c.description.sq.trim())) throw new CmsError(422,"Complete the title and description in both languages before publishing.");
 if(publish && c.settings?.media?.heroImage && (!c.settings.media.heroAlt?.en.trim()||!c.settings.media.heroAlt?.sq.trim()))throw new CmsError(422,'Add the hero image description in both languages.');
 if(publish && c.collection && !c.collection.variants.length)throw new CmsError(422,'Add at least one stock variant.');
 if(publish && c.product && (!c.productSq?.description.trim() || !c.productSq?.name.trim()))throw new CmsError(422,"Complete Albanian product details.");
 if(publish && c.sections.some(s=>s.visible && (s.image && (!s.alt.en.trim()||!s.alt.sq.trim()) || !s.title.en.trim()||!s.title.sq.trim())))throw new CmsError(422,"Visible sections need both translated headings and image descriptions.");
 for(const key of ["start","end"] as const)if(c[key] && !Number.isFinite(Date.parse(c[key]!)))throw new CmsError(422,"Choose a valid campaign date and time.");
 for(const key of ['start','end'] as const)if(c[key])c[key]=new Date(c[key]!).toISOString();
 if(c.start && c.end && c.start>=c.end)throw new CmsError(422,"The campaign must end after it starts.");return c;
}
export function quotation(value: unknown): QuoteData {
 const n=z.number().int().min(0).max(100000000);
 const p=z.object({quantity:z.number().int().min(1).max(10000000),unitCents:n,setupCents:n,shippingCents:n,taxCents:n,discountCents:n,validUntil:date,terms:z.string().min(5).max(5000),delivery:z.string().min(3).max(1000)}).safeParse(value);
 if(!p.success)throw new CmsError(422,"Complete the quote quantities, amounts, terms and delivery details.");
 const d=p.data;if(!d.validUntil || d.validUntil<new Date().toISOString().slice(0,10))throw new CmsError(422,"Set a current or future expiry date.");const total=d.quantity*d.unitCents+d.setupCents+d.shippingCents+d.taxCents-d.discountCents;
 if(!Number.isSafeInteger(total)||total<0||total>100000000000)throw new CmsError(422,"The quote total is outside the supported range.");return {...d,totalCents:total,currency:"EUR"};
}
