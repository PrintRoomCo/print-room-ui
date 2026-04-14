export const buildPlaceholderImage = (label: string, bg = "FBFBF6", fg = "2B3990") =>
  `https://placehold.co/800x800/${bg}/${fg}?text=${encodeURIComponent(label)}`;

export const storefrontProducts = [
  {
    id: "as-colour-staple-tee",
    title: "AS Colour Staple Tee",
    vendor: "AS Colour",
    price: "$24.00",
    compareAtPrice: "$28.00",
    imageSrc: buildPlaceholderImage("AS Colour Staple Tee"),
    hoverImageSrc: buildPlaceholderImage("Staple Tee Back", "EEE", "4B4D72"),
    href: "/products/as-colour-staple-tee",
  },
  {
    id: "continental-hoodie",
    title: "Continental Hoodie",
    vendor: "Continental",
    price: "$58.00",
    imageSrc: buildPlaceholderImage("Continental Hoodie", "F5F2ED", "4B4D72"),
    hoverImageSrc: buildPlaceholderImage("Continental Hoodie Back", "EEE", "2B3990"),
    href: "/products/continental-hoodie",
  },
  {
    id: "stanley-stella-creator",
    title: "Stanley/Stella Creator 2.0",
    vendor: "Stanley/Stella",
    price: "$32.00",
    imageSrc: buildPlaceholderImage("Stanley/Stella Creator", "FBFBF6", "4B4D72"),
    hoverImageSrc: buildPlaceholderImage("Creator 2.0 Back", "F1FFA5", "2B3990"),
    href: "/products/stanley-stella-creator-2",
  },
  {
    id: "earth-positive-hoodie",
    title: "Earth Positive EP60P Pullover",
    vendor: "Earth Positive",
    price: "$64.00",
    imageSrc: buildPlaceholderImage("Earth Positive Hoodie", "EFFE9C", "2B3990"),
    hoverImageSrc: buildPlaceholderImage("EP60P Back", "FBFBF6", "4B4D72"),
    href: "/products/earth-positive-ep60p",
  },
];

export const brandOptions = [
  { value: "all", label: "All Brands" },
  { value: "ASColour", label: "AS Colour" },
  { value: "Continental", label: "Continental" },
  { value: "Stanley Stella", label: "Stanley/Stella" },
  { value: "Earth Positive", label: "Earth Positive" },
];

export const storefrontServices = [
  {
    key: "screen-printing",
    title: "Screen Printing",
    description:
      "Premium water-based and plastisol prints for event merch, retail drops, and bulk staff uniforms.",
    imageSrc: buildPlaceholderImage("Screen Printing", "FBFBF6", "2B3990"),
    ctaLabel: "Get a quote",
    ctaHref: "/pages/screen-printing",
  },
  {
    key: "embroidery",
    title: "Embroidery",
    description:
      "A durable stitched finish for caps, hospitality uniforms, and premium corporate apparel.",
    imageSrc: buildPlaceholderImage("Embroidery", "EEE", "4B4D72"),
    ctaLabel: "Learn more",
    ctaHref: "/pages/embroidery",
  },
  {
    key: "heat-transfers",
    title: "Heat Transfers",
    description:
      "Best for complex artwork, names and numbers, and short runs that need crisp full-colour results.",
    imageSrc: buildPlaceholderImage("Heat Transfers", "F5F2ED", "2B3990"),
    ctaLabel: "View technique",
    ctaHref: "/pages/heat-transfers",
  },
  {
    key: "finishing",
    title: "Finishing",
    description:
      "Relabelling, folding, bagging, and neck tag printing for polished launch-ready merchandise.",
    imageSrc: buildPlaceholderImage("Finishing", "FBFBF6", "4B4D72"),
    ctaLabel: "Explore finishing",
    ctaHref: "/pages/finishes",
  },
  {
    key: "custom-patches",
    title: "Custom Patches",
    description:
      "Woven, embroidered, and PVC patches for jackets, totes, caps, and seasonal collections.",
    imageSrc: buildPlaceholderImage("Custom Patches", "EEE", "2B3990"),
    ctaLabel: "See examples",
    ctaHref: "/pages/patches",
  },
  {
    key: "custom-woven-label",
    title: "Custom Woven Label",
    description:
      "Give all of the details you need while putting the finishing touches on your product.",
    imageSrc: buildPlaceholderImage("Woven Labels", "FBFBF6", "2B3990"),
    ctaLabel: "Learn more",
    ctaHref: "/pages/custom-woven-labels",
  },
  {
    key: "custom-packaging",
    title: "Custom Packaging",
    description:
      "The ultimate finishing touch; custom packaging. It\u2019s the first thing your customer sees, make the best impression possible.",
    imageSrc: buildPlaceholderImage("Custom Packaging", "EEE", "4B4D72"),
    ctaLabel: "Learn more",
    ctaHref: "/pages/custom-packaging",
  },
  {
    key: "printed-seam-tape",
    title: "Printed Seam Tape",
    description:
      "Add a custom touch to the inside of your cap with printed seam tape. A small touch that makes a big impression.",
    imageSrc: buildPlaceholderImage("Seam Tape", "F5F2ED", "2B3990"),
    ctaLabel: "Learn more",
    ctaHref: "/pages/printed-seam-tape",
  },
  {
    key: "high-density-transfer",
    title: "High Density Transfer",
    description:
      "A heat-applied decoration that creates a raised, textured print using layered ink, producing a bold, dimensional effect.",
    imageSrc: buildPlaceholderImage("HD Transfer", "FBFBF6", "4B4D72"),
    ctaLabel: "Learn more",
    ctaHref: "/pages/high-density-transfer",
  },
  {
    key: "knitted-all-over",
    title: "Knitted All-over",
    description:
      "Knitted all-over designs weave patterns directly into the fabric of your custom socks, creating a seamless, durable look.",
    imageSrc: buildPlaceholderImage("Knitted All-over", "EEE", "2B3990"),
    ctaLabel: "Learn more",
    ctaHref: "/pages/knitted-all-over",
  },
  {
    key: "dye-sublimation",
    title: "Dye-sublimation",
    description:
      "Vibrant, full-colour designs seamlessly printed on your custom socks. High-quality, durable prints that won\u2019t fade.",
    imageSrc: buildPlaceholderImage("Dye Sublimation", "FBFBF6", "2B3990"),
    ctaLabel: "Learn more",
    ctaHref: "/pages/dye-sublimation",
  },
  {
    key: "custom-neck-tags",
    title: "Custom Neck Tags",
    description:
      "Whether you choose woven labels or screen printing, our high-quality neck tags offer a professional finish.",
    imageSrc: buildPlaceholderImage("Neck Tags", "F5F2ED", "4B4D72"),
    ctaLabel: "Learn more",
    ctaHref: "/pages/custom-neck-tags",
  },
  {
    key: "pip-tags",
    title: "Pip Tags",
    description:
      "Elevate your garments with custom pip tags. A small detail with a big impact for your apparel collection.",
    imageSrc: buildPlaceholderImage("Pip Tags", "EEE", "2B3990"),
    ctaLabel: "Learn more",
    ctaHref: "/pages/pip-tags",
  },
];

export const storefrontLocations = [
  "Northland",
  "Auckland",
  "Waikato",
  "Bay of Plenty",
  "Wellington",
  "Canterbury",
  "Otago",
  "Australia",
  "International",
];

export const nzQuoteDetails = {
  firstName: "Jamie",
  lastName: "Murray",
  email: "jamie@theprintroom.nz",
  phone: "+64 21 555 1234",
  businessName: "The Print Room",
  shippingAddress: "15 Dixon Street\nTe Aro\nWellington 6011\nNew Zealand",
  invoiceAddress: "PO Box 1043\nWellington 6140\nNew Zealand",
  shippingCountry: "NZ",
  freightOption: "air" as const,
};

export const auQuoteDetails = {
  firstName: "Aroha",
  lastName: "Campbell",
  email: "orders@theprintroom.com.au",
  phone: "+61 3 9000 1234",
  businessName: "Print Room Australia",
  shippingAddress: "Level 2, 79 Gertrude Street\nFitzroy VIC 3065\nAustralia",
  invoiceAddress: "Level 2, 79 Gertrude Street\nFitzroy VIC 3065\nAustralia",
  shippingCountry: "AU",
  freightOption: "sea" as const,
};

export const storefrontTestimonials = [
  {
    name: "Ruby T.",
    role: "Brand Manager, Coffee Supreme",
    quote:
      "Print Room handled our AS Colour launch merch from samples to delivery and the finish was spot on.",
  },
  {
    name: "Sam K.",
    role: "Operations Lead, Festival X",
    quote:
      "The Wellington team turned around embroidered caps and screen printed tees faster than anyone else we talked to.",
  },
  {
    name: "Hana R.",
    role: "Marketing Manager, University Club",
    quote:
      "We used the quote flow for hoodies, totes, and patches and every detail stayed organised all the way to sign-off.",
  },
];

export const storefrontBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "T-Shirts", href: "/collections/t-shirts" },
  { label: "AS Colour Staple Tee", href: "/products/as-colour-staple-tee", current: true },
];

export const storefrontPaginationItems = [
  { page: 1, href: "/collections/t-shirts?page=1" },
  { page: 2, href: "/collections/t-shirts?page=2" },
  { page: 3, href: "/collections/t-shirts?page=3", current: true },
  { page: 4, href: "/collections/t-shirts?page=4" },
  { page: 5, href: "/collections/t-shirts?page=5" },
];

export const businessInfo = {
  name: "The Print Room",
  address: "21 Grosvenor Street, Kensington, Dunedin 9012",
  phone: "+64 3 425 9694",
  email: "hello@theprint-room.co.nz",
  domain: "theprintroom.nz",
  locations: ["Auckland", "Wellington"],
  socialLinks: {
    instagram: "https://www.instagram.com/printroomnz/",
    facebook: "https://www.facebook.com/theprintroomnz/",
    youtube: "https://www.youtube.com/c/ThePrintRoomDunedin",
  },
};

export const treePlanting = {
  treesPerOrder: 10,
  minimumOrderNzd: 500,
  currentTally: 13720,
  landingPage: "/pages/plantingtrees",
  announcementText:
    "We plant 10 trees in NZ for every order over $500. Current tally: 13,720",
};

export const designToolViews = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "left-sleeve", label: "Left Sleeve" },
  { id: "right-sleeve", label: "Right Sleeve" },
];
