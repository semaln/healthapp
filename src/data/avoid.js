export const AVOID_ITEMS = [
  {
    category: 'Transfetter & industriellt fett',
    color: '#d94f3a',
    items: [
      { name: 'Margarin & delvis härdade oljor', reason: 'Höjer LDL, sänker HDL – värsta fettet för hjärtat' },
      { name: 'Friterat snabbmat', reason: 'Transfetter + salt + kalorier' },
      { name: 'Bakverk från snabbkondis', reason: 'Ofta transfetter och högt socker' },
    ],
  },
  {
    category: 'Raffinerade kolhydrater & socker',
    color: '#d94f3a',
    items: [
      { name: 'Vitt bröd och vita nudlar', reason: 'Höjer blodsockret snabbt, lite näring' },
      { name: 'Sockrade drycker (läsk, juice)', reason: 'Flytande socker – sämst möjliga form' },
      { name: 'Godis och glass', reason: 'Socker utan näringsvärde' },
      { name: 'Frukostflingor med socker', reason: 'Döljs som "hälsosamt" – kolla innehållsförteckningen' },
    ],
  },
  {
    category: 'Salt & bearbetat kött',
    color: '#e07a47',
    items: [
      { name: 'Charkuterier (korv, salami, bacon)', reason: 'Rött bearbetat kött kopplat till ökad hjärtrisk' },
      { name: 'Salt snacks & chips', reason: 'Högt natriuminnehåll höjer blodtrycket' },
      { name: 'Färdiga soppor och såser', reason: 'Dold salt – mer än ett normalt mål' },
    ],
  },
  {
    category: 'Alkohol',
    color: '#e07a47',
    items: [
      { name: 'Alkohol generellt', reason: 'Höjer blodtrycket, påverkar HRV negativt' },
      { name: 'Öl och söta viner', reason: 'Extra kalorier och socker utöver alkoholen' },
    ],
  },
]
