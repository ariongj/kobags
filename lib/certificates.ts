// Transcribed from the original Kobags-published scans; this is not issuer verification.
export const certificates = [
  {
    id: "9001",
    standard: "ISO 9001:2015",
    title: "Quality management",
    titleSq: "Menaxhimi i cilësisë",
    number: "SB.26.0004.00.QMS",
    source: "/documents/iso-9001-original.png",
  },
  {
    id: "14001",
    standard: "ISO 14001:2015",
    title: "Environmental management",
    titleSq: "Menaxhimi mjedisor",
    number: "SB.26.0005.00.EMS",
    source: "/documents/iso-14001-original.png",
  },
] as const;
export type Certificate = {id:string;standard:string;title:string;titleSq:string;number:string;source:string;image?:string;issued?:string;expires?:string};
