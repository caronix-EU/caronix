// Automerken en modellen voor suggesties in de formulieren (zoekopdracht en voertuigen toevoegen/bewerken).
// Dit zijn de merken en modellen die vooral voorkomen op de Europese occasionmarkt. De lijst is een hulpmiddel:
// in de velden kan altijd ook vrij worden getypt, dus een ontbrekend model blokkeert niets.
// Een model toevoegen? Zet het in de juiste regel hieronder, gescheiden door een komma.

const m = (s: string): string[] => s.split(",").map((x) => x.trim()).filter(Boolean);

export const AUTOMERKEN: Record<string, string[]> = {
  Abarth: m("500, 595, 695, 124 Spider, 500e, 600e"),
  "Alfa Romeo": m("4C, 147, 156, 159, 166, Brera, Giulia, Giulietta, GT, Junior, MiTo, Spider, Stelvio, Tonale"),
  Alpine: m("A110, A290"),
  "Aston Martin": m("DB11, DB12, DBS, DBX, Rapide, Vantage, Vanquish"),
  Audi: m(
    "A1, A2, A3, A4, A4 Allroad, A5, A6, A6 Allroad, A7, A8, e-tron, e-tron GT, Q2, Q3, Q4 e-tron, Q5, Q6 e-tron, Q7, Q8, Q8 e-tron, R8, RS3, RS4, RS5, RS6, RS7, RS Q3, RS Q8, S3, S4, S5, S6, S7, S8, SQ5, SQ7, SQ8, TT"
  ),
  Bentley: m("Bentayga, Continental GT, Flying Spur, Mulsanne"),
  BMW: m(
    "1 Serie, 2 Serie, 2 Serie Active Tourer, 2 Serie Gran Coupé, 3 Serie, 4 Serie, 5 Serie, 6 Serie, 7 Serie, 8 Serie, i3, i4, i5, i7, i8, iX, iX1, iX2, iX3, M2, M3, M4, M5, M8, X1, X2, X3, X4, X5, X6, X7, XM, Z3, Z4"
  ),
  BYD: m("Atto 2, Atto 3, Dolphin, Han, Seal, Seal U, Sealion 7, Tang"),
  Chevrolet: m("Aveo, Camaro, Captiva, Corvette, Cruze, Spark, Trax"),
  Chrysler: m("300C, Grand Voyager, Pacifica, PT Cruiser, Voyager"),
  Citroën: m(
    "Ami, Berlingo, C-Elysée, C-Zero, C1, C3, C3 Aircross, C3 Picasso, C4, C4 Cactus, C4 Picasso, C4 X, C5, C5 Aircross, C5 X, DS3, DS4, DS5, E-C4, Jumper, Jumpy, SpaceTourer"
  ),
  Cupra: m("Ateca, Born, Formentor, Leon, Tavascan, Terramar"),
  Dacia: m("Bigster, Dokker, Duster, Jogger, Lodgy, Logan, Sandero, Sandero Stepway, Spring"),
  Dodge: m("Caliber, Challenger, Charger, Durango, Journey, Nitro"),
  DS: m("DS 3, DS 3 Crossback, DS 4, DS 5, DS 7, DS 7 Crossback, DS 9"),
  Ferrari: m("296, 488, 812, California, F8, Portofino, Purosangue, Roma, SF90"),
  Fiat: m(
    "124 Spider, 500, 500C, 500e, 500L, 500X, 600, 600e, Bravo, Doblò, Ducato, Fiorino, Freemont, Grande Punto, Panda, Punto, Punto Evo, Qubo, Scudo, Talento, Tipo, Topolino"
  ),
  Ford: m(
    "B-Max, C-Max, EcoSport, Edge, Explorer, Fiesta, Focus, Fusion, Galaxy, Grand C-Max, Ka, Kuga, Mondeo, Mustang, Mustang Mach-E, Puma, Ranger, S-Max, Tourneo Connect, Tourneo Courier, Tourneo Custom, Transit, Transit Connect, Transit Courier, Transit Custom"
  ),
  Genesis: m("G70, G80, GV60, GV70, GV80"),
  Honda: m("Accord, Civic, CR-V, CR-Z, e, e:Ny1, HR-V, Insight, Jazz, Legend, NSX, ZR-V"),
  Hyundai: m(
    "Bayon, Elantra, i10, i20, i30, i40, Inster, Ioniq, Ioniq 5, Ioniq 6, ix20, ix35, Kona, Nexo, Santa Fe, Staria, Tucson, Veloster"
  ),
  Infiniti: m("Q30, Q50, Q60, QX30, QX50, QX70"),
  Isuzu: m("D-Max"),
  Jaguar: m("E-Pace, F-Pace, F-Type, I-Pace, XE, XF, XJ, XK"),
  Jeep: m("Avenger, Cherokee, Commander, Compass, Gladiator, Grand Cherokee, Patriot, Renegade, Wrangler"),
  Kia: m(
    "Carens, Ceed, Ceed Sportswagon, e-Niro, EV3, EV6, EV9, Niro, Optima, Picanto, ProCeed, Rio, Sorento, Soul, Sportage, Stinger, Stonic, Venga, XCeed"
  ),
  Lamborghini: m("Aventador, Gallardo, Huracán, Revuelto, Urus"),
  Lancia: m("Delta, Musa, Voyager, Ypsilon"),
  "Land Rover": m(
    "Defender, Discovery, Discovery Sport, Freelander, Range Rover, Range Rover Evoque, Range Rover Sport, Range Rover Velar"
  ),
  Leapmotor: m("C10, T03"),
  Lexus: m("CT, ES, GS, IS, LBX, LC, LS, NX, RC, RX, RZ, UX"),
  Lotus: m("Eletre, Elise, Emira, Evora, Exige"),
  "Lynk & Co": m("01, 02, 03, 05"),
  Maserati: m("Ghibli, GranCabrio, GranTurismo, Grecale, Levante, MC20, Quattroporte"),
  Mazda: m("2, 3, 5, 6, CX-3, CX-30, CX-5, CX-60, CX-80, MX-30, MX-5"),
  McLaren: m("570S, 720S, 750S, Artura, GT"),
  "Mercedes-Benz": m(
    "A-Klasse, AMG GT, B-Klasse, C-Klasse, Citan, CLA, CLE, CLK, CLS, E-Klasse, EQA, EQB, EQC, EQE, EQS, EQV, G-Klasse, GLA, GLB, GLC, GLE, GLS, ML, R-Klasse, S-Klasse, SL, SLC, Sprinter, V-Klasse, Viano, Vito"
  ),
  MG: m("3, 4, 5, Cyberster, EHS, HS, Marvel R, ZS"),
  Mini: m("Aceman, Cabrio, Clubman, Cooper, Coupé, Countryman, Hatch, Paceman, Roadster"),
  Mitsubishi: m("ASX, Colt, Eclipse Cross, L200, Lancer, Mirage, Outlander, Pajero, Space Star"),
  Nissan: m(
    "370Z, Ariya, Evalia, GT-R, Interstar, Juke, Leaf, Micra, Navara, Note, NV200, Pixo, Primastar, Pulsar, Qashqai, Townstar, X-Trail"
  ),
  Opel: m(
    "Adam, Agila, Ampera, Antara, Astra, Cascada, Combo, Corsa, Crossland, Crossland X, Frontera, Grandland, Grandland X, Insignia, Karl, Meriva, Mokka, Mokka-e, Movano, Signum, Tigra, Vectra, Vivaro, Zafira, Zafira Life"
  ),
  Peugeot: m(
    "107, 108, 206, 207, 208, 301, 307, 308, 407, 408, 508, 1007, 2008, 3008, 4008, 5008, Bipper, e-208, e-2008, Expert, Partner, RCZ, Rifter, Traveller"
  ),
  Polestar: m("1, 2, 3, 4"),
  Porsche: m("718 Boxster, 718 Cayman, 911, 918, Boxster, Cayenne, Cayman, Macan, Panamera, Taycan"),
  RAM: m("1500, 2500, 3500"),
  Renault: m(
    "4, 5, Arkana, Austral, Captur, Clio, Espace, Express, Fluence, Grand Scénic, Kadjar, Kangoo, Koleos, Laguna, Master, Mégane, Mégane E-Tech, Modus, Rafale, Scénic, Scénic E-Tech, Symbioz, Talisman, Trafic, Twingo, Twizy, Wind, Zoe"
  ),
  "Rolls-Royce": m("Cullinan, Dawn, Ghost, Phantom, Spectre, Wraith"),
  Saab: m("9-3, 9-5"),
  Seat: m("Alhambra, Altea, Arona, Ateca, Cordoba, Exeo, Ibiza, Leon, Mii, Tarraco, Toledo"),
  Škoda: m(
    "Citigo, Elroq, Enyaq, Fabia, Kamiq, Karoq, Kodiaq, Octavia, Rapid, Roomster, Scala, Superb, Yeti"
  ),
  Smart: m("#1, #3, EQ forfour, EQ fortwo, forfour, fortwo, Roadster"),
  SsangYong: m("Actyon, Korando, Musso, Rexton, Tivoli, Torres, XLV"),
  Subaru: m("BRZ, Crosstrek, Forester, Impreza, Legacy, Levorg, Outback, Solterra, XV"),
  Suzuki: m(
    "Across, Alto, Baleno, Celerio, e Vitara, Ignis, Jimny, S-Cross, Splash, Swace, Swift, SX4, SX4 S-Cross, Vitara, Wagon R"
  ),
  Tesla: m("Cybertruck, Model 3, Model S, Model X, Model Y"),
  Toyota: m(
    "Auris, Avensis, Aygo, Aygo X, bZ4X, C-HR, Camry, Corolla, Corolla Cross, GR86, GR Yaris, Hilux, iQ, Land Cruiser, Mirai, Prius, Prius+, Proace, Proace City, Proace Verso, RAV4, Supra, Urban Cruiser, Verso, Yaris, Yaris Cross"
  ),
  Volkswagen: m(
    "Amarok, Arteon, Beetle, Caddy, California, Caravelle, CC, Crafter, e-Up, Eos, Fox, Golf, Golf Plus, Golf Sportsvan, Golf Variant, ID. Buzz, ID.3, ID.4, ID.5, ID.7, Jetta, Lupo, Multivan, Passat, Passat Variant, Phaeton, Polo, Scirocco, Sharan, T-Cross, T-Roc, Taigo, Tiguan, Tiguan Allspace, Touareg, Touran, Transporter, Up!"
  ),
  Volvo: m(
    "C30, C40, C70, EC40, EX30, EX40, EX90, S40, S60, S80, S90, V40, V50, V60, V60 Cross Country, V70, V90, V90 Cross Country, XC40, XC60, XC70, XC90"
  ),
  Xpeng: m("G6, G9, P7"),
};

// Hoofdletters, accenten, spaties en streepjes negeren, zodat "citroen", "Citroën" en "CITROËN" hetzelfde zijn.
export function normaliseer(s: string): string {
  return s
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/#/g, "hash")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// Veelgebruikte afkortingen
const ALIAS: Record<string, string> = { vw: "volkswagen", merc: "mercedesbenz", mb: "mercedesbenz" };

// Alle merken, op alfabet
export const MERKEN: string[] = Object.keys(AUTOMERKEN).sort((a, b) => a.localeCompare(b, "nl"));

// Zoekt het merk dat bij de invoer hoort ("vw" geeft Volkswagen, "mercedes" geeft Mercedes-Benz)
export function vindMerk(invoer: string): string | null {
  const n = normaliseer(invoer);
  if (!n) return null;
  const doel = ALIAS[n] ?? n;
  const exact = MERKEN.find((b) => normaliseer(b) === doel);
  if (exact) return exact;
  if (doel.length >= 4) {
    const begin = MERKEN.filter((b) => normaliseer(b).startsWith(doel));
    if (begin.length === 1) return begin[0];
  }
  return null;
}

// Modellen bij het ingevulde merk (lege lijst als het merk onbekend is)
export function modellenVoor(invoer: string): string[] {
  const merk = vindMerk(invoer);
  return merk ? AUTOMERKEN[merk] : [];
}

// Voegt lijsten samen zonder dubbelen (eerste schrijfwijze wint)
export function uniek(lijst: string[]): string[] {
  const gezien = new Set<string>();
  const uit: string[] = [];
  for (const x of lijst) {
    const k = normaliseer(x);
    if (!k || gezien.has(k)) continue;
    gezien.add(k);
    uit.push(x);
  }
  return uit;
}
