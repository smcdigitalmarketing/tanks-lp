import type { Concept } from "~/content/types";
import { photos, reviewBy } from "~/content/product";

/**
 * Concept A · Soft Everyday Comfort.
 * Warm, approachable, reassuring: the tank as the easy part of getting dressed.
 * Talks to "you", names the small daily annoyances, never gushes.
 */
export const soft: Concept = {
  slug: "soft",
  letter: "A",
  direction: "Soft Everyday Comfort",
  brand: {
    name: "Hallie",
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
      email: "hello@hallie.example",
      hours: "Monday to Friday, 9am–5pm",
    },
  },
  hypothesis:
    "Reassurance sells to a cautious, older buyer: a warm voice, visible sizing help and a gentle fit guarantee convert better than urgency.",
  meta: {
    title: "Hallie Everyday Tank · Gentle support, built in",
    description:
      "A soft tank with the bra built in: no underwire, no hooks, no band. Concept A for internal review.",
  },
  layout: {
    hero: "split",
    tiers: "stack",
    reviews: "notes",
    valueProps: "cards",
    divider: "wave",
    advertorial: "letter",
  },
  pdp: {
    kicker: "The comfortable everyday essential",
    eyebrow: "Built-in bra tank",
    title: {
      product: "Hallie Everyday Tank",
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
      sub: "Real reviews of the original built-in bra tank, shown as placeholders until Hallie has reviews of its own.",
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
  },
  advertorial: {
    kicker: "A note from Hallie",
    headline:
      "Why so many of us can't wait to take our bra off at the end of the day",
    dek: "And what changes when the support is built into the tank instead.",
    byline: "The Hallie team",
    readTime: "4 min read",
    lead: photos.mirror,
    leadCaption: "The Everyday Tank in nude.",
    intro: [
      "You know the moment. You walk through the door, and before your bag is off your shoulder you're reaching behind your back for the hooks.",
      "It isn't that bras are badly made. It's that most of them ask two thin straps and one tight band to do all the work, all day. By the afternoon you can feel exactly where they are.",
    ],
    sections: [
      {
        title: "Where the discomfort comes from",
        body: [
          "A traditional bra gathers its support into a few narrow places: the straps on your shoulders, the band around your ribs and, often, a wire underneath.",
          "Each of those is fine for an hour. Over a whole day the pressure stays in the same spots, which is why the band leaves a mark and the straps need pulling up again after lunch.",
        ],
        image: photos.braVsTank,
        caption:
          "Left: a traditional bra, with hooks, a band and thin straps. Right: the tank, with none of the three.",
      },
      {
        title: "What if the tank did the work?",
        body: [
          "A built-in bra tank puts soft cups inside the front of a fitted tank, with wide straps over the shoulders. There's no wire, no hooks and no band of its own.",
          "You pull it on over your head, tuck it in if you like, and that's you dressed underneath.",
        ],
        image: photos.cupDetail,
        caption: "The soft cups sit inside the front panel.",
      },
      {
        title: "Getting dressed shouldn't take thinking about",
        body: [
          "Most of us want fewer layers, not more: one thing that sits smoothly under a blouse or a cardigan and doesn't need checking in the mirror before we leave.",
          "That's the whole idea of the Everyday Tank. It's a tank you'd wear anyway, with the support already inside.",
        ],
        pullQuote: reviewBy("Carol"),
      },
      {
        title: "A bra or a built-in tank: the honest difference",
        body: [
          "Neither is right for everything. If you need firm support for running or sport, a sports bra still has its place. For ordinary days, plenty of us would rather have one soft layer.",
        ],
        list: [
          {
            label: "Support",
            text: "A bra puts it in the straps and band; the tank spreads it through soft cups and wide straps. It's everyday support, not sports support.",
          },
          {
            label: "Fastening",
            text: "Hooks behind your back, or nothing at all.",
          },
          {
            label: "Under clothes",
            text: "Straps and band can show; the tank is one smooth layer.",
          },
          { label: "Layers", text: "A bra plus a top, or one piece." },
        ],
      },
      {
        title: "The questions we hear most",
        body: ["We'd rather you knew before you ordered than after."],
        list: [
          {
            label: "Will it support a fuller bust?",
            text: "It's made for everyday support in sizes S to 4XL, chosen by your bust measurement. If the size isn't right, we'll exchange it free within 90 days.",
          },
          {
            label: "How do I choose my size?",
            text: "Measure over your bra, around the fullest part. If you're between sizes, go up one.",
          },
          {
            label: "Will it ride up?",
            text: "It's cut long enough to tuck in. Some wearers find it rides up when the size isn't right for them, which is why we ask you to measure, and why the exchange is free.",
          },
          {
            label: "How do I wash it?",
            text: "Cold, on a gentle cycle, then lay it flat to dry.",
          },
        ],
      },
    ],
    closing: {
      headline: "Ready to try the Everyday Tank?",
      body: "Choose your colours, check your size with the guide, and if it doesn't fit we'll send another size free.",
      cta: "See the Everyday Tank",
    },
  },
};
