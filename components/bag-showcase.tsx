"use client";
import { useEffect, useState } from 'react';
import { Box, ArrowUpRight } from 'lucide-react';
import Link from './site-link';
import { useKobags } from './kobags-context';
import { languageHref } from '@/lib/site-locale';

export default function BagShowcase() {
  const { t, lang } = useKobags();
  const [previewActive, setPreviewActive] = useState(false);
  useEffect(() => {
    // Phones start with a real product photograph, avoiding a second WebGL
    // renderer during ordinary page scrolling. Desktop keeps its live preview.
    const desktop = matchMedia('(min-width: 1051px) and (hover: hover)');
    const enableDesktop = () => { if (desktop.matches) setPreviewActive(true); };
    enableDesktop(); desktop.addEventListener('change', enableDesktop);
    return () => desktop.removeEventListener('change', enableDesktop);
  }, []);
  return <section className="bag-showcase" id="bag-showcase" aria-labelledby="showcase-heading">
    <div className="showcase-overline"><span>{t('KOBAGS / THE INTERACTIVE STUDIO', 'KOBAGS / STUDIOJA INTERAKTIVE')}</span><span>{t('ROTATE. PERSONALIZE. PREVIEW.', 'RROTULLONI. PERSONALIZONI. SHIKONI.')}</span></div>
    <div className="showcase-layout">
      <div className="showcase-copy">
        <p className="eyebrow">{t('TRY IT IN 3D', 'PROVOJENI NË 3D')}</p>
        <h2 id="showcase-heading">{t('Imagine it.', 'Imagjinojeni.')}<br/><em>{t('Make it yours.', 'Personalizojeni.')}</em></h2>
        <p>{t('Explore the shape, fabric and finishing from every angle. Open the studio to choose a sample, change its colours and add your own logo, text or QR code.', 'Eksploroni formën, materialin dhe përfundimin nga çdo kënd. Hapni studion për të zgjedhur një model, ndryshuar ngjyrat dhe shtuar logon, tekstin apo kodin QR.')}</p>
        <Link href="/design" className="button showcase-cta">{t('Open the design studio', 'Hapni studion e dizajnit')}<ArrowUpRight size={20}/></Link>
        <p className="showcase-note">{previewActive ? t('Drag the bag to turn it around. Your design starts in the studio.', 'Tërhiqeni çantën për ta rrotulluar. Dizajni juaj fillon në studio.') : t('Tap Explore in 3D to turn the bag around.', 'Prekni Shikojeni në 3D për ta rrotulluar çantën.')}</p>
      </div>
      <div className="showcase-preview-shell">
        {previewActive ? <iframe src={languageHref('/design/viewer?preview=1', lang)} loading="lazy" className="reference-showcase-frame" title={t('Rotate the Kobags sample in 3D', 'Rrotulloni modelin Kobags në 3D')} /> :
          <button className="showcase-preview-start" type="button" onClick={() => setPreviewActive(true)} aria-label={t('Load interactive 3D bag preview', 'Hapni parapamjen interaktive 3D të çantës')}>
            <img src="/assets/client-2026-09/home-handle-640.webp" width={640} height={800} alt={t('Kobags fabric handle bag', 'Çantë Kobags me doreza prej materiali')} loading="lazy" decoding="async" />
            <span><Box size={20} aria-hidden="true" />{t('Explore in 3D', 'Shikojeni në 3D')}<ArrowUpRight size={18} aria-hidden="true" /></span>
          </button>}
        {previewActive && <button type="button" className="showcase-preview-reset" onClick={() => setPreviewActive(false)}>{t('Back to photo', 'Kthehu te fotoja')}</button>}
      </div>
    </div>
    <div className="showcase-bottom"><span>{t('YOUR IDEA', 'IDEJA JUAJ')}</span><i/><span>{t('OUR CRAFT', 'PUNA JONË')}</span><i/><span>{t('A SHARED PRODUCTION BRIEF', 'KËRKESA JUAJ PËR PRODHIM')}</span></div>
  </section>;
}
