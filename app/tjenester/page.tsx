import type { Metadata } from "next";
import { Knapp, Kort, Mal, Ramme, SideTopp } from "@/components/Felles";
import { Skisse } from "@/components/Tegninger";
import { tjenester } from "@/lib/firma";

export const metadata: Metadata = {
  title: "Tjenester",
  description: "Tilbygg, rehabilitering, tak, terrasse og nybygg på Ringerike. Tegning og fast pris før vi bygger.",
};

export default function Tjenester() {
  return (
    <>
      <SideTopp tittel="Fra første strek til siste list.">
        <p>Fem fag, én måte å jobbe på: befaring, tegning og fast pris før vi bygger.</p>
      </SideTopp>

      <Ramme>
        <nav aria-label="Tjenestene på siden" className="border-y-2 border-blekk py-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {tjenester.map((t) => (
              <li key={t.nr}>
                <a href={`#tjeneste-${t.nr}`} className="inline-flex min-h-11 items-center font-bold text-blekk">
                  {t.navn}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {tjenester.map((t, i) => (
          <section
            key={t.nr}
            id={`tjeneste-${t.nr}`}
            className="grid scroll-mt-6 items-center gap-8 border-b-2 border-blekk py-12 md:grid-cols-2 md:gap-12"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl">{t.navn}</h2>
              <p className="notat mt-3">{t.tittel.toLowerCase()}</p>
              <p className="mt-5 max-w-xl">{t.tekst}</p>
              <p className="mt-6">
                <Mal>{t.fra}</Mal>
              </p>
            </div>
            <Kort className={`p-4 ${i % 2 === 1 ? "md:order-first" : ""}`}>
              <Skisse navn={t.skisse} className="h-auto w-full" />
            </Kort>
          </section>
        ))}

        <div className="py-12">
          <p className="max-w-xl text-xl">Prisene er eksempler. Du får alltid fast pris skriftlig etter befaring.</p>
          <div className="mt-6">
            <Knapp href="/kontakt/">Be om befaring</Knapp>
          </div>
        </div>
      </Ramme>
    </>
  );
}
