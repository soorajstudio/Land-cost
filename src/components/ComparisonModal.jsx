import React, { useState } from "react";
import { X, Scale, MapPin, CheckCircle2, ArrowRight, Ruler } from "lucide-react";
import { THRISSUR_SPECIFIED_PARCELS } from "../data/thrissurData.js";
import { formatINR } from "../utils/geoCalculations.js";

export default function ComparisonModal({
  isOpen,
  onClose,
  currentProperty,
  onSelectProperty
}) {
  const [parcelAId, setParcelAId] = useState(currentProperty?.id || THRISSUR_SPECIFIED_PARCELS[0].id);
  const [parcelBId, setParcelBId] = useState(
    THRISSUR_SPECIFIED_PARCELS[1]?.id || THRISSUR_SPECIFIED_PARCELS[0].id
  );

  if (!isOpen) return null;

  const parcelA =
    THRISSUR_SPECIFIED_PARCELS.find((p) => p.id === parcelAId) || currentProperty;
  const parcelB =
    THRISSUR_SPECIFIED_PARCELS.find((p) => p.id === parcelBId) || THRISSUR_SPECIFIED_PARCELS[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-slate-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Thrissur Land Parcel Comparison Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Compare specified area, frontage dimensions, fair value & registration cost side-by-side
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Parcel Pickers */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-800 bg-slate-950/40">
          <div>
            <label className="block text-xs font-semibold text-emerald-400 mb-1.5">
              Select Plot A:
            </label>
            <select
              value={parcelAId}
              onChange={(e) => setParcelAId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {THRISSUR_SPECIFIED_PARCELS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.specifiedAreaCents} Cents - {p.taluk})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-cyan-400 mb-1.5">
              Select Plot B:
            </label>
            <select
              value={parcelBId}
              onChange={(e) => setParcelBId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {THRISSUR_SPECIFIED_PARCELS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.specifiedAreaCents} Cents - {p.taluk})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side by Side Comparison Grid */}
        <div className="p-4 sm:p-6 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3 font-semibold uppercase text-[11px]">Parameter</th>
                <th className="py-2.5 px-3 font-bold text-emerald-300 w-5/12">{parcelA?.name}</th>
                <th className="py-2.5 px-3 font-bold text-cyan-300 w-5/12">{parcelB?.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Evaluation Mode</td>
                <td className="py-2.5 px-3 font-bold font-mono text-emerald-400">
                  {parcelA?.specifiedAreaCents ? `${parcelA.specifiedAreaCents} Cents` : "Selection Point"}
                </td>
                <td className="py-2.5 px-3 font-bold font-mono text-cyan-400">
                  {parcelB?.specifiedAreaCents ? `${parcelB.specifiedAreaCents} Cents` : "Selection Point"}
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Specified Dimensions</td>
                <td className="py-2.5 px-3 font-mono text-slate-200">
                  Front: {parcelA?.dimensions?.frontageFt} ft &bull; Depth: {parcelA?.dimensions?.depthFt} ft
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-200">
                  Front: {parcelB?.dimensions?.frontageFt} ft &bull; Depth: {parcelB?.dimensions?.depthFt} ft
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Taluk & Village</td>
                <td className="py-2.5 px-3 font-semibold">{parcelA?.taluk} ({parcelA?.village})</td>
                <td className="py-2.5 px-3 font-semibold">{parcelB?.taluk} ({parcelB?.village})</td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Re-Survey Number</td>
                <td className="py-2.5 px-3 font-mono">{parcelA?.surveyNo}</td>
                <td className="py-2.5 px-3 font-mono">{parcelB?.surveyNo}</td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Govt Fair Value / Cent</td>
                <td className="py-2.5 px-3 font-bold font-mono text-emerald-400">
                  {formatINR(parcelA?.fairValuePerCent)}
                </td>
                <td className="py-2.5 px-3 font-bold font-mono text-emerald-400">
                  {formatINR(parcelB?.fairValuePerCent)}
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Market Rate / Cent</td>
                <td className="py-2.5 px-3 font-bold font-mono text-cyan-300">
                  {formatINR(parcelA?.marketValuePerCent)}
                </td>
                <td className="py-2.5 px-3 font-bold font-mono text-cyan-300">
                  {formatINR(parcelB?.marketValuePerCent)}
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Title & Legality</td>
                <td className="py-2.5 px-3 font-bold text-emerald-400">
                  ✓ 100% Buyable Freehold
                </td>
                <td className="py-2.5 px-3 font-bold text-emerald-400">
                  ✓ 100% Buyable Freehold
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Road Frontage Width</td>
                <td className="py-2.5 px-3 font-semibold text-slate-200">
                  {parcelA?.dimensions?.roadWidthMeters || 5.5}m ({parcelA?.dimensions?.roadType || "Panchayat Road"})
                </td>
                <td className="py-2.5 px-3 font-semibold text-slate-200">
                  {parcelB?.dimensions?.roadWidthMeters || 5.5}m ({parcelB?.dimensions?.roadType || "Panchayat Road"})
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Flood Susceptibility</td>
                <td className="py-2.5 px-3">{parcelA?.floodZone || "Safe"}</td>
                <td className="py-2.5 px-3">{parcelB?.floodZone || "Safe"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Close
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onSelectProperty(parcelA);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold hover:bg-emerald-900 transition flex items-center gap-1.5"
            >
              <span>View {parcelA?.name} on Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onSelectProperty(parcelB);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold hover:bg-cyan-900 transition flex items-center gap-1.5"
            >
              <span>View {parcelB?.name} on Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
