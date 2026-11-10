import type { Concept } from "~/content/types";
import { GUARANTEE_FLAG, photos, reviewBy, sizeGuide } from "~/content/product";

/**
 * Remix F · Vintage Heritage.
 * Warm, nostalgic, wry: cream, mustard, burnt orange and forest green, a soft
 * old-style serif, and copy that treats the tank as an old-fashioned good idea.
 */
export const heritage: Concept = {
  slug: "heritage",
  letter: "F",
  group: "remix",
  direction: "Vintage Heritage",
  brand: {
    name: "Mabel & Co.",
    productName: "Comfort Tank",
    tagline: "Good, simple comfort.",
    positioning:
      "A warm, vintage-inspired label with a wry sense of humour: the built-in bra tank as an old-fashioned good idea, told with storytelling and retro editorial charm.",
    voice:
      "Warm, nostalgic and wry. Story-led, a little old-fashioned in its manners, never twee.",
    targetFeeling:
      "Simple, sensible comfort that never really went out of style.",
    palette: [
      { name: "Cream", hex: "#F8F0E0", role: "Page background" },
      { name: "Mustard", hex: "#F1CE6A", role: "Savings, highlights" },
      { name: "Burnt orange", hex: "#B5532A", role: "Bars, offer blocks" },
      { name: "Forest", hex: "#2F5A3E", role: "Buttons, accents" },
      { name: "Espresso", hex: "#2A2418", role: "Text, footer" },
    ],
    fonts: { display: "Fraunces", body: "Work Sans" },
    googleFonts:
      "family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Work+Sans:wght@400;500;600",
    support: {
      email: "hello@mabelandco.example",
      hours: "Monday to Friday, 9am–5pm",
    },
  },
  hypothesis:
    "Warm vintage storytelling with a touch of humour gives the tank personality and memorability, and appeals to buyers who want comfort without clinical or hard-sell messaging.",
  meta: {
    title: "Mabel & Co. Comfort Tank · The bra, tucked inside a tank",
    description: "Soft cups, wide straps and not a hook in sight. Remix F.",
  },
  layout: {
    hero: "reverse",
    tiers: "rows",
    reviews: "quotes",
    valueProps: "alternating",
    divider: "rule",
    advertorial: "letter",
  },
  pdp: {
    kicker: "An old-fashioned good idea",
    eyebrow: "Mabel & Co.",
    title: {
      product: "The Mabel Comfort Tank",
      benefit: "A tank with the bra tucked inside",
    },
    subtitle:
      "Soft cups, wide straps and not a hook in sight. The kind of simple, sensible comfort that never really went out of style.",
    bullets: [
      { icon: "noHooks", text: "Not a hook, wire or clasp in sight" },
      { icon: "feather", text: "Wide, soft straps that sit flat" },
      { icon: "shirt", text: "A long cut that tucks in neatly" },
      { icon: "palette", text: "Thirteen colours, from coffee to wine" },
    ],
    gallery: {
      benefit: {
        eyebrow: "Mabel & Co.",
        headline: "The bra, tucked inside a tank",
        sub: "No hooks. No wire. No band.",
      },
      lifestyle: {
        eyebrow: "Every day",
        headline: "Simple comfort, morning to night",
        points: ["Pull on", "Tuck in", "Carry on"],
      },
      vsBra: { headline: "Out with the old hardware" },
      included: { headline: "What's in the tank" },
      howItWorks: { headline: "Pull on, tuck in, carry on" },
      vsAlternatives: { headline: "How it measures up" },
      review: { headline: "A kind word from a buyer" },
      video: {
        eyebrow: "See it on",
        headline: "Off with the bra, on with the tank",
      },
    },
    steps: {
      bundle: "Pick a bundle",
      colour: "Pick your colours",
      size: "Pick your size",
    },
    accordionIntro: {
      title: "Why it's a good idea",
      body: [
        "The support is tucked inside: soft cups at the front, wide straps over the shoulders.",
        "Not a hook, wire or clasp in sight, and no band around your ribs.",
        "Cut long, so it tucks in neatly under blouses and cardigans.",
      ],
    },
    reviews: {
      eyebrow: "Kind words",
      headline: "What buyers have to say",
      sub: "Reviews from verified buyers of the original built-in bra tank, word for word.",
    },
    valueProps: {
      eyebrow: "The good sense of it",
      headline: "Three sensible ideas, in one tank",
      items: [
        {
          eyebrow: "Hardware-free",
          headline: "Not a hook in sight",
          body: "No underwire, no clasps, no tight band. Just soft cups tucked inside the front panel.",
          image: photos.cupDetail,
        },
        {
          eyebrow: "The straps",
          headline: "Straps with good manners",
          body: "Wide straps that sit flat on the shoulder, with nothing to tighten or fiddle with.",
          image: photos.strap,
        },
        {
          eyebrow: "The cut",
          headline: "Long enough to tuck in",
          body: "A longer body that tucks neatly into trousers and skirts, for one smooth layer under your favourite blouse.",
          image: photos.brownPair,
        },
      ],
    },
    howItWorks: {
      eyebrow: "How it works",
      headline: "Pull on, tuck in, carry on",
      sub: "Three steps, and none of them behind your back.",
      steps: [
        {
          title: "Pull on",
          body: "Over your head, like any tank. The support's already tucked inside.",
        },
        { title: "Tuck in", body: "Into trousers or a skirt, neat as a pin." },
        {
          title: "Carry on",
          body: "On its own, or under a blouse or cardigan.",
        },
      ],
    },
    comparison: {
      headline: "How it measures up",
      sub: "The built-in tank beside the usual suspects.",
    },
    guarantee: {
      headline: "If it doesn't fit, we'll make it right",
      body: "Tell us and we'll post a different size, free of charge. Keep the first one.",
      cta: "Pick a bundle",
    },
    faq: {
      headline: "Questions, kindly answered",
      sub: "The things people usually ask.",
    },
    closing: {
      headline: "Simple comfort never goes out of style",
      body: "The Mabel Comfort Tank: soft cups, wide straps and not a hook in sight.",
      cta: "Shop the Comfort Tank",
    },
    footerBlurb: "Good, simple comfort.",
  },
  offers: {
    standard: {
      banner: "Buy two Comfort Tanks, and the third is on the house",
      eyebrow: "Bundles",
      headline: "Buy two, get one free",
      sub: "Or buy three, and two are on the house.",
      cta: "Add to basket",
      badge: "The favourite",
    },
    "early-black-friday": {
      banner: "Early Black Friday: five Comfort Tanks for {price:five}",
      eyebrow: "Early Black Friday",
      headline: "An early Black Friday treat",
      sub: "Black Friday prices on every bundle, ahead of time.",
      cta: "Add to basket",
      badge: "Best value",
    },
    christmas: {
      banner: "Christmas: three Comfort Tanks for {price:trio}",
      eyebrow: "Christmas gifting",
      headline: "A thoughtful gift, the comfortable kind",
      sub: "Gift prices on every bundle.",
      cta: "Add to basket",
      badge: "Gift bundle",
    },
  },
  advertorial: {
    kicker: "A letter from Mabel & Co.",
    headline: "Whatever happened to simple, comfortable underthings?",
    dek: "Why the bra became so complicated, and why a tank with the support tucked inside feels like common sense.",
    byline: "The Mabel & Co. team",
    readTime: "4 min read",
    lead: photos.collage,
    leadCaption: "The Comfort Tank in coffee, with the built-in cups.",
    intro: [
      "Somewhere along the way, the humble bra picked up a lot of hardware. Hooks, sliders, underwire, a band that means business.",
      "And somewhere along the way, a lot of us started counting the hours until we could take it off.",
    ],
    sections: [
      {
        title: "Where it all pinches",
        body: [
          "Most bras ask a few narrow places to do all the work: two thin straps, one snug band and, often, a wire.",
          "Fine for an hour. By the afternoon, you know exactly where each of them is.",
        ],
        image: photos.braVsTank,
        caption:
          "Left: hooks, a band and thin straps. Right: the tank, without any of them.",
      },
      {
        title: "Tucking the support inside",
        body: [
          "A built-in bra tank puts soft cups inside the front of a fitted tank, with wide straps over the shoulders. No wire, no hooks, no separate band.",
          "You pull it on over your head and get on with things.",
        ],
        image: photos.cupDetail,
        caption: "The soft cups, tucked inside.",
      },
      {
        title: "One layer instead of two",
        body: [
          "A bra and a camisole, or one tank that does both. It sits smoothly under a blouse or cardigan and tucks in neatly.",
          "It's the sort of simple idea that makes you wonder why it took so long.",
        ],
        pullQuote: reviewBy("Becki"),
      },
      {
        title: "The honest difference",
        body: [
          "Neither is right for everything. For running and sport, a proper sports bra still earns its keep.",
        ],
        list: [
          {
            label: "Support",
            text: "A bra puts it in straps and a band; the tank spreads it through soft cups and wide straps. Everyday support, not sports support.",
          },
          {
            label: "Fastening",
            text: "Hooks behind your back, or nothing at all.",
          },
          {
            label: "Under clothes",
            text: "Straps and a band can show; the tank is one smooth layer.",
          },
          { label: "Layers", text: "A bra plus a top, or just the tank." },
        ],
      },
      {
        title: "Questions we're often asked",
        body: ["Better to know before you order than after."],
        list: [
          {
            label: "Will it suit a fuller bust?",
            text: "Sizes run S to 4XL by bust measurement. If the size isn't right, we'll exchange it free within 90 days.",
          },
          {
            label: "How do I choose a size?",
            text: "Measure over your bra at the fullest part. Between sizes, choose the larger.",
          },
          {
            label: "Will it ride up?",
            text: "It's cut long enough to tuck in. If it still rides up, the size may be off, and the exchange is free.",
          },
          {
            label: "How do I wash it?",
            text: "Cold and gentle, then lay it flat to dry.",
          },
        ],
      },
    ],
    closing: {
      headline: "Shall we send you one?",
      body: "Choose your colours, check your size, and if it doesn't fit, we'll send another size free.",
      cta: "See the Comfort Tank",
    },
  },
  home: {
    hero: {
      eyebrow: "Mabel & Co. Comfort Tank",
      headline: "The bra, tucked neatly inside a tank",
      sub: "Soft cups, wide straps, and not a hook in sight. Simple comfort that never really went out of style.",
      cta: "Find your Comfort Tank",
    },
    problem: {
      eyebrow: "A familiar story",
      headline: "It's not you. Bras simply got complicated.",
      body: [
        "If the first thing you do at home is reach for the hooks, you're in good company.",
        "Most bras put all the effort onto a few small places: thin straps, a snug band, sometimes a wire. That's where you feel it.",
      ],
      points: [
        {
          label: "The straps",
          text: "Thin ones can leave marks. Ours are wide and sit flat.",
        },
        {
          label: "The band",
          text: "Snug around your ribs all day. The Comfort Tank doesn't have one.",
        },
        {
          label: "The hooks",
          text: "Behind your back, every morning. Here, there's nothing to fasten.",
        },
      ],
    },
    shop: {
      eyebrow: "Pick a bundle",
      headline: "Your bundle, your colours, your size",
      sub: "Thirteen colours and seven sizes, S to 4XL.",
    },
    blackFriday: {
      hero: {
        eyebrow: "Early Black Friday",
        headline: "An early Black Friday treat",
        sub: "Black Friday prices on every bundle, ahead of time. The same soft tank, with the support tucked inside.",
        cta: "See Black Friday bundles",
      },
    },
    christmas: {
      hero: {
        eyebrow: "Christmas gifting",
        headline: "A thoughtful gift, the comfortable kind",
        sub: "A soft tank with the bra tucked inside. Thirteen colours, sizes S to 4XL, and a free size exchange.",
        cta: "Shop gift bundles",
      },
      gift: {
        eyebrow: "Gifting, sensibly",
        headline: "Easy to choose, easy to exchange",
        sub: "Why it's a safe bet under the tree.",
        points: [
          {
            title: "Sized like a top",
            text: "Sizes S to 4XL. Start with their usual top size, or check the size guide.",
            flag: sizeGuide.flag,
          },
          {
            title: "A free exchange",
            text: "If it doesn't fit, they tell us within 90 days of delivery and we post another size. They keep the first.",
            flag: GUARANTEE_FLAG,
          },
          {
            title: "A colour for everyone",
            text: "From coffee and khaki to wine and pastels. A different colour for each tank.",
          },
        ],
      },
      closing: {
        headline: "Wrap up some simple comfort",
        body: "A bundle of three or five Comfort Tanks, each in its own colour and size.",
        cta: "Shop gift bundles",
      },
    },
  },
  sevenReasons: {
    byline: "The Mabel & Co. team",
    readTime: "4 min read",
    review: "Cathy",
    base: {
      kicker: "From Mabel & Co.",
      headline: "7 good reasons to retire your bra (most days, anyway)",
      dek: "Simple, sensible reasons that add up to a more comfortable day.",
      intro: [
        "We're not saying throw out every bra you own. For running and sport, keep them.",
        "But for ordinary days, here are seven reasons a tank with the support tucked inside makes good sense.",
      ],
      reasons: [
        {
          tag: "Hardware-free",
          title: "Not a hook, wire or clasp",
          body: [
            "Nothing hard against you, nothing to fasten.",
            "Soft cups are tucked inside the front panel instead.",
          ],
          image: photos.cupDetail,
        },
        {
          tag: "Mornings",
          title: "On in one easy pull",
          body: [
            "Over your head, like any tank. No reaching behind your back.",
            "The support's already where it should be.",
          ],
          image: photos.pullOn,
        },
        {
          tag: "Sizing",
          title: "Sized like a favourite top",
          body: [
            "Seven sizes, S to 4XL, from one bust measurement taken over your bra.",
            "Between sizes? The larger one.",
          ],
          image: photos.front,
          flag: sizeGuide.flag,
        },
        {
          tag: "One layer",
          title: "A bra and a cami in one",
          body: [
            "One smooth layer under a blouse or cardigan.",
            "Long enough to tuck in neatly.",
          ],
          image: photos.brownPair,
        },
        {
          tag: "Shoulders",
          title: "Straps with good manners",
          body: [
            "Wide straps sit flat and spread the support across your shoulders.",
            "Nothing to tighten or fiddle with.",
          ],
          image: photos.strap,
        },
        {
          tag: "Ribs",
          title: "No band to speak of",
          body: [
            "A regular bra holds on with a snug band all day.",
            "The Comfort Tank simply doesn't have one.",
          ],
          image: photos.back,
        },
        {
          tag: "Peace of mind",
          title: "A free exchange if it doesn't fit",
          body: [
            "Tell us within 90 days of delivery and we'll post a different size, free.",
            "Keep the first one.",
          ],
          image: photos.portrait,
          flag: GUARANTEE_FLAG,
        },
      ],
      ctas: ["See the Comfort Tank", "Pick your colours", "Find your size"],
      closing: {
        eyebrow: "Bundles",
        headline: "Buy two, get one free",
        body: "Three Comfort Tanks for {price:trio}, {each:trio} each.",
        cta: "Shop the Comfort Tank",
      },
    },
    blackFriday: {
      kicker: "Early Black Friday · Mabel & Co.",
      dek: "Simple, sensible reasons, with Black Friday prices on every bundle, ahead of time.",
      closing: {
        eyebrow: "Early Black Friday",
        headline: "An early treat",
        body: "Five Comfort Tanks for {price:five}, {each:five} each.",
        cta: "See Black Friday bundles",
      },
    },
    christmas: {
      kicker: "Christmas gifting · Mabel & Co.",
      headline: "7 reasons the Comfort Tank makes a thoughtful gift",
      dek: "For your mother, your sister, your oldest friend, or yourself.",
      intro: [
        "Clothes can be a tricky present: the size, the colour, whether they'll ever be worn.",
        "The Comfort Tank makes it simpler. Here's why.",
      ],
      reasons: {
        2: {
          tag: "Buying for someone else",
          title: "Easy to size, even as a surprise",
          body: [
            "Sizes S to 4XL, like everyday tops. Their usual size is a good place to start.",
            "The size guide shows the bust range for each.",
          ],
          image: photos.front,
          flag: sizeGuide.flag,
        },
        6: {
          tag: "No awkward returns",
          title: "If it doesn't fit, it's exchanged free",
          body: [
            "They tell us within 90 days of delivery and we post another size.",
            "They keep the first, and nothing goes back in the post.",
          ],
          image: photos.portrait,
          flag: GUARANTEE_FLAG,
        },
      },
      ctas: ["See the Comfort Tank", "Pick gift colours", "Shop gift bundles"],
      closing: {
        eyebrow: "Christmas gifting",
        headline: "A thoughtful gift, the comfortable kind",
        body: "Three Comfort Tanks for {price:trio}, {each:trio} each, in any colours.",
        cta: "Shop gift bundles",
      },
    },
  },
};
