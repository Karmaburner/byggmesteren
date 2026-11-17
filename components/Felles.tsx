import Link from "next/link";

// Hovedknapp: låverød med hvit tekst. Bare én per valg.
export function Knapp({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center gap-3 bg-rod px-6 py-3 font-bold text-white no-underline hover:bg-rod-mork"
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

// Sekundærknapp: strek rundt, samme størrelse.
export function Strekknapp({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center gap-3 border-2 border-blekk bg-papir px-6 py-3 font-bold text-blekk no-underline hover:bg-kort"
    >
      {children}
    </Link>
  );
}

// Stripen øverst på hvert «ark»: arknummer til venstre, målestokk eller merknad til høyre.
export function Arkstripe({ venstre, hoyre }: { venstre: string; hoyre?: string }) {
  return (
    <div className="merke flex flex-wrap justify-between gap-x-6 gap-y-1 border-b-2 border-blekk pb-2">
      <span>{venstre}</span>
      {hoyre && <span>{hoyre}</span>}
    </div>
  );
}

// Avsnittsmerke: tall i håndtegnet sirkel, navn i håndskrift med håndtegnet strek under.
export function Avsnitt({ nr, children }: { nr: number | string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-blekk">
      <span className="relative grid h-11 w-11 shrink-0 place-items-center font-hand text-xl">
        <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d="M24.6 4.1C14.2 2.4 4.6 9.8 3.8 20.6 3 31.4 10.6 40 21.4 40.4c10.6.4 18.8-7.2 19-17.8C40.6 12.6 33.8 4.6 23.4 3.6c-2-.2-4 .1-5.8.7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <span className="relative">{nr}</span>
      </span>
      <span className="relative pb-2.5 font-hand text-lg uppercase tracking-[0.08em] sm:text-xl">
        {children}
        <svg
          viewBox="0 0 200 10"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-2.5 w-full"
          aria-hidden="true"
        >
          <path
            d="M2 6.5C34 3 62 7.5 100 5s66 2.5 98-1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>
    </p>
  );
}

export function Ramme({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

// Toppen på undersidene.
export function SideTopp({
  tittel,
  children,
}: {
  tittel: string;
  children?: React.ReactNode;
}) {
  return (
    <Ramme className="pb-10 pt-10 sm:pt-14">
      <h1 className="max-w-3xl text-5xl sm:text-7xl">{tittel}</h1>
      {children && <div className="mt-6 max-w-2xl text-xl">{children}</div>}
    </Ramme>
  );
}

// Gult målmerke, som teipen på en tommestokk.
export function Mal({ children }: { children: React.ReactNode }) {
  return <span className="merke bg-gul px-2 py-1 text-gul-tekst">{children}</span>;
}

// Kort på lysere papir med blekkstrek rundt.
export function Kort({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border-2 border-blekk bg-kort ${className}`}>{children}</div>;
}

// Merker oppdiktet innhold ærlig.
export function Eksempelmerke({ children = "Eksempel" }: { children?: React.ReactNode }) {
  return <span className="merke border border-rod-mork px-2 py-0.5 text-rod-mork">{children}</span>;
}
