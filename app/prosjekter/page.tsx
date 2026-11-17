import type { Metadata } from "next";
import { Eksempelmerke, Knapp, Kort, Ramme, SideTopp } from "@/components/Felles";
import { Skisse } from "@/components/Tegninger";
import { prosjekter } from "@/lib/firma";

export const metadata: Metadata = {
  title: "Prosjekter",
  description: "Tilbygg, rehabilitering og terrasse levert på Ringerike. Eksemplene er oppdiktet.",
};

export default function Prosjekter() {
  return (
    <>
      <SideTopp tittel="Sist levert.">
        <p>Tre jobber fra de siste årene. Hver av dem startet med en befaring og en tegning.</p>
      </SideTopp>

      <Ramme>
        {prosjekter.map((p, i) => (
          <article key={p.nr} className="border-t-2 border-blekk py-12">
            <div className={`grid items-start gap-8 md:grid-cols-2 md:gap-12`}>
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <p className="flex flex-wrap items-center gap-3">
                  <span className="merke text-rod-mork">
                    {p.type} · {p.ar}
                  </span>
                  <Eksempelmerke>Oppdiktet</Eksempelmerke>
                </p>
                <h2 className="mt-3 text-4xl sm:text-5xl">{p.tittel}</h2>
                <p className="mt-2 text-xl text-dempet">{p.sted}</p>
                <p className="mt-5 max-w-xl">{p.tekst}</p>
                <dl className="mt-6 grid max-w-xl grid-cols-3 border-2 border-blekk bg-kort">
                  {p.fakta.map((f) => (
                    <div key={f.navn} className="border-r border-blekk p-4 last:border-r-0">
                      <dt className="merke text-dempet">{f.navn}</dt>
                      <dd className="mt-1 font-bold">{f.verdi}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <Kort className="p-4">
                <Skisse navn={p.skisse} className="h-auto w-full" />
                <p className="merke mt-3 flex flex-wrap justify-between gap-x-4 border-t-2 border-blekk pt-2 text-dempet">
                  <span>{p.type}</span>
                  <span>Ikke i målestokk</span>
                </p>
              </Kort>
            </div>
          </article>
        ))}

        <div className="border-t-2 border-blekk py-12">
          <h2 className="max-w-2xl text-4xl sm:text-5xl">Neste tegning kan være din.</h2>
          <div className="mt-6">
            <Knapp href="/kontakt/">Be om befaring</Knapp>
          </div>
        </div>
      </Ramme>
    </>
  );
}
