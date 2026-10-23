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
  },
  {
    id: "poiana-rusca-lacuri-chei-furnale",
    name: { ro: "Poiana Ruscă: lacuri, chei și furnale", en: "Poiana Ruscă: lakes, gorges and furnaces" },
    ro: {
      tagline: "Lacul Cinciș, Cheile Cernei și Furnalul de la Govăjdia, într-un weekend din Munții Poiana Ruscă, cu Hunedoara ca bază.",
      intro: [
        "Poiana Ruscă se vede cel mai bine plecând din Hunedoara. Prima zi alternează apa (Lacul Cinciș) cu peisajul de chei de pe valea Cernei, iar a doua leagă tradiția siderurgică de la Govăjdia cu Castelul Corvinilor din oraș."
      ]
    },
    en: {
      tagline: "Cincis Lake, the Cerna Gorge and the Govăjdia Blast Furnace, over a weekend in the Poiana Ruscă Mountains, with Hunedoara as a base.",
      intro: [
        "Poiana Ruscă is best explored from Hunedoara. Day one alternates water (Cincis Lake) with the gorge scenery of the Cerna valley, while day two links the ironworking tradition at Govăjdia with Corvin Castle in town."
      ]
    },
    days: [
      {
        title: { ro: "Ziua 1 — Apă și chei", en: "Day 1 — Water and gorges" },
        stops: [
          { k: "SITE_NATURE", id: "lacul-cincis" },
          { k: "SITE_NATURE", id: "cheile-cernei" },
          { k: "SITE_ACTIVITIES", id: "traseu-hunedoara-lacul-cincis-cheile-cernei", optional: true }
        ]
      },
      {
        title: { ro: "Ziua 2 — Fier și castel", en: "Day 2 — Iron and a castle" },
        stops: [
          { k: "SITE_HERITAGE", id: "furnalul-govajdia" },
          { k: "SITE_HERITAGE", id: "castelul-corvinilor" },
          { k: "SITE_ACTIVITIES", id: "traseu-hunedoara-varful-rusca", optional: true }
        ]
      }
    ],
    eat: ["pensiunea-la-fontaine-hunedoara","curtea-veche-hunedoara","eden-by-werk-hunedoara"],
    mountain: true
  },
  {
    id: "tara-zarandului-aur-si-istorie",
    name: { ro: "Țara Zarandului: aur, istorie și ape termale", en: "Zarand Country: gold, history and thermal waters" },
    ro: {
      tagline: "Muzeul Aurului din Brad, casa lui Crișan, Țebea și Băile Vața, în zona Brad–Baia de Criș.",
      intro: [
        "Brad și împrejurimile lui leagă trei teme: aurul Munților Metaliferi, răscoalele din 1784 și 1848 și satele de pe Crișul Alb. Prima zi rămâne în Brad și în comuna Ribița; a doua duce spre Țebea, Grohot și Băile Vața de Jos."
      ]
    },
    en: {
      tagline: "The Gold Museum in Brad, Crișan's house, Țebea and Vața Spa, around Brad and Baia de Criș.",
      intro: [
        "Brad and its surroundings link three themes: the gold of the Metaliferi Mountains, the uprisings of 1784 and 1848, and the villages on the Crișul Alb. Day one stays in Brad and Ribița commune; day two heads to Țebea, Grohot and Vața de Jos Spa."
      ]
    },
    days: [
      {
        title: { ro: "Ziua 1 — Aur și răscoală", en: "Day 1 — Gold and uprising" },
        stops: [
          { k: "SITE_HERITAGE", id: "muzeul-aurului-brad" },
          { k: "SITE_HERITAGE", id: "casa-memoriala-crisan" },
          { k: "SITE_HERITAGE", id: "treptele-romane-ruda-brad", optional: true }
        ]
      },
      {
        title: { ro: "Ziua 2 — Țebea, Grohot și Vața", en: "Day 2 — Țebea, Grohot and Vața" },
        stops: [
          { k: "SITE_HERITAGE", id: "panteonul-motilor-tebea" },
          { k: "SITE_NATURE", id: "podul-natural-grohot", optional: true },
          { k: "SITE_ACTIVITIES", id: "baile-vata-de-jos" },
          { k: "SITE_HERITAGE", id: "biserica-de-lemn-ciungani", optional: true }
        ]
      }
    ],
    eat: ["pensiunea-irina-brad","pensiunea-ana-maria-brad"]
  },
  {
    id: "tara-hategului-castele-si-biserici",
    name: { ro: "Țara Hațegului: castele, biserici de piatră și Sarmizegetusa", en: "Hațeg Country: castles, stone churches and Sarmizegetusa" },
    ro: {
      tagline: "Geoparcul, biserica din Densuș, Ulpia Traiana, castelele de la Săcel și Păclișa și cetatea Mălăiești, în două zile în jurul Hațegului.",
      intro: [
        "Țara Hațegului adună într-un perimetru mic geologie, urme romane și castele nobiliare. Prima zi merge pe linia Hațeg–Densuș–Sarmizegetusa; a doua leagă castelele și cetatea de la poalele Retezatului."
      ]
    },
    en: {
      tagline: "The Geopark, Densuș church, Ulpia Traiana, the castles at Săcel and Păclișa and Mălăiești fortress, over two days around Hațeg.",
      intro: [
        "Hațeg Country packs geology, Roman remains and noble castles into a small area. Day one follows the Hațeg–Densuș–Sarmizegetusa line; day two links the castles and the fortress at the foot of the Retezat."
      ]
    },
    days: [
      {
        title: { ro: "Ziua 1 — Dinozauri și romani", en: "Day 1 — Dinosaurs and Romans" },
        stops: [
          { k: "SITE_NATURE", id: "geoparcul-tara-hategului" },
          { k: "SITE_HERITAGE", id: "biserica-densus" },
          { k: "SITE_HERITAGE", id: "ulpia-traiana-sarmizegetusa" }
        ]
      },
      {
        title: { ro: "Ziua 2 — Castele și cetăți", en: "Day 2 — Castles and fortresses" },
        stops: [
          { k: "SITE_HERITAGE", id: "castelul-nopcsa-sacel" },
          { k: "SITE_HERITAGE", id: "castelul-pogany-pacliza", optional: true, note: {ro:"Azi spital pentru copii: se admiră din exterior; vizitarea nu e documentată.",en:"Now a children's hospital: admire it from outside; visiting is not documented."} },
          { k: "SITE_HERITAGE", id: "cetatea-malaiesti" },
          { k: "SITE_HERITAGE", id: "manastirea-prislop", optional: true }
        ]
      }
    ],
    eat: ["pensiunea-avy-hateg","avy-wine-dine-hateg"]
  },
  {
    id: "simeria-vetel-biserici-de-lemn",
    name: { ro: "Simeria, Vețel și bisericile de lemn de pe Mureș", en: "Simeria, Vețel and the wooden churches along the Mureș" },
    ro: {
      tagline: "Parcul Dendrologic, castelele de la Simeria și Mintia, castrul Micia și cinci biserici și cetăți din Ilia, Șoimuș, Beriu și Dobra.",
      intro: [
        "Culoarul Mureșului ascunde, în afara orașelor mari, parcuri, castele și biserici de lemn. Prima zi rămâne în jurul Simeriei și al Vețelului; a doua urmărește Mureșul spre Ilia și satele din jur."
      ]
    },
    en: {
      tagline: "The Dendrological Park, the castles at Simeria and Mintia, Micia fort and five churches and fortifications in Ilia, Șoimuș, Beriu and Dobra.",
      intro: [
        "Beyond its larger towns, the Mureș corridor hides parks, castles and wooden churches. Day one stays around Simeria and Vețel; day two follows the Mureș towards Ilia and the surrounding villages."
      ]
    },
    days: [
      {
        title: { ro: "Ziua 1 — Simeria și Vețel", en: "Day 1 — Simeria and Vețel" },
        stops: [
          { k: "SITE_NATURE", id: "parcul-dendrologic-simeria" },
          { k: "SITE_HERITAGE", id: "castelul-bela-fay-simeria" },
          { k: "SITE_HERITAGE", id: "castelul-gyulay-mintia" },
          { k: "SITE_HERITAGE", id: "castrul-roman-micia", optional: true }
        ]
      },
      {
        title: { ro: "Ziua 2 — Spre Ilia", en: "Day 2 — Towards Ilia" },
        stops: [
          { k: "SITE_HERITAGE", id: "bastionul-rosu-ilia" },
          { k: "SITE_HERITAGE", id: "biserica-de-lemn-bretea-mureseana" },
          { k: "SITE_HERITAGE", id: "biserica-de-lemn-soimus", optional: true },
          { k: "SITE_HERITAGE", id: "biserica-beriu", optional: true },
          { k: "SITE_HERITAGE", id: "biserica-lapusnic", optional: true }
        ]
      }
    ],
    eat: ["pensiunea-phoenix-simeria","hotel-sarmis-deva"]
  },
  {
    id: "geoagiu-bai-si-aurel-vlaicu",
    name: { ro: "Geoagiu-Băi și satul lui Aurel Vlaicu", en: "Geoagiu-Băi and Aurel Vlaicu's village" },
    ro: {
      tagline: "Stațiunea, termele romane Germisara, rotonda și castrul de la Geoagiu, casa memorială Aurel Vlaicu, într-o zi în zona Geoagiu.",
      intro: [
        "O zi plină în jurul Geoagiului: dimineața apă termală și vestigii romane, după-amiaza satul inventatorului Aurel Vlaicu și biserica din Boz."
      ]
    },
    en: {
      tagline: "The spa resort, the Germisara Roman baths, the rotunda and fort at Geoagiu and the Aurel Vlaicu memorial house, in a day around Geoagiu.",
      intro: [
        "A full day around Geoagiu: thermal water and Roman remains in the morning, the village of the inventor Aurel Vlaicu and the church in Boz in the afternoon."
      ]
    },
    days: [
      {
        title: { ro: "Ziua 1 — Geoagiu", en: "Day 1 — Geoagiu" },
        stops: [
          { k: "SITE_ACTIVITIES", id: "statiunea-geoagiu-bai" },
          { k: "SITE_HERITAGE", id: "termele-romane-germisara" },
          { k: "SITE_HERITAGE", id: "castrul-roman-germisara", optional: true },
          { k: "SITE_HERITAGE", id: "rotonda-geoagiu" },
          { k: "SITE_HERITAGE", id: "casa-memoriala-aurel-vlaicu" },
          { k: "SITE_NATURE", id: "cascada-clocota", optional: true }
        ]
      }
    ],
    eat: ["hotel-germisara-geoagiu-bai","bistro-merinde-orastie"]
  }
];
