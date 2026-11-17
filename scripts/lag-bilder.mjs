// Gjør PNG-ene fra bildepakken om til små WebP-filer i public/bilder.
// Kjøres fra prosjektmappen: node scripts/lag-bilder.mjs
// Originalene ligger i bilder-original/ og er ikke med i git.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

sharp.cache(false);

const kilde = "bilder-original/byggmesteren-bildepakke";
const ut = "public/bilder";
fs.mkdirSync(ut, { recursive: true });

// kildefil: [nytt navn, bredde i px]
const filer = {
  "bilder/tilbygg-haugsbygd-under-bygging.png": ["tilbygg-bygging", 1200],
  "bilder/tilbygg-haugsbygd-ferdig.png": ["tilbygg-ferdig", 1200],
  "bilder/tommerhus-tyristrand-1924.png": ["tommerhus", 1200],
  "bilder/terrasse-royse-to-nivaer.png": ["terrasse", 1200],
  "bilder/sigurd-haugen.png": ["sigurd", 800],
  "bilder/ragnhild-lie.png": ["ragnhild", 800],
  "bilder/jonas-moen.png": ["jonas", 800],
  "bilder/verksted-byggmesteren.png": ["verksted", 1400],
  "ekstra/teamet-samlet.png": ["teamet", 1000],
  "ekstra/verksted-innvendig.png": ["verksted-inne", 1200],
};

const storrelser = {};
for (const [fra, [navn, bredde]] of Object.entries(filer)) {
  const til = path.join(ut, `${navn}.webp`);
  const info = await sharp(path.join(kilde, fra)).resize({ width: bredde }).webp({ quality: 76 }).toFile(til);
  storrelser[navn] = { bredde: info.width, hoyde: info.height };
  console.log(`${navn}.webp`, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} kB`);
}

fs.writeFileSync("lib/bildestorrelser.json", JSON.stringify(storrelser, null, 2) + "\n");
