"use client";

import { useEffect, useRef, useState } from "react";
import { eksempel, kr, steg } from "@/lib/firma";
import { Tilbygg } from "@/components/Tegninger";
import { Avsnitt, Eksempelmerke, Foto, Kort } from "@/components/Felles";

// Ett tilbygg fulgt gjennom fem steg.
// Bred skjerm: tegningen står fast til venstre og bytter lag når et nytt steg kommer midt i vinduet.
// Smal skjerm: hvert steg har sin egen tegning over teksten.
export function Fortelling() {
  const [aktiv, setAktiv] = useState(1);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (treff) => {
        for (const t of treff) {
          if (t.isIntersecting) setAktiv(Number((t.target as HTMLElement).dataset.steg));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-x-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div className="hidden lg:block">
        <div className="sticky top-8">
          <Kort className="p-5">
            <div className="merke flex justify-between border-b-2 border-blekk pb-2">
              <span>Tegning T-01 · Plan</span>
              <span>1:100</span>
            </div>
            <Tilbygg steg={aktiv} className="mt-3 h-auto w-full" />
          </Kort>
          <ol className="mt-4 flex flex-wrap gap-x-5 gap-y-2" aria-label="Stegene i fortellingen">
            {steg.map((s, i) => (
              <li key={s.nr}>
                <a
                  href={`#steg-${s.nr}`}
                  aria-current={aktiv === i + 1 ? "step" : undefined}
                  className={`merke block min-h-11 border-t-4 pt-2 no-underline ${
                    aktiv === i + 1 ? "border-rod text-blekk" : "border-blekk/30 text-dempet"
                  }`}
                >
                  {s.nr} {s.fase}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div>
        {steg.map((s, i) => (
          <article
            key={s.nr}
            id={`steg-${s.nr}`}
            data-steg={i + 1}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="scroll-mt-8 border-t-2 border-blekk py-10 lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center lg:py-16"
          >
            <Kort className="mb-6 p-4 lg:hidden">
              <Tilbygg steg={i + 1} className="h-auto w-full" />
            </Kort>
            <Avsnitt nr={i + 1}>{s.fase}</Avsnitt>
            <h3 className="mt-4 text-4xl sm:text-[2.75rem]">{s.tittel}</h3>
            <p className="mt-5 max-w-xl">{s.tekst}</p>

            {i === 2 && <Kalkyle />}
            {i === 3 && (
              <Foto
                navn="tilbygg-bygging"
                alt="Tilbygget under bygging: reisverk og sperrer i lyst trevirke er reist inntil det hvite huset."
                className="mt-7 max-w-xl"
              />
            )}
            {i === 4 && (
              <Foto
                navn="tilbygg-ferdig"
                alt="Det samme tilbygget ferdig, med stående trekledning og store skyvedører i glass mot hagen."
                className="mt-7 max-w-xl"
              />
            )}

            <div className="mt-7 max-w-xl border-l-4 border-rod pl-5">
              <p className="merke">Her kommer vi inn</p>
              <ul className="mt-2 space-y-1">
                {s.viKommerInn.map((punkt) => (
                  <li key={punkt} className="flex gap-3">
                    <span aria-hidden="true" className="font-mono">
                      +
                    </span>
                    {punkt}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// Regnestykket står åpent, som i et ekte tilbud.
function Kalkyle() {
  return (
    <Kort className="mt-7 max-w-xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-blekk pb-2">
        <p className="merke">Kalkyle K-01 · Tilbygg</p>
        <Eksempelmerke />
      </div>
      <table className="mt-3 w-full">
        <caption className="sr-only">Eksempel på kalkyle for tilbygg på 25,2 kvadratmeter</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Post</th>
            <th scope="col">Andel</th>
            <th scope="col">Sum</th>
          </tr>
        </thead>
        <tbody>
          {eksempel.poster.map((post) => (
            <tr key={post.navn} className="border-b border-blekk/25">
              <th scope="row" className="py-2 pr-3 text-left font-normal">
                {post.navn}
              </th>
              {/* Tall og prosenttegn skal ikke deles på to linjer på smale skjermer. */}
              <td className="whitespace-nowrap py-2 pr-3 text-right font-mono text-base text-dempet">
                {post.andel}&nbsp;%
              </td>
              <td className="whitespace-nowrap py-2 text-right font-mono text-base">{kr(post.sum)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" className="pt-3 text-left font-bold">
              Fast pris inkl. mva.
            </th>
            <td />
            <td className="whitespace-nowrap pt-3 text-right font-mono font-bold">{kr(eksempel.sum)}</td>
          </tr>
        </tfoot>
      </table>
      <p className="mt-4 font-mono text-base">
        <span className="whitespace-nowrap">4,2 m × 6 m</span> = <span className="whitespace-nowrap">25,2 m²</span> ×{" "}
        <span className="whitespace-nowrap">{kr(eksempel.kvmPris)}</span> ={" "}
        <span className="whitespace-nowrap">{kr(eksempel.sum)}</span>
      </p>
      <p className="mt-2 text-base text-dempet">
        Tallene er et eksempel og ikke et tilbud. Tilbygg starter på 30 000 kr per m². Dette har store vinduer mot vest
        og ligger derfor høyere.
      </p>
    </Kort>
  );
}
