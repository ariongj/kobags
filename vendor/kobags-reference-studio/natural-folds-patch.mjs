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
  return source;
}
