import React, { useState } from "react";
import {
  X,
  MapPin,
  TrendingUp,
  Droplets,
  Waves,
  Mountain,
  Hospital,
  Train,
  ShoppingBag,
  Car,
  CheckCircle2,
  FileText,
  Printer,
  ShieldCheck,
  Scale,
  Maximize2,
  Minimize2,
  Ruler,
  Sliders,
  Sparkles
} from "lucide-react";
import {
  formatINR,
  calculateKeralaRegistrationCost,
  computeSpecifiedDimensions
} from "../utils/geoCalculations.js";
import { CENT_TO_ARE, CENT_TO_SQFT, CENT_TO_SQM } from "../data/thrissurData.js";

export default function PropertyDetailsDrawer({
  property,
  onClose,
  onOpenComparison,
  onUpdateArea
}) {
  const [activeTab, setActiveTab] = useState("valuation");
  const [areaInput, setAreaInput] = useState(property?.specifiedAreaCents || 8.0);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!property) return null;

  const currentArea = parseFloat(areaInput) || 8.0;
  const dims = property.dimensions || computeSpecifiedDimensions(currentArea);

  // Recalculate costs for custom area
  const marketMultiplier = property.fairValuePerCent > 0 ? property.marketValuePerCent / property.fairValuePerCent : 2.2;
  const registrationOutlay = calculateKeralaRegistrationCost(
    property.fairValuePerCent,
    currentArea,
    marketMultiplier
  );

  const handleAreaChange = (val) => {
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setAreaInput(num);
      if (onUpdateArea) {
        onUpdateArea(num);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <aside
      className={`fixed top-16 right-0 bottom-0 z-30 bg-slate-900/98 backdrop-blur-md border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
        isExpanded ? "w-full md:w-[680px]" : "w-full sm:w-[460px] md:w-[500px]"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-start justify-between bg-slate-950/70">
        <div className="space-y-1 pr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              Thrissur &bull; {property.taluk}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded border bg-emerald-950 border-emerald-600 text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 100% Buyable Land
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{property.name}</span>
          </h2>

          <div className="text-xs text-slate-400 flex items-center gap-3">
            <span>
              <strong className="text-slate-300">Village:</strong> {property.village}
            </span>
            <span>
              <strong className="text-slate-300">Survey No:</strong> {property.surveyNo}
            </span>
            <span>
              <strong className="text-slate-300">Block:</strong> {property.blockNo}
            </span>
          </div>
        </div>

        {/* Window controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition hidden md:block"
            title={isExpanded ? "Standard width" : "Expand drawer"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={handlePrint}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition"
            title="Print Property Due-Diligence Dossier"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Prominent Affirmative Legal Notice: 100% BUYABLE */}
      <div className="p-3 bg-emerald-950/80 border-b border-emerald-800/80 flex items-start gap-2.5 text-emerald-200">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <strong className="text-white">✓ 100% BUYABLE & REGISTERABLE LAND:</strong> This plot in Thrissur District is legitimate freehold Purayidam (Dryland) with registered title, survey sketch, and building permit eligibility. Existing houses can be legally purchased and transferred.
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900 text-xs overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("valuation")}
          className={`px-3.5 py-2.5 font-medium border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === "valuation"
              ? "border-cyan-400 text-cyan-300 bg-slate-800/60"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Fair Value & Cost</span>
        </button>

        <button
          onClick={() => setActiveTab("dimensions")}
          className={`px-3.5 py-2.5 font-medium border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === "dimensions"
              ? "border-cyan-400 text-cyan-300 bg-slate-800/60"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Ruler className="w-3.5 h-3.5 text-amber-400" />
          <span>Specified Dimensions</span>
        </button>

        <button
          onClick={() => setActiveTab("water")}
          className={`px-3.5 py-2.5 font-medium border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === "water"
              ? "border-cyan-400 text-cyan-300 bg-slate-800/60"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Droplets className="w-3.5 h-3.5 text-blue-400" />
          <span>Water & Soil</span>
        </button>

        <button
          onClick={() => setActiveTab("flood")}
          className={`px-3.5 py-2.5 font-medium border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === "flood"
              ? "border-cyan-400 text-cyan-300 bg-slate-800/60"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Waves className="w-3.5 h-3.5 text-sky-400" />
          <span>Flood Status</span>
        </button>

        <button
          onClick={() => setActiveTab("facilities")}
          className={`px-3.5 py-2.5 font-medium border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === "facilities"
              ? "border-cyan-400 text-cyan-300 bg-slate-800/60"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Hospital className="w-3.5 h-3.5 text-emerald-400" />
          <span>Thrissur Amenities</span>
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
        {/* ================= TAB 1: VALUATION & OUTLAY ================= */}
        {activeTab === "valuation" && (
          <div className="space-y-4 animate-in fade-in">
            {/* Rates Comparison Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  Thrissur Govt Fair Value (ന്യായവില) vs Market Estimate
                </span>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  IGR Kerala Ref
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Govt Fair Value / Cent</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono mt-0.5">
                    {formatINR(property.fairValuePerCent)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    ({formatINR(property.fairValuePerAre)} / Are)
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Prevailing Market Rate / Cent</div>
                  <div className="text-base sm:text-lg font-bold text-cyan-400 font-mono mt-0.5">
                    {formatINR(property.marketValuePerCent)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    ~{(property.marketValuePerCent / Math.max(1, property.fairValuePerCent)).toFixed(1)}x of Fair Value
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Specified Area Input & Cost Breakdown */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  Specify Land Area:
                </span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    step="0.25"
                    min="1"
                    max="100"
                    value={areaInput}
                    onChange={(e) => handleAreaChange(e.target.value)}
                    className="w-20 bg-slate-900 border border-cyan-500 rounded-lg px-2 py-1 text-xs font-bold font-mono text-cyan-300 text-center focus:outline-none"
                  />
                  <span className="text-xs font-semibold text-cyan-400">Cents</span>
                </div>
              </div>

              {/* Quick Area Preset Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {[4.0, 5.0, 6.25, 8.0, 10.0, 12.0, 15.0, 20.0].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleAreaChange(preset)}
                    className={`px-2 py-1 rounded-md text-[11px] font-mono font-medium transition ${
                      currentArea === preset
                        ? "bg-cyan-950 border border-cyan-500 text-cyan-300"
                        : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                  >
                    {preset}c
                  </button>
                ))}
              </div>

              {/* Expense Breakdown Table */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Land Price for {currentArea} Cents (at Market Rate)</span>
                  <span className="font-mono font-medium">
                    {formatINR(registrationOutlay.totalConsideration)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Govt Fair Value Assessment ({currentArea} Cents)</span>
                  <span className="font-mono">
                    {formatINR(registrationOutlay.totalFairValue)}
                  </span>
                </div>

                <div className="flex justify-between text-amber-300">
                  <span>Kerala Stamp Duty (8%)</span>
                  <span className="font-mono">
                    {formatINR(registrationOutlay.stampDuty)}
                  </span>
                </div>

                <div className="flex justify-between text-amber-300">
                  <span>Registration Fee (2%)</span>
                  <span className="font-mono">
                    {formatINR(registrationOutlay.registrationFee)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Mutation (Pokkuvaravu) & Legal Documentation</span>
                  <span className="font-mono">
                    {formatINR(registrationOutlay.legalAndDocFee + registrationOutlay.mutationPokkuvaravuFee)}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-sm font-bold text-emerald-400">
                  <span>Total Acquisition Outlay:</span>
                  <span className="font-mono text-base">
                    {formatINR(registrationOutlay.grandTotalCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: SPECIFIED DIMENSIONS ================= */}
        {activeTab === "dimensions" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-amber-400" />
                  Exact Boundary Dimensions ({currentArea} Cents)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Scale: 1 Cent = 435.6 sq ft
                </span>
              </div>

              {/* Exact Side Lengths Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Road Frontage (വഴിയതിര്)</div>
                  <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                    {dims.frontageFt} ft ({dims.frontageM} m)
                  </div>
                  <div className="text-[10px] text-slate-400">Road Width: {property.roadWidthMeters}m</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Plot Depth / Length (നീളം)</div>
                  <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">
                    {dims.depthFt} ft ({dims.depthM} m)
                  </div>
                  <div className="text-[10px] text-slate-400">Side boundaries</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Total Land Area</div>
                  <div className="text-base font-bold text-amber-300 font-mono mt-0.5">
                    {dims.areaCents} Cents
                  </div>
                  <div className="text-[10px] text-slate-400">{dims.areaSqFt} Sq. Ft ({dims.areaAres} Ares)</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Compound Perimeter (ചുറ്റളവ്)</div>
                  <div className="text-base font-bold text-purple-300 font-mono mt-0.5">
                    {dims.perimeterFt} ft ({dims.perimeterM} m)
                  </div>
                  <div className="text-[10px] text-slate-400">Total fencing length</div>
                </div>
              </div>

              {/* Graphical Boundary Diagram */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center text-xs">
                <div className="text-[11px] text-slate-400 mb-2">North Boundary: {dims.frontageFt} ft</div>
                <div className="w-48 h-32 border-2 border-dashed border-cyan-400 bg-cyan-950/30 rounded-lg flex flex-col items-center justify-center text-center p-2 relative">
                  <span className="absolute -left-12 text-[10px] text-slate-400 rotate-[-90deg]">{dims.depthFt} ft</span>
                  <span className="font-bold text-cyan-300">{dims.areaCents} Cents</span>
                  <span className="text-[10px] text-slate-400">({dims.areaSqFt} sq ft)</span>
                  <span className="absolute -right-12 text-[10px] text-slate-400 rotate-[90deg]">{dims.depthFt} ft</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">South Boundary: {dims.frontageFt} ft (Road Frontage)</div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: WATER & SOIL ================= */}
        {activeTab === "water" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  Hydrological & Soil Foundation (Thrissur)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-700">
                  Purayidam (Dryland)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Classification</div>
                  <div className="font-semibold text-slate-200 mt-0.5">
                    {property.classification}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Groundwater Depth</div>
                  <div className="font-semibold text-cyan-400 mt-0.5 font-mono">
                    {property.groundWaterTableDepthMeters} meters
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                <strong className="text-slate-200">Water Availability:</strong> {property.waterStatus}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: FLOOD STATUS ================= */}
        {activeTab === "flood" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-sky-400" />
                  Thrissur Flood Inundation Profile
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold border bg-emerald-950 text-emerald-300 border-emerald-700">
                  {property.floodZone.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Elevation above MSL</div>
                  <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">
                    {property.floodZone.elevationMeters} meters
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Nearest Major River</div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5 truncate">
                    {property.floodZone.riverName}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                {property.floodZone.notes}
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB 5: AMENITIES ================= */}
        {activeTab === "facilities" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Nearest Thrissur District Facilities
              </h4>

              <div className="space-y-2 text-xs">
                {property.nearestFacilities?.hospital?.[0] && (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-rose-950/80 text-rose-400 border border-rose-800/80">
                        <Hospital className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">
                          {property.nearestFacilities.hospital[0].name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {property.nearestFacilities.hospital[0].type}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-cyan-400 font-mono">
                        {property.nearestFacilities.hospital[0].distanceKm} km
                      </div>
                    </div>
                  </div>
                )}

                {property.nearestFacilities?.transit?.[0] && (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-800/80">
                        <Train className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">
                          {property.nearestFacilities.transit[0].name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Railway Junction
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-cyan-400 font-mono">
                        {property.nearestFacilities.transit[0].distanceKm} km
                      </div>
                    </div>
                  </div>
                )}

                {property.nearestFacilities?.shopping?.[0] && (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-800/80">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">
                          {property.nearestFacilities.shopping[0].name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Shopping Mall
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-cyan-400 font-mono">
                        {property.nearestFacilities.shopping[0].distanceKm} km
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Summary Bar */}
      <div className="p-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
        <div>
          <span className="text-slate-400">Specified Area:</span>{" "}
          <span className="font-bold text-emerald-400 font-mono">
            {currentArea} Cents ({dims.frontageFt} × {dims.depthFt} ft)
          </span>
        </div>
        <div>
          <span className="text-slate-400">Total Outlay:</span>{" "}
          <span className="font-bold text-cyan-400 font-mono">
            {formatINR(registrationOutlay.grandTotalCost)}
          </span>
        </div>
      </div>
    </aside>
  );
}
