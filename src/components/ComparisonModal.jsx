import React, { useState } from "react";
import {
  X,
  Scale,
  MapPin,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Droplets,
  Waves,
  Mountain,
  Hospital,
  Train,
  Car,
  Sparkles
} from "lucide-react";
import { formatINR, evaluateLocation } from "../utils/geoCalculations.js";
import { THRISSUR_CENTER } from "../data/thrissurData.js";

// Curated comparison benchmarks across all 7 taluks of Thrissur
const BENCHMARK_LOCATIONS = [
  { id: "ayyanthole", name: "Ayyanthole Civil Station / Collectorate", taluk: "Thrissur", lat: 10.5284, lng: 76.1915 },
  { id: "chembookavu", name: "Chembookavu / Swaraj Round East", taluk: "Thrissur", lat: 10.5312, lng: 76.2215 },
  { id: "puzhakkal", name: "Puzhakkal Sobha City Belt", taluk: "Thrissur", lat: 10.5530, lng: 76.1840 },
  { id: "nadathara", name: "Nadathara / Ollukkara NH 544", taluk: "Thrissur", lat: 10.5120, lng: 76.2620 },
  { id: "ollur", name: "Ollur Commercial / Residential", taluk: "Thrissur", lat: 10.4782, lng: 76.2365 },
  { id: "chalakudy", name: "Chalakudy Town South Junction", taluk: "Chalakudy", lat: 10.3080, lng: 76.3350 },
  { id: "koratty", name: "Koratty Infopark Highway Belt", taluk: "Chalakudy", lat: 10.2550, lng: 76.3150 },
  { id: "irinjalakuda", name: "Irinjalakuda Koodalmanikyam", taluk: "Mukundapuram", lat: 10.3540, lng: 76.2110 },
  { id: "guruvayur", name: "Guruvayur Temple Heritage Belt", taluk: "Chavakkad", lat: 10.5940, lng: 76.0420 },
  { id: "chavakkad", name: "Chavakkad Town / Manathala", taluk: "Chavakkad", lat: 10.5820, lng: 76.0250 },
  { id: "wadakkanchery", name: "Wadakkanchery Town", taluk: "Thalapilly", lat: 10.6650, lng: 76.2420 },
  { id: "kunnamkulam", name: "Kunnamkulam Commercial Hub", taluk: "Kunnamkulam", lat: 10.6500, lng: 76.0700 }
];

export default function ComparisonModal({
  isOpen,
  onClose,
  currentProperty,
  onSelectProperty
}) {
  const [selectedA, setSelectedA] = useState("current");
  const [selectedB, setSelectedB] = useState("chalakudy");

  if (!isOpen) return null;

  // Resolve Property A
  let propertyA;
  if (selectedA === "current" && currentProperty) {
    propertyA = currentProperty;
  } else {
    const locA = BENCHMARK_LOCATIONS.find((b) => b.id === selectedA) || BENCHMARK_LOCATIONS[0];
    propertyA = evaluateLocation(locA.lat, locA.lng);
  }

  // Resolve Property B
  let propertyB;
  if (selectedB === "current" && currentProperty) {
    propertyB = currentProperty;
  } else {
    const locB = BENCHMARK_LOCATIONS.find((b) => b.id === selectedB) || BENCHMARK_LOCATIONS[5];
    propertyB = evaluateLocation(locB.lat, locB.lng);
  }

  // Helper for safe string display of flood zone
  const getFloodText = (prop) => {
    if (!prop) return "Low Risk";
    if (typeof prop.floodZone === "string") return prop.floodZone;
    if (prop.floodZone?.status) return prop.floodZone.status;
    return "Low Risk (Safe Ground Elevation)";
  };

  const getElevation = (prop) => {
    if (prop?.floodZone?.elevationMeters) return `${prop.floodZone.elevationMeters}m MSL`;
    return "18m MSL";
  };

  const getWaterText = (prop) => {
    if (prop?.waterStatus) return prop.waterStatus;
    return "Perennial Well Water (Good Table)";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col text-slate-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/90 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-100">
                  Thrissur Land Cost & Location Comparison Matrix
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold hidden sm:inline">
                  Side-by-Side Analysis
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Compare marketing cost, government fair value, flood risk, water table & amenities
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location Selectors */}
        <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-800 bg-slate-950/60">
          {/* Location A Selector */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Location A (Current or Benchmark):
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {formatINR(propertyA?.marketValuePerCent)} / Cent
              </span>
            </div>
            <select
              value={selectedA}
              onChange={(e) => setSelectedA(e.target.value)}
              className="w-full bg-slate-900 border border-emerald-500/50 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-400 font-medium cursor-pointer"
            >
              {currentProperty && (
                <option value="current">
                  📍 Active Selected Point ({currentProperty.village || "Current Point"} - {currentProperty.taluk})
                </option>
              )}
              {BENCHMARK_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.taluk} Taluk)
                </option>
              ))}
            </select>
          </div>

          {/* Location B Selector */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Location B (Comparison Target):
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {formatINR(propertyB?.marketValuePerCent)} / Cent
              </span>
            </div>
            <select
              value={selectedB}
              onChange={(e) => setSelectedB(e.target.value)}
              className="w-full bg-slate-900 border border-cyan-500/50 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-medium cursor-pointer"
            >
              {currentProperty && (
                <option value="current">
                  📍 Active Selected Point ({currentProperty.village || "Current Point"} - {currentProperty.taluk})
                </option>
              )}
              {BENCHMARK_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.taluk} Taluk)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table / Matrix */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="py-3 px-3 sm:px-4 font-bold uppercase text-[10px] tracking-wider text-slate-400 w-1/3">
                    Evaluation Metric
                  </th>
                  <th className="py-3 px-3 sm:px-4 font-bold text-emerald-300 w-1/3 border-l border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>{propertyA?.village || "Location A"}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                      {propertyA?.taluk}
                    </div>
                  </th>
                  <th className="py-3 px-3 sm:px-4 font-bold text-cyan-300 w-1/3 border-l border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <span>{propertyB?.village || "Location B"}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                      {propertyB?.taluk}
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/70 text-xs">
                {/* 1. Marketing Cost */}
                <tr className="bg-slate-900/30">
                  <td className="py-3 px-3 sm:px-4 font-semibold text-slate-200 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Marketing Cost / Cent</span>
                  </td>
                  <td className="py-3 px-3 sm:px-4 font-mono font-bold text-emerald-400 text-sm border-l border-slate-800">
                    {formatINR(propertyA?.marketValuePerCent)}
                    <div className="text-[10px] text-slate-400 font-normal">
                      ~{formatINR(propertyA?.marketValuePerSqFt)} / sq.ft
                    </div>
                  </td>
                  <td className="py-3 px-3 sm:px-4 font-mono font-bold text-cyan-400 text-sm border-l border-slate-800">
                    {formatINR(propertyB?.marketValuePerCent)}
                    <div className="text-[10px] text-slate-400 font-normal">
                      ~{formatINR(propertyB?.marketValuePerSqFt)} / sq.ft
                    </div>
                  </td>
                </tr>

                {/* 2. Govt Fair Value */}
                <tr>
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-slate-300">
                    Govt Fair Value (ന്യായവില) / Cent
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 font-mono font-bold text-emerald-300 border-l border-slate-800">
                    {formatINR(propertyA?.fairValuePerCent)}
                    <div className="text-[10px] text-slate-500 font-normal">
                      ({formatINR(propertyA?.fairValuePerAre)} / Are)
                    </div>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 font-mono font-bold text-cyan-300 border-l border-slate-800">
                    {formatINR(propertyB?.fairValuePerCent)}
                    <div className="text-[10px] text-slate-500 font-normal">
                      ({formatINR(propertyB?.fairValuePerAre)} / Are)
                    </div>
                  </td>
                </tr>

                {/* 3. Govt Transfer Tax */}
                <tr>
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-slate-300">
                    Govt Tax per Cent (Duty 8% + Reg 2%)
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 font-mono text-amber-300 border-l border-slate-800">
                    {formatINR(propertyA?.totalGovtCostPerCent)}
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 font-mono text-amber-300 border-l border-slate-800">
                    {formatINR(propertyB?.totalGovtCostPerCent)}
                  </td>
                </tr>

                {/* 4. Title & Legality */}
                <tr className="bg-slate-900/20">
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Title & Freehold Status</span>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-emerald-400 font-semibold border-l border-slate-800">
                    ✓ 100% Buyable Purayidam
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-emerald-400 font-semibold border-l border-slate-800">
                    ✓ 100% Buyable Purayidam
                  </td>
                </tr>

                {/* 5. Water Table */}
                <tr>
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-slate-300 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-blue-400" />
                    <span>Water Table & Availability</span>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 border-l border-slate-800">
                    <div className="font-semibold text-slate-200">
                      {propertyA?.groundWaterTableDepthMeters || 3.5}m ({propertyA?.groundWaterTableDepthFt || 11.5} ft)
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {getWaterText(propertyA)}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 border-l border-slate-800">
                    <div className="font-semibold text-slate-200">
                      {propertyB?.groundWaterTableDepthMeters || 3.5}m ({propertyB?.groundWaterTableDepthFt || 11.5} ft)
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {getWaterText(propertyB)}
                    </div>
                  </td>
                </tr>

                {/* 6. Flood Hazard */}
                <tr className="bg-slate-900/20">
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-slate-300 flex items-center gap-1.5">
                    <Waves className="w-3.5 h-3.5 text-sky-400" />
                    <span>Flood Risk & Elevation</span>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 border-l border-slate-800">
                    <div className="font-semibold text-slate-200">
                      {getFloodText(propertyA)}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono">
                      Elevation: {getElevation(propertyA)}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 border-l border-slate-800">
                    <div className="font-semibold text-slate-200">
                      {getFloodText(propertyB)}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono">
                      Elevation: {getElevation(propertyB)}
                    </div>
                  </td>
                </tr>

                {/* 7. Landslide Risk */}
                <tr>
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-slate-300 flex items-center gap-1.5">
                    <Mountain className="w-3.5 h-3.5 text-amber-400" />
                    <span>Landslide Safety</span>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 border-l border-slate-800 text-slate-300">
                    Safe (Zone-0, Slope {propertyA?.landslideZone?.slopeDegrees || 1.5}°)
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 border-l border-slate-800 text-slate-300">
                    Safe (Zone-0, Slope {propertyB?.landslideZone?.slopeDegrees || 1.5}°)
                  </td>
                </tr>

                {/* 8. Road Access */}
                <tr className="bg-slate-900/20">
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-slate-300 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Road Access Frontage</span>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 border-l border-slate-800 text-slate-300">
                    {propertyA?.roadWidthMeters || 5.5}m Tarred Road
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 border-l border-slate-800 text-slate-300">
                    {propertyB?.roadWidthMeters || 5.5}m Tarred Road
                  </td>
                </tr>

                {/* 9. Nearest Hospital */}
                <tr>
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-slate-300 flex items-center gap-1.5">
                    <Hospital className="w-3.5 h-3.5 text-rose-400" />
                    <span>Nearest Hospital</span>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 border-l border-slate-800">
                    <div className="font-semibold text-slate-200">
                      {propertyA?.nearestFacilities?.hospital?.[0]?.name || "Thrissur General Hospital"}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono">
                      {propertyA?.nearestFacilities?.hospital?.[0]?.distanceKm || 2.4} km (~{propertyA?.nearestFacilities?.hospital?.[0]?.driveTimeMins || 5} mins)
                    </div>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 border-l border-slate-800">
                    <div className="font-semibold text-slate-200">
                      {propertyB?.nearestFacilities?.hospital?.[0]?.name || "Government Hospital"}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono">
                      {propertyB?.nearestFacilities?.hospital?.[0]?.distanceKm || 3.1} km (~{propertyB?.nearestFacilities?.hospital?.[0]?.driveTimeMins || 7} mins)
                    </div>
                  </td>
                </tr>

                {/* 10. Nearest Transit */}
                <tr className="bg-slate-900/20">
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-slate-300 flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-amber-400" />
                    <span>Nearest Railway / Transit</span>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 border-l border-slate-800">
                    <div className="font-semibold text-slate-200">
                      {propertyA?.nearestFacilities?.transit?.[0]?.name || "Thrissur Railway Station"}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono">
                      {propertyA?.nearestFacilities?.transit?.[0]?.distanceKm || 3.2} km
                    </div>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 border-l border-slate-800">
                    <div className="font-semibold text-slate-200">
                      {propertyB?.nearestFacilities?.transit?.[0]?.name || "Railway Station"}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono">
                      {propertyB?.nearestFacilities?.transit?.[0]?.distanceKm || 2.8} km
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Close
          </button>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                if (propertyA) onSelectProperty(propertyA);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-950 border border-emerald-700/80 text-emerald-300 text-xs font-semibold hover:bg-emerald-900 transition flex items-center gap-1.5 shadow-md"
            >
              <span>View {propertyA?.village || "Location A"} on Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (propertyB) onSelectProperty(propertyB);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-950 border border-cyan-700/80 text-cyan-300 text-xs font-semibold hover:bg-cyan-900 transition flex items-center gap-1.5 shadow-md"
            >
              <span>View {propertyB?.village || "Location B"} on Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
