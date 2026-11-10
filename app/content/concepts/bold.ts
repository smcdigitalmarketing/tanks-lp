import type { Concept } from "~/content/types";
import { GUARANTEE_FLAG, photos, reviewBy, sizeGuide } from "~/content/product";

/**
 * Remix D · Colour-block Pop.
 * Bold, playful, confident: butter yellow, tomato and cobalt, chunky type,
 * short witty lines. Sells the thirteen colours as much as the comfort.
 */
export const bold: Concept = {
  slug: "bold",
  letter: "D",
  group: "remix",
  direction: "Colour-block Pop",
  brand: {
    name: "Juno",
    productName: "Juno Tank",
    tagline: "Comfort, in full colour.",
    positioning:
      "A bold, playful comfortwear brand: the built-in bra tank as a colourful everyday staple, sold with confident colour-blocking, chunky type and short, witty copy.",
    voice:
      "Punchy, witty and upbeat. Short lines, a wink here and there, never silly about the product itself.",
    targetFeeling:
      "Getting dressed can be fun, and comfortable, at the same time.",
    palette: [
      { name: "Butter", hex: "#FFF6DC", role: "Page background" },
      { name: "Tomato", hex: "#E5412E", role: "Buttons, accents" },
      { name: "Cobalt", hex: "#2546D8", role: "Bars, blocks" },
      { name: "Sky", hex: "#DCE3FF", role: "Savings, highlights" },
      { name: "Ink", hex: "#16141F", role: "Text, footer" },
    ],
    fonts: { display: "Bricolage Grotesque", body: "Instrument Sans" },
    googleFonts:
      "family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Instrument+Sans:wght@400;500;600;700",
    support: { email: "hi@juno.example", hours: "Monday to Friday, 9am–6pm" },
  },
  hypothesis:
    "Making colour the hero (mix any shades in a pack) turns a functional purchase into a fun one, lifting the share of 3- and 5-packs and standing out in a beige category.",
  meta: {
    title: "Juno Tank · Ditch the hooks, keep the support",
    description:
      "A bold, soft tank with the bra built in, in thirteen colours. No wire, no hooks, no band. Remix D.",
  },
  layout: {
    hero: "split",
    tiers: "columns",
    reviews: "notes",
    valueProps: "numbered",
    divider: "none",
    advertorial: "magazine",
  },
  pdp: {
    kicker: "Comfort, in full colour",
    eyebrow: "The Juno Tank",
    title: {
      product: "Juno Bra Tank",
      benefit: "Ditch the hooks, keep the support",
    },
    subtitle:
      "A soft tank with a bra built in. No wire, no hooks, no band. Thirteen colours, so your pack doesn't have to be three of the same.",
    bullets: [
      { icon: "noHooks", text: "No wire, no hooks, no band" },
      { icon: "palette", text: "Thirteen colours to mix in one pack" },
      { icon: "feather", text: "Wide straps that sit flat" },
      { icon: "shirt", text: "A long cut that tucks right in" },
    ],
    gallery: {
      benefit: {
        eyebrow: "Juno",
        headline: "Ditch the hooks. Keep the support.",
        sub: "Thirteen colours. Sizes S–4XL.",
      },
      lifestyle: {
        eyebrow: "Out and about",
        headline: "Pull on, tuck in, take on the day",
        points: ["Desk", "Errands", "Dinner"],
      },
      vsBra: { headline: "Hooks? Not invited." },
      included: { headline: "Inside the tank" },
      howItWorks: { headline: "Three moves. Zero hooks." },
      vsAlternatives: { headline: "Tank vs the rest" },
      review: { headline: "Straight from a buyer" },
      video: { eyebrow: "Watch it", headline: "Bra off. Juno on." },
    },
    steps: {
      bundle: "Pick a pack",
      colour: "Mix your colours",
      size: "Find your size",
    },
    accordionIntro: {
      title: "Why it's a yes",
      body: [
        "Support built into a tank: soft cups at the front, wide straps on top.",
        "Zero hardware anywhere: no wire, no hooks, no clasps, no band.",
        "Thirteen colours, so you can mix a pack instead of buying three of the same.",
      ],
    },
    reviews: {
      eyebrow: "Reviews",
      headline: "Buyers of the original, in their own words",
      sub: "Real reviews from verified buyers of the original built-in bra tank.",
    },
    valueProps: {
      eyebrow: "Why Juno",
      headline: "Made to be worn, not wrestled with",
      items: [
        {
          eyebrow: "No hardware",
          headline: "Nothing to dig, pinch or poke",
          body: "No underwire, no hooks, no clasps and no band. The support comes from soft cups inside the front panel.",
          image: photos.cupDetail,
        },
        {
          eyebrow: "Wide straps",
          headline: "Straps that sit flat",
          body: "Broad straps spread the support across your shoulders instead of two thin lines. Nothing to tighten before you go.",
          image: photos.strap,
        },
        {
          eyebrow: "Mix it up",
          headline: "Thirteen colours, one easy fit",
          body: "Pick a different colour for every tank in your pack, from Black and Nude to Red Wine and the pastels.",
          image: photos.brownPair,
        },
      ],
    },
    howItWorks: {
      eyebrow: "How it works",
      headline: "Three moves. Zero hooks.",
      sub: "No reaching behind your back. Ever.",
      steps: [
        {
          title: "Pull on",
          body: "Over your head, like any tank. The support's already in there.",
        },
        {
          title: "Tuck in",
          body: "Into jeans, trousers or a skirt for one smooth line.",
        },
        { title: "Go", body: "Wear it solo or under anything. Done." },
      ],
    },
    comparison: {
      headline: "Tank vs the rest",
      sub: "How built-in support stacks up against what's in your drawer.",
    },
    guarantee: {
      headline: "Wrong size? Swap it, free.",
      body: "Tell us and we'll send another size at no cost. Keep the first one.",
      cta: "Pick a pack",
    },
    faq: { headline: "Got questions?", sub: "Good. Here are the answers." },
    closing: {
      headline: "Hooks are history.",
      body: "One tank, support built in, thirteen colours. Mix your pack.",
      cta: "Shop the Juno Tank",
    },
    footerBlurb: "Comfortwear, in full colour.",
  },
  offers: {
    standard: {
      banner: "Buy 2, get 1 free · Mix any colours",
      eyebrow: "Packs",
      headline: "Buy 2, get 1 free",
      sub: "Or buy 3, get 2 free.",
      cta: "Add to bag",
      badge: "Best mix",
    },
    "early-black-friday": {
      banner: "Early Black Friday: 5 Juno Tanks for {price:five}",
      eyebrow: "Early Black Friday",
      headline: "Black Friday came early. Stock up.",
      sub: "Big-pack pricing on every bundle, now.",
      cta: "Add to bag",
      badge: "Best value",
    },
    christmas: {
      banner: "Christmas: 3 Juno Tanks for {price:trio}, mixed colours welcome",
      eyebrow: "Christmas gifting",
      headline: "Gift colour. Gift comfort.",
      sub: "Gift pricing on every pack.",
      cta: "Add to bag",
      badge: "Gift pick",
    },
  },
  advertorial: {
    kicker: "Juno Explains",
    headline: "Your bra had a good run. Here's what replaces it.",
    dek: "Why a tank with the support built in might be the easiest swap in your wardrobe.",
    byline: "Juno",
    readTime: "3 min read",
    lead: photos.portrait,
    leadCaption: "The Juno Tank in nude.",
    intro: [
      "Hooks that need two hands. Straps that need pulling up. A band you can feel by lunch.",
      "If that's your bra, here's the alternative: a soft tank with the support already inside.",
    ],
    sections: [
      {
        title: "1. Where bras pinch",
        body: [
          "Most bras gather their support into a few narrow places: thin straps, a tight band and often a wire.",
          "Wear that for a whole day and you feel every one of them.",
        ],
        image: photos.braVsTank,
        caption: "Left: hooks, band, straps. Right: none of them.",
      },
      {
        title: "2. What the tank does instead",
        body: [
          "Soft cups sit inside the front panel. Wide straps sit flat on your shoulders. There's no band and nothing to fasten.",
        ],
        image: photos.cupDetail,
        caption: "The built-in cups.",
      },
      {
        title: "3. One piece, any outfit",
        body: [
          "It's a tank and a bra in one. Wear it on its own or under a tee, a shirt or a knit, and tuck it in for a smooth line.",
        ],
        image: photos.brownPair,
        caption: "Coffee, tucked in.",
      },
      {
        title: "4. Bra vs tank, the quick version",
        body: ["The headline differences:"],
        list: [
          { label: "Hooks", text: "Bra: yes. Tank: none." },
          { label: "Band", text: "Bra: a tight one. Tank: none." },
          {
            label: "Straps",
            text: "Bra: thin, often adjustable. Tank: wide, nothing to adjust.",
          },
          {
            label: "Support",
            text: "Bra: firm to light. Tank: everyday support, not for high impact.",
          },
          { label: "Colours", text: "Tank: thirteen, mix and match." },
        ],
      },
      {
        title: "5. Before you buy",
        body: ["The honest bits."],
        list: [
          {
            label: "Sizing",
            text: "S to 4XL by bust measurement, taken over your bra. Between sizes, go up.",
          },
          {
            label: "Riding up?",
            text: "Tuck it in. Still riding up? The size is probably off, so swap it free within 90 days.",
          },
          { label: "Sport", text: "Not designed for running or high impact." },
          { label: "Washing", text: "Cold, gentle, lay flat to dry." },
        ],
        pullQuote: reviewBy("Barb"),
      },
    ],
    closing: {
      headline: "Try the Juno Tank",
      body: "Mix your colours, find your size, and swap it free if it isn't right.",
      cta: "Shop the Juno Tank",
    },
  },
  home: {
    hero: {
      eyebrow: "The Juno Tank",
      headline: "Your bra, built into a tank. In thirteen colours.",
      sub: "Soft cups, wide straps, no wire, no hooks, no band. Pull it on and go.",
      cta: "Mix your pack",
    },
    problem: {
      eyebrow: "Be honest",
      headline: "It's not you. It's the hooks.",
      body: [
        "If the best part of your day is taking your bra off, the bra is the problem.",
        "Most bras pile the work onto thin straps, a tight band and a wire. That's exactly where you feel it.",
      ],
      points: [
        {
          label: "The straps",
          text: "Thin ones dig in. Ours are wide and sit flat.",
        },
        {
          label: "The band",
          text: "Tight around your ribs all day. Ours doesn't exist.",
        },
        {
          label: "The hooks",
          text: "Two hands, behind your back. Ours: nothing to fasten.",
        },
      ],
    },
    shop: {
      eyebrow: "Mix your pack",
      headline: "Choose a pack, then a colour for every tank",
      sub: "Thirteen colours, seven sizes, S to 4XL.",
    },
    blackFriday: {
      hero: {
        eyebrow: "Early Black Friday",
        headline: "Black Friday came early. Stock up on colour.",
        sub: "Black Friday pricing on every pack, now. Five tanks, five colours, one price.",
        cta: "See Black Friday packs",
      },
    },
    christmas: {
      hero: {
        eyebrow: "Christmas gifting",
        headline: "The colourful gift that's actually comfy",
        sub: "A soft tank with the bra built in, in thirteen colours. Sizes S to 4XL, with a free size swap.",
        cta: "Shop gift packs",
      },
      gift: {
        eyebrow: "Gift it right",
        headline: "Easy to choose, easy to swap",
        sub: "Three reasons it's a low-risk gift.",
        points: [
          {
            title: "Size it like a tee",
            text: "Sizes S to 4XL. Start from their usual top size, or check the size guide.",
            flag: sizeGuide.flag,
          },
          {
            title: "Free size swap",
            text: "Wrong size? Swap it within 90 days of delivery, free. Keep the first one.",
            flag: GUARANTEE_FLAG,
          },
          {
            title: "A colour for everyone",
            text: "Thirteen shades, from Black to Pastel Pink. Mix them in one pack.",
          },
        ],
      },
      closing: {
        headline: "Give comfort. In colour.",
        body: "Mix three or five Juno Tanks, each in its own colour and size.",
        cta: "Shop gift packs",
      },
    },
  },
  sevenReasons: {
    byline: "Juno",
    readTime: "4 min read",
    review: "Eileen",
    base: {
      kicker: "Juno",
      headline: "7 reasons your next bra should be a tank",
      dek: "No wire, no hooks, no band, and thirteen colours to choose from.",
      intro: [
        "Bras have had the same design for decades: two straps, a band, some hooks. You know how that feels by the afternoon.",
        "The Juno Tank does it differently. Here are seven reasons to make the swap.",
      ],
      reasons: [
        {
          tag: "Zero hardware",
          title: "No wire, no hooks, no band",
          body: [
            "Nothing hard, nothing to fasten, nothing tight around your ribs.",
            "The support comes from soft cups inside the front panel.",
          ],
          image: photos.cupDetail,
        },
        {
          tag: "Getting dressed",
          title: "On in one move",
          body: [
            "Pull it over your head like any tank. The support is already where it should be.",
            "No reaching behind your back, no lining up hooks.",
          ],
          image: photos.pullOn,
        },
        {
          tag: "Colour",
          title: "Thirteen colours to mix",
          body: [
            "From Black, Nude and Grey to Red Wine and soft pastels.",
            "Pick a different colour for every tank in your pack.",
          ],
          image: photos.front,
        },
        {
          tag: "One layer",
          title: "Tank and bra, one piece",
          body: [
            "Wear it on its own, or under a tee or a knit.",
            "It's long enough to tuck in for a smooth line.",
          ],
          image: photos.brownPair,
        },
        {
          tag: "Shoulders",
          title: "Wide straps that sit flat",
          body: [
            "Broad straps spread the support across your shoulders instead of two thin lines.",
            "Nothing to tighten before you go.",
          ],
          image: photos.strap,
        },
        {
          tag: "Sizing",
          title: "Sized like a tee",
          body: [
            "Seven sizes, S to 4XL, from one bust measurement taken over your bra.",
            "Between sizes? Go up one.",
          ],
          image: photos.back,
          flag: sizeGuide.flag,
        },
        {
          tag: "No risk",
          title: "Wrong size? Swap it free",
          body: [
            "Tell us within 90 days of delivery and we'll send another size.",
            "Keep the first one. Nothing to post back.",
          ],
          image: photos.portrait,
          flag: GUARANTEE_FLAG,
        },
      ],
      ctas: ["See the Juno Tank", "Mix your colours", "Find your size"],
      closing: {
        eyebrow: "Packs",
        headline: "Buy 2, get 1 free",
        body: "Three Juno Tanks for {price:trio}, {each:trio} each. Mix any colours.",
        cta: "Shop the Juno Tank",
      },
    },
    blackFriday: {
      kicker: "Early Black Friday · Juno",
      dek: "No wire, no hooks, no band, thirteen colours, and Black Friday pricing on every pack.",
      closing: {
        eyebrow: "Early Black Friday",
        headline: "Stock up early",
        body: "Five Juno Tanks for {price:five}, {each:five} each. Mix any colours.",
        cta: "See Black Friday packs",
      },
    },
    christmas: {
      kicker: "Christmas gifting · Juno",
      headline: "7 reasons the Juno Tank is the gift to give",
      dek: "Colourful, comfy and easy to size: a gift that gets worn.",
      intro: [
        "Clothes are a gamble as a gift. Wrong size, wrong colour, back in the drawer.",
        "The Juno Tank takes the guesswork out. Here's why.",
      ],
      reasons: {
        2: {
          tag: "Gifting",
          title: "A colour for everyone on your list",
          body: [
            "Thirteen colours means there's one for everyone, from classic Black to Pastel Purple.",
            "Mix colours in one pack and share it out.",
          ],
          image: photos.front,
        },
        6: {
          tag: "No awkward returns",
          title: "Free size swap, nothing to post back",
          body: [
            "If the size is off, they tell us within 90 days of delivery and we send another, free.",
            "They keep the first one.",
          ],
          image: photos.portrait,
          flag: GUARANTEE_FLAG,
        },
      },
      ctas: ["See the Juno Tank", "Pick gift colours", "Shop gift packs"],
      closing: {
        eyebrow: "Christmas gifting",
        headline: "Gift colour. Gift comfort.",
        body: "Three Juno Tanks for {price:trio}, {each:trio} each, in any colours.",
        cta: "Shop gift packs",
      },
    },
  },
};
