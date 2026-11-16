import React from "react";
import { formatINR } from "../utils/geoCalculations.js";

export default function PrintableDossier({ property }) {
  if (!property) return null;

  return (
    <div className="hidden print:block p-8 bg-white text-slate-900 font-sans print-only">
      {/* Dossier Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
        <div>
          <div className="text-2xl font-black tracking-tight text-slate-900">
            BHOOMI THRISSUR | ഭൂമി തൃശ്ശൂർ
          </div>
          <div className="text-sm font-semibold text-slate-700">
            Thrissur District Point Land Rate & Due-Diligence Dossier
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Reference: Kerala Registration Department (PEARL) & Official Thrissur Revenue Records
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-mono text-slate-500">Date: {new Date().toLocaleDateString("en-IN")}</div>
          <div className="text-xs font-bold text-slate-800 mt-1">Point ID: {property.id}</div>
          <div className="inline-block mt-2 px-3 py-1 bg-emerald-100 border border-emerald-400 text-emerald-800 rounded text-xs font-bold">
            ✓ 100% BUYABLE FREEHOLD PURAYIDAM
          </div>
        </div>
      </div>

      {/* Cadastral Overview */}
      <div className="mb-6 p-4 border border-slate-300 rounded-lg bg-slate-50">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
          1. Selection Point Cadastral & Geographic Identification
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
          <div><strong>District:</strong> Thrissur District (തൃശ്ശൂർ)</div>
          <div><strong>Taluk:</strong> {property.taluk}</div>
          <div><strong>Village:</strong> {property.village}</div>
          <div><strong>Desom / Locality:</strong> {property.desom}</div>
          <div><strong>Re-Survey No:</strong> {property.surveyNo}</div>
          <div><strong>Block Number:</strong> {property.blockNo}</div>
          <div><strong>GPS Coordinates:</strong> {property.lat}° N, {property.lng}° E</div>
          <div><strong>Land Classification:</strong> {property.classification}</div>
        </div>
      </div>

      {/* Point Land Rates */}
      <div className="mb-6 p-4 border border-slate-300 rounded-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
          2. Selection Point Land Rates (ന്യായവില & വിപണി നിരക്ക്)
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-3 text-xs">
          <div className="p-3 border border-slate-200 rounded bg-slate-50">
            <div className="text-slate-500">Govt Fair Value / Cent:</div>
            <div className="text-base font-bold font-mono text-emerald-700">{formatINR(property.fairValuePerCent)}</div>
            <div className="text-[10px] text-slate-500 mt-1">({formatINR(property.fairValuePerAre)} / Are)</div>
          </div>
          <div className="p-3 border border-slate-200 rounded bg-slate-50">
            <div className="text-slate-500">Prevailing Market Rate / Cent:</div>
            <div className="text-base font-bold font-mono text-cyan-700">{formatINR(property.marketValuePerCent)}</div>
            <div className="text-[10px] text-slate-500 mt-1">(~{formatINR(property.marketValuePerSqFt)} / sq.ft)</div>
          </div>
          <div className="p-3 border border-slate-200 rounded bg-slate-50">
            <div className="text-slate-500">Govt Tax per Cent:</div>
            <div className="text-base font-bold font-mono text-amber-700">{formatINR(property.totalGovtCostPerCent)}</div>
            <div className="text-[10px] text-slate-500 mt-1">8% Stamp Duty + 2% Reg Fee</div>
          </div>
        </div>
      </div>

      {/* Environmental & Geo-Risk Assessment */}
      <div className="mb-6 p-4 border border-slate-300 rounded-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
          3. Environmental & Natural Hazard Assessment
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
          <div><strong>Flood Zone Category:</strong> {property.floodZone.status}</div>
          <div><strong>Ground Elevation:</strong> {property.floodZone.elevationMeters} meters MSL</div>
          <div><strong>2018 Flood Inundation:</strong> {property.floodZone.inundatedIn2018 ? "Buffer Inundation" : "Safe - Zero Inundation"}</div>
          <div><strong>Nearest River:</strong> {property.floodZone.riverName} ({property.floodZone.distanceToMajorRiverKm} km)</div>
          <div><strong>Landslide Hazard:</strong> {property.landslideZone.status} (Slope: {property.landslideZone.slopeDegrees}°)</div>
          <div><strong>Water Availability:</strong> {property.waterStatus} (Depth: {property.groundWaterTableDepthMeters}m)</div>
          <div><strong>Road Frontage:</strong> {property.roadAccess} ({property.roadWidthMeters}m width)</div>
          <div><strong>Building Rule:</strong> {property.kmbrCategory}</div>
        </div>
      </div>

      {/* Footer Notes */}
      <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-4 leading-relaxed">
        <strong>Legal Disclaimer:</strong> Generated for informational & due-diligence reference. Baseline fair values derived from Kerala Registration Department official gazette notifications. All deeds and encumbrances should be independently verified at the concerned Sub-Registrar Office (SRO) before final execution.
      </div>
    </div>
  );
}
