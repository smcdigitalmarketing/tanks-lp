import type { Concept } from "~/content/types";
import { photos, reviewBy } from "~/content/product";

/**
 * Concept B · Modern Premium Essentials.
 * Minimal, refined, confident: an elevated wardrobe piece, presented like a
 * contemporary apparel label. Few words, no exclamation marks, lots of space.
 */
export const premium: Concept = {
  slug: "premium",
  letter: "B",
  direction: "Modern Premium Essentials",
  brand: {
    name: "Oriel",
    productName: "Support Tank",
    tagline: "Essentials, designed around comfort.",
    positioning:
      "An elevated wardrobe essential: the built-in bra tank presented as a considered design piece, sold on line, fabric feel and simplicity rather than on discounts.",
    voice:
      "Spare, assured and editorial. Short declarative lines, design language (line, layer, cut), no exclamation marks.",
    targetFeeling: "An elevated wardrobe essential designed around comfort.",
    palette: [
      { name: "Ivory", hex: "#F7F4EE", role: "Page background" },
      { name: "Charcoal", hex: "#232323", role: "Text, buttons" },
      { name: "Taupe", hex: "#8C7B6B", role: "Accents, labels" },
      { name: "Stone", hex: "#ECE6DC", role: "Alternate sections" },
      { name: "Linen", hex: "#FFFDF9", role: "Cards" },
    ],
    fonts: { display: "Cormorant Garamond", body: "Inter" },
    googleFonts:
      "family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600",
    support: {
      email: "client@oriel.example",
      hours: "Monday to Friday, 9am–6pm",
    },
  },
  hypothesis:
    "A premium, editorial presentation lets the same tank hold its price: buyers who see a design piece rather than a deal convert on single tanks and sets without heavy discount messaging.",
  meta: {
    title: "Oriel · The Support Tank",
    description:
      "A refined tank with the bra built in. No wire, no hooks, no band. Concept B for internal review.",
  },
  layout: {
    hero: "headline",
    tiers: "rows",
    reviews: "quotes",
    valueProps: "alternating",
    divider: "rule",
    advertorial: "editorial",
  },
  pdp: {
    kicker: "The wardrobe essential, reconsidered",
    eyebrow: "Oriel · Essentials",
    title: { product: "The Support Tank", benefit: "Quiet support, built in" },
    subtitle:
      "A refined tank with a built-in bra. No wire, no hooks, no band: a single clean layer, worn alone or beneath everything else.",
    bullets: [
      { icon: "check", text: "Soft built-in cups; no underwire or hooks" },
      { icon: "check", text: "Broad straps that lie flat" },
      { icon: "check", text: "A clean line under knitwear and shirting" },
      { icon: "check", text: "Thirteen colourways, sizes S–4XL" },
    ],
    gallery: {
      benefit: {
        eyebrow: "Oriel · The Support Tank",
        headline: "The tank, with the bra built in",
        sub: "No wire. No hooks. No band.",
      },
      lifestyle: {
        eyebrow: "Worn",
        headline: "Considered from the inside out",
        points: ["Soft cups", "Broad straps", "Longer cut"],
      },
      vsBra: { headline: "Less to wear. Nothing to fasten." },
      included: { headline: "The details" },
      howItWorks: { headline: "On in a moment" },
      vsAlternatives: { headline: "Against the alternatives" },
      review: { headline: "Worn, and reviewed" },
      video: { eyebrow: "In motion", headline: "One layer, nothing to fasten" },
    },
    steps: {
      bundle: "Select a set",
      colour: "Select colourways",
      size: "Select your size",
    },
    accordionIntro: {
      title: "Why it works",
      body: [
        "The support lives in the tank: soft cups at the front, broad straps over the shoulder.",
        "Nothing to fasten, nothing to adjust, nothing to show through.",
        "Cut long enough to tuck in, for a clean line under shirting and knitwear.",
      ],
    },
    reviews: {
      eyebrow: "Notes from wearers",
      headline: "In their words",
      sub: "Unedited reviews from verified buyers of the original built-in bra tank.",
    },
    valueProps: {
      eyebrow: "Design notes",
      headline: "Three decisions behind the Support Tank",
      items: [
        {
          eyebrow: "01 · Construction",
          headline: "Support without wire, hooks or a band",
          body: "Soft cups sit inside the front panel. With no underwire, no clasp and no elastic band, there is nothing rigid against the body.",
          image: photos.cupDetail,
        },
        {
          eyebrow: "02 · The strap",
          headline: "A strap that lies flat",
          body: "Broad shoulder straps carry the support across the shoulder rather than along two narrow lines, and there is nothing to adjust.",
          image: photos.strap,
        },
        {
          eyebrow: "03 · The line",
          headline: "A clean line under everything",
          body: "One smooth layer, cut long enough to tuck in, so nothing interrupts a fine knit or a fitted shirt.",
          image: photos.brownPair,
        },
      ],
    },
    howItWorks: {
      eyebrow: "Wearing it",
      headline: "Dressing, simplified",
      sub: "Three steps, none of them behind your back.",
      steps: [
        {
          title: "Pull on",
          body: "Over the head, like any tank. The support is already in place.",
        },
        {
          title: "Tuck in",
          body: "Into trousers or a skirt, for a clean, continuous line.",
        },
        {
          title: "Layer",
          body: "Wear it alone, or beneath a shirt, a blazer or a knit.",
        },
      ],
    },
    comparison: {
      headline: "Against the alternatives",
      sub: "What each option asks of you, at a glance.",
    },
    guarantee: {
      headline: "The right fit, guaranteed",
      body: "If the size isn't right, tell us and we will send another, at no cost. You keep the first.",
      cta: "Select your set",
    },
    faq: { headline: "Questions", sub: "Before you order." },
    closing: {
      headline: "Less to wear. Nothing to fasten.",
      body: "The Support Tank: soft cups, broad straps and a clean line, in thirteen colourways.",
      cta: "Shop the Support Tank",
    },
    footerBlurb: "Wardrobe essentials, designed around comfort.",
  },
  offers: {
    standard: {
      banner: "The Support Tank · Buy two, the third is complimentary",
      eyebrow: "Sets",
      headline: "Sets of three and five",
      sub: "Buy two, receive a third. Buy three, receive two.",
      cta: "Add to bag",
      badge: "Most chosen",
    },
    "early-black-friday": {
      banner: "Early Black Friday · The set of five, {price:five}",
      eyebrow: "Early Black Friday",
      headline: "The Support Tank, at its Black Friday price",
      sub: "Early access to seasonal pricing on every set.",
      cta: "Add to bag",
      badge: "The set of five",
    },
  },
  advertorial: {
    kicker: "Oriel Journal · On dressing",
    headline: "The case for wearing less",
    dek: "Why the bra has become the least comfortable thing in the wardrobe, and what a built-in alternative changes.",
    byline: "Oriel Journal",
    readTime: "5 min read",
    lead: photos.portrait,
    leadCaption: "The Support Tank in nude.",
    intro: [
      "Ask a room of women which piece of clothing they would happily never wear again, and the answer arrives quickly.",
      "The bra is an odd survivor in a wardrobe that has otherwise become softer and simpler. Trousers gained stretch, shoes lost their heels, knitwear became something you could sleep in. The bra, for the most part, kept its hooks.",
    ],
    sections: [
      {
        title: "Three lines of pressure",
        body: [
          "Most bras rely on the same architecture: two straps and a band, often with an underwire. The support is real, but it is concentrated into a few narrow lines.",
          "That concentration is what you notice by mid-afternoon. It is less a fault of any one bra than of the design itself.",
        ],
        image: photos.braVsTank,
        caption: "A traditional bra beside the Support Tank, from behind.",
      },
      {
        title: "Moving the support into the garment",
        body: [
          "The built-in tank takes a different approach. Soft cups sit inside the front panel of a fitted tank, and broad straps take the place of thin ones. There is no clasp and no separate band.",
          "It is not shapewear, and it is not compression. It is a tank you would wear anyway, with the support already where it needs to be.",
        ],
        image: photos.cupDetail,
        caption: "Soft cups, inside the front panel.",
      },
      {
        title: "The appeal of one layer",
        body: [
          "Simplicity is the point. One garment, pulled on over the head, tucked in or worn loose, layered under a shirt or worn alone.",
          "For many women that ease matters more than any single feature: fewer decisions in the morning, and nothing to adjust once the day has begun.",
        ],
        pullQuote: reviewBy("Heather Kurtin"),
      },
      {
        title: "What it is, and what it isn't",
        body: [
          "A built-in tank replaces the bra for ordinary days. It does not replace every bra you own.",
        ],
        list: [
          {
            label: "It is",
            text: "Everyday support without wire, hooks or a band, in sizes S to 4XL.",
          },
          {
            label: "It isn't",
            text: "A sports bra. For running and high-impact exercise, choose something made for it.",
          },
          {
            label: "Fit",
            text: "Chosen by bust measurement, taken over a bra. Between sizes, the larger one.",
          },
          {
            label: "If it's wrong",
            text: "One free size exchange within 90 days of delivery.",
          },
        ],
        image: photos.collage,
        caption: "The Support Tank in coffee, with the built-in cups.",
      },
      {
        title: "Common reservations",
        body: ["Three we hear most often, answered plainly."],
        list: [
          {
            label: "“I need real support.”",
            text: "It is everyday support, designed for a full day of ordinary wear. Fit makes the difference, which is why sizing is by measurement.",
          },
          {
            label: "“It will show under fine fabric.”",
            text: "Choose the shade closest to your skin tone for sheer or white tops.",
          },
          {
            label: "“It will ride up.”",
            text: "The longer cut is meant to be tucked in. Some wearers report riding up when the size isn't right: measure first, and exchange if needed.",
          },
        ],
      },
    ],
    closing: {
      headline: "The Support Tank",
      body: "Thirteen colourways, sizes S to 4XL, and a fit guarantee if the size isn't right.",
      cta: "Discover the Support Tank",
    },
  },
};
