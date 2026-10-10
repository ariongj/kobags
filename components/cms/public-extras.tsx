"use client";
import { socialPlatforms, validSocialProfile, type SocialPlatform } from "@/lib/social-profiles";
import { company } from '@/lib/company';
import { usePathname } from 'next/navigation';
import { useCms } from './public-context';
import { useKobags } from '@/components/kobags-context';
import Link from '@/components/site-link';
export function CmsExtras({kind}:{kind:'faq'|'guide'|'certificate'}){
 const {records}=useCms(),{lang,t}=useKobags();const entries=records.filter(r=>r.kind===kind && (kind!=='certificate'||!['certificate-9001','certificate-14001'].includes(r.id)));if(!entries.length)return null;
 return <section className="cms-public-extras"><h2>{kind==='faq'?t('More buyer questions','Pyetje të tjera nga blerësit'):kind==='guide'?t('Published buyer resources','Burime të publikuara për blerësit'):t('Document updates','Përditësime dokumentesh')}</h2>{entries.map(({id,content:c})=>kind==='faq'?<details key={id}><summary>{c.title[lang]}</summary><p>{c.description[lang]}</p></details>:<article key={id}><h3>{c.title[lang]}</h3><p>{c.description[lang]}</p>{c.registration&&<p>{c.registration}</p>}{c.expires&&<p>{t('Document review / expiry','Rishikimi / skadimi')}: {c.expires}</p>}{(c.source||c.path)&&<Link href={c.source||c.path}>{t('Open document','Hapni dokumentin')}</Link>}</article>)}</section>;
}
export function CmsCampaigns(){const {records}=useCms(),{lang}=useKobags();const pathname=usePathname();const path=pathname?.replace(/^\/sq(?=\/|$)/,'')||'/';const campaigns=records.filter(r=>r.kind==='campaign'&&(!r.content.path||r.content.path===path));if(!campaigns.length||/^\/(cms|request|demo|quote|design)(\/|$)/.test(path))return null;return <aside className="cms-public-campaigns">{campaigns.map(({id,content:c})=><div key={id}><strong>{c.title[lang]}</strong><span>{c.description[lang]}</span>{c.sections[0]?.link&&<Link href={c.sections[0].link}>{c.sections[0].linkLabel[lang]}</Link>}</div>)}</aside>;}

export function CmsContact({part}:{part:'email'|'phone'|'address'}){const {settings}=useCms();const c={email:settings?.email||'info@kobags-group.com',phone:settings?.phone||'+38343877753',address:settings?.address||company.streetAddress};return part==='address'?<>{c.address}</>:<a href={(part==='email'?'mailto:':'tel:')+c[part]}>{c[part]}</a>;}

export function CmsSocialProfiles() {
 const {settings}=useCms(),{t}=useKobags();
 const profiles=(Object.keys(socialPlatforms) as SocialPlatform[]).filter(platform=>settings?.social?.[platform]&&validSocialProfile(platform,settings.social[platform]!));
 if(!profiles.length)return null;
 return <nav className="footer-socials" aria-label={t("Follow Kobags", "Ndiqni Kobags")}>{profiles.map(platform=><a key={platform} href={settings!.social![platform]} target="_blank" rel="noopener noreferrer" aria-label={socialPlatforms[platform].label+t(" (opens in a new tab)"," (hapet në skedë të re)")}>{socialPlatforms[platform].label}<span aria-hidden="true"> ↗</span></a>)}</nav>;
}
