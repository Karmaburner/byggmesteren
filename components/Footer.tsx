import Link from "next/link";
import { apningstider, firma, meny } from "@/lib/firma";

export function Footer() {
  return (
    <footer className="matte mt-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl font-semibold">{firma.kortnavn}</p>
          <p className="merke mt-1">i Hringariki</p>
          <p className="mt-5">{firma.slagord}</p>
        </div>
        <div>
          <h2 className="merke font-mono">Kontakt</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={`tel:${firma.telefonLenke}`} className="text-kritt underline">
                {firma.telefon}
              </a>
            </li>
            <li>
              <a href={`mailto:${firma.epost}`} className="text-kritt underline">
                {firma.epost}
              </a>
            </li>
            <li>
              {firma.gate}, {firma.postnr} {firma.sted}
            </li>
          </ul>
          <dl className="mt-5 space-y-1">
            {apningstider.map((rad) => (
              <div key={rad.dag} className="flex flex-wrap justify-between gap-x-4">
                <dt>{rad.dag}</dt>
                <dd>{rad.tid}</dd>
              </div>
            ))}
          </dl>
        </div>
        <nav aria-label="Bunnmeny">
          <h2 className="merke font-mono">Sider</h2>
          <ul className="mt-4 space-y-2">
            {meny.map((punkt) => (
              <li key={punkt.href}>
                <Link href={punkt.href} className="text-kritt underline">
                  {punkt.tekst}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/om-demoen/" className="text-kritt underline">
                Om demoen
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-kritt/40">
        <p className="mx-auto w-full max-w-6xl px-5 py-5 sm:px-8">
          Byggmesteren i Hringariki finnes ikke. Navn, priser, prosjekter og omtaler er oppdiktet. Siden er en demo
          laget av{" "}
          <a href="https://lilitlabs.com" className="font-bold text-kritt underline">
            Lilit Labs
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
