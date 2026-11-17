import Link from "next/link";
import { Meny } from "@/components/Meny";
import { firma } from "@/lib/firma";

// Logo: hus der taket er en gul vinkelhake, «Byggmesteren» stort og «i Hringariki» lite under.
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 text-blekk no-underline" aria-label={`${firma.navn}, til forsiden`}>
      <svg viewBox="0 0 48 48" className="h-11 w-11 shrink-0" aria-hidden="true">
        <rect width="48" height="48" fill="#1f3d36" />
        <path d="M14.5 27v13h19V27M21.5 40v-8h5v8" fill="none" stroke="#f3eee2" strokeWidth="2.5" />
        {/* Taket er en vinkelhake med målestreker. */}
        <path d="M24 7 42 25l-4 4-14-14-14 14-4-4z" fill="#e8b73a" />
        <path
          d="M28 14.5l-2 2M31.5 18l-2 2M35 21.5l-2 2M20 14.5l2 2M16.5 18l2 2M13 21.5l2 2"
          stroke="#3a2a00"
          strokeWidth="1.4"
        />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-2xl font-semibold">{firma.kortnavn}</span>
        <span className="merke mt-1 block text-[0.8125rem] text-dempet">i Hringariki</span>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="bg-papir">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-3 gap-y-3 md:gap-x-10 px-5 py-4 sm:px-8">
        <Logo />
        <Meny />
      </div>
    </header>
  );
}
