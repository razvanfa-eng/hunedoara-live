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
