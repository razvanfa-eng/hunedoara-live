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
    id: "valea-jiului",
    name: "Valea Jiului",
    category: { ro: "Zonă montană și minieră", en: "Mining & mountain zone" },
    area: "Sud-Vest",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Bazinul carbonifer al Văii Jiului — șase orașe miniere la poalele Parângului, Retezatului și Vâlcanului.",
      description: [
        "Valea Jiului cuprinde șase localități urbane — Petroșani, Petrila, Vulcan, Lupeni, Uricani și Aninoasa — construite în jurul exploatării cărbunelui, într-o vale înconjurată de trei masive muntoase.",
        "Astăzi zona combină patrimoniul industrial (mine, muzee, foste colonii muncitorești) cu accesul direct spre trasee montane și stațiunea Parâng, la câțiva kilometri de Petroșani."
      ],
      facts: [
        { label: "Orașe incluse", value: "Petroșani, Petrila, Vulcan, Lupeni, Uricani, Aninoasa" },
        { label: "Munți din apropiere", value: "Parâng, Retezat, Vâlcan" }
      ]
    },
    en: {
      tagline: "The Jiu Valley coal basin — six mining towns at the foot of the Parâng, Retezat and Vâlcan massifs.",
      description: [
        "Valea Jiului comprises six towns — Petroșani, Petrila, Vulcan, Lupeni, Uricani and Aninoasa — built around coal mining, in a valley surrounded by three mountain massifs.",
        "Today the area combines industrial heritage (mines, museums, former workers' colonies) with direct access to mountain trails and the Parâng resort, a few kilometres from Petroșani."
      ],
      facts: [
        { label: "Towns included", value: "Petroșani, Petrila, Vulcan, Lupeni, Uricani, Aninoasa" },
        { label: "Nearby mountains", value: "Parâng, Retezat, Vâlcan" }
      ]
    }
  },
  {
    id: "tara-hategului",
    name: "Țara Hațegului",
    category: { ro: "Zonă naturală și istorică", en: "Natural & historic zone" },
    area: "Sud",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Ținutul dinozaurilor pitici, al bisericilor de piatră și al celui mai vechi parc național din România.",
      description: [
        "Țara Hațegului este depresiunea din sud-vestul județului, cunoscută în lumea științifică pentru fosilele de dinozauri pitici descoperite aici — astăzi protejată ca Geoparcul UNESCO Țara Hațegului (parte a rețelei globale din 2005, Geoparc UNESCO din 2015).",
        "Tot aici se află Parcul Național Retezat, înființat în 1935 — cel mai vechi parc național din România — și sate cu biserici medievale de piatră, printre care biserica din Densuș, una dintre cele mai vechi biserici de piatră aflate încă în uz din țară."
      ],
      facts: [
        { label: "Puncte de interes", value: "Parcul Național Retezat, Geoparcul Țara Hațegului, biserica din Densuș" },
        { label: "Oraș principal", value: "Hațeg" }
      ]
    },
    en: {
      tagline: "The land of dwarf dinosaurs, stone churches and Romania's oldest national park.",
      description: [
        "Țara Hațegului is the depression in the county's south-west, known worldwide for the dwarf dinosaur fossils discovered here — today protected as the Hațeg Country UNESCO Global Geopark (part of the global network since 2005, UNESCO Global Geopark since 2015).",
        "It is also home to Retezat National Park, established in 1935 — Romania's oldest national park — and villages with medieval stone churches, including the Densuș church, one of the oldest stone churches in the country still in use."
      ],
      facts: [
        { label: "Points of interest", value: "Retezat National Park, Hațeg Country Geopark, Densuș church" },
        { label: "Main town", value: "Hațeg" }
      ]
    }
  },
  {
    id: "cetatile-dacice",
    name: "Zona Cetăților Dacice",
    category: { ro: "Zonă istorică", en: "Historic zone" },
    area: "Nord",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Munții Orăștiei — nucleul fortificat al Regatului Dac, patrimoniu UNESCO din 1999.",
      description: [
        "În Munții Orăștiei se află cinci dintre cele șase cetăți dacice incluse pe lista patrimoniului mondial UNESCO (a șasea, Căpâlna, e în județul Alba): Sarmizegetusa Regia — capitala regatului lui Decebal —, Costești-Cetățuie, Costești-Blidaru, Piatra Roșie și Bănița.",
        "Zona se vizitează dinspre Orăștie, poarta de acces spre traseele care urcă la ruinele fortificațiilor, construite în celebra tehnică a \"murus dacicus\"."
      ],
      facts: [
        { label: "Cetăți în județ", value: "Sarmizegetusa Regia, Costești-Cetățuie, Costești-Blidaru, Piatra Roșie, Bănița" },
        { label: "Statut", value: "Patrimoniu mondial UNESCO din 1999" },
        { label: "Oraș principal", value: "Orăștie" }
      ]
    },
    en: {
      tagline: "The Orăștie Mountains — the fortified core of the Dacian Kingdom, UNESCO heritage since 1999.",
      description: [
        "The Orăștie Mountains hold five of the six Dacian fortresses on the UNESCO World Heritage list (the sixth, Căpâlna, is in Alba county): Sarmizegetusa Regia — the capital of Decebalus's kingdom —, Costești-Cetățuie, Costești-Blidaru, Piatra Roșie and Bănița.",
        "The area is visited from Orăștie, the gateway town to the trails leading up to the fortress ruins, built in the famous \"murus dacicus\" technique."
      ],
      facts: [
        { label: "Fortresses in the county", value: "Sarmizegetusa Regia, Costești-Cetățuie, Costești-Blidaru, Piatra Roșie, Bănița" },
        { label: "Status", value: "UNESCO World Heritage since 1999" },
        { label: "Main town", value: "Orăștie" }
      ]
    }
  },
  {
    id: "culoarul-muresului",
    name: "Culoarul Mureșului",
    category: { ro: "Zonă mixtă", en: "Mixed zone" },
    area: "Centru",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Coridorul Deva–Simeria–Orăștie, de-a lungul Mureșului — orașe, cetăți și cel mai vechi parc dendrologic din România.",
      description: [
        "Culoarul Mureșului leagă principalele orașe ale județului și adăpostește Parcul Dendrologic de la Simeria, deschis la mijlocul secolului al XVIII-lea — cel mai vechi și una dintre cele mai bogate colecții dendrologice din România, cu peste 2.100 de specii și forme de arbori și arbuști.",
        "Zona e un bun punct de plecare pentru restul județului, fiind traversată de principalele căi rutiere și feroviare."
      ],
      facts: [
        { label: "Reper", value: "Parcul Dendrologic Simeria (cca. 70 ha, peste 2.100 de taxoni)" },
        { label: "Orașe incluse", value: "Deva, Simeria, Orăștie" }
      ]
    },
    en: {
      tagline: "The Deva–Simeria–Orăștie corridor along the Mureș river — towns, fortresses and Romania's oldest dendrological park.",
      description: [
        "The Mureș corridor links the county's main towns and is home to the Simeria Dendrological Park, opened in the mid-18th century — the oldest and one of the richest dendrological collections in Romania, with over 2,100 tree and shrub taxa.",
        "The area is a good starting point for the rest of the county, crossed by the main road and rail routes."
      ],
      facts: [
        { label: "Landmark", value: "Simeria Dendrological Park (approx. 70 ha, over 2,100 taxa)" },
        { label: "Towns included", value: "Deva, Simeria, Orăștie" }
      ]
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
    id: "deva",
    name: "Deva",
    category: { ro: "Municipiu", en: "Municipality" },
    area: "Culoarul Mureșului",
    coords: [45.8781, 22.9144],
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Reședința județului Hunedoara, dominată de Cetatea Deva, pe un deal vulcanic în mijlocul orașului.",
      description: [
        "Deva este centrul administrativ al județului, așezat pe Mureș. Simbolul orașului este Cetatea Deva, ruine medievale aflate pe un deal vulcanic chiar în centrul orașului, accesibile pe jos sau cu o telecabină funcțională din 2003.",
        "În centrul istoric se află Magna Curia (Palatul Bethlen, 1621), care găzduiește azi Muzeul Civilizației Dacice și Romane. Deva e cunoscută și ca centru național al gimnasticii românești."
      ],
      facts: [
        { label: "Populație", value: "53.113 locuitori (recensământ 2021)" },
        { label: "Reper", value: "Cetatea Deva, cu telecabină (din 2003)" },
        { label: "Muzeu", value: "Magna Curia — Muzeul Civilizației Dacice și Romane" }
      ]
    },
    en: {
      tagline: "The seat of Hunedoara county, overlooked by Deva Citadel on a volcanic hill right in the city centre.",
      description: [
        "Deva is the county's administrative centre, on the Mureș river. The city's landmark is Deva Citadel, medieval ruins on a volcanic hill in the middle of town, reachable on foot or by a cable car running since 2003.",
        "The old centre holds Magna Curia (Bethlen Castle, 1621), now home to the Museum of Dacian and Roman Civilisation. Deva is also known as a national centre for Romanian gymnastics."
      ],
      facts: [
        { label: "Population", value: "53,113 (2021 census)" },
        { label: "Landmark", value: "Deva Citadel, with cable car (since 2003)" },
        { label: "Museum", value: "Magna Curia — Museum of Dacian and Roman Civilisation" }
      ]
    }
  },
  {
    id: "hunedoara",
    name: "Hunedoara",
    category: { ro: "Municipiu", en: "Municipality" },
    area: "Culoarul Mureșului",
    coords: [45.7697, 22.9203],
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Orașul Castelului Corvinilor, unul dintre cele mai mari castele medievale din Europa.",
      description: [
        "Hunedoara a fost multă vreme un important centru siderurgic, dar rămâne cunoscută în primul rând pentru Castelul Corvinilor (Castelul Huniazilor), ridicat în secolul al XV-lea de Iancu de Hunedoara — unul dintre cele mai mari castele gotico-renascentiste din Europa și unul dintre cele „7 minuni ale României”.",
        "Castelul, cu Sala Cavalerilor, Sala Dietei și turnurile sale, se vizitează pe tot parcursul anului și este iluminat seara."
      ],
      facts: [
        { label: "Populație", value: "50.457 locuitori (recensământ 2021)" },
        { label: "Reper", value: "Castelul Corvinilor (secolul XV)" }
      ]
    },
    en: {
      tagline: "Home to Corvin Castle, one of Europe's largest medieval castles.",
      description: [
        "Hunedoara was long an important steel-industry centre, but is best known for Corvin Castle (Hunyadi Castle), built in the 15th century by John Hunyadi — one of the largest Gothic-Renaissance castles in Europe and one of the \"7 Wonders of Romania\".",
        "The castle, with its Knights' Hall, Diet Hall and towers, can be visited year-round and is lit up in the evening."
      ],
      facts: [
        { label: "Population", value: "50,457 (2021 census)" },
        { label: "Landmark", value: "Corvin Castle (15th century)" }
      ]
    }
  },
  {
    id: "petrosani",
    name: "Petroșani",
    category: { ro: "Municipiu", en: "Municipality" },
    area: "Valea Jiului",
    coords: [45.4166, 23.3733],
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Orașul universitar al Văii Jiului și poarta spre platoul Parâng.",
      description: [
        "Petroșani este orașul principal al Văii Jiului, centru al bazinului carbonifer și sediul Universității din Petroșani — continuatoarea Institutului de Mine, care funcționează aici din 1948.",
        "Din oraș pornește telescaunul care urcă spre platoul Parâng, una dintre cele mai apropiate zone de schi și drumeție din județ."
      ],
      facts: [
        { label: "Populație", value: "31.044 locuitori (recensământ 2021)" },
        { label: "Reper", value: "Universitatea din Petroșani (din 1948, fost Institut de Mine)" },
        { label: "Poartă spre", value: "Platoul Parâng (telescaun)" }
      ]
    },
    en: {
      tagline: "The university town of Valea Jiului and the gateway to the Parâng plateau.",
      description: [
        "Petroșani is the main town of Valea Jiului, the centre of the coal basin and home to the University of Petroșani — successor of the Mining Institute, operating here since 1948.",
        "A chairlift from the town goes up to the Parâng plateau, one of the county's closest ski and hiking areas."
      ],
      facts: [
        { label: "Population", value: "31,044 (2021 census)" },
        { label: "Landmark", value: "University of Petroșani (since 1948, formerly the Mining Institute)" },
        { label: "Gateway to", value: "Parâng plateau (chairlift)" }
      ]
    }
  },
  {
    id: "orastie",
    name: "Orăștie",
    category: { ro: "Municipiu", en: "Municipality" },
    area: "Zona cetăților dacice",
    coords: [45.8500, 23.2000],
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Poarta de acces spre Cetățile dacice din Munții Orăștiei, patrimoniu UNESCO.",
      description: [
        "Orăștie este orașul de la poalele Munților Orăștiei, cel mai apropiat punct de plecare spre cetățile dacice — printre care Sarmizegetusa Regia, capitala regatului lui Decebal — incluse pe lista patrimoniului mondial UNESCO din 1999."
      ],
      facts: [
        { label: "Populație", value: "16.825 locuitori (recensământ 2021)" },
        { label: "Reper", value: "Poartă spre cetățile dacice (UNESCO)" }
      ]
    },
    en: {
      tagline: "The gateway to the Dacian Fortresses of the Orăștie Mountains, a UNESCO World Heritage site.",
      description: [
        "Orăștie sits at the foot of the Orăștie Mountains, the closest starting point for the Dacian fortresses — including Sarmizegetusa Regia, the capital of Decebalus's kingdom — listed as UNESCO World Heritage since 1999."
      ],
      facts: [
        { label: "Population", value: "16,825 (2021 census)" },
        { label: "Landmark", value: "Gateway to the Dacian fortresses (UNESCO)" }
      ]
    }
  },
  {
    id: "hateg",
    name: "Hațeg",
    category: { ro: "Oraș", en: "Town" },
    area: "Țara Hațegului",
    coords: [45.6075, 22.9500],
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Poarta spre Parcul Național Retezat și Geoparcul Dinozaurilor din Țara Hațegului.",
      description: [
        "Hațeg este orașul central al Țării Hațegului, cel mai bun punct de plecare spre Parcul Național Retezat — înființat în 1935, cel mai vechi din România — și spre Geoparcul UNESCO Țara Hațegului, cunoscut pentru fosilele de dinozauri pitici."
      ],
      facts: [
        { label: "Populație", value: "8.793 locuitori (recensământ 2021)" },
        { label: "Reper", value: "Poartă spre Parcul Național Retezat (1935) și Geoparcul Țara Hațegului" }
      ]
    },
    en: {
      tagline: "The gateway to Retezat National Park and the Hațeg Country Dinosaurs Geopark.",
      description: [
        "Hațeg is the central town of Țara Hațegului, the best starting point for Retezat National Park — established in 1935, the oldest in Romania — and for the Hațeg Country UNESCO Global Geopark, known for its dwarf dinosaur fossils."
      ],
      facts: [
        { label: "Population", value: "8,793 (2021 census)" },
        { label: "Landmark", value: "Gateway to Retezat National Park (1935) and the Hațeg Country Geopark" }
      ]
    }
  },
  {
    id: "brad",
    name: "Brad",
    category: { ro: "Municipiu", en: "Municipality" },
    area: "Munții Metaliferi",
    coords: [46.1294, 22.7900],
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Orașul aurului — istoric centru minier, cu propriul muzeu al aurului.",
      description: [
        "Brad este centrul istoric al mineritului aurifer din Munții Metaliferi. Găzduiește Muzeul Aurului, unul dintre puținele muzee de acest tip din lume, iar în apropiere se află Săcărâmb, localitate cunoscută în mineralogie ca loc de descoperire (1835) a silvanitului, un mineral rar de aur și argint."
      ],
      facts: [
        { label: "Populație", value: "12.690 locuitori (recensământ 2021)" },
        { label: "Reper", value: "Muzeul Aurului" },
        { label: "În apropiere", value: "Săcărâmb — localitate-tip pentru mineralul silvanit (1835)" }
      ]
    },
    en: {
      tagline: "The city of gold — a historic mining centre, with its own gold museum.",
      description: [
        "Brad is the historic centre of gold mining in the Metaliferi Mountains. It houses the Gold Museum, one of the few museums of its kind in the world, and nearby lies Săcărâmb, known in mineralogy as the discovery site (1835) of sylvanite, a rare gold-silver mineral."
      ],
      facts: [
        { label: "Population", value: "12,690 (2021 census)" },
        { label: "Landmark", value: "Gold Museum" },
        { label: "Nearby", value: "Săcărâmb — type locality of sylvanite (1835)" }
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
