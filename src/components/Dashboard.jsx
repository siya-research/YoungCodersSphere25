import React from "react";

const CAR_KG_PER_MILE = 0.404;
const fmt = (n, d = 1) => Number(n).toLocaleString(undefined, { maximumFractionDigits: d });

export default function Dashboard({ plan }) {
  const totalHeatDrop = plan.reduce((sum, a) => sum + a.heatDrop, 0);
  const totalCO2 = plan.reduce((sum, a) => sum + a.co2SavedKg, 0);
  const miles = totalCO2 / CAR_KG_PER_MILE;

  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur border border-white p-5">
      <h3 className="text-xl font-bold text-slate-800">Community Impact</h3>
      <div className="grid sm:grid-cols-3 gap-3 mt-3">
        <div className="rounded-2xl bg-emerald-50 p-4">
          <div className="text-sm text-slate-500">Heat score reduction</div>
          <div className="text-2xl font-extrabold text-emerald-700">{totalHeatDrop}</div>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-4">
          <div className="text-sm text-slate-500">CO₂ avoided (yr)</div>
          <div className="text-2xl font-extrabold text-emerald-700">{fmt(totalCO2)}</div>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-4">
          <div className="text-sm text-slate-500">Car miles equiv</div>
          <div className="text-2xl font-extrabold text-emerald-700">{fmt(miles)}</div>
        </div>
      </div>
      <div className="mt-3">
        <h4 className="font-semibold text-slate-800">Your Plan</h4>
        {plan.length === 0 ? (
          <div className="text-sm text-slate-600">No actions added yet.</div>
        ) : (
          <ul className="mt-1 text-sm text-slate-700 list-disc list-inside">
            {plan.map((a, i) => (
              <li key={i}>{a.label} — heat ↓ {a.heatDrop}, CO₂ ↓ {fmt(a.co2SavedKg)} kg/yr</li>
            ))}
          </ul>
        )}
      </div>
      <div className="text-xs text-slate-500 mt-3">
        SDG mapping: 13 (Climate Action), 7 (Energy efficiency & cooling), 12 (Responsible consumption & materials).
      </div>
    </div>
  );
}
