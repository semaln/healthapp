# Hjärthälsosam Livsstil – PWA App Specifikation

## Projektöversikt

En Progressive Web App (PWA) byggd med Vite + React som fungerar som en daglig interaktiv guide för hjärthälsosam livsstil. Appen samlar kost, träning, sömn, stresshantering och hälsomätningar i ett användarvänligt mobilgränssnitt. Hostad via GitHub Pages.

### Teknisk stack
- **Vite** som byggverktyg
- **React** med funktionella komponenter och hooks
- **React Router** för navigation
- **localStorage** för persistent data (checklistor, logg, inställningar)
- **Tailwind CSS** för styling (utility-first, snabb utveckling)
- **vite-plugin-pwa** för PWA-funktionalitet (service worker, manifest)
- **lucide-react** för ikoner
- **Hosting:** GitHub Pages via `gh-pages` npm-paket

### PWA-krav
- Installerbar på hemskärmen (iOS + Android)
- Fungerar offline (service worker cachar alla assets)
- manifest.json med appnamn, ikoner, theme_color
- Appnamn: "Hjärthälsa" (kort) / "Hjärthälsosam Livsstil" (långt)
- Theme color: mörkgrön (#2a4a3a)
- Bakgrundsfärg: off-white (#fafbf8)

---

## Appstruktur & Navigation

### Huvudnavigation (bottom tab bar, mobil-first)
5 flikar i botten av skärmen:

| Ikon | Label | Route | Beskrivning |
|---|---|---|---|
| 🏠 | Idag | `/` | Dagens översikt med schema och checklistor |
| 🍽️ | Kost | `/kost` | Måltidsförslag, livsmedelslista, japansk variant |
| 💪 | Träning | `/traning` | Veckans pass, övningsbeskrivningar, timers |
| 📊 | Mätning | `/matning` | HRV/stress-logg, midjemått, checklistor-historik |
| 📖 | Guide | `/guide` | All referensinformation (den fullständiga guiden) |

---

## Sida 1: Idag (Startsida)

### Syfte
Ge en snabb överblick av dagens fokus. Vad ska jag äta, göra, tänka på?

### Innehåll

**Header:**
- Dagens datum (formaterat: "Lördag 12 april")
- Hälsning baserad på tid på dygnet ("God morgon", "God eftermiddag", etc.)

**Dagens schema-kort:**
Visar vad som gäller idag baserat på veckodag:
- Måndag: Pass A (underkropp + isometriskt) + promenad
- Tisdag: Lugn löpning 30–45 min + promenad
- Onsdag: Pass B (överkropp + isometriskt) + promenad
- Torsdag: Vila + promenad
- Fredag: Pass C (helkropp isometriskt) + promenad
- Lördag: Lugn löpning 30–45 min + promenad
- Söndag: Vila + längre promenad

**Daglig checklista (sparas i localStorage per datum):**
- [ ] Morgon: andningsövning 5 min
- [ ] Frukost med fiber & protein
- [ ] Baljväxter idag
- [ ] Fisk idag (visa bara om det är fisk-dag: 2-3 gånger/vecka, användaren väljer vilka dagar)
- [ ] Nötter (20-30g)
- [ ] Frukt 2-4 portioner
- [ ] Grönsaker 500g+
- [ ] 7000+ steg
- [ ] Dagens träning genomförd
- [ ] Sista måltid 3-5h före sänggående
- [ ] Nedvarvning utan skärmar
- [ ] Andningsövning kväll 5 min

**Inspirationsförslag:**
Slumpmässigt valt måltidsförslag för frukost/lunch/middag baserat på databasen (nytt varje dag, men deterministic baserat på datum så det inte byter vid reload).

**Streak/vana-räknare:**
Antal dagar i rad med minst 8 av 12 checklistepunkter avbockade.

---

## Sida 2: Kost

### Syfte
Hitta måltidsinspiration och slå upp livsmedel.

### Undersidor/flikar (tabs inom sidan):

**Flik 1: Måltider**
- Fyra expanderbara sektioner: Frukost, Lunch, Middag, Mellanmål
- Varje måltid visar en lista med förslag
- Varje förslag har namn (fetstil) och kort beskrivning (varför det är bra)
- Stjärnmarkerade (⭐) förslag visas överst
- 🇯🇵-ikon på japanska alternativ
- Klickbar "Välj till idag"-knapp som lägger till i dagens logg (valfritt)

**Flik 2: Livsmedel**
- Sökbar/filtrerbar lista över alla livsmedel
- Grupperade per kategori med färgkodning (samma som i guiden)
- Varje kategori expanderbar med notering om rekommendation
- ★-markerade livsmedel visuellt framhävda
- 🇯🇵-markering på japanska alternativ
- Sökfält i toppen som filtrerar i realtid

**Flik 3: Undvik**
- Lista med livsmedel att begränsa/undvika
- Kort motivering per punkt
- Röd/orange färgkodning

---

## Sida 3: Träning

### Syfte
Visa dagens träningspass med övningsbeskrivningar och inbyggda timers.

### Innehåll

**Veckovy:**
Horisontellt scrollbar veckorad (mån-sön) som visar vilken typ av aktivitet det är. Markera dagens dag.

**Passvy (när man klickar på en dag med styrkepass):**
Lista med alla övningar i passet:
- Övningsnamn
- Upplägg (set × tid/reps)
- Kort kommentar
- **Timer-knapp** för isometriska övningar (väggsitta, plankor, handgrepp etc.)

**Timer-komponent:**
- Countdown-timer med visuell cirkel/ring
- Start/paus/reset
- Ljud-signal (diskret ping) när tiden är slut
- Vibrering om enhet stöder det
- Snabbval: 30s, 45s, 60s, 90s, 2min
- Automatisk vila-timer mellan set (konfigurerbar: default 2 min)

**Andningstimer (separat sektion eller tillgänglig från Idag-sidan):**
- Visuell andningsguide: cirkel som expanderar (andas in) och kontraherar (andas ut)
- Konfigurerbart mönster: default 4 sek in, 4 sek håll, 6 sek ut
- 5 minuters session som default
- Valfritt: fysiologisk suck-läge (dubbel inandning + lång utandning)

**Löpning/promenad-dagar:**
Enkel vy med mål (30-45 min löpning, 7000-10000 steg) och motiverande text.

---

## Sida 4: Mätning

### Syfte
Logga och följa hälsodata över tid.

### Undersidor/flikar:

**Flik 1: Daglig logg**
- Enkel inmatning av:
  - Garmin Stress Score (snitt för dagen, 0-100)
  - Garmin Body Battery vid uppvakning (0-100)
  - Steg (antal)
  - Sömn (timmar, t.ex. 7.5)
  - Vikt (valfritt, kg)
- Sparas per datum i localStorage
- Snabb input med +/- knappar eller slider

**Flik 2: Trender**
- Enkel linjegraf (eller sparkline) som visar de senaste 30 dagarna för:
  - Body Battery (mål: 70+)
  - Stressnivå (mål: under 50)
  - Steg (mål: 7000+)
  - Sömn (mål: 7-8h)
  - Vikt (om loggad)
- Använd recharts eller en enkel canvas-implementation
- Referenslinjer som visar målvärden

**Flik 3: Kroppsmätning**
- Logg för midjemått (cm) och längd (cm) med automatisk midje/höjd-kvot-beräkning
- Färgkodad indikator: grön (<0.50), gul (0.50-0.59), orange (0.60-0.69), röd (0.70+)
- Logg för blodtryck (systoliskt/diastoliskt)
- Logg för blodprover (fasteglukos, HbA1c, kolesterol etc.) – inmatning med datum
- Historik-vy

**Flik 4: Checklisthistorik**
- Kalendervy som visar vilka dagar checklistorna fylldes i
- Färgkodning: grön (8+ av 12), gul (5-7), röd (<5), grå (ej loggad)
- Streak-räknare

---

## Sida 5: Guide

### Syfte
Referensmaterial – hela kunskapsbasen tillgänglig.

### Innehåll
Den fullständiga guiden (markdown-filen) renderad i ett läsbart format, uppdelad i expanderbara sektioner:

1. Kost – Grundfilosofi & makrofördelning
2. Kost – Måltidsförslag (komplett lista)
3. Kost – Livsmedelslista (komplett)
4. Kost – Japanska varianten
5. Kost – Begränsa/undvik
6. Kost – Om frukt, ägg, potatis
7. Träning – Filosofi & veckoschema
8. Träning – Pass A, B, C (detaljerade)
9. Sömn – Protokoll
10. Stresshantering & HRV
11. Visceralt fett
12. Måltidstiming
13. Sammanfattande principer

Varje sektion expanderbar (accordion), sökbar.

---

## Datamodell (localStorage)

```javascript
// Daglig checklista
"checklist_2026-04-11": {
  morning_breathing: true,
  breakfast_fiber: true,
  legumes: false,
  fish: false,
  nuts: true,
  fruit: true,
  vegetables: false,
  steps_7000: true,
  training_done: true,
  last_meal_early: true,
  evening_winddown: false,
  evening_breathing: false
}

// Daglig hälsologg
"healthlog_2026-04-11": {
  body_battery: 78,
  stress_score: 42,
  steps: 8500,
  sleep_hours: 7.5,
  weight: null // valfritt
}

// Kroppsmätningar (array, sorterad på datum)
"body_measurements": [
  {
    date: "2026-04-11",
    waist_cm: 92,
    height_cm: 182,
    systolic: 138,
    diastolic: 88
  }
]

// Blodprover (array, sorterad på datum)
"blood_tests": [
  {
    date: "2026-04-11",
    fasting_glucose: 5.8,
    hba1c: 38,
    total_cholesterol: 6.2,
    ldl: 4.1,
    hdl: 1.3,
    triglycerides: 1.8,
    potassium: 3.5
  }
]

// Inställningar
"settings": {
  fish_days: ["tuesday", "thursday", "saturday"], // vilka dagar man planerar fisk
  breathing_pattern: { inhale: 4, hold: 4, exhale: 6 },
  step_goal: 8000,
  sleep_goal: 7.5
}

// Streak
// Beräknas dynamiskt baserat på checklist-data
```

---

## Design

### Övergripande stil
- **Mobil-first.** Designa för 375px bredd, skala upp.
- **Ren, lugn, hälsoinspirerad.** Inte "fitness-bro", inte klinisk – tänk "välmående naturlighet".
- **Mörk grön som primärfärg** (#2a4a3a) med varma accenter.
- **Off-white bakgrund** (#fafbf8) för huvudinnehåll.
- **Avrundade kort** med subtila skuggor för sektioner.
- **Tydlig typografi** – läsbar sans-serif (DM Sans eller liknande via Google Fonts).

### Färgpalett
```
Primary:        #2a4a3a (mörk grön)
Primary light:  #4a7c59 (grön)
Secondary:      #8a6e42 (varm brun)
Background:     #fafbf8 (off-white)
Surface:        #f0f4ee (ljusgrön tint)
Border:         #e0e6dc
Text primary:   #2c2c2c
Text secondary: #6a7a6a
Accent red:     #d94f3a (för "undvik" / varningar)
Accent blue:    #2a6478 (för mätdata)
Japanese:       #c45a3c (terrakotta, för 🇯🇵-markerade element)
```

### Komponentbibliotek
Bygg egna enkla komponenter (inte shadcn/MUI – håll det lätt):
- Card
- ExpandableSection (accordion)
- Checkbox
- ProgressRing (för timers)
- BottomNav
- TabBar
- NumberInput (med +/- knappar)
- SimpleLineChart
- Badge
- Modal/Sheet (för detaljer)

---

## Filstruktur

```
hjarthalsosam-app/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── manifest.json
│   ├── icons/
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── apple-touch-icon.png
│   └── robots.txt
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css                  (Tailwind base + custom CSS vars)
│   ├── data/
│   │   ├── meals.js               (måltidsförslag)
│   │   ├── foods.js               (livsmedelslista per kategori)
│   │   ├── avoid.js               (livsmedel att undvika)
│   │   ├── exercises.js           (träningspass A, B, C)
│   │   ├── schedule.js            (veckodagar → aktiviteter)
│   │   ├── checklist.js           (dagliga checklistepunkter)
│   │   └── guide-content.js       (guidetext per sektion)
│   ├── hooks/
│   │   ├── useLocalStorage.js     (generic localStorage hook)
│   │   ├── useChecklist.js        (daglig checklista-logik)
│   │   ├── useHealthLog.js        (hälsodata CRUD)
│   │   └── useStreak.js           (streak-beräkning)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BottomNav.jsx
│   │   │   └── PageHeader.jsx
│   │   ├── ui/
│   │   │   ├── Card.jsx
│   │   │   ├── ExpandableSection.jsx
│   │   │   ├── Checkbox.jsx
│   │   │   ├── ProgressRing.jsx
│   │   │   ├── NumberInput.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── TabBar.jsx
│   │   │   └── SimpleLineChart.jsx
│   │   ├── features/
│   │   │   ├── DailyChecklist.jsx
│   │   │   ├── MealSuggestion.jsx
│   │   │   ├── ExerciseTimer.jsx
│   │   │   ├── BreathingGuide.jsx
│   │   │   ├── FoodSearch.jsx
│   │   │   ├── StreakCounter.jsx
│   │   │   ├── WaistRatioCalc.jsx
│   │   │   └── TrendChart.jsx
│   │   └── pages/
│   │       ├── TodayPage.jsx
│   │       ├── FoodPage.jsx
│   │       ├── TrainingPage.jsx
│   │       ├── MeasurementPage.jsx
│   │       └── GuidePage.jsx
│   └── utils/
│       ├── dateUtils.js           (datumformatering, veckodag)
│       ├── streakCalc.js          (streak-logik)
│       └── constants.js           (färger, mål, gränsvärden)
```

---

## Prioriterad byggordning

Bygg i denna ordning för att ha en fungerande app så snart som möjligt:

### Fas 1: Grundskelett (MVP)
1. Vite + React + React Router setup
2. PWA-konfiguration (manifest, service worker, ikoner)
3. Bottom navigation + routing
4. Idag-sidan med daglig checklista (localStorage)
5. Kost-sidan med måltidsförslag (statisk data)
6. Grundläggande styling (Tailwind + färgpalett)

### Fas 2: Träning & Timers
7. Tränings-sidan med veckovy och passlistor
8. Isometrisk timer (countdown med visuell ring)
9. Andningstimer med visuell guide
10. Löpning/promenad-vy

### Fas 3: Mätning & Data
11. Daglig hälsologg (Body Battery, stress, steg, sömn)
12. Trendgrafer (recharts eller enkel canvas)
13. Kroppsmätning med midje/höjd-kvot
14. Blodprovslogg
15. Checklisthistorik med kalendervy

### Fas 4: Guide & Polish
16. Guide-sidan med expanderbara sektioner
17. Livsmedelssökning
18. Streak-räknare
19. Slumpmässiga dagliga måltidsförslag
20. Offline-testning, ikon-finslipning, deploy till GitHub Pages

---

## Prompt för Claude Code

Använd denna som startprompt i Claude Code:

```
Jag vill bygga en PWA-app med Vite + React som fungerar som en daglig 
guide för hjärthälsosam livsstil. Appen ska hostas på GitHub Pages.

Läs specifikationen i filen SPEC.md (den här filen) för komplett 
information om:
- Appstruktur och navigation (5 flikar)
- Varje sidas innehåll och funktionalitet
- Datamodell (localStorage)
- Design och färgpalett
- Filstruktur
- Byggordning (fas 1-4)

Börja med Fas 1: Grundskelett. Sätt upp Vite + React + React Router + 
Tailwind + vite-plugin-pwa, skapa navigationsstrukturen, och bygg 
Idag-sidan med daglig checklista som sparas i localStorage.

All text i appen ska vara på svenska.
```

---

## Anteckningar

- All data lagras lokalt i localStorage – ingen backend, ingen inloggning, ingen molnsynk.
- Om localStorage blir för begränsat i framtiden kan IndexedDB övervägas.
- Appen är 100% statisk och kan hostas gratis på GitHub Pages.
- Eventuell framtida feature: export av hälsodata som CSV/JSON för backup.
- Eventuell framtida feature: import av Garmin-data via CSV (Garmin Connect kan exportera).
