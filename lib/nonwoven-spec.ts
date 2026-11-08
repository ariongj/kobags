/** Catalogue dimensions are width × height × gusset in centimetres.
 * A flat string bag has no quoted gusset; a small visual opening lets buyers inspect it.
 * Free-text custom-size requests are deliberately not treated as approved dimensions.
 */
export function bagDimensions(value: string, product: string): [number, number, number] {
  const parts = value.match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
  const fallback: [number,number,number] = product === "t-shirt-bag" ? [31,55,18] : product === "string-bag" ? [30,40,3] : [33,25,12];
  if(parts.length < 2 || parts.length > 3 || parts.some(n=>!Number.isFinite(n))) return fallback;
  const [width,height,depth=product === "string-bag" ? 3 : 0]=parts;
  if(width < 10 || width > 100 || height < 10 || height > 120 || depth < 0 || depth > 50 || depth > width) return fallback;
  return [width,height,Math.max(.25,depth)];
}
