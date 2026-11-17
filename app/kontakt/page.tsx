import type { Metadata } from "next";
import { Foto, Ramme, SideTopp } from "@/components/Felles";
import { Skjema } from "@/components/Skjema";
import { apningstider, firma } from "@/lib/firma";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Be om gratis befaring. Vi svarer innen én arbeidsdag.",
};

export default function Kontakt() {
  return (
    <>
      <SideTopp tittel="Neste prosjekt. La oss ta en prat.">
        <p className="notat -rotate-1">befaringen er gratis</p>
        <p className="mt-3">Ring, send e-post eller fyll ut skjemaet. Vi svarer innen én arbeidsdag.</p>
      </SideTopp>

      <Ramme className="pb-10">
        <Foto
          navn="verksted"
          alt="Verkstedet til Byggmesteren: lavt bygg i trekledning med stor port, materialer stablet utenfor og åser i bakgrunnen."
          tidlig
        />
      </Ramme>

      <Ramme className="grid gap-10 pb-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="matte border-2 border-blekk p-7">
          <h2 className="merke font-mono">Direkte</h2>
          <p className="mt-4">
            <a href={`tel:${firma.telefonLenke}`} className="font-display text-5xl font-semibold text-kritt underline">
              {firma.telefon}
            </a>
          </p>
          <p className="mt-4">
            <a href={`mailto:${firma.epost}`} className="break-all text-xl text-kritt underline">
              {firma.epost}
            </a>
          </p>
          <h2 className="merke mt-9 font-mono">Verksted</h2>
          <p className="mt-3 text-xl">
            {firma.gate}
            <br />
            {firma.postnr} {firma.sted}
          </p>
          <h2 className="merke mt-9 font-mono">Åpent</h2>
          <dl className="mt-3 space-y-2">
            {apningstider.map((rad) => (
              <div key={rad.dag} className="flex flex-wrap justify-between gap-x-4 border-b border-kritt/40 pb-2">
                <dt>{rad.dag}</dt>
                <dd className="font-mono">{rad.tid}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Skjema />
      </Ramme>
    </>
  );
}
