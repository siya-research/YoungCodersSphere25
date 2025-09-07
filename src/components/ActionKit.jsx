import React from "react";
import { ACTIONS, rankActions } from "../data/actions.js";

const fmt = (n, d = 1) => Number(n).toLocaleString(undefined, { maximumFractionDigits: d });

export default function ActionKit({ onAdd }) {
  const ranked = rankActions(ACTIONS);
  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur border border-white p-5">
      <h3 className="text-xl font-bold text-slate-800">Action Kit</h3>
      <p className="text-slate-600">Add steps to reduce outdoor heat and indoor cooling demand (climate co-benefits).</p>
      <div className="grid md:grid-cols-2 gap-3 mt-3">
        {ranked.map((a) => (
          <div key={a.id} className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-800">{a.label}</div>
                <div className="text-sm text-slate-600">Heat score ↓ ~{a.heatDrop} • CO₂ ↓ ~{fmt(a.co2SavedKg)} kg/yr</div>
                <div className="text-xs text-slate-500">SDGs: {a.sdgs.join(", ")}</div>
              </div>
              <button onClick={() => onAdd(a)} className="px-3 py-1 rounded-full text-sm bg-emerald-600 text-white hover:bg-emerald-700">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-slate-500 mt-3">Estimates are illustrative; real projects need local feasibility & permitting.</div>
    </div>
  );
}
