# Imagini / Images

Pune fișierele aici. Numele fișierelor trebuie să fie **exact** cele din lista
`images` a fiecărei intrări din `js/data.js` (orice secțiune: locuri, activități,
istorie, orașe, știri, afaceri). Format `.jpg`, minim ~1600 px pe latura mare,
orientare peisaj de preferat. Dacă un fișier lipsește, site-ul afișează automat
`placeholder.svg`.

Prima imagine din listă e folosită pe card și ca imagine mare pe pagina de detaliu.

Pagina **Imagini & credite** (`credite.html`) generează automat lista completă din
toate cele 6 secțiuni ale `js/data.js`, deci după ce adaugi conținutul real vei
vedea acolo toate numele de fișiere de care ai nevoie.

## Pozele din recenzii

Sunt separate: vizitatorii le încarcă prin formular, iar în modul „remote" ajung
în Supabase Storage (bucket `review-photos`), nu în acest folder.
