"use client";
import { ArrowUpRight } from 'lucide-react';
import Link from './site-link';
import { useKobags } from './kobags-context';
import { languageHref } from '@/lib/site-locale';

export default function BagShowcase() {
  const { t, lang } = useKobags();
  return <section className="bag-showcase" id="bag-showcase" aria-labelledby="showcase-heading">
    <div className="showcase-overline"><span>{t('KOBAGS / THE INTERACTIVE STUDIO', 'KOBAGS / STUDIOJA INTERAKTIVE')}</span><span>{t('ROTATE. PERSONALIZE. PREVIEW.', 'RROTULLONI. PERSONALIZONI. SHIKONI.')}</span></div>
    <div className="showcase-layout">
      <div className="showcase-copy">
        <p className="eyebrow">{t('TRY IT IN 3D', 'PROVOJENI NË 3D')}</p>
        <h2 id="showcase-heading">{t('Imagine it.', 'Imagjinojeni.')}<br/><em>{t('Make it yours.', 'Personalizojeni.')}</em></h2>
        <p>{t('Explore the shape, fabric and finishing from every angle. Open the studio to choose a sample, change its colours and add your own logo, text or QR code.', 'Eksploroni formën, materialin dhe përfundimin nga çdo kënd. Hapni studion për të zgjedhur një model, ndryshuar ngjyrat dhe shtuar logon, tekstin apo kodin QR.')}</p>
        <Link href="/design" className="button showcase-cta">{t('Open the design studio', 'Hapni studion e dizajnit')}<ArrowUpRight size={20}/></Link>
        <p className="showcase-note">{t('Drag the bag to turn it around. Your design starts in the studio.', 'Tërhiqeni çantën për ta rrotulluar. Dizajni juaj fillon në studio.')}</p>
      </div>
      <iframe src={languageHref('/design/viewer?preview=1', lang)} loading="lazy" className="reference-showcase-frame" title={t('Rotate the Kobags sample in 3D', 'Rrotulloni modelin Kobags në 3D')} />
    </div>
    <div className="showcase-bottom"><span>{t('YOUR IDEA', 'IDEJA JUAJ')}</span><i/><span>{t('OUR CRAFT', 'PUNA JONË')}</span><i/><span>{t('A SHARED PRODUCTION BRIEF', 'KËRKESA JUAJ PËR PRODHIM')}</span></div>
  </section>;
}
