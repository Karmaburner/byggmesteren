"use client";

import { useEffect, useRef, useState } from "react";
import { Avsnitt, Knapp, Strekknapp } from "@/components/Felles";
import { firma } from "@/lib/firma";

// Heroen: et hus i isometrisk strek som bygges mens du ruller.
// Ren SVG regnet ut i koden, ingen 3D-bibliotek. Slår brukeren av bevegelse, vises huset ferdig.

const BLEKK = "#1d2625";
const KORT = "#f6f1e6";
const BETONG = "#d8d0bf";
const ROD = "#a93a24";
const MATTE = "#1f3d36";
const KRITT = "#f3eee2";
const GUL = "#e8b73a";

// Mål i meter. Huset er 10 × 7 m med saltak, tomta 18 × 14 m.
const L = 10;
const W = 7;
const S = 24;
const C = 0.866;

type P3 = [number, number, number];

// Isometrisk projeksjon: x går ned mot høyre, y ned mot venstre, z rett opp.
const pr = ([x, y, z]: P3) => [(x - y) * C * S, (x + y) * 0.5 * S - z * S];
const pts = (punkter: P3[]) =>
  punkter
    .map((p) =>
      pr(p)
        .map((n) => n.toFixed(1))
        .join(","),
    )
    .join(" ");
const linje = (a: P3, b: P3) => {
  const [x1, y1] = pr(a);
  const [x2, y2] = pr(b);
  return { x1, y1, x2, y2 };
};
const mellom = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

// Hvert trinn dekker en del av rullingen, fra start til slutt (0 til 1).
const trinn = [
  { navn: "Tomt", notat: "her skal det stå", start: 0, slutt: 0.04 },
  { navn: "Grunnmur", notat: "såle og grunnmur", start: 0.04, slutt: 0.18 },
  { navn: "Reisverk", notat: "stendere c/c 600", start: 0.18, slutt: 0.56 },
  { navn: "Tak", notat: "sperrer og tett tak", start: 0.56, slutt: 0.86 },
  { navn: "Ferdig", notat: "klar til innflytting", start: 0.86, slutt: 1 },
];

// Hvor høyt huset er akkurat nå, i meter: grunnmur, vegger og tak.
const hoyder = (p: number) => ({
  g: 0.4 * mellom(p, 0.04, 0.16),
  hw: 2.6 * mellom(p, 0.18, 0.44),
  r: 2.2 * mellom(p, 0.56, 0.74),
});

function Tre({ x, y }: { x: number; y: number }) {
  const [bx, by] = pr([x, y, 0]);
  return (
    <g stroke={KRITT} strokeWidth="1.5" fill={MATTE}>
      <line x1={bx} y1={by} x2={bx} y2={by - 30} />
      <circle cx={bx} cy={by - 44} r="17" />
      <circle cx={bx - 9} cy={by - 34} r="11" />
      <circle cx={bx + 10} cy={by - 35} r="10" />
    </g>
  );
}

function Hus({ p }: { p: number }) {
  const { g, hw, r } = hoyder(p);
  const kledd = mellom(p, 0.44, 0.54);
  const tekket = mellom(p, 0.74, 0.84);
  const detaljer = mellom(p, 0.86, 0.96);
  const topp = g + hw;

  const rutenett = [];
  for (let x = -4; x <= 14; x++) rutenett.push(linje([x, -3.5, 0], [x, 10.5, 0]));
  for (let y = -3.5; y <= 10.5; y++) rutenett.push(linje([-4, y, 0], [14, y, 0]));

  const stendereFront: number[] = [];
  for (let x = 0; x <= L + 0.01; x += 0.625) stendereFront.push(x);
  const stendereGavl: number[] = [];
  for (let y = 0; y <= W + 0.01; y += 0.7) stendereGavl.push(y);

  const [mx, my] = pr([L / 2, W + 1.3, 0]);
  const [nx, ny] = pr([L + 1.3, W / 2, 0]);

  return (
    <svg
      viewBox="-330 -150 720 470"
      className="h-full w-full"
      role="img"
      aria-label="Isometrisk tegning av et hus som bygges trinn for trinn mens du ruller: tomt, grunnmur, reisverk, tak og ferdig hus."
    >
      {/* Tomta: skjærematte med ruter på én meter */}
      <polygon
        points={pts([
          [-4, -3.5, 0],
          [14, -3.5, 0],
          [14, 10.5, 0],
          [-4, 10.5, 0],
        ])}
        fill={MATTE}
        stroke={BLEKK}
        strokeWidth="2.5"
      />
      <g stroke={KRITT} strokeWidth="1" opacity="0.2">
        {rutenett.map((l, i) => (
          <line key={i} {...l} />
        ))}
      </g>
      <Tre x={-2.5} y={-1.5} />
      <Tre x={12.5} y={-2} />

      {/* Utstikking av huset og mål */}
      <polygon
        points={pts([
          [0, 0, 0],
          [L, 0, 0],
          [L, W, 0],
          [0, W, 0],
        ])}
        fill="none"
        stroke={GUL}
        strokeWidth="2"
        strokeDasharray="7 6"
      />
      <g stroke={KRITT} strokeWidth="1.5">
        <line {...linje([0, W + 1.3, 0], [L, W + 1.3, 0])} />
        <line {...linje([0, W + 0.9, 0], [0, W + 1.7, 0])} />
        <line {...linje([L, W + 0.9, 0], [L, W + 1.7, 0])} />
        <line {...linje([L + 1.3, 0, 0], [L + 1.3, W, 0])} />
        <line {...linje([L + 0.9, 0, 0], [L + 1.7, 0, 0])} />
        <line {...linje([L + 0.9, W, 0], [L + 1.7, W, 0])} />
      </g>
      <g fill={KRITT} fontSize="17" textAnchor="middle" style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}>
        <text x={mx} y={my + 22} transform={`rotate(30 ${mx} ${my + 22})`}>
          10 000
        </text>
        <text x={nx + 8} y={ny + 22} transform={`rotate(-30 ${nx + 8} ${ny + 22})`}>
          7 000
        </text>
      </g>

      {/* Grunnmur */}
      {g > 0 && (
        <g fill={BETONG} stroke={BLEKK} strokeWidth="2" strokeLinejoin="round">
          <polygon
            points={pts([
              [0, 0, g],
              [L, 0, g],
              [L, W, g],
              [0, W, g],
            ])}
          />
          <polygon
            points={pts([
              [0, W, 0],
              [L, W, 0],
              [L, W, g],
              [0, W, g],
            ])}
          />
          <polygon
            points={pts([
              [L, 0, 0],
              [L, W, 0],
              [L, W, g],
              [L, 0, g],
            ])}
          />
        </g>
      )}

      {hw > 0 && (
        <>
          {/* Bakre vegger, synlige gjennom reisverket */}
          <g stroke={BLEKK} strokeWidth="1.5" opacity={0.45 * (1 - kledd)}>
            <line {...linje([0, 0, g], [0, 0, topp])} />
            <line {...linje([0, 0, topp], [L, 0, topp])} />
            <line {...linje([0, 0, topp], [0, W, topp])} />
          </g>

          {/* Bakre sperrer */}
          {r > 0 && (
            <g stroke={BLEKK} strokeWidth="1.5" opacity={0.45 * (1 - tekket)}>
              {stendereFront.map((x) => (
                <line key={x} {...linje([x, 0, topp], [x, W / 2, topp + r])} />
              ))}
            </g>
          )}

          {/* Kledning på de to veggene vi ser */}
          <g fill={KORT} opacity={kledd}>
            <polygon
              points={pts([
                [0, W, g],
                [L, W, g],
                [L, W, topp],
                [0, W, topp],
              ])}
            />
            <polygon
              points={pts([
                [L, 0, g],
                [L, W, g],
                [L, W, topp],
                [L, 0, topp],
              ])}
            />
          </g>

          {/* Reisverk */}
          <g stroke={BLEKK} strokeWidth="1.5" opacity={1 - kledd}>
            {stendereFront.map((x) => (
              <line key={x} {...linje([x, W, g], [x, W, topp])} />
            ))}
            {stendereGavl.map((y) => (
              <line key={y} {...linje([L, y, g], [L, y, topp])} />
            ))}
          </g>

          {/* Omriss av veggene */}
          <g fill="none" stroke={BLEKK} strokeWidth="2.5" strokeLinejoin="round">
            <polygon
              points={pts([
                [0, W, g],
                [L, W, g],
                [L, W, topp],
                [0, W, topp],
              ])}
            />
            <polygon
              points={pts([
                [L, 0, g],
                [L, W, g],
                [L, W, topp],
                [L, 0, topp],
              ])}
            />
          </g>

          {/* Vinduer og dør */}
          <g fill={MATTE} stroke={BLEKK} strokeWidth="2" strokeLinejoin="round" opacity={detaljer}>
            <polygon
              points={pts([
                [1.4, W, g + 1],
                [3.2, W, g + 1],
                [3.2, W, g + 2.1],
                [1.4, W, g + 2.1],
              ])}
            />
            <polygon
              points={pts([
                [5.6, W, g + 1],
                [8.6, W, g + 1],
                [8.6, W, g + 2.1],
                [5.6, W, g + 2.1],
              ])}
            />
            <polygon
              points={pts([
                [L, 4.6, g + 1],
                [L, 6, g + 1],
                [L, 6, g + 2.1],
                [L, 4.6, g + 2.1],
              ])}
            />
            <polygon
              fill={ROD}
              points={pts([
                [L, 1.6, g],
                [L, 2.6, g],
                [L, 2.6, g + 2.1],
                [L, 1.6, g + 2.1],
              ])}
            />
          </g>
        </>
      )}

      {r > 0 && (
        <>
          {/* Gavl */}
          <polygon
            points={pts([
              [L, 0, topp],
              [L, W, topp],
              [L, W / 2, topp + r],
            ])}
            fill={KORT}
            fillOpacity={tekket}
            stroke={BLEKK}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Sperrer foran */}
          <g stroke={BLEKK} strokeWidth="1.5" opacity={1 - tekket}>
            {stendereFront.map((x) => (
              <line key={x} {...linje([x, W, topp], [x, W / 2, topp + r])} />
            ))}
          </g>
          {/* Taktekke */}
          <polygon
            points={pts([
              [0, W, topp],
              [L, W, topp],
              [L, W / 2, topp + r],
              [0, W / 2, topp + r],
            ])}
            fill={ROD}
            fillOpacity={tekket}
            stroke={BLEKK}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Pipe */}
          <g fill={KORT} stroke={BLEKK} strokeWidth="2" strokeLinejoin="round" opacity={detaljer}>
            <polygon
              points={pts([
                [7, 4.2, topp + 1.76],
                [7.7, 4.2, topp + 1.76],
                [7.7, 4.2, topp + 3],
                [7, 4.2, topp + 3],
              ])}
            />
            <polygon
              points={pts([
                [7.7, 3.5, topp + 2.2],
                [7.7, 4.2, topp + 1.76],
                [7.7, 4.2, topp + 3],
                [7.7, 3.5, topp + 3],
              ])}
            />
            <polygon
              points={pts([
                [7, 3.5, topp + 3],
                [7.7, 3.5, topp + 3],
                [7.7, 4.2, topp + 3],
                [7, 4.2, topp + 3],
              ])}
            />
          </g>
        </>
      )}

      <Tre x={-2.2} y={9} />
      <Tre x={12.6} y={9.2} />
    </svg>
  );
}

function Innledning() {
  return (
    <>
      <p className="max-w-xl text-xl">
        Vi måler opp, tegner og regner før vi bestiller en eneste planke. Da vet du hva det koster, og vi vet hva vi
        skal bygge.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Knapp href="/kontakt/">Be om befaring</Knapp>
        <Strekknapp href="#slik-jobber-vi">Se hvordan vi jobber</Strekknapp>
      </div>
    </>
  );
}

export function Hero() {
  const ytre = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let ramme = 0;
    // Redusert bevegelse: vis huset ferdig og ikke følg rullingen.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ramme = requestAnimationFrame(() => setP(1));
      return () => cancelAnimationFrame(ramme);
    }
    const mal = () => {
      ramme = 0;
      const el = ytre.current;
      if (!el) return;
      const boks = el.getBoundingClientRect();
      const lengde = boks.height - window.innerHeight;
      const ny = lengde > 0 ? Math.min(1, Math.max(0, -boks.top / lengde)) : 1;
      setP((forrige) => (Math.abs(forrige - ny) > 0.002 ? ny : forrige));
    };
    const vedRulling = () => {
      if (!ramme) ramme = requestAnimationFrame(mal);
    };
    vedRulling();
    window.addEventListener("scroll", vedRulling, { passive: true });
    window.addEventListener("resize", vedRulling);
    return () => {
      window.removeEventListener("scroll", vedRulling);
      window.removeEventListener("resize", vedRulling);
      if (ramme) cancelAnimationFrame(ramme);
    };
  }, []);

  const aktiv = Math.max(
    0,
    trinn.findLastIndex((t) => p >= t.start),
  );
  const h = hoyder(p);
  const hoyde = (h.g + h.hw + h.r).toFixed(1).replace(".", ",");

  return (
    <>
      <div ref={ytre} className="h-[260svh] motion-reduce:h-auto">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden motion-reduce:static motion-reduce:h-auto">
          <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-6">
            <div className="pt-6 lg:pt-0">
              <Avsnitt nr={1}>Byggmester i {firma.sted}</Avsnitt>
              <h1 className="mt-5 text-[clamp(3.25rem,5.2vw,5.25rem)] leading-[0.98]">
                Tegnet først.
                <br />
                Bygget riktig.
              </h1>
              <p className="notat mt-4 -rotate-2">mål to ganger, kapp én gang</p>
              <div className="mt-6 hidden lg:block">
                <Innledning />
              </div>
            </div>
            {/* Tegningen stikker ut til høyre for sidebredden på brede skjermer, opptil 8 rem. */}
            <div className="flex min-h-0 flex-col lg:-mr-[clamp(0rem,calc((100vw-72rem)/2),8rem)] lg:h-full lg:py-6">
              <div className="min-h-0 flex-1">
                <Hus p={p} />
              </div>
              {/* Fremdrift: streken fylles jevnt med rullingen, høyden telles opp, og trinnet glir inn når det skifter. */}
              <div className="pb-4" aria-hidden="true">
                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
                  <p key={aktiv} className="merke glir-inn flex items-center gap-3">
                    <span className="text-rod-mork">{String(aktiv + 1).padStart(2, "0")}</span>
                    <span className="text-lg">{trinn[aktiv].navn}</span>
                  </p>
                  <p key={`notat-${p < 0.04 ? "start" : aktiv}`} className="notat glir-inn">
                    {p < 0.04 ? "rull ned og se huset reise seg ↓" : trinn[aktiv].notat}
                  </p>
                </div>
                <div className="relative mt-11">
                  <span
                    className="merke absolute bottom-full mb-1.5 -translate-x-1/2 whitespace-nowrap bg-gul px-2 py-0.5 text-gul-tekst"
                    style={{
                      left: `clamp(3.2rem, ${(p * 100).toFixed(1)}%, calc(100% - 3.2rem))`,
                    }}
                  >
                    Høyde {hoyde} m
                  </span>
                  <span
                    className="absolute top-0 h-5 w-0.5 -translate-x-1/2 -translate-y-1 bg-blekk"
                    style={{ left: `${(p * 100).toFixed(1)}%` }}
                  />
                  <div className="flex gap-1.5">
                    {trinn.map((t) => (
                      <span
                        key={t.navn}
                        className="tommestokk h-3 overflow-hidden bg-blekk/20"
                        style={{
                          flexGrow: t.slutt - t.start,
                          flexBasis: 0,
                          minWidth: "1.5rem",
                        }}
                      >
                        <span
                          className="block h-full origin-left bg-rod"
                          style={{
                            transform: `scaleX(${mellom(p, t.start, t.slutt).toFixed(3)})`,
                          }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8 lg:hidden">
        <Innledning />
      </div>
    </>
  );
}
