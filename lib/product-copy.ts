import { products, type Product } from "./catalog";

type ProductCopy = Pick<Product, "use" | "handle" | "description">;

export const productCopySq: Record<string, ProductCopy> = {
  "d-cut-bag": {
    use: "Shitje me pakicë & evente",
    handle: "Dorezë e prerë",
    description:
      "Formë e lehtë me dorezë të integruar. Një sipërfaqe e pastër për promovimin tuaj të radhës.",
  },
  "handle-bag": {
    use: "Dyqane & butiqe",
    handle: "Doreza të shkurtra",
    description:
      "Çantë e përditshme me doreza të rehatshme dhe hapësirë të bollshme për markën tuaj.",
  },
  "box-bag": {
    use: "Ushqimore & dhurata",
    handle: "Doreza të shkurtra",
    description:
      "Formë e strukturuar me bazë të gjerë për paketim që kërkon më shumë hapësirë.",
  },
  "t-shirt-bag": {
    use: "Ushqimore & pakicë",
    handle: "Doreza të integruara",
    description:
      "Formë e njohur blerjesh me doreza të integruara për përdorim të përditshëm.",
  },
  "string-bag": {
    use: "Evente & promovime",
    handle: "Kordon",
    description:
      "Mbyllje me kordon dhe formë e thjeshtë për evente, promovime dhe dhurata të markës.",
  },
};

// Keep any client-edited catalog copy intact until its Albanian version is supplied.
export function localizeProduct(product: Product, lang: "en" | "sq"): Product {
  if (lang !== "sq") return product;
  const original = products.find((item) => item.slug === product.slug);
  const translated = productCopySq[product.slug];
  if (!original || !translated) return product;
  return {
    ...product,
    use: product.use === original.use ? translated.use : product.use,
    handle: product.handle === original.handle ? translated.handle : product.handle,
    description:
      product.description === original.description
        ? translated.description
        : product.description,
  };
}
