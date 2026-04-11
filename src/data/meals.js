export const MEALS = {
  frukost: [
    {
      id: 'f1',
      name: 'Havregrynsgröt med bär och nötter',
      description: 'Hög fiberhalt, beta-glukan sänker LDL. Toppa med blåbär och valnötter.',
      star: true,
      japanese: false,
    },
    {
      id: 'f2',
      name: 'Grekisk yoghurt med linfrö och bär',
      description: 'Protein och omega-3 från linfrö. Välj naturell utan tillsatt socker.',
      star: true,
      japanese: false,
    },
    {
      id: 'f3',
      name: 'Ägg och grönsaker',
      description: 'Ägg är OK i måttlig mängd (4–6/vecka). Servera med spenat eller tomat.',
      star: false,
      japanese: false,
    },
    {
      id: 'f4',
      name: 'Misosoppa med tofu och wakame',
      description: 'Traditionell japansk frukost. Probiotika från miso, protein från tofu.',
      star: true,
      japanese: true,
    },
    {
      id: 'f5',
      name: 'Rågbröd med avokado och gurka',
      description: 'Fullkorn ger lång mättnad. Avokado ger hälsosamt fett.',
      star: false,
      japanese: false,
    },
  ],
  lunch: [
    {
      id: 'l1',
      name: 'Linssoppa med fullkornsbröd',
      description: 'Baljväxter dagligen är ett av de starkaste kostråden för hjärthälsa.',
      star: true,
      japanese: false,
    },
    {
      id: 'l2',
      name: 'Lax med quinoa och broccoli',
      description: 'Omega-3 från lax, komplett protein från quinoa, antioxidanter från broccoli.',
      star: true,
      japanese: false,
    },
    {
      id: 'l3',
      name: 'Bönsallad med olivolja och örter',
      description: 'Blanda kidneybönor, kikärter och svarta bönor. Extra virgin olivolja.',
      star: true,
      japanese: false,
    },
    {
      id: 'l4',
      name: 'Sushi med lax och avokado',
      description: 'Välj brunt ris om möjligt. Fisk och avokado ger bra fettsyror.',
      star: true,
      japanese: true,
    },
    {
      id: 'l5',
      name: 'Kyckling med sötpotatis och grönsaker',
      description: 'Magert protein, betakaroten från sötpotatis, stor grönsaksandel.',
      star: false,
      japanese: false,
    },
    {
      id: 'l6',
      name: 'Tofu stir-fry med grönsaker och soba',
      description: 'Vegansk variant rik på protein och fiber. Sobanudlar av bovete.',
      star: false,
      japanese: true,
    },
  ],
  middag: [
    {
      id: 'm1',
      name: 'Ugnsbakad makrill med rotfrukter',
      description: 'Makrill är extremt rik på omega-3. Rotfrukter ger fibrer och näring.',
      star: true,
      japanese: false,
    },
    {
      id: 'm2',
      name: 'Kikärtsgryta med spenat och tomater',
      description: 'Helt vegetarisk, hög proteinandel, lycopén från tomater.',
      star: true,
      japanese: false,
    },
    {
      id: 'm3',
      name: 'Grillad lax med edamame och brunt ris',
      description: 'Klassisk hjärthälsosam middag. Edamame ger isoflavonoider.',
      star: true,
      japanese: true,
    },
    {
      id: 'm4',
      name: 'Bönburgare med sallad',
      description: 'Hemgjord av svarta bönor. Servera med avokado och grönsaker.',
      star: false,
      japanese: false,
    },
    {
      id: 'm5',
      name: 'Kycklinggryta med linser och grönsaker',
      description: 'Linser tillsätter fibrer och protein. Använd lite kokosmjölk för smak.',
      star: false,
      japanese: false,
    },
    {
      id: 'm6',
      name: 'Nabe (japansk gryta) med tofu och grönsaker',
      description: 'Lätt och näringsrik. Dashi-buljong, tofu, kål, pak choi.',
      star: true,
      japanese: true,
    },
  ],
  mellanmal: [
    {
      id: 'me1',
      name: 'Valnötter och mörk choklad',
      description: 'Valnötter bäst för hjärtat av alla nötter. Choklad 70%+, 1–2 bitar.',
      star: true,
      japanese: false,
    },
    {
      id: 'me2',
      name: 'Äpple med mandel',
      description: 'Quercetin i äppelskalet är antiinflammatoriskt. Mandel ger vitamin E.',
      star: true,
      japanese: false,
    },
    {
      id: 'me3',
      name: 'Edamame (kokta sojabönor)',
      description: 'Fantastiskt mellanmål: protein, fiber, isoflavonoider.',
      star: true,
      japanese: true,
    },
    {
      id: 'me4',
      name: 'Hummus med gurka och paprika',
      description: 'Kikärtsbaserat. Dipp grönsaker istället för chips.',
      star: false,
      japanese: false,
    },
    {
      id: 'me5',
      name: 'Grönkålschips',
      description: 'Ugnsrostad grönkål med olivolja. Krispigt och näringsrikt.',
      star: false,
      japanese: false,
    },
  ],
}

// Deterministiskt dagligt val baserat på datum
export function getDailyMealSuggestions(dateKey) {
  const seed = dateKey.replace(/-/g, '') | 0
  const pick = (arr, offset) => arr[(seed + offset) % arr.length]

  return {
    frukost: pick(MEALS.frukost, 0),
    lunch: pick(MEALS.lunch, 3),
    middag: pick(MEALS.middag, 7),
    mellanmal: pick(MEALS.mellanmal, 11),
  }
}
