/*
 * DATELE SITE-ULUI / SITE DATA
 * =====================================================================
 * Toate cele 7 secțiuni de conținut (Destinații, Orașe, Natură, Turism
 * activ, Moștenire culturală, Știri, Afaceri) folosesc aceeași formă de
 * înregistrare, ca să poată fi afișate cu același motor generic
 * (js/listing.js + js/detail.js):
 *
 *   id          text unic, doar litere mici și cratime (folosit în URL)
 *   name        numele afișat
 *   category    { ro, en } — eticheta scurtă afișată ca insignă și folosită
 *               ca filtru (valorile diferă liber de la o secțiune la alta)
 *   area        zona/orașul (apare ca filtru) — text liber, ex. "Petroșani"
 *   coords      [latitudine, longitudine] — opțional, pentru hartă/Waze/Maps
 *   date        "AAAA-LL-ZZ" — opțional, folosit doar la Știri (sortare)
 *   hasReviews  true/false — arată sau nu blocul de recenzii pe pagina de detaliu
 *   images      listă de fișiere din folderul images/
 *   ro / en     { tagline, description: [...], facts: [{label, value}, ...] }
 *               facts = listă liberă de perechi etichetă/valoare, afișate
 *               într-un tabel pe pagina de detaliu (adresă, program, altitudine,
 *               populație, dificultate — ce are sens pentru intrarea respectivă)
 *
 * Momentan sunt doar EXEMPLE (example: true) — completăm împreună conținutul
 * real pe măsură ce alegem locurile, orașele și afacerile din tot județul.
 */

window.SITE_DESTINATIONS = [
  {
    id: "exemplu-valea-jiului",
    name: "Exemplu · Valea Jiului",
    category: { ro: "Zonă montană", en: "Mountain zone" },
    area: "Vest",
    example: true,
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "EXEMPLU de destinație/zonă. Șase orașe miniere, la poalele Parângului și Retezatului.",
      description: ["Aici va veni o prezentare a zonei: ce o definește, ce orașe/locuri cuprinde, de ce merită un weekend întreg."],
      facts: [{ label: "Orașe incluse", value: "De completat" }]
    },
    en: {
      tagline: "EXAMPLE destination/zone. Six mining towns, at the foot of the Parâng and Retezat mountains.",
      description: ["This will hold a presentation of the zone: what defines it, which towns/places it covers, why it deserves a whole weekend."],
      facts: [{ label: "Towns included", value: "To be filled in" }]
    }
  },
  {
    id: "exemplu-tara-hategului",
    name: "Exemplu · Țara Hațegului",
    category: { ro: "Zonă istorică", en: "Historic zone" },
    area: "Sud",
    example: true,
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "EXEMPLU de destinație. Cetăți dacice, parc dinozauri, sate tradiționale.",
      description: ["Descriere reală de completat împreună."],
      facts: [{ label: "Puncte de interes", value: "De completat" }]
    },
    en: {
      tagline: "EXAMPLE destination. Dacian fortresses, dinosaur geopark, traditional villages.",
      description: ["Real description to be filled in together."],
      facts: [{ label: "Points of interest", value: "To be filled in" }]
    }
  }
];

window.SITE_NATURE = [
  {
    id: "exemplu-cascada-valea-jiului",
    name: "Exemplu · Cascadă",
    category: { ro: "Cascadă", en: "Waterfall" },
    area: "Petroșani",
    coords: [45.4166, 23.3733],
    example: true,
    hasReviews: true,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Loc de tip EXEMPLU. Înlocuiește-l cu un obiectiv real din județ.",
      description: [
        "Acesta este un loc de probă, pus doar ca să vezi cum arată o pagină de detaliu. Șterge-l din js/data.js și adaugă obiectivele tale.",
        "Descrierea reală o scriem împreună după ce alegi locurile: istoric, ce se vede, cât stai, sfaturi practice."
      ],
      facts: [
        { label: "Adresă", value: "Petroșani, jud. Hunedoara" },
        { label: "Cel mai bun moment", value: "Primăvara și toamna, după ploi." }
      ]
    },
    en: {
      tagline: "This is an EXAMPLE place. Replace it with a real sight in the county.",
      description: [
        "This is a sample entry, here only to show how a detail page looks. Delete it from js/data.js and add your own sights.",
        "We'll write the real description together once you pick the places: history, what to see, how long to stay, practical tips."
      ],
      facts: [
        { label: "Address", value: "Petroșani, Hunedoara county" },
        { label: "Best time", value: "Spring and autumn, after rain." }
      ]
    }
  },
  {
    id: "exemplu-pestera",
    name: "Exemplu · Peșteră",
    category: { ro: "Peșteră", en: "Cave" },
    area: "Băița",
    coords: [46.0500, 22.7500],
    example: true,
    hasReviews: true,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "EXEMPLU de peșteră. Înlocuiește cu una reală, cu galerii vizitabile sau nu.",
      description: ["Aici va veni: lungime, dacă e amenajată pentru vizitare, ce se poate vedea, recomandări de echipament."],
      facts: [{ label: "Acces", value: "De completat" }]
    },
    en: {
      tagline: "EXAMPLE cave. Replace with a real one, whether open for visits or not.",
      description: ["This will hold: length, whether it's arranged for visits, what can be seen, equipment recommendations."],
      facts: [{ label: "Access", value: "To be filled in" }]
    }
  }
];

window.SITE_ACTIVITIES = [
  {
    id: "exemplu-traseu-parang",
    name: "Exemplu · Traseu montan",
    category: { ro: "Drumeție", en: "Hiking" },
    area: "Parâng",
    coords: [45.3430, 23.5190],
    example: true,
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "EXEMPLU de traseu de drumeție în masivul Parâng.",
      description: ["Înlocuiește cu un traseu real: marcaj, puncte de reper, ce se vede pe drum."],
      facts: [
        { label: "Dificultate", value: "Medie" },
        { label: "Durată", value: "De completat" },
        { label: "Cum ajungi", value: "Telescaunul din Petroșani urcă spre platoul Parâng." }
      ]
    },
    en: {
      tagline: "EXAMPLE hiking trail in the Parâng massif.",
      description: ["Replace with a real trail: markings, waypoints, what you see along the way."],
      facts: [
        { label: "Difficulty", value: "Medium" },
        { label: "Duration", value: "To be filled in" },
        { label: "Getting there", value: "The chairlift from Petroșani goes up towards the Parâng plateau." }
      ]
    }
  }
];

window.SITE_HERITAGE = [
  {
    id: "exemplu-patrimoniu-minier",
    name: "Exemplu · Patrimoniu minier",
    category: { ro: "Patrimoniu industrial", en: "Industrial heritage" },
    area: "Valea Jiului",
    example: true,
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "EXEMPLU de poveste despre istoria minieră a Văii Jiului.",
      description: [
        "Aici va veni povestea reală: începuturile mineritului, viața minerilor, ce a rămas astăzi din acest patrimoniu.",
        "O completăm împreună — poate cu fotografii de epocă și mărturii, dacă avem acces la ele."
      ],
      facts: [{ label: "Perioadă", value: "De completat" }]
    },
    en: {
      tagline: "EXAMPLE story about the mining history of Valea Jiului.",
      description: [
        "This will hold the real story: the beginnings of mining, miners' life, what remains today of this heritage.",
        "We'll write it together — perhaps with period photos and testimonies, if we have access to them."
      ],
      facts: [{ label: "Period", value: "To be filled in" }]
    }
  },
  {
    id: "exemplu-cetate-dacica",
    name: "Exemplu · Cetate dacică",
    category: { ro: "Monument istoric", en: "Historic monument" },
    area: "Orăștie",
    coords: [45.6122, 23.2761],
    example: true,
    hasReviews: true,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "EXEMPLU de cetate din zona Munților Orăștiei. Înlocuiește cu un obiectiv real.",
      description: ["Aici va veni istoricul locului, ce se poate vizita, program și taxă de acces, dacă e nevoie de ghid."],
      facts: [
        { label: "Zonă", value: "Munții Orăștiei" },
        { label: "Cum ajungi", value: "De completat — drum auto + traseu pietonal." }
      ]
    },
    en: {
      tagline: "EXAMPLE fortress in the Orăștie Mountains area. Replace with a real sight.",
      description: ["This will hold the site's history, what can be visited, opening hours and entry fee, whether a guide is needed."],
      facts: [
        { label: "Area", value: "Orăștie Mountains" },
        { label: "Getting there", value: "To be filled in — road access + walking trail." }
      ]
    }
  }
];

window.SITE_TOWNS = [
  {
    id: "exemplu-petrosani",
    name: "Exemplu · Petroșani",
    category: { ro: "Municipiu", en: "Municipality" },
    area: "Valea Jiului",
    coords: [45.4166, 23.3733],
    example: true,
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "EXEMPLU de pagină de oraș. Conținutul real îl scriem împreună.",
      description: ["Aici va veni prezentarea orașului: poziție, specific, ce merită vizitat, cum ajungi."],
      facts: [
        { label: "Populație", value: "De completat" },
        { label: "Altitudine", value: "De completat" },
        { label: "Prima atestare", value: "De completat" }
      ]
    },
    en: {
      tagline: "EXAMPLE town page. We'll write the real content together.",
      description: ["This will hold the town's overview: location, character, what's worth visiting, how to get there."],
      facts: [
        { label: "Population", value: "To be filled in" },
        { label: "Altitude", value: "To be filled in" },
        { label: "First mentioned", value: "To be filled in" }
      ]
    }
  }
];

window.SITE_NEWS = [
  {
    id: "exemplu-eveniment-local",
    name: "Exemplu · Anunț / eveniment local",
    category: { ro: "Eveniment", en: "Event" },
    area: "Deva",
    date: "2026-09-01",
    example: true,
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "EXEMPLU de știre. Înlocuiește cu un eveniment sau anunț real din județ.",
      description: ["Textul real al știrii vine aici — dată, locație, detalii practice pentru cine vrea să participe."],
      facts: [{ label: "Data", value: "1 septembrie 2026" }]
    },
    en: {
      tagline: "EXAMPLE news item. Replace with a real event or announcement from the county.",
      description: ["The real news text goes here — date, location, practical details for anyone who wants to attend."],
      facts: [{ label: "Date", value: "1 September 2026" }]
    }
  }
];

window.SITE_BUSINESSES = [
  {
    id: "exemplu-restaurant-local",
    name: "Exemplu · Restaurant local",
    category: { ro: "Restaurant", en: "Restaurant" },
    area: "Petrila",
    coords: [45.4530, 23.4160],
    example: true,
    hasReviews: true,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "EXEMPLU de local. Pune un restaurant / bistro real.",
      description: ["Aici vor veni: tipul bucătăriei, specialități, interval de preț, dacă e nevoie de rezervare."],
      facts: [
        { label: "Adresă", value: "Petrila, centru" },
        { label: "Program", value: "12:00–23:00" },
        { label: "Website", value: "De completat" }
      ]
    },
    en: {
      tagline: "EXAMPLE eatery. Add a real restaurant / bistro.",
      description: ["This will hold: type of cuisine, signature dishes, price range, whether booking is needed."],
      facts: [
        { label: "Address", value: "Petrila, town centre" },
        { label: "Hours", value: "12:00–23:00" },
        { label: "Website", value: "To be filled in" }
      ]
    }
  },
  {
    id: "exemplu-pensiune",
    name: "Exemplu · Pensiune",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Lupeni",
    coords: [45.3590, 23.2400],
    example: true,
    hasReviews: true,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "EXEMPLU de pensiune. Înlocuiește cu una reală.",
      description: ["De completat: număr de camere, facilități, preț orientativ/noapte, dacă acceptă animale, parcare."],
      facts: [
        { label: "Adresă", value: "Lupeni" },
        { label: "Telefon", value: "De completat" }
      ]
    },
    en: {
      tagline: "EXAMPLE guesthouse. Replace with a real one.",
      description: ["To be filled in: number of rooms, facilities, indicative price/night, pets, parking."],
      facts: [
        { label: "Address", value: "Lupeni" },
        { label: "Phone", value: "To be filled in" }
      ]
    }
  }
];
