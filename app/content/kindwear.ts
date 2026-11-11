import type { Concept } from "~/content/types";
import { GUARANTEE_FLAG, photos, reviewBy, sizeGuide } from "~/content/product";

/**
 * Kindwear, the chosen brand (concept A · Soft Everyday Comfort).
 * Warm, approachable, reassuring: the tank as the easy part of getting dressed.
 * Talks to "you", names the small daily annoyances, never gushes.
 */
export const kindwear: Concept = {
  slug: "soft",
  direction: "Soft Everyday Comfort",
  brand: {
    name: "Kindwear",
    productName: "Everyday Tank",
    tagline: "Getting dressed, made easier.",
    positioning:
      "A comfortable everyday essential for women who are done with hooks and digging straps, sold with warmth and reassurance rather than hype.",
    voice:
      "Warm, personal and plain-spoken. Second person, short sentences, the small details of an ordinary day.",
    targetFeeling:
      "A comfortable everyday essential that makes getting dressed easier.",
    palette: [
      { name: "Cream", hex: "#FBF6EF", role: "Page background" },
      { name: "Muted rose", hex: "#B4677A", role: "Buttons, accents" },
      { name: "Blush", hex: "#F5E2DE", role: "Savings, highlights" },
      { name: "Oat", hex: "#F3E9DF", role: "Alternate sections" },
      { name: "Cocoa", hex: "#3B2F2C", role: "Text, footer" },
    ],
    fonts: { display: "DM Serif Display", body: "DM Sans" },
    googleFonts:
      "family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700",
    support: {
      email: "hello@kindwear.example",
      hours: "Monday to Friday, 9am–5pm",
    },
  },
  hypothesis:
    "Reassurance sells to a cautious, older buyer: a warm voice, visible sizing help and a gentle fit guarantee convert better than urgency.",
  meta: {
    title: "Kindwear Everyday Tank · Gentle support, built in",
    description:
      "A soft tank with the bra built in: no underwire, no hooks, no band.",
  },
  pdp: {
    kicker: "The comfortable everyday essential",
    eyebrow: "Built-in bra tank",
    title: {
      product: "Kindwear Everyday Tank",
      benefit: "Gentle support, with no bra to fuss with",
    },
    subtitle:
      "A soft tank with the support already inside. Pull it on in the morning and get on with your day: no hooks to reach for, no wire, no band digging in by lunchtime.",
    bullets: [
      { icon: "noHooks", text: "No underwire, no hooks, no clasps" },
      {
        icon: "feather",
        text: "Wide, soft straps that sit flat on your shoulders",
      },
      { icon: "layers", text: "One smooth layer under your favourite tops" },
      { icon: "shirt", text: "Long enough to tuck into high-waisted trousers" },
    ],
    gallery: {
      benefit: {
        eyebrow: "The Everyday Tank",
        headline: "The bra, built into your favourite tank",
        sub: "No hooks. No wire. No band.",
      },
      lifestyle: {
        eyebrow: "Morning to evening",
        headline: "One soft layer instead of two",
        points: ["Pull on", "Tuck in", "Off you go"],
      },
      vsBra: { headline: "Everything a bra has that you won't miss" },
      included: { headline: "What's inside your tank" },
      howItWorks: { headline: "Dressed in three easy steps" },
      vsAlternatives: {
        headline: "How it compares with what's in your drawer",
      },
      review: { headline: "In a customer's own words" },
      video: {
        eyebrow: "See it on",
        headline: "From bra to tank in one easy change",
      },
    },
    steps: {
      bundle: "Choose your bundle",
      colour: "Choose your colours",
      size: "Choose your size",
    },
    accordionIntro: {
      title: "Why you'll love it",
      body: [
        "It turns two layers into one: your tank and the bra underneath.",
        "Soft cups and wide straps share the support, so it isn't all on two thin straps and a band.",
        "Nothing to reach behind you for: no hooks, no wire, no band to ride up.",
        "Thirteen colours, from everyday nude and black to soft pastels.",
      ],
    },
    reviews: {
      eyebrow: "From real wearers",
      headline: "Why women are swapping their bras for a tank",
      sub: "Real reviews from women who bought the original built-in bra tank.",
    },
    valueProps: {
      eyebrow: "Made for real days",
      headline: "Comfort that keeps up with your day",
      items: [
        {
          eyebrow: "No hardware",
          headline: "Nothing to hook, nothing to dig in",
          body: "No underwire, no hooks, no clasps and no tight band across your back. The support is part of the tank itself, with soft cups at the front.",
          image: photos.cupDetail,
        },
        {
          eyebrow: "Soft on the shoulders",
          headline: "Straps that sit flat, not straps that dig",
          body: "The wide straps spread the weight across your shoulders instead of along two thin lines, and there's nothing to adjust before you head out.",
          image: photos.strap,
        },
        {
          eyebrow: "Under everything",
          headline: "Smooth under your favourite tops",
          body: "One smooth layer means no bra straps peeking out at the neckline, and it's long enough to tuck into high-waisted jeans.",
          image: photos.brownPair,
        },
      ],
    },
    howItWorks: {
      eyebrow: "Easy as",
      headline: "Dressed in three easy steps",
      sub: "No reaching behind your back, no fiddling with hooks.",
      steps: [
        {
          title: "Pull it on",
          body: "It goes on over your head like any tank top. The support is already inside.",
        },
        {
          title: "Tuck it in",
          body: "It's long enough to tuck into trousers or a skirt, so it sits smoothly under your top.",
        },
        {
          title: "Get on with your day",
          body: "Wear it on its own, or under a cardigan, a blouse or a jumper.",
        },
      ],
    },
    comparison: {
      headline: "How it compares with what's in your drawer",
      sub: "Bras, bralettes and shelf tanks each do part of the job.",
    },
    guarantee: {
      headline: "Love the fit, or we'll send another size",
      body: "Choosing a size from a screen is hard. If your tank doesn't fit the way you hoped, tell us and we'll send a different size, free.",
      cta: "Choose your tanks",
    },
    faq: {
      headline: "Questions you might have",
      sub: "Straight answers before you order.",
    },
    closing: {
      headline: "Getting dressed just got easier",
      body: "One soft tank with the support built in, and nothing to hook or adjust. Pick your colours and find your size.",
      cta: "Shop the Everyday Tank",
    },
    footerBlurb: "Soft, supportive tanks for everyday comfort.",
  },
  offers: {
    standard: {
      banner: "Buy 2 Everyday Tanks, get a third one free",
      eyebrow: "Bundle and save",
      headline: "Buy 2, get 1 free",
      sub: "The bundle most people start with.",
      cta: "Add to cart",
      badge: "Most popular",
    },
    "early-black-friday": {
      banner: "Early Black Friday: 5 Everyday Tanks for {price:five}",
      eyebrow: "Early Black Friday",
      headline: "Stock up on your everyday tank, a little early",
      sub: "Black Friday pricing on every bundle, now.",
      cta: "Add to cart",
      badge: "Best value",
    },
    christmas: {
      banner: "Christmas gifting: 3 Everyday Tanks for {price:trio}",
      eyebrow: "Christmas gifting",
      headline: "A comfy gift she'll actually wear",
      sub: "Gift pricing on every bundle, for the women on your list (and you).",
      cta: "Add to cart",
      badge: "Most gifted",
    },
  },
  home: {
    hero: {
      eyebrow: "The Kindwear Everyday Tank",
      headline: "The comfy tank with the bra already inside",
      sub: "Pull it on in the morning and get on with your day. No hooks to reach for, no wire, no band digging in by lunchtime.",
      cta: "Find your Everyday Tank",
    },
    problem: {
      eyebrow: "Sound familiar?",
      headline: "It's not you. Most bras just weren't made for your day.",
      body: [
        "If you can't wait to take your bra off when you get home, you're not alone, and you're not doing anything wrong.",
        "Most bras put all the work on a few small places: two thin straps, one tight band, sometimes a wire. That's where you feel it, hour after hour.",
      ],
      points: [
        {
          label: "The straps",
          text: "Thin straps can leave marks on your shoulders. Ours are wide and soft, and sit flat.",
        },
        {
          label: "The band",
          text: "A tight band around your ribs all day. The Everyday Tank doesn't have one.",
        },
        {
          label: "The hooks",
          text: "Reaching behind your back to do them up. Here, there's nothing to fasten.",
        },
      ],
    },
    shop: {
      eyebrow: "Choose your tanks",
      headline: "Pick your bundle, colours and size",
      sub: "Choose a colour for each tank, then your size. Seven sizes, S to 4XL.",
    },
    blackFriday: {
      hero: {
        eyebrow: "Early Black Friday",
        headline: "Stock up on your comfiest tank, a little early",
        sub: "Black Friday pricing on every bundle, right now. The same soft tank with the support built in: no hooks, no wire, no band.",
        cta: "See Black Friday bundles",
      },
    },
    christmas: {
      hero: {
        eyebrow: "Christmas gifting",
        headline: "A gift of comfort she'll wear every day",
        sub: "The Everyday Tank has the support built in, so getting dressed is the easy part of her day. Thirteen colours, sizes S to 4XL.",
        cta: "Shop gift bundles",
      },
      gift: {
        eyebrow: "Gifting made easy",
        headline: "Simple to choose, simple to swap",
        sub: "Buying clothes for someone else can feel like a guess. Here's why this one is easier.",
        points: [
          {
            title: "Buy it like a T-shirt",
            text: "Sizes run S to 4XL. If you know her usual top size, start there, or check the size guide.",
            flag: sizeGuide.flag,
          },
          {
            title: "A free size swap",
            text: "If it doesn't fit, she tells us within 90 days of delivery and we send a different size, free. She keeps the first one.",
            flag: GUARANTEE_FLAG,
          },
          {
            title: "A colour for everyone",
            text: "Thirteen colours, from soft nudes to deeper shades. Pick a different one for each tank.",
          },
        ],
      },
      closing: {
        headline: "Give her the comfiest part of her day",
        body: "Bundle three or five Everyday Tanks, each in its own colour and size.",
        cta: "Shop gift bundles",
      },
    },
  },
};
