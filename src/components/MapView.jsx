import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { riskLabel } from "../lib/risk.js";

export default function MapView({ data }) {
  if (!data) return null;
  const { lat, lon, score } = data;
  const { color } = riskLabel(score);

  return (
    <div className="overflow-hidden rounded-3xl border border-white">
      <MapContainer center={[lat, lon]} zoom={12} scrollWheelZoom={false} style={{ height: 420, width: "100%" }}>
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CircleMarker center={[lat, lon]} radius={14} pathOptions={{ color, fillColor: color, fillOpacity: 0.35 }}>
          <Tooltip direction="top" opacity={1}>Heat risk: {score}</Tooltip>
        </CircleMarker>
      </MapContainer>
      <div className="p-3 text-xs text-slate-500 bg-white/70">
        Marker tinted by risk (green→amber→red). Map uses OSM tiles.
      </div>
    </div>
  );
}
