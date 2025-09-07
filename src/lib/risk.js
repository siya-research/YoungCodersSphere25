export function heatIndexC(tempC, rhPct) {
  const T = tempC * 9/5 + 32;   // to °F
  const R = rhPct ?? 50;
  if (T < 80) return tempC;
  let HI = -42.379 + 2.04901523*T + 10.14333127*R - 0.22475541*T*R
         - 0.00683783*T*T - 0.05481717*R*R + 0.00122874*T*T*R
         + 0.00085282*T*R*R - 0.00000199*T*T*R*R;
  if (R < 13 && T >= 80 && T <= 112) HI -= ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
  if (R > 85 && T >= 80 && T <= 87) HI -= ((R - 85) / 10) * ((87 - T) / 5);
  return (HI - 32) * 5/9;       // back to °C
}

export function riskFromHeatAndGreen(hiC, greenPct) {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const heatScore = clamp(((hiC - 15) / (47 - 15)) * 100, 0, 100); // normalize 15–47°C
  return Math.round(0.7 * heatScore + 0.3 * (100 - clamp(greenPct, 0, 100)));
}

export function riskLabel(score) {
  if (score >= 75) return { label: "High", color: "#e11d48" };      // red-600
  if (score >= 60) return { label: "Elevated", color: "#f59e0b" };  // amber-500
  if (score >= 45) return { label: "Moderate", color: "#10b981" };  // emerald-500
  return { label: "Low", color: "#22c55e" };                         // green-500
}
