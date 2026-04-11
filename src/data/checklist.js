export const CHECKLIST_ITEMS = [
  {
    key: 'morning_breathing',
    label: 'Morgon: andningsövning 5 min',
    icon: '🌬️',
    category: 'morgon',
  },
  {
    key: 'breakfast_fiber',
    label: 'Frukost med fiber & protein',
    icon: '🥣',
    category: 'kost',
  },
  {
    key: 'legumes',
    label: 'Baljväxter idag',
    icon: '🫘',
    category: 'kost',
  },
  {
    key: 'fish',
    label: 'Fisk idag',
    icon: '🐟',
    category: 'kost',
    conditional: true, // visas bara på fisk-dagar
  },
  {
    key: 'nuts',
    label: 'Nötter (20–30 g)',
    icon: '🥜',
    category: 'kost',
  },
  {
    key: 'fruit',
    label: 'Frukt 2–4 portioner',
    icon: '🍎',
    category: 'kost',
  },
  {
    key: 'vegetables',
    label: 'Grönsaker 500 g+',
    icon: '🥦',
    category: 'kost',
  },
  {
    key: 'steps_7000',
    label: '7 000+ steg',
    icon: '👟',
    category: 'rörelse',
  },
  {
    key: 'training_done',
    label: 'Dagens träning genomförd',
    icon: '💪',
    category: 'rörelse',
  },
  {
    key: 'last_meal_early',
    label: 'Sista måltid 3–5 h före sänggående',
    icon: '🕐',
    category: 'kväll',
  },
  {
    key: 'evening_winddown',
    label: 'Nedvarvning utan skärmar',
    icon: '🌙',
    category: 'kväll',
  },
  {
    key: 'evening_breathing',
    label: 'Andningsövning kväll 5 min',
    icon: '😮‍💨',
    category: 'kväll',
  },
]
