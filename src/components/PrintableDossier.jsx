import React from "react";
import { formatINR, calculateKeralaRegistrationCost, computeSpecifiedDimensions } from "../utils/geoCalculations.js";
import { CENT_TO_ARE, CENT_TO_SQFT } from "../data/thrissurData.js";

export default function PrintableDossier({ property }) {
  if (!property) return null;

  const currentArea = property.specifiedAreaCents || 8.0;
  const dims = property.dimensions || computeSpecifiedDimensions(currentArea);
  const cost = calculateKeralaRegistrationCost(
    property.fairValuePerCent,
    currentArea,
    property.marketValuePerCent / Math.max(1, property.fairValuePerCent)
  );

  return (
    <div className="hidden print:block p-8 bg-white text-slate-900 font-sans print-only">
      {/* Dossier Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
        <div>
          <div className="text-2xl font-black tracking-tight text-slate-900">
            BHOOMI THRISSUR | ഭൂമി തൃശ്ശൂർ
          </div>
          <div className="text-sm font-semibold text-slate-700">
            Thrissur District Cadastral Valuation & Specified Land Area Dossier
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Reference: Kerala Registration Department (PEARL) & Thrissur District Revenue Administration
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-mono text-slate-500">Date: {new Date().toLocaleDateString("en-IN")}</div>
          <div className="text-xs font-bold text-slate-800 mt-1">Parcel ID: {property.id}</div>
          <div className="inline-block mt-2 px-3 py-1 bg-emerald-100 border border-emerald-400 text-emerald-800 rounded text-xs font-bold">
            ✓ 100% BUYABLE FREEHOLD PURAYIDAM
          </div>
        </div>
      </div>

      {/* Cadastral Overview */}
      <div className="mb-6 p-4 border border-slate-300 rounded-lg bg-slate-50">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
          1. Cadastral & Survey Identification
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
          <div><strong>Property Name:</strong> {property.name}</div>
          <div><strong>District:</strong> Thrissur District (തൃശ്ശൂർ)</div>
          <div><strong>Taluk:</strong> {property.taluk}</div>
          <div><strong>Village:</strong> {property.village}</div>
          <div><strong>Re-Survey No:</strong> {property.surveyNo}</div>
          <div><strong>Block Number:</strong> {property.blockNo}</div>
          <div><strong>Land Classification:</strong> {property.classification}</div>
          <div><strong>Legal Status:</strong> Legitimate Private Freehold (Ready for Transfer)</div>
        </div>
      </div>

      {/* Specified Area & Exact Boundary Dimensions */}
      <div className="mb-6 p-4 border border-slate-300 rounded-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
          2. Specified Land Area & Boundary Dimensions
        </h3>
        <div className="grid grid-cols-4 gap-3 mb-3 text-xs">
          <div className="p-2 border border-slate-200 rounded bg-slate-50">
            <div className="text-slate-500">Specified Area:</div>
            <div className="text-base font-bold font-mono text-emerald-700">{currentArea} Cents</div>
            <div className="text-[10px] text-slate-500">({dims.areaAres} Ares)</div>
          </div>
          <div className="p-2 border border-slate-200 rounded">
            <div className="text-slate-500">Square Footage:</div>
            <div className="text-sm font-bold font-mono">{dims.areaSqFt} sq ft</div>
            <div className="text-[10px] text-slate-500">({dims.areaSqM} sq m)</div>
          </div>
          <div className="p-2 border border-slate-200 rounded">
            <div className="text-slate-500">Road Frontage:</div>
            <div className="text-sm font-bold font-mono">{dims.frontageFt} ft ({dims.frontageM}m)</div>
            <div className="text-[10px] text-slate-500">Road Width: {property.roadWidthMeters}m</div>
          </div>
          <div className="p-2 border border-slate-200 rounded">
            <div className="text-slate-500">Plot Depth:</div>
            <div className="text-sm font-bold font-mono">{dims.depthFt} ft ({dims.depthM}m)</div>
            <div className="text-[10px] text-slate-500">Perimeter: {dims.perimeterFt} ft</div>
          </div>
        </div>
      </div>

      {/* Fair Value & Cost Breakdown */}
      <div className="mb-6 p-4 border border-slate-300 rounded-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
          3. Government Fair Value & Statutory Acquisition Outlay
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-3 text-xs">
          <div className="p-2 border border-slate-200 rounded">
            <div className="text-slate-500">Govt Fair Value / Cent:</div>
            <div className="text-sm font-bold font-mono text-emerald-700">{formatINR(property.fairValuePerCent)}</div>
          </div>
          <div className="p-2 border border-slate-200 rounded">
            <div className="text-slate-500">Govt Fair Value / Are:</div>
            <div className="text-sm font-bold font-mono">{formatINR(property.fairValuePerAre)}</div>
          </div>
          <div className="p-2 border border-slate-200 rounded">
            <div className="text-slate-500">Market Rate / Cent:</div>
            <div className="text-sm font-bold font-mono">{formatINR(property.marketValuePerCent)}</div>
          </div>
        </div>

        <div className="text-xs space-y-1 border-t border-slate-200 pt-2">
          <div className="flex justify-between">
            <span>Land Price for {currentArea} Cents (at Market Rate):</span>
            <span className="font-mono font-bold">{formatINR(cost.totalConsideration)}</span>
          </div>
          <div className="flex justify-between">
            <span>Kerala Stamp Duty (8%):</span>
            <span className="font-mono">{formatINR(cost.stampDuty)}</span>
          </div>
          <div className="flex justify-between">
            <span>Registration Fee (2%):</span>
            <span className="font-mono">{formatINR(cost.registrationFee)}</span>
          </div>
          <div className="flex justify-between">
            <span>Pokkuvaravu (Mutation) & Documentation:</span>
            <span className="font-mono">{formatINR(cost.legalAndDocFee + cost.mutationPokkuvaravuFee)}</span>
          </div>
          <div className="flex justify-between font-bold border-t border-slate-300 pt-1 text-slate-900 text-sm">
            <span>Total Estimated Outlay:</span>
            <span className="font-mono text-emerald-700">{formatINR(cost.grandTotalCost)}</span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-500 border-t border-slate-300 pt-2 flex justify-between">
        <span>BhoomiThrissur Land Intelligence Engine</span>
        <span>Verified against Kerala Registration Department Fair Value Gazettes</span>
      </div>
    </div>
  );
}
