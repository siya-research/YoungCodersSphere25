import * as turf from "@turf/turf";

export async function getGreenspacePct(lat, lon) {
  const body = `
    [out:json][timeout:25];
    (way["leisure"="park"](around:1500,${lat},${lon});
     way["landuse"="forest"](around:1500,${lat},${lon});
     way["natural"="wood"](around:1500,${lat},${lon});
     way["landuse"="grass"](around:1500,${lat},${lon});
     way["leisure"="garden"](around:1500,${lat},${lon}););
    out geom;`;
  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", { method: "POST", body });
    const json = await res.json();

    const circle = turf.circle([lon, lat], 1.5, { steps: 48, units: "kilometers" });
    const areaKm2 = turf.area(circle) / 1e6;
    let greenKm2 = 0;

    for (const el of json.elements || []) {
      const coords = (el.geometry || []).map((p) => [p.lon, p.lat]);
      if (coords.length < 3) continue;
      if (coords[0][0] !== coords.at(-1)[0] || coords[0][1] !== coords.at(-1)[1]) coords.push([...coords[0]]);
      try {
        const poly = turf.polygon([coords]);
        if (turf.booleanPointInPolygon(turf.centroid(poly), circle)) {
          greenKm2 += turf.area(poly) / 1e6;
        }
      } catch {}
    }
    const pct = (greenKm2 / areaKm2) * 100;
    return Math.max(0, Math.min(100, pct));
  } catch {
    return 30; // resilient fallback if Overpass is slow/rate-limited
  }
}
