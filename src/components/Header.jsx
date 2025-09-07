import React from "react";
export default function Header() {
  return (
    <header className="max-w-6xl mx-auto px-4 pt-8 pb-2">
      <div className="flex items-center gap-3">
        <span className="text-2xl"></span>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">CoolBlocks</h1>
      </div>
      <p className="mt-2 text-slate-600 max-w-2xl">
        Global heat-island insights with an action kit. Enter any ZIP/City → we geocode, fetch weather,
        estimate local greenspace, and compute a heat-risk score with climate actions.
      </p>
    </header>
  );
}
