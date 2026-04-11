import PageHeader from '../layout/PageHeader.jsx'
import ExpandableSection from '../ui/ExpandableSection.jsx'

const GUIDE_SECTIONS = [
  {
    title: '🥗 Kost – Grundfilosofi & makrofördelning',
    content: `Fokus på växtbaserat, minimalt bearbetat och anti-inflammatoriskt.

**Makrofördelning (ungefär):**
- Kolhydrater: 40–45% (fullkorn, baljväxter, grönsaker)
- Protein: 20–25% (fisk, baljväxter, ägg, magert kött)
- Fett: 30–35% (olivolja, nötter, avokado, fet fisk)

**Nyckeln är matkvalitet, inte kaloriräkning.**

Prioritera:
1. Baljväxter varje dag (linser, kikärter, bönor)
2. Fet fisk 2–3 gånger per vecka
3. Extra virgin olivolja som primärt matfett
4. Nötter och frön dagligen (20–30g)
5. 500g+ grönsaker varje dag
6. Fullkorn istället för raffinerade`,
  },
  {
    title: '🍽️ Kost – Japanska varianten',
    content: `Den japanska kosten är en av världens hjärthälsosammaste.

**Principer:**
- Hara hachi bu: ät tills du är 80% mätt
- Misosoppa dagligen (probiotika, umami)
- Tofu och edamame som proteinbasens
- Fisk snarare än kött
- Fermenterade grönsaker (pickles, kimchi)
- Grönt te (EGCG – kraftfull antioxidant)

**Japanska livsmedel att prioritera:**
Natto, miso, tofu, edamame, wakame, soba, daikon, pak choi`,
  },
  {
    title: '🚫 Kost – Begränsa & undvik',
    content: `**Undvik alltid:**
- Transfetter (margarin, industriellt bakade varor)
- Sockrade drycker (läsk, juice)
- Raffinerade kolhydrater (vitt bröd, vitt ris)

**Begränsa kraftigt:**
- Processat rött kött (korv, salami, bacon)
- Salt > 5g/dag
- Alkohol
- Socker och godis

**OK i måttlighet (3–4 gånger/vecka):**
- Ägg (4–6/vecka)
- Rött kött (ograverat, max 2 gånger/vecka)
- Mejeriprodukter (välj fermenterade)`,
  },
  {
    title: '💪 Träning – Filosofi & veckoschema',
    content: `**Tre pelare:**
1. Styrketräning 3 gånger/vecka (Pass A, B, C)
2. Konditionsträning 2 gånger/vecka (låg puls)
3. Daglig rörelse (7000–10000 steg)

**Veckoschema:**
- Måndag: Pass A (underkropp + isometriskt)
- Tisdag: Lugn löpning 30–45 min
- Onsdag: Pass B (överkropp + isometriskt)
- Torsdag: Vila + promenad
- Fredag: Pass C (helkropp isometriskt)
- Lördag: Lugn löpning 30–45 min
- Söndag: Vila + längre promenad

**Isometrisk träning** (wall sit, plankor, handgrepp) sänker blodtrycket mer effektivt än konventionell träning.`,
  },
  {
    title: '😴 Sömn – Protokoll',
    content: `Sömn är fundamentalt för hjärthälsa och HRV.

**Mål:** 7–8 timmars sömn per natt

**Kvällsprotokoll:**
1. Sista måltid 3–5h före sänggående
2. Skärmfri tid 60 min före sömn
3. Nedvarvning: läsning, stretching, meditation
4. Andningsövning 5 min (4s in, 4s håll, 6s ut)
5. Rumstemperatur 16–19°C
6. Mörkt rum

**Body Battery (Garmin):**
- Vakna med 70+: bra återhämtning
- Under 50: vila mer, minska träningsintensitet`,
  },
  {
    title: '🧘 Stresshantering & HRV',
    content: `HRV (hjärtrytmvariabilitet) är det bästa måttet på stressrecovery.

**Mål:** Garmin Stress Score under 50 i snitt

**Dagliga verktyg:**
1. Andningsövning 2 gånger/dag (5 min vardera)
   - 4s in – 4s håll – 6s ut (aktiverar vagusnerven)
2. Promenad i naturen
3. Sociala kontakter
4. Gratitude practice

**Fysiologisk suck:**
Dubbel inandning + lång utandning. Snabbast kända sättet att minska akut stress.

**Undvik:**
- Koffein efter 14:00
- Alkohol
- Skärmar före sömn`,
  },
  {
    title: '📏 Visceralt fett & midjemått',
    content: `Visceralt fett (runt organen) är den mest hjärtriskfyllda fetttypen.

**Midje/höjd-kvot (bättre än BMI):**
- Under 0.50: låg risk (mål)
- 0.50–0.59: acceptabelt
- 0.60–0.69: förhöjd risk
- 0.70+: hög risk

**Mät så här:**
Midjan = halvvägs mellan sista revbenet och höftbenet, andas ut normalt.

**Att minska visceralt fett:**
1. Kostförändringar (viktigast)
2. Styrketräning
3. HIIT/kondition
4. Stressreduktion (kortisol lagrar visceralt fett)
5. Förbättrad sömn`,
  },
  {
    title: '⏰ Måltidstiming',
    content: `**Fasta och tidsbegränsat ätande:**
- Ätfönster: 10–12 timmar (t.ex. 08:00–19:00)
- Sista måltid 3–5h före sänggående
- Frukost inom 1–2h efter uppvakning

**Varför timing spelar roll:**
Cirkadisk rytm styr insulinkänslighet och ämnesomsättning. Att äta sent på kvällen förhöjer blodsocker och triglyserider.

**Praktiskt:**
- Frukost 07:00–08:00
- Lunch 12:00–13:00
- Middag 17:00–18:30
- Inget ätande efter 19:00`,
  },
  {
    title: '📋 Sammanfattande principer',
    content: `**De 10 viktigaste sakerna:**

1. **Baljväxter dagligen** – starkaste enskilda kostrådet
2. **Fet fisk 2–3×/vecka** – omega-3 är kritiskt
3. **500g+ grönsaker/dag** – variera färgerna
4. **Nötter dagligen** – framför allt valnötter
5. **Olivolja som primärt fett** – extra virgin
6. **Isometrisk träning** – sänker blodtrycket mest
7. **7000+ steg dagligen** – den lägsta effektiva dosen
8. **7–8h sömn** – fundamentalt, ej förhandlingsbart
9. **Andningsövningar 2×/dag** – aktiverar vagusnerven
10. **Eliminera socker och processat** – den snabbaste förbättringen

**Mätning:**
- Garmin Body Battery: mål 70+ vid uppvakning
- Garmin Stress Score: mål under 50
- Midje/höjd-kvot: mål under 0.50
- Blodtryck: mål under 130/85`,
  },
]

export default function GuidePage() {
  return (
    <div>
      <PageHeader title="Guide" subtitle="Referensinformation" />
      <div className="p-4 space-y-3">
        {GUIDE_SECTIONS.map((section) => (
          <ExpandableSection key={section.title} title={section.title}>
            <div className="pt-3">
              <div className="text-sm text-text-primary leading-relaxed whitespace-pre-line">
                {section.content.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return (
                      <p key={i} className="font-semibold text-text-primary mt-2 mb-1">
                        {line.replace(/\*\*/g, '')}
                      </p>
                    )
                  }
                  if (line.match(/^\*\*.*\*\*/)) {
                    return (
                      <p key={i} className="mb-0.5">
                        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                          part.startsWith('**') ? (
                            <strong key={j}>{part.replace(/\*\*/g, '')}</strong>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    )
                  }
                  if (line.startsWith('- ') || line.match(/^\d+\. /)) {
                    return (
                      <p key={i} className="mb-0.5 pl-2">
                        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                          part.startsWith('**') ? (
                            <strong key={j}>{part.replace(/\*\*/g, '')}</strong>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    )
                  }
                  if (line === '') return <br key={i} />
                  return (
                    <p key={i} className="mb-1">
                      {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                        part.startsWith('**') ? (
                          <strong key={j}>{part.replace(/\*\*/g, '')}</strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  )
                })}
              </div>
            </div>
          </ExpandableSection>
        ))}
      </div>
    </div>
  )
}
