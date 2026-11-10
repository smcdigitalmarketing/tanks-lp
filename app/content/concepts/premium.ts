import type { Concept } from "~/content/types";
import { GUARANTEE_FLAG, photos, reviewBy, sizeGuide } from "~/content/product";

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
    christmas: {
      banner: "The Christmas edit · The gift set of three, {price:trio}",
      eyebrow: "The Christmas edit",
      headline: "The Support Tank, to give",
      sub: "Seasonal pricing on every set, for giving or for keeping.",
      cta: "Add to bag",
      badge: "The gift set",
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
  home: {
    hero: {
      eyebrow: "Oriel · The Support Tank",
      headline: "The bra, built into the tank",
      sub: "Soft cups, broad straps and a clean line. No wire, no hooks, no band: one layer that does the work of two.",
      cta: "Shop the Support Tank",
    },
    problem: {
      eyebrow: "The design problem",
      headline: "It was never your body. It was the architecture.",
      body: [
        "Most bras hold you the same way: two narrow straps, one tight band, often a wire. The support is real, but it is concentrated into a few thin lines.",
        "Those lines are what you feel by the afternoon: marks on the shoulder, a band to adjust, hooks to reach for at the end of the day. Change the architecture and the feeling changes with it.",
      ],
      points: [
        {
          label: "Straps",
          text: "Thin straps carry everything along two narrow lines. Ours are broad and lie flat.",
        },
        {
          label: "Band",
          text: "An elastic band wraps the ribs all day. The Support Tank has none.",
        },
        {
          label: "Hardware",
          text: "Wires, hooks and clasps press where they sit. There are none here.",
        },
      ],
    },
    shop: {
      eyebrow: "The Support Tank",
      headline: "Select your set",
      sub: "Each tank in a set is chosen by colourway and size. Thirteen colourways, S to 4XL.",
    },
    blackFriday: {
      hero: {
        eyebrow: "Early Black Friday",
        headline: "The Support Tank, at its Black Friday price",
        sub: "Early access to seasonal pricing on every set. The same tank: soft cups, broad straps, and no wire, hooks or band.",
        cta: "Shop Black Friday sets",
      },
    },
    christmas: {
      hero: {
        eyebrow: "The Christmas edit",
        headline: "A considered gift: comfort, built in",
        sub: "The Support Tank in thirteen colourways, sized by a single measurement. A gift that is worn, rather than kept in a drawer.",
        cta: "Shop gift sets",
      },
      gift: {
        eyebrow: "Giving",
        headline: "Easy to choose. Easy to change.",
        sub: "Three reasons the Support Tank works as a gift.",
        points: [
          {
            title: "Sized like a shirt",
            text: "S to 4XL, by bust measurement. If you know her usual size, you are most of the way there.",
            flag: sizeGuide.flag,
          },
          {
            title: "A free size exchange",
            text: "If the size is wrong, one free exchange within 90 days of delivery. She keeps the first.",
            flag: GUARANTEE_FLAG,
          },
          {
            title: "Thirteen colourways",
            text: "From nude and black to softer shades. Choose one for each tank in a set.",
          },
        ],
      },
      closing: {
        headline: "Give less to wear. Nothing to fasten.",
        body: "The Support Tank in a gift set of three or five, each tank in its own colourway and size.",
        cta: "Shop gift sets",
      },
    },
  },
  sevenReasons: {
    byline: "Oriel Journal",
    readTime: "4 min read",
    review: "Heather Kurtin",
    base: {
      kicker: "Oriel Journal · Seven reasons",
      headline: "Seven reasons the Support Tank replaces the bra",
      dek: "A design case in seven parts: what the built-in tank removes, what it keeps, and why it is worth the change.",
      intro: [
        "The bra has barely changed in a century. Two straps, a band, hooks at the back, and often a wire.",
        "The Support Tank starts somewhere else: with a tank you would wear anyway, and the support built into it. Here is the case for it, in seven parts.",
      ],
      reasons: [
        {
          tag: "Construction",
          title: "Nothing rigid against the body",
          body: [
            "No underwire, no hooks, no clasps. The support comes from soft cups set inside the front panel, so nothing hard presses where it sits.",
            "By mid-afternoon, that is the difference you notice.",
          ],
          image: photos.cupDetail,
        },
        {
          tag: "Dressing",
          title: "It goes on over the head",
          body: [
            "Like any tank: pull it on, and the support is already in place. No reaching behind your back, no fastening, no adjusting in the mirror.",
            "Dressing becomes one movement rather than several.",
          ],
          image: photos.pullOn,
        },
        {
          tag: "Sizing",
          title: "One size, not a band and a cup",
          body: [
            "Seven sizes, S to 4XL, chosen by a single bust measurement taken over your usual bra. No band numbers and no cup letters.",
            "Between two sizes, choose the larger.",
          ],
          image: photos.front,
          flag: sizeGuide.flag,
        },
        {
          tag: "The layer",
          title: "One layer instead of two",
          body: [
            "A bra under a tank is two garments doing one job. The Support Tank is both: a single smooth layer, worn alone or beneath a shirt or a knit.",
            "Cut long enough to tuck in, for an uninterrupted line.",
          ],
          image: photos.brownPair,
        },
        {
          tag: "The strap",
          title: "Broad straps that lie flat",
          body: [
            "The straps are wide and soft, so the support is carried across the shoulder rather than along two narrow lines.",
            "There are no sliders, and nothing to adjust.",
          ],
          image: photos.strap,
        },
        {
          tag: "The band",
          title: "No band around the ribs",
          body: [
            "Most bras rely on a tight elastic band, worn around the ribs for the whole day. The Support Tank has none.",
            "Nothing to dig in, and nothing to unfasten when you get home.",
          ],
          image: photos.back,
        },
        {
          tag: "The fit",
          title: "A fit guarantee, if the size is wrong",
          body: [
            "Choosing a size from a screen is difficult. If it isn't right, tell us within 90 days of delivery and we will send another size, at no cost.",
            "You keep the first. There is nothing to post back.",
          ],
          image: photos.portrait,
          flag: GUARANTEE_FLAG,
        },
      ],
      ctas: [
        "Discover the Support Tank",
        "Select your set",
        "Select your colourways",
      ],
      closing: {
        eyebrow: "The Support Tank",
        headline: "Less to wear. Nothing to fasten.",
        body: "Sets of three and five, each tank chosen by colourway and size. Buy two, receive a third: {price:trio} for the set.",
        cta: "Select your set",
      },
    },
    blackFriday: {
      kicker: "Early Black Friday · Oriel Journal",
      dek: "A design case in seven parts, with early access to Black Friday pricing on every set.",
      closing: {
        eyebrow: "Early Black Friday",
        headline: "The Support Tank, at its Black Friday price",
        body: "The set of five for {price:five}, {each:five} a tank. Every set, priced early.",
        cta: "Shop Black Friday sets",
      },
    },
    christmas: {
      kicker: "The Christmas edit · Oriel Journal",
      headline: "Seven reasons the Support Tank is this year's gift",
      dek: "A gift that is worn rather than kept: the built-in tank, in seven parts.",
      intro: [
        "Most gifts of clothing are a guess. The Support Tank is less of one: sized like a shirt, in thirteen colourways, with a free size exchange if the guess is wrong.",
        "Here is the case for giving it, in seven parts.",
      ],
      reasons: {
        2: {
          tag: "Choosing",
          title: "Easy to buy for someone else",
          body: [
            "Seven sizes, S to 4XL, chosen the way you would choose a shirt. If you know her usual size, you are most of the way there.",
            "For a closer match, the size guide gives the bust range for each size.",
          ],
          image: photos.front,
          flag: sizeGuide.flag,
        },
        6: {
          tag: "If it's wrong",
          title: "A size exchange, without the awkwardness",
          body: [
            "If the size isn't right, she tells us within 90 days of delivery and we send another, at no cost.",
            "She keeps the first. Nothing to post back, nothing to explain.",
          ],
          image: photos.portrait,
          flag: GUARANTEE_FLAG,
        },
      },
      ctas: ["Discover the gift", "Select a gift set", "Select colourways"],
      closing: {
        eyebrow: "The Christmas edit",
        headline: "The Support Tank, to give",
        body: "The gift set of three for {price:trio}, {each:trio} a tank, each in its own colourway and size.",
        cta: "Shop gift sets",
      },
    },
  },
};
