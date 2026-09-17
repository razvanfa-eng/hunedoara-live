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
 *   season      opțional — "primavara" | "vara" | "toamna" | "iarna" | "tot-anul".
 *               Folosit doar pentru gruparea din blocul "Obiective din zonă"
 *               (vezi relatedAreas mai jos); fără el, intrarea e pusă la "tot-anul".
 *   relatedAreas opțional, doar pe intrări din SITE_TOWNS/SITE_DESTINATIONS —
 *               listă de nume de `area` (ex. ["Petroșani", "Parâng", "Vâlcan"]).
 *               js/detail.js afișează automat, grupate pe sezon, toate intrările
 *               din Natură/Turism activ/Moștenire/Afaceri a căror `area` se
 *               regăsește în listă — vezi orașul Petroșani mai jos.
 *
 * Câteva intrări sunt încă EXEMPLE (example: true) — completăm împreună
 * conținutul real pe măsură ce alegem locurile, orașele și afacerile din
 * tot județul.
 */

window.SITE_DESTINATIONS = [
  {
    id: "valea-jiului",
    name: "Valea Jiului",
    category: { ro: "Zonă montană și minieră", en: "Mining & mountain zone" },
    area: "Sud-Vest",
    hasReviews: false,
    images: ["images/valea-jiului-parang.jpg"],
    photoCredit: { author: "Cioboata Andrei", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Creasta_Par%C3%A2ngului_-_panoramio.jpg" },
    ro: {
      tagline: "Bazinul carbonifer al Văii Jiului — șase orașe miniere la poalele Parângului, Retezatului și Vâlcanului.",
      description: [
        "Valea Jiului cuprinde șase localități urbane — Petroșani, Petrila, Vulcan, Lupeni, Uricani și Aninoasa — construite în jurul exploatării cărbunelui, într-o vale înconjurată de trei masive muntoase.",
        "Astăzi zona combină patrimoniul industrial (mine, muzee, foste colonii muncitorești) cu accesul direct spre trasee montane și stațiunea Parâng, la câțiva kilometri de Petroșani."
      ],
      facts: [
        { label: "Orașe incluse", value: "Petroșani, Petrila, Vulcan, Lupeni, Uricani, Aninoasa" },
        { label: "Munți din apropiere", value: "Parâng, Retezat, Vâlcan" },
        { label: "Bazine de înot didactice", value: "Petroșani, Petrila, Vulcan și Lupeni au fiecare un bazin didactic propriu" }
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
        { label: "Nearby mountains", value: "Parâng, Retezat, Vâlcan" },
        { label: "Educational swimming pools", value: "Petroșani, Petrila, Vulcan and Lupeni each have their own" }
      ]
    }
  },
  {
    id: "tara-hategului",
    name: "Țara Hațegului",
    category: { ro: "Zonă naturală și istorică", en: "Natural & historic zone" },
    area: "Sud",
    hasReviews: false,
    images: ["images/tara-hategului-ulpia-traiana.jpg"],
    photoCredit: { author: "Roamata", license: "CC BY-SA 3.0 / GFDL", source: "https://commons.wikimedia.org/wiki/File:Ulpia_Traiana_Sarmizegetusa_02.JPG" },
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
    images: ["images/cetatile-dacice-ansamblu.jpg"],
    photoCredit: { author: "Ionut Vaida", license: "CC BY-SA 3.0 RO", source: "https://commons.wikimedia.org/wiki/File:Sarmisegetusa_Regia_-_ansamblu_1.jpg" },
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
    images: ["images/culoarul-muresului-simeria.jpg"],
    photoCredit: { author: "Roxana Stamate", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Lacul_din_parcul_dendrologic_Simeria.jpg" },
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
    id: "parcul-national-retezat",
    name: "Parcul Național Retezat",
    category: { ro: "Parc național", en: "National park" },
    area: "Țara Hațegului",
    coords: [45.3583, 22.8750],
    hasReviews: true,
    images: ["images/retezat-bucura.jpg"],
    photoCredit: { author: "Daniel Ighișan", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Retezat_View_over_Bucura_lake.jpg" },
    ro: {
      tagline: "Cel mai vechi parc național din România (1935), cu peste 80 de lacuri glaciare.",
      description: [
        "Retezat a fost declarat parc național în 1935, fiind cel mai vechi din țară. Adăpostește Lacul Bucura — cel mai mare lac glaciar din România (2.030 m altitudine) — și Vârful Peleaga (2.509 m), cel mai înalt punct al masivului.",
        "Zona centrală e rezervație științifică strictă; traseele de creastă și cele spre lacurile glaciare sunt printre cele mai spectaculoase din Carpați."
      ],
      facts: [
        { label: "Înființat", value: "1935 (cel mai vechi parc național din România)" },
        { label: "Cel mai mare lac", value: "Lacul Bucura, 2.030 m altitudine" },
        { label: "Cel mai înalt vârf", value: "Vf. Peleaga, 2.509 m" }
      ]
    },
    en: {
      tagline: "Romania's oldest national park (1935), with over 80 glacial lakes.",
      description: [
        "Retezat was declared a national park in 1935, the oldest in the country. It holds Bucura Lake — Romania's largest glacial lake (2,030 m altitude) — and Peleaga Peak (2,509 m), the massif's highest point.",
        "The core area is a strict scientific reserve; the ridge trails and those leading to the glacial lakes are among the most spectacular in the Carpathians."
      ],
      facts: [
        { label: "Established", value: "1935 (Romania's oldest national park)" },
        { label: "Largest lake", value: "Bucura Lake, 2,030 m altitude" },
        { label: "Highest peak", value: "Peleaga Peak, 2,509 m" }
      ]
    }
  },
  {
    id: "pestera-bolii",
    name: "Peștera Bolii",
    category: { ro: "Peșteră", en: "Cave" },
    area: "Petrila",
    coords: [45.4539, 23.3183],
    hasReviews: true,
    season: "tot-anul",
    images: ["images/pestera-bolii-portal.jpg"],
    photoCredit: { author: "mihai moise", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Pestera_Boli_-_panoramio.jpg" },
    ro: {
      tagline: "Peșteră-râu de 455 m, amenajată cu iluminat electric, la marginea Parcului Natural Grădiștea Muncelului-Cioclovina.",
      description: [
        "Peștera Bolii se traversează pe jos, urmând pârâul Galbina care iese printr-un portal impresionant, de 20 m lățime și 10 m înălțime. E una dintre puținele peșteri din județ complet vizitabile de-a lungul cursului de apă.",
        "Se află la câțiva kilometri de Petroșani, în apropierea Cheilor Băniței."
      ],
      facts: [
        { label: "Lungime", value: "455 m" },
        { label: "Portal", value: "20 m lățime, 10 m înălțime" },
        { label: "Amenajare", value: "Iluminat electric, traversabilă pe cursul râului Galbina" }
      ]
    },
    en: {
      tagline: "A 455 m river cave with electric lighting, on the edge of the Grădiștea Muncelului-Cioclovina Natural Park.",
      description: [
        "Bolii Cave is walked through following the Galbina creek, which exits through an impressive 20 m wide, 10 m high portal. It's one of the few caves in the county that can be fully walked along its watercourse.",
        "It lies a few kilometres from Petroșani, near the Bănița Gorges."
      ],
      facts: [
        { label: "Length", value: "455 m" },
        { label: "Portal", value: "20 m wide, 10 m high" },
        { label: "Facilities", value: "Electric lighting, walkable along the Galbina stream" }
      ]
    }
  },
  {
    id: "cheile-banitei",
    name: "Cheile Băniței",
    category: { ro: "Chei", en: "Gorge" },
    area: "Bănița",
    hasReviews: true,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Defileu calcaros de cca. 300 m, cu pereți de 10-15 m, traversat de DN66 și de calea ferată Simeria–Petroșani.",
      description: [
        "Cheile Băniței sunt un defileu calcaros pe drumul dintre Petroșani și restul județului, chiar în zona Peșterii Bolii. Pereții abrupți și drumul/calea ferată care șerpuiesc prin chei fac din traseu unul dintre cele mai spectaculoase din județ, chiar și văzut din mașină sau tren.",
        "Pe jos, traseul prin chei se face parțial prin albia râului — recomandat cu încălțăminte adecvată, apa ajunge de obicei până la gleznă, pe alocuri până la genunchi."
      ],
      facts: [
        { label: "Lungime", value: "cca. 300 m, pereți de 10-15 m înălțime" },
        { label: "Acces", value: "DN66 Simeria–Petroșani, în apropierea Peșterii Bolii" }
      ]
    },
    en: {
      tagline: "A limestone gorge about 300 m long, with 10-15 m walls, crossed by the DN66 road and the Simeria–Petroșani railway.",
      description: [
        "Cheile Băniței is a limestone gorge on the road between Petroșani and the rest of the county, right by Bolii Cave. The steep walls and the road/railway winding through the gorge make it one of the county's most spectacular routes, even seen from a car or train.",
        "On foot, the route through the gorge partly follows the riverbed — proper footwear is recommended, as the water usually reaches ankle height, sometimes knee height."
      ],
      facts: [
        { label: "Length", value: "approx. 300 m, 10-15 m walls" },
        { label: "Access", value: "DN66 Simeria–Petroșani, near Bolii Cave" }
      ]
    }
  },
  {
    id: "parangul-mare",
    name: "Vârful Parângul Mare",
    category: { ro: "Vârf montan", en: "Mountain peak" },
    area: "Parâng",
    coords: [45.3411, 23.5406],
    hasReviews: true,
    season: "vara",
    images: ["images/parangul-mare-varf.jpg"],
    photoCredit: { author: "Cioboata Andrei", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Varful_Parangul_Mare_(2519m)_-_panoramio.jpg" },
    ro: {
      tagline: "2.519 m — cel mai înalt vârf din Munții Parâng, accesibil cu telescaunul din Petroșani plus un traseu pe creastă.",
      description: [
        "Parângul Mare este acoperișul masivului Parâng și un punct de belvedere spre Retezat, Șureanu și Valea Jiului. Telescaunul din Petroșani urcă spre platoul Parâng, de unde pornește traseul de creastă spre vârf."
      ],
      facts: [
        { label: "Altitudine", value: "2.519 m" },
        { label: "Cum ajungi", value: "Telescaun din Petroșani + traseu de creastă" }
      ]
    },
    en: {
      tagline: "2,519 m — the highest peak in the Parâng Mountains, reachable by the Petroșani chairlift plus a ridge trail.",
      description: [
        "Parângul Mare is the roof of the Parâng massif and a viewpoint over Retezat, Șureanu and Valea Jiului. The chairlift from Petroșani goes up to the Parâng plateau, from where the ridge trail to the peak starts."
      ],
      facts: [
        { label: "Altitude", value: "2,519 m" },
        { label: "Getting there", value: "Chairlift from Petroșani + ridge trail" }
      ]
    }
  },
  {
    id: "padurea-bicolora-petrila",
    name: "Pădurea Bicoloră",
    category: { ro: "Fenomen natural", en: "Natural phenomenon" },
    area: "Petrila",
    coords: [45.4717, 23.4081],
    hasReviews: true,
    season: "toamna",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Un deal parcă tăiat în două culori, la Cheile Tăii, lângă Petrila — molid mereu verde pe o parte, fag auriu pe cealaltă.",
      description: [
        "Pădurea Bicoloră s-a format acum aproape jumătate de secol, când o jumătate din versant a fost defrișată și replantată cu molid, în timp ce cealaltă jumătate a rămas pădure naturală de fag. Linia dintre cele două tipuri de vegetație a rămas aproape perfect dreaptă, de la vârful dealului până la vale.",
        "Contrastul se vede tot anul — molidul rămâne verde, fagul își schimbă culoarea — dar cel mai spectaculos e toamna, timp de câteva săptămâni, când frunzișul de fag devine auriu-roșcat. Locul se află pe traseul spre Cheile Tăii, rezervație naturală protejată, la câțiva kilometri de Petrila."
      ],
      facts: [
        { label: "Acces", value: "Câțiva kilometri de Petrila, pe drumul spre Cheile Tăii" },
        { label: "Cel mai bun sezon", value: "Toamna, câteva săptămâni, cât fagul se colorează" },
        { label: "Zonă protejată", value: "Rezervația naturală Cheile Tăii (2 ha)" }
      ]
    },
    en: {
      tagline: "A hillside that looks cut in two colours, at the Tăia Gorges near Petrila — evergreen spruce on one side, golden beech on the other.",
      description: [
        "Pădurea Bicoloră (the \"Two-Coloured Forest\") formed nearly half a century ago, when one half of the slope was cleared and replanted with spruce, while the other half stayed natural beech forest. The line between the two kinds of vegetation stayed almost perfectly straight, from the hilltop down to the valley.",
        "The contrast is visible year-round — the spruce stays green, the beech changes colour — but it's most spectacular in autumn, for a few weeks, when the beech foliage turns golden-rust. The spot lies on the way to the Tăia Gorges, a protected nature reserve, a few kilometres from Petrila."
      ],
      facts: [
        { label: "Access", value: "A few kilometres from Petrila, on the road to the Tăia Gorges" },
        { label: "Best season", value: "Autumn, a few weeks while the beech turns colour" },
        { label: "Protected area", value: "Tăia Gorges nature reserve (2 ha)" }
      ]
    }
  },
  {
    id: "pasul-vulcan",
    name: "Pasul Vulcan",
    category: { ro: "Trecătoare montană", en: "Mountain pass" },
    area: "Vâlcan",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Trecătoare istorică de 1.621 m care leagă Valea Jiului de Oltenia.",
      description: [
        "Pasul Vulcan este o trecătoare montană aflată la altitudinea de 1.621 m, în partea de est a Munților Vâlcan, la granița dintre județele Hunedoara și Gorj. Face legătura între Depresiunea Petroșani și depresiunea subcarpatică Târgu Jiu – Câmpu Mare, pe drumul județean DJ664 (Vulcan – Schela).",
        "Drumul peste pas urmează un traseu folosit din antichitate, străbătut istoric de Mihai Viteazul în 1600, în drumul său spre Viena. În septembrie 1916, pasul a fost și scena unor lupte între trupele române și cele germano-austro-ungare, în timpul Primului Război Mondial."
      ],
      facts: [
        { label: "Altitudine", value: "1.621 m" },
        { label: "Leagă", value: "județele Hunedoara și Gorj" },
        { label: "Drum de acces", value: "DJ664, parțial nemodernizat" }
      ]
    },
    en: {
      tagline: "A historic 1,621 m pass linking the Jiu Valley to Oltenia.",
      description: [
        "Vulcan Pass is a mountain pass at 1,621 m altitude, in the eastern Vâlcan Mountains, on the border between Hunedoara and Gorj counties. It connects the Petroșani Depression with the Târgu Jiu – Câmpu Mare sub-Carpathian depression, via county road DJ664 (Vulcan–Schela).",
        "The road over the pass follows a route used since antiquity, historically crossed by Prince Michael the Brave in 1600, on his way to Vienna. In September 1916, the pass was also the site of fighting between Romanian and German/Austro-Hungarian troops during World War I."
      ],
      facts: [
        { label: "Altitude", value: "1,621 m" },
        { label: "Connects", value: "Hunedoara and Gorj counties" },
        { label: "Access road", value: "DJ664, partly unpaved" }
      ]
    }
  },
  {
    id: "jiet-groapa-seaca",
    name: "Cheile Jiețului – Groapa Seacă",
    category: { ro: "Rezervație naturală", en: "Nature reserve" },
    area: "Parâng",
    hasReviews: true,
    season: "vara",
    images: ["images/jiet-groapa-seaca.jpg"],
    photoCredit: { author: "Cioboata Andrei", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Indicatoare_turistice_Cabana_Groapa_Seac%C4%83_-_panoramio.jpg" },
    ro: {
      tagline: "Chei sălbatice și izvoarele Jiețului, poartă naturală spre inima Parângului.",
      description: [
        "Rezervația Cheile Jiețului este o arie naturală protejată de interes național (categoria IV IUCN), cu o suprafață de 10 ha, situată pe versantul drept al Munților Parâng, pe teritoriul orașului Petrila. Aici apele Jiețului au săpat chei abrupte și înguste, cu stânci acoperite de licheni și vegetație de pădure montană; rezervația a fost instituită în 1995 și declarată oficial în 2000.",
        "În amonte, Cabana Groapa Seacă (~1.220 m) este un punct de plecare cunoscut pentru trasee spre Vârful Parângul Mare, Lacul Mija și alte obiective din masiv, fiind una dintre porțile clasice de acces în Parângul hunedorean."
      ],
      facts: [
        { label: "Suprafață rezervație", value: "10 ha" },
        { label: "Statut", value: "arie protejată, categoria IV IUCN (din 1995/2000)" },
        { label: "Altitudine Cabana Groapa Seacă", value: "~1.220 m" }
      ]
    },
    en: {
      tagline: "Wild gorges and the springs of the Jieț, a natural gateway into the Parâng massif.",
      description: [
        "The Cheile Jiețului reserve is a nationally protected natural area (IUCN category IV), covering 10 ha, on the right slope of the Parâng Mountains, within the territory of Petrila town. Here the Jieț river has carved steep, narrow gorges with lichen-covered rock walls and mountain forest vegetation; the reserve was established in 1995 and officially declared in 2000.",
        "Further upstream, Cabana Groapa Seacă (~1,220 m) is a well-known starting point for trails to Parângul Mare Peak, Lake Mija and other landmarks in the massif, one of the classic access gates into the Hunedoara side of the Parâng Mountains."
      ],
      facts: [
        { label: "Reserve area", value: "10 ha" },
        { label: "Status", value: "protected area, IUCN category IV (since 1995/2000)" },
        { label: "Cabana Groapa Seacă altitude", value: "~1,220 m" }
      ]
    }
  },
  {
    id: "campu-lui-neag",
    name: "Câmpu lui Neag",
    category: { ro: "Zonă montană", en: "Mountain area" },
    area: "Uricani",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/campu-lui-neag.jpg"],
    photoCredit: { author: "Nicu Farcaș", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:C%C3%A2mpu_lui_Neag,_Hunedoara.JPG" },
    ro: {
      tagline: "Satul momârlanilor de la poalele Retezatului, poartă spre Parâng și Retezat.",
      description: [
        "Câmpu lui Neag este o localitate din componența orașului Uricani, așezată în sud-vestul județului Hunedoara, la poalele Munților Retezat, fiind considerată una dintre porțile de acces spre Parcul Național Retezat. Zona păstrează tradițiile comunității momârlanilor, locuitorii statornici ai Văii Jiului.",
        "Accesul se face din Petroșani sau din Târgu Jiu, pe DN66A, pe traseul Vulcan – Lupeni – Uricani – Câmpu lui Neag, pe o distanță de circa 40 km. De aici pornesc numeroase trasee turistice spre lacurile, cheile și vârfurile din Munții Retezat și Parâng."
      ],
      facts: [
        { label: "Distanță de Petroșani", value: "~40 km (DN66A)" },
        { label: "Poziție", value: "poalele Munților Retezat, orașul Uricani" },
        { label: "Specific local", value: "comunitatea tradițională a momârlanilor" }
      ]
    },
    en: {
      tagline: "The Momârlani mountain village at the foot of the Retezat, gateway to Parâng and Retezat.",
      description: [
        "Câmpu lui Neag is a village within Uricani town, in the southwestern part of Hunedoara County, at the foot of the Retezat Mountains, considered one of the gateways to Retezat National Park. The area preserves the traditions of the Momârlani, the long-settled mountain community of the Jiu Valley.",
        "Access is from Petroșani or Târgu Jiu on road DN66A, via Vulcan – Lupeni – Uricani – Câmpu lui Neag, about 40 km. From here, numerous trails lead to lakes, gorges and peaks in the Retezat and Parâng mountains."
      ],
      facts: [
        { label: "Distance from Petroșani", value: "~40 km (DN66A)" },
        { label: "Location", value: "foot of the Retezat Mountains, Uricani town" },
        { label: "Local character", value: "traditional Momârlani community" }
      ]
    }
  },
  {
    id: "cheile-buta",
    name: "Cheile Buții",
    category: { ro: "Chei", en: "Gorge" },
    area: "Vâlcan",
    hasReviews: true,
    season: "vara",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Chei calcaroase spectaculoase, printre cele mai frumoase arii protejate din Munții Vâlcan.",
      description: [
        "Cheile Buții sunt săpate de râul Buta (afluent al Jiului de Vest) în calcare jurasice, la granița dintre județele Hunedoara și Gorj, în Munții Vâlcan. Pereții abrupți, care ajung până la aproximativ 100 m înălțime, adăpostesc peșteri, izvoare și cascade, zona fiind considerată una dintre cele mai spectaculoase arii protejate din această parte a Europei.",
        "Punctul de plecare pentru vizitarea cheilor este Cabana Buta, aflată la altitudinea de 1.580 m, pe creasta Piule–Pleșa, cu priveliști spre Oslea și Munții Vâlcan. Accesul pe jos, marcat cu bandă/cruce roșie, durează aproximativ 4 ore de la șoseaua DN66A."
      ],
      facts: [
        { label: "Altitudine Cabana Buta", value: "1.580 m" },
        { label: "Rocă", value: "calcar jurasic" },
        { label: "Acces pe jos", value: "~4 ore de la DN66A, marcaj cruce roșie" }
      ]
    },
    en: {
      tagline: "Spectacular limestone gorges, among the most beautiful protected areas in the Vâlcan Mountains.",
      description: [
        "Cheile Buții (Buta Gorges) were carved by the Buta river (a tributary of the Jiul de Vest) through Jurassic limestone, on the Hunedoara–Gorj county border, in the Vâlcan Mountains. The steep walls, reaching about 100 m in height, shelter caves, springs and waterfalls, and the area is considered one of the most spectacular protected areas in this part of Europe.",
        "The starting point for visiting the gorges is Cabana Buta, at 1,580 m altitude, on the Piule–Pleșa ridge, with views toward Oslea and the Vâlcan Mountains. The hike, marked with a red cross trail, takes about 4 hours from the DN66A road."
      ],
      facts: [
        { label: "Cabana Buta altitude", value: "1,580 m" },
        { label: "Rock type", value: "Jurassic limestone" },
        { label: "Hiking access", value: "~4 hours from DN66A, red cross marking" }
      ]
    }
  },
  {
    id: "valea-iarului",
    name: "Valea Iarului",
    category: { ro: "Vale montană", en: "Mountain valley" },
    area: "Uricani",
    hasReviews: true,
    season: "vara",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Vale montană retrasă lângă Câmpușel, punct de plecare pentru drumeții și camping montan.",
      description: [
        "Valea Iarului este o vale montană situată în zona Câmpușel, la aproximativ 29 km de orașul Uricani, pe versantul dinspre Retezat al munților din sud-vestul județului. Zona este relativ sălbatică și puțin populată, cu acces facilitat de câteva trasee marcate, de dificultate moderată spre dificilă.",
        "Aici funcționează Camping Valea Iarului, o amenajare de tip glamping cu corturi încălzite montate pe platforme de lemn, punct de popas apreciat de drumeți înainte de a urca spre creste."
      ],
      facts: [
        { label: "Zonă", value: "Câmpușel, orașul Uricani" },
        { label: "Distanță de Uricani", value: "~29 km" },
        { label: "Facilități", value: "camping/glamping, trasee de drumeție marcate" }
      ]
    },
    en: {
      tagline: "A secluded mountain valley near Câmpușel, a base for hiking and mountain camping.",
      description: [
        "Valea Iarului is a mountain valley in the Câmpușel area, about 29 km from the town of Uricani, on the Retezat side of the mountains in the county's south-west. The area is relatively wild and sparsely populated, reached via several marked trails of moderate to difficult grade.",
        "Camping Valea Iarului operates here, a glamping-style site with heated tents on wooden platforms, a popular stop for hikers before heading up to the ridges."
      ],
      facts: [
        { label: "Area", value: "Câmpușel, Uricani town" },
        { label: "Distance from Uricani", value: "~29 km" },
        { label: "Facilities", value: "camping/glamping, marked hiking trails" }
      ]
    }
  },
  {
    id: "drum-transmontan-uricani-runcu",
    name: "Drumul transmontan Uricani – Runcu",
    category: { ro: "Drum montan turistic", en: "Scenic mountain road" },
    area: "Uricani",
    hasReviews: true,
    season: "vara",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Drum montan nou-asfaltat care leagă Uricani de Gorj prin Cheile Sohodolului, la 830 m altitudine.",
      description: [
        "Finalizat pe partea hunedoreană în noiembrie 2025, drumul transmontan Uricani–Runcu leagă județele Hunedoara și Gorj printr-o zonă montană cu peisaje spectaculoase, trecând pe lângă Cheile Sohodolului și barajul de la Valea de Pești, la o altitudine maximă de circa 830 m. Lucrarea, în valoare de peste 44,4 milioane de lei, a fost finanțată prin Programul Anghel Saligny, de UAT Uricani în parteneriat cu Consiliul Județean Hunedoara.",
        "Pe partea dinspre Gorj lucrările mai au nevoie de până la doi ani pentru finalizare, dar noul acces deschide deja drumul spre Cheile Sohodolului și lacul Valea de Pești și a atras primele investiții în cabane și pensiuni din zonă."
      ],
      facts: [
        { label: "Leagă", value: "Uricani (Hunedoara) – Runcu (Gorj)" },
        { label: "Altitudine maximă", value: "~830 m" },
        { label: "Finalizat (partea HD)", value: "noiembrie 2025" },
        { label: "Acces spre", value: "Cheile Sohodolului, lacul Valea de Pești" }
      ]
    },
    en: {
      tagline: "A newly-paved mountain road linking Uricani to Gorj county through Cheile Sohodolului, at 830 m altitude.",
      description: [
        "Completed on the Hunedoara side in November 2025, the Uricani–Runcu mountain road links Hunedoara and Gorj counties through a mountain area with spectacular scenery, passing Cheile Sohodolului gorge and the Valea de Pești dam, at a maximum altitude of about 830 m. The works, worth over 44.4 million lei, were funded through the Anghel Saligny Programme, carried out by Uricani local authority in partnership with Hunedoara County Council.",
        "On the Gorj side, works still need up to two years to finish, but the new access already opens the way to Cheile Sohodolului and Lake Valea de Pești, and has already drawn the area's first guesthouse and cabin investments."
      ],
      facts: [
        { label: "Connects", value: "Uricani (Hunedoara) – Runcu (Gorj)" },
        { label: "Maximum altitude", value: "~830 m" },
        { label: "Completed (HD side)", value: "November 2025" },
        { label: "Access to", value: "Cheile Sohodolului gorge, Lake Valea de Pești" }
      ]
    }
  }
];

window.SITE_ACTIVITIES = [
  {
    id: "traseu-pietrele-bucura-peleaga",
    name: "Traseu Cabana Pietrele – Lacul Bucura – Vf. Peleaga",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parcul Național Retezat",
    coords: [45.3583, 22.8750],
    hasReviews: false,
    images: ["images/traseu-peleaga.jpg"],
    photoCredit: { author: "Daniel Ighișan", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Varful_Peleaga.jpg" },
    ro: {
      tagline: "Clasicul traseu din Retezat: de la Cabana Pietrele (1.480 m), la Lacul Bucura și pe Vf. Peleaga (2.509 m).",
      description: [
        "Traseul pornește de la Cabana Pietrele și urcă spre Lacul Bucura, cel mai mare lac glaciar din România — de aici, ultimul tronson spre Vf. Peleaga durează în jur de 2–2,5 ore și are porțiuni de grohotiș instabil.",
        "E un traseu de o zi, solicitant, potrivit doar cu echipament de munte; ultimul tronson (Bucura–Peleaga) se închide iarna din cauza riscului de avalanșă."
      ],
      facts: [
        { label: "Punct de plecare", value: "Cabana Pietrele (1.480 m)" },
        { label: "Dificultate", value: "Medie–dificilă, porțiuni de grohotiș" },
        { label: "Sezon", value: "Tronsonul Bucura–Peleaga se închide iarna (risc de avalanșă)" }
      ]
    },
    en: {
      tagline: "The classic Retezat route: from Cabana Pietrele (1,480 m), to Bucura Lake and Peleaga Peak (2,509 m).",
      description: [
        "The trail starts at Cabana Pietrele and climbs to Bucura Lake, Romania's largest glacial lake — from there, the last stretch to Peleaga Peak takes around 2–2.5 hours and has sections of unstable scree.",
        "It's a demanding day hike, suitable only with proper mountain gear; the last stretch (Bucura–Peleaga) closes in winter due to avalanche risk."
      ],
      facts: [
        { label: "Starting point", value: "Cabana Pietrele (1,480 m)" },
        { label: "Difficulty", value: "Medium–hard, scree sections" },
        { label: "Season", value: "The Bucura–Peleaga stretch closes in winter (avalanche risk)" }
      ]
    }
  },
  {
    id: "partiile-parang",
    name: "Pârtiile de schi din Parâng",
    category: { ro: "Schi", en: "Skiing" },
    area: "Parâng",
    hasReviews: false,
    season: "iarna",
    images: ["images/partii-parang.jpg"],
    photoCredit: { author: "Cioboata Andrei", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Lacul_C%C3%A2lcescu_-_panoramio.jpg" },
    ro: {
      tagline: "Domeniu schiabil la cca. 15 km de Petroșani, cu telescaun de la 950 la 1.650 m.",
      description: [
        "Stațiunea Parâng are 9 pârtii însumând circa 8 km, deservite de 9 instalații de transport pe cablu. Telescaunul urcă din zona Petroșani până la 1.650 m altitudine, pe un traseu de 700 m diferență de nivel."
      ],
      facts: [
        { label: "Acces", value: "cca. 15 km de Petroșani" },
        { label: "Telescaun", value: "de la 950 m la 1.650 m altitudine" },
        { label: "Domeniu", value: "cca. 8 km, 9 pârtii, 9 instalații" }
      ]
    },
    en: {
      tagline: "A ski area about 15 km from Petroșani, with a chairlift climbing from 950 to 1,650 m.",
      description: [
        "The Parâng resort has 9 slopes totalling about 8 km, served by 9 cable lifts. The chairlift climbs from the Petroșani area up to 1,650 m altitude, a 700 m difference in elevation."
      ],
      facts: [
        { label: "Access", value: "approx. 15 km from Petroșani" },
        { label: "Chairlift", value: "from 950 m to 1,650 m altitude" },
        { label: "Ski area", value: "approx. 8 km, 9 slopes, 9 lifts" }
      ]
    }
  },
  {
    id: "statiunea-straja",
    name: "Stațiunea de schi Straja",
    category: { ro: "Schi", en: "Skiing" },
    area: "Vâlcan",
    hasReviews: false,
    season: "iarna",
    images: ["images/statiunea-straja.jpg"],
    photoCredit: { author: "Albundy64", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Ski_resort_Straja.jpg" },
    ro: {
      tagline: "Declarată stațiune în 2002, cu cel mai întins domeniu schiabil din județ — cca. 26 km de pârtii.",
      description: [
        "Straja se află la 1.440 m altitudine, în Munții Vâlcan, accesibilă din Lupeni pe un drum asfaltat de 8 km sau cu telegondola. Domeniul schiabil are circa 26 km (din care 20 km cu zăpadă artificială), 12 pârtii și 11 instalații de transport pe cablu, între 1.130 și 1.868 m altitudine (Vf. Straja).",
        "Cea mai lungă pârtie, Straja Strand, are 3,8 km."
      ],
      facts: [
        { label: "Altitudine", value: "1.130–1.868 m (Vf. Straja)" },
        { label: "Acces", value: "din Lupeni — 8 km drum asfaltat sau telegondolă" },
        { label: "Domeniu", value: "cca. 26 km (20 km cu zăpadă artificială), 12 pârtii, 11 instalații" }
      ]
    },
    en: {
      tagline: "Declared a resort in 2002, with the county's largest ski area — about 26 km of slopes.",
      description: [
        "Straja sits at 1,440 m altitude, in the Vâlcan Mountains, reachable from Lupeni via an 8 km paved road or by gondola. The ski area covers about 26 km (20 km with artificial snow), 12 slopes and 11 cable lifts, between 1,130 and 1,868 m altitude (Straja Peak).",
        "The longest slope, Straja Strand, is 3.8 km."
      ],
      facts: [
        { label: "Altitude", value: "1,130–1,868 m (Straja Peak)" },
        { label: "Access", value: "from Lupeni — 8 km paved road or gondola" },
        { label: "Ski area", value: "approx. 26 km (20 km artificial snow), 12 slopes, 11 lifts" }
      ]
    }
  },
  {
    id: "sania-straja",
    name: "Sania pe șine Straja (Baloo Coaster)",
    category: { ro: "Sanie pe șine", en: "Alpine coaster" },
    area: "Vâlcan",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Prima sanie pe șine din Hunedoara, o coborâre cu adrenalină prin pădurea de la Straja.",
      description: [
        "Sania pe șine (Baloo Coaster) este o atracție de tip alpine coaster deschisă la finalul anului 2025 în stațiunea Straja, lângă Lupeni, la poalele Munților Vâlcan. Instalația a fost realizată printr-o investiție de aproximativ 2,6 milioane de euro, finanțată prin Programul pentru Tranziție Justă.",
        "Traseul, lung de circa 1,4 km, traversează pârtia Sfântul Gheorghe prin două poduri suspendate și include patru spirale care mențin adrenalina la cote înalte. Sania are două locuri, se deplasează pe șine duble pentru siguranță sporită și poate atinge o viteză maximă de aproximativ 40 km/h."
      ],
      facts: [
        { label: "Lungime traseu", value: "~1,4 km" },
        { label: "Viteză maximă", value: "~40 km/h" },
        { label: "Investiție", value: "~2,6 milioane euro (fonduri Tranziție Justă)" }
      ]
    },
    en: {
      tagline: "Hunedoara's first alpine coaster — an adrenaline ride through the forest at Straja.",
      description: [
        "The Baloo Coaster alpine coaster opened in late 2025 at the Straja resort, near Lupeni, at the foot of the Vâlcan Mountains. The installation was built through an investment of about €2.6 million, funded through the Just Transition Program.",
        "The roughly 1.4 km track crosses the Sfântul Gheorghe ski slope over two suspended bridges and includes four spirals for extra thrills. The two-seat sled runs on a double rail system for added safety and can reach a top speed of about 40 km/h."
      ],
      facts: [
        { label: "Track length", value: "~1.4 km" },
        { label: "Top speed", value: "~40 km/h" },
        { label: "Investment", value: "~€2.6 million (Just Transition funding)" }
      ]
    }
  },
  {
    id: "traseu-dealul-babii",
    name: "Traseul Dealul Babii",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Petroșani",
    hasReviews: true,
    season: "primavara",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Culme domoală între Vulcan și Merișor, vestită primăvara pentru covorul de ghiocei.",
      description: [
        "Dealul Babii este o zonă deluroasă situată între orașul Vulcan și satul Merișor, parte a unui traseu de drumeție care pleacă din Petroșani, trece prin Aninoasa, Vulcan, Dealu Babii, Pasul Dealu Babii, Merișor și Bănița, revenind în buclă spre Petroșani — un circuit de aproximativ 44 km, cu altitudini între cca. 550 m și puțin peste 900 m.",
        "Zona este cunoscută mai ales primăvara, când ghioceii înfloresc pe o porțiune de aproximativ 3 km de deal, transformând Dealul Babii într-un „covor alb”, un obiectiv apreciat de localnici și drumeți din Valea Jiului."
      ],
      facts: [
        { label: "Lungime circuit", value: "~44 km (Petroșani–Vulcan–Dealu Babii–Merișor–Bănița–Petroșani)" },
        { label: "Altitudine", value: "~550–900 m" },
        { label: "Perioadă recomandată", value: "primăvara, pentru înflorirea ghioceilor" }
      ]
    },
    en: {
      tagline: "A gentle ridge between Vulcan and Merișor, famous in spring for its carpet of snowdrops.",
      description: [
        "Dealul Babii is a hilly area between the town of Vulcan and the village of Merișor, part of a hiking loop that starts in Petroșani, passes through Aninoasa, Vulcan, Dealu Babii, Pasul Dealu Babii, Merișor and Bănița, and loops back to Petroșani — a circuit of about 44 km, climbing from roughly 550 m to just over 900 m.",
        "The area is best known in spring, when snowdrops bloom across about 3 km of hillside, turning Dealul Babii into a white carpet — a favourite spot for locals and hikers in the Jiu Valley."
      ],
      facts: [
        { label: "Loop length", value: "~44 km (Petroșani–Vulcan–Dealu Babii–Merișor–Bănița–Petroșani)" },
        { label: "Elevation", value: "~550–900 m" },
        { label: "Best season", value: "spring, for the snowdrop bloom" }
      ]
    }
  },
  {
    id: "bazin-inot-petrosani",
    name: "Bazinul Didactic de Înot „Avram Iancu” Petroșani",
    category: { ro: "Bazin de înot didactic", en: "Educational swimming pool" },
    area: "Petroșani",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Bazin semiolimpic acoperit, redeschis în 2025 după modernizare, în cartierul Aeroport.",
      description: [
        "Bazinul Didactic de Înot „Avram Iancu” din Petroșani este un bazin semiolimpic de 12,5 × 25 m, cu adâncime variabilă între 1,20 și 1,80 m, situat pe strada Oituz, în cartierul Aeroport. Facilitatea include saună, vestiare și o masă de tenis de masă, fiind folosită atât pentru cursuri de înot pentru elevi, cât și pentru înot liber.",
        "După lucrări de modernizare (centrală termică, acoperiș, ventilație), bazinul s-a redeschis publicului pe 20 octombrie 2025."
      ],
      facts: [
        { label: "Dimensiuni", value: "12,5 × 25 m, adâncime 1,20–1,80 m" },
        { label: "Program", value: "Luni–Vineri, 09:00–21:00" },
        { label: "Adresă", value: "Str. Oituz, cartier Aeroport, Petroșani" }
      ]
    },
    en: {
      tagline: "A covered semi-Olympic pool, reopened in 2025 after modernisation, in the Aeroport district.",
      description: [
        "The \"Avram Iancu\" Educational Swimming Pool in Petroșani is a semi-Olympic pool measuring 12.5 × 25 m, with variable depth between 1.20 and 1.80 m, located on Oituz street, in the Aeroport district. The facility includes a sauna, changing rooms and a table-tennis table, used both for swimming lessons for pupils and for open swimming.",
        "After modernisation works (heating plant, roof, ventilation), the pool reopened to the public on 20 October 2025."
      ],
      facts: [
        { label: "Dimensions", value: "12.5 × 25 m, 1.20–1.80 m depth" },
        { label: "Hours", value: "Monday–Friday, 09:00–21:00" },
        { label: "Address", value: "Oituz street, Aeroport district, Petroșani" }
      ]
    }
  },
  {
    id: "bazin-inot-petrila",
    name: "Bazinul de Înot Didactic Petrila",
    category: { ro: "Bazin de înot didactic", en: "Educational swimming pool" },
    area: "Petrila",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Bazin didactic de 25×12,5 m, cu 5 culoare, lângă Școala nr. 5.",
      description: [
        "Bazinul de înot de la Petrila, deschis publicului din ianuarie 2022, are 25 × 12,5 m, adâncime variabilă între 1,20 și 1,80 m și 5 culoare de înot, cu blocuri de start la capătul mai adânc — folosit atât pentru cursuri școlare, cât și pentru acces public.",
        "Este situat pe strada 8 Martie, lângă Școala Gimnazială nr. 5. Bazinul e închis lunea pentru curățenie și dezinfecție."
      ],
      facts: [
        { label: "Program", value: "Marți–Sâmbătă 09:00–21:00 (ultima intrare 19:00), Duminică 12:00–20:00 (ultima intrare 18:00), închis lunea" },
        { label: "Tarife", value: "16 lei adulți / 8 lei elevi-studenți, ședință de 2 ore" },
        { label: "Adresă", value: "Str. 8 Martie, lângă Școala nr. 5, Petrila" }
      ]
    },
    en: {
      tagline: "A 25×12.5 m educational pool with 5 lanes, next to School No. 5.",
      description: [
        "The swimming pool in Petrila, open to the public since January 2022, measures 25 × 12.5 m, with variable depth between 1.20 and 1.80 m and 5 swimming lanes, with starting blocks at the deeper end — used both for school lessons and public access.",
        "It's located on 8 Martie street, next to School No. 5. The pool is closed on Mondays for cleaning and disinfection."
      ],
      facts: [
        { label: "Hours", value: "Tuesday–Saturday 09:00–21:00 (last entry 19:00), Sunday 12:00–20:00 (last entry 18:00), closed Mondays" },
        { label: "Prices", value: "16 lei adults / 8 lei pupils-students, 2-hour session" },
        { label: "Address", value: "8 Martie street, next to School No. 5, Petrila" }
      ]
    }
  },
  {
    id: "bazin-inot-vulcan",
    name: "Bazinul Didactic de Înot Vulcan",
    category: { ro: "Bazin de înot didactic", en: "Educational swimming pool" },
    area: "Vulcan",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Bazin semiolimpic în centrul orașului, între Minimax și biserica de lângă Primărie.",
      description: [
        "Bazinul Didactic de Înot din Vulcan, dat în folosință în 2022, este un bazin semiolimpic de 25 × 12,5 m, cu adâncime între 1,20 și 1,80 m și apă încălzită la 24,6–26°C. E dedicat în primul rând elevilor din municipiu, care fac aici cursuri de înot, dar are program și pentru publicul larg.",
        "Se află pe strada Platoului, între magazinul Minimax și biserica de lângă Primărie."
      ],
      facts: [
        { label: "Program", value: "Luni–Vineri 09:00–21:00, Sâmbătă–Duminică 09:00–17:00" },
        { label: "Temperatura apei", value: "24,6–26°C" },
        { label: "Adresă", value: "Str. Platoului, Vulcan" }
      ]
    },
    en: {
      tagline: "A semi-Olympic pool in the town centre, between the Minimax store and the church by the town hall.",
      description: [
        "The Educational Swimming Pool in Vulcan, opened in 2022, is a semi-Olympic pool measuring 25 × 12.5 m, with depth between 1.20 and 1.80 m and water heated to 24.6–26°C. It's primarily meant for the town's pupils, who take swimming lessons there, but it's also open to the general public.",
        "It's located on Platoului street, between the Minimax store and the church next to the town hall."
      ],
      facts: [
        { label: "Hours", value: "Monday–Friday 09:00–21:00, Saturday–Sunday 09:00–17:00" },
        { label: "Water temperature", value: "24.6–26°C" },
        { label: "Address", value: "Platoului street, Vulcan" }
      ]
    }
  },
  {
    id: "bazin-inot-lupeni",
    name: "Bazinul Didactic de Înot Lupeni",
    category: { ro: "Bazin de înot didactic", en: "Educational swimming pool" },
    area: "Lupeni",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Cel mai nou bazin didactic din Valea Jiului, inaugurat în decembrie 2025 la poalele Străjii.",
      description: [
        "Bazinul didactic de înot din Lupeni, al patrulea de acest tip din Valea Jiului, a fost inaugurat pe 5 decembrie 2025, după o investiție de peste 12 milioane de lei și circa trei ani de lucrări. Se află la poalele stațiunii Straja, deservind atât localnicii, cât și turiștii cazați la munte.",
        "Pe lângă înot liber și cursuri, bazinul oferă saună și pachete combinate înot+saună."
      ],
      facts: [
        { label: "Program", value: "Luni–Joi 10:00–21:00, Vineri–Duminică 12:00–22:00" },
        { label: "Tarife", value: "20 lei adulți / 10 lei preșcolari-elevi, ședință de max. 90 min" },
        { label: "Deschis", value: "5 decembrie 2025" }
      ]
    },
    en: {
      tagline: "The newest educational pool in Valea Jiului, opened in December 2025 at the foot of Straja.",
      description: [
        "The educational swimming pool in Lupeni, the fourth of its kind in Valea Jiului, opened on 5 December 2025, after an investment of over 12 million lei and about three years of works. It sits at the foot of the Straja resort, serving both locals and tourists staying in the mountains.",
        "Besides open swimming and lessons, the pool offers a sauna and combined swim+sauna packages."
      ],
      facts: [
        { label: "Hours", value: "Monday–Thursday 10:00–21:00, Friday–Sunday 12:00–22:00" },
        { label: "Prices", value: "20 lei adults / 10 lei preschoolers-pupils, session up to 90 min" },
        { label: "Opened", value: "5 December 2025" }
      ]
    }
  },
  {
    id: "traseul-tunelelor-vulcan",
    name: "Traseul Tunelelor",
    category: { ro: "Traseu tematic", en: "Themed trail" },
    area: "Vulcan",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu tematic ușor-mediu prin munții de lângă Vulcan, cu Peștera și Cascada Dracului.",
      description: [
        "Traseul Tunelelor este unul dintre cele cinci poteci turistice tematice amenajate în 2022 în zona montană a municipiului Vulcan, dintr-o inițiativă a Grupului Pro Montana, realizată de Primăria Vulcan cu sprijinul Salvamont Hunedoara.",
        "Lung de aproximativ 6 km (3–4 ore dus-întors), de dificultate ușoară spre medie, traseul trece pe lângă foste construcții hidrotehnice abandonate și duce la Peștera Dracului, Cascada Dracului și izvoarele Baleii — poate fi parcurs pe jos, cu bicicleta sau, iarna, cu schiurile."
      ],
      facts: [
        { label: "Lungime", value: "~6 km (3–4 ore dus-întors)" },
        { label: "Dificultate", value: "ușoară-medie" },
        { label: "Obiective pe traseu", value: "Peștera Dracului, Cascada Dracului, Izvoarele Baleii" },
        { label: "Amenajat", value: "2022, Pro Montana + Primăria Vulcan + Salvamont Hunedoara" }
      ]
    },
    en: {
      tagline: "An easy-to-moderate themed trail near Vulcan, leading to the Devil's Cave and Waterfall.",
      description: [
        "Traseul Tunelelor (\"the tunnels trail\") is one of five themed hiking trails set up in 2022 in the mountains near Vulcan, an initiative of the Pro Montana group, carried out by Vulcan Town Hall with support from Salvamont Hunedoara.",
        "About 6 km long (3–4 hours round trip), easy to moderate in difficulty, the trail passes abandoned hydro-technical structures and leads to Peștera Dracului (Devil's Cave), Cascada Dracului (Devil's Waterfall) and the Baleia springs — it can be covered on foot, by bike or, in winter, on skis."
      ],
      facts: [
        { label: "Length", value: "~6 km (3–4 hours round trip)" },
        { label: "Difficulty", value: "easy-moderate" },
        { label: "Landmarks", value: "Devil's Cave, Devil's Waterfall, Baleia springs" },
        { label: "Built", value: "2022, Pro Montana + Vulcan Town Hall + Salvamont Hunedoara" }
      ]
    }
  },
  {
    id: "traseul-ruinelor-aninoasa",
    name: "Traseul Ruinelor",
    category: { ro: "Traseu tematic", en: "Themed trail" },
    area: "Aninoasa",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu de 12 km de la Vulcan la Aninoasa, pe Valea Ungurului, cu mănăstire, cascadă și ruine.",
      description: [
        "Traseul Ruinelor este cel mai lung dintre cele cinci poteci tematice amenajate în 2022 lângă Vulcan (proiect Pro Montana, Primăria Vulcan și Salvamont Hunedoara). Pornește din Vulcan și urmează cursul Văii Ungurului până în Aninoasa, pe o distanță de aproximativ 12 km, de dificultate medie.",
        "Pe parcurs se află Mănăstirea Sf. Nicolae, Cascada Ungurului, formațiunea stâncoasă numită Sfinxul Văii Ungurului și mai multe ruine istorice de construcții din piatră — de unde și numele traseului."
      ],
      facts: [
        { label: "Traseu", value: "Vulcan → Valea Ungurului → Aninoasa, ~12 km" },
        { label: "Dificultate", value: "medie" },
        { label: "Obiective pe traseu", value: "Mănăstirea Sf. Nicolae, Cascada Ungurului, Sfinxul Văii Ungurului, ruine" },
        { label: "Amenajat", value: "2022, Pro Montana + Primăria Vulcan + Salvamont Hunedoara" }
      ]
    },
    en: {
      tagline: "A 12 km trail from Vulcan to Aninoasa along Valea Ungurului, with a monastery, waterfall and ruins.",
      description: [
        "Traseul Ruinelor (\"the ruins trail\") is the longest of five themed trails set up in 2022 near Vulcan (a Pro Montana project, with Vulcan Town Hall and Salvamont Hunedoara). It starts in Vulcan and follows the Valea Ungurului stream to Aninoasa, covering about 12 km at moderate difficulty.",
        "Along the way lie Sf. Nicolae Monastery, Cascada Ungurului waterfall, a rock formation known as the Sphinx of Valea Ungurului, and several historic stone ruins — which give the trail its name."
      ],
      facts: [
        { label: "Route", value: "Vulcan → Valea Ungurului → Aninoasa, ~12 km" },
        { label: "Difficulty", value: "moderate" },
        { label: "Landmarks", value: "Sf. Nicolae Monastery, Cascada Ungurului waterfall, the Valea Ungurului Sphinx, ruins" },
        { label: "Built", value: "2022, Pro Montana + Vulcan Town Hall + Salvamont Hunedoara" }
      ]
    }
  }
];

window.SITE_HERITAGE = [
  {
    id: "sarmizegetusa-regia",
    name: "Sarmizegetusa Regia",
    category: { ro: "Sit arheologic UNESCO", en: "UNESCO archaeological site" },
    area: "Munții Orăștiei",
    coords: [45.6219, 23.3093],
    hasReviews: true,
    images: ["images/sarmizegetusa-regia-sanctuar.jpg"],
    photoCredit: { author: "Eliza Palos", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Sarmizegetusa_Regia-Sanctuarul_mare_circular_(Zona_sacr%C4%83).jpg" },
    ro: {
      tagline: "Capitala regatului dac, pe un vârf la 1.200 m altitudine — patrimoniu mondial UNESCO din 1999.",
      description: [
        "Sarmizegetusa Regia a fost centrul politic și religios al regatului dac timp de peste un secol și jumătate, ajungând la apogeu sub Decebal. Fortificația, construită în tehnica \"murus dacicus\" pe cinci terase, ocupă aproape 30.000 m².",
        "Zona sacră din apropiere cuprinde temple rectangulare și celebrul sanctuar circular — un \"calendar\" din stâlpi de lemn și piatră, una dintre cele mai discutate construcții din arheologia românească."
      ],
      facts: [
        { label: "Statut", value: "Patrimoniu mondial UNESCO din 1999" },
        { label: "Altitudine", value: "cca. 1.200 m" },
        { label: "Tehnică de construcție", value: "Murus dacicus (blocuri de piatră fasonate)" }
      ]
    },
    en: {
      tagline: "The capital of the Dacian kingdom, on a 1,200 m summit — UNESCO World Heritage since 1999.",
      description: [
        "Sarmizegetusa Regia was the political and religious centre of the Dacian kingdom for over a century and a half, reaching its peak under Decebalus. The fortress, built in the \"murus dacicus\" technique across five terraces, covers almost 30,000 m².",
        "The nearby sacred area holds rectangular temples and the famous circular sanctuary — a wood-and-stone \"calendar\", one of the most discussed structures in Romanian archaeology."
      ],
      facts: [
        { label: "Status", value: "UNESCO World Heritage since 1999" },
        { label: "Altitude", value: "approx. 1,200 m" },
        { label: "Construction technique", value: "Murus dacicus (fitted stone blocks)" }
      ]
    }
  },
  {
    id: "biserica-densus",
    name: "Biserica din Densuș",
    category: { ro: "Monument istoric", en: "Historic monument" },
    area: "Țara Hațegului",
    coords: [45.5819, 22.8047],
    hasReviews: true,
    images: ["images/densus-biserica.jpg"],
    photoCredit: { author: "Bodor Istvan", license: "CC BY-SA 3.0 RO", source: "https://commons.wikimedia.org/wiki/File:Biserica_Sf%C3%A2ntul_Nicolae_din_Densu%C8%99_2.jpg" },
    ro: {
      tagline: "Una dintre cele mai vechi biserici de piatră din România aflate încă în uz, ridicată din materiale romane refolosite.",
      description: [
        "Datată în jurul secolelor XII–XIII, biserica din Densuș a fost construită în bună parte din piatră și elemente arhitecturale romane recuperate din ruinele apropiate. Forma sa neobișnuită și vechimea o fac unul dintre cele mai vizitate monumente din Țara Hațegului."
      ],
      facts: [
        { label: "Datare", value: "Cca. secolele XII–XIII" },
        { label: "Particularitate", value: "Construită din piatră romană refolosită" }
      ]
    },
    en: {
      tagline: "One of the oldest stone churches in Romania still in use, built from reused Roman materials.",
      description: [
        "Dated to around the 12th–13th centuries, the Densuș church was largely built from Roman stone and architectural elements recovered from nearby ruins. Its unusual shape and age make it one of the most visited monuments in Țara Hațegului."
      ],
      facts: [
        { label: "Dating", value: "Approx. 12th–13th centuries" },
        { label: "Distinctive feature", value: "Built from reused Roman stone" }
      ]
    }
  },
  {
    id: "manastirea-prislop",
    name: "Mănăstirea Prislop",
    category: { ro: "Mănăstire", en: "Monastery" },
    area: "Silvașu de Sus, Țara Hațegului",
    coords: [45.6317, 22.8503],
    hasReviews: true,
    images: ["images/prislop-manastire.jpg"],
    photoCredit: { author: "Tomoniu N. Nicolae", license: "CC BY-SA 3.0 RO", source: "https://commons.wikimedia.org/wiki/File:Biserica_%22Sf._Treime%22_a_M%C4%83n%C4%83stirii_Prislop_img-0690.jpg" },
    ro: {
      tagline: "Ctitorie din 1564, loc de pelerinaj legat de părintele Arsenie Boca.",
      description: [
        "Biserica actuală a fost ridicată în 1564 de Domnița Zamfira. Mănăstirea a devenit un important loc de pelerinaj după ce părintele Arsenie Boca a fost stareț aici din 1948 până la moartea sa, în 1989 — este înmormântat în incinta mănăstirii, care primește anual mii de pelerini."
      ],
      facts: [
        { label: "Ctitorire biserică", value: "1564, de Domnița Zamfira" },
        { label: "Legătură", value: "Mormântul părintelui Arsenie Boca (stareț 1948–1989)" }
      ]
    },
    en: {
      tagline: "Founded in 1564, a pilgrimage site linked to Father Arsenie Boca.",
      description: [
        "The current church was built in 1564 by Princess Zamfira. The monastery became a major pilgrimage site after Father Arsenie Boca served as its abbot from 1948 until his death in 1989 — he is buried on the monastery grounds, which receive thousands of pilgrims every year."
      ],
      facts: [
        { label: "Church founded", value: "1564, by Princess Zamfira" },
        { label: "Connection", value: "Grave of Father Arsenie Boca (abbot 1948–1989)" }
      ]
    }
  },
  {
    id: "muzeul-mineritului-petrosani",
    name: "Muzeul Mineritului din Petroșani",
    category: { ro: "Muzeu", en: "Museum" },
    area: "Petroșani",
    coords: [45.4166, 23.3733],
    hasReviews: true,
    season: "tot-anul",
    images: ["images/muzeul-mineritului-petrosani.jpg"],
    photoCredit: { author: "Strainu", license: "CC BY-SA 3.0 RO", source: "https://commons.wikimedia.org/wiki/File:Muzeul_Mineritului_(2).JPG" },
    ro: {
      tagline: "Singurul muzeu din România dedicat exclusiv tehnicii miniere a cărbunelui.",
      description: [
        "Înființat în 1961, muzeul funcționează din 1966 într-o clădire din 1920, fostă locuință pentru angajați, azi monument istoric. Colecția, de circa 1.500 de piese (utilaje, unelte, documente, echipament de mină), a fost redeschisă publicului în 2021 după restaurare."
      ],
      facts: [
        { label: "Înființat", value: "1961" },
        { label: "Colecție", value: "cca. 1.500 de piese legate de minerit" },
        { label: "Redeschis", value: "2021, după restaurare" }
      ]
    },
    en: {
      tagline: "The only museum in Romania dedicated exclusively to coal-mining technology.",
      description: [
        "Founded in 1961, the museum has operated since 1966 in a 1920 building, formerly staff housing, now a historic monument. The collection of about 1,500 items (equipment, tools, documents, mining gear) reopened to the public in 2021 after restoration."
      ],
      facts: [
        { label: "Founded", value: "1961" },
        { label: "Collection", value: "approx. 1,500 mining-related items" },
        { label: "Reopened", value: "2021, after restoration" }
      ]
    }
  },
  {
    id: "mina-petrila",
    name: "Mina Petrila (Planeta Petrila)",
    category: { ro: "Ansamblu industrial istoric", en: "Historic industrial site" },
    area: "Petrila",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Cea mai veche exploatare din Valea Jiului, azi transformată într-un muzeu în aer liber.",
      description: [
        "Mina Petrila și-a încheiat activitatea în 2015, după peste un secol de exploatare a cărbunelui, și a fost clasată în același an ca monument istoric de valoare națională excepțională. Ansamblul, cumpărat de Consiliul Județean Hunedoara în 2022, cuprinde atelierele mecanice, clădirea compresoarelor, termocentrala cu șornul ei caracteristic, Puțul Nou cu schip și Puțul Central, pe o suprafață de aproape 164.000 mp.",
        "Cunoscută drept „Planeta Petrila”, fosta mină găzduiește tururi ghidate, proiecții de film și festivalul internațional Opera Nights, într-un proiect de regenerare urbană finanțat prin PNRR care urmărește introducerea ei permanentă în circuitul turistic."
      ],
      facts: [
        { label: "Închidere/clasare monument", value: "2015" },
        { label: "Suprafață ansamblu", value: "~163.855 mp" },
        { label: "Ce se vede", value: "atelierele mecanice, termocentrala, Puțul Nou și Puțul Central" },
        { label: "Vizitare", value: "tururi ghidate; festivalul Opera Nights" }
      ]
    },
    en: {
      tagline: "The oldest mine in Valea Jiului, now turned into an open-air museum.",
      description: [
        "Petrila Mine closed in 2015, after more than a century of coal extraction, and was listed the same year as a historic monument of exceptional national value. The complex, bought by Hunedoara County Council in 2022, includes the mechanical workshops, the compressor building, the power plant with its distinctive chimney, the New Shaft with its cage lift and the Central Shaft, covering nearly 164,000 sqm.",
        "Known as \"Planet Petrila\", the former mine now hosts guided tours, film screenings and the international Opera Nights festival, part of a PNRR-funded urban regeneration project aiming to bring it permanently into the tourist circuit."
      ],
      facts: [
        { label: "Closed / listed as monument", value: "2015" },
        { label: "Site area", value: "~163,855 sqm" },
        { label: "What to see", value: "mechanical workshops, power plant, New Shaft and Central Shaft" },
        { label: "Visiting", value: "guided tours; Opera Nights festival" }
      ]
    }
  },
  {
    id: "crucea-eroilor-lupeni",
    name: "Crucea Eroilor Lupeni",
    category: { ro: "Monument", en: "Memorial" },
    area: "Lupeni",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Monument ridicat în memoria celor 82 de mineri morți în explozia de la Mina Aurelia, 1922.",
      description: [
        "Crucea Eroilor din Lupeni comemorează cei 82 de mineri uciși pe 27 aprilie 1922, într-o explozie de gaz metan la Mina Aurelia — unul dintre cele mai grave accidente miniere din istoria Văii Jiului. În urma tragediei, regele Ferdinand a vizitat zona și a acordat sprijin financiar celor 94 de orfani și văduve rămași în urma dezastrului.",
        "Monumentul rămâne astăzi un punct de reper pentru memoria minerească a orașului, alături de Palatul Cultural „Minerul”, ridicat din inițiativa regelui Ferdinand I și dat în folosință în 1927."
      ],
      facts: [
        { label: "Eveniment comemorat", value: "explozia de la Mina Aurelia, 27 aprilie 1922" },
        { label: "Victime", value: "82 de mineri" },
        { label: "Context", value: "vizita regelui Ferdinand; sprijin pentru 94 de orfani și văduve" }
      ]
    },
    en: {
      tagline: "A memorial to the 82 miners killed in the 1922 explosion at Aurelia Mine.",
      description: [
        "The Heroes' Cross in Lupeni commemorates the 82 miners killed on 27 April 1922 in a methane gas explosion at Aurelia Mine — one of the worst mining disasters in the history of Valea Jiului. Following the tragedy, King Ferdinand visited the area and provided financial support to the 94 orphans and widows left behind.",
        "The monument remains a landmark of the town's mining memory today, alongside the \"Minerul\" Cultural Palace, built on the initiative of King Ferdinand I and opened in 1927."
      ],
      facts: [
        { label: "Event commemorated", value: "Aurelia Mine explosion, 27 April 1922" },
        { label: "Victims", value: "82 miners" },
        { label: "Context", value: "King Ferdinand's visit; support for 94 orphans and widows" }
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
    images: ["images/deva-cetate.jpg"],
    photoCredit: { author: "Bogdan.onis", license: "CC BY-SA 3.0 RO", source: "https://commons.wikimedia.org/wiki/File:Cetatea_Deva.jpg" },
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
    images: ["images/hunedoara-corvin-castle.jpg"],
    photoCredit: { author: "Andrei Stroe", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:RO_HD_Corvin_castle.jpg" },
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
    relatedAreas: ["Petroșani", "Parâng", "Vâlcan", "Petrila", "Uricani", "Vulcan", "Lupeni", "Aninoasa"],
    images: ["images/petrosani-panorama.jpg"],
    photoCredit: { author: "Eduard Gergely", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Petrosani_Town.jpg" },
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
    images: ["images/orastie-cetate.jpg"],
    photoCredit: { author: "Roamata", license: "domeniu public", source: "https://commons.wikimedia.org/wiki/File:Cetatea_orastie.JPG" },
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
    images: ["images/hateg-panorama.jpg"],
    photoCredit: { author: "Țetcu Mircea Rareș", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:RO_HD_Hateg_2015_(1).JPG" },
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
    images: ["images/brad-skyline.jpg"],
    photoCredit: { author: "Sthadrian", license: "domeniu public", source: "https://commons.wikimedia.org/wiki/File:Brad_Skyline.jpg" },
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
    id: "istorie-natura-cultura-costesti-2026",
    name: "„Istorie, Natură, Cultură” — ediția a 55-a, la Costești",
    category: { ro: "Festival", en: "Festival" },
    area: "Costești, Orăștioara de Sus",
    date: "2026-09-18",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "În weekendul 18–20 septembrie 2026, lângă cetățile dacice — concerte, marș folcloric și artizanat local.",
      description: [
        "Festivalul „Istorie, Natură, Cultură” ajunge la ediția a 55-a, în comuna Orăștioara de Sus, în apropierea cetăților dacice din Munții Orăștiei. Organizat de GAL Sargeția, Asociația Culturală Valea Dacilor și Parcul Natural Grădiștea Muncelului-Cioclovina, alături de instituții locale.",
        "Programul include concerte de muzică ușoară și populară cu artiști cunoscuți, un marș folcloric cu ansambluri din tot județul, foc de artificii la apus, o paradă de costume istorice și populare, plus produse de la producători și meșteșugari locali."
      ],
      facts: [
        { label: "Perioadă", value: "18–20 septembrie 2026" },
        { label: "Loc", value: "Costești, comuna Orăștioara de Sus" },
        { label: "Organizatori", value: "GAL Sargeția, Asociația Culturală Valea Dacilor, Parcul Natural Grădiștea Muncelului-Cioclovina" }
      ]
    },
    en: {
      tagline: "On the weekend of 18–20 September 2026, near the Dacian fortresses — concerts, a folklore march and local crafts.",
      description: [
        "The \"Istorie, Natură, Cultură\" festival reaches its 55th edition, in the Orăștioara de Sus commune, near the Dacian fortresses in the Orăștie Mountains. Organised by the GAL Sargeția local action group, the Valea Dacilor Cultural Association and the Grădiștea Muncelului-Cioclovina Natural Park, together with local institutions.",
        "The programme includes pop and folk music concerts with well-known artists, a folklore march with ensembles from across the county, a sunset fireworks display, a parade of historical and traditional costumes, plus products from local producers and craftspeople."
      ],
      facts: [
        { label: "Dates", value: "18–20 September 2026" },
        { label: "Location", value: "Costești, Orăștioara de Sus commune" },
        { label: "Organisers", value: "GAL Sargeția, Valea Dacilor Cultural Association, Grădiștea Muncelului-Cioclovina Natural Park" }
      ]
    }
  },
  {
    id: "festivalul-medieval-ioan-de-hunedoara-2026",
    name: "Festivalul Medieval „Ioan de Hunedoara” — ediția 2026",
    category: { ro: "Festival", en: "Festival" },
    area: "Hunedoara",
    date: "2026-08-29",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "18 grupuri de reconstituire istorică din țară și străinătate au adus Evul Mediu la Castelul Corvinilor.",
      description: [
        "Pe 29–30 august 2026, Castelul Corvinilor și Pietonala Corvin din Hunedoara au găzduit Festivalul Medieval „Ioan de Hunedoara”, cu reconstituiri de bătălii istorice, ateliere interactive, demonstrații de tir cu arcul și lupte medievale.",
        "Ediția din acest an a adus 18 grupuri de reconstituire istorică din România, Cehia, Slovacia și Ungaria, plus concerte susținute de trupele Iris și Peregrinii."
      ],
      facts: [
        { label: "Perioadă", value: "29–30 august 2026" },
        { label: "Loc", value: "Castelul Corvinilor, Hunedoara" },
        { label: "Participanți", value: "18 grupuri de reconstituire istorică, din țară și din străinătate" }
      ]
    },
    en: {
      tagline: "18 historical re-enactment groups from Romania and abroad brought the Middle Ages back to Corvin Castle.",
      description: [
        "On 29–30 August 2026, Corvin Castle and the Corvin pedestrian street in Hunedoara hosted the \"Ioan de Hunedoara\" Medieval Festival, with historical battle re-enactments, interactive workshops, archery demonstrations and medieval combat.",
        "This year's edition brought 18 historical re-enactment groups from Romania, the Czech Republic, Slovakia and Hungary, plus concerts by the bands Iris and Peregrinii."
      ],
      facts: [
        { label: "Dates", value: "29–30 August 2026" },
        { label: "Location", value: "Corvin Castle, Hunedoara" },
        { label: "Participants", value: "18 historical re-enactment groups, from Romania and abroad" }
      ]
    }
  }
];

window.SITE_BUSINESSES = [
  {
    id: "conacul-radacinilor",
    name: "Conacul Rădăcinilor",
    category: { ro: "Hotel & restaurant", en: "Hotel & restaurant" },
    area: "Petrila",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Complex hotelier de tip conac, deschis în 2023 în Cheile Jietului, cu spa, restaurant și drumeții ghidate.",
      description: [
        "Conacul Rădăcinilor este un complex hotelier, restaurant și agrement deschis în 2023 pe strada Jiet (DN7A), în Cheile Jietului, pe teritoriul orașului Petrila, în drum spre Transalpina. Arhitectura rustică, cu lemn masiv și vegetație, adăpostește peste 25 de camere, o zonă de wellness & spa cu jacuzzi și saună încălzită, o cameră de salinoterapie, restaurant, „Green Bar”, terasă și spații pentru evenimente și conferințe.",
        "Complexul organizează drumeții montane ghidate și are un parteneriat cu un centru ecvestru din apropiere (Keops Horses), fiind un punct de plecare potrivit atât pentru un weekend de relaxare, cât și pentru vizitarea Cheilor Jiețului și a platoului Parâng."
      ],
      facts: [
        { label: "Locație", value: "Str. Jiet, DN7A, Cheile Jietului, Petrila" },
        { label: "Deschis", value: "2023" },
        { label: "Facilități", value: "peste 25 de camere, spa, jacuzzi, saună, salină, restaurant, terasă" },
        { label: "Contact", value: "tel. 0738 777 711 · conaculradacinilor.ro" }
      ]
    },
    en: {
      tagline: "A manor-style hotel complex opened in 2023 in the Jieț gorge, with a spa, restaurant and guided hikes.",
      description: [
        "Conacul Rădăcinilor (\"Manor of Roots\") is a hotel, restaurant and leisure complex opened in 2023 on Jiet street (DN7A), in the Cheile Jietului gorge, within Petrila town, on the way to the Transalpina road. Its rustic architecture, built with solid wood and greenery, houses over 25 rooms, a wellness & spa area with a jacuzzi and heated sauna, a salt therapy room, a restaurant, a \"Green Bar\", a terrace, and event and conference spaces.",
        "The complex runs guided mountain hikes and partners with a nearby equestrian centre (Keops Horses), making it a good base both for a relaxing weekend and for exploring the Jieț gorge and the Parâng plateau."
      ],
      facts: [
        { label: "Location", value: "Jiet street, DN7A, Cheile Jietului, Petrila" },
        { label: "Opened", value: "2023" },
        { label: "Facilities", value: "25+ rooms, spa, jacuzzi, sauna, salt room, restaurant, terrace" },
        { label: "Contact", value: "phone +40 738 777 711 · conaculradacinilor.ro" }
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
  },
  {
    id: "pensiunea-retezat-petrosani",
    name: "Pensiunea Retezat",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Uricani",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/pensiunea-retezat.jpg"],
    photoCredit: { author: "Pensiunea Retezat", license: "material promoțional al afacerii", source: "https://pensiunearetezat.com", sourceLabel: "pensiunearetezat.com" },
    ro: {
      tagline: "Pensiune de familie la poalele Retezatului, în Câmpu lui Neag.",
      description: [
        "Pensiunea Retezat este situată în Câmpu lui Neag (orașul Uricani), chiar la poalele masivului Retezat, la capătul drumului DN66A dinspre Petroșani. Oferă 15 camere, piscină, restaurant și terasă, fiind un punct de plecare comod pentru vizitarea Parcului Național Retezat.",
        "Pensiunea pune la dispoziția oaspeților și activități de agrement — parc de aventură, călărie și acces la piscină în sezonul cald — potrivite atât pentru familii, cât și pentru drumeți."
      ],
      facts: [
        { label: "Locație", value: "Câmpu lui Neag, orașul Uricani" },
        { label: "Facilități", value: "15 camere, piscină, restaurant, terasă" },
        { label: "Contact", value: "tel. 0722 538 551 · office@pensiunearetezat.com · pensiunearetezat.com" }
      ]
    },
    en: {
      tagline: "A family guesthouse at the foot of the Retezat, in Câmpu lui Neag.",
      description: [
        "Pensiunea Retezat is located in Câmpu lui Neag (Uricani town), right at the foot of the Retezat massif, at the end of road DN66A from Petroșani. It offers 15 rooms, a pool, restaurant and terrace, making it a convenient base for visiting Retezat National Park.",
        "The guesthouse also offers recreational activities — an adventure park, horse riding and pool access in the warm season — suited to both families and hikers."
      ],
      facts: [
        { label: "Location", value: "Câmpu lui Neag, Uricani town" },
        { label: "Facilities", value: "15 rooms, pool, restaurant, terrace" },
        { label: "Contact", value: "phone +40 722 538 551 · office@pensiunearetezat.com · pensiunearetezat.com" }
      ]
    }
  }
];
