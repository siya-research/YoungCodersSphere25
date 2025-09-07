import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Search from "./components/Search.jsx";
import ScoreCard from "./components/ScoreCard.jsx";
import MapView from "./components/MapView.jsx";
import ActionKit from "./components/ActionKit.jsx";
import Dashboard from "./components/Dashboard.jsx";

function GradientBg() {
  return <div className="fixed inset-0 -z-10 bg-gradient-to-br from-amber-50 via-emerald-50 to-sky-100" />;
}

export default function App() {
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState([]);

  function addToPlan(action) {
    setPlan((prev) => [...prev, action]);
  }

  return (
    <div className="min-h-screen text-slate-800">
      <GradientBg />
      <Header />
      <main className="max-w-6xl mx-auto px-4 pb-20 space-y-5">
        <Search onResult={setData} />
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="space-y-4">
            <ScoreCard data={data} />
            <ActionKit onAdd={addToPlan} />
          </div>
          <div className="space-y-4">
            <MapView data={data} />
            <Dashboard plan={plan} />
          </div>
        </div>
        <footer className="text-center text-sm text-slate-500 mt-8">
          CoolBlocks • Global Heat-Island Action Kit
        </footer>
      </main>
    </div>
  );
}
