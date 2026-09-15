export type Variant = { name: string; dimensions: string; gsm: number };
export type Product = {
  slug: string;
  name: string;
  use: string;
  handle: string;
  description: string;
  image: string;
  variants: Variant[];
};
export const products: Product[] = [
  {
    slug: "d-cut-bag",
    name: "D-Cut Bag",
    use: "Retail & events",
    handle: "Die-cut",
    description:
      "A clean, lightweight shape with an integrated grip. A practical canvas for your next promotion.",
    image: "/assets/d-cut-bag.webp",
    variants: [
      { name: "Small", dimensions: "30 × 31 × 5 cm", gsm: 60 },
      { name: "Medium", dimensions: "40 × 38.5 × 10 cm", gsm: 60 },
      { name: "Large", dimensions: "50 × 47.5 × 12 cm", gsm: 80 },
    ],
  },
  {
    slug: "handle-bag",
    name: "Handle Bag",
    use: "Shops & boutiques",
    handle: "Short handles",
    description:
      "An everyday carry bag with comfortable handles and room for your brand to stand out.",
    image: "/assets/handle-bag.webp",
    variants: [
      { name: "Small", dimensions: "30 × 30 × 5 cm", gsm: 60 },
      { name: "Medium", dimensions: "40 × 37 × 10 cm", gsm: 60 },
      { name: "Large", dimensions: "50 × 42.5 × 15 cm", gsm: 60 },
    ],
  },
  {
    slug: "box-bag",
    name: "Box Bag",
    use: "Grocery & gifting",
    handle: "Short handles",
    description:
      "A structured profile with a generous base for packaging that needs a little more room.",
    image: "/assets/box-bag.webp",
    variants: [
      { name: "Small", dimensions: "33 × 25 × 12 cm", gsm: 80 },
      { name: "Medium", dimensions: "40 × 32.5 × 15 cm", gsm: 80 },
      { name: "Large", dimensions: "40 × 40 × 20 cm", gsm: 80 },
    ],
  },
  {
    slug: "t-shirt-bag",
    name: "T-Shirt Bag",
    use: "Grocery & retail",
    handle: "T-shirt handles",
    description:
      "A familiar shopping shape with integrated handles for convenient everyday carrying.",
    image: "/assets/t-shirt-bag.webp",
    variants: [
      { name: "Small", dimensions: "29 × 38 × 10 cm", gsm: 50 },
      { name: "Medium", dimensions: "37 × 45 × 12 cm", gsm: 50 },
      { name: "Large", dimensions: "44 × 58 × 14 cm", gsm: 50 },
    ],
  },
  {
    slug: "string-bag",
    name: "String Bag",
    use: "Events & promotions",
    handle: "String",
    description:
      "A drawstring closure and simple profile for events, promotions and brand giveaways.",
    image: "/assets/string-bag.webp",
    variants: [
      { name: "Small", dimensions: "30 × 40 cm", gsm: 50 },
      { name: "Medium", dimensions: "40 × 45 cm", gsm: 50 },
      { name: "Large", dimensions: "50 × 50 cm", gsm: 50 },
    ],
  },
];
export const colors = [
  { name: "Forest green", sq: "E gjelbër", hex: "#276344" },
  { name: "Navy blue", sq: "Blu e errët", hex: "#193b67" },
  { name: "Natural", sq: "Natyrale", hex: "#d9cba6" },
  { name: "White", sq: "E bardhë", hex: "#f1f0e8" },
  { name: "Black", sq: "E zezë", hex: "#2a2d30" },
  { name: "Red", sq: "E kuqe", hex: "#b3413d" },
  { name: "Royal blue", sq: "Blu mbretërore", hex: "#3864a7" },
];
export type Design = {
  previewVersion?: "v4";
  product: string;
  size: string;
  color: string;
  printColors: number;
  side: "front" | "back";
  logo: string;
  logoName: string;
  text: string;
  ink: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  textFont?: "sans" | "serif" | "mono";
  textAlign?: "left" | "center" | "right";
  backLogoName?: string;
  backTextFont?: "sans" | "serif" | "mono";
  backTextAlign?: "left" | "center" | "right";
  backInk?: string;
  backLogo: string;
  backText: string;
  backX: number;
  backY: number;
  backScale: number;
  backRotation: number;
  quantity: number;
  country: string;
  city: string;
  date: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  note: string;
  customDimensions: string;
  purpose: string;
  consent: boolean;
  key: string;
  reorderOf?: string;
};
export const initialDesign: Design = {
  previewVersion: "v4",
  product: "handle-bag",
  size: "Small",
  color: "Forest green",
  printColors: 1,
  side: "front",
  logo: "",
  logoName: "",
  text: "YOUR\nBRAND",
  ink: "#ffffff",
  x: 50,
  y: 56,
  scale: 34,
  rotation: 0,
  backLogo: "",
  backText: "",
  backX: 50,
  backY: 56,
  backScale: 34,
  backRotation: 0,
  quantity: 5000,
  country: "Kosovo",
  city: "",
  date: "",
  company: "",
  contact: "",
  email: "",
  phone: "",
  note: "",
  customDimensions: "",
  purpose: "Retail packaging",
  consent: false,
  key: "",
};
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug) || products[1];
