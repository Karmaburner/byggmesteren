import { Knapp, SideTopp, Ramme } from "@/components/Felles";

export default function IkkeFunnet() {
  return (
    <>
      <SideTopp tittel="Denne tegningen finner vi ikke.">
        <p>Siden er flyttet eller har aldri vært tegnet.</p>
      </SideTopp>
      <Ramme>
        <Knapp href="/">Til forsiden</Knapp>
      </Ramme>
    </>
  );
}
