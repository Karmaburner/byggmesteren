import { useId } from "react";

// Alle tegninger er SVG i strek, tegnet for hånd i koden. Ingen bilder.
// Farger: blekk på papir, eller kritt på skjærematte når mork er satt.

const BLEKK = "#1d2625";
const KORT = "#f6f1e6";
const ROD = "#8f2f1c";
const GUL = "#e8b73a";
const KRITT = "#f3eee2";

const mono = { fontFamily: "var(--font-mono)", fontWeight: 500, letterSpacing: "0.04em" } as const;
const hand = { fontFamily: "var(--font-hand)" } as const;

const synlig = (ja: boolean) => ({ opacity: ja ? 1 : 0 });

const beskrivelser = [
  "",
  "Plantegning av huset slik det er i dag. Ønsket tilbygg er merket med stiplet strek.",
  "Plantegning der tilbygget er tegnet inn med vegger, vindu og mål: 4 200 ganger 6 000 millimeter.",
  "Plantegning der tilbygget er markert med areal 25,2 kvadratmeter, som prisen regnes ut fra.",
  "Plantegning der tilbygget er under bygging, med stendere langs veggene.",
  "Plantegning der tilbygget er ferdig og møblert som ny stue, stemplet overlevert.",
];

// Tilbygget som følges gjennom forsiden. Målestokk: 1 meter er 40 enheter.
// Huset er 10 × 7 m, tilbygget 4,2 × 6 m. steg 1 til 5 styrer hvilke lag som vises.
export function Tilbygg({ steg, className = "" }: { steg: number; className?: string }) {
  const id = useId();
  const skravur = `skravur-${id}`;
  const stendere = [];
  for (let y = 172; y <= 388; y += 24) stendere.push([588, y]);
  for (let x = 436; x <= 580; x += 24) {
    stendere.push([x, 156]);
    stendere.push([x, 396]);
  }

  return (
    <svg viewBox="0 0 664 470" className={className} role="img" aria-label={beskrivelser[steg]}>
      <defs>
        <pattern id={skravur} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="12" stroke={ROD} strokeWidth="2.5" />
        </pattern>
      </defs>

      {/* Huset slik det står i dag */}
      <rect x="24" y="140" width="400" height="280" fill={KORT} stroke={BLEKK} strokeWidth="6" />
      <path d="M224 140V420M24 280H224" stroke={BLEKK} strokeWidth="3" />
      <path d="M224 200v44M100 280h44" stroke={KORT} strokeWidth="5" />
      <g fill={BLEKK} fontSize="20" textAnchor="middle" style={mono}>
        <text x="124" y="218">KJØKKEN</text>
        <text x="124" y="358">SOVEROM</text>
        <text x="324" y="288">STUE</text>
      </g>

      {/* 1: ønsket */}
      <g className="lag" style={synlig(steg === 1)}>
        <rect x="424" y="160" width="168" height="240" fill="none" stroke={ROD} strokeWidth="3" strokeDasharray="10 8" />
        <text x="508" y="300" textAnchor="middle" fontSize="72" fill={ROD} style={hand}>
          ?
        </text>
        <text x="372" y="122" fontSize="20" fill={ROD} style={hand} transform="rotate(-3 372 122)">
          her vil de ha ny stue
        </text>
        <path d="M560 132c14 8 18 18 12 30" fill="none" stroke={ROD} strokeWidth="2.5" />
        <path d="M566 154l6 9 7-10" fill="none" stroke={ROD} strokeWidth="2.5" />
        <text x="330" y="456" fontSize="20" fill={ROD} style={hand}>
          sjekk avstand til nabo
        </text>
      </g>

      {/* 3: arealet prisen regnes fra */}
      <g className="lag" style={synlig(steg === 3)}>
        <rect x="427" y="163" width="162" height="234" fill={GUL} opacity="0.75" />
      </g>

      {/* 4: under bygging */}
      <g className="lag" style={synlig(steg === 4)}>
        <rect x="427" y="163" width="162" height="234" fill={`url(#${skravur})`} opacity="0.45" />
      </g>

      {/* 5: ferdig gulv */}
      <g className="lag" style={synlig(steg === 5)}>
        <rect x="427" y="163" width="162" height="234" fill={KORT} />
      </g>

      {/* 2 og videre: vegger, vindu, åpning og mål */}
      <g className="lag" style={synlig(steg >= 2)}>
        <path d="M424 160H592V400H424" fill="none" stroke={BLEKK} strokeWidth="6" />
        <path d="M424 250v60" stroke={KORT} strokeWidth="8" />
        <path d="M592 220v120" stroke={KORT} strokeWidth="8" />
        <path d="M589 220v120M595 220v120M586 220h12M586 340h12" stroke={BLEKK} strokeWidth="1.5" />

        <g stroke={BLEKK} strokeWidth="1.5">
          <path d="M424 128H592M424 120v16M592 120v16" />
          <path d="M620 160V400M612 160h16M612 400h16" />
        </g>
        <g fill={BLEKK} fontSize="20" textAnchor="middle" style={mono}>
          <text x="508" y="116">4 200</text>
          <text x="646" y="280" transform="rotate(-90 646 280)">
            6 000
          </text>
        </g>

        <g stroke={BLEKK} strokeWidth="1.5" fill={KORT}>
          <path d="M24 74v58M424 74v36" strokeDasharray="10 4 2 4" fill="none" />
          <circle cx="24" cy="56" r="17" />
          <circle cx="424" cy="56" r="17" />
        </g>
        <g fill={BLEKK} fontSize="19" textAnchor="middle" style={mono}>
          <text x="24" y="63">A</text>
          <text x="424" y="63">B</text>
        </g>
      </g>

      {/* 2: navn på rommet */}
      <g className="lag" style={synlig(steg === 2)} fill={BLEKK} textAnchor="middle">
        <text x="508" y="286" fontSize="20" style={mono}>
          TILBYGG
        </text>
      </g>

      {/* 3: regnestykket */}
      <g className="lag" style={synlig(steg === 3)} fill="#3a2a00" textAnchor="middle">
        <text x="508" y="272" fontSize="28" style={mono}>
          25,2 m²
        </text>
        <text x="508" y="304" fontSize="19" style={mono}>
          × 38 000 kr
        </text>
      </g>

      {/* 4: stendere og notat */}
      <g className="lag" style={synlig(steg === 4)}>
        {stendere.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" fill={BLEKK} />
        ))}
        <text x="508" y="272" fontSize="20" textAnchor="middle" fill={BLEKK} style={mono}>
          REISVERK
        </text>
        <text x="508" y="298" fontSize="20" textAnchor="middle" fill={BLEKK} style={mono}>
          c/c 600
        </text>
        <text x="350" y="456" fontSize="20" fill={ROD} style={hand}>
          tett tak før helga!
        </text>
      </g>

      {/* 5: møbler og stempel */}
      <g className="lag" style={synlig(steg === 5)}>
        <rect x="544" y="236" width="30" height="96" rx="4" fill="none" stroke={BLEKK} strokeWidth="2" />
        <path d="M566 236v96" stroke={BLEKK} strokeWidth="2" />
        <circle cx="496" cy="284" r="20" fill="none" stroke={BLEKK} strokeWidth="2" />
        <rect x="446" y="352" width="60" height="28" fill="none" stroke={BLEKK} strokeWidth="2" />
        <g fill={BLEKK} textAnchor="middle" style={mono}>
          <text x="500" y="198" fontSize="20">
            NY STUE
          </text>
          <text x="500" y="222" fontSize="18">
            25,2 m²
          </text>
        </g>
        <g transform="rotate(-5 250 84)">
          <rect x="132" y="58" width="236" height="50" fill="none" stroke={ROD} strokeWidth="3.5" />
          <text x="250" y="92" fontSize="26" textAnchor="middle" fill={ROD} style={mono}>
            OVERLEVERT
          </text>
        </g>
      </g>
    </svg>
  );
}

// Snitt gjennom et hus med saltak.
export function Snitt({ mork = false, className = "" }: { mork?: boolean; className?: string }) {
  const s = mork ? KRITT : BLEKK;
  const n = mork ? GUL : ROD;
  return (
    <svg
      viewBox="0 0 560 430"
      className={className}
      role="img"
      aria-label="Snitt gjennom et hus med saltak, med mål på romhøyde og bredde."
    >
      <text x="20" y="34" fontSize="20" fill={s} style={mono}>
        SNITT A–A
      </text>
      <path d="M20 340H540" stroke={s} strokeWidth="3" />
      <path d="M110 340v32h340v-32" fill="none" stroke={s} strokeWidth="2" strokeDasharray="8 6" />
      <path d="M120 340V200M440 340V200" stroke={s} strokeWidth="6" />
      <path d="M120 328H440M120 200H440" stroke={s} strokeWidth="2.5" />
      <path d="M86 218 280 90l194 128" fill="none" stroke={s} strokeWidth="6" strokeLinejoin="miter" />
      <path d="M280 90V200M200 143v57M360 143v57" stroke={s} strokeWidth="1.5" />
      <rect x="340" y="92" width="26" height="46" fill="none" stroke={s} strokeWidth="2.5" />
      <path d="M250 328v-92h46v92" fill="none" stroke={s} strokeWidth="2" />

      <g stroke={s} strokeWidth="1.5">
        <path d="M168 200V328M160 200h16M160 328h16" />
        <path d="M120 398H440M120 390v16M440 390v16" />
      </g>
      <g fill={s} fontSize="20" style={mono}>
        <text x="182" y="272">2 400</text>
        <text x="280" y="424" textAnchor="middle">
          8 000
        </text>
      </g>
      <path d="M430 190a40 40 0 0 1 10-26" fill="none" stroke={n} strokeWidth="2.5" />
      <text x="446" y="150" fontSize="20" fill={n} style={hand} transform="rotate(-4 446 150)">
        33° fall
      </text>
    </svg>
  );
}

// Terrasse i to nivåer, sett ovenfra.
export function Terrasse({ className = "" }: { className?: string }) {
  const bord1 = [];
  for (let y = 108; y < 270; y += 18) bord1.push(y);
  const bord2 = [];
  for (let x = 378; x < 500; x += 18) bord2.push(x);
  return (
    <svg
      viewBox="0 0 560 430"
      className={className}
      role="img"
      aria-label="Plantegning av terrasse i to nivåer inntil husveggen, med trapp mellom nivåene."
    >
      <rect x="40" y="36" width="480" height="54" fill={KORT} stroke={BLEKK} strokeWidth="6" />
      <text x="280" y="70" fontSize="20" textAnchor="middle" fill={BLEKK} style={mono}>
        HUS
      </text>
      <rect x="80" y="90" width="280" height="180" fill={KORT} stroke={BLEKK} strokeWidth="3" />
      {bord1.map((y) => (
        <path key={y} d={`M80 ${y}H360`} stroke={BLEKK} strokeWidth="1" />
      ))}
      <rect x="360" y="170" width="140" height="190" fill={KORT} stroke={BLEKK} strokeWidth="3" />
      {bord2.map((x) => (
        <path key={x} d={`M${x} 170V360`} stroke={BLEKK} strokeWidth="1" />
      ))}
      <path d="M300 270v60h60M320 270v60M340 270v60" fill="none" stroke={BLEKK} strokeWidth="2" />
      <g fontSize="20" textAnchor="middle" style={mono}>
        <rect x="170" y="164" width="100" height="32" fill={GUL} />
        <text x="220" y="187" fill="#3a2a00">
          NIVÅ 1
        </text>
        <rect x="380" y="250" width="100" height="32" fill={GUL} />
        <text x="430" y="273" fill="#3a2a00">
          NIVÅ 2
        </text>
      </g>
      <g stroke={BLEKK} strokeWidth="1.5">
        <path d="M80 398H500M80 390v16M500 390v16" />
      </g>
      <text x="290" y="424" fontSize="20" textAnchor="middle" fill={BLEKK} style={mono}>
        10 500
      </text>
      <text x="72" y="362" fontSize="20" fill={ROD} style={hand} transform="rotate(-3 72 362)">
        trapp ned mot fjorden
      </text>
    </svg>
  );
}

// Fasade med nytt tak og ny kledning.
export function Tak({ className = "" }: { className?: string }) {
  const id = useId();
  const klipp = `takklipp-${id}`;
  const rader = [];
  for (let y = 100; y < 230; y += 16) rader.push(y);
  const bord = [];
  for (let x = 120; x < 460; x += 20) bord.push(x);
  return (
    <svg
      viewBox="0 0 560 430"
      className={className}
      role="img"
      aria-label="Fasadetegning av hus med nytt tak og ny stående kledning."
    >
      <defs>
        <clipPath id={klipp}>
          <path d="M60 230 280 80l220 150z" />
        </clipPath>
      </defs>
      <text x="20" y="34" fontSize="20" fill={BLEKK} style={mono}>
        FASADE SØR
      </text>
      <path d="M20 370H540" stroke={BLEKK} strokeWidth="3" />
      <rect x="100" y="230" width="360" height="140" fill={KORT} stroke={BLEKK} strokeWidth="4" />
      {bord.map((x) => (
        <path key={x} d={`M${x} 230V370`} stroke={BLEKK} strokeWidth="1" />
      ))}
      <rect x="150" y="268" width="70" height="60" fill={KORT} stroke={BLEKK} strokeWidth="3" />
      <path d="M185 268v60M150 298h70" stroke={BLEKK} strokeWidth="1.5" />
      <rect x="320" y="270" width="50" height="100" fill={KORT} stroke={BLEKK} strokeWidth="3" />
      <path d="M60 230 280 80l220 150z" fill={KORT} stroke={BLEKK} strokeWidth="5" />
      <g clipPath={`url(#${klipp})`}>
        {rader.map((y) => (
          <path key={y} d={`M40 ${y}H520`} stroke={BLEKK} strokeWidth="1" />
        ))}
      </g>
      <text x="386" y="96" fontSize="20" fill={ROD} style={hand} transform="rotate(-3 386 96)">
        nytt tak
      </text>
      <path d="M380 100c-12 4-20 10-24 20" fill="none" stroke={ROD} strokeWidth="2.5" />
      <text x="392" y="410" fontSize="20" fill={ROD} style={hand} transform="rotate(-2 392 410)">
        ny kledning
      </text>
    </svg>
  );
}

export function Skisse({ navn, className = "" }: { navn: string; className?: string }) {
  if (navn === "snitt") return <Snitt className={className} />;
  if (navn === "terrasse") return <Terrasse className={className} />;
  if (navn === "tak") return <Tak className={className} />;
  return <Tilbygg steg={5} className={className} />;
}
