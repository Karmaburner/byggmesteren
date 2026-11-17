import Link from "next/link";
import { Avsnitt, Eksempelmerke, Knapp, Kort, Mal, Ramme, Strekknapp } from "@/components/Felles";
import { Hero } from "@/components/Hero";
import { Fortelling } from "@/components/Fortelling";
import { Skisse } from "@/components/Tegninger";
import { firma, folk, prosjekter, tjenester } from "@/lib/firma";

export default function Forside() {
  return (
    <>
      {/* Ark 01: forside */}
      <Hero />
      {/* Ark 02: fortellingen */}
      <section id="slik-jobber-vi" className="scroll-mt-4 pt-20 sm:pt-28">
        <Ramme>
          <Avsnitt nr={2}>Slik jobber vi</Avsnitt>
          <div className="py-10">
            <h2 className="max-w-3xl text-5xl sm:text-6xl">Ett tilbygg. Fem steg.</h2>
            <p className="mt-5 max-w-2xl text-xl">
              Følg en ny stue på <Mal>25,2 m²</Mal> fra første befaring til nøkkelen er levert. Slik går alle jobbene
              våre, store og små.
            </p>
          </div>
          <Fortelling />
        </Ramme>
      </section>

      {/* Ark 03: tjenester */}
      <section className="pt-20 sm:pt-28">
        <Ramme>
          <Avsnitt nr={3}>Tjenester</Avsnitt>
          <div className="flex flex-wrap items-end justify-between gap-6 py-10">
            <h2 className="max-w-2xl text-5xl sm:text-6xl">Det vi bygger.</h2>
            <Strekknapp href="/tjenester/">Alle tjenester</Strekknapp>
          </div>
          <ul className="border-t-2 border-blekk">
            {tjenester.map((t) => (
              <li key={t.nr} className="border-b-2 border-blekk">
                <Link
                  href={`/tjenester/#tjeneste-${t.nr}`}
                  className="grid gap-x-8 gap-y-1 py-5 text-blekk no-underline hover:bg-kort sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_2rem] sm:items-baseline sm:px-3"
                >
                  <span className="font-display text-3xl font-semibold">{t.navn}</span>
                  <span>{t.tittel}</span>
                  <span aria-hidden="true" className="hidden font-mono sm:block">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Ramme>
      </section>

      {/* Ark 04: bevis */}
      <section className="pt-20 sm:pt-28">
        <Ramme>
          <Avsnitt nr={4}>Med kundens ord</Avsnitt>
          <div className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <figure>
              <blockquote>
                <p className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
                  «Prisen vi fikk var prisen vi betalte.»
                </p>
                <p className="mt-6 max-w-xl text-xl">
                  Sigurd fant råte i bunnsvillen allerede på befaringen og la det inn i tilbudet. Da veggen ble åpnet,
                  var det ingen overraskelser. Vi fikk melding hver fredag og visste alltid hva som skjedde.
                </p>
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center gap-4">
                <span>
                  <span className="block font-bold">Marit Berg, Tyristrand</span>
                  <span className="block text-dempet">Rehabilitering av tømmerhus</span>
                </span>
                <Eksempelmerke>Oppdiktet</Eksempelmerke>
              </figcaption>
            </figure>
            <Kort className="self-start p-6">
              <p className="merke border-b-2 border-blekk pb-2">Saksark</p>
              <dl>
                {[
                  { navn: "Oppdrag", verdi: "Rehabilitering" },
                  { navn: "Hus", verdi: "Tømmerhus fra 1924, 140 m²" },
                  { navn: "Sted", verdi: "Tyristrand" },
                  { navn: "Byggetid", verdi: "5 måneder, som planlagt" },
                  { navn: "Utfall", verdi: "Levert til avtalt pris" },
                ].map((rad) => (
                  <div key={rad.navn} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3 border-b border-blekk/25 py-3">
                    <dt className="merke text-dempet">{rad.navn}</dt>
                    <dd>{rad.verdi}</dd>
                  </div>
                ))}
              </dl>
            </Kort>
          </div>
        </Ramme>
      </section>

      {/* Ark 05: prosjekter */}
      <section className="pt-20 sm:pt-28">
        <Ramme>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Avsnitt nr={5}>Prosjekter</Avsnitt>
            <Eksempelmerke>Oppdiktede eksempler</Eksempelmerke>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6 py-10">
            <h2 className="max-w-2xl text-5xl sm:text-6xl">Sist levert.</h2>
            <Strekknapp href="/prosjekter/">Alle prosjekter</Strekknapp>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {prosjekter.map((p) => (
              <li key={p.nr}>
                <Kort className="flex h-full flex-col">
                  <div className="border-b-2 border-blekk bg-papir p-4">
                    <Skisse navn={p.skisse} className="h-auto w-full" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="merke text-rod-mork">
                      {p.type} · {p.ar}
                    </p>
                    <h3 className="mt-2 text-3xl">{p.tittel}</h3>
                    <p className="mt-1 text-dempet">{p.sted}</p>
                  </div>
                </Kort>
              </li>
            ))}
          </ul>
        </Ramme>
      </section>

      {/* Ark 06: folkene */}
      <section className="pt-20 sm:pt-28">
        <Ramme>
          <Avsnitt nr={6}>Folkene</Avsnitt>
          <h2 className="max-w-2xl py-10 text-5xl sm:text-6xl">De som kommer hjem til deg.</h2>
          <div className="matte border-2 border-blekk p-7 sm:p-10">
            <p className="notat text-gul!">samme folk fra første befaring til siste list</p>
            <ul className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-3">
              {folk.map((f) => (
                <li key={f.navn} className="border-kritt/40 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0">
                  <p className="font-display text-3xl font-semibold leading-tight">{f.navn}</p>
                  <p className="mt-2">
                    {f.rolle}. {f.fakta}.
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Ramme>
      </section>

      {/* Avslutning */}
      <section className="pt-20 sm:pt-28">
        <Ramme>
          <div className="matte border-2 border-blekk p-8 sm:p-12">
            <p className="merke">Start med tegningen</p>
            <h2 className="mt-4 max-w-3xl text-5xl sm:text-6xl">Skal du bygge? Snakk med oss før du bestemmer deg.</h2>
            <p className="mt-5 max-w-xl text-xl">Befaringen er gratis og du får svar på hva som lar seg gjøre.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Knapp href="/kontakt/">Be om befaring</Knapp>
              <a href={`tel:${firma.telefonLenke}`} className="font-mono text-xl font-medium text-kritt underline">
                {firma.telefon}
              </a>
            </div>
          </div>
        </Ramme>
      </section>
    </>
  );
}
