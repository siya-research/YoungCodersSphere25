export async function geocode(query) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json?.results?.length) throw new Error("Location not found. Try 'ZIP, Country' or a city name.");
  const g = json.results[0];
  return {
    lat: g.latitude,
    lon: g.longitude,
    label: `${g.name}${g.admin1 ? ", " + g.admin1 : ""}${g.country ? ", " + g.country : ""}`,
  };
}
