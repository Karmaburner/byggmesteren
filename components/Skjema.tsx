"use client";

import { useState } from "react";
import { tjenester } from "@/lib/firma";

const felt =
  "mt-2 block min-h-12 w-full border-2 border-blekk bg-white px-3 py-2 text-blekk placeholder:text-dempet";

// Demoskjema. Sender ingenting, men viser hvordan en ekte side ville svart.
export function Skjema() {
  const [sendt, setSendt] = useState(false);

  if (sendt) {
    return (
      <div role="status" className="border-2 border-blekk bg-kort p-6">
        <p className="font-display text-3xl font-semibold">Takk. Her stopper demoen.</p>
        <p className="mt-3">
          Ingenting ble sendt. På en ekte side går meldingen rett til byggmesteren, og du får svar innen én arbeidsdag.
        </p>
        <button
          type="button"
          onClick={() => setSendt(false)}
          className="kloss mt-5 min-h-12 bg-papir px-5 py-2 font-bold text-blekk hover:bg-white"
        >
          Fyll ut på nytt
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSendt(true);
      }}
      className="border-2 border-blekk bg-kort p-6"
    >
      <p className="merke border-b-2 border-blekk pb-2">Skjema S-01 · Befaring</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block font-bold">
          Navn
          <input name="navn" type="text" autoComplete="name" required className={felt} />
        </label>
        <label className="block font-bold">
          Telefon
          <input name="telefon" type="tel" autoComplete="tel" required className={felt} />
        </label>
      </div>
      <label className="mt-5 block font-bold">
        Hva gjelder det?
        <select name="tjeneste" className={felt} defaultValue={tjenester[0].navn}>
          {tjenester.map((t) => (
            <option key={t.nr}>{t.navn}</option>
          ))}
          <option>Noe annet</option>
        </select>
      </label>
      <label className="mt-5 block font-bold">
        Fortell kort hva du tenker på
        <textarea name="melding" rows={4} className={felt} placeholder="Vi trenger større stue mot hagen." />
      </label>
      <button type="submit" className="kloss mt-6 min-h-12 bg-rod px-6 py-3 font-bold text-white hover:bg-rod-mork">
        Send forespørsel
      </button>
      <p className="mt-4 text-base text-dempet">Demo: skjemaet sender ikke noe.</p>
    </form>
  );
}
