// Alt om firmaet står her og hentes herfra overalt.
// Firmaet er oppdiktet. Navn, adresse, telefon og priser er eksempler.

export const firma = {
  navn: "Byggmesteren i Hringariki",
  kortnavn: "Byggmesteren",
  sted: "Hønefoss",
  gate: "Høvelveien 4",
  postnr: "3500",
  telefon: "12 34 56 78",
  telefonLenke: "+4712345678",
  epost: "post@byggmesteren.example",
  url: "https://karmaburner.github.io/byggmesteren",
  slagord: "Tegnet først. Bygget riktig.",
};

export const meny = [
  { href: "/tjenester/", tekst: "Tjenester" },
  { href: "/prosjekter/", tekst: "Prosjekter" },
  { href: "/#slik-jobber-vi", tekst: "Slik jobber vi" },
  { href: "/kontakt/", tekst: "Kontakt" },
];

export const apningstider = [
  { dag: "Mandag til fredag", tid: "07.00 til 15.30" },
  { dag: "Befaring på kveldstid", tid: "Etter avtale" },
  { dag: "Lørdag og søndag", tid: "Stengt" },
];

export const folk = [
  { initialer: "SH", navn: "Sigurd Haugen", rolle: "Byggmester", fakta: "Mesterbrev 2009" },
  { initialer: "RL", navn: "Ragnhild Lie", rolle: "Tømrer", fakta: "Svennebrev 2016" },
  { initialer: "JM", navn: "Jonas Moen", rolle: "Lærling", fakta: "Andre året" },
];

// Eksempelet som følges gjennom hele forsiden: ett tilbygg på 4,2 × 6 meter.
export const eksempel = {
  bredde: 4.2,
  lengde: 6,
  areal: 25.2,
  kvmPris: 38000,
  sum: 957600,
  poster: [
    { navn: "Grunnarbeid og såle", andel: 14, sum: 134064 },
    { navn: "Reisverk og tak", andel: 31, sum: 296856 },
    { navn: "Vinduer og dør", andel: 12, sum: 114912 },
    { navn: "Isolasjon og kledning", andel: 18, sum: 172368 },
    { navn: "Innvendig, gulv og lister", andel: 17, sum: 162792 },
    { navn: "Rigg, avfall og søknad", andel: 8, sum: 76608 },
  ],
};

export type Steg = {
  nr: string;
  fase: string;
  tittel: string;
  tekst: string;
  viKommerInn: string[];
};

export const steg: Steg[] = [
  {
    nr: "01",
    fase: "Befaring",
    tittel: "Fra idé til mål på papiret",
    tekst:
      "Vi kommer hjem til deg, ser på huset og hører hva du trenger. Så måler vi opp og noterer det som kan koste ekstra senere, som fall på tomta og avstand til naboen.",
    viKommerInn: ["Gratis befaring", "Oppmåling av hus og tomt", "Ærlig svar på hva som lar seg gjøre"],
  },
  {
    nr: "02",
    fase: "Tegning",
    tittel: "Fra mål til ferdig tegning",
    tekst:
      "Tilbygget tegnes med vegger, vinduer og dør inn til huset. Du ser hvor stort det blir før noe er bestilt, og det er billig å flytte en vegg på papir.",
    viKommerInn: ["Plantegning og snitt", "Søknad til kommunen", "Nabovarsel"],
  },
  {
    nr: "03",
    fase: "Tilbud",
    tittel: "Fra tegning til fast pris",
    tekst:
      "Vi regner ut fra tegningen, post for post. Du får én sum og ser hva den består av. Endrer du noe underveis, får du ny pris før vi bygger det.",
    viKommerInn: ["Skriftlig tilbud med fast pris", "Åpen kalkyle", "Fremdriftsplan med datoer"],
  },
  {
    nr: "04",
    fase: "Bygging",
    tittel: "Fra første spadetak til tett tak",
    tekst:
      "Samme folk fra start til slutt. Du får en kort melding hver fredag om hva som er gjort og hva som skjer neste uke. Rørlegger og elektriker bestiller vi.",
    viKommerInn: ["Grunnarbeid, reisverk og tak", "Samordning av andre fag", "Ukentlig melding med bilder"],
  },
  {
    nr: "05",
    fase: "Overlevering",
    tittel: "Fra byggeplass til stue",
    tekst:
      "Vi går gjennom alt sammen med deg, rom for rom. Det som ikke er bra nok, retter vi før du betaler siste del. Du får en perm med tegninger, papirer og garantier.",
    viKommerInn: ["Felles gjennomgang", "Ferdigattest fra kommunen", "Fem års reklamasjonsrett"],
  },
];

export const tjenester = [
  {
    nr: "01",
    navn: "Tilbygg og påbygg",
    tittel: "Fra trangt til romslig",
    tekst: "Mer plass uten å flytte. Ny stue, ekstra soverom eller en etasje til. Vi tar tegning, søknad og bygging.",
    fra: "Fra 30 000 kr per m²",
    skisse: "tilbygg",
  },
  {
    nr: "02",
    navn: "Rehabilitering",
    tittel: "Fra slitt til solid",
    tekst: "Eldre hus trenger folk som ser hva som skjuler seg bak panelet. Vi bytter det som må byttes og lar resten stå.",
    fra: "Pris etter befaring",
    skisse: "snitt",
  },
  {
    nr: "03",
    navn: "Tak og fasade",
    tittel: "Fra lekkasje til tett",
    tekst: "Nytt tak, ny kledning eller etterisolering. Huset blir tett, varmt og klart for tretti nye vintre.",
    fra: "Pris etter befaring",
    skisse: "tak",
  },
  {
    nr: "04",
    navn: "Terrasse og garasje",
    tittel: "Fra plen til platting",
    tekst: "Terrasse, levegg, carport og garasje. Små jobber med samme tegning og samme faste pris som de store.",
    fra: "Fra 4 500 kr per m² terrasse",
    skisse: "terrasse",
  },
  {
    nr: "05",
    navn: "Nybygg",
    tittel: "Fra tomt til hjem",
    tekst: "Enebolig eller hytte fra grunnmur til nøkkel. Vi bygger etter arkitektens tegninger eller hjelper deg å få dem laget.",
    fra: "Pris etter tegning",
    skisse: "snitt",
  },
] as const;

export const prosjekter = [
  {
    nr: "01",
    ar: "2026",
    type: "Tilbygg",
    tittel: "Ny stue mot hagen",
    sted: "Haugsbygd",
    skisse: "tilbygg",
    fakta: [
      { navn: "Areal", verdi: "25 m²" },
      { navn: "Byggetid", verdi: "9 uker" },
      { navn: "Pris", verdi: "Som avtalt" },
    ],
    tekst: "Familien hadde vokst ut av stua. Tilbygget fikk store vinduer mot vest og dør rett ut på terrassen.",
  },
  {
    nr: "02",
    ar: "2025",
    type: "Rehabilitering",
    tittel: "Tømmerhus fra 1924",
    sted: "Tyristrand",
    skisse: "snitt",
    fakta: [
      { navn: "Areal", verdi: "140 m²" },
      { navn: "Byggetid", verdi: "5 måneder" },
      { navn: "Pris", verdi: "Som avtalt" },
    ],
    tekst: "Råte i bunnsvillen ble funnet på befaringen og lagt inn i prisen. Ingen overraskelser da veggen ble åpnet.",
  },
  {
    nr: "03",
    ar: "2025",
    type: "Terrasse",
    tittel: "Platting i to nivåer",
    sted: "Røyse",
    skisse: "terrasse",
    fakta: [
      { navn: "Areal", verdi: "42 m²" },
      { navn: "Byggetid", verdi: "2 uker" },
      { navn: "Pris", verdi: "Som avtalt" },
    ],
    tekst: "Skrå tomt mot Tyrifjorden. To nivåer med trapp mellom ga flat uteplass uten å sprenge.",
  },
] as const;

export function kr(tall: number) {
  return tall.toLocaleString("nb-NO").replace(/ /g, " ") + " kr";
}
