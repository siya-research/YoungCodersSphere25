export const ACTIONS = [
  { id: "trees", label: "Plant shade trees (2–3 yard trees)", heatDrop: 10, co2SavedKg: 25, sdgs: [13, 12] },
  { id: "coolroof", label: "Cool roof coating (500 sq ft)", heatDrop: 8, co2SavedKg: 150, sdgs: [13, 7] },
  { id: "shade", label: "Shade structure / awnings", heatDrop: 6, co2SavedKg: 40, sdgs: [13, 12] },
  { id: "whiteroad", label: "Reflective pavement (block pilot)", heatDrop: 12, co2SavedKg: 80, sdgs: [13, 12] },
  { id: "leds", label: "Swap 10 bulbs to LED", heatDrop: 2, co2SavedKg: 350 * 0.4, sdgs: [7, 13] },
  { id: "thermostat", label: "Smart thermostat schedule", heatDrop: 2, co2SavedKg: 180 * 0.4, sdgs: [7, 13] },
];

export const rankActions = (list = ACTIONS) =>
  list.slice().sort((a, b) => (b.heatDrop - a.heatDrop) || (b.co2SavedKg - a.co2SavedKg));
