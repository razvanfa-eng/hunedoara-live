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
  },
  {
    id: "muntii-metaliferi",
    name: "Munții Metaliferi",
    category: { ro: "Zonă montană și minieră", en: "Mining & mountain zone" },
    area: "Nord-Vest",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Partea hunedoreană a „patrulaterului aurifer” — Brad, Săcărâmb și Crișcior, minerit neîntrerupt din perioada romană până în secolul XX.",
      description: [
        "Munții Metaliferi, în nord-vestul județului, cuprind partea hunedoreană a „patrulaterului aurifer” — una dintre cele mai bogate regiuni aurifere din Europa. Brad este centrul istoric al zonei, cu propriul Muzeu al Aurului; în apropiere se află Ruda-Brad, cu o galerie minieră romană din secolele II–III d.Hr., și Crișcior, cu o biserică din secolele XIV–XV.",
        "La Săcărâmb, exploatat neîntrerupt din 1746, au fost descrise pentru prima dată în lume șase minerale, printre care silvanitul (1835) — zăcământul a fost considerat, aproape 130 de ani (1748–1876), cel mai profitabil din Europa."
      ],
      facts: [
        { label: "Localități incluse", value: "Brad, Săcărâmb, Crișcior, Ruda-Brad" },
        { label: "Reper", value: "Muzeul Aurului din Brad" },
        { label: "Curiozitate mineralogică", value: "la Săcărâmb au fost descrise 6 minerale noi pentru știință, inclusiv silvanitul (1835)" },
        { label: "Oraș principal", value: "Brad" }
      ]
    },
    en: {
      tagline: "The Hunedoara side of the \"gold quadrilateral\" — Brad, Săcărâmb and Crișcior, gold mining without interruption from Roman times to the 20th century.",
      description: [
        "The Metaliferi Mountains, in the county's north-west, hold the Hunedoara portion of the \"gold quadrilateral\" — one of Europe's richest gold-bearing regions. Brad is the area's historic centre, with its own Gold Museum; nearby lie Ruda-Brad, with a Roman mining gallery from the 2nd-3rd centuries AD, and Crișcior, with a 14th-15th century church.",
        "At Săcărâmb, worked without interruption since 1746, six minerals were described for the first time in the world, including sylvanite (1835) — the deposit was regarded, for nearly 130 years (1748-1876), as the most profitable in Europe."
      ],
      facts: [
        { label: "Towns/villages included", value: "Brad, Săcărâmb, Crișcior, Ruda-Brad" },
        { label: "Landmark", value: "Gold Museum in Brad" },
        { label: "Mineralogical curiosity", value: "6 minerals first described at Săcărâmb, including sylvanite (1835)" },
        { label: "Main town", value: "Brad" }
      ]
    }
  },
  {
    id: "tinutul-padurenilor",
    name: "Ținutul Pădurenilor",
    category: { ro: "Zonă etnografică și montană", en: "Ethnographic & mountain zone" },
    area: "Vest",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Zonă etno-folclorică arhaică pe valea Cernei Hunedorene — 40 de sate risipite pe culmi, tradiție siderurgică și port popular încă purtat la sărbători.",
      description: [
        "Ținutul Pădurenilor se întinde pe valea Cernei Hunedorene, între Culoarul Mureșului la nord, Țara Hațegului la sud și Munții Poiana Ruscă la vest — o „insulă etnografică” de circa 40 de sate și cătune, majoritatea așezate pe culmi despădurite, între 600 și 1.100 m altitudine. Ghelari, cea mai mare localitate a zonei, a dat numele tradiției de extragere a minereului de fier, topit până în 1924 la furnalul din apropiere, de la Govăjdia — primul furnal cu flux continuu din Europa.",
        "Lângă Teliucu Inferior se află Lacul Cinciș, amenajat pe Cerna la începutul anilor 1960, cu plaje și pescuit. Zona rămâne cunoscută pentru portul popular tradițional al pădurenilor, purtat încă la sărbători și evenimente."
      ],
      facts: [
        { label: "Localități incluse", value: "Ghelari, Govăjdia, Teliucu Inferior și cca. 40 de sate/cătune" },
        { label: "Delimitare", value: "Culoarul Mureșului (nord), Țara Hațegului (sud), Munții Poiana Ruscă (vest)" },
        { label: "Reper industrial", value: "Furnalul de la Govăjdia (1806–1810)" },
        { label: "Lac", value: "Lacul Cinciș (~867 ha)" }
      ]
    },
    en: {
      tagline: "An archaic ethno-folkloric zone on the Cerna Hunedoreană valley — 40 villages scattered across hilltops, an iron-making tradition and folk costume still worn at festivals.",
      description: [
        "Ținutul Pădurenilor (\"the Foresters' Land\") stretches along the Cerna Hunedoreană valley, bordered by the Mureș corridor to the north, Țara Hațegului to the south and the Poiana Ruscă Mountains to the west — an \"ethnographic island\" of about 40 villages and hamlets, most perched on deforested hilltops between 600 and 1,100 m altitude. Ghelari, the area's largest village, gave its name to the region's iron-ore mining tradition, smelted until 1924 at the nearby Govăjdia furnace — Europe's first continuous-flow blast furnace.",
        "Near Teliucu Inferior lies Lacul Cinciș, a reservoir built on the Cerna in the early 1960s, with beaches and fishing. The area remains known for the traditional folk costume of the pădureni, still worn at festivals and events."
      ],
      facts: [
        { label: "Villages included", value: "Ghelari, Govăjdia, Teliucu Inferior and about 40 villages/hamlets" },
        { label: "Bordered by", value: "Mureș corridor (north), Țara Hațegului (south), Poiana Ruscă Mountains (west)" },
        { label: "Industrial landmark", value: "Govăjdia furnace (1806-1810)" },
        { label: "Lake", value: "Lacul Cinciș (~867 ha)" }
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
  },
  {
    id: "lacul-cincis",
    name: "Lacul Cinciș",
    category: { ro: "Lac de acumulare", en: "Reservoir lake" },
    area: "Hunedoara",
    coords: [45.69, 22.86],
    hasReviews: true,
    season: "vara",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Lac de acumulare lângă Hunedoara, cu plaje, pescuit și una dintre cele mai mari suprafețe de apă artificiale din Transilvania.",
      description: [
        "Lacul Cinciș este un lac de acumulare format pe cursul râului Cerna, lângă satul Teliucu Inferior, la circa 15 km de Hunedoara, printr-un baraj construit la începutul anilor 1960 pentru alimentarea cu apă a combinatului siderurgic și a orașului. Cu o suprafață de circa 867 ha și o adâncime maximă de 48 m, este unul dintre cele mai mari lacuri artificiale din Transilvania.",
        "Malul nordic, cu plaje, contrastează cu malul sudic, împădurit și deluros. Zona s-a dezvoltat ca stațiune de interes local, cu campinguri, moteluri și pensiuni, iar lacul rămâne căutat pentru pescuit (crap, știucă, amur, șalău, caras) și înot în sezonul cald (iunie–august)."
      ],
      facts: [
        { label: "Râu / baraj", value: "Lac de acumulare pe Cerna, amenajat la începutul anilor 1960" },
        { label: "Suprafață", value: "~867 ha (8,67 km²)" },
        { label: "Adâncime maximă", value: "48 m" },
        { label: "Sezon turistic", value: "iunie–august, temperatura apei ~18°C" },
        { label: "Pești", value: "crap, știucă, amur, șalău, caras" }
      ]
    },
    en: {
      tagline: "A reservoir lake near Hunedoara, with beaches, fishing and one of Transylvania's largest artificial water surfaces.",
      description: [
        "Lacul Cinciș is a reservoir lake formed on the Cerna river near the village of Teliucu Inferior, about 15 km from Hunedoara, after a dam was built there in the early 1960s to supply water to the steel works and the city. Covering around 867 ha with a maximum depth of 48 m, it is one of the largest artificial lakes in Transylvania.",
        "The northern shore, lined with beaches, contrasts with the wooded, hilly southern shore. The area developed into a local resort, with campsites, motels and guesthouses, and the lake remains popular for fishing (carp, pike, amur, pike-perch, crucian carp) and swimming in the warm season (June–August)."
      ],
      facts: [
        { label: "River / dam", value: "Reservoir lake on the Cerna, built in the early 1960s" },
        { label: "Surface area", value: "~867 ha (8.67 km²)" },
        { label: "Maximum depth", value: "48 m" },
        { label: "Tourist season", value: "June–August, water temperature ~18°C" },
        { label: "Fish species", value: "carp, pike, amur, pike-perch, crucian carp" }
      ]
    }
  },
  {
    id: "padurea-bejan",
    name: "Pădurea Bejan",
    category: { ro: "Rezervație naturală", en: "Nature reserve" },
    area: "Deva",
    coords: [45.8517, 22.8889],
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Rezervație forestieră de 70 ha lângă Deva, unde coexistă opt din cele nouă specii native de stejar din România.",
      description: [
        "Pădurea Bejan este o rezervație naturală de tip forestier declarată prin Legea nr. 5 din 6 martie 2000, cu o suprafață de 70 ha, situată pe teritoriul administrativ al Devei, pe drumul județean DJ708E dinspre Almașu Sec. Este încadrată în categoria IV IUCN (arie de gestionare a habitatelor/speciilor).",
        "Valoarea ei științifică vine din coexistența a opt din cele nouă specii native de stejar din România, care au dat naștere, de-a lungul timpului, unor hibrizi rar întâlniți în altă parte. Printre plantele rare identificate aici se numără frăsinelul (Dictamnus albus), iar dintre animale — căprior, jder, iepure de câmp, șarpele lui Esculap și buhaiul de baltă cu burta galbenă."
      ],
      facts: [
        { label: "Suprafață", value: "70 ha" },
        { label: "Statut", value: "Rezervație naturală (Legea nr. 5/2000), categoria IUCN IV" },
        { label: "Valoare științifică", value: "8 din cele 9 specii native de stejar din România" },
        { label: "Acces", value: "DJ708E, lângă Deva" }
      ]
    },
    en: {
      tagline: "A 70 ha forest reserve near Deva, home to eight of Romania's nine native oak species growing side by side.",
      description: [
        "Pădurea Bejan is a forest-type nature reserve declared under Law no. 5 of 6 March 2000, covering 70 ha within Deva's administrative territory, on county road DJ708E from Almașu Sec. It is classified as IUCN category IV (habitat/species management area).",
        "Its scientific value comes from the coexistence of eight of Romania's nine native oak (Quercus) species, which over time have produced hybrids rarely found elsewhere. Rare plants recorded here include fraxinella (Dictamnus albus), while the fauna includes roe deer, pine marten, European hare, the Aesculapian snake and the yellow-bellied toad."
      ],
      facts: [
        { label: "Area", value: "70 ha" },
        { label: "Status", value: "Nature reserve (Law no. 5/2000), IUCN category IV" },
        { label: "Scientific value", value: "8 of Romania's 9 native oak species" },
        { label: "Access", value: "DJ708E, near Deva" }
      ]
    }
  },
  {
    id: "parcul-dendrologic-simeria",
    name: "Parcul Dendrologic Simeria",
    category: { ro: "Parc dendrologic", en: "Dendrological park" },
    area: "Simeria",
    coords: [45.8569, 23.0110],
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Cel mai vechi și mai mare parc dendrologic din România, cu peste 2.100 de specii de arbori și arbuști pe cca 70 de hectare.",
      description: [
        "Arboretumul Simeria s-a dezvoltat din parcul conacului familiei Gyulay, documentat din 1763, pe malul stâng al Mureșului. După naționalizare, în 1949 a fost transformat oficial în parc dendrologic și dat în administrarea unei stațiuni de cercetare silvică, funcție păstrată și azi.",
        "Colecția, adunată din Europa, America de Nord și Asia, este considerată una dintre cele mai valoroase din România și cuprinde exemplare rare, printre care arbori seculari. Parcul e monument al naturii și se vizitează cu bilet de intrare, pe alei amenajate."
      ],
      facts: [
        { label: "Suprafață", value: "cca 70 ha" },
        { label: "Specii", value: "peste 2.100 de specii de arbori și arbuști" },
        { label: "Documentat din", value: "1763 (parcul conacului Gyulay)" },
        { label: "Devenit parc dendrologic", value: "1949" }
      ]
    },
    en: {
      tagline: "Romania's oldest and largest dendrological park, with over 2,100 tree and shrub species on about 70 hectares.",
      description: [
        "Simeria Arboretum grew out of the Gyulay family manor park, documented since 1763, on the left bank of the Mureș river. After nationalisation, it was officially turned into a dendrological park in 1949 and placed under a forestry research station, a role it still holds today.",
        "The collection, gathered from Europe, North America and Asia, is considered one of Romania's most valuable and includes rare specimens, among them centuries-old trees. The park is a protected natural monument and is visited on marked paths with an entrance ticket."
      ],
      facts: [
        { label: "Area", value: "about 70 ha" },
        { label: "Species", value: "over 2,100 tree and shrub species" },
        { label: "Documented since", value: "1763 (the Gyulay manor park)" },
        { label: "Became a dendrological park", value: "1949" }
      ]
    }
  },
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
  },
  {
    id: "parcul-cetatii-deva",
    name: "Parcul Cetății Deva",
    category: { ro: "Parc & acces cetate", en: "Park & citadel access" },
    area: "Deva",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Parcul de la poalele Cetății Deva — punctul de plecare pentru potecile pietonale, telecabină și minibuzul electric spre platoul cetății.",
      description: [
        "Parcul Cetății se întinde la baza dealului vulcanic pe care se află Cetatea Deva și este punctul de plecare pentru mai multe poteci pietonale marcate spre platoul cetății, un urcuș de aproximativ 40 de minute, de dificultate medie, pe pietriș și trepte.",
        "Telecabina, funcțională din 2003, are un traseu de 278 m lungime, o diferență de nivel de 158 m și cabine de 30 de locuri. Ca alternativă — inclusiv atunci când telecabina nu funcționează — circulă un minibuz electric de 22 de locuri, de regulă zilnic între 09:00 și 18:00, cu variații sezoniere. Parcarea la baza dealului este gratuită."
      ],
      facts: [
        { label: "Poteci pietonale", value: "~40 min, dificultate medie" },
        { label: "Telecabină", value: "din 2003, 278 m lungime, diferență de nivel 158 m, cabine de 30 locuri" },
        { label: "Minibuz electric (alternativ)", value: "22 locuri, de regulă 09:00–18:00" },
        { label: "Parcare", value: "gratuită, la baza dealului" }
      ]
    },
    en: {
      tagline: "The park at the foot of Deva Citadel — the starting point for the walking trails, cable car and electric minibus up to the citadel plateau.",
      description: [
        "Parcul Cetății spreads at the base of the volcanic hill that Deva Citadel sits on, and is the starting point for several marked walking trails up to the citadel plateau, a climb of about 40 minutes, moderate difficulty, on gravel paths and steps.",
        "The cable car, running since 2003, covers a 278 m route with a 158 m height difference, in 30-person cabins. As an alternative — including whenever the cable car is not running — a 22-seat electric minibus operates, generally daily between 09:00 and 18:00, with seasonal variations. Parking at the base of the hill is free."
      ],
      facts: [
        { label: "Walking trails", value: "~40 min, moderate difficulty" },
        { label: "Cable car", value: "since 2003, 278 m route, 158 m height difference, 30-seat cabins" },
        { label: "Electric minibus (alternative)", value: "22 seats, generally 09:00–18:00" },
        { label: "Parking", value: "free, at the base of the hill" }
      ]
    }
  }
,
  {
    id: "traseu-pui-rausor",
    name: "Traseul Pui – Baza Salvamont Râușor",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parcul Național Retezat",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu lung de acces dinspre Pui spre baza Salvamont Râușor, la poalele nordice ale Retezatului.",
      description: [
        "Traseul, marcat cu bandă roșie, leagă satul Pui de baza Salvamont Râușor, punct de plecare pentru mai multe trasee spre creasta principală a Retezatului.",
        "Cu o durată de 15–16 ore, e parcurs de regulă în etape, nu într-o singură zi."
      ],
      facts: [
        { label: "Punct de plecare", value: "Pui" },
        { label: "Marcaj", value: "Bandă roșie" },
        { label: "Durată", value: "15–16 ore" }
      ]
    },
    en: {
      tagline: "Long access route from Pui to the Râușor Salvamont base, on the northern edge of the Retezat massif.",
      description: [
        "Marked with a red band, the trail connects the village of Pui to the Râușor Salvamont base, a starting point for several routes toward the main Retezat ridge.",
        "At 15–16 hours, it is usually covered in stages rather than in a single day."
      ],
      facts: [
        { label: "Starting point", value: "Pui" },
        { label: "Marking", value: "Red band" },
        { label: "Duration", value: "15–16 hours" }
      ]
    }
  },
  {
    id: "traseu-pietrele-varful-mare",
    name: "Traseul Cabana Pietrele – Vârful Mare (Retezat)",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parcul Național Retezat",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Urcare de o zi de la Cabana Pietrele la Vârful Mare, unul dintre vârfurile secundare importante ale masivului.",
      description: [
        "Marcat cu triunghi roșu (cu tronsoane pe punct roșu), traseul pornește de la Cabana Pietrele (1.480 m) și urcă în circa 4 ore spre Vârful Mare.",
        "Face parte din rețeaua de trasee care converg spre Cabana Pietrele, cel mai folosit punct de acces în partea nordică a Parcului Național Retezat."
      ],
      facts: [
        { label: "Punct de plecare", value: "Cabana Pietrele (1.480 m)" },
        { label: "Marcaj", value: "Triunghi roșu / punct roșu" },
        { label: "Durată", value: "cca. 4 ore" }
      ]
    },
    en: {
      tagline: "A day climb from Cabana Pietrele to Vârful Mare, one of the massif's important secondary peaks.",
      description: [
        "Marked with a red triangle (with red-dot sections), the trail starts at Cabana Pietrele (1,480 m) and climbs for about 4 hours to Vârful Mare.",
        "It's part of the network of trails converging on Cabana Pietrele, the busiest access point in the northern part of Retezat National Park."
      ],
      facts: [
        { label: "Starting point", value: "Cabana Pietrele (1,480 m)" },
        { label: "Marking", value: "Red triangle / red dot" },
        { label: "Duration", value: "about 4 hours" }
      ]
    }
  },
  {
    id: "traseu-pietrele-saua-pelegii",
    name: "Traseul Cabana Pietrele – Șaua Pelegii",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parcul Național Retezat",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu de creastă de la Cabana Pietrele la Șaua Pelegii, punct de legătură spre mai multe văi ale Retezatului.",
      description: [
        "Marcat cu triunghi galben, traseul urcă de la Cabana Pietrele (1.480 m) la Șaua Pelegii în circa 3 ore.",
        "Șaua Pelegii e un nod important de trasee, unde se întâlnesc rutele dinspre Lacul Galeș și dinspre Baleia."
      ],
      facts: [
        { label: "Punct de plecare", value: "Cabana Pietrele (1.480 m)" },
        { label: "Marcaj", value: "Triunghi galben" },
        { label: "Durată", value: "cca. 3 ore" }
      ]
    },
    en: {
      tagline: "A ridge route from Cabana Pietrele to Șaua Pelegii, a junction point for several Retezat valleys.",
      description: [
        "Marked with a yellow triangle, the trail climbs from Cabana Pietrele (1,480 m) to Șaua Pelegii in about 3 hours.",
        "Șaua Pelegii is a major trail junction, where routes from Lacul Galeș and from Baleia meet."
      ],
      facts: [
        { label: "Starting point", value: "Cabana Pietrele (1,480 m)" },
        { label: "Marking", value: "Yellow triangle" },
        { label: "Duration", value: "about 3 hours" }
      ]
    }
  },
  {
    id: "traseu-lacul-gales-saua-pelegii",
    name: "Traseul Lacul Galeș – Șaua Pelegii",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parcul Național Retezat",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Legătură scurtă dinspre valea Râușorului (Lacul Galeș) spre Șaua Pelegii, în versantul nordic al Retezatului.",
      description: [
        "Marcat cu cruce roșie, traseul leagă Lacul Galeș, în valea Râușorului, de Șaua Pelegii, în circa 2 ore.",
        "E un traseu scurt, folosit mai ales ca variantă de acces dinspre Baza Salvamont Râușor."
      ],
      facts: [
        { label: "Punct de plecare", value: "Lacul Galeș (valea Râușorului)" },
        { label: "Marcaj", value: "Cruce roșie" },
        { label: "Durată", value: "cca. 2 ore" }
      ]
    },
    en: {
      tagline: "A short link from the Râușor valley (Lacul Galeș) to Șaua Pelegii, on the northern slope of Retezat.",
      description: [
        "Marked with a red cross, the trail connects Lacul Galeș, in the Râușor valley, to Șaua Pelegii, in about 2 hours.",
        "It's a short route, mostly used as an access variant from the Râușor Salvamont base."
      ],
      facts: [
        { label: "Starting point", value: "Lacul Galeș (Râușor valley)" },
        { label: "Marking", value: "Red cross" },
        { label: "Duration", value: "about 2 hours" }
      ]
    }
  },
  {
    id: "traseu-cetatea-colt",
    name: "Traseul Valea Nucșoara – Cetatea Colț",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Râu de Mori",
    hasReviews: true,
    images: ["images/cetatea-colt.jpg"],
    photoCredit: { author: "Razvan Socol", license: "CC BY-SA 3.0 RO", source: "https://commons.wikimedia.org/wiki/File:Cetatea_Col%C8%9B.JPG" },
    ro: {
      tagline: "Cel mai scurt și accesibil traseu marcat la marginea Retezatului: o oră până la ruinele Cetății Colț.",
      description: [
        "Marcat cu triunghi albastru, traseul urcă din valea Nucșoara până la Cetatea Colț, ruinele unei cetăți medievale ridicate de familia nobiliară română Cândea în secolul al XIV-lea, pe o stâncă ce domină satul Suseni.",
        "Cu doar o oră de mers, e unul dintre puținele trasee din zona Retezatului potrivit și pentru familii cu copii."
      ],
      facts: [
        { label: "Punct de plecare", value: "Valea Nucșoara" },
        { label: "Marcaj", value: "Triunghi albastru" },
        { label: "Durată", value: "cca. 1 oră" }
      ]
    },
    en: {
      tagline: "The shortest, most accessible marked trail at the edge of Retezat: an hour up to the Colț Citadel ruins.",
      description: [
        "Marked with a blue triangle, the trail climbs from the Nucșoara valley to Cetatea Colț, the ruins of a medieval fortress built by the Romanian noble Cândea family in the 14th century, on a rock overlooking the village of Suseni.",
        "At only an hour long, it's one of the few trails around Retezat also suitable for families with children."
      ],
      facts: [
        { label: "Starting point", value: "Nucșoara valley" },
        { label: "Marking", value: "Blue triangle" },
        { label: "Duration", value: "about 1 hour" }
      ]
    }
  },
  {
    id: "traseu-rau-de-mori-varful-retezat",
    name: "Traseul Râu de Mori – Vârful Retezat",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parcul Național Retezat",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Ascensiune lungă dinspre sud, din satul Râu de Mori, direct spre Vârful Retezat.",
      description: [
        "Marcat cu triunghi roșu, traseul urcă din Râu de Mori spre Vârful Retezat în 7–8 ore, pe versantul sudic al masivului, mai puțin umblat decât rutele dinspre Cabana Pietrele.",
        "E o variantă solicitantă pentru cei care vor să evite aglomerația din nordul parcului."
      ],
      facts: [
        { label: "Punct de plecare", value: "Râu de Mori" },
        { label: "Marcaj", value: "Triunghi roșu" },
        { label: "Durată", value: "7–8 ore" }
      ]
    },
    en: {
      tagline: "A long ascent from the south, starting in the village of Râu de Mori, straight up to Vârful Retezat.",
      description: [
        "Marked with a red triangle, the trail climbs from Râu de Mori to Vârful Retezat in 7–8 hours, on the massif's southern slope, quieter than the routes from Cabana Pietrele.",
        "It's a demanding alternative for those wanting to avoid the crowds in the northern part of the park."
      ],
      facts: [
        { label: "Starting point", value: "Râu de Mori" },
        { label: "Marking", value: "Red triangle" },
        { label: "Duration", value: "7–8 hours" }
      ]
    }
  },
  {
    id: "traseu-gura-zlata-lacul-bucura",
    name: "Traseul Cabana Gura Zlata – Lacul Bucura",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parcul Național Retezat",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Ruta de acces dinspre vest, prin Cabana Gura Zlata, spre Lacul Bucura.",
      description: [
        "Marcat cu triunghi roșu, traseul pornește de la Cabana Gura Zlata (775 m), în partea vestică a masivului, și ajunge la Lacul Bucura în circa 8 ore.",
        "E cel mai lung dintre traseele principale de acces spre Bucura, dar traversează o zonă mai puțin circulată a parcului."
      ],
      facts: [
        { label: "Punct de plecare", value: "Cabana Gura Zlata (775 m)" },
        { label: "Marcaj", value: "Triunghi roșu" },
        { label: "Durată", value: "cca. 8 ore" }
      ]
    },
    en: {
      tagline: "The western access route, via Cabana Gura Zlata, up to Bucura Lake.",
      description: [
        "Marked with a red triangle, the trail starts at Cabana Gura Zlata (775 m), on the western side of the massif, and reaches Bucura Lake in about 8 hours.",
        "It's the longest of the main access routes to Bucura, but crosses a quieter part of the park."
      ],
      facts: [
        { label: "Starting point", value: "Cabana Gura Zlata (775 m)" },
        { label: "Marking", value: "Red triangle" },
        { label: "Duration", value: "about 8 hours" }
      ]
    }
  },
  {
    id: "traseu-lacul-bucura-circuit",
    name: "Traseul circular al Lacului Bucura",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parcul Național Retezat",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Tur circular de o zi în jurul zonei Lacului Bucura, cel mai mare lac glaciar din România.",
      description: [
        "Marcat cu punct roșu, circuitul de 11 ore ocolește zona lacurilor din jurul Bucurei, cu priveliști spre principalele vârfuri din jur.",
        "E potrivit celor care înnoptează în zonă (cort sau refugiu) și vor să exploreze bazinul glaciar fără să se limiteze la un singur vârf."
      ],
      facts: [
        { label: "Zonă", value: "Lacul Bucura" },
        { label: "Marcaj", value: "Punct roșu" },
        { label: "Durată", value: "cca. 11 ore" }
      ]
    },
    en: {
      tagline: "A day-long loop around the Bucura Lake area, Romania's largest glacial lake.",
      description: [
        "Marked with a red dot, the 11-hour circuit loops around the lake basin near Bucura, with views of the surrounding main peaks.",
        "It suits those camping or staying in a refuge nearby who want to explore the glacial basin rather than just reach a single peak."
      ],
      facts: [
        { label: "Area", value: "Bucura Lake" },
        { label: "Marking", value: "Red dot" },
        { label: "Duration", value: "about 11 hours" }
      ]
    }
  },
  {
    id: "traseu-baru-varful-tulisa",
    name: "Traseul Baru – Vârful Tulișa",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Baru Mare",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu din partea sudică a Retezatului, dinspre Baru, spre Vârful Tulișa.",
      description: [
        "Marcat cu cruce galbenă, traseul pornește din Baru și urcă spre Vârful Tulișa în 4–5 ore.",
        "E o rută mai puțin cunoscută decât cele dinspre Cabana Pietrele, potrivită celor care pornesc din zona Hațeg–Baru Mare."
      ],
      facts: [
        { label: "Punct de plecare", value: "Baru" },
        { label: "Marcaj", value: "Cruce galbenă" },
        { label: "Durată", value: "4–5 ore" }
      ]
    },
    en: {
      tagline: "A trail from the southern side of Retezat, from Baru up to Vârful Tulișa.",
      description: [
        "Marked with a yellow cross, the trail starts in Baru and climbs to Vârful Tulișa in 4–5 hours.",
        "It's a lesser-known route than those from Cabana Pietrele, suited to those starting from the Hațeg–Baru Mare area."
      ],
      facts: [
        { label: "Starting point", value: "Baru" },
        { label: "Marking", value: "Yellow cross" },
        { label: "Duration", value: "4–5 hours" }
      ]
    }
  },
  {
    id: "traseu-cheile-butii-cabana-buta",
    name: "Traseul Cheile Buții – Cabana Buta",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Vâlcan",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu lung prin Munții Vâlcan, de la Cheile Buții la Cabana Buta, peste vârfurile Pleșa și Piule.",
      description: [
        "Marcat cu bandă galbenă, traseul pornește de la complexul turistic Cheile Buții și trece prin Dâlma Mare, Vârful Pleșa și Vârful Piule înainte de a coborî la Cabana Buta, prin Șaua Scorota.",
        "Cu o durată de 8–9 ore, leagă practic zona Cheilor Buții de rețeaua de trasee din Retezat."
      ],
      facts: [
        { label: "Punct de plecare", value: "Complex turistic Cheile Buții" },
        { label: "Marcaj", value: "Bandă galbenă" },
        { label: "Durată", value: "8–9 ore" }
      ]
    },
    en: {
      tagline: "A long route through the Vâlcan Mountains, from Cheile Buții to Cabana Buta, over Pleșa and Piule peaks.",
      description: [
        "Marked with a yellow band, the trail starts at the Cheile Buții tourist complex and passes Dâlma Mare, Vârful Pleșa and Vârful Piule before descending to Cabana Buta via Șaua Scorota.",
        "At 8–9 hours, it effectively links the Buții Gorge area to the Retezat trail network."
      ],
      facts: [
        { label: "Starting point", value: "Cheile Buții tourist complex" },
        { label: "Marking", value: "Yellow band" },
        { label: "Duration", value: "8–9 hours" }
      ]
    }
  },
  {
    id: "traseu-campusel-saua-scorota",
    name: "Traseul Câmpușel – Șaua Scorota – Cabana Buta",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Vâlcan",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Variantă mai scurtă de acces la Cabana Buta, dinspre Câmpușel, prin Șaua Scorota.",
      description: [
        "Marcat cu punct galben, traseul urcă din Câmpușel prin Scocul Scorotei și Stâna Scorota până la Șaua Scorota, apoi la Cabana Buta, în 4–5 ore.",
        "E alternativa mai rapidă la traseul dinspre Cheile Buții, pentru cei care pornesc direct din Câmpușel."
      ],
      facts: [
        { label: "Punct de plecare", value: "Câmpușel" },
        { label: "Marcaj", value: "Punct galben" },
        { label: "Durată", value: "4–5 ore" }
      ]
    },
    en: {
      tagline: "A shorter access route to Cabana Buta, from Câmpușel via Șaua Scorota.",
      description: [
        "Marked with a yellow dot, the trail climbs from Câmpușel through Scocul Scorotei and Stâna Scorota up to Șaua Scorota, then on to Cabana Buta, in 4–5 hours.",
        "It's the faster alternative to the Cheile Buții route, for those starting directly from Câmpușel."
      ],
      facts: [
        { label: "Starting point", value: "Câmpușel" },
        { label: "Marking", value: "Yellow dot" },
        { label: "Duration", value: "4–5 hours" }
      ]
    }
  },
  {
    id: "traseu-culmea-branu-varful-gugu",
    name: "Traseul Culmea Branu – Vârful Gugu – Lacul lui Iovan",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Godeanu",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traversare lungă și solicitantă prin Munții Godeanu, cu un tronson parțial nemarcat.",
      description: [
        "Marcat cu cruce roșie, traseul pornește de la Lacul Gura Apei, urcă pe Culmea Branu spre Vârful Gugu și Vârful Moraru, apoi coboară prin Șaua Mâțului spre Lacul lui Iovan, în 12–13 ore.",
        "Atenție: potrivit Salvamont Hunedoara, tronsonul dintre Vârful Gugu și Vârful Bulzului este parțial nemarcat — recomandat doar cu hartă/GPS și experiență montană."
      ],
      facts: [
        { label: "Punct de plecare", value: "Lacul Gura Apei" },
        { label: "Marcaj", value: "Cruce roșie (parțial nemarcat între Vf. Gugu și Vf. Bulzului)" },
        { label: "Durată", value: "12–13 ore" }
      ]
    },
    en: {
      tagline: "A long, demanding traverse through the Godeanu Mountains, with a partly unmarked section.",
      description: [
        "Marked with a red cross, the trail starts at Lacul Gura Apei, climbs the Branu ridge to Vârful Gugu and Vârful Moraru, then descends via Șaua Mâțului to Lacul lui Iovan, in 12–13 hours.",
        "Caution: according to Salvamont Hunedoara, the stretch between Vârful Gugu and Vârful Bulzului is partly unmarked — recommended only with a map/GPS and mountain experience."
      ],
      facts: [
        { label: "Starting point", value: "Lacul Gura Apei" },
        { label: "Marking", value: "Red cross (partly unmarked between Vf. Gugu and Vf. Bulzului)" },
        { label: "Duration", value: "12–13 hours" }
      ]
    }
  },
  {
    id: "traseu-creasta-valcan-straja-oslea",
    name: "Traseul de creastă Vâlcan – Straja – Oslea",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Vâlcan",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traversarea de creastă a Munților Vâlcan, pe la Vârful Straja, cel mai lung traseu marcat din zonă.",
      description: [
        "Marcat cu bandă roșie, traseul urmărește creasta principală a Munților Vâlcan de la Gambrinus (Lupeni), peste vârfurile Drăgoiu, Straja, Mutu, Muncel, Siglăul Mic și Mare, Arcanu și Nedeița, până la Coada Oslei și Câmpușel.",
        "Cu 24–25 de ore de mers, e parcurs de regulă în mai multe etape; trece chiar pe lângă Vârful Straja, cunoscut mai ales pentru stațiunea de schi de pe versantul opus."
      ],
      facts: [
        { label: "Punct de plecare", value: "Gambrinus (Lupeni)" },
        { label: "Marcaj", value: "Bandă roșie" },
        { label: "Durată", value: "24–25 ore (mai multe etape)" }
      ]
    },
    en: {
      tagline: "The Vâlcan Mountains ridge traverse, past Vârful Straja — the longest marked trail in the area.",
      description: [
        "Marked with a red band, the trail follows the main ridge of the Vâlcan Mountains from Gambrinus (Lupeni), over Drăgoiu, Straja, Mutu, Muncel, Siglăul Mic and Mare, Arcanu and Nedeița peaks, to Coada Oslei and Câmpușel.",
        "At 24–25 hours, it's usually covered in several stages; it passes right by Vârful Straja, better known for the ski resort on its opposite slope."
      ],
      facts: [
        { label: "Starting point", value: "Gambrinus (Lupeni)" },
        { label: "Marking", value: "Red band" },
        { label: "Duration", value: "24–25 hours (multiple stages)" }
      ]
    }
  },
  {
    id: "traseu-hunedoara-lacul-cincis-cheile-cernei",
    name: "Traseul Hunedoara – Lacul Cinciș – Cheile Cernei",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Poiana Ruscă",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu de mai multe zile prin Munții Poiana Ruscă, pornind chiar din centrul Hunedoarei.",
      description: [
        "Marcat cu bandă și triunghi albastru, traseul pornește de la Centrul de Informare Turistică din Hunedoara, trece pe la Castelul Corvinilor și Lacul Cinciș, apoi urcă prin Cheile Cernei în Munții Poiana Ruscă.",
        "Cu 18–20 de ore de mers (2–3 zile), e cel mai lung dintre cele trei trasee marcate care pornesc din Hunedoara spre Poiana Ruscă."
      ],
      facts: [
        { label: "Punct de plecare", value: "Centrul de Informare Turistică Hunedoara" },
        { label: "Marcaj", value: "Bandă și triunghi albastru" },
        { label: "Durată", value: "18–20 ore (2–3 zile)" }
      ]
    },
    en: {
      tagline: "A multi-day route through the Poiana Ruscă Mountains, starting right in downtown Hunedoara.",
      description: [
        "Marked with a blue band and triangle, the trail starts at the Hunedoara Tourist Information Centre, passes Corvin Castle and Lacul Cinciș, then climbs through the Cerna Gorge into the Poiana Ruscă Mountains.",
        "At 18–20 hours (2–3 days), it's the longest of the three marked trails starting in Hunedoara toward Poiana Ruscă."
      ],
      facts: [
        { label: "Starting point", value: "Hunedoara Tourist Information Centre" },
        { label: "Marking", value: "Blue band and triangle" },
        { label: "Duration", value: "18–20 hours (2–3 days)" }
      ]
    }
  },
  {
    id: "traseu-hunedoara-varful-rusca",
    name: "Traseul Hunedoara – Lacul Cinciș – Vârful Rusca",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Poiana Ruscă",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu marcat din Hunedoara spre Vârful Rusca, cel mai înalt punct al masivului cu același nume.",
      description: [
        "Marcat cu bandă roșie, traseul pornește tot din centrul Hunedoarei, trece pe la Castelul Corvinilor și Lacul Cinciș, apoi urcă spre Vârful Rusca, în 14–16 ore.",
        "E varianta de mijloc ca durată dintre cele trei trasee marcate spre Poiana Ruscă pornite din Hunedoara."
      ],
      facts: [
        { label: "Punct de plecare", value: "Centrul de Informare Turistică Hunedoara" },
        { label: "Marcaj", value: "Bandă roșie" },
        { label: "Durată", value: "14–16 ore" }
      ]
    },
    en: {
      tagline: "A marked trail from Hunedoara up to Vârful Rusca, the highest point of the massif bearing its name.",
      description: [
        "Marked with a red band, the trail also starts in downtown Hunedoara, passes Corvin Castle and Lacul Cinciș, then climbs to Vârful Rusca in 14–16 hours.",
        "It's the medium-length option among the three marked trails to Poiana Ruscă starting from Hunedoara."
      ],
      facts: [
        { label: "Starting point", value: "Hunedoara Tourist Information Centre" },
        { label: "Marking", value: "Red band" },
        { label: "Duration", value: "14–16 hours" }
      ]
    }
  },
  {
    id: "traseu-hunedoara-dobra",
    name: "Traseul Hunedoara – Lacul Cinciș – Dobra",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Poiana Ruscă",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Cel mai lung traseu marcat din Poiana Ruscă pornit din Hunedoara, cu ieșire la Dobra.",
      description: [
        "Marcat cu bandă galbenă, traseul pornește din centrul Hunedoarei, trece pe la Castelul Corvinilor și Lacul Cinciș, traversează Munții Poiana Ruscă și coboară la Dobra, în 22–24 ore.",
        "E o traversare completă a masivului, parcursă în mai multe etape."
      ],
      facts: [
        { label: "Punct de plecare", value: "Centrul de Informare Turistică Hunedoara" },
        { label: "Marcaj", value: "Bandă galbenă" },
        { label: "Durată", value: "22–24 ore (mai multe etape)" }
      ]
    },
    en: {
      tagline: "The longest marked trail through Poiana Ruscă starting from Hunedoara, ending at Dobra.",
      description: [
        "Marked with a yellow band, the trail starts in downtown Hunedoara, passes Corvin Castle and Lacul Cinciș, crosses the Poiana Ruscă Mountains and descends to Dobra, in 22–24 hours.",
        "It's a full traverse of the massif, covered in several stages."
      ],
      facts: [
        { label: "Starting point", value: "Hunedoara Tourist Information Centre" },
        { label: "Marking", value: "Yellow band" },
        { label: "Duration", value: "22–24 hours (multiple stages)" }
      ]
    }
  },
  {
    id: "traseu-ohaba-ponor-cioclovina",
    name: "Traseul Ohaba Ponor – Peștera Ponorici-Cioclovina",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Șureanu",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu prin Cheile Șura Mare spre sistemul carstic Ponorici-Cioclovina, cea mai lungă peșteră din Munții Șureanu.",
      description: [
        "Marcat cu bandă roșie, traseul pornește din Ohaba Ponor, trece prin Cheile Șura Mare pe la Peștera Ponorici și Peștera Cioclovina, apoi ajunge la Luncani și Boșorod, în 7–8 ore.",
        "Peștera Cioclovina e cunoscută pentru descoperirea, în 1941, a unui craniu uman fosil de peste 29.000 de ani."
      ],
      facts: [
        { label: "Punct de plecare", value: "Ohaba Ponor" },
        { label: "Marcaj", value: "Bandă roșie" },
        { label: "Durată", value: "7–8 ore" }
      ]
    },
    en: {
      tagline: "A trail through the Șura Mare Gorge to the Ponorici-Cioclovina karst system, the longest cave in the Șureanu Mountains.",
      description: [
        "Marked with a red band, the trail starts in Ohaba Ponor, passes through the Șura Mare Gorge by the Ponorici and Cioclovina caves, then reaches Luncani and Boșorod, in 7–8 hours.",
        "Cioclovina Cave is known for the 1941 discovery of a fossil human skull over 29,000 years old."
      ],
      facts: [
        { label: "Starting point", value: "Ohaba Ponor" },
        { label: "Marking", value: "Red band" },
        { label: "Duration", value: "7–8 hours" }
      ]
    }
  },
  {
    id: "traseu-baru-varful-lola-porumbelu",
    name: "Traseul Baru – Vârful Lola – Vârful Porumbelu Mare",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Șureanu",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu de creastă în Munții Șureanu, pe Valea Streiului, peste vârfurile Lola și Porumbelu Mare.",
      description: [
        "Marcat cu bandă roșie, traseul pornește din Baru, urcă pe Valea Streiului și trece pe la Vârful Lola și Vârful Porumbelu Mare, în 7–8 ore.",
        "Oferă acces spre partea sud-vestică a Munților Șureanu, mai puțin circulată decât zona cetăților dacice."
      ],
      facts: [
        { label: "Punct de plecare", value: "Baru" },
        { label: "Marcaj", value: "Bandă roșie" },
        { label: "Durată", value: "7–8 ore" }
      ]
    },
    en: {
      tagline: "A ridge trail in the Șureanu Mountains, along the Strei valley, over Vârful Lola and Vârful Porumbelu Mare.",
      description: [
        "Marked with a red band, the trail starts in Baru, climbs the Strei valley and passes Vârful Lola and Vârful Porumbelu Mare, in 7–8 hours.",
        "It gives access to the south-western part of the Șureanu Mountains, quieter than the Dacian fortress area."
      ],
      facts: [
        { label: "Starting point", value: "Baru" },
        { label: "Marking", value: "Red band" },
        { label: "Duration", value: "7–8 hours" }
      ]
    }
  },
  {
    id: "traseu-costesti-sarmizegetusa-regia-varful-godeanu",
    name: "Traseul Costești – Sarmizegetusa Regia – Vârful Godeanu (Șureanu)",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Șureanu",
    hasReviews: true,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseul marcat care leagă satul Costești de capitala regatului dac, Sarmizegetusa Regia, și de Vârful Godeanu.",
      description: [
        "Marcat cu cruce roșie, traseul urcă din Costești prin Valea Grădiștei și Dealul Grădiștei până la Cetatea Sarmizegetusa Regia, apoi continuă spre Vârful Muncel și Vârful Godeanu, în 10–11 ore.",
        "Atenție: acest Vârf Godeanu se află în Munții Șureanu, lângă cetățile dacice — nu trebuie confundat cu Munții Godeanu, masivul de lângă Retezat."
      ],
      facts: [
        { label: "Punct de plecare", value: "Costești" },
        { label: "Marcaj", value: "Cruce roșie" },
        { label: "Durată", value: "10–11 ore" }
      ]
    },
    en: {
      tagline: "The marked trail linking the village of Costești to the Dacian capital, Sarmizegetusa Regia, and to Vârful Godeanu.",
      description: [
        "Marked with a red cross, the trail climbs from Costești through the Grădiștei valley and hill up to Sarmizegetusa Regia fortress, then continues to Vârful Muncel and Vârful Godeanu, in 10–11 hours.",
        "Note: this Vârful Godeanu is in the Șureanu Mountains, near the Dacian fortresses — not to be confused with the Godeanu Mountains near Retezat."
      ],
      facts: [
        { label: "Starting point", value: "Costești" },
        { label: "Marking", value: "Red cross" },
        { label: "Duration", value: "10–11 hours" }
      ]
    }
  },
  {
    id: "traseu-costesti-cetatea-blidaru-varful-godeanu",
    name: "Traseul Costești – Cetatea Blidaru – Vârful Godeanu",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Șureanu",
    hasReviews: true,
    images: ["images/cetatea-blidaru.jpg"],
    photoCredit: { author: "Oroles", license: "Domeniu public", source: "https://commons.wikimedia.org/wiki/File:Cetatea_Blidaru.JPG" },
    ro: {
      tagline: "Traseu lung prin zona cetăților dacice, de la Costești, pe la Cetatea Blidaru, până pe Vârful Godeanu.",
      description: [
        "Marcat cu bandă albastră, traseul pornește din Costești, trece pe la Cetatea Blidaru — a doua ca mărime dintre fortificațiile dacice din zonă, ridicată pe un vârf stâncos — apoi continuă prin Leurdana, Târsa, Poiana Omului, Vârful Rudii și Culmea Meleia până la Vârful Godeanu.",
        "Cu 14–15 ore de mers, e cel mai lung dintre traseele care pornesc din Costești."
      ],
      facts: [
        { label: "Punct de plecare", value: "Costești" },
        { label: "Marcaj", value: "Bandă albastră" },
        { label: "Durată", value: "14–15 ore" }
      ]
    },
    en: {
      tagline: "A long trail through the Dacian fortress area, from Costești, past Cetatea Blidaru, up to Vârful Godeanu.",
      description: [
        "Marked with a blue band, the trail starts in Costești, passes Cetatea Blidaru — the second-largest of the Dacian fortifications in the area, built atop a rocky peak — then continues through Leurdana, Târsa, Poiana Omului, Vârful Rudii and the Meleia ridge up to Vârful Godeanu.",
        "At 14–15 hours, it's the longest of the trails starting from Costești."
      ],
      facts: [
        { label: "Starting point", value: "Costești" },
        { label: "Marking", value: "Blue band" },
        { label: "Duration", value: "14–15 hours" }
      ]
    }
  },
  {
    id: "traseu-cetatea-fetele-albe",
    name: "Traseul Podul Gerosu – Cetatea Fețele Albe",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Șureanu",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Cel mai scurt traseu marcat din zona cetăților dacice, spre ruinele mai puțin vizitate de la Fețele Albe.",
      description: [
        "Marcat cu triunghi albastru, traseul urcă din zona Podul Gerosu, peste Dealul Muncelului, până la Cetatea Fețele Albe, apoi coboară pe Valea Albă, în doar 3 ore.",
        "Fețele Albe e una dintre fortificațiile dacice mai puțin cunoscute din sistemul din jurul Sarmizegetusei Regia."
      ],
      facts: [
        { label: "Punct de plecare", value: "Podul Gerosu" },
        { label: "Marcaj", value: "Triunghi albastru" },
        { label: "Durată", value: "cca. 3 ore" }
      ]
    },
    en: {
      tagline: "The shortest marked trail in the Dacian fortress area, to the lesser-visited Fețele Albe ruins.",
      description: [
        "Marked with a blue triangle, the trail climbs from the Podul Gerosu area, over Dealul Muncelului, up to Cetatea Fețele Albe, then descends via Valea Albă, in just 3 hours.",
        "Fețele Albe is one of the lesser-known Dacian fortifications in the system around Sarmizegetusa Regia."
      ],
      facts: [
        { label: "Starting point", value: "Podul Gerosu" },
        { label: "Marking", value: "Blue triangle" },
        { label: "Duration", value: "about 3 hours" }
      ]
    }
  },
  {
    id: "traseu-gradistea-cetatea-piatra-rosie-cioclovina",
    name: "Traseul Grădiștea de Munte – Cetatea Piatra Roșie – Peștera Cioclovina",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Șureanu",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu care leagă Sarmizegetusa Regia de Cetatea Piatra Roșie și de Peștera Cioclovina.",
      description: [
        "Marcat cu triunghi roșu, traseul pornește din Grădiștea de Munte, trece prin Prihodiște și Poiana Omului până la Cetatea Piatra Roșie, apoi coboară pe Valea Roșia spre Cioclovina, în 7–8 ore.",
        "Piatra Roșie e a treia mare fortificație dacică din zonă, alături de Sarmizegetusa Regia și Blidaru."
      ],
      facts: [
        { label: "Punct de plecare", value: "Grădiștea de Munte" },
        { label: "Marcaj", value: "Triunghi roșu" },
        { label: "Durată", value: "7–8 ore" }
      ]
    },
    en: {
      tagline: "A trail linking Sarmizegetusa Regia to Cetatea Piatra Roșie and to Cioclovina Cave.",
      description: [
        "Marked with a red triangle, the trail starts in Grădiștea de Munte, passes through Prihodiște and Poiana Omului to Cetatea Piatra Roșie, then descends via Valea Roșia toward Cioclovina, in 7–8 hours.",
        "Piatra Roșie is the third major Dacian fortification in the area, alongside Sarmizegetusa Regia and Blidaru."
      ],
      facts: [
        { label: "Starting point", value: "Grădiștea de Munte" },
        { label: "Marking", value: "Red triangle" },
        { label: "Duration", value: "7–8 hours" }
      ]
    }
  },
  {
    id: "traseu-telescaun-parangul-mare",
    name: "Traseul Telescaun Parâng – Vârful Parângul Mare",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parâng",
    hasReviews: true,
    images: ["images/varful-parangul-mare.jpg"],
    photoCredit: { author: "Cioboata Andrei", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Varful_Parangul_Mare_(2519m)_-_panoramio.jpg" },
    ro: {
      tagline: "Cel mai direct traseu spre Vârful Parângul Mare (2.519 m), al doilea cel mai înalt vârf din Carpații Meridionali.",
      description: [
        "Marcat cu bandă roșie, traseul pornește de la capătul telescaunului din stațiunea Parâng (1.685 m) și urcă spre Vârful Parângul Mare în 4–5 ore.",
        "Telescaunul (accesibil în circa 1 oră și jumătate de la baza pârtiei) scurtează considerabil apropierea, fiind cea mai populară cale de a ajunge pe creasta Parângului dinspre Petroșani."
      ],
      facts: [
        { label: "Punct de plecare", value: "Capătul telescaunului, stațiunea Parâng (1.685 m)" },
        { label: "Marcaj", value: "Bandă roșie" },
        { label: "Durată", value: "4–5 ore" }
      ]
    },
    en: {
      tagline: "The most direct trail to Vârful Parângul Mare (2,519 m), the second-highest peak in the Southern Carpathians.",
      description: [
        "Marked with a red band, the trail starts at the chairlift landing in the Parâng resort (1,685 m) and climbs to Vârful Parângul Mare in 4–5 hours.",
        "The chairlift (about 1.5 hours from the base) considerably shortens the approach, making this the most popular way to reach the Parâng ridge from Petroșani."
      ],
      facts: [
        { label: "Starting point", value: "Chairlift landing, Parâng resort (1,685 m)" },
        { label: "Marking", value: "Red band" },
        { label: "Duration", value: "4–5 hours" }
      ]
    }
  },
  {
    id: "traseu-telescaun-varful-carja",
    name: "Traseul Telescaun Parâng – Vârful Cârja",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parâng",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu mai scurt decât cel spre Parângul Mare, spre Vârful Cârja (2.407 m).",
      description: [
        "Marcat cu bandă roșie, traseul pornește tot de la capătul telescaunului din stațiunea Parâng (1.685 m) și urcă spre Vârful Cârja în circa 2 ore și jumătate.",
        "E o variantă mai accesibilă pentru cei care vor o ieșire pe creastă fără să meargă până pe Parângul Mare."
      ],
      facts: [
        { label: "Punct de plecare", value: "Capătul telescaunului, stațiunea Parâng (1.685 m)" },
        { label: "Marcaj", value: "Bandă roșie" },
        { label: "Durată", value: "cca. 2 ore 30 min" }
      ]
    },
    en: {
      tagline: "A shorter trail than the one to Parângul Mare, up to Vârful Cârja (2,407 m).",
      description: [
        "Marked with a red band, the trail also starts at the chairlift landing in the Parâng resort (1,685 m) and climbs to Vârful Cârja in about 2.5 hours.",
        "It's a more accessible option for those wanting a ridge outing without going all the way to Parângul Mare."
      ],
      facts: [
        { label: "Starting point", value: "Chairlift landing, Parâng resort (1,685 m)" },
        { label: "Marking", value: "Red band" },
        { label: "Duration", value: "about 2h30" }
      ]
    }
  },
  {
    id: "traseu-lacul-calcescu",
    name: "Traseul spre Lacul Câlcescu (Parâng)",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parâng",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu spre Lacul Câlcescu, cel mai mare lac glaciar din Munții Parâng.",
      description: [
        "Marcat cu bandă și cruce roșie, traseul pornește de la capătul telescaunului din stațiunea Parâng și ajunge la Lacul Câlcescu în 6–7 ore.",
        "E cel mai lung dintre traseele obișnuite dinspre stațiunea Parâng, potrivit celor care vor să vadă lacul fără să continue spre Obârșia Lotrului."
      ],
      facts: [
        { label: "Punct de plecare", value: "Capătul telescaunului, stațiunea Parâng" },
        { label: "Marcaj", value: "Bandă și cruce roșie" },
        { label: "Durată", value: "6–7 ore" }
      ]
    },
    en: {
      tagline: "A trail to Lacul Câlcescu, the largest glacial lake in the Parâng Mountains.",
      description: [
        "Marked with a red band and cross, the trail starts at the chairlift landing in the Parâng resort and reaches Lacul Câlcescu in 6–7 hours.",
        "It's the longest of the usual routes from the Parâng resort, suited to those who want to see the lake without continuing on to Obârșia Lotrului."
      ],
      facts: [
        { label: "Starting point", value: "Chairlift landing, Parâng resort" },
        { label: "Marking", value: "Red band and cross" },
        { label: "Duration", value: "6–7 hours" }
      ]
    }
  },
  {
    id: "traseu-lacurile-verzi-parang",
    name: "Traseul spre Lacurile Verzi (Parâng)",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parâng",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu dinspre Cabana Groapa Seacă spre Lacurile Verzi, în versantul hunedorean al Parângului.",
      description: [
        "Marcat cu cruce galbenă, traseul pleacă de la Cabana Groapa Seacă și ajunge la Lacurile Verzi în 3–4 ore.",
        "Cabana Groapa Seacă se atinge, la rândul ei, printr-un traseu marcat cu bandă și punct roșu de la Șaua Gruiul, punct de legătură cu traseele dinspre telescaun."
      ],
      facts: [
        { label: "Punct de plecare", value: "Cabana Groapa Seacă" },
        { label: "Marcaj", value: "Cruce galbenă" },
        { label: "Durată", value: "3–4 ore" }
      ]
    },
    en: {
      tagline: "A trail from Cabana Groapa Seacă to Lacurile Verzi, on the Hunedoara side of the Parâng massif.",
      description: [
        "Marked with a yellow cross, the trail leaves from Cabana Groapa Seacă and reaches Lacurile Verzi in 3–4 hours.",
        "Cabana Groapa Seacă is itself reached via a trail marked with a red band and dot from Șaua Gruiul, a junction with the routes from the chairlift."
      ],
      facts: [
        { label: "Starting point", value: "Cabana Groapa Seacă" },
        { label: "Marking", value: "Yellow cross" },
        { label: "Duration", value: "3–4 hours" }
      ]
    }
  },
  {
    id: "traseu-refugiul-agatat-lacul-rosiile",
    name: "Traseul spre Lacul Roșiile și Refugiul Agățat (Parâng)",
    category: { ro: "Drumeție montană", en: "Mountain hiking" },
    area: "Parâng",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Traseu scurt de la Șaua Gruiul spre Lacul Roșiile și Refugiul Agățat.",
      description: [
        "Marcat cu punct roșu, traseul leagă Șaua Gruiul de Lacul Roșiile și Refugiul Agățat în doar 1–1,5 ore.",
        "E una dintre cele mai scurte variante de ieșire pe creasta Parângului dinspre zona telescaunului."
      ],
      facts: [
        { label: "Punct de plecare", value: "Șaua Gruiul" },
        { label: "Marcaj", value: "Punct roșu" },
        { label: "Durată", value: "1–1,5 ore" }
      ]
    },
    en: {
      tagline: "A short trail from Șaua Gruiul to Lacul Roșiile and Refugiul Agățat.",
      description: [
        "Marked with a red dot, the trail links Șaua Gruiul to Lacul Roșiile and Refugiul Agățat in just 1–1.5 hours.",
        "It's one of the shortest ridge outings from the chairlift area."
      ],
      facts: [
        { label: "Starting point", value: "Șaua Gruiul" },
        { label: "Marking", value: "Red dot" },
        { label: "Duration", value: "1–1.5 hours" }
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
  },
  {
    id: "aleea-gimnastelor",
    name: "Aleea Gimnastelor",
    category: { ro: "Alee comemorativă", en: "Memorial walk" },
    area: "Deva",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Alee cu 15 busturi de bronz, inaugurată în 2008 la poalele Cetății Deva, dedicată gimnastelor și antrenorilor care au făcut din Deva un centru mondial al gimnasticii.",
      description: [
        "Aleea Gimnastelor a fost inaugurată în 2008 la baza Cetății Deva, chiar în fața sălii unde se antrenează lotul național feminin de gimnastică, lângă stația de plecare a telecabinei. Aleea are 15 busturi de bronz de circa 42-43 cm, turnate la o fabrică din București și așezate pe socluri de granit înalte de 1,80 m.",
        "Ansamblul cuprinde patru busturi de antrenori — cuplurile Marta și Bela Karolyi, respectiv Maria Bitang și Octavian Belu — și 11 busturi de gimnaste, printre care Nadia Comăneci, Lavinia Agache, Ecaterina Szabo, Daniela Silivaș, Monica Roșu și Andreea Răducan. Aleea marchează palmaresul școlii de gimnastică de la Deva, unde s-a mutat lotul național în 1978, de la Onești."
      ],
      facts: [
        { label: "Inaugurare", value: "2008" },
        { label: "Compoziție", value: "15 busturi de bronz (4 antrenori + 11 gimnaste)" },
        { label: "Antrenori comemorați", value: "Marta și Bela Karolyi, Maria Bitang și Octavian Belu" },
        { label: "Amplasare", value: "la poalele Cetății Deva, lângă stația telecabinei" }
      ]
    },
    en: {
      tagline: "A row of 15 bronze busts, unveiled in 2008 at the foot of Deva Citadel, honouring the gymnasts and coaches who made Deva a world centre of gymnastics.",
      description: [
        "Aleea Gimnastelor (\"the gymnasts' walk\") was unveiled in 2008 at the base of Deva Citadel, right in front of the hall where the national women's gymnastics team trains, next to the cable car's lower station. The walk has 15 bronze busts about 42-43 cm tall, cast at a foundry in Bucharest and set on 1.80 m granite pedestals.",
        "The ensemble includes four busts of coaches — the couples Marta and Bela Karolyi, and Maria Bitang and Octavian Belu — and 11 busts of gymnasts, including Nadia Comăneci, Lavinia Agache, Ecaterina Szabo, Daniela Silivaș, Monica Roșu and Andreea Răducan. The walk marks the record of Deva's gymnastics school, where the national team moved in 1978, from Onești."
      ],
      facts: [
        { label: "Unveiled", value: "2008" },
        { label: "Composition", value: "15 bronze busts (4 coaches + 11 gymnasts)" },
        { label: "Coaches honoured", value: "Marta and Bela Karolyi, Maria Bitang and Octavian Belu" },
        { label: "Location", value: "at the foot of Deva Citadel, by the cable car station" }
      ]
    }
  },
  {
    id: "muzeul-civilizatiei-dacice-si-romane-deva",
    name: "Muzeul Civilizației Dacice și Romane — Magna Curia",
    category: { ro: "Muzeu", en: "Museum" },
    area: "Deva",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Palatul baroc Magna Curia, în centrul Devei, găzduiește colecțiile de istorie ale Muzeului Civilizației Dacice și Romane și un lapidariu cu peste o sută de piese arheologice.",
      description: [
        "Magna Curia este un monument istoric de categorie A, ridicat inițial ca reședință a principelui Transilvaniei Gabriel Bethlen și a soției sale Susana, care au modificat substanțial clădirea între 1614 și 1618. La mijlocul secolului al XVIII-lea, guvernatorul Transilvaniei Ioan Haller și soția sa, Sofia Dániel, au transformat-o în palat baroc, înfățișare păstrată până azi. Clădirea se află pe Bulevardul 1 Decembrie nr. 39.",
        "Aici sunt expuse secțiile de istorie și numismatică ale Muzeului Civilizației Dacice și Romane — piese preistorice, dacice, romane și medievale timpurii, alături de colecții de etnografie și de științe naturale (botanică, paleontologie, mineralogie). În spatele palatului se află Lapidariul, o structură de sticlă cu peste o sută de piese arheologice masive, organizate în cinci săli tematice."
      ],
      facts: [
        { label: "Adresă", value: "Bd. 1 Decembrie nr. 39, Deva" },
        { label: "Clădire", value: "Palatul Magna Curia (Bethlen), monument istoric categoria A" },
        { label: "Transformare barocă", value: "mijlocul secolului XVIII, guvernatorul Ioan Haller" },
        { label: "Colecții", value: "arheologie, etnografie, numismatică, științe naturale; Lapidariul (100+ piese)" }
      ]
    },
    en: {
      tagline: "The baroque Magna Curia palace, in central Deva, houses the history collections of the Museum of Dacian and Roman Civilisation and a lapidarium with over a hundred archaeological pieces.",
      description: [
        "Magna Curia is a category A historic monument, originally built as a residence for Transylvanian prince Gabriel Bethlen and his wife Susana, who substantially altered the building between 1614 and 1618. In the mid-18th century, Transylvania's governor Ioan Haller and his wife, Sofia Dániel, turned it into a baroque palace, an appearance preserved to this day. The building stands at 39, 1 Decembrie Boulevard.",
        "It houses the history and numismatics sections of the Museum of Dacian and Roman Civilisation — prehistoric, Dacian, Roman and early medieval pieces, alongside ethnography and natural sciences collections (botany, palaeontology, mineralogy). Behind the palace stands the Lapidarium, a glass structure with over a hundred massive archaeological pieces, arranged in five themed rooms."
      ],
      facts: [
        { label: "Address", value: "39, 1 Decembrie Blvd., Deva" },
        { label: "Building", value: "Magna Curia (Bethlen) Palace, category A historic monument" },
        { label: "Baroque conversion", value: "mid-18th century, governor Ioan Haller" },
        { label: "Collections", value: "archaeology, ethnography, numismatics, natural sciences; the Lapidarium (100+ pieces)" }
      ]
    }
  },
  {
    id: "muzeul-etnografie-orastie",
    name: "Muzeul de Etnografie și Artă Populară Orăștie",
    category: { ro: "Muzeu", en: "Museum" },
    area: "Orăștie",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Colecție de etnografie și artă populară de aproape 8.000 de piese, într-o clădire-monument istoric din centrul orașului.",
      description: [
        "Muzeul a fost înființat în 1952, din inițiativa unui grup de entuziaști locali care au strâns primele colecții. În 1974, profilul instituției s-a reorientat spre artă populară, iar din 1991 funcționează ca secție a Muzeului Civilizației Dacice și Romane Deva. Clădirea în care funcționează, din prima jumătate a secolului XX, este ea însăși monument istoric.",
        "Colecția, de circa 8.000 de bunuri culturale, cuprinde piese de etnografie și artă populară (unelte, ceramică, costume, icoane pe lemn și sticlă), alături de fonduri de istorie, arheologie și numismatică, plus o bibliotecă documentară de aproximativ 5.000 de volume."
      ],
      facts: [
        { label: "Adresă", value: "Piața Aurel Vlaicu nr. 1, Orăștie" },
        { label: "Program", value: "Mar–Dum 10:00–18:00 (mar–oct), 9:00–17:00 (nov–feb); luni închis" },
        { label: "Înființat", value: "1952" },
        { label: "Colecție", value: "~8.000 de piese (etnografie, istorie, arheologie, numismatică)" }
      ]
    },
    en: {
      tagline: "A collection of nearly 8,000 ethnographic and folk-art items, in a historic-monument building downtown.",
      description: [
        "The museum was founded in 1952, on the initiative of a group of local enthusiasts who assembled its first collections. In 1974 its focus shifted toward folk art, and since 1991 it has operated as a section of the Museum of Dacian and Roman Civilisation in Deva. The building it occupies, dating from the first half of the 20th century, is itself a listed historic monument.",
        "The collection, of about 8,000 cultural items, includes ethnographic and folk-art pieces (tools, ceramics, costumes, icons on wood and glass), alongside history, archaeology and numismatics holdings, plus a documentary library of roughly 5,000 volumes."
      ],
      facts: [
        { label: "Address", value: "Piața Aurel Vlaicu no. 1, Orăștie" },
        { label: "Hours", value: "Tue–Sun 10:00–18:00 (Mar–Oct), 9:00–17:00 (Nov–Feb); closed Mondays" },
        { label: "Founded", value: "1952" },
        { label: "Collection", value: "~8,000 items (ethnography, history, archaeology, numismatics)" }
      ]
    }
  },
  {
    id: "cetatea-medievala-orastie",
    name: "Cetatea medievală a Orăștiei",
    category: { ro: "Cetate medievală", en: "Medieval fortress" },
    area: "Orăștie",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Fortificație săsească din secolul XII, redeschisă publicului în 2024 după trei ani de restaurare.",
      description: [
        "Cetatea medievală a Orăștiei datează din secolul XII, de la sosirea primilor coloniști sași, și a servit drept reședință a unor grafi (conducători) ai comunității săsești locale. De-a lungul secolelor a trecut prin numeroase asedii, incendii și refaceri: a fost prădată de tătari la mijlocul secolului XIII și devastată de turci la începutul secolului XV și din nou la mijlocul secolului XVII.",
        "Restaurată între toamna anului 2021 și septembrie 2024, cu fonduri europene, cetatea și-a redeschis porțile chiar în anul în care Orăștie a marcat 800 de ani de la prima atestare documentară. În incinta ei se află o rotondă din piatră veche de aproape 1.000 de ani — una dintre cele mai vechi construcții de acest tip din România —, două biserici istorice (reformată și evanghelică) și un muzeu dedicat civilizației dacice, amenajat într-o clădire din secolul XIX, fostul spital al orașului."
      ],
      facts: [
        { label: "Vechime", value: "secolul XII (cca. 8 secole)" },
        { label: "Restaurare", value: "2021–2024 (3 ani, fonduri europene)" },
        { label: "Redeschidere", value: "septembrie 2024, la 800 de ani de atestare documentară a Orăștiei" },
        { label: "Ce cuprinde", value: "rotondă de cca. 1.000 de ani, biserica reformată, biserica evanghelică, muzeu dacic" }
      ]
    },
    en: {
      tagline: "A 12th-century Saxon fortification, reopened to the public in 2024 after three years of restoration.",
      description: [
        "The medieval fortress of Orăștie dates from the 12th century, from the arrival of the first Saxon colonists, and served as the seat of local Saxon community leaders (\"graefs\"). Over the centuries it went through numerous sieges, fires and rebuildings: it was plundered by the Tatars in the mid-13th century and devastated by the Ottomans in the early 15th century and again in the mid-17th century.",
        "Restored between autumn 2021 and September 2024 with EU funding, the fortress reopened its gates in the very year Orăștie marked 800 years since its first documentary mention. Inside stands a nearly 1,000-year-old stone rotunda — one of the oldest structures of its kind in Romania —, two historic churches (Reformed and Evangelical) and a museum dedicated to Dacian civilisation, set up in a 19th-century building that once served as the town's hospital."
      ],
      facts: [
        { label: "Age", value: "12th century (approx. 8 centuries)" },
        { label: "Restoration", value: "2021–2024 (3 years, EU funding)" },
        { label: "Reopened", value: "September 2024, marking 800 years since Orăștie's first documentary mention" },
        { label: "What to see", value: "~1,000-year-old rotunda, Reformed church, Evangelical church, Dacian museum" }
      ]
    }
  },
  {
    id: "casa-memoriala-aurel-vlaicu",
    name: "Complexul Memorial „Aurel Vlaicu”",
    category: { ro: "Casă memorială", en: "Memorial house" },
    area: "Aurel Vlaicu",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Casa natală și muzeul dedicat inventatorului și aviatorului Aurel Vlaicu, în satul de lângă Orăștie care îi poartă azi numele.",
      description: [
        "Satul Binținți, lângă Orăștie (comuna Geoagiu), a fost redenumit Aurel Vlaicu în cinstea inventatorului și aviatorului născut aici. Complexul memorial cuprinde trei componente: casa memorială, deschisă publicului în 1952, muzeul memorial amenajat lângă casă în 1982 și un bust-monument ridicat în 1933.",
        "Expoziția muzeului include machete ale aparatelor de zbor construite de Vlaicu, unelte și obiecte personale, casca și echipamentul purtate în ultimul zbor, piese recuperate din avionul în care s-a prăbușit la 13 septembrie 1913, precum și scrisori, ziare de epocă și distincții internaționale primite de-a lungul carierei sale."
      ],
      facts: [
        { label: "Adresă", value: "str. Aurel Vlaicu nr. 177, satul Aurel Vlaicu, comuna Geoagiu" },
        { label: "Program", value: "Mar–Dum 9:00–17:00 (iarna), 10:00–18:00 (vara); luni închis" },
        { label: "Componente", value: "casa memorială (1952), muzeul memorial (1982), bust-monument (1933)" },
        { label: "Ce se vede", value: "machete de aparate de zbor, echipament, piese din avionul accidentat în 1913" }
      ]
    },
    en: {
      tagline: "The birthplace and museum of inventor and aviator Aurel Vlaicu, in the village near Orăștie that now bears his name.",
      description: [
        "The village of Binținți, near Orăștie (Geoagiu commune), was renamed Aurel Vlaicu in honour of the inventor and aviator born there. The memorial complex has three parts: the memorial house, opened to the public in 1952, the memorial museum built next to it in 1982, and a bust-monument erected in 1933.",
        "The museum's exhibits include models of the aircraft Vlaicu built, tools and personal belongings, the helmet and gear worn on his final flight, pieces recovered from the aircraft in which he crashed on 13 September 1913, as well as letters, period newspapers and international awards received during his career."
      ],
      facts: [
        { label: "Address", value: "Str. Aurel Vlaicu no. 177, Aurel Vlaicu village, Geoagiu commune" },
        { label: "Hours", value: "Tue–Sun 9:00–17:00 (winter), 10:00–18:00 (summer); closed Mondays" },
        { label: "Components", value: "memorial house (1952), memorial museum (1982), bust-monument (1933)" },
        { label: "What to see", value: "aircraft models, gear, pieces from the aircraft that crashed in 1913" }
      ]
    }
  },
  {
    id: "muzeul-aurului-brad",
    name: "Muzeul Aurului din Brad",
    category: { ro: "Muzeu", en: "Museum" },
    area: "Brad",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Cea mai mare colecție de aur nativ din Europa, cu exponate neprelucrate de niciun bijutier.",
      description: [
        "Muzeul Aurului din Brad funcționează din 1896, pornind de la colecțiile de minerale și unelte miniere ale societăților care exploatau zăcămintele aurifere din Munții Metaliferi. Astăzi adăpostește peste 2.000 de exponate — minerale și piese de aur nativ, niciuna prelucrată de vreun bijutier —, considerată una dintre cele mai importante colecții de acest fel din lume.",
        "Printre piesele cele mai cunoscute, vizitatorii au dat nume proprii unor formațiuni native, precum „Balerina”, un cristal cu douăsprezece fețe unic în lume, sau șopârlele de aur, dintre care una a fost asigurată cu 500.000 de euro la un transport pentru expunere într-un muzeu german. Muzeul se află pe strada Independenței nr. 3 și e deschis zilnic."
      ],
      facts: [
        { label: "Înființat", value: "1896" },
        { label: "Colecție", value: "peste 2.000 de exponate (minerale și aur nativ)" },
        { label: "Piesă unică", value: "„Balerina” — cristal de aur cu 12 fețe, unic în lume" },
        { label: "Program", value: "zilnic, 9:00–17:00" }
      ]
    },
    en: {
      tagline: "The largest collection of native gold in Europe, with pieces untouched by any jeweller.",
      description: [
        "The Gold Museum in Brad has operated since 1896, growing out of the mineral and mining-tool collections of the companies that worked the gold deposits of the Metaliferi Mountains. Today it holds over 2,000 exhibits — minerals and native gold pieces, none of them reworked by a jeweller — regarded as one of the most important collections of its kind in the world.",
        "Among its best-known pieces, visitors have given proper names to native gold formations, such as \"The Ballerina\", a twelve-faced crystal unique in the world, and the gold \"lizards\", one of which was insured for €500,000 during transport for display at a German museum. The museum stands on Independenței Street no. 3 and is open daily."
      ],
      facts: [
        { label: "Founded", value: "1896" },
        { label: "Collection", value: "over 2,000 exhibits (minerals and native gold)" },
        { label: "Unique piece", value: "\"The Ballerina\" — a 12-faced gold crystal, unique in the world" },
        { label: "Hours", value: "daily, 9:00 AM-5:00 PM" }
      ]
    }
  },
  {
    id: "treptele-romane-ruda-brad",
    name: "Treptele Romane (Ruda-Brad)",
    category: { ro: "Sit arheologic minier", en: "Archaeological mining site" },
    area: "Brad",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Una dintre puținele galerii miniere romane păstrate în Munții Apuseni, săpată acum aproape 2.000 de ani.",
      description: [
        "Treptele Romane este o galerie minieră săpată în stâncă la marginea satului Ruda, lângă Brad, în secolele II–III d.Hr., pentru extragerea aurului din zăcămintele Munților Metaliferi. Galeria, lungă de circa 200 de metri, își ia numele de la treptele tăiate în piatră la capătul tunelului săpat manual, cu târnăcopul, de mineri din perioada ocupației romane a Daciei.",
        "Zona a fost exploatată aurifer încă din perioada dacică și a rămas în folosință secole la rând, fiind una dintre puținele mărturii vizibile ale tehnicii miniere romane din Dacia. Din motive de siguranță, intrarea în galerie este momentan închisă cu o ușă metalică, iar vizitatorii pot vedea doar pavilionul construit la intrare; autoritățile locale au în plan amenajarea zonei pentru vizitare."
      ],
      facts: [
        { label: "Perioadă", value: "secolele II–III d.Hr. (epoca romană)" },
        { label: "Lungime galerie", value: "~200 m" },
        { label: "Localizare", value: "satul Ruda, lângă Brad" },
        { label: "Acces", value: "doar pavilionul de la intrare — galeria e închisă publicului din motive de siguranță" }
      ]
    },
    en: {
      tagline: "One of the few Roman-era mining galleries preserved in the Apuseni Mountains, dug nearly 2,000 years ago.",
      description: [
        "Treptele Romane (\"the Roman Steps\") is a mining gallery cut into the rock at the edge of Ruda village, near Brad, in the 2nd-3rd centuries AD, to extract gold from the deposits of the Metaliferi Mountains. The gallery, about 200 metres long, takes its name from the steps cut into stone at the end of the tunnel, dug by hand with pickaxes by miners during the Roman occupation of Dacia.",
        "The area had been worked for gold since Dacian times and stayed in use for centuries afterward, making it one of the few visible traces of Roman mining technique in Dacia. For safety reasons, the gallery entrance is currently closed with a metal door, and visitors can only see the pavilion built at the entrance; local authorities plan to open the area up for visiting."
      ],
      facts: [
        { label: "Period", value: "2nd-3rd century AD (Roman era)" },
        { label: "Gallery length", value: "~200 m" },
        { label: "Location", value: "Ruda village, near Brad" },
        { label: "Access", value: "entrance pavilion only — the gallery is closed to the public for safety reasons" }
      ]
    }
  },
  {
    id: "biserica-criscior",
    name: "Biserica „Adormirea Maicii Domnului” din Crișcior",
    category: { ro: "Monument istoric", en: "Historic monument" },
    area: "Brad",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Biserică din secolele XIV–XV, ctitorită de voievodul Bâlea, cu picturi murale bizantine unice în zonă.",
      description: [
        "Biserica „Adormirea Maicii Domnului” din Crișcior, la câțiva kilometri de Brad, a fost ridicată în secolele XIV–XV, din piatră, pe locul unei biserici de lemn mai vechi, cu turn-clopotniță pe latura de vest. Ctitori au fost voievodul local Bâlea și soția sa, Vișa, atestați documentar în 1404.",
        "În interior s-au păstrat picturi murale din secolul al XV-lea, printre cele mai valoroase din zonă — un tablou votiv cu familia ctitorilor, scene din viața lui Iisus (Spălarea picioarelor, Cina cea de Taină, Drumul crucii) și chipurile unor sfinți militari și ale celor trei regi sfinți ai Ungariei. Biserica e clasată monument istoric de valoare națională, cu codul LMI HD-II-m-A-03303."
      ],
      facts: [
        { label: "Construcție", value: "secolele XIV–XV" },
        { label: "Ctitori", value: "voievodul Bâlea și soția sa, Vișa (atestați 1404)" },
        { label: "Picturi murale", value: "secolul XV — tablou votiv, scene biblice, sfinți militari" },
        { label: "Cod LMI", value: "HD-II-m-A-03303" }
      ]
    },
    en: {
      tagline: "A 14th-15th century church founded by voivode Bâlea, with Byzantine murals unique to the area.",
      description: [
        "The \"Dormition of the Mother of God\" church in Crișcior, a few kilometres from Brad, was built in stone in the 14th-15th centuries on the site of an older wooden church, with a bell tower on its western side. Its founders were the local voivode Bâlea and his wife Vișa, documented in 1404.",
        "Inside, 15th-century murals have survived — among the most valuable in the area — including a votive painting of the founders' family, scenes from the life of Christ (the Washing of the Feet, the Last Supper, the Way of the Cross) and depictions of warrior saints and the three sainted kings of Hungary. The church is listed as a historic monument of national value, LMI code HD-II-m-A-03303."
      ],
      facts: [
        { label: "Built", value: "14th-15th century" },
        { label: "Founders", value: "voivode Bâlea and his wife Vișa (documented 1404)" },
        { label: "Murals", value: "15th century — votive painting, biblical scenes, warrior saints" },
        { label: "LMI code", value: "HD-II-m-A-03303" }
      ]
    }
  },
  {
    id: "castelul-corvinilor",
    name: "Castelul Corvinilor",
    category: { ro: "Castel medieval", en: "Medieval castle" },
    area: "Hunedoara",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Sala Cavalerilor, Sala Dietei și fântâna săpată de prizonieri turci — detaliile din spatele celui mai vizitat castel al țării.",
      description: [
        "Ridicat de Iancu de Hunedoara după 1440 pe temeliile unei fortificații din secolul al XIV-lea și extins în stil renascentist de fiul său, regele Matia Corvin, între 1458 și 1480, castelul păstrează Sala Cavalerilor — sala de recepție cu bolți gotice, care poartă o inscripție în latină, „Hoc opus fecit fieri Magnificus Johannes de Hunyadi”, datată 1452 — și Sala Dietei, decorată cu medalioane pictate, printre care portretele domnitorilor Matei Basarab și Vasile Lupu.",
        "Curtea interioară adăpostește fântâna despre care legenda spune că a fost săpată timp de 15 ani de trei prizonieri otomani, cărora li s-ar fi promis libertatea dacă găsesc apă; promisiunea nu ar fi fost respectată, iar inscripția rămasă pe pereții fântânii are o interpretare încă disputată de istorici. Castelul se vizitează tot anul (luni 12:00–20:00, marți–duminică 9:00–20:00, în sezonul aprilie–septembrie 2026), biletul de adult costând 55 de lei în 2026."
      ],
      facts: [
        { label: "Construcție inițială", value: "După 1440, de Iancu de Hunedoara, pe o fortificație din secolul XIV" },
        { label: "Extindere renascentistă", value: "1458–1480, sub regele Matia Corvin" },
        { label: "Săli principale", value: "Sala Cavalerilor (inscripție din 1452), Sala Dietei" },
        { label: "Program (2026)", value: "Luni 12:00–20:00, marți–duminică 9:00–20:00 (aprilie–septembrie)" },
        { label: "Bilet adult (2026)", value: "55 lei" }
      ]
    },
    en: {
      tagline: "The Knights' Hall, the Diet Hall and a well dug by Turkish prisoners — the details behind Romania's most visited castle.",
      description: [
        "Built by John Hunyadi (Iancu de Hunedoara) after 1440 on the foundations of a 14th-century fortification and expanded in Renaissance style by his son, King Matthias Corvinus, between 1458 and 1480, the castle preserves the Knights' Hall — a Gothic-vaulted reception room bearing a Latin inscription, \"Hoc opus fecit fieri Magnificus Johannes de Hunyadi\", dated 1452 — and the Diet Hall, decorated with painted medallions, including portraits of Wallachian prince Matei Basarab and Moldavian prince Vasile Lupu.",
        "The inner courtyard holds the well that, according to legend, three Ottoman prisoners spent 15 years digging in search of water after being promised freedom if they succeeded; the promise was reportedly broken, and an inscription said to remain on the well's walls has a meaning historians still dispute. The castle is open year-round (Mondays 12:00–8:00 PM, Tuesday–Sunday 9:00 AM–8:00 PM in the April–September 2026 season), with an adult ticket costing 55 lei in 2026."
      ],
      facts: [
        { label: "Original construction", value: "After 1440, by John Hunyadi, on a 14th-century fortification" },
        { label: "Renaissance expansion", value: "1458–1480, under King Matthias Corvinus" },
        { label: "Main halls", value: "Knights' Hall (1452 inscription), Diet Hall" },
        { label: "Hours (2026)", value: "Mon 12:00–8:00 PM, Tue–Sun 9:00 AM–8:00 PM (April–September)" },
        { label: "Adult ticket (2026)", value: "55 lei" }
      ]
    }
  },
  {
    id: "furnalul-govajdia",
    name: "Furnalul de la Govăjdia",
    category: { ro: "Ansamblu industrial istoric", en: "Historic industrial site" },
    area: "Hunedoara",
    hasReviews: false,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Furnal din 1810, primul cu flux continuu din Europa — vestigiu al tradiției siderurgice din care a crescut Hunedoara industrială.",
      description: [
        "Construit între 1806 și 1810 lângă satul Govăjdia (comuna Ghelari, la circa 20 km de Hunedoara), furnalul a fost, la data punerii în funcțiune, primul furnal cu flux continuu din Europa și al doilea din lume, topind minereu de fier adus din Munții Poiana Ruscă. A funcționat până în 1924, fiind unul dintre punctele de plecare ale tradiției siderurgice care avea să facă din Hunedoara un centru metalurgic important.",
        "Declarat monument de arhitectură industrială în anul 2000, ansamblul se află într-o stare avansată de degradare, în ciuda includerii, din 2021, într-un program național de restaurare. Rămâne totuși un reper de patrimoniu industrial unic în peisajul metalurgic românesc."
      ],
      facts: [
        { label: "Construit", value: "1806–1810" },
        { label: "Statut", value: "Monument de arhitectură industrială (Legea 5/2000), cod HD-II-m-A-03322" },
        { label: "Particularitate tehnică", value: "Primul furnal cu flux continuu din Europa (al doilea din lume), la data punerii în funcțiune" },
        { label: "Închidere", value: "1924" },
        { label: "Locație", value: "Satul Govăjdia, comuna Ghelari, ~20 km de Hunedoara" }
      ]
    },
    en: {
      tagline: "A furnace from 1810, Europe's first continuous-flow blast furnace — a relic of the iron-making tradition that grew into industrial Hunedoara.",
      description: [
        "Built between 1806 and 1810 near the village of Govăjdia (Ghelari commune, about 20 km from Hunedoara), the furnace was, when it went into operation, the first continuous-flow blast furnace in Europe and the second in the world, smelting iron ore brought from the Poiana Ruscă Mountains. It operated until 1924, marking one of the starting points of the iron-making tradition that would later turn Hunedoara into a major steel centre.",
        "Listed as an industrial architecture monument in 2000, the complex is now in an advanced state of disrepair, despite being included, since 2021, in a national restoration programme. It remains, nonetheless, a unique piece of industrial heritage on the Romanian metallurgical landscape."
      ],
      facts: [
        { label: "Built", value: "1806–1810" },
        { label: "Status", value: "Industrial architecture monument (Law 5/2000), code HD-II-m-A-03322" },
        { label: "Technical distinction", value: "First continuous-flow blast furnace in Europe (second in the world) at the time" },
        { label: "Closed", value: "1924" },
        { label: "Location", value: "Govăjdia village, Ghelari commune, ~20 km from Hunedoara" }
      ]
    }
  },
  {
    id: "castelul-bela-fay-simeria",
    name: "Castelul Béla Fáy",
    category: { ro: "Monument istoric", en: "Historic monument" },
    area: "Simeria",
    coords: [45.8569, 23.0110],
    hasReviews: false,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Conacul familiilor Gyulay, Kun, Fáy și Ocskay, în inima Arboretumului Simeria.",
      description: [
        "Castelul, aflat pe strada Biscaria, în incinta Parcului Dendrologic Simeria, a aparținut de-a lungul secolelor XIX–XX mai multor familii nobiliare — Gyulay, Kun, Fáy și Ocskay — care au amenajat treptat și parcul din jur. Din 1918 proprietar a fost Béla Fáy, naturalist și membru al Academiei Maghiare de Științe.",
        "Din 1954, clădirea găzduiește Stațiunea de Cercetare și Experimentare Silvică Simeria, care administrează și astăzi arboretumul din jur. Este inclus pe Lista Monumentelor Istorice din județul Hunedoara."
      ],
      facts: [
        { label: "Datare", value: "secolul XIX" },
        { label: "Proprietari istorici", value: "Gyulay, Kun, Fáy, Ocskay" },
        { label: "Astăzi", value: "sediul Stațiunii de Cercetare și Experimentare Silvică Simeria" }
      ]
    },
    en: {
      tagline: "The manor of the Gyulay, Kun, Fáy and Ocskay families, at the heart of the Simeria Arboretum.",
      description: [
        "The manor, on Biscaria street inside the Simeria Dendrological Park, belonged over the 19th–20th centuries to several noble families — Gyulay, Kun, Fáy and Ocskay — who gradually laid out the surrounding park. From 1918 its owner was Béla Fáy, a naturalist and member of the Hungarian Academy of Sciences.",
        "Since 1954, the building has housed the Simeria Forest Research and Experimentation Station, which still manages the surrounding arboretum today. It is listed on Hunedoara county's List of Historic Monuments."
      ],
      facts: [
        { label: "Dating", value: "19th century" },
        { label: "Historic owners", value: "Gyulay, Kun, Fáy, Ocskay" },
        { label: "Today", value: "home to the Simeria Forest Research and Experimentation Station" }
      ]
    }
  },
];

window.SITE_TOWNS = [
  {
    id: "deva",
    name: "Deva",
    category: { ro: "Municipiu", en: "Municipality" },
    area: "Culoarul Mureșului",
    coords: [45.8781, 22.9144],
    hasReviews: false,
    relatedAreas: ["Deva"],
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
    relatedAreas: ["Hunedoara"],
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
    id: "simeria",
    name: "Simeria",
    category: { ro: "Oraș", en: "Town" },
    area: "Culoarul Mureșului",
    coords: [45.8514, 23.0139],
    hasReviews: false,
    relatedAreas: ["Simeria"],
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Oraș născut din prima cale ferată a Transilvaniei, cu cel mai vechi și mai mare parc dendrologic din România.",
      description: [
        "Simeria a apărut ca o colonie a constructorilor de cale ferată în 1866–1867 și a crescut odată cu linia Arad–Alba Iulia — prima cale ferată din Transilvania, deschisă în 1868 — devenind un nod feroviar important, cu ramificația spre Valea Jiului inaugurată în 1870. S-a desprins administrativ de comuna Biscaria în 1891 și a primit statut de oraș în 1952.",
        "Pe teritoriul orașului se află Arboretumul Simeria (Parcul Dendrologic Simeria), fostul parc al conacului familiei Gyulay, documentat din 1763 și transformat în 1949 în parc dendrologic — azi una dintre cele mai valoroase colecții de arbori și arbuști din România."
      ],
      facts: [
        { label: "Populație", value: "11.268 locuitori (recensământ 2021)" },
        { label: "Statut", value: "oraș (din 1952)" },
        { label: "Reper", value: "Arboretumul Simeria — Parcul Dendrologic Simeria" },
        { label: "Nod feroviar", value: "pe prima cale ferată din Transilvania (Arad–Alba Iulia, 1868)" }
      ]
    },
    en: {
      tagline: "A town born out of Transylvania's first railway, home to Romania's oldest and largest dendrological park.",
      description: [
        "Simeria began as a railway workers' colony in 1866–1867 and grew alongside the Arad–Alba Iulia line — Transylvania's first railway, opened in 1868 — becoming an important railway junction once the branch line to Valea Jiului opened in 1870. It split administratively from Biscaria commune in 1891 and gained town status in 1952.",
        "The town also holds the Simeria Arboretum (Simeria Dendrological Park), the former park of the Gyulay family manor, documented since 1763 and turned into a dendrological park in 1949 — today one of Romania's most valuable collections of trees and shrubs."
      ],
      facts: [
        { label: "Population", value: "11,268 (2021 census)" },
        { label: "Status", value: "town (since 1952)" },
        { label: "Landmark", value: "Simeria Arboretum — Simeria Dendrological Park" },
        { label: "Railway junction", value: "on Transylvania's first railway (Arad–Alba Iulia, 1868)" }
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
    relatedAreas: ["Petroșani", "Parâng", "Vâlcan", "Uricani", "Aninoasa", "Bănița"],
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
    id: "petrila",
    name: "Petrila",
    category: { ro: "Oraș", en: "Town" },
    area: "Valea Jiului",
    coords: [45.4530, 23.4160],
    hasReviews: false,
    relatedAreas: ["Petrila", "Parâng"],
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Cel mai vechi oraș minier al Văii Jiului, azi poartă spre Cheile Jiețului și fosta mină devenită muzeu.",
      description: [
        "Petrila este atestată documentar din 1499 și s-a dezvoltat de la 1840 ca centru minier, în jurul minelor Lonea și Petrila. Mina, închisă în 2015, a fost clasată monument istoric și transformată treptat în „Planeta Petrila” — un muzeu în aer liber cu tururi ghidate și festivalul Opera Nights.",
        "Pe teritoriul orașului se află și rezervațiile naturale Cheile Jiețului (10 ha) și Cheile Taia (2 ha), punct de plecare spre platoul Parâng, precum și Conacul Rădăcinilor, un complex hotelier și de agrement deschis în 2023 în Cheile Jietului."
      ],
      facts: [
        { label: "Populație", value: "19.600 locuitori (recensământ 2021)" },
        { label: "Atestare documentară", value: "1499" },
        { label: "Reper", value: "Mina Petrila / Planeta Petrila (monument istoric)" }
      ]
    },
    en: {
      tagline: "The oldest mining town of Valea Jiului, now a gateway to Cheile Jiețului and its former mine turned museum.",
      description: [
        "Petrila is first documented in 1499 and grew from the 1840s as a mining centre, around the Lonea and Petrila mines. The mine, closed in 2015, was listed as a historic monument and gradually turned into \"Planet Petrila\" — an open-air museum with guided tours and the Opera Nights festival.",
        "The town's territory also holds the Cheile Jiețului (10 ha) and Cheile Taia (2 ha) nature reserves, a starting point for the Parâng plateau, as well as Conacul Rădăcinilor, a hotel and leisure complex opened in 2023 in the Jieț gorge."
      ],
      facts: [
        { label: "Population", value: "19,600 (2021 census)" },
        { label: "First documented", value: "1499" },
        { label: "Landmark", value: "Petrila Mine / Planet Petrila (historic monument)" }
      ]
    }
  },
  {
    id: "vulcan",
    name: "Vulcan",
    category: { ro: "Municipiu", en: "Municipality" },
    area: "Valea Jiului",
    coords: [45.3833, 23.2667],
    hasReviews: false,
    relatedAreas: ["Vulcan", "Vâlcan"],
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "A doua localitate ca mărime din Valea Jiului, poartă spre Pasul Vâlcan și Peștera Dracului.",
      description: [
        "Vulcan apare menționat încă din Harta Iosefină (1769–1773) și este, din 2003, municipiu — a doua localitate ca mărime din Valea Jiului, după Petroșani. Orașul s-a dezvoltat tot în jurul mineritului cărbunelui, iar astăzi e cunoscut mai ales pentru Peștera Dracului, cu propria cascadă, aflată pe unul dintre cele cinci trasee tematice amenajate în zonă în 2022.",
        "De la Vulcan pornește drumul spre Pasul Vâlcan (1.621 m), care leagă Valea Jiului de nordul Olteniei, traversat istoric de Mihai Viteazul în 1600 și loc de luptă în Primul Război Mondial."
      ],
      facts: [
        { label: "Populație", value: "19.772 locuitori (recensământ 2021)" },
        { label: "Statut", value: "municipiu (din 2003)" },
        { label: "Reper", value: "Peștera Dracului; Pasul Vâlcan (1.621 m)" }
      ]
    },
    en: {
      tagline: "The second-largest town in Valea Jiului, gateway to Vulcan Pass and the Devil's Cave.",
      description: [
        "Vulcan is mentioned as far back as the Josephine Land Survey (1769–1773) and has been a municipality since 2003 — the second-largest town in Valea Jiului after Petroșani. Like its neighbours, it grew around coal mining, and today it's best known for Peștera Dracului (Devil's Cave), with its own waterfall, found on one of five themed trails built in the area in 2022.",
        "From Vulcan, the road climbs to Vulcan Pass (1,621 m), which links Valea Jiului to northern Oltenia — historically crossed by Prince Michael the Brave in 1600, and the site of fighting during World War I."
      ],
      facts: [
        { label: "Population", value: "19,772 (2021 census)" },
        { label: "Status", value: "municipality (since 2003)" },
        { label: "Landmark", value: "Devil's Cave; Vulcan Pass (1,621 m)" }
      ]
    }
  },
  {
    id: "lupeni",
    name: "Lupeni",
    category: { ro: "Municipiu", en: "Municipality" },
    area: "Valea Jiului",
    coords: [45.3603, 23.2383],
    hasReviews: false,
    relatedAreas: ["Lupeni", "Vâlcan"],
    images: ["images/lupeni-panorama.jpg"],
    photoCredit: { author: "Mitasim", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Panoram%C4%83_a_municipiului_Lupeni,_Hunedoara.jpg" },
    ro: {
      tagline: "Cel mai vestic oraș al Văii Jiului, poartă spre stațiunea Straja și scenă a marilor greve miniere.",
      description: [
        "Lupeni este atestat documentar din 1770, a primit rangul de oraș în 1960 și e municipiu din 2003 — al treilea ca mărime din Valea Jiului, la circa 18 km de Petroșani. S-a dezvoltat ca centru minier și a rămas legat de istoria mișcării muncitorești din zonă, fiind scena Grevei de la Lupeni din 1929 și a Grevei mineriilor din Valea Jiului din 1977.",
        "De la Lupeni pornește drumul spre stațiunea de schi Straja, aflată la aproximativ 9 km, situată pe versanții Munților Vâlcan."
      ],
      facts: [
        { label: "Populație", value: "18.699 locuitori (recensământ 2021)" },
        { label: "Atestare documentară", value: "1770" },
        { label: "Statut", value: "municipiu (din 2003, oraș din 1960)" },
        { label: "Poartă spre", value: "Stațiunea Straja (cca. 9 km)" }
      ]
    },
    en: {
      tagline: "The westernmost town of Valea Jiului, gateway to the Straja resort and the stage of major miners' strikes.",
      description: [
        "Lupeni is first documented in 1770, was granted town status in 1960 and has been a municipality since 2003 — the third-largest town in Valea Jiului, about 18 km from Petroșani. It grew as a coal-mining centre and remains tied to the region's labour history, having been the site of the 1929 Lupeni strike and the 1977 Jiu Valley miners' strike.",
        "The road from Lupeni leads to the Straja ski resort, about 9 km away, on the slopes of the Vâlcan Mountains."
      ],
      facts: [
        { label: "Population", value: "18,699 (2021 census)" },
        { label: "First documented", value: "1770" },
        { label: "Status", value: "municipality (since 2003, town since 1960)" },
        { label: "Gateway to", value: "Straja resort (approx. 9 km)" }
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
    relatedAreas: ["Orăștie", "Munții Orăștiei", "Aurel Vlaicu"],
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
    relatedAreas: ["Hațeg", "Țara Hațegului", "Parcul Național Retezat", "Silvașu de Sus, Țara Hațegului"],
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
    relatedAreas: ["Brad"],
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
  },
  {
    id: "zilele-orastie-2026",
    name: "Zilele Municipiului Orăștie — ediția 2026",
    category: { ro: "Festival", en: "Festival" },
    area: "Orăștie",
    date: "2026-07-19",
    hasReviews: false,
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Trei zile de concerte, tradiții locale și parc de distracții la Arena Park, în cea mai recentă ediție a sărbătorii orașului.",
      description: [
        "Între 17 și 19 iulie 2026, Arena Park din Orăștie a găzduit ediția din acest an a Zilelor Municipiului Orăștie, organizată de Primăria și Consiliul Local Orăștie în parteneriat cu Autentic Events. Timp de trei zile, scena a adus artiști de muzică populară și ușoară, alături de ansambluri folclorice și formații locale de tineret.",
        "Pe lângă programul artistic, vizitatorii au avut la dispoziție un parc de distracții cu atracții pentru toate vârstele și o zonă cu produse tradiționale și food-truck-uri. Intrarea a fost liberă, iar evenimentul revine an de an ca o sărbătoare a comunității și a tradițiilor locale."
      ],
      facts: [
        { label: "Perioadă", value: "17–19 iulie 2026" },
        { label: "Loc", value: "Arena Park, Orăștie" },
        { label: "Intrare", value: "liberă" },
        { label: "Organizatori", value: "Primăria și Consiliul Local Orăștie, în parteneriat cu Autentic Events" }
      ]
    },
    en: {
      tagline: "Three days of concerts, local tradition and an amusement park at Arena Park, in the town's most recent annual celebration.",
      description: [
        "From 17 to 19 July 2026, Arena Park in Orăștie hosted this year's edition of Zilele Municipiului Orăștie (\"Orăștie Municipality Days\"), organised by Orăștie City Hall and Local Council in partnership with Autentic Events. Over three days, the stage featured folk and pop artists alongside folklore ensembles and local youth groups.",
        "Besides the artistic programme, visitors had access to an amusement park with rides for all ages and an area with traditional food and food trucks. Admission was free, and the event returns every year as a celebration of the community and its local traditions."
      ],
      facts: [
        { label: "Dates", value: "17–19 July 2026" },
        { label: "Location", value: "Arena Park, Orăștie" },
        { label: "Admission", value: "free" },
        { label: "Organisers", value: "Orăștie City Hall and Local Council, in partnership with Autentic Events" }
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
    id: "casa-lupeni",
    name: "Casa Lupeni",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Lupeni",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Pensiune mică, cu 6 camere și jacuzzi în aer liber, pe strada Bărbăteni din Lupeni.",
      description: [
        "Casa Lupeni este o pensiune de dimensiuni mici, situată pe strada Bărbăteni nr. 58, în Lupeni, cu 6 camere (duble, triple și un apartament cu două camere), fiecare cu baie proprie. Oferă parcare privată gratuită, cu 10 locuri supravegheate video, wi-fi în spațiile comune și grădină.",
        "Punctul de atracție al pensiunii este jacuzzi-ul în aer liber, disponibil contra cost, iar locația este un punct de plecare comod spre stațiunea Straja și spre traseele din Valea Jiului. Pensiunea nu are restaurant propriu, tarifele afișate nefiind cu masă inclusă."
      ],
      facts: [
        { label: "Adresă", value: "Str. Bărbăteni nr. 58, Lupeni" },
        { label: "Camere", value: "6 camere (duble, triple, apartament), baie proprie" },
        { label: "Facilități", value: "parcare privată, wi-fi, grădină, jacuzzi în aer liber (contra cost)" },
        { label: "Contact", value: "tel. 0364 431 808" }
      ]
    },
    en: {
      tagline: "A small 6-room guesthouse with an outdoor jacuzzi on Bărbăteni street in Lupeni.",
      description: [
        "Casa Lupeni is a small guesthouse on Bărbăteni street no. 58 in Lupeni, with 6 rooms (double, triple and a two-room apartment), each with a private bathroom. It offers free private parking with 10 video-monitored spaces, wi-fi in common areas and a garden.",
        "The guesthouse's highlight is its outdoor jacuzzi, available for an extra fee, and the location is a convenient base for the Straja resort and the hiking trails of the Jiu Valley. There is no restaurant on site, so the listed rates do not include meals."
      ],
      facts: [
        { label: "Address", value: "Bărbăteni street no. 58, Lupeni" },
        { label: "Rooms", value: "6 rooms (double, triple, apartment), private bathroom" },
        { label: "Facilities", value: "private parking, wi-fi, garden, outdoor jacuzzi (extra fee)" },
        { label: "Contact", value: "phone +40 364 431 808" }
      ]
    }
  },
  {
    id: "hotel-sarmis-deva",
    name: "Hotel Sarmis",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Deva",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Hotel de 3 stele cu 117 camere, pe strada principală din centrul Devei.",
      description: [
        "Hotel Sarmis este un hotel de 3 stele situat pe strada Mareșal Averescu nr. 7, în centrul orașului Deva, la mai puțin de un kilometru de gară și autogară. Dispune de 117 camere și apartamente, majoritatea cu balcon, minibar și TV, precum și de un restaurant propriu cu bucătărie românească și internațională, servită în salon sau pe terasă.",
        "Fiind unul dintre cele mai mari hoteluri din oraș, este folosit atât pentru sejururi turistice, cât și pentru cazare de afaceri și evenimente; recepția funcționează non-stop, iar micul dejun, parcarea și internetul wi-fi sunt incluse în tarif."
      ],
      facts: [
        { label: "Locație", value: "Str. Mareșal Averescu nr. 7, Deva" },
        { label: "Categorie", value: "3 stele, 117 camere" },
        { label: "Facilități", value: "restaurant propriu, parcare gratuită, wi-fi, mic dejun inclus" },
        { label: "Contact", value: "tel. 0254 214 731 · sarmis.deva@unita-turism.ro" }
      ]
    },
    en: {
      tagline: "A 3-star hotel with 117 rooms on Deva's main street, in the city centre.",
      description: [
        "Hotel Sarmis is a 3-star hotel at 7 Mareșal Averescu street, in central Deva, less than a kilometre from the train and bus stations. It has 117 rooms and suites, most with a balcony, minibar and TV, plus its own restaurant serving Romanian and international dishes, indoors or on the terrace.",
        "As one of the largest hotels in town, it is used for both tourist stays and business travel or events; the front desk is open 24 hours, and breakfast, parking and wi-fi are included in the rate."
      ],
      facts: [
        { label: "Location", value: "7 Mareșal Averescu street, Deva" },
        { label: "Category", value: "3 stars, 117 rooms" },
        { label: "Facilities", value: "in-house restaurant, free parking, wi-fi, breakfast included" },
        { label: "Contact", value: "phone +40 254 214 731 · sarmis.deva@unita-turism.ro" }
      ]
    }
  },
  {
    id: "cocosul-de-aur-deva",
    name: "Cocoșul de Aur",
    category: { ro: "Restaurant", en: "Restaurant" },
    area: "Deva",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Restaurant cu specific românesc, lipit de Sinagoga din centrul Devei.",
      description: [
        "Cocoșul de Aur este un restaurant cu specific tradițional românesc, situat pe Bulevardul Iuliu Maniu nr. 9, chiar în centrul Devei, lângă clădirea Sinagogii. Are 60 de locuri în interior și o terasă încălzită cu încă 40 de locuri, iar meniul îmbină ciorbe și fripturi la grătar, gătite după rețete clasice, cu câteva preparate internaționale."
      ],
      facts: [
        { label: "Adresă", value: "Bd. Iuliu Maniu nr. 9, Deva" },
        { label: "Specific", value: "bucătărie tradițională românească" },
        { label: "Capacitate", value: "60 de locuri interior + terasă încălzită, 40 de locuri" },
        { label: "Contact", value: "tel. 0767 651 253" }
      ]
    },
    en: {
      tagline: "A traditional Romanian restaurant right next to the Deva synagogue.",
      description: [
        "Cocoșul de Aur (\"The Golden Rooster\") is a traditional Romanian restaurant at 9 Iuliu Maniu boulevard, in central Deva, next to the synagogue building. It seats 60 indoors plus another 40 on a heated terrace, and its menu combines soups and grilled meats cooked to classic recipes with a few international dishes."
      ],
      facts: [
        { label: "Address", value: "9 Iuliu Maniu boulevard, Deva" },
        { label: "Cuisine", value: "traditional Romanian" },
        { label: "Capacity", value: "60 seats indoors + heated terrace, 40 seats" },
        { label: "Contact", value: "phone +40 767 651 253" }
      ]
    }
  },
  {
    id: "casa-rustica-deva",
    name: "Casa Rustică",
    category: { ro: "Restaurant", en: "Restaurant" },
    area: "Deva",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Bistro-pizzerie cu specific italian, vizavi de centrul comercial Ulpia din Deva.",
      description: [
        "Casa Rustică este un bistro-pizzerie cu specific italian, situat pe Aleea Transilvaniei, vizavi de centrul comercial Ulpia din Deva. Meniul cuprinde pizza la cuptor, paste, salate și preparate internaționale, într-o atmosferă rustică, potrivită atât pentru mese rapide, cât și pentru comenzi la pachet."
      ],
      facts: [
        { label: "Adresă", value: "Aleea Transilvaniei, bl. 7, sc. 2, parter, Deva" },
        { label: "Specific", value: "pizza, paste, bucătărie italiană și internațională" },
        { label: "Contact", value: "tel. 0254 222 300" }
      ]
    },
    en: {
      tagline: "An Italian-style bistro and pizzeria across from the Ulpia mall in Deva.",
      description: [
        "Casa Rustică is an Italian-style bistro and pizzeria on Aleea Transilvaniei, across from the Ulpia shopping centre in Deva. The menu includes oven-baked pizza, pasta, salads and international dishes, in a rustic setting suited to both quick meals and takeaway orders."
      ],
      facts: [
        { label: "Address", value: "Aleea Transilvaniei, bl. 7, sc. 2, ground floor, Deva" },
        { label: "Cuisine", value: "pizza, pasta, Italian and international" },
        { label: "Contact", value: "phone +40 254 222 300" }
      ]
    }
  },
  {
    id: "pensiunea-la-fontaine-hunedoara",
    name: "Pensiunea La Fontaine",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Hunedoara",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Pensiune cu 10 camere și grădină, la câteva minute de mers pe jos de Castelul Corvinilor.",
      description: [
        "Pensiunea La Fontaine este situată pe strada Rotarilor nr. 4, în centrul Hunedoarei, la câteva minute de mers pe jos de Castelul Corvinilor — unele camere au vedere directă spre castel. Dispune de 10 camere (duble, twin și de familie), restaurant propriu, bar și o grădină amenajată pentru mese în aer liber.",
        "Pensiunea oferă parcare gratuită și wi-fi atât în camere, cât și în grădină, fiind o opțiune potrivită pentru un sejur axat pe vizitarea cetății și a orașului vechi."
      ],
      facts: [
        { label: "Adresă", value: "Str. Rotarilor nr. 4, Hunedoara" },
        { label: "Camere", value: "10 camere (duble, twin, de familie)" },
        { label: "Facilități", value: "restaurant, bar, grădină, parcare gratuită, wi-fi" },
        { label: "Contact", value: "tel. 0770 235 524 · rezervare@lafontaine.ro · lafontaine.ro" }
      ]
    },
    en: {
      tagline: "A 10-room guesthouse with a garden, a few minutes' walk from Corvin Castle.",
      description: [
        "Pensiunea La Fontaine is on Rotarilor street no. 4, in central Hunedoara, a few minutes' walk from Corvin Castle — some rooms have a direct view of the castle. It has 10 rooms (double, twin and family), its own restaurant, a bar and a landscaped garden for outdoor dining.",
        "The guesthouse offers free parking and wi-fi both in the rooms and in the garden, making it a good choice for a stay focused on the fortress and the old town."
      ],
      facts: [
        { label: "Address", value: "4 Rotarilor street, Hunedoara" },
        { label: "Rooms", value: "10 rooms (double, twin, family)" },
        { label: "Facilities", value: "restaurant, bar, garden, free parking, wi-fi" },
        { label: "Contact", value: "phone +40 770 235 524 · rezervare@lafontaine.ro · lafontaine.ro" }
      ]
    }
  },
  {
    id: "curtea-veche-hunedoara",
    name: "Curtea Veche",
    category: { ro: "Hotel & restaurant", en: "Hotel & restaurant" },
    area: "Hunedoara",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Fost han vechi, azi pensiune și restaurant cu bucătărie tradițională hunedoreană.",
      description: [
        "Curtea Veche este un complex de cazare și restaurant amenajat într-un vechi han din Hunedoara, pe strada Cernei nr. 2, la poalele Castelului Corvinilor. Pensiunea oferă camere single, duble, triple și de familie, iar restaurantul servește preparate din bucătăria tradițională hunedoreană — friptură cu garnitură „ca la bunica”, produse de patiserie coapte la cuptorul cu lemne și tocănițe gătite lent în oale de lut.",
        "Complexul are curte spațioasă cu șemineu pe lemne și spații destinate evenimentelor, fiind unul dintre puținele locuri din oraș care combină cazare și restaurant sub același acoperiș, în imediata apropiere a cetății."
      ],
      facts: [
        { label: "Adresă", value: "Str. Cernei nr. 2, Hunedoara" },
        { label: "Specific", value: "bucătărie tradițională hunedoreană, produse la cuptorul cu lemne" },
        { label: "Program", value: "10:00–22:00, zilnic" },
        { label: "Contact", value: "pensiune tel. 0772 028 207 · restaurant tel. 0770 123 333 · curteavechehunedoara.ro" }
      ]
    },
    en: {
      tagline: "A former old inn, now a guesthouse and restaurant with traditional Hunedoara cuisine.",
      description: [
        "Curtea Veche is an accommodation and restaurant complex set up in an old inn in Hunedoara, at 2 Cernei street, at the foot of Corvin Castle. The guesthouse offers single, double, triple and family rooms, while the restaurant serves traditional Hunedoara dishes — roasted meat with sides \"like grandmother used to make\", wood-fired oven pastries and stews slow-cooked in clay pots.",
        "The complex has a spacious courtyard with a wood-burning fireplace and event spaces, making it one of the few places in town that combines lodging and dining under one roof, right next to the fortress."
      ],
      facts: [
        { label: "Address", value: "2 Cernei street, Hunedoara" },
        { label: "Cuisine", value: "traditional Hunedoara cuisine, wood-fired oven dishes" },
        { label: "Hours", value: "10:00 AM–10:00 PM, daily" },
        { label: "Contact", value: "guesthouse phone +40 772 028 207 · restaurant phone +40 770 123 333 · curteavechehunedoara.ro" }
      ]
    }
  },
  {
    id: "eden-by-werk-hunedoara",
    name: "Eden by Werk",
    category: { ro: "Restaurant", en: "Restaurant" },
    area: "Hunedoara",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Restaurant modern cu vedere spre Castelul Corvinilor, în cadrul complexului Werk Hotel & Spa.",
      description: [
        "Eden by Werk este restaurantul complexului Werk Hotel & Spa, situat pe strada Voinei nr. 2A din Hunedoara, la câteva minute de mers pe jos de Castelul Corvinilor, cu vedere directă spre cetate. Meniul, semnat de un bucătar propriu, combină bucătăria contemporană cu influențe internaționale, într-un decor modern."
      ],
      facts: [
        { label: "Adresă", value: "Str. Voinei nr. 2A, Hunedoara" },
        { label: "Specific", value: "bucătărie contemporană, meniu de autor" },
        { label: "Reper", value: "la câteva minute de Castelul Corvinilor, în cadrul Werk Hotel & Spa" }
      ]
    },
    en: {
      tagline: "A modern restaurant with a view of Corvin Castle, inside the Werk Hotel & Spa complex.",
      description: [
        "Eden by Werk is the restaurant of the Werk Hotel & Spa complex, at 2A Voinei street in Hunedoara, a few minutes' walk from Corvin Castle, with a direct view of the fortress. The menu, created by an in-house chef, blends contemporary cooking with international influences in a modern setting."
      ],
      facts: [
        { label: "Address", value: "2A Voinei street, Hunedoara" },
        { label: "Cuisine", value: "contemporary, chef's menu" },
        { label: "Landmark", value: "a few minutes from Corvin Castle, inside Werk Hotel & Spa" }
      ]
    }
  },
  {
    id: "hotel-petrosani",
    name: "Hotel Petroșani",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Petroșani",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Hotel central, construit în 1987, lângă Parcul Central din Petroșani.",
      description: [
        "Hotel Petroșani este situat pe strada 1 Decembrie 1918 nr. 110, în centrul municipiului, chiar lângă Parcul Central, la câțiva pași de principalele obiective din oraș. Construit în 1987, oferă camere twin, duble și apartamente de tip superior, cu wi-fi gratuit, sală de fitness și zonă de recepție/lounge.",
        "Poziția centrală îl recomandă atât pentru vizite turistice în Valea Jiului, cât și pentru cazare de afaceri sau tranzit spre stațiunile de schi Parâng și Straja."
      ],
      facts: [
        { label: "Adresă", value: "Str. 1 Decembrie 1918 nr. 110, Petroșani" },
        { label: "Deschis", value: "1987" },
        { label: "Camere", value: "twin, duble, apartamente superior" },
        { label: "Contact", value: "tel. 0721 205 023 · contact@hotelpetrosani.com · hotelpetrosani.com" }
      ]
    },
    en: {
      tagline: "A central hotel, built in 1987, next to Petroșani's Central Park.",
      description: [
        "Hotel Petroșani is located at 110 1 Decembrie 1918 street, in the city centre, right next to Central Park, a short walk from the town's main sights. Built in 1987, it offers twin, double and superior apartment rooms, with free wi-fi, a fitness room and a reception/lounge area.",
        "Its central location makes it suitable both for sightseeing trips around the Jiu Valley and for business stays or as a stopover on the way to the Parâng and Straja ski resorts."
      ],
      facts: [
        { label: "Address", value: "110 1 Decembrie 1918 street, Petroșani" },
        { label: "Opened", value: "1987" },
        { label: "Rooms", value: "twin, double, superior apartments" },
        { label: "Contact", value: "phone +40 721 205 023 · contact@hotelpetrosani.com · hotelpetrosani.com" }
      ]
    }
  },
  {
    id: "complex-keops-petrosani",
    name: "Complex Keops",
    category: { ro: "Restaurant", en: "Restaurant" },
    area: "Petroșani",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Restaurant și complex de agrement din 2005, cu centru ecvestru propriu, în Petroșani.",
      description: [
        "Complex Keops funcționează din 2005 pe strada 1 Decembrie 1918 nr. 137, în Petroșani, ca restaurant cu terasă și zonă de club, servind atât preparate tradiționale românești, cât și bucătărie internațională, cu servicii de catering la cerere.",
        "Complexul include și un centru ecvestru propriu (Keops Horses), cu lecții de călărie și trasee montane cu caii, precum și spații de joacă pentru copii — fiind partenerul apropiat al hotelului Conacul Rădăcinilor din Cheile Jietului."
      ],
      facts: [
        { label: "Adresă", value: "Str. 1 Decembrie 1918 nr. 137, Petroșani" },
        { label: "Deschis", value: "2005" },
        { label: "Specific", value: "bucătărie românească și internațională, catering, centru ecvestru" },
        { label: "Contact", value: "tel. 0730 072 626" }
      ]
    },
    en: {
      tagline: "A restaurant and leisure complex open since 2005, with its own equestrian centre, in Petroșani.",
      description: [
        "Complex Keops has operated since 2005 at 137 1 Decembrie 1918 street in Petroșani, as a restaurant with a terrace and a club area, serving both traditional Romanian dishes and international cuisine, with catering services on request.",
        "The complex also includes its own equestrian centre (Keops Horses), with riding lessons and mountain trail rides, plus a children's play area — it is the close partner of the Conacul Rădăcinilor hotel in the Jieț gorge."
      ],
      facts: [
        { label: "Address", value: "137 1 Decembrie 1918 street, Petroșani" },
        { label: "Opened", value: "2005" },
        { label: "Cuisine", value: "Romanian and international, catering, equestrian centre" },
        { label: "Contact", value: "phone +40 730 072 626" }
      ]
    }
  },
  {
    id: "pensiunea-avy-hateg",
    name: "Pensiunea Avy",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Hațeg",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Pensiune cu 13 camere, vizavi de benzinăria Petrom, la 2 minute de centrul Hațegului.",
      description: [
        "Pensiunea Avy este situată în Hațeg, vizavi de benzinăria Petrom, la aproximativ 2 minute de mers pe jos de centrul orașului. Are 13 camere moderne, cu o capacitate totală de 27 de locuri, dotate cu aer condiționat, baie proprie, TV LCD, wi-fi gratuit, minifrigider și uscător de păr.",
        "Pensiunea pune la dispoziția oaspeților un pavilion cu grătar și o bucătărie complet echipată, fiind un punct de plecare bun spre Parcul Național Retezat și Geoparcul Țara Hațegului."
      ],
      facts: [
        { label: "Adresă", value: "Hațeg, vizavi de benzinăria Petrom" },
        { label: "Camere", value: "13 camere, 27 de locuri" },
        { label: "Facilități", value: "pavilion cu grătar, bucătărie pentru oaspeți, wi-fi" },
        { label: "Contact", value: "tel. 0762 642 046 · pensiunea-avy.ro" }
      ]
    },
    en: {
      tagline: "A 13-room guesthouse across from the Petrom station, 2 minutes from central Hațeg.",
      description: [
        "Pensiunea Avy is located in Hațeg, across from the Petrom fuel station, about a 2-minute walk from the town centre. It has 13 modern rooms with a total capacity of 27 guests, fitted with air conditioning, a private bathroom, LCD TV, free wi-fi, a mini-fridge and a hairdryer.",
        "The guesthouse provides guests with a barbecue pavilion and a fully equipped kitchen, making it a good starting point for Retezat National Park and the Hațeg Country Geopark."
      ],
      facts: [
        { label: "Address", value: "Hațeg, opposite the Petrom station" },
        { label: "Rooms", value: "13 rooms, 27 guests" },
        { label: "Facilities", value: "barbecue pavilion, guest kitchen, wi-fi" },
        { label: "Contact", value: "phone +40 762 642 046 · pensiunea-avy.ro" }
      ]
    }
  },
  {
    id: "avy-wine-dine-hateg",
    name: "Avy Wine & Dine",
    category: { ro: "Restaurant", en: "Restaurant" },
    area: "Hațeg",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Restaurant cu bucătărie mediteraneeană, pe strada Viilor din Hațeg.",
      description: [
        "Avy Wine & Dine este un restaurant situat pe strada Viilor nr. 2, în Hațeg, cu un meniu de inspirație mediteraneeană, cu influențe italiene și franțuzești, alături de o listă de vinuri dedicată. Este unul dintre restaurantele cele mai bine cotate din oraș pe platformele de recenzii."
      ],
      facts: [
        { label: "Adresă", value: "Str. Viilor nr. 2, Hațeg" },
        { label: "Specific", value: "bucătărie mediteraneeană, italiană și franțuzească, listă de vinuri" },
        { label: "Contact", value: "tel. 0786 725 000 · restaurant-avy.ro" }
      ]
    },
    en: {
      tagline: "A restaurant with Mediterranean cuisine, on Viilor street in Hațeg.",
      description: [
        "Avy Wine & Dine is a restaurant at 2 Viilor street in Hațeg, with a Mediterranean-inspired menu carrying Italian and French influences, alongside a dedicated wine list. It is one of the highest-rated restaurants in town on review platforms."
      ],
      facts: [
        { label: "Address", value: "2 Viilor street, Hațeg" },
        { label: "Cuisine", value: "Mediterranean, Italian and French, wine list" },
        { label: "Contact", value: "phone +40 786 725 000 · restaurant-avy.ro" }
      ]
    }
  },
  {
    id: "pensiunea-jorja-orastie",
    name: "Pensiunea Jorja",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Orăștie",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Pensiune cu 14 camere în centrul Orăștiei, la 350 m de un magazin Lidl.",
      description: [
        "Pensiunea Jorja este situată pe Bulevardul Nicolae Bălcescu nr. 30, în centrul orașului Orăștie, la aproximativ 350 de metri de un magazin Lidl și 3 km de gară. Dispune de 14 camere — single, duble și apartamente — cu o capacitate totală de 36 de locuri, fiecare cu baie proprie, TV și încălzire centrală.",
        "Pensiunea are sală de mese, grătar propriu și acceptă animale de companie, fiind o bază convenabilă pentru vizitarea cetăților dacice din Munții Orăștiei, aflate la aproximativ 38 km."
      ],
      facts: [
        { label: "Adresă", value: "Bd. Nicolae Bălcescu nr. 30, Orăștie" },
        { label: "Camere", value: "14 camere, 36 de locuri" },
        { label: "Facilități", value: "sală de mese, grătar, acceptă animale, parcare" },
        { label: "Contact", value: "tel. 0254 240 013 / 0254 241 574" }
      ]
    },
    en: {
      tagline: "A 14-room guesthouse in central Orăștie, 350 m from a Lidl store.",
      description: [
        "Pensiunea Jorja is located at 30 Nicolae Bălcescu boulevard, in central Orăștie, about 350 metres from a Lidl store and 3 km from the train station. It has 14 rooms — single, double and apartments — with a total capacity of 36 guests, each with a private bathroom, TV and central heating.",
        "The guesthouse has a dining room, its own barbecue and accepts pets, making it a convenient base for visiting the Dacian fortresses in the Orăștie Mountains, about 38 km away."
      ],
      facts: [
        { label: "Address", value: "30 Nicolae Bălcescu boulevard, Orăștie" },
        { label: "Rooms", value: "14 rooms, 36 guests" },
        { label: "Facilities", value: "dining room, barbecue, pets allowed, parking" },
        { label: "Contact", value: "phone +40 254 240 013 / +40 254 241 574" }
      ]
    }
  },
  {
    id: "bistro-merinde-orastie",
    name: "Bistro Merinde",
    category: { ro: "Restaurant", en: "Restaurant" },
    area: "Orăștie",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Bistro cu meniu românesc și internațional, într-una dintre casele vechi din Orăștie.",
      description: [
        "Bistro Merinde este situat pe strada Octavian Goga nr. 31, la parterul uneia dintre cele mai vechi case din Orăștie, cu design contemporan. Meniul este de inspirație românească și internațională, servit într-o atmosferă casual, potrivită atât pentru o masă rapidă, cât și pentru o oprire mai lungă pentru cei care circulă pe autostrada A1 între Sibiu și Lugoj."
      ],
      facts: [
        { label: "Adresă", value: "Str. Octavian Goga nr. 31, Orăștie" },
        { label: "Specific", value: "bucătărie românească și internațională contemporană" },
        { label: "Program", value: "luni–vineri 10:00–21:00/22:00, sâmbătă 10:00–18:00, duminică închis" },
        { label: "Contact", value: "tel. 0728 653 798" }
      ]
    },
    en: {
      tagline: "A bistro with a Romanian and international menu, in one of Orăștie's old houses.",
      description: [
        "Bistro Merinde is located at 31 Octavian Goga street, on the ground floor of one of the oldest houses in Orăștie, with a contemporary design. The menu is inspired by Romanian and international cuisine, served in a casual setting suited both to a quick meal and to a longer stop for travellers on the A1 motorway between Sibiu and Lugoj."
      ],
      facts: [
        { label: "Address", value: "31 Octavian Goga street, Orăștie" },
        { label: "Cuisine", value: "contemporary Romanian and international" },
        { label: "Hours", value: "Mon–Fri 10:00 AM–9:00/10:00 PM, Sat 10:00 AM–6:00 PM, closed Sun" },
        { label: "Contact", value: "phone +40 728 653 798" }
      ]
    }
  },
  {
    id: "pensiunea-irina-brad",
    name: "Pensiunea Irina",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Brad",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Pensiune de familie deschisă în 2001, cu 5 camere duble, în Brad.",
      description: [
        "Pensiunea Irina funcționează din 2001 pe strada Vânătorilor nr. 20, în municipiul Brad, fiind clasificată la 2 stele de Ministerul Turismului. Are 5 camere duble, cu o capacitate totală de 10 locuri, fiecare cu baie proprie, aer condiționat, TV LED și încălzire proprie.",
        "Pensiunea dispune de parcare și zonă de luat masa cu chicinetă, fiind o opțiune bine cotată pentru vizitarea Muzeului Aurului și a obiectivelor din Munții Metaliferi."
      ],
      facts: [
        { label: "Adresă", value: "Str. Vânătorilor nr. 20, Brad" },
        { label: "Deschisă", value: "2001, clasificare 2 stele" },
        { label: "Camere", value: "5 camere duble, 10 locuri" },
        { label: "Contact", value: "tel. 0740 841 239 · contact@pensiuneairina.ro · pensiuneairina.ro" }
      ]
    },
    en: {
      tagline: "A family guesthouse opened in 2001, with 5 double rooms, in Brad.",
      description: [
        "Pensiunea Irina has operated since 2001 at 20 Vânătorilor street, in Brad, classified as a 2-star establishment by the Ministry of Tourism. It has 5 double rooms, with a total capacity of 10 guests, each with a private bathroom, air conditioning, LED TV and its own heating.",
        "The guesthouse has parking and a dining area with a kitchenette, making it a well-rated option for visiting the Gold Museum and the sights of the Metaliferi Mountains."
      ],
      facts: [
        { label: "Address", value: "20 Vânătorilor street, Brad" },
        { label: "Opened", value: "2001, 2-star classification" },
        { label: "Rooms", value: "5 double rooms, 10 guests" },
        { label: "Contact", value: "phone +40 740 841 239 · contact@pensiuneairina.ro · pensiuneairina.ro" }
      ]
    }
  },
  {
    id: "pensiunea-ana-maria-brad",
    name: "Pensiunea Ana Maria",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Brad",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Pensiune mai mare, cu 19 camere, pe strada Avram Iancu din Brad.",
      description: [
        "Pensiunea Ana Maria este situată pe strada Avram Iancu nr. 52, în Brad, și oferă 43 de locuri de cazare în 19 camere (16 duble și 3 triple), cu servicii de masă pentru oaspeți. Este una dintre cele mai mari unități de cazare din oraș, potrivită și pentru grupuri."
      ],
      facts: [
        { label: "Adresă", value: "Str. Avram Iancu nr. 52, Brad" },
        { label: "Camere", value: "19 camere (16 duble, 3 triple), 43 de locuri" },
        { label: "Facilități", value: "servicii de masă pentru oaspeți" },
        { label: "Rezervări", value: "prin platforme online (Booking.com, Agoda)" }
      ]
    },
    en: {
      tagline: "A larger, 19-room guesthouse on Avram Iancu street in Brad.",
      description: [
        "Pensiunea Ana Maria is located at 52 Avram Iancu street, in Brad, and offers 43 beds across 19 rooms (16 double and 3 triple), with meal service for guests. It is one of the largest accommodation units in town, also suited to groups."
      ],
      facts: [
        { label: "Address", value: "52 Avram Iancu street, Brad" },
        { label: "Rooms", value: "19 rooms (16 double, 3 triple), 43 beds" },
        { label: "Facilities", value: "meal service for guests" },
        { label: "Booking", value: "via online platforms (Booking.com, Agoda)" }
      ]
    }
  },
  {
    id: "pensiunea-phoenix-simeria",
    name: "Pensiunea Phoenix",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Simeria",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Pensiune cu 8 camere duble, la marginea Simeriei, pe drumul spre Deva.",
      description: [
        "Pensiunea Phoenix este situată în satul Sântandrei, aparținător orașului Simeria, la circa 700 de metri de Simeria, pe partea stângă a drumului spre Deva (la aproximativ 10 km de Deva). Dispune de 8 camere duble, oferind o alternativă mai liniștită de cazare în zonă, potrivită ca bază pentru vizitarea Parcului Dendrologic Simeria și a împrejurimilor."
      ],
      facts: [
        { label: "Adresă", value: "Sântandrei, ferma nr. 5, orașul Simeria" },
        { label: "Camere", value: "8 camere duble" },
        { label: "Reper", value: "~700 m de Simeria, pe drumul spre Deva" },
        { label: "Contact", value: "tel. 0722 379 967" }
      ]
    },
    en: {
      tagline: "An 8-room guesthouse on the edge of Simeria, on the road to Deva.",
      description: [
        "Pensiunea Phoenix is located in Sântandrei village, part of Simeria town, about 700 metres from Simeria, on the left side of the road to Deva (roughly 10 km from Deva). It has 8 double rooms, offering a quieter accommodation option in the area, suited as a base for visiting the Simeria Dendrological Park and its surroundings."
      ],
      facts: [
        { label: "Address", value: "Sântandrei, farm no. 5, Simeria town" },
        { label: "Rooms", value: "8 double rooms" },
        { label: "Landmark", value: "~700 m from Simeria, on the road to Deva" },
        { label: "Contact", value: "phone +40 722 379 967" }
      ]
    }
  },
  {
    id: "atrium-hotel-vulcan",
    name: "Atrium Hotel",
    category: { ro: "Hotel & restaurant", en: "Hotel & restaurant" },
    area: "Vulcan",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Hotel cu design modern, poziționat între stațiunile Straja și Parâng, în Vulcan.",
      description: [
        "Atrium Hotel este situat pe strada Nicolae Titulescu nr. 44, în municipiul Vulcan, între stațiunile montane Straja și Parâng. Combină un design modern cu elemente rustice montane și dispune de restaurant propriu, bar și terasă, alături de camere de tip deluxe și apartamente executive.",
        "Poziția din Valea Jiului îl recomandă atât drumeților și schiorilor care merg spre Straja sau Parâng, cât și celor care caută un popas confortabil în zonă."
      ],
      facts: [
        { label: "Adresă", value: "Str. Nicolae Titulescu nr. 44, Vulcan" },
        { label: "Camere", value: "camere deluxe, apartamente executive" },
        { label: "Facilități", value: "restaurant, bar, terasă" },
        { label: "Contact", value: "tel. 0728 244 511 · office@atriumhotel.ro · atriumhotel.ro" }
      ]
    },
    en: {
      tagline: "A modern-design hotel between the Straja and Parâng resorts, in Vulcan.",
      description: [
        "Atrium Hotel is located at 44 Nicolae Titulescu street, in Vulcan, between the Straja and Parâng mountain resorts. It combines modern design with rustic mountain touches and has its own restaurant, bar and terrace, alongside deluxe rooms and executive apartments.",
        "Its position in the Jiu Valley makes it a good choice both for hikers and skiers heading to Straja or Parâng, and for anyone looking for a comfortable stop in the area."
      ],
      facts: [
        { label: "Address", value: "44 Nicolae Titulescu street, Vulcan" },
        { label: "Rooms", value: "deluxe rooms, executive apartments" },
        { label: "Facilities", value: "restaurant, bar, terrace" },
        { label: "Contact", value: "phone +40 728 244 511 · office@atriumhotel.ro · atriumhotel.ro" }
      ]
    }
  },
  {
    id: "heaven-inn-vulcan",
    name: "Heaven Inn",
    category: { ro: "Restaurant", en: "Restaurant" },
    area: "Vulcan",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Restaurant deschis în 2022, cu bucătărie românească și internațională, în centrul Vulcanului.",
      description: [
        "Heaven Inn este un restaurant deschis în mai 2022 pe Bulevardul Mihai Viteazu nr. 14, în centrul municipiului Vulcan. Are un meniu variat, românesc și internațional, terasă și zonă interioară climatizată, plus opțiunea de comandă și livrare online."
      ],
      facts: [
        { label: "Adresă", value: "Bd. Mihai Viteazu nr. 14, Vulcan" },
        { label: "Deschis", value: "2022" },
        { label: "Specific", value: "bucătărie românească și internațională, livrare la domiciliu" },
        { label: "Contact", value: "tel. 0790 865 091 · heaven-inn.com" }
      ]
    },
    en: {
      tagline: "A restaurant opened in 2022, with Romanian and international cuisine, in central Vulcan.",
      description: [
        "Heaven Inn is a restaurant opened in May 2022 at 14 Mihai Viteazu boulevard, in central Vulcan. It has a varied Romanian and international menu, a terrace and an air-conditioned indoor area, plus online ordering and delivery."
      ],
      facts: [
        { label: "Address", value: "14 Mihai Viteazu boulevard, Vulcan" },
        { label: "Opened", value: "2022" },
        { label: "Cuisine", value: "Romanian and international, home delivery" },
        { label: "Contact", value: "phone +40 790 865 091 · heaven-inn.com" }
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
  },
  {
    id: "hotel-rusu-parang",
    name: "Hotel Rusu",
    category: { ro: "Hotel & restaurant", en: "Hotel & restaurant" },
    area: "Petroșani",
    coords: [45.390162, 23.4377853],
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Hotel de altitudine (1.168 m) în stațiunea Parâng, la cca. 10 km de Petroșani.",
      description: [
        "Hotel Rusu este situat direct în masivul Parâng, la altitudinea de 1.168 m, la aproximativ 10 km de municipiul Petroșani. Oferă acces facil la pârtiile de schi din zonă și dispune de o zonă de wellness cu ciubăr și saună.",
        "Poziția izolată, în mijlocul pădurii de munte, îl recomandă atât pentru sejururi de schi iarna, cât și pentru drumeții vara."
      ],
      facts: [
        { label: "Altitudine", value: "1.168 m, Masivul Parâng" },
        { label: "Contact", value: "tel. 0742 087 221 · info@hotelrusu.ro · hotelrusu.ro" }
      ]
    },
    en: {
      tagline: "A mountain hotel at 1,168 m altitude in the Parâng resort, about 10 km from Petroșani.",
      description: [
        "Hotel Rusu is located directly in the Parâng massif, at an altitude of 1,168 m, about 10 km from the city of Petroșani. It offers easy access to the area's ski slopes and has a wellness area with a hot tub and sauna.",
        "Its secluded position, in the middle of the mountain forest, makes it suitable both for winter ski stays and summer hikes."
      ],
      facts: [
        { label: "Altitude", value: "1,168 m, Parâng massif" },
        { label: "Contact", value: "phone +40 742 087 221 · info@hotelrusu.ro · hotelrusu.ro" }
      ]
    }
  },
  {
    id: "pensiunea-bujor-de-munte-petrosani",
    name: "Pensiunea Bujor de Munte",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Petroșani",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Pensiune 3 stele la poalele Parângului, cu 17 camere și 2 apartamente.",
      description: [
        "Pensiunea Bujor de Munte este situată pe Strada Bujorului, în stațiunea Parâng, la aproximativ 12 km de Petroșani. Oferă 17 camere duble și 2 apartamente, toate cu internet, minibar și baie proprie.",
        "Dispune de restaurant-bar pentru 45 de persoane și sală de conferințe pentru 50 de persoane, fiind potrivită atât pentru sejururi turistice, cât și pentru evenimente de grup."
      ],
      facts: [
        { label: "Locație", value: "Strada Bujorului, stațiunea Parâng, cca. 12 km de Petroșani" },
        { label: "Camere", value: "17 camere duble + 2 apartamente" },
        { label: "Contact", value: "tel. 0254 549 060 / 0735 553 140 · rezervari@bujordemunte.ro · bujordemunte.ro" }
      ]
    },
    en: {
      tagline: "A 3-star guesthouse at the foot of the Parâng mountains, with 17 rooms and 2 apartments.",
      description: [
        "Pensiunea Bujor de Munte is located on Strada Bujorului, in the Parâng resort, about 12 km from Petroșani. It offers 17 double rooms and 2 apartments, all with internet, a minibar and a private bathroom.",
        "It has a restaurant-bar for 45 people and a conference room for 50 people, making it suitable both for tourist stays and group events."
      ],
      facts: [
        { label: "Location", value: "Strada Bujorului, Parâng resort, about 12 km from Petroșani" },
        { label: "Rooms", value: "17 double rooms + 2 apartments" },
        { label: "Contact", value: "phone +40 254 549 060 / +40 735 553 140 · rezervari@bujordemunte.ro · bujordemunte.ro" }
      ]
    }
  },
  {
    id: "pensiunea-floare-de-colt-petrosani",
    name: "Pensiunea Floare de Colț",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Petroșani",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Pensiune la intrarea în Defileul Jiului, pe strada Livezeni.",
      description: [
        "Pensiunea Floare de Colț este situată pe strada Livezeni nr. 36, într-un cadru pitoresc, chiar la intrarea dinspre Petroșani în Defileul Jiului."
      ],
      facts: [
        { label: "Adresă", value: "Str. Livezeni nr. 36, Petroșani" }
      ]
    },
    en: {
      tagline: "A guesthouse at the entrance to the Jiu Gorge, on Strada Livezeni.",
      description: [
        "Pensiunea Floare de Colț is located on Strada Livezeni no. 36, in a picturesque setting right at the entrance to the Jiu Gorge from Petroșani."
      ],
      facts: [
        { label: "Address", value: "Str. Livezeni no. 36, Petroșani" }
      ]
    }
  },
  {
    id: "complex-turistic-valea-mosului-petrosani",
    name: "Complex Turistic Valea Moșului",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Petroșani",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Complex turistic în mijlocul naturii, la poalele Parângului.",
      description: [
        "Complex Turistic Valea Moșului este situat pe strada Dărănești nr. 73C, într-o locație liniștită, la poalele masivului Parâng."
      ],
      facts: [
        { label: "Adresă", value: "Str. Dărănești nr. 73C, Petroșani" }
      ]
    },
    en: {
      tagline: "A tourist complex surrounded by nature, at the foot of the Parâng mountains.",
      description: [
        "Complex Turistic Valea Moșului is located on Strada Dărănești no. 73C, in a quiet setting at the foot of the Parâng massif."
      ],
      facts: [
        { label: "Address", value: "Str. Dărănești no. 73C, Petroșani" }
      ]
    }
  },
  {
    id: "cabana-la-cassian-vulcan",
    name: "Cabana la Cassian",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Vulcan",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Cabană pe strada Decebal, în orașul Vulcan.",
      description: [
        "Cabana la Cassian este situată pe strada Decebal nr. 153, în orașul Vulcan, aproape de accesul spre stațiunea Straja."
      ],
      facts: [
        { label: "Adresă", value: "Str. Decebal nr. 153, Vulcan" }
      ]
    },
    en: {
      tagline: "A mountain cabin on Strada Decebal, in the town of Vulcan.",
      description: [
        "Cabana la Cassian is located on Strada Decebal no. 153, in the town of Vulcan, close to the access road to the Straja resort."
      ],
      facts: [
        { label: "Address", value: "Str. Decebal no. 153, Vulcan" }
      ]
    }
  },
  {
    id: "pensiunea-paradisul-verde-vulcan",
    name: "Pensiunea Paradisul Verde",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Vulcan",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Pensiune pe strada Socănească, în Vulcan, la cca. 15 km de Straja.",
      description: [
        "Pensiunea Paradisul Verde este situată pe strada Socănească nr. 8, în municipiul Vulcan, la aproximativ 15 km de stațiunea Straja. Oferă bucătărie tradițională și servicii de restaurant."
      ],
      facts: [
        { label: "Adresă", value: "Str. Socănească nr. 8, Vulcan" }
      ]
    },
    en: {
      tagline: "A guesthouse on Strada Socănească, in Vulcan, about 15 km from Straja.",
      description: [
        "Pensiunea Paradisul Verde is located on Strada Socănească no. 8, in the town of Vulcan, about 15 km from the Straja resort. It offers traditional cuisine and restaurant service."
      ],
      facts: [
        { label: "Address", value: "Str. Socănească no. 8, Vulcan" }
      ]
    }
  },
  {
    id: "cabana-casa-ozon-vulcan",
    name: "Cabana Casa Ozon",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Vulcan",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Cabană pe strada Dealul Babii, în Vulcan.",
      description: [
        "Cabana Casa Ozon este situată pe strada Dealul Babii nr. 18C, în orașul Vulcan, aproape de traseul Dealul Babii și de accesul spre Straja."
      ],
      facts: [
        { label: "Adresă", value: "Str. Dealul Babii nr. 18C, Vulcan" }
      ]
    },
    en: {
      tagline: "A cabin on Strada Dealul Babii, in Vulcan.",
      description: [
        "Cabana Casa Ozon is located on Strada Dealul Babii no. 18C, in the town of Vulcan, close to the Dealul Babii trail and the access road to Straja."
      ],
      facts: [
        { label: "Address", value: "Str. Dealul Babii no. 18C, Vulcan" }
      ]
    }
  },
  {
    id: "pensiunea-dor-de-munte-lupeni",
    name: "Pensiunea Dor de Munte",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Lupeni",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Pensiune renovată recent în Lupeni, lângă un parc de aventură.",
      description: [
        "Pensiunea Dor de Munte, din Lupeni, oferă camere spațioase cu baie proprie și televizor smart, cu o capacitate totală de 54 de locuri în 21 de spații de cazare.",
        "La aproximativ 50 m se află un parc de aventură cu perete de cățărare, iar la 100 m sunt mai multe pârtii de schi și snowboard."
      ],
      facts: [
        { label: "Locație", value: "Lupeni, lângă parcul de aventură" },
        { label: "Capacitate", value: "21 spații de cazare, 54 locuri" }
      ]
    },
    en: {
      tagline: "A recently renovated guesthouse in Lupeni, next to an adventure park.",
      description: [
        "Pensiunea Dor de Munte, in Lupeni, offers spacious rooms with private bathroom and smart TV, with a total capacity of 54 beds across 21 accommodation units.",
        "About 50 m away there is an adventure park with a climbing wall, and 100 m away there are several ski and snowboard slopes."
      ],
      facts: [
        { label: "Location", value: "Lupeni, next to the adventure park" },
        { label: "Capacity", value: "21 accommodation units, 54 beds" }
      ]
    }
  },
  {
    id: "complexul-montana-lupeni",
    name: "Complexul Montana",
    category: { ro: "Hotel & restaurant", en: "Hotel & restaurant" },
    area: "Munții Vâlcan, Lupeni",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Complex 3 stele în Munții Vâlcan, la 1.367 m altitudine.",
      description: [
        "Complexul Montana este situat direct în Munții Vâlcan, la o altitudine de 1.367 m, în apropierea orașului Lupeni. Oferă cazare de 3 stele și acces facil la trasee montane."
      ],
      facts: [
        { label: "Altitudine", value: "1.367 m, Munții Vâlcan" }
      ]
    },
    en: {
      tagline: "A 3-star complex in the Vâlcan Mountains, at 1,367 m altitude.",
      description: [
        "Complexul Montana is located directly in the Vâlcan Mountains, at an altitude of 1,367 m, near the town of Lupeni. It offers 3-star accommodation and easy access to mountain trails."
      ],
      facts: [
        { label: "Altitude", value: "1,367 m, Vâlcan Mountains" }
      ]
    }
  },
  {
    id: "vila-casa-cu-tei-lupeni",
    name: "Vila Casa cu Tei",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Lupeni",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Vilă cu piscină, pe strada Calea Brăii, în Lupeni.",
      description: [
        "Vila Casa cu Tei este situată pe strada Calea Brăii nr. 116, în orașul Lupeni, și dispune de piscină proprie."
      ],
      facts: [
        { label: "Adresă", value: "Str. Calea Brăii nr. 116, Lupeni" },
        { label: "Facilități", value: "piscină" }
      ]
    },
    en: {
      tagline: "A villa with a pool, on Strada Calea Brăii, in Lupeni.",
      description: [
        "Vila Casa cu Tei is located on Strada Calea Brăii no. 116, in the town of Lupeni, and has its own swimming pool."
      ],
      facts: [
        { label: "Address", value: "Str. Calea Brăii no. 116, Lupeni" },
        { label: "Facilities", value: "swimming pool" }
      ]
    }
  },
  {
    id: "pensiunea-izvorul-maleii-petrila",
    name: "Pensiunea Izvorul Maleii",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Jieț, Petrila",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Pensiune bine cotată în valea Jieț, lângă un teleschi, în Petrila.",
      description: [
        "Pensiunea Izvorul Maleii este situată pe strada Jieț nr. 1T, în zona de munte a orașului Petrila, aproape de un teleschi."
      ],
      facts: [
        { label: "Adresă", value: "Str. Jieț nr. 1T, Petrila" }
      ]
    },
    en: {
      tagline: "A well-rated guesthouse in the Jieț valley, next to a ski lift, in Petrila.",
      description: [
        "Pensiunea Izvorul Maleii is located on Strada Jieț no. 1T, in the mountain area of Petrila, close to a ski lift."
      ],
      facts: [
        { label: "Address", value: "Str. Jieț no. 1T, Petrila" }
      ]
    }
  },
  {
    id: "cabana-brazihouse-petrila",
    name: "Cabana Brazihouse",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Jileț, Petrila",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Cabană de munte lângă Munții Parâng, în zona Jileț a Petrilei.",
      description: [
        "Cabana Brazihouse este situată pe strada Jileț nr. 2T, în zona de munte a orașului Petrila, aproape de Munții Parâng."
      ],
      facts: [
        { label: "Adresă", value: "Jileț nr. 2T, Petrila" }
      ]
    },
    en: {
      tagline: "A mountain cabin near the Parâng Mountains, in Petrila's Jileț area.",
      description: [
        "Cabana Brazihouse is located on Jileț no. 2T, in the mountain area of Petrila, close to the Parâng Mountains."
      ],
      facts: [
        { label: "Address", value: "Jileț no. 2T, Petrila" }
      ]
    }
  },
  {
    id: "cabana-taia-parang-sureanu-petrila",
    name: "Cabana Taia Parâng-Șureanu",
    category: { ro: "Cazare", en: "Accommodation" },
    area: "Taia, Petrila",
    hasReviews: true,
    season: "tot-anul",
    images: ["images/placeholder.svg"],
    ro: {
      tagline: "Cabană montană cu șemineu, pe strada Taia, în Petrila.",
      description: [
        "Cabana Taia Parâng-Șureanu este situată pe strada Taia nr. 53B, în zona de munte a orașului Petrila, și dispune de șemineu."
      ],
      facts: [
        { label: "Adresă", value: "Str. Taia nr. 53B, Petrila" },
        { label: "Facilități", value: "șemineu" }
      ]
    },
    en: {
      tagline: "A mountain cabin with a fireplace, on Strada Taia, in Petrila.",
      description: [
        "Cabana Taia Parâng-Șureanu is located on Strada Taia no. 53B, in the mountain area of Petrila, and has a fireplace."
      ],
      facts: [
        { label: "Address", value: "Str. Taia no. 53B, Petrila" },
        { label: "Facilities", value: "fireplace" }
      ]
    }
  }
];
