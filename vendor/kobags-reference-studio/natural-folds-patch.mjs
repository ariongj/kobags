// Broad asymmetric pressure folds from the client's footage. All displacement
// fades at shared seams; topology, nominal sizes and artwork UVs stay intact.
export function naturalFolds(source) {
  const replace=(from,to)=>{
    if(!source.includes(from)||source.indexOf(from)!==source.lastIndexOf(from))
      throw new Error(`Natural fold anchor mismatch: ${from}`);
    source=source.replace(from,to);
  };
  replace('const buckle = ((0.3 - 0.18 * full)', 'const drape = (0.06 + 0.09 * (1-full)) * Math.sin(x/W*4.8 + seed*0.8 + Math.sin(y/H*2.4)*0.5) * ex * ey;\n  const buckle = (drape + (0.3 - 0.18 * full)');
  replace('-0.07 * Math.exp(-(((y - fy) / 0.3) ** 2)) * ex', '-0.055 * Math.exp(-(((y - fy - 0.22*Math.sin(x/W*Math.PI+seed)) / 0.72) ** 2)) * ex');
  replace('crease -= 0.24 * (1 - 0.7 * full) * Math.exp(-((perp / 0.8) ** 2)) * Math.sin(Math.PI * t / Lc);', `const curved=perp+0.22*Math.sin(t/Lc*Math.PI+seed+sx);
      crease += (1-0.7*full)*(0.88+0.12*Math.sin(seed+sx))*Math.sin(Math.PI*t/Lc)
        *(-0.17*Math.exp(-((curved/1.2)**2))+0.045*Math.exp(-(((curved+sx*1.5)/1.8)**2)));`);
  replace('const line = x - sx * (handleSpan() + down * 0.13);', 'const line = x - sx * (handleSpan() + down * (0.10+0.025*sx)) - 0.18*Math.sin(down/reach*Math.PI+seed);');
  replace('const line = x - sx * (c + hw * 0.22 + down * 0.10);', 'const line = x - sx * (c + hw * 0.22 + down * 0.10) - 0.24*Math.sin(down/reach*Math.PI+seed+sx);');
  replace("const vestDrape = TYPES[state.type].handles === 'tshirt' && !foldedBag()\n        ? 0.16", "const vestDrape = !foldedBag()\n        ? (TYPES[state.type].handles === 'tshirt' ? 0.18 : 0.10)");
  replace('* (1 - smooth(tshirtCut().yb - 1.5, tshirtCut().yb + 0.4, y)) : 0;', "* (TYPES[state.type].handles === 'tshirt' ? (1 - smooth(tshirtCut().yb - 1.5, tshirtCut().yb + 0.4, y)) : 1) : 0;");
  replace('const depth = ry * ht + cup;', 'const ribbonWave = fabric && !foldedBag() ? 0.025*free*(1-rx*rx)*Math.sin(Math.PI*i/N)*Math.sin(2.2*Math.PI*i/N+side) : 0;\n      const depth = ry * ht + cup + ribbonWave;');
  // The photographed loop is a flat ribbon with a bent, off-centre crown.
  // Shape the existing samples once during rebuild; no extra mobile vertices.
  replace('(side > 0 ? 0.12 : 0.18);', '(side > 0 ? 0.22 : 0.34);');
  replace("P(-a * sh, H + (foldedBag() ? 0.84 : 0.80) * drop),", "P(-a * (fabric && !foldedBag() ? 0.44 : sh), H + (foldedBag() ? 0.84 : fabric ? 0.76 : 0.80) * drop),");
  replace('P(-a * 0.19 + side * 0.35, H + drop * (side > 0 ? 0.99 : 0.965)),', 'P(-a * (fabric && !foldedBag() ? 0.27 : 0.19) + side * 0.35, H + drop * (side > 0 ? 0.99 : 0.965)),');
  replace('P(a * 0.15 + side * 0.35, H + drop * (side > 0 ? 1 : 0.975)),', 'P(a * (fabric && !foldedBag() ? 0.34 : 0.15) + side * 0.35, H + drop * (fabric && !foldedBag() ? (side > 0 ? 0.91 : 0.87) : (side > 0 ? 1 : 0.975))),');
  replace('P(a * sh, H + 0.84 * drop),', 'P(a * sh, H + (fabric && !foldedBag() ? 0.72 : 0.84) * drop),');
  replace('const th = (foldedBag() ? 0.035 : 0.32) * Math.sin(out * 0.26 + side * 1.7)', `const ribbonTurn = fabric && !foldedBag()
      ? (0.88*Math.exp(-(((i/N-(side>0?0.44:0.56))/0.115)**2))
        -0.32*Math.exp(-(((i/N-0.72)/0.15)**2))) * Math.sin(Math.PI*i/N) : 0;
    const th = ((foldedBag() ? 0.035 : 0.32) * Math.sin(out * 0.26 + side * 1.7) + ribbonTurn)`);
  // Broad pressure folds above the base, rather than random high-frequency dents.
  // Their support vanishes at the welded edges and outside the lower third.
  replace('const buckle = (drape +', `let lowerPressure=0;
  if(!foldedBag()){
    const reach=Math.min(H*0.34,Math.max(4,state.D*0.9));
    const fade=smooth(0,1.2,y)*(1-smooth(reach*0.65,reach,y))*edge;
    for(const sx of [-1,1]){
      const inset=W/2-sx*x;
      const line=y-(0.35*state.D+0.25*inset+0.5*Math.sin(inset/W*4+seed+sx));
      const corner=Math.exp(-((inset/Math.max(3,W*0.28))**2));
      lowerPressure+=fade*corner*(1-0.5*full)*(0.12*Math.exp(-(((line-1.25)/1.7)**2))-0.24*Math.exp(-((line/1.0)**2)));
    }
  }
  const buckle = (lowerPressure + drape +`);
  // Both halves share the centre-fold drift; all perimeter vertices stay fixed.
  replace('const p = [sx * (W / 2 - s * u + bow + vestDrape), y,', `const seamDrift = foldedBag()?0:0.16*Math.sin(Math.PI*y/H)*Math.sin(y/H*Math.PI*2+sx*0.7)*(d/g)*u;
      const bottomLine=y-g*u-0.22*Math.sin(Math.PI*u+sx*0.4);
      const creaseRelief=foldedBag()?0:Math.sin(Math.PI*u)*smooth(0,0.8,y)*(1-smooth(H*0.5,H*0.7,y))*(d/g)
        *(-0.32*Math.exp(-((bottomLine/0.95)**2))+0.11*Math.exp(-(((bottomLine-1.4)/1.7)**2)));
      const p = [sx * (W / 2 - s * u + bow + vestDrape + seamDrift + creaseRelief), y,`);
  replace('0.18 : 0.10)', '0.24 : 0.18)');
  // Lift only the interior of the bottom panel, keeping ground contact and seams.
  replace(' / W : 1), 0, bz - v * 2 * bz]', ' / W : 1), !foldedBag() && TYPES[state.type].handles !== \'tshirt\' ? 0.075*Math.sin(Math.PI*u)*Math.sin(Math.PI*v)*(1+0.3*Math.sin(u*Math.PI*2+v)) : 0, bz - v * 2 * bz]');
  return source;
}
