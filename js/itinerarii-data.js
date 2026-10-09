/*
 * ITINERARII / ITINERARIES
 * =====================================================================
 * Fiecare itinerariu este alcătuit EXCLUSIV din intrări deja existente în js/data.js,
 * referite prin cheia secțiunii (k) și id. Nimic nu e duplicat aici: numele, descrierea
 * scurtă, categoria, durata/lungimea (faptele „Durată” / „Lungime”) și linkul fiecărei opriri
 * vin din intrarea referită, în limba paginii (scripts/build-pages.mjs).
 *
 *   id          folosit în URL: /itinerarii/<id>/ (și /en/itinerarii/<id>/)
 *   name        { ro, en }
 *   ro / en     { tagline, intro: [paragrafe] }
 *   days        listă de zile; fiecare zi: { title: {ro, en}, stops: [{ k, id, optional?, note?: {ro, en} }] }
 *   eat         opțional: intrări din Afaceri (cazare / mese) potrivite pentru itinerariu
 *   mountain    true -> afișează avertismentul pentru drumeții montane (Salvamont)
 *
 * Distanțele între opriri nu sunt trecute: nu există în datele site-ului (nu le inventăm).
 * Textele sunt ale site-ului; scripts/build-pages.mjs oprește build-ul dacă un id nu există.
 */
window.SITE_ITINERARIES = [
  {
    id: "weekend-in-valea-jiului",
    name: { ro: "Weekend în Valea Jiului", en: "A weekend in the Jiu Valley" },
    ro: {
      tagline: "Patrimoniu minier, o pădure care își schimbă culorile și un traseu tematic printre tuneluri — două zile în orașele de la poalele Parângului.",
      intro: [
        "Valea Jiului se vede cel mai bine prin trecutul ei minier. Prima zi leagă muzeul de la Petroșani de fosta mină din Petrila și de peisajele de lângă ea; a doua zi iese în natură, pe un traseu ușor lângă Vulcan, sau, iarna, la schi."
      ]
    },
    en: {
      tagline: "Mining heritage, a forest that changes colour and a themed trail through tunnels — two days in the towns at the foot of the Parâng mountains.",
      intro: [
        "The Jiu Valley is best understood through its mining past. Day one links the museum in Petroșani with the former mine in Petrila and the scenery nearby; day two heads outdoors, on an easy trail near Vulcan or, in winter, to the ski slopes."
      ]
    },
    days: [
      {
        title: { ro: "Ziua 1 — Minerit și peșteri", en: "Day 1 — Mining and caves" },
        stops: [
          { k: "SITE_HERITAGE", id: "muzeul-mineritului-petrosani" },
          { k: "SITE_HERITAGE", id: "mina-petrila" },
          { k: "SITE_NATURE", id: "padurea-bicolora-petrila", optional: true,
            note: { ro: "Cea mai frumoasă toamna, cât fagul se colorează (vezi pagina obiectivului).", en: "Best in autumn, while the beech trees change colour (see the place's page)." } },
          { k: "SITE_NATURE", id: "pestera-bolii", optional: true }
        ]
      },
      {
        title: { ro: "Ziua 2 — Aer liber", en: "Day 2 — Outdoors" },
        stops: [
          { k: "SITE_ACTIVITIES", id: "traseul-tunelelor-vulcan" },
          { k: "SITE_ACTIVITIES", id: "statiunea-straja", optional: true,
            note: { ro: "Iarna: schi, pe pârtiile de la Straja.", en: "In winter: skiing on the Straja slopes." } },
          { k: "SITE_ACTIVITIES", id: "partiile-parang", optional: true,
            note: { ro: "Iarna: alternativă pentru schi, la Parâng.", en: "In winter: an alternative for skiing, at Parâng." } }
        ]
      }
    ],
    eat: ["hotel-petrosani", "atrium-hotel-vulcan", "complex-keops-petrosani"],
    mountain: true
  },
  {
    id: "o-zi-la-hunedoara-deva",
    name: { ro: "O zi la Hunedoara–Deva", en: "A day in Hunedoara and Deva" },
    ro: {
      tagline: "Castelul Corvinilor dimineața, muzeul, parcul și cetatea Devei după-amiază — cele două orașe ale Culoarului Mureșului într-o singură zi.",
      intro: [
        "Cele două orașe sunt la mică distanță unul de altul, deci se pot vedea într-o zi lungă: dimineața castelul de la Hunedoara, apoi Deva, cu muzeul din centru și parcul de la poalele cetății."
      ]
    },
    en: {
      tagline: "Corvin Castle in the morning, the museum, the park and the citadel of Deva in the afternoon — the two towns of the Mureș Corridor in a single day.",
      intro: [
        "The two towns are not far from each other, so they fit in one long day: Hunedoara's castle in the morning, then Deva, with the museum in the centre and the park at the foot of the citadel."
      ]
    },
    days: [
      {
        title: { ro: "Dimineața — Hunedoara", en: "Morning — Hunedoara" },
        stops: [
          { k: "SITE_HERITAGE", id: "castelul-corvinilor",
            note: { ro: "Verifică programul de vizitare pe pagina obiectivului: se schimbă de la un sezon la altul.", en: "Check the opening hours on the place's page: they change from one season to the next." } },
          { k: "SITE_HERITAGE", id: "furnalul-govajdia", optional: true }
        ]
      },
      {
        title: { ro: "După-amiaza — Deva", en: "Afternoon — Deva" },
        stops: [
          { k: "SITE_HERITAGE", id: "muzeul-civilizatiei-dacice-si-romane-deva" },
          { k: "SITE_ACTIVITIES", id: "parcul-cetatii-deva",
            note: { ro: "Verifică pe pagina obiectivului dacă telecabina funcționează; altfel se urcă pe poteci sau cu minibuzul electric.", en: "Check the place's page to see whether the cable car is running; otherwise you can walk up or take the electric minibus." } },
          { k: "SITE_HERITAGE", id: "aleea-gimnastelor", optional: true }
        ]
      }
    ],
    eat: ["curtea-veche-hunedoara", "cocosul-de-aur-deva", "casa-rustica-deva"],
    mountain: false
  },
  {
    id: "pe-urmele-dacilor",
    name: { ro: "Pe urmele dacilor", en: "In the footsteps of the Dacians" },
    ro: {
      tagline: "De la cetățile din Munții Orăștiei la termele romane de la Geoagiu-Băi și capitala Daciei romane — două zile prin istoria veche a județului.",
      intro: [
        "Itinerariul pornește din Orăștie, poarta zonei cetăților dacice, urcă la Sarmizegetusa Regia și coboară a doua zi spre perioada romană: Geoagiu-Băi, Deva și Ulpia Traiana Sarmizegetusa."
      ]
    },
    en: {
      tagline: "From the fortresses of the Orăștie Mountains to the Roman baths of Geoagiu-Băi and the capital of Roman Dacia — two days through the county's ancient history.",
      intro: [
        "The route starts in Orăștie, the gateway to the Dacian fortresses, climbs to Sarmizegetusa Regia and on the second day moves on to the Roman period: Geoagiu-Băi, Deva and Ulpia Traiana Sarmizegetusa."
      ]
    },
    days: [
      {
        title: { ro: "Ziua 1 — Cetățile dacice", en: "Day 1 — The Dacian fortresses" },
        stops: [
          { k: "SITE_DESTINATIONS", id: "cetatile-dacice" },
          { k: "SITE_HERITAGE", id: "cetatea-medievala-orastie", optional: true },
          { k: "SITE_HERITAGE", id: "sarmizegetusa-regia" },
          { k: "SITE_ACTIVITIES", id: "traseu-cetatea-fetele-albe", optional: true }
        ]
      },
      {
        title: { ro: "Ziua 2 — Epoca romană", en: "Day 2 — The Roman period" },
        stops: [
          { k: "SITE_HERITAGE", id: "termele-romane-germisara" },
          { k: "SITE_HERITAGE", id: "muzeul-civilizatiei-dacice-si-romane-deva" },
          { k: "SITE_HERITAGE", id: "ulpia-traiana-sarmizegetusa" }
        ]
      }
    ],
    eat: ["pensiunea-jorja-orastie", "bistro-merinde-orastie", "pensiunea-sarmis-sarmizegetusa"],
    mountain: false
  },
  {
    id: "retezat-in-2-zile",
    name: { ro: "Retezat în 2 zile", en: "Retezat in 2 days" },
    ro: {
      tagline: "Lacul Bucura și Vârful Peleaga într-o zi, creasta spre Șaua Pelegii în cealaltă — primul contact cu cel mai vechi parc național din România.",
      intro: [
        "Itinerariul folosește traseele deja descrise pe site, cu punct de plecare la Cabana Pietrele. Durata fiecărui traseu apare mai jos acolo unde o cunoaștem; planifică ziua după ea, nu după titlu."
      ]
    },
    en: {
      tagline: "Lake Bucura and Peleaga Peak on one day, the ridge to Peleaga Saddle on the other — a first taste of Romania's oldest national park.",
      intro: [
        "The route uses trails already described on the site, starting from Pietrele Hut. Where we know a trail's duration it is shown below; plan the day by that, not by the title."
      ]
    },
    days: [
      {
        title: { ro: "Ziua 1 — Lacul Bucura și Peleaga", en: "Day 1 — Lake Bucura and Peleaga" },
        stops: [
          { k: "SITE_NATURE", id: "parcul-national-retezat" },
          { k: "SITE_ACTIVITIES", id: "traseu-pietrele-bucura-peleaga" },
          { k: "SITE_ACTIVITIES", id: "traseu-gura-zlata-lacul-bucura", optional: true,
            note: { ro: "Alternativă: accesul dinspre vest spre Lacul Bucura.", en: "Alternative: the western approach to Lake Bucura." } }
        ]
      },
      {
        title: { ro: "Ziua 2 — Creasta spre Șaua Pelegii", en: "Day 2 — The ridge to Peleaga Saddle" },
        stops: [
          { k: "SITE_ACTIVITIES", id: "traseu-pietrele-saua-pelegii" },
          { k: "SITE_ACTIVITIES", id: "traseu-lacul-gales-saua-pelegii", optional: true,
            note: { ro: "Legătură spre valea Râușorului, pentru coborâre pe alt versant.", en: "A link to the Râușor valley, for coming down on a different side." } }
        ]
      }
    ],
    eat: ["pensiunea-retezat-petrosani", "pensiunea-avy-hateg"],
    mountain: true
  }
];
