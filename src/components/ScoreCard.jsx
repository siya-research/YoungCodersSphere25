import React from "react";
import { riskLabel } from "../lib/risk.js";

const fmt = (n, d = 1) => Number(n).toLocaleString(undefined, { maximumFractionDigits: d });

export default function ScoreCard({ data }) {
  if (!data) return null;
  const { place, temp, rh, hi, greenPct, score } = data;
  const rl = riskLabel(score);
  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur border border-white p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-sm text-slate-500">Location</div>
          <div className="text-xl font-bold text-slate-800">{place}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">Heat Risk Score</div>
          <div className="text-3xl font-extrabold" style={{ color: rl.color }}>{score} / 100</div>
          <div className="text-sm font-semibold text-slate-700">{rl.label}</div>
        </div>
      </div>
      <div className="grid sm:grid-cols-4 gap-3 mt-4">
        <div className="rounded-2xl bg-emerald-50 p-4">
          <div className="text-xs text-slate-500">Air temperature</div>
          <div className="text-lg font-semibold text-slate-800">{fmt(temp, 1)} °C</div>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-4">
          <div className="text-xs text-slate-500">Relative humidity</div>
          <div className="text-lg font-semibold text-slate-800">{fmt(rh ?? 0, 0)}%</div>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-4">
          <div className="text-xs text-slate-500">Heat index</div>
          <div className="text-lg font-semibold text-slate-800">{fmt(hi, 1)} °C</div>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-4">
          <div className="text-xs text-slate-500">Greenspace (proxy)</div>
          <div className="text-lg font-semibold text-slate-800">{fmt(greenPct, 0)}%</div>
        </div>
      </div>
      <div className="text-xs text-slate-500 mt-3">
        Risk blends heat index with a greenspace proxy from OSM polygons within ~1.5 km. Estimates are illustrative for demo purposes.
      </div>
    </div>
  );
}
