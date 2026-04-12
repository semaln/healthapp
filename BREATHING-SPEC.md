# Andningsövningar – Funktionsspecifikation

## Översikt

Utöka den befintliga appen med ett bibliotek av evidensbaserade andningstekniker. Varje teknik har en visuell animerad guide, konfigurerbar timer och situationsbaserad rekommendation. Funktionen ska vara tillgänglig både som en egen sektion under Tränings-sidan och som snabbåtkomst från Idag-sidan.

---

## Andningstekniker (6 stycken)

### 1. Diafragmaandning med förlängd utandning
- **ID:** `extended_exhale`
- **Mönster:** 4 sek in → 4 sek håll → 6 sek ut
- **Total cykel:** 14 sek (~4,3 andetag/min)
- **Faser:** 3 (inhale, hold, exhale)
- **Bäst för:** Daglig rutin, morgon och kväll
- **Kort beskrivning:** "Grundtekniken. Förlängd utandning aktiverar vagusnerven och sänker stress direkt."
- **Evidens:** Förlängd utandning relativt inandning ger starkare parasympatisk aktivering. Väldokumenterad i HRV-forskning.
- **Default sessionstid:** 5 min
- **Svårighetsgrad:** Nybörjare

### 2. Fysiologisk suck (Physiological Sigh)
- **ID:** `physiological_sigh`
- **Mönster:** Kort inandning näsa (1,5 sek) → Kort inandning näsa (1,5 sek) → Lång utandning mun (6 sek)
- **Total cykel:** 9 sek (~6,7 andetag/min)
- **Faser:** 3 (inhale_1, inhale_2, exhale)
- **Bäst för:** Akut stress, snabb ångestdämpning
- **Kort beskrivning:** "Stanford-forskning visar att detta är den mest effektiva snabbmetoden. Dubbel inandning öppnar lungorna maximalt, lång utandning lugnar nervsystemet."
- **Evidens:** Cell Reports Medicine (2023) – mest effektiv av fyra testade metoder för att sänka stress och förbättra HRV vid 5 min daglig användning.
- **Default sessionstid:** 3 min (eller "snabbläge" med bara 3-5 andetag)
- **Svårighetsgrad:** Nybörjare
- **Specialfunktion:** Erbjud "snabbläge" – bara 3 andetag utan timer. Knapp: "Snabb lugnande övning".

### 3. Koherent andning (Coherent Breathing)
- **ID:** `coherent`
- **Mönster:** 5,5 sek in → 5,5 sek ut
- **Total cykel:** 11 sek (~5,5 andetag/min)
- **Faser:** 2 (inhale, exhale)
- **Bäst för:** Längre sessioner, meditation, HRV-optimering
- **Kort beskrivning:** "Andas i takt med din kropp. 5,5 andetag per minut ligger nära den frekvens där HRV maximeras hos de flesta."
- **Evidens:** Forskning visar signifikant förbättrad HRV, sänkt blodtryck och förbättrad baroreflex-känslighet vid denna frekvens.
- **Default sessionstid:** 10 min
- **Svårighetsgrad:** Nybörjare

### 4. Box Breathing (Fyrkantsandning)
- **ID:** `box`
- **Mönster:** 4 sek in → 4 sek håll → 4 sek ut → 4 sek håll
- **Total cykel:** 16 sek (~3,75 andetag/min)
- **Faser:** 4 (inhale, hold_1, exhale, hold_2)
- **Bäst för:** Fokus, prestation under press
- **Kort beskrivning:** "Används av Navy SEALs. Fyra lika faser skapar fokus och lugn. Hållningsfaserna tvingar bort grubblande tankar."
- **Evidens:** Studerad i militära sammanhang. Förbättrad emotionell reglering och stresshantering.
- **Default sessionstid:** 5 min
- **Svårighetsgrad:** Medel

### 5. 4-7-8-andning (Weil-metoden)
- **ID:** `weil_478`
- **Mönster:** 4 sek in → 7 sek håll → 8 sek ut
- **Total cykel:** 19 sek (~3,2 andetag/min)
- **Faser:** 3 (inhale, hold, exhale)
- **Bäst för:** Insomning, djup avslappning
- **Kort beskrivning:** "Kraftig avslappningsteknik. Den långa hållningen och utandningen ger djup parasympatisk aktivering. Populär som sömnhjälp."
- **Evidens:** Bygger på samma fysiologi som förlängd utandning. Svagare specifik evidensbas men fysiologiskt välmotiverad.
- **Default sessionstid:** 5 min
- **Svårighetsgrad:** Medel-Avancerad (lång hållning kan vara utmanande)

### 6. Alternerande näsandning (Nadi Shodhana)
- **ID:** `nadi_shodhana`
- **Mönster:** In vänster (4 sek) → Håll (4 sek) → Ut höger (6 sek) → In höger (4 sek) → Håll (4 sek) → Ut vänster (6 sek)
- **Total cykel:** 28 sek (en komplett cykel = båda sidor)
- **Faser:** 6 (inhale_left, hold, exhale_right, inhale_right, hold, exhale_left)
- **Bäst för:** Meditation, djup avslappning, kvällsrutin
- **Kort beskrivning:** "Yoga-teknik med modern evidens. Alternering mellan näsborrarna balanserar nervsystemet. Meta-analyser visar sänkt blodtryck."
- **Evidens:** RCT:er och meta-analyser visar signifikant sänkt systoliskt blodtryck och förbättrad HRV.
- **Default sessionstid:** 10 min
- **Svårighetsgrad:** Avancerad
- **Specialinstruktion:** Visa visuell guide för fingerplacering (höger tumme stänger höger, höger ringfinger stänger vänster).

---

## Datastruktur

```javascript
// src/data/breathingExercises.js

export const breathingExercises = [
  {
    id: "extended_exhale",
    name: "Förlängd utandning",
    shortName: "4-4-6",
    description: "Grundtekniken. Förlängd utandning aktiverar vagusnerven och sänker stress direkt.",
    bestFor: ["Daglig rutin", "Morgon", "Kväll"],
    difficulty: "beginner",
    evidence: "Väldokumenterad HRV-förbättring vid förlängd utandning.",
    defaultDuration: 300, // sekunder
    phases: [
      { name: "Andas in", type: "inhale", duration: 4, instruction: "Andas in genom näsan" },
      { name: "Håll", type: "hold", duration: 4, instruction: "Håll andan lugnt" },
      { name: "Andas ut", type: "exhale", duration: 6, instruction: "Andas ut långsamt genom munnen" }
    ],
    color: "#4a7c59" // grön
  },
  {
    id: "physiological_sigh",
    name: "Fysiologisk suck",
    shortName: "Suck",
    description: "Stanford-forskning visar att detta är den mest effektiva snabbmetoden för att sänka akut stress.",
    bestFor: ["Akut stress", "Ångest", "Snabb lugnande"],
    difficulty: "beginner",
    evidence: "Cell Reports Medicine 2023 – mest effektiv av fyra metoder vid 5 min daglig användning.",
    defaultDuration: 180, // 3 min default, plus snabbläge
    quickMode: true, // stödjer snabbläge (3-5 andetag)
    quickBreaths: 5,
    phases: [
      { name: "Andas in", type: "inhale", duration: 1.5, instruction: "Kort inandning genom näsan" },
      { name: "Andas in igen", type: "inhale", duration: 1.5, instruction: "En till kort inandning genom näsan" },
      { name: "Andas ut", type: "exhale", duration: 6, instruction: "Lång, långsam utandning genom munnen" }
    ],
    color: "#d94f3a" // röd-orange (akut)
  },
  {
    id: "coherent",
    name: "Koherent andning",
    shortName: "5.5/5.5",
    description: "Andas i takt med din kropp. 5,5 andetag per minut maximerar HRV hos de flesta.",
    bestFor: ["Meditation", "HRV-optimering", "Längre sessioner"],
    difficulty: "beginner",
    evidence: "Signifikant förbättrad HRV, sänkt blodtryck och förbättrad baroreflex-känslighet.",
    defaultDuration: 600, // 10 min
    phases: [
      { name: "Andas in", type: "inhale", duration: 5.5, instruction: "Andas in lugnt genom näsan" },
      { name: "Andas ut", type: "exhale", duration: 5.5, instruction: "Andas ut lugnt genom munnen" }
    ],
    color: "#2a6478" // blå
  },
  {
    id: "box",
    name: "Box Breathing",
    shortName: "4-4-4-4",
    description: "Används av Navy SEALs. Fyra lika faser skapar fokus och lugn under press.",
    bestFor: ["Fokus", "Före möten", "Prestation"],
    difficulty: "medium",
    evidence: "Studerad i militära sammanhang. Förbättrad emotionell reglering.",
    defaultDuration: 300,
    phases: [
      { name: "Andas in", type: "inhale", duration: 4, instruction: "Andas in genom näsan" },
      { name: "Håll", type: "hold", duration: 4, instruction: "Håll andan" },
      { name: "Andas ut", type: "exhale", duration: 4, instruction: "Andas ut genom munnen" },
      { name: "Håll", type: "hold", duration: 4, instruction: "Håll med tomma lungor" }
    ],
    color: "#8a6e42" // brun/guld
  },
  {
    id: "weil_478",
    name: "4-7-8-andning",
    shortName: "4-7-8",
    description: "Kraftig avslappningsteknik. Den långa hållningen och utandningen ger djup lugn. Populär som sömnhjälp.",
    bestFor: ["Insomning", "Djup avslappning", "Kvällsrutin"],
    difficulty: "advanced",
    evidence: "Bygger på förlängd utandning-fysiologi. Etablerad inom klinisk avslappning.",
    defaultDuration: 300,
    phases: [
      { name: "Andas in", type: "inhale", duration: 4, instruction: "Andas in genom näsan" },
      { name: "Håll", type: "hold", duration: 7, instruction: "Håll andan lugnt" },
      { name: "Andas ut", type: "exhale", duration: 8, instruction: "Andas ut helt genom munnen" }
    ],
    color: "#6a4a6a" // lila
  },
  {
    id: "nadi_shodhana",
    name: "Alternerande näsandning",
    shortName: "Nadi",
    description: "Yoga-teknik med modern evidens. Alternering mellan näsborrarna balanserar nervsystemet.",
    bestFor: ["Meditation", "Kvällsrutin", "Blodtryck"],
    difficulty: "advanced",
    evidence: "Meta-analyser visar signifikant sänkt systoliskt blodtryck och förbättrad HRV.",
    defaultDuration: 600,
    fingerInstruction: "Använd höger hand. Tummen stänger höger näsborre, ringfingret stänger vänster.",
    phases: [
      { name: "In vänster", type: "inhale", duration: 4, instruction: "Stäng höger. Andas in genom vänster.", side: "left" },
      { name: "Håll", type: "hold", duration: 4, instruction: "Stäng båda. Håll andan.", side: "both" },
      { name: "Ut höger", type: "exhale", duration: 6, instruction: "Öppna höger. Andas ut.", side: "right" },
      { name: "In höger", type: "inhale", duration: 4, instruction: "Håll vänster stängd. Andas in höger.", side: "right" },
      { name: "Håll", type: "hold", duration: 4, instruction: "Stäng båda. Håll andan.", side: "both" },
      { name: "Ut vänster", type: "exhale", duration: 6, instruction: "Öppna vänster. Andas ut.", side: "left" }
    ],
    color: "#c45a3c" // terrakotta
  }
];

// Situationsbaserade rekommendationer
export const breathingSituations = [
  {
    situation: "Morgonrutin",
    icon: "🌅",
    recommended: "extended_exhale",
    alternatives: ["coherent"],
    description: "Starta dagen med lugn aktivering av parasympatiska nervsystemet."
  },
  {
    situation: "Akut stress",
    icon: "🔥",
    recommended: "physiological_sigh",
    alternatives: ["extended_exhale"],
    description: "Snabb nedreglering när stressen sticker iväg. Fungerar på 3 andetag."
  },
  {
    situation: "Före möte eller prestation",
    icon: "🎯",
    recommended: "box",
    alternatives: ["extended_exhale"],
    description: "Skärpa fokus och lugna nerverna innan viktiga situationer."
  },
  {
    situation: "Kvällsrutin",
    icon: "🌙",
    recommended: "weil_478",
    alternatives: ["coherent", "nadi_shodhana"],
    description: "Nedvarvning och förberedelse för god sömn."
  },
  {
    situation: "Insomning",
    icon: "😴",
    recommended: "weil_478",
    alternatives: ["coherent"],
    description: "Djup avslappning som hjälper dig somna."
  },
  {
    situation: "Meditation",
    icon: "🧘",
    recommended: "coherent",
    alternatives: ["nadi_shodhana"],
    description: "Längre session för djup HRV-förbättring och inre lugn."
  },
  {
    situation: "Garmin-stress hög",
    icon: "⌚",
    recommended: "physiological_sigh",
    alternatives: ["extended_exhale", "box"],
    description: "Din Garmin visar hög stress. Pausa och andas."
  }
];

// Svårighetsnivåer
export const difficultyLabels = {
  beginner: { label: "Nybörjare", color: "#4a7c59" },
  medium: { label: "Medel", color: "#8a6e42" },
  advanced: { label: "Avancerad", color: "#6a4a6a" }
};
```

---

## UI-komponenter

### 1. BreathingLibrary (huvudvy)
**Placering:** Egen flik/sektion under Tränings-sidan, eller tillgänglig via Idag-sidan.

**Layout:**
- **Situationsbaserad vy** (default): Visar kort med situationer ("Morgonrutin", "Akut stress", etc.) – användaren väljer situation, får rekommenderad teknik.
- **Alla tekniker-vy** (toggle): Visar alla 6 tekniker som kort med namn, svårighetsgrad-badge, kort beskrivning och "Starta"-knapp.
- **Toggle-knappar** i toppen: "Välj situation" | "Alla tekniker"

### 2. BreathingSession (aktiv session)
**Öppnas som fullskärmsvy** (eller modal/sheet) när en övning startas.

**Visuella element:**

**Andningscirkel (central animation):**
- En cirkel som expanderar vid inandning och kontraherar vid utandning.
- Vid hållning: cirkeln lyser/pulserar subtilt men ändrar inte storlek.
- Färgen matchar den aktiva teknikens `color`.
- Mjuk animation med CSS transitions (ease-in-out).

**Storleksändring per fas:**
- `inhale`: cirkel växer från 40% → 100% av maxstorlek
- `hold`: cirkel stannar, subtil pulsering (opacity 0.8 → 1.0)
- `exhale`: cirkel krymper från 100% → 40%

**Textinstruktion:**
- Stor text ovanför/under cirkeln som visar aktuell fas: "Andas in", "Håll", "Andas ut"
- Fasspecifik instruktion under i mindre text (t.ex. "Andas in genom näsan")
- För Nadi Shodhana: visa vilken sida ("Vänster näsborre" / "Höger näsborre")

**Fas-countdown:**
- Siffra inuti cirkeln som räknar ner sekunderna för aktuell fas (6... 5... 4...)

**Session-progress:**
- Tunn progressbar i toppen av skärmen som visar total sessionstid
- Text: "3:42 / 5:00"

**Kontroller:**
- Paus/Fortsätt-knapp (stor, centrerad under cirkeln)
- Avsluta-knapp (mindre, i hörn eller under paus)
- Ljudknapp (toggle ljud på/av)

**Ljud:**
- Diskret ton (mjuk klocka/ping) vid fasövergångar
- Valfri: subtil ambient bakgrund (kan vara en framtida feature)
- Ljud av som default, användaren slår på om önskat

**Vibrering:**
- Kort vibration vid fasövergång om enheten stöder det (`navigator.vibrate(100)`)

**Session-slut:**
- Mjuk övergång till sammanfattning
- Visa: teknik, total tid, antal andetag
- "Bra jobbat!"-meddelande
- Knappar: "Gör igen" | "Tillbaka"

### 3. QuickBreathButton (snabbåtkomst)
**Placering:** Idag-sidan, eventuellt som FAB (floating action button) eller i ett "Snabbverktyg"-kort.

**Funktion:**
- Knapp: "Andas" eller "🫁 Snabb andning"
- Klick öppnar antingen:
  - Direkt: Fysiologisk suck i snabbläge (5 andetag, ingen timer)
  - Eller: En snabbväljare med situationer

### 4. BreathingStats (valfri, fas 4)
**Placering:** Mätnings-sidan.

**Visar:**
- Antal andningssessioner denna vecka/månad
- Total tid i andningsövningar
- Mest använda teknik
- Streak: dagar i rad med minst en session

---

## Specialbeteende per teknik

### Fysiologisk suck – Snabbläge
- När `quickMode: true` och användaren väljer snabbläge:
  - Ingen total sessionstimer
  - Räkna bara andetag (default 5)
  - Visa "Andetag 3 av 5" istället för tidprogression
  - Avslutas automatiskt efter sista andetaget

### Nadi Shodhana – Sidoindikator
- Visa en enkel grafik av en näsa med markering av vilken sida som är aktiv:
  - Vänster sida lyser: "In vänster"
  - Höger sida lyser: "Ut höger"
  - Båda stängda: "Håll"
- Alternativt: enkel text med pilar (← Vänster / Höger →)
- Visa `fingerInstruction` som overlay vid sessionstart

### Box Breathing – Visuell variant
- Istället för (eller utöver) cirkeln: visa en fyrkant där en punkt rör sig längs kanterna
  - Uppåt = in, höger = håll, nedåt = ut, vänster = håll
- Kan vara en toggle: "Cirkel" | "Fyrkant"

---

## Inställningar (sparas i localStorage)

```javascript
// Lägg till i befintligt settings-objekt
"breathing_settings": {
  sound_enabled: false,
  vibration_enabled: true,
  // Möjlighet att justera tider per teknik (avancerat, dold bakom "Anpassa")
  custom_durations: {
    // Om användaren t.ex. vill ha 5 sek in istället för 4 i extended_exhale
    // "extended_exhale": { inhale: 5, hold: 4, exhale: 8 }
  }
}

// Andningslogg
"breathing_log": [
  {
    date: "2026-04-12T08:30:00",
    exercise_id: "extended_exhale",
    duration_seconds: 300,
    completed: true
  }
]
```

---

## Integrering med befintlig app

### Idag-sidan
- Lägg till ett "Andning"-kort med:
  - Status: "Inte gjord idag" / "✓ 5 min förlängd utandning"
  - Snabbknapp för morgon-andning (rekommenderar rätt teknik baserat på tid på dygnet)
  - Morgon (06-10): Förlängd utandning
  - Dagtid (10-17): Fysiologisk suck eller Box breathing
  - Kväll (17-22): 4-7-8 eller Koherent
  - Natt (22+): 4-7-8
- Koppla till befintlig checklista: "Morgon: andningsövning 5 min" och "Andningsövning kväll 5 min" bockas av automatiskt när en session genomförs vid rätt tid

### Tränings-sidan
- Lägg till "Andning" som en flik/sektion bredvid träningspassen
- Visa andningstimer-komponenten som redan kan finnas i appen men byt ut mot denna rikare version

### Mätnings-sidan
- Lägg till andningsstatistik under en egen flik eller i befintlig daglig logg

---

## Filstruktur (nya/ändrade filer)

```
src/
├── data/
│   └── breathingExercises.js          (NY – all data ovan)
├── components/
│   └── features/
│       ├── BreathingLibrary.jsx       (NY – teknikbibliotek med situationsvy)
│       ├── BreathingSession.jsx       (NY – fullskärms sessionvy med animation)
│       ├── BreathingCircle.jsx        (NY – animerad andningscirkel)
│       ├── BreathingBoxVisual.jsx     (NY – fyrkantsanimation för box breathing)
│       ├── NoseIndicator.jsx          (NY – näsindikator för Nadi Shodhana)
│       ├── QuickBreathButton.jsx      (NY – snabbåtkomstknapp)
│       ├── BreathingStats.jsx         (NY – statistik, valfri)
│       └── BreathingGuide.jsx         (UPPDATERA befintlig om den finns)
├── hooks/
│   └── useBreathingSession.js         (NY – sessionlogik, timer, fashantering)
```

---

## Animationsdetaljer (CSS)

```css
/* Andningscirkel – grundprincip */
.breathing-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  transition: transform ease-in-out;
  /* transition-duration sätts dynamiskt baserat på faslängd */
}

.breathing-circle.inhale {
  transform: scale(1.0);    /* full storlek */
}

.breathing-circle.exhale {
  transform: scale(0.4);    /* 40% storlek */
}

.breathing-circle.hold {
  animation: subtle-pulse 2s ease-in-out infinite;
}

@keyframes subtle-pulse {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1.0; }
}

/* Box breathing fyrkant */
.box-visual {
  width: 200px;
  height: 200px;
  border: 3px solid var(--color-primary);
  border-radius: 8px;
  position: relative;
}

.box-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-primary);
  position: absolute;
  transition: all linear;
  /* top/left sätts dynamiskt:
     inhale: bottom-left → top-left
     hold_1: top-left → top-right
     exhale: top-right → bottom-right
     hold_2: bottom-right → bottom-left
  */
}
```

---

## Prompt för Claude Code

```
Jag vill lägga till ett andningsövningsbibliotek i min befintliga 
Vite/React hjärthälso-app. 

Läs specifikationen i BREATHING-SPEC.md för komplett information om:
- 6 andningstekniker med mönster, faser och metadata
- Situationsbaserade rekommendationer
- UI-komponenter (bibliotek, session med animation, snabbknapp)
- Datastruktur och localStorage-integration
- Animationsdetaljer för andningscirkeln
- Integrering med befintliga sidor (Idag, Träning, Mätning)

Börja med:
1. Skapa src/data/breathingExercises.js med all data
2. Bygg BreathingCircle.jsx med animerad cirkel (expanderar/kontraherar)
3. Bygg useBreathingSession.js hook (fashantering, timer, ljud/vibration)
4. Bygg BreathingSession.jsx (fullskärm med cirkel, instruktioner, countdown)
5. Bygg BreathingLibrary.jsx (situationsvy + alla tekniker)
6. Integrera i befintlig app (Tränings-sidan + snabbknapp på Idag-sidan)

All text på svenska.
```
