export async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature`;
  const res = await fetch(url);
  const { current } = await res.json();
  return {
    temp: current?.temperature_2m,
    rh: current?.relative_humidity_2m,
    apparent: current?.apparent_temperature,
  };
}
