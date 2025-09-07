import React, { useState } from "react";
import { geocode } from "../services/geocode.js";
import { getWeather } from "../services/weather.js";
import { getGreenspacePct } from "../services/greenspace.js";
import { heatIndexC, riskFromHeatAndGreen } from "../lib/risk.js";

export default function Search({ onResult }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function runSearch(e) {
    e.preventDefault();
    setErr("");
    if (!q.trim()) return;
    setLoading(true);
    try {
      const loc = await geocode(q);
      const w = await getWeather(loc.lat, loc.lon);
      const hi = heatIndexC(w.temp, w.rh ?? 50);

      // Best-effort greenspace; safe fallback inside service
      const greenPct = await getGreenspacePct(loc.lat, loc.lon);

      const score = riskFromHeatAndGreen(hi, greenPct);
      onResult({
        lat: loc.lat,
        lon: loc.lon,
        place: loc.label,
        temp: w.temp,
        rh: w.rh,
        hi,
        greenPct,
        score,
      });
    } catch (e) {
      setErr(e.message || "Search failed. Try another query.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={runSearch} className="rounded-3xl bg-white/80 backdrop-blur border border-white p-4 flex flex-wrap items-end gap-3">
      <div className="flex-1 min-w-[220px]">
        <label className="text-sm text-slate-600">Enter ZIP/City (worldwide)</label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g., 21201, US or London or 10115, DE"
          className="mt-1 w-full rounded-xl border p-2 bg-white/90"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {loading ? "Searching…" : "Get Heat Risk"}
      </button>
      {err && <div className="text-sm text-rose-600">{err}</div>}
      <div className="text-xs text-slate-500 ml-auto">Uses Open-Meteo + OpenStreetMap (no keys).</div>
    </form>
  );
}
