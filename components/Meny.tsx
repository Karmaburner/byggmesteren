"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { firma, meny } from "@/lib/firma";

const lenke =
  "merke inline-flex min-h-11 items-center border-b-4 text-gul-tekst no-underline hover:border-gul-tekst";

// Menyen står på en gul tommestokk med målestreker. Rød strek viser hvilken side du er på.
// På mobil ligger tommestokken sammenfoldet bak en «Meny»-knapp og foldes ut når den trykkes.
export function Meny() {
  const sti = usePathname();
  const [apen, setApen] = useState(false);
  const lukk = () => setApen(false);

  return (
    <>
      <button
        type="button"
        aria-expanded={apen}
        aria-controls="hovedmeny"
        onClick={() => setApen(!apen)}
        className="tommestokk-meny merke ml-auto inline-flex min-h-12 items-center gap-3 border-2 border-gul-tekst bg-gul px-4 pt-2 text-gul-tekst md:hidden"
      >
        {apen ? "Lukk" : "Meny"}
        <svg viewBox="0 0 20 14" className="h-3.5 w-5" aria-hidden="true">
          {apen ? (
            <path d="M3 1l14 12M17 1 3 13" fill="none" stroke="currentColor" strokeWidth="2.2" />
          ) : (
            <path d="M0 1h20M0 7h20M0 13h20" fill="none" stroke="currentColor" strokeWidth="2.2" />
          )}
        </svg>
      </button>

      <nav
        id="hovedmeny"
        aria-label="Hovedmeny"
        onKeyDown={(e) => {
          if (e.key === "Escape") lukk();
        }}
        className={`tommestokk-meny w-full border-2 border-gul-tekst bg-gul md:block md:w-auto md:flex-1 ${
          apen ? "fold-ut" : "max-md:hidden"
        }`}
      >
        <ul className="flex flex-col px-4 pb-2 pt-3 sm:px-6 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-x-6 md:pb-0">
          {meny.map((punkt) => {
            const aktiv = !punkt.href.includes("#") && sti.startsWith(punkt.href);
            return (
              <li key={punkt.href}>
                <Link
                  href={punkt.href}
                  onClick={lukk}
                  aria-current={aktiv ? "page" : undefined}
                  className={`${lenke} ${aktiv ? "border-rod" : "border-transparent"}`}
                >
                  {punkt.tekst}
                </Link>
              </li>
            );
          })}
          <li>
            <a href={`tel:${firma.telefonLenke}`} className={`${lenke} border-transparent`}>
              Tlf {firma.telefon}
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
