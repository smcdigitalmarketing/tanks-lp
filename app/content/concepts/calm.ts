import type { Concept } from "~/content/types";
import { GUARANTEE_FLAG, photos, reviewBy, sizeGuide } from "~/content/product";

/**
 * Remix E · Scandinavian Calm.
 * Quiet, unhurried, natural: birch, oat, sage and slate, one light grotesque
 * throughout, short sentences and plenty of space. No shouting, even on sale.
 */
export const calm: Concept = {
  slug: "calm",
  letter: "E",
  group: "remix",
  direction: "Scandinavian Calm",
  brand: {
    name: "Linnea",
    productName: "Base Tank",
    tagline: "Less to wear. More ease.",
    positioning:
      "A calm, Scandinavian-minded essential: the built-in bra tank as a quiet base layer, sold on ease and simplicity with soft natural tones and plenty of space.",
    voice:
      "Calm, unhurried and gentle. Short, quiet sentences, sensory words, no exclamation marks and no hard sell.",
    targetFeeling:
      "A quiet, easy base layer that takes something away from the morning, not adds to it.",
    palette: [
      { name: "Birch", hex: "#F6F4EF", role: "Page background" },
      { name: "Oat", hex: "#ECEAE3", role: "Alternate sections" },
      { name: "Sage", hex: "#7C8F7A", role: "Accents, labels" },
      { name: "Mist", hex: "#E3EADF", role: "Savings, highlights" },
      { name: "Slate", hex: "#2B3230", role: "Text, buttons" },
    ],
    fonts: { display: "Hanken Grotesk (Light)", body: "Hanken Grotesk" },
    googleFonts: "family=Hanken+Grotesk:wght@300;400;500;600",
    support: {
      email: "hej@linnea.example",
      hours: "Monday to Friday, 9am–5pm",
    },
  },
  hypothesis:
    "A calm, low-pressure presentation (muted tones, slow copy, no shouting) builds trust with buyers tired of hard-sell bra marketing, and converts well on singles and sets of three.",
  meta: {
    title: "Linnea Base Tank · Soft support, nothing to fasten",
    description:
      "A simple tank with a bra built in. No wire, no hooks, no band. Remix E.",
  },
  layout: {
    hero: "headline",
    tiers: "stack",
    reviews: "list",
    valueProps: "cards",
    divider: "none",
    advertorial: "editorial",
  },
  pdp: {
    kicker: "A quiet base layer",
    eyebrow: "Linnea · Base Tank",
    title: {
      product: "Linnea Base Tank",
      benefit: "Soft support, nothing to fasten",
    },
    subtitle:
      "A simple tank with a bra built in. No wire, no hooks, no band. Pull it on, and let the day be easy.",
    bullets: [
      { icon: "feather", text: "Soft cups, no underwire" },
      { icon: "noHooks", text: "Nothing to fasten at the back" },
      { icon: "layers", text: "One smooth base layer" },
      { icon: "palette", text: "Thirteen shades, from nude to navy" },
    ],
    gallery: {
      benefit: {
        eyebrow: "Linnea",
        headline: "A bra, quietly built in",
        sub: "No wire. No hooks. No band.",
      },
      lifestyle: {
        eyebrow: "Mornings",
        headline: "Getting dressed, made simple",
        points: ["Pull on", "Tuck in", "Breathe out"],
      },
      vsBra: { headline: "Less to wear" },
      included: { headline: "The essentials" },
      howItWorks: { headline: "Three simple steps" },
      vsAlternatives: { headline: "A gentler alternative" },
      review: { headline: "In a buyer's words" },
      video: { eyebrow: "Slowly", headline: "From bra to base layer" },
    },
    steps: {
      bundle: "Choose a set",
      colour: "Choose your shades",
      size: "Choose your size",
    },
    accordionIntro: {
      title: "Why it feels easy",
      body: [
        "Soft cups sit in the front panel; wide straps rest on the shoulders.",
        "No wire, no hooks, no band: nothing firm against you.",
        "Long enough to tuck in, so it lies smooth beneath other layers.",
      ],
    },
    reviews: {
      eyebrow: "Words from wearers",
      headline: "Quietly loved",
      sub: "Reviews from verified buyers of the original built-in bra tank.",
    },
    valueProps: {
      eyebrow: "Considered",
      headline: "Made to be forgotten about",
      items: [
        {
          eyebrow: "Softness",
          headline: "Nothing firm against you",
          body: "No underwire, no clasp, no elastic band. The support comes from soft cups inside the front panel.",
          image: photos.cupDetail,
        },
        {
          eyebrow: "Ease",
          headline: "Straps that rest flat",
          body: "Wide straps sit softly on the shoulder. There is nothing to adjust.",
          image: photos.strap,
        },
        {
          eyebrow: "Layering",
          headline: "A smooth base for everything",
          body: "One quiet layer, long enough to tuck in, under knits and shirts.",
          image: photos.brownPair,
        },
      ],
    },
    howItWorks: {
      eyebrow: "Ritual",
      headline: "Three simple steps",
      sub: "Nothing behind your back. Nothing to fasten.",
      steps: [
        {
          title: "Pull on",
          body: "Over the head, like any tank. The support is already there.",
        },
        {
          title: "Tuck in",
          body: "Into trousers or a skirt, for a smooth line.",
        },
        { title: "Exhale", body: "Wear it alone or layered. That's all." },
      ],
    },
    comparison: {
      headline: "A gentler alternative",
      sub: "How a built-in tank compares with the usual options.",
    },
    guarantee: {
      headline: "Ease, even if the size is wrong",
      body: "If it doesn't fit, tell us and we'll send another size, at no cost. You keep the first.",
      cta: "Choose a set",
    },
    faq: { headline: "Questions", sub: "Simple answers." },
    closing: {
      headline: "Less to wear. More ease.",
      body: "The Linnea Base Tank: soft cups, wide straps, nothing to fasten.",
      cta: "Shop the Base Tank",
    },
    footerBlurb: "Quiet essentials for easy days.",
  },
  offers: {
    standard: {
      banner: "Base Tank sets · Buy two, the third is on us",
      eyebrow: "Sets",
      headline: "Buy two, the third is on us",
      sub: "Or buy three, and two more are on us.",
      cta: "Add to bag",
      badge: "Most chosen",
    },
    "early-black-friday": {
      banner: "Early Black Friday · Five Base Tanks, {price:five}",
      eyebrow: "Early Black Friday",
      headline: "A calm Black Friday, a little early",
      sub: "Seasonal pricing on every set, without the rush.",
      cta: "Add to bag",
      badge: "Set of five",
    },
    christmas: {
      banner: "Christmas · Three Base Tanks, {price:trio}",
      eyebrow: "Christmas",
      headline: "A gift of ease",
      sub: "Gift pricing on every set.",
      cta: "Add to bag",
      badge: "To give",
    },
  },
  advertorial: {
    kicker: "Linnea Journal · On ease",
    headline: "The quiet case against the bra",
    dek: "Softer support, fewer layers, and what a tank with a bra built in changes about the morning.",
    byline: "Linnea Journal",
    readTime: "5 min read",
    lead: photos.mirror,
    leadCaption: "The Base Tank in nude.",
    intro: [
      "Getting dressed should be the simplest part of the day. For many women, the bra is the one piece that isn't.",
      "Hooks behind the back. A band that tightens as the hours pass. Straps that need a quiet adjustment in the mirror before leaving the house.",
    ],
    sections: [
      {
        title: "Where the effort goes",
        body: [
          "A traditional bra asks a few narrow places to do all the work: two straps, a band, and often a wire.",
          "Comfortable for an hour, perhaps. Across a whole day, the pressure stays in the same spots.",
        ],
        image: photos.braVsTank,
        caption: "A traditional bra and the Base Tank, from behind.",
      },
      {
        title: "A softer structure",
        body: [
          "The built-in tank moves the support into the garment. Soft cups sit inside the front panel; wide straps rest on the shoulder. There is no clasp and no separate band.",
          "It is not shapewear and it is not compression. It is simply a tank, with support where you need it.",
        ],
        image: photos.cupDetail,
        caption: "Soft cups, inside the front panel.",
      },
      {
        title: "Fewer layers, less thought",
        body: [
          "One piece instead of two. Pulled on over the head, tucked in or left loose, worn alone or beneath a knit.",
          "Ease is the whole idea.",
        ],
        pullQuote: reviewBy("Annmarie"),
      },
      {
        title: "What it is, and what it isn't",
        body: ["A base layer for ordinary days, not for every activity."],
        list: [
          {
            label: "It is",
            text: "Everyday support without wire, hooks or a band, in sizes S to 4XL.",
          },
          {
            label: "It isn't",
            text: "A sports bra. Choose something made for running or high impact.",
          },
          {
            label: "Fit",
            text: "Chosen by one bust measurement taken over a bra. Between sizes, the larger.",
          },
          {
            label: "If it's wrong",
            text: "One free size exchange within 90 days of delivery.",
          },
        ],
        image: photos.pullOn,
        caption: "On over the head, like any tank.",
      },
      {
        title: "Gentle reservations",
        body: ["Three questions we hear, answered plainly."],
        list: [
          {
            label: "“Will it support me?”",
            text: "It gives everyday support. Fit matters most, which is why sizing is by measurement.",
          },
          {
            label: "“Will it show?”",
            text: "Under sheer or white fabric, choose the shade closest to your skin tone.",
          },
          {
            label: "“Will it ride up?”",
            text: "It is cut to tuck in. If it still rides up, the size may be wrong; exchange it free.",
          },
        ],
      },
    ],
    closing: {
      headline: "The Base Tank",
      body: "Thirteen shades, sizes S to 4XL, and a free size exchange if it isn't right.",
      cta: "Discover the Base Tank",
    },
  },
  home: {
    hero: {
      eyebrow: "Linnea Base Tank",
      headline: "A softer way to wear support",
      sub: "A simple tank with the bra built in. No wire, no hooks, no band. Pull it on and get on with the day.",
      cta: "Choose your Base Tank",
    },
    problem: {
      eyebrow: "The everyday effort",
      headline: "It isn't you. It's the hooks, the band and the wire.",
      body: [
        "If the bra is the first thing you take off at the end of the day, there's a reason.",
        "Most bras place all their support on a few narrow lines. Over hours, you feel exactly where.",
      ],
      points: [
        {
          label: "The straps",
          text: "Thin, and often in need of adjusting. Ours are wide and rest flat.",
        },
        {
          label: "The band",
          text: "Snug around the ribs all day. The Base Tank has none.",
        },
        {
          label: "The hooks",
          text: "Behind your back, every morning. Here there is nothing to fasten.",
        },
      ],
    },
    shop: {
      eyebrow: "Choose a set",
      headline: "Your set, your shades, your size",
      sub: "Thirteen shades. Seven sizes, S to 4XL.",
    },
    blackFriday: {
      hero: {
        eyebrow: "Early Black Friday",
        headline: "A calmer Black Friday, a little early",
        sub: "Seasonal pricing on every set, without the rush. The same soft tank with the support built in.",
        cta: "See Black Friday sets",
      },
    },
    christmas: {
      hero: {
        eyebrow: "Christmas",
        headline: "A gift of ease, for every day",
        sub: "A soft tank with the bra built in. Sizes S to 4XL, thirteen shades, and a free size exchange.",
        cta: "Shop gift sets",
      },
      gift: {
        eyebrow: "Gifting, simply",
        headline: "Easy to choose, easy to exchange",
        sub: "Why it is a gentle gift to give.",
        points: [
          {
            title: "Sized simply",
            text: "Seven sizes, S to 4XL. Begin with their usual top size, or use the size guide.",
            flag: sizeGuide.flag,
          },
          {
            title: "A free exchange",
            text: "If the size isn't right, they tell us within 90 days of delivery and we send another. They keep the first.",
            flag: GUARANTEE_FLAG,
          },
          {
            title: "Calm shades",
            text: "From nude and grey to navy and soft pastels. A different shade for each tank.",
          },
        ],
      },
      closing: {
        headline: "Give the gift of an easy morning",
        body: "A set of three or five Base Tanks, each in its own shade and size.",
        cta: "Shop gift sets",
      },
    },
  },
  sevenReasons: {
    byline: "Linnea Journal",
    readTime: "4 min read",
    review: "Diane",
    base: {
      kicker: "Linnea Journal",
      headline: "7 quiet reasons to choose a built-in bra tank",
      dek: "Small changes that make the day feel easier.",
      intro: [
        "Ease rarely comes from adding things. More often it comes from taking something away.",
        "Here are seven reasons the Base Tank might be what you take away: the hooks, the wire and the band.",
      ],
      reasons: [
        {
          tag: "Softness",
          title: "Nothing firm against you",
          body: [
            "No underwire, no hooks, no clasps.",
            "Just soft cups inside the front panel.",
          ],
          image: photos.cupDetail,
        },
        {
          tag: "Mornings",
          title: "One piece, pulled on",
          body: [
            "Over the head, like any tank. No reaching behind your back.",
            "The support is already in place.",
          ],
          image: photos.pullOn,
        },
        {
          tag: "Sizing",
          title: "Chosen by one measurement",
          body: [
            "Seven sizes, S to 4XL, from your bust measured over a bra.",
            "Between sizes, the larger one.",
          ],
          image: photos.front,
          flag: sizeGuide.flag,
        },
        {
          tag: "Layering",
          title: "A smooth base for everything",
          body: [
            "One quiet layer under knits and shirts.",
            "Long enough to tuck in.",
          ],
          image: photos.brownPair,
        },
        {
          tag: "Shoulders",
          title: "Straps that rest flat",
          body: [
            "Wide straps spread the support across the shoulder.",
            "Nothing to adjust.",
          ],
          image: photos.strap,
        },
        {
          tag: "Back",
          title: "No band around the ribs",
          body: [
            "A traditional bra holds with a snug band all day.",
            "The Base Tank has none.",
          ],
          image: photos.back,
        },
        {
          tag: "Ease",
          title: "A free size exchange",
          body: [
            "If it doesn't fit, tell us within 90 days of delivery. We'll send another size, free.",
            "You keep the first.",
          ],
          image: photos.portrait,
          flag: GUARANTEE_FLAG,
        },
      ],
      ctas: ["See the Base Tank", "Choose your shades", "Find your size"],
      closing: {
        eyebrow: "Sets",
        headline: "Buy two, the third is on us",
        body: "Three Base Tanks for {price:trio}, {each:trio} each.",
        cta: "Shop the Base Tank",
      },
    },
    blackFriday: {
      kicker: "Early Black Friday · Linnea Journal",
      dek: "Small changes that make the day feel easier, with seasonal pricing on every set.",
      closing: {
        eyebrow: "Early Black Friday",
        headline: "A calm Black Friday, early",
        body: "Five Base Tanks for {price:five}, {each:five} each.",
        cta: "See Black Friday sets",
      },
    },
    christmas: {
      kicker: "Christmas · Linnea Journal",
      headline: "7 quiet reasons the Base Tank is a kind gift",
      dek: "A gift of ease, for someone who deserves an easier morning.",
      intro: [
        "The best gifts are the ones that get used, quietly, every day.",
        "Here is why the Base Tank might be one of them.",
      ],
      reasons: {
        2: {
          tag: "Gifting",
          title: "Simple to size, even as a surprise",
          body: [
            "Seven sizes, S to 4XL, like everyday tops.",
            "The size guide shows the bust range for each size.",
          ],
          image: photos.front,
          flag: sizeGuide.flag,
        },
        6: {
          tag: "No pressure",
          title: "If it doesn't fit, it's exchanged free",
          body: [
            "They tell us within 90 days of delivery, and we send another size.",
            "They keep the first. Nothing to post back.",
          ],
          image: photos.portrait,
          flag: GUARANTEE_FLAG,
        },
      },
      ctas: ["See the Base Tank", "Choose gift shades", "Shop gift sets"],
      closing: {
        eyebrow: "Christmas",
        headline: "A gift of ease",
        body: "Three Base Tanks for {price:trio}, {each:trio} each, in any shades.",
        cta: "Shop gift sets",
      },
    },
  },
};
