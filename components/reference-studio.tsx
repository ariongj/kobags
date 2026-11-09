"use client";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKobags } from './kobags-context';
import { colors, type Design } from '@/lib/catalog';
import { languageHref } from '@/lib/site-locale';
import { ArrowUpRight } from 'lucide-react';

export default function ReferenceStudio() {
  const frame = useRef<HTMLIFrameElement>(null);
  const { t, lang, update, design } = useKobags();
  const router = useRouter();
  const [ready, setReady] = useState(false), [busy, setBusy] = useState(false), [storageError, setStorageError] = useState(false);
  const [quoteError, setQuoteError] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const mobile = matchMedia('(max-width:760px), (max-width:1000px) and (max-height:500px)');
    const viewport = window.visualViewport;
    let pending = 0;
    const fit = () => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(() => {
        const node = frame.current;
        if (!node) return;
        if (!mobile.matches) { node.style.removeProperty('--studio-mobile-height'); return; }
        const height = viewport?.height ?? window.innerHeight;
        // Use the visible viewport, including Safari's expanding toolbar and keyboard.
        // No scroll-to-top calls: navigation and the customer's position are retained.
        const visibleBottom = height + (viewport?.offsetTop ?? 0);
        node.style.setProperty('--studio-mobile-height', `${Math.max(180, visibleBottom - Math.max(0, node.getBoundingClientRect().top))}px`);
        node.contentWindow?.postMessage({ type: 'kobags:viewport', keyboard: height < window.innerHeight * 0.75 }, location.origin);
      });
    };
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('scroll', fit, { passive: true });
    viewport?.addEventListener('resize', fit);
    viewport?.addEventListener('scroll', fit);
    mobile.addEventListener('change', fit);
    const observer = new ResizeObserver(fit);
    if (frame.current?.parentElement) observer.observe(frame.current.parentElement.querySelector('.reference-studio-bar')!);
    return () => { cancelAnimationFrame(pending); window.removeEventListener('resize', fit); window.removeEventListener('scroll', fit); viewport?.removeEventListener('resize', fit); viewport?.removeEventListener('scroll', fit); mobile.removeEventListener('change', fit); observer.disconnect(); };
  }, [quoteError, storageError]);
  useEffect(() => { if (!busy) return; const timeout = setTimeout(() => { setBusy(false); setQuoteError(true); }, 45000); return () => clearTimeout(timeout); }, [busy]);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === 'kobags:studio-ready') setReady(true);
      if (event.data?.type === 'kobags:studio-unavailable') { setUnavailable(true); setBusy(false); }
      if (event.data?.type === 'kobags:storage-unavailable') setStorageError(true);
      if (event.data?.type === 'kobags:quote-error') { setBusy(false); setQuoteError(true); }
      if (event.data?.type !== 'kobags:quote-design') return;
      const { bag, front, back, referenceStudio } = event.data;
      const products: Record<string, string> = { box: 'box-bag', handle: 'handle-bag', dcut: 'd-cut-bag', tshirt: 't-shirt-bag', string: 'string-bag', bottle: 'd-cut-bag' };
      if (!bag || !products[bag.type] || !/^#[\da-f]{6}$/i.test(bag.bag) || ![bag.W, bag.H, bag.D].every((v: unknown) => typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 150)) { setBusy(false); setQuoteError(true); return; }
      const validImage = (s: unknown) => typeof s === 'string' && s.length <= 110000 && (s === '' || /^data:image\/(png|webp);base64,[A-Za-z0-9+/=]+$/.test(s));
      if (!validImage(front) || !validImage(back) || !referenceStudio || !validImage(referenceStudio.front) || !validImage(referenceStudio.back)) { setBusy(false); setQuoteError(true); return; }
      const closest = colors.reduce((best, c) => {
        const distance = (hex: string) => [1, 3, 5].reduce((n, i) => n + (parseInt(hex.slice(i, i + 2), 16) - parseInt(String(bag.bag).slice(i, i + 2), 16)) ** 2, 0);
        return distance(c.hex) < distance(best.hex) ? c : best;
      }, colors[0]);
      const patch: Partial<Design> = { product: products[bag.type], size: 'Small', color: closest.name, customDimensions: `${bag.W} × ${bag.H} × ${bag.D} cm`, text: '', backText: '', logo: front, backLogo: back, logoName: 'Studio front artwork', backLogoName: 'Studio back artwork', side: 'front', elements: [], layeredArtwork: false, x: 50, y: 56, scale: 55, rotation: 0, backX: 50, backY: 56, backScale: 55, backRotation: 0, note: `Studio configuration: ${bag.type} · ${bag.size}\nFabric ${bag.bag}; handles ${bag.handle}; ${bag.strap} handles; ${bag.pose} shape.\nCustom dimensions: ${bag.W} × ${bag.H} × ${bag.D} cm.` };
      const customerNote = design.note.replace(/\n?\[3D studio\][\s\S]*?\[\/3D studio\]/g, '').trim();
      const folded = bag.bagView === 'flat' || (bag.bagView == null && bag.type === 'tshirt' && bag.vestView === 'flat');
      patch.note += `\nPreview: ${folded ? 'Folded / flat' : 'Opened'}.`;
      patch.referenceStudio = referenceStudio;
      patch.key = crypto.randomUUID();
      patch.note = `${customerNote}${customerNote ? '\n\n' : ''}[3D studio]\n${patch.note}\n[/3D studio]`;
      update(patch);
      try { localStorage.removeItem('kobags-quote-step'); } catch {}
      router.push(languageHref('/quote', lang));
    };
    window.addEventListener('message', receive);
    // The cached viewer can finish before the outer page hydrates. Ask for its
    // current status after installing the listener instead of relying on a
    // single startup message arriving at exactly the right time.
    frame.current?.contentWindow?.postMessage({ type: 'kobags:studio-status' }, location.origin);
    return () => window.removeEventListener('message', receive);
  }, [update, router, lang, design.note]);
  return <section className="reference-studio-shell" aria-label={t('Kobags 3D design studio', 'Studioja 3D e Kobags')}>
    <div className="reference-studio-bar"><strong>{t('Bag studio', 'Studio 3D')}</strong><button type="button" className="button" disabled={!ready || busy} onClick={() => { setQuoteError(false); setBusy(true); frame.current?.contentWindow?.postMessage({ type: 'kobags:request-quote' }, location.origin); }}>{t(busy ? 'Preparing…' : !ready ? unavailable ? 'Studio unavailable' : 'Loading studio…' : 'Continue to quote', busy ? 'Duke përgatitur…' : !ready ? unavailable ? 'Studioja nuk është e disponueshme' : 'Duke hapur studion…' : 'Vazhdoni te oferta')}<ArrowUpRight size={16}/></button></div>
    {quoteError && <p className="reference-studio-storage" role="alert">{t('Your design could not be prepared. Please try again, or save an image and contact us.', 'Dizajni nuk u përgatit. Provoni përsëri, ose ruani një imazh dhe na kontaktoni.')}</p>}
    {storageError && <p className="reference-studio-storage" role="status">{t('Your browser could not save this draft. Download your design before closing this page.', 'Shfletuesi nuk e ruajti draftin. Shkarkoni dizajnin përpara mbylljes së faqes.')}</p>}
    <iframe ref={frame} src={languageHref('/design/viewer', lang)} onLoad={() => frame.current?.contentWindow?.postMessage({ type: 'kobags:studio-status' }, location.origin)} className="reference-studio-frame" title={t('Interactive Kobags bag configurator', 'Konfiguruesi interaktiv i çantave Kobags')} />
  </section>;
}
