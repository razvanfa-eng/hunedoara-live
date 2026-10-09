/*
 * EVENIMENTE CARE REVIN / RECURRING EVENTS (calendar.html)
 * =====================================================================
 * Doar evenimente cu ediții confirmate de o sursă oficială sau de organizatori. Nu estimăm
 * date pentru anii următori: fiecare intrare arată ULTIMA EDIȚIE CONFIRMATĂ și sursa ei.
 * Evenimentele cu dată anunțată (viitoare) vin automat din Știri (js/data.js: categoriile
 * Concert, Festival, Spectacol, Târg) — vezi calendar.html și evenimente.ics.
 *
 *   id        unic
 *   name      { ro, en }
 *   place     { ro, en }
 *   basis     { ro, en } — ultima ediție confirmată (ediție, date)
 *   organizer { ro, en } — doar dacă sursa îl indică
 *   newsId    opțional — id din SITE_NEWS (link spre pagina din ghid)
 *   source    { label: {ro, en}, url } — sursa publică a datelor (https)
 *   checked   data verificării (AAAA-LL-ZZ)
 */
window.SITE_EVENTS_RECURRING = [
  {
    id: "carpatica-deva",
    name: { ro: "Festivalul Internațional de Folclor „Carpatica”", en: "Carpatica International Folklore Festival" },
    place: { ro: "Deva (10 iulie), Simeria (11 iulie), Geoagiu și Geoagiu-Băi (12 iulie)", en: "Deva (10 July), Simeria (11 July), Geoagiu and Geoagiu-Băi (12 July)" },
    basis: { ro: "Ediția a XXV-a, 10–12 iulie 2026, cu ansambluri din șapte țări; informațiile au fost comunicate de Primăria Deva.", en: "25th edition, 10–12 July 2026, with ensembles from seven countries; the information was released by Deva City Hall." },
    source: { label: { ro: "Agerpres, 6 iulie 2026", en: "Agerpres, 6 July 2026" }, url: "https://agerpres.ro/cultura-media/2026/07/06/hunedoara-festivalul-international-de-folclor-carpatica-de-la-deva-aduce-in-judet-ansambluri-din-sap--1573515" },
    checked: "2026-10-09"
  },
  {
    id: "opera-nights",
    name: { ro: "Festivalul în aer liber „Opera Nights”", en: "“Opera Nights” open-air festival" },
    place: { ro: "Orăștie, Petrila, Hunedoara și Deva", en: "Orăștie, Petrila, Hunedoara and Deva" },
    basis: { ro: "Ediția 2025: 24–27 iulie (Orăștie 24, Petrila 25, Hunedoara 26, Deva 27), spectacole la ora 21:00, acces gratuit. Nu am găsit o ediție 2026 anunțată.", en: "2025 edition: 24–27 July (Orăștie 24, Petrila 25, Hunedoara 26, Deva 27), performances at 21:00, free admission. We did not find a 2026 edition announced." },
    organizer: { ro: "Consiliul Județean Hunedoara", en: "Hunedoara County Council" },
    source: { label: { ro: "Agerpres, 30 mai 2025", en: "Agerpres, 30 May 2025" }, url: "https://agerpres.ro/cultura-media/2025/05/30/hunedoara-festivalul-de-opera-in-aer-liber-opera-nights-in-perioada-24-27-iulie--1454895" },
    checked: "2026-10-09"
  },
  {
    id: "umor-liviu-oros",
    name: { ro: "Festivalul Național de Umor „Liviu Oros”", en: "“Liviu Oros” National Humour Festival" },
    place: { ro: "Deva", en: "Deva" },
    basis: { ro: "Ediția a XXV-a, 9–10 octombrie 2026.", en: "25th edition, 9–10 October 2026." },
    organizer: { ro: "Primăria Municipiului Deva și Centrul Cultural „Drăgan Muntean”", en: "Deva City Hall and the “Drăgan Muntean” Cultural Centre" },
    newsId: "festivalul-umor-liviu-oros-2026",
    source: { label: { ro: "Pagina evenimentului din ghid (organizatorii)", en: "The event's page in the guide (organisers)" }, url: "" },
    checked: "2026-10-09"
  },
  {
    id: "stelele-cetatii",
    name: { ro: "Festivalul-Concurs Național „Stelele Cetății”", en: "“Stelele Cetății” National Pop Music Festival-Contest" },
    place: { ro: "Deva", en: "Deva" },
    basis: { ro: "Ediția a XLIII-a, 24–25 octombrie 2026.", en: "43rd edition, 24–25 October 2026." },
    organizer: { ro: "Primăria Municipiului Deva și Centrul Cultural „Drăgan Muntean”", en: "Deva City Hall and the “Drăgan Muntean” Cultural Centre" },
    newsId: "stelele-cetatii-deva-2026",
    source: { label: { ro: "Pagina evenimentului din ghid (organizatorii)", en: "The event's page in the guide (organisers)" }, url: "" },
    checked: "2026-10-09"
  },
  {
    id: "targul-de-craciun-deva",
    name: { ro: "Târgul de Crăciun Deva", en: "Deva Christmas Market" },
    place: { ro: "Piața Unirii, Deva", en: "Piața Unirii, Deva" },
    basis: { ro: "Ediția 2026: 1 decembrie 2026 – 10 ianuarie 2027. Programul zilnic și cel artistic nu sunt încă anunțate.", en: "2026 edition: 1 December 2026 – 10 January 2027. The daily and artistic programmes have not been announced yet." },
    organizer: { ro: "Primăria Municipiului Deva", en: "Deva City Hall" },
    newsId: "targul-de-craciun-deva-2026",
    source: { label: { ro: "Pagina evenimentului din ghid (organizatorii)", en: "The event's page in the guide (organisers)" }, url: "" },
    checked: "2026-10-09"
  }
];
