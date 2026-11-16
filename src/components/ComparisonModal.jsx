import React, { useState } from "react";
import { X, Scale, MapPin, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { SAMPLE_LAND_PARCELS } from "../data/keralaGeoData";
import { formatINR } from "../utils/geoCalculations";

export default function ComparisonModal({
  isOpen,
  onClose,
  currentProperty,
  onSelectProperty
}) {
  const [parcelAId, setParcelAId] = useState(currentProperty?.id || SAMPLE_LAND_PARCELS[0].id);
  const [parcelBId, setParcelBId] = useState(
    SAMPLE_LAND_PARCELS[1]?.id || SAMPLE_LAND_PARCELS[0].id
  );

  if (!isOpen) return null;

  const parcelA =
    SAMPLE_LAND_PARCELS.find((p) => p.id === parcelAId) || currentProperty;
  const parcelB =
    SAMPLE_LAND_PARCELS.find((p) => p.id === parcelBId) || SAMPLE_LAND_PARCELS[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-slate-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Kerala Land Parcel Comparison Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Compare valuation, natural risks, road access & legal status side-by-side
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
            <label className="block text-xs font-semibold text-cyan-400 mb-1.5">
              Select Plot A:
            </label>
            <select
              value={parcelAId}
              onChange={(e) => setParcelAId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {SAMPLE_LAND_PARCELS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.district})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-400 mb-1.5">
              Select Plot B:
            </label>
            <select
              value={parcelBId}
              onChange={(e) => setParcelBId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              {SAMPLE_LAND_PARCELS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.district})
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
                <th className="py-2.5 px-3 font-semibold uppercase text-[11px]">Evaluation Parameter</th>
                <th className="py-2.5 px-3 font-bold text-cyan-300 w-5/12">{parcelA?.name}</th>
                <th className="py-2.5 px-3 font-bold text-amber-300 w-5/12">{parcelB?.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">District & Taluk</td>
                <td className="py-2.5 px-3 font-semibold">{parcelA?.district} ({parcelA?.taluk})</td>
                <td className="py-2.5 px-3 font-semibold">{parcelB?.district} ({parcelB?.taluk})</td>
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
                <td className="py-2.5 px-3 text-slate-400 font-medium">Govt Fair Value / Are</td>
                <td className="py-2.5 px-3 font-mono text-slate-300">
                  {formatINR(parcelA?.fairValuePerAre)}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-300">
                  {formatINR(parcelB?.fairValuePerAre)}
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Estimated Market Value / Cent</td>
                <td className="py-2.5 px-3 font-bold font-mono text-cyan-300">
                  {formatINR(parcelA?.marketValuePerCent)}
                </td>
                <td className="py-2.5 px-3 font-bold font-mono text-cyan-300">
                  {formatINR(parcelB?.marketValuePerCent)}
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Land Classification</td>
                <td className="py-2.5 px-3">{parcelA?.classification}</td>
                <td className="py-2.5 px-3">{parcelB?.classification}</td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Wetland / Data Bank Entry</td>
                <td className="py-2.5 px-3">
                  {parcelA?.isWetland ? (
                    <span className="text-rose-400 font-bold">⚠️ Nilam (In Data Bank)</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">✓ Clear Dryland</span>
                  )}
                </td>
                <td className="py-2.5 px-3">
                  {parcelB?.isWetland ? (
                    <span className="text-rose-400 font-bold">⚠️ Nilam (In Data Bank)</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">✓ Clear Dryland</span>
                  )}
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Flood Risk Tier</td>
                <td className="py-2.5 px-3 font-semibold">
                  <span className={parcelA?.floodZone.status.includes("High") || parcelA?.floodZone.status.includes("Severe") ? "text-rose-400" : "text-emerald-400"}>
                    {parcelA?.floodZone.status}
                  </span>
                  <div className="text-[10px] text-slate-400">MSL: {parcelA?.floodZone.elevationMeters}m</div>
                </td>
                <td className="py-2.5 px-3 font-semibold">
                  <span className={parcelB?.floodZone.status.includes("High") || parcelB?.floodZone.status.includes("Severe") ? "text-rose-400" : "text-emerald-400"}>
                    {parcelB?.floodZone.status}
                  </span>
                  <div className="text-[10px] text-slate-400">MSL: {parcelB?.floodZone.elevationMeters}m</div>
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">2018 Great Flood Inundation</td>
                <td className="py-2.5 px-3">
                  {parcelA?.floodZone.inundatedIn2018 ? (
                    <span className="text-rose-400 font-semibold">Submerged (~{parcelA?.floodZone.inundationLevel2018Meters}m)</span>
                  ) : (
                    <span className="text-emerald-400 font-semibold">Safe / Not Submerged</span>
                  )}
                </td>
                <td className="py-2.5 px-3">
                  {parcelB?.floodZone.inundatedIn2018 ? (
                    <span className="text-rose-400 font-semibold">Submerged (~{parcelB?.floodZone.inundationLevel2018Meters}m)</span>
                  ) : (
                    <span className="text-emerald-400 font-semibold">Safe / Not Submerged</span>
                  )}
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Landslide Susceptibility</td>
                <td className="py-2.5 px-3">
                  <span className={parcelA?.landslideZone.status.includes("Critical") || parcelA?.landslideZone.status.includes("High") ? "text-rose-400 font-bold" : "text-emerald-400"}>
                    {parcelA?.landslideZone.status}
                  </span>
                  <div className="text-[10px] text-slate-400">Slope: {parcelA?.landslideZone.slopeDegrees}°</div>
                </td>
                <td className="py-2.5 px-3">
                  <span className={parcelB?.landslideZone.status.includes("Critical") || parcelB?.landslideZone.status.includes("High") ? "text-rose-400 font-bold" : "text-emerald-400"}>
                    {parcelB?.landslideZone.status}
                  </span>
                  <div className="text-[10px] text-slate-400">Slope: {parcelB?.landslideZone.slopeDegrees}°</div>
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Road Width & Access</td>
                <td className="py-2.5 px-3">
                  <span className="font-semibold text-slate-200">{parcelA?.roadWidthMeters}m</span> ({parcelA?.roadAccess})
                </td>
                <td className="py-2.5 px-3">
                  <span className="font-semibold text-slate-200">{parcelB?.roadWidthMeters}m</span> ({parcelB?.roadAccess})
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-medium">Building Permit Viability</td>
                <td className="py-2.5 px-3 font-bold">
                  {parcelA?.buildingPermitEligible ? (
                    <span className="text-emerald-400">✓ Ready for Permit</span>
                  ) : (
                    <span className="text-amber-400">⚠️ Clearance Required</span>
                  )}
                </td>
                <td className="py-2.5 px-3 font-bold">
                  {parcelB?.buildingPermitEligible ? (
                    <span className="text-emerald-400">✓ Ready for Permit</span>
                  ) : (
                    <span className="text-amber-400">⚠️ Clearance Required</span>
                  )}
                </td>
              </tr>

              <tr className="bg-slate-950/60">
                <td className="py-3 px-3 text-slate-200 font-bold">Overall Viability Score</td>
                <td className="py-3 px-3">
                  <span className="text-sm font-extrabold px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-400 font-mono">
                    {parcelA?.overallScore || 85}/100
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-sm font-extrabold px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-amber-400 font-mono">
                    {parcelB?.overallScore || 85}/100
                  </span>
                </td>
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
            Close Matrix
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onSelectProperty(parcelA);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold hover:bg-cyan-900 transition flex items-center gap-1.5"
            >
              <span>View {parcelA?.name} on Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onSelectProperty(parcelB);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-950 border border-amber-800 text-amber-300 text-xs font-semibold hover:bg-amber-900 transition flex items-center gap-1.5"
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
