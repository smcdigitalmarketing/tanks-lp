import type { Concept } from "~/content/types";
import { photos, reviewBy } from "~/content/product";

/**
 * Concept C · Contemporary Comfortwear.
 * Modern, energetic, practical: a direct-to-consumer apparel brand. Short,
 * confident lines, numbers and lists, the product shown doing its job.
 */
export const contemporary: Concept = {
  slug: "contemporary",
  letter: "C",
  direction: "Contemporary Comfortwear",
  brand: {
    name: "Daywell",
    productName: "Bra Tank",
    tagline: "Everyday clothing that works harder.",
    positioning:
      "A modern DTC comfortwear brand: the bra tank as a practical upgrade, one piece that replaces two, sold with direct copy, clear numbers and strong product photography.",
    voice:
      "Direct, practical and confident. Short lines, numbers, lists. Says what it does and stops.",
    targetFeeling: "Everyday clothing that works harder and feels better.",
    palette: [
      { name: "White", hex: "#FFFFFF", role: "Page background" },
      { name: "Warm grey", hex: "#F2EFEB", role: "Alternate sections" },
      { name: "Deep plum", hex: "#5A2A4E", role: "Buttons, accents" },
      { name: "Terracotta", hex: "#C2603F", role: "Highlights, stars" },
      { name: "Ink", hex: "#1B1720", role: "Text, footer" },
    ],
    fonts: { display: "Space Grotesk", body: "Manrope" },
    googleFonts:
      "family=Space+Grotesk:wght@500;600;700&family=Manrope:wght@400;500;600;700;800",
    support: {
      email: "team@daywell.example",
      hours: "Monday to Friday, 8am–6pm",
    },
  },
  hypothesis:
    "A direct, practical DTC pitch (one piece instead of two, clear pack maths) moves buyers to the 3- and 5-packs faster than an emotional or premium story.",
  meta: {
    title: "Daywell Bra Tank · Your tank and your bra, in one",
    description:
      "Support built into a tank: no underwire, no hooks, no band. Concept C for internal review.",
  },
  layout: {
    hero: "reverse",
    tiers: "columns",
    reviews: "list",
    valueProps: "numbered",
    divider: "none",
    advertorial: "magazine",
  },
  pdp: {
    kicker: "Everyday clothing that works harder",
    eyebrow: "The Bra Tank",
    title: {
      product: "Daywell Bra Tank",
      benefit: "Your tank and your bra, now one piece",
    },
    subtitle:
      "Support built into a tank you'll want to wear all day. No underwire. No hooks. No band. Pull it on and go.",
    bullets: [
      { icon: "layers", text: "One layer instead of two" },
      { icon: "noHooks", text: "Zero hardware: no wire, hooks or clasps" },
      { icon: "feather", text: "Wide straps with nothing to adjust" },
      { icon: "ruler", text: "Seven sizes, S–4XL, by bust measurement" },
    ],
    gallery: {
      benefit: {
        eyebrow: "Daywell Bra Tank",
        headline: "Two layers. Now one.",
        sub: "A tank with the bra built in.",
        chips: ["No wire", "No hooks", "No band"],
      },
      lifestyle: {
        eyebrow: "Everyday",
        headline: "Made for the whole day, not an hour",
        points: ["Errands", "Work", "Travel"],
      },
      vsBra: { headline: "Lose the hardware" },
      included: { headline: "What you get" },
      howItWorks: { headline: "Pull on. Tuck in. Go." },
      vsAlternatives: { headline: "The scorecard" },
      review: { headline: "Real review, real words" },
      video: { eyebrow: "Watch", headline: "Bra off. Tank on." },
    },
    steps: {
      bundle: "Pick your pack",
      colour: "Pick your colours",
      size: "Pick your size",
    },
    accordionIntro: {
      title: "Why it works",
      body: [
        "Support is built into the tank: soft cups in front, wide straps on top.",
        "Zero hardware: no underwire, hooks or clasps, and no band around your ribs.",
        "Long enough to tuck in, so it sits smooth under tees, shirts and knits.",
      ],
    },
    reviews: {
      eyebrow: "Reviews",
      headline: "What wearers say about built-in support",
      sub: "Real reviews from verified buyers of the original built-in bra tank.",
    },
    valueProps: {
      eyebrow: "Why Daywell",
      headline: "Made to make mornings easier",
      items: [
        {
          eyebrow: "Zero hardware",
          headline: "No wire. No hooks. No band.",
          body: "The support sits in soft cups inside the front panel. Nothing to clip, nothing to dig in, no band to ride up your back.",
          image: photos.cupDetail,
        },
        {
          eyebrow: "Wide straps",
          headline: "Flat on your shoulders",
          body: "Broad straps spread the support over your shoulders instead of two thin lines. Nothing to adjust before you head out.",
          image: photos.strap,
        },
        {
          eyebrow: "Long cut",
          headline: "Long enough to tuck in",
          body: "The longer length tucks into jeans and trousers for one smooth layer under whatever you wear on top.",
          image: photos.brownPair,
        },
      ],
    },
    howItWorks: {
      eyebrow: "How it works",
      headline: "Pull on. Tuck in. Go.",
      sub: "No reaching behind your back, no hooks to line up.",
      steps: [
        {
          title: "Pull on",
          body: "Over your head like any tank. The support is already built in.",
        },
        {
          title: "Tuck in",
          body: "Into jeans, trousers or a skirt for a smooth line.",
        },
        {
          title: "Go",
          body: "Wear it alone or under anything. That's the whole routine.",
        },
      ],
    },
    comparison: {
      headline: "The scorecard",
      sub: "Built-in support against the usual options.",
    },
    guarantee: {
      headline: "Wrong size? We'll swap it free",
      body: "Tell us and we'll send a different size at no cost. Keep the first one.",
      cta: "Pick your pack",
    },
    faq: { headline: "FAQ", sub: "Quick answers. Still stuck? Email us." },
    closing: {
      headline: "Make getting dressed the easy part",
      body: "One tank. Support built in. Thirteen colours, sizes S to 4XL.",
      cta: "Shop the Bra Tank",
    },
    footerBlurb: "Everyday clothing that works harder and feels better.",
  },
  offers: {
    standard: {
      banner: "Buy 2, get 1 free · Buy 3, get 2 free",
      eyebrow: "Packs",
      headline: "Buy 2, get 1 free",
      sub: "Or buy 3, get 2 free.",
      cta: "Add to cart",
      badge: "Most popular",
    },
    "early-black-friday": {
      banner: "Early Black Friday: 5 tanks for {price:five} ({each:five} each)",
      eyebrow: "Early Black Friday",
      headline: "Black Friday pricing, live now",
      sub: "Every pack, marked down early.",
      cta: "Add to cart",
      badge: "Best deal",
    },
  },
  advertorial: {
    kicker: "Daywell Explains",
    headline: "5 reasons to swap your bra for a built-in bra tank",
    dek: "Straps, bands, wires, hooks: here's what a bra tank gets rid of, and what it doesn't.",
    byline: "Daywell",
    readTime: "3 min read",
    lead: photos.brownPair,
    leadCaption: "The Daywell Bra Tank in coffee.",
    intro: [
      "Bras do a job. But for an ordinary day of errands, work and sitting at a desk, plenty of us would trade the hooks and the band for something simpler.",
      "Here's what a built-in bra tank is, how it compares, and who it's for.",
    ],
    sections: [
      {
        title: "1. The band is the problem",
        body: [
          "Traditional bras pull their support into a few narrow places: a band around your ribs, two straps on your shoulders, and sometimes a wire.",
          "Hours later, that's exactly where you feel it. A built-in bra tank has no band of its own.",
        ],
        image: photos.braVsTank,
        caption: "Left: hooks, band, straps. Right: none of the three.",
      },
      {
        title: "2. The support is built in",
        body: [
          "Soft cups sit inside the front panel. Wide straps sit flat on your shoulders. There's nothing to clip, slide or fasten.",
        ],
        image: photos.cupDetail,
        caption: "The built-in cups.",
      },
      {
        title: "3. One layer, not two",
        body: [
          "It's a tank and a bra in one piece. Wear it alone or under a tee, a shirt or a sweater. It's cut long enough to tuck in.",
        ],
        image: photos.pullOn,
        caption: "On over your head, like any tank.",
      },
      {
        title: "4. Bra vs bra tank, side by side",
        body: ["The short version:"],
        list: [
          { label: "Hooks", text: "Bra: yes. Tank: none." },
          { label: "Band", text: "Bra: a tight band. Tank: none." },
          {
            label: "Straps",
            text: "Bra: thin, often adjustable. Tank: wide, nothing to adjust.",
          },
          {
            label: "Support",
            text: "Bra: firm to light. Tank: everyday support, not for high impact.",
          },
          { label: "Layers", text: "Bra: plus a top. Tank: just the tank." },
        ],
      },
      {
        title: "5. The fine print",
        body: ["What to know before you buy."],
        list: [
          {
            label: "Bigger bust?",
            text: "Sizes run S to 4XL by bust measurement. Measure, check the guide, and size up if you're between.",
          },
          {
            label: "Will it ride up?",
            text: "Tuck it in. If it still rides up, the size is probably wrong, and we swap it free within 90 days.",
          },
          { label: "Washing?", text: "Cold, gentle, lay flat to dry." },
          { label: "Sport?", text: "Not designed for running or high impact." },
        ],
        pullQuote: reviewBy("Esskaye"),
      },
    ],
    closing: {
      headline: "Try the Daywell Bra Tank",
      body: "Pick a pack, pick your colours, measure for your size. Wrong size? We swap it free.",
      cta: "Shop the Bra Tank",
    },
  },
};
