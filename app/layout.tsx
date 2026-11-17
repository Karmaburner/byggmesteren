import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Architects_Daughter, IBM_Plex_Mono, Zilla_Slab } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { firma } from "@/lib/firma";

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Forhåndslastes: den største teksten på forsiden står i Zilla Slab.
const zilla = Zilla_Slab({
  variable: "--font-zilla",
  subsets: ["latin"],
  weight: ["600"],
  preload: true,
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["500"],
});

// Håndskriften er pynt i margen og kan komme sist.
const arkitekt = Architects_Daughter({
  variable: "--font-arkitekt",
  subsets: ["latin"],
  weight: ["400"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(new URL(firma.url).origin),
  title: {
    default: `${firma.navn} · Tømrer og byggmester i ${firma.sted}`,
    template: `%s · ${firma.navn}`,
  },
  description:
    "Tilbygg, rehabilitering, tak og terrasse på Ringerike. Tegning og fast pris før vi bygger. Demo laget av Lilit Labs.",
  // Firmaet er oppdiktet. Siden skal ikke dukke opp når folk søker etter en ekte byggmester.
  robots: { index: false, follow: false },
  openGraph: { type: "website", locale: "nb_NO", siteName: firma.navn },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="no"
      className={`${atkinson.variable} ${zilla.variable} ${plex.variable} ${arkitekt.variable} antialiased`}
    >
      <body className="rutepapir flex min-h-screen flex-col">
        <a
          href="#innhold"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-kort focus:px-4 focus:py-3 focus:font-bold focus:text-blekk"
        >
          Hopp til innholdet
        </a>
        <Header />
        <main id="innhold" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
