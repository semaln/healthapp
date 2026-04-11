export const AVOID_ITEMS = [
  {
    category: 'Salt & natrium',
    icon: '🧂',
    color: '#e07a47',
    items: [
      {
        name: 'Salt / natrium (högt intag)',
        reason: 'Max 5–6 g salt/dag. Undvik färdigrätter, chips, saltade nötter. Kroppen behöver kalium-natrium-balans.',
      },
      {
        name: 'Färdigrätter, soppor & såser',
        reason: 'Innehåller ofta mer natrium än ett helt normalt dagsmål. Dold saltfälla.',
      },
      {
        name: 'Saltade snacks & chips',
        reason: 'Högt natriuminnehåll höjer blodtrycket. Välj osaltade nötter istället.',
      },
    ],
  },
  {
    category: 'Charkuterier & processat kött',
    icon: '🥓',
    color: '#d94f3a',
    items: [
      {
        name: 'Bacon, korv & salami',
        reason: 'Starkt kopplat till hjärt-kärlrisk och cancer. WHO-klassificerat som grupp 1-cancerframkallande (processat kött).',
      },
      {
        name: 'Charkuterier generellt',
        reason: 'Undvik helt om möjligt. Högt salt + nitrater + mättat fett = trippelrisk.',
      },
    ],
  },
  {
    category: 'Ohälsosamma fetter',
    icon: '🧈',
    color: '#d94f3a',
    items: [
      {
        name: 'Smör & hårda margariner',
        reason: 'Ersätt med olivolja, rapsolja eller mjukt margarin av rapsolja. Smör höjer LDL.',
      },
      {
        name: 'Kokosfett / palmolja',
        reason: 'Högt mättat fett trots växtbaserat ursprung. Sämre än olivolja/rapsolja.',
      },
      {
        name: 'Friterat & snabbmat',
        reason: 'Transfetter + salt + kalorier. Kraftigt kopplat till hjärt-kärlrisk.',
      },
    ],
  },
  {
    category: 'Sockersötade drycker & sötsaker',
    icon: '🥤',
    color: '#d94f3a',
    items: [
      {
        name: 'Läsk, juice & energidrycker',
        reason: 'Flytande socker i stor mängd. Höjer triglycerider och bidrar till visceralt fett.',
      },
      {
        name: 'Godis & choklad (utan mörk kakao)',
        reason: 'Socker utan näringsvärde. Byt mot mörk choklad 70%+ om sug uppstår.',
      },
      {
        name: 'Fruktjuice (även "naturell")',
        reason: 'Hel frukt är alltid bättre – juicen saknar fiber och koncentrerar socker.',
      },
    ],
  },
  {
    category: 'Raffinerade kolhydrater',
    icon: '🍞',
    color: '#e07a47',
    items: [
      {
        name: 'Vitt bröd & raffinerat mjöl',
        reason: 'Snabba kolhydrater utan fiber. Höjer blodsocker snabbt. Välj alltid fullkorn.',
      },
      {
        name: 'Sockersötade frukostflingor',
        reason: 'Marknadsförs som hälsosamt men innehåller ofta mycket socker. Kolla innehållsförteckningen.',
      },
      {
        name: 'Ultraprocessad mat (färdigpizzor, snacks)',
        reason: 'Dolda salt- och fettfällor. Hög NOVA-klass (ultraprocessad) kopplat till ökad hjärtdödlighet.',
      },
    ],
  },
  {
    category: 'Alkohol',
    icon: '🍷',
    color: '#e07a47',
    items: [
      {
        name: 'Alkohol generellt',
        reason: 'Höjer blodtrycket dosberoende. Försämrar sömnarkitektur och HRV. Inga säkra nivåer för hjärthälsa.',
      },
      {
        name: 'Öl & söta viner',
        reason: 'Extra kalorier och socker utöver alkoholens egna skador. Bidrar till visceralt fett.',
      },
    ],
  },
]
