import type { Metadata } from "next";
import Link from "next/link";
import { Ramme, SideTopp } from "@/components/Felles";

export const metadata: Metadata = {
  title: "Om demoen",
  description: "Byggmesteren i Hringariki finnes ikke. Siden er laget av Lilit Labs for å vise hva et byggefirma kan få.",
};

// Skrevet ut fra hva firmaet får, ikke hvordan det er bygd.
const punkter = [
  {
    tittel: "Ser ut som faget",
    tekst: "Rutepapir, mål og tegninger er hentet fra byggmesterens egen hverdag. Siden kunne ikke tilhørt en frisør.",
    href: "/",
  },
  {
    tittel: "Viser i stedet for å love",
    tekst: "Ett tilbygg følges fra befaring til overlevering. Kunden ser hvordan jobben går før de tar kontakt.",
    href: "/#slik-jobber-vi",
  },
  {
    tittel: "Åpen pris",
    tekst: "Regnestykket står på siden. Det gir færre telefoner som bare handler om hva ting koster.",
    href: "/#steg-03",
  },
  {
    tittel: "Lett å lese",
    tekst: "Stor skrift og sterk kontrast. Alt kan brukes med tastatur og stor zoom. Bevegelse stopper for dem som har slått det av.",
    href: "/tjenester/",
  },
  {
    tittel: "Ingen bilder å vente på",
    tekst: "Alle tegninger er streker i koden. Siden laster raskt, også på byggeplassen med dårlig dekning.",
    href: "/prosjekter/",
  },
  {
    tittel: "Lett å ta kontakt",
    tekst: "Telefonnummeret står øverst på hver side, og skjemaet har bare fire felt.",
    href: "/kontakt/",
  },
];

export default function OmDemoen() {
  return (
    <>
      <SideTopp tittel="Et byggefirma som ikke finnes.">
        <p>
          Byggmesteren i Hringariki er laget av Lilit Labs for å vise hva en tømrer eller byggmester kan få: en side som
          ser ut som faget og forklarer jobben før første telefon.
        </p>
      </SideTopp>

      <Ramme>
        <dl className="grid gap-x-14 border-t-2 border-blekk md:grid-cols-2">
          {punkter.map((p) => (
            <div key={p.tittel} className="border-b-2 border-blekk py-7">
              <dt className="font-display text-3xl font-semibold">
                <Link href={p.href} className="text-blekk">
                  {p.tittel}
                </Link>
              </dt>
              <dd className="mt-2 max-w-xl">{p.tekst}</dd>
            </div>
          ))}
        </dl>

        <div className="matte mt-12 border-2 border-blekk p-8 sm:p-12">
          <h2 className="max-w-2xl text-4xl sm:text-5xl">Driver du med bygg og vil ha noe lignende?</h2>
          <p className="mt-5 max-w-xl text-xl">
            Navn, folk, priser, prosjekter og omtaler på denne siden er oppdiktet. Din side bygges rundt dine egne
            jobber.
          </p>
          <p className="mt-8">
            <a
              href="https://lilitlabs.com"
              className="inline-flex min-h-12 items-center gap-3 bg-rod px-6 py-3 font-bold text-white no-underline hover:bg-rod-mork"
            >
              Ta kontakt med Lilit Labs <span aria-hidden="true">→</span>
            </a>
          </p>
        </div>
      </Ramme>
    </>
  );
}
