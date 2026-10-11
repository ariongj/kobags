export type Article = {
  slug: string;
  category: string;
  title: string;
  intro: string;
  sections: { title: string; body: string }[];
};
// Original article slugs retained. Copy is a proposed editorial rewrite, not a claim of client approval.
export const articles: Article[] = [
  {
    slug: "kobagsjourney",
    category: "Inside Kobags",
    title: "Inside Kobags: from brief to production.",
    intro:
      "How your product choices become a specification the factory can work with.",
    sections: [
      {
        title: "Start with the product",
        body: "Kobags’ public collection includes D-Cut, Handle, Box, T-Shirt and String bags in non-woven polypropylene. Each shape serves a different carrying need. Compare the published dimensions with what you intend to pack.",
      },
      {
        title: "Give the factory a clear brief",
        body: "A useful brief brings together the selected shape and size, material color, print colors, quantity and destination. The studio turns those choices into a shared visual starting point.",
      },
      {
        title: "Approve the details together",
        body: "The preview starts the conversation. Confirm a production template, material availability, commercial terms and the specific artwork revision before manufacturing. See original factory photographs and the printing video on our manufacturing page.",
      },
    ],
  },
  {
    slug: "whyswitchtokobags",
    category: "Buyer guide",
    title: "Is a reusable bag the right fit for your business?",
    intro:
      "Make the decision around your products, your customers and the details you can verify.",
    sections: [
      {
        title: "Match the bag to the purchase",
        body: "Check the size of a typical purchase and the way customers carry it. Review handles, the base and the opening. Ask for samples when the fit, feel or construction matters to your decision.",
      },
      {
        title: "Plan for repeated use",
        body: "A bag intended for reuse needs to work beyond the first trip. Product-specific care, load guidance and construction should be confirmed with the manufacturer. A material name alone does not tell you how long a finished bag will last.",
      },
      {
        title: "Compare the complete quotation",
        body: "Include quantity per design, print setup, transport, taxes where applicable and timing in the commercial discussion. The public FAQ lists a 5,000-bag minimum; its scope across sizes and colors requires confirmation.",
      },
    ],
  },
  {
    slug: "kobagsmission",
    category: "Brand & packaging",
    title: "Make your packaging feel like your brand.",
    intro:
      "A clear logo, a considered color and the right shape can make a simple bag feel intentional.",
    sections: [
      {
        title: "Keep the message clear",
        body: "Decide what needs to be seen first: a brand name, a mark or a short message. Leave room around the artwork so it stays readable at the scale of the bag.",
      },
      {
        title: "Use the preview to explore",
        body: "Upload a PNG, JPG or WebP logo in the studio, then move, resize or rotate it. Front and back can have different artwork. Download a concept to share with colleagues before requesting a quotation.",
      },
      {
        title: "Use the proof to decide",
        body: "The online preview is illustrative. Production artwork needs approved printable dimensions, color references and a specific revision. The final proof is where both buyer and manufacturer confirm what will be made.",
      },
    ],
  },
  {
    slug: "sciencebehindkobags",
    category: "Material basics",
    title: "Non-woven PP, explained clearly.",
    intro:
      "Material composition, recycled content and recyclability answer different questions.",
    sections: [
      {
        title: "Know what the specification says",
        body: "The published Kobags specifications identify non-woven PP and a GSM value. PP means polypropylene. GSM describes mass per square metre; it does not by itself establish load capacity or finished-bag durability.",
      },
      {
        title: "Ask separately about recycled content",
        body: "Polypropylene can be described by its material type without implying any recycled percentage. Ask for a product-specific composition declaration if recycled content is important to your purchase.",
      },
      {
        title: "Check local recycling acceptance",
        body: "The destination, collection system and finished bag all matter. Do not assume a bag will be accepted locally because its material can be recycled in some settings. Review printing and other components as part of the question.",
      },
    ],
  },
  {
    slug: "benefitsofkobags",
    category: "Buying checklist",
    title: "Five details to settle before ordering branded bags.",
    intro:
      "A short checklist makes your quote request easier to understand and compare.",
    sections: [
      {
        title: "1. Shape and dimensions",
        body: "Choose the profile for what you carry. Check the currently published sizes for your selected bag family. Dimension order and tolerances should be confirmed against a production drawing.",
      },
      {
        title: "2. Material and color",
        body: "Record the selected GSM, bag color and any material requirements. Screen colors are approximate; request a material reference when a close match is important.",
      },
      {
        title: "3. Artwork and printing",
        body: "Specify the front and back artwork and the number of print colors. Published product details describe flexographic printing in up to four colors; confirm the printable area and production artwork requirements.",
      },
      {
        title: "4. Quantity and destination",
        body: "State the requested quantity and destination city and country. Clarify whether quantity is split across designs, colors or sizes, and which costs the quotation includes.",
      },
      {
        title: "5. Approval and timing",
        body: "Share the date you need the bags and allow for the approval process. The published dispatch indication is 2–4 weeks after artwork approval, subject to confirmation. Delivery time also depends on transport and destination.",
      },
    ],
  },
  {
    slug: "helpingbusinesseskobags",
    category: "Order planning",
    title: "Introduce a new bag without the guesswork.",
    intro:
      "Use a sample, a shared brief and a review process to make the change easier for your team.",
    sections: [
      {
        title: "Bring the right people into the brief",
        body: "Brand, purchasing and store teams may need different things from a bag. Agree the intended use, appearance, quantity and delivery needs before narrowing the options.",
      },
      {
        title: "Review a sample where it matters",
        body: "A physical sample helps you assess material feel and fit. Ask about sample availability, cost and shipping. The sample inquiry is separate from a wholesale quote request.",
      },
      {
        title: "Keep one approved version",
        body: "Collect feedback on the same artwork revision. Once the quotation and latest artwork are accepted, confirm any payment condition and production schedule. Repeat orders still need a fresh quotation and current availability.",
      },
    ],
  },
];
