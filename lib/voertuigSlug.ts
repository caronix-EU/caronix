// Maakt de leesbare link van een auto, bijvoorbeeld "bmw-x2-cx1042".
// Het deel "cx1042" is het voertuignummer en bepaalt welke auto er wordt geopend.
// Het deel ervoor (merk en model) is alleen voor de leesbaarheid en mag veranderen.
export function maakSlug(brand: string, model: string, nummer: number): string {
  const basis = `${brand} ${model}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accenten weghalen (ë -> e)
    .replace(/[^a-z0-9]+/g, "-") // alles wat geen letter/cijfer is wordt een streepje
    .replace(/^-+|-+$/g, "");
  return `${basis}-cx${nummer}`;
}

// Haalt het voertuignummer uit een link, of geeft null als er geen nummer in zit.
export function leesNummer(slug: string): number | null {
  const m = slug.match(/cx(\d+)$/i);
  return m ? Number(m[1]) : null;
}
