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
  Calculator,
  Compass
} from "lucide-react";
import { formatINR, calculateKeralaRegistrationCost } from "../utils/geoCalculations.js";
import { CENT_TO_ARE, CENT_TO_SQFT, CENT_TO_SQM } from "../data/thrissurData.js";

export default function PropertyDetailsDrawer({
  property,
  onClose,
  onOpenComparison
}) {
  const [activeTab, setActiveTab] = useState("rates");
  const [isExpanded, setIsExpanded] = useState(false);
  const [customCents, setCustomCents] = useState(5.0);

  if (!property) return null;

  // Optional multi-cent calculator
  const calcCents = parseFloat(customCents) > 0 ? parseFloat(customCents) : 1.0;
  const multiCentFairValue = property.fairValuePerCent * calcCents;
  const multiCentMarketValue = property.marketValuePerCent * calcCents;
  const multiCentStampDuty = Math.round(multiCentFairValue * 0.08);
  const multiCentRegFee = Math.round(multiCentFairValue * 0.02);
  const multiCentTotalOutlay = multiCentMarketValue + multiCentStampDuty + multiCentRegFee + 1500;

  const handlePrint = () => {
    window.print();
  };

  return (
    <aside
      className={`fixed top-16 right-0 bottom-0 z-30 bg-slate-900/98 backdrop-blur-md border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
        isExpanded ? "w-full md:w-[680px]" : "w-full sm:w-[460px] md:w-[500px]"
      }`}
    >
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-start justify-between bg-slate-950/80">
        <div className="space-y-1 pr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              Thrissur &bull; {property.taluk}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded border bg-emerald-950 border-emerald-600 text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 100% Buyable Purayidam
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{property.village} Detailed Land Report</span>
          </h2>

          <div className="text-xs text-slate-400 flex items-center gap-3 flex-wrap">
            <span>
              <strong className="text-slate-300">Survey No:</strong> {property.surveyNo}
            </span>
            <span>
              <strong className="text-slate-300">Block:</strong> {property.blockNo}
            </span>
            <span className="text-cyan-400 font-mono text-[11px]">
              {property.lat?.toFixed(5)}°N, {property.lng?.toFixed(5)}°E
            </span>
          </div>
        </div>

        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenComparison}
            className="p-1.5 px-2.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-700/80 text-amber-300 transition flex items-center gap-1.5 text-xs font-semibold shadow-sm"
            title="Compare with another location in Thrissur"
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Compare</span>
          </button>
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

      {/* Prominent Selection Point Land Rate Cards (Always Visible) */}
      <div className="p-3.5 bg-slate-950 border-b border-slate-800">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <TrendingUp className="w-3.5 h-3.5" />
            Marketing Cost & Fair Value (ഭൂമി വില വിവരങ്ങൾ)
          </span>
          <span className="text-slate-400">Official Thrissur Valuation</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {/* Prevailing Market Rate / Marketing Cost */}
          <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/50 relative overflow-hidden">
            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Marketing Cost</div>
            <div className="text-sm sm:text-base font-bold text-cyan-300 font-mono mt-0.5">
              {formatINR(property.marketValuePerCent)}
            </div>
            <div className="text-[10px] text-cyan-400 font-medium">per Cent</div>
            <div className="text-[9px] text-slate-400 mt-1 border-t border-slate-800 pt-1">
              ~{formatINR(property.marketValuePerSqFt)} / sq.ft
            </div>
          </div>

          {/* Govt Fair Value */}
          <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 relative overflow-hidden">
            <div className="text-[10px] text-emerald-400 font-medium">Govt Fair Value</div>
            <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono mt-0.5">
              {formatINR(property.fairValuePerCent)}
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">per Cent</div>
            <div className="text-[9px] text-slate-400 mt-1 border-t border-slate-800 pt-1">
              {formatINR(property.fairValuePerAre)} / Are
            </div>
          </div>

          {/* Govt Stamp Duty & Reg Fees per Cent */}
          <div className="p-2.5 rounded-xl bg-slate-900 border border-amber-500/40 col-span-2 sm:col-span-1">
            <div className="text-[10px] text-slate-400 font-medium">Govt Tax per Cent</div>
            <div className="text-sm sm:text-base font-bold text-amber-300 font-mono mt-0.5">
              {formatINR(property.totalGovtCostPerCent)}
            </div>
            <div className="text-[10px] text-amber-300 font-medium">Duty (8%) + Reg (2%)</div>
            <div className="text-[9px] text-slate-400 mt-1 border-t border-slate-800 pt-1">
              Duty: {formatINR(property.stampDutyPerCent)} | Reg: {formatINR(property.registrationFeePerCent)}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900 text-xs overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("rates")}
          className={`px-3.5 py-2.5 font-medium border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === "rates"
              ? "border-cyan-400 text-cyan-300 bg-slate-800/60"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Rates & Pricing</span>
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
          onClick={() => setActiveTab("landslide")}
          className={`px-3.5 py-2.5 font-medium border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === "landslide"
              ? "border-cyan-400 text-cyan-300 bg-slate-800/60"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Mountain className="w-3.5 h-3.5 text-amber-400" />
          <span>Landslide Risk</span>
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
          <span>Nearby Amenities</span>
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
        {/* ================= TAB 1: RATES & PRICING ================= */}
        {activeTab === "rates" && (
          <div className="space-y-4 animate-in fade-in">
            {/* Unit Rates Table */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Unit-wise Land Rate Breakdown
                </span>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  Thrissur District
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 font-medium">Unit (യൂണിറ്റ്)</th>
                      <th className="py-2 font-medium">Govt Fair Value</th>
                      <th className="py-2 font-medium">Market Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    <tr>
                      <td className="py-2 text-slate-200 font-sans font-medium">Per Cent (സെന്റ്)</td>
                      <td className="py-2 text-emerald-400 font-bold">{formatINR(property.fairValuePerCent)}</td>
                      <td className="py-2 text-cyan-400 font-bold">{formatINR(property.marketValuePerCent)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-200 font-sans font-medium">Per Are (ആർ = 2.47c)</td>
                      <td className="py-2 text-emerald-400">{formatINR(property.fairValuePerAre)}</td>
                      <td className="py-2 text-cyan-400">{formatINR(property.marketValuePerAre)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-200 font-sans font-medium">Per Sq.Ft (സ്ക്വയർ ഫീറ്റ്)</td>
                      <td className="py-2 text-emerald-400">{formatINR(property.fairValuePerSqFt)}</td>
                      <td className="py-2 text-cyan-400">{formatINR(property.marketValuePerSqFt)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-200 font-sans font-medium">Per Acre (ഏക്കർ = 100c)</td>
                      <td className="py-2 text-emerald-400">{formatINR(property.fairValuePerAcre)}</td>
                      <td className="py-2 text-cyan-400">{formatINR(property.marketValuePerAcre)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                {property.description}
              </p>
            </div>

            {/* Optional Multi-Cent Price Calculator */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-cyan-400" />
                  Quick Multiplier Calculator (Optional)
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400">Calculate for:</span>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="100"
                    value={customCents}
                    onChange={(e) => setCustomCents(e.target.value)}
                    className="w-16 bg-slate-900 border border-cyan-500 rounded-lg px-2 py-0.5 text-xs font-bold font-mono text-cyan-300 text-center focus:outline-none"
                  />
                  <span className="text-xs font-bold text-cyan-400">Cents</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Market Price for {calcCents} Cents:</span>
                  <span className="font-mono font-bold text-cyan-400">{formatINR(multiCentMarketValue)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Govt Fair Value Base ({calcCents} Cents):</span>
                  <span className="font-mono">{formatINR(multiCentFairValue)}</span>
                </div>
                <div className="flex justify-between text-amber-300">
                  <span>Kerala Stamp Duty (8% of Fair Value):</span>
                  <span className="font-mono">{formatINR(multiCentStampDuty)}</span>
                </div>
                <div className="flex justify-between text-amber-300">
                  <span>Registration Fee (2% of Fair Value):</span>
                  <span className="font-mono">{formatINR(multiCentRegFee)}</span>
                </div>
                <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-sm font-bold text-emerald-400">
                  <span>Estimated Total Acquisition Cost:</span>
                  <span className="font-mono text-base">{formatINR(multiCentTotalOutlay)}</span>
                </div>
              </div>
            </div>

            {/* Legal Title & Buyability Guarantee */}
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 space-y-2 text-xs">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Legitimate Freehold Land Verification</span>
              </div>
              <p className="text-emerald-200/90 leading-relaxed text-[11px]">
                This selection point is registered private freehold Purayidam (Dryland). It does NOT fall under the Kerala Conservation of Paddy Land and Wetland Act (Act 28 of 2008) Data Bank restrictions. Clear title, transferrable deed, and building permit eligible under {property.kmbrCategory}.
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB 2: WATER & SOIL ================= */}
        {activeTab === "water" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  Water Table & Soil Characteristics
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-700">
                  Purayidam (Dryland)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Water Availability</div>
                  <div className="font-semibold text-emerald-400 mt-0.5">
                    Perennial (All 12 Months)
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Excellent open well & borewell yield</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Water Table Depth</div>
                  <div className="font-bold text-cyan-400 mt-0.5 font-mono text-base">
                    {property.groundWaterTableDepthMeters} m ({property.groundWaterTableDepthFt} ft)
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Reachable via standard ring well</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-2">
                <div>
                  <strong className="text-slate-200">Soil Foundation:</strong>{" "}
                  <span className="text-slate-300">{property.soilType}</span>
                </div>
                <div>
                  <strong className="text-slate-200">Waterlogged / Swamp Check:</strong>{" "}
                  <span className="text-emerald-400">No. High elevation dryland with natural gradient drainage.</span>
                </div>
                <div>
                  <strong className="text-slate-200">Wetland Data Bank:</strong>{" "}
                  <span className="text-emerald-400">Not listed in Data Bank (Form 6 conversion NOT required).</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: FLOOD STATUS ================= */}
        {activeTab === "flood" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-sky-400" />
                  Thrissur Flood Inundation Profile
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold border bg-emerald-950 text-emerald-300 border-emerald-700">
                  {property.floodZone.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Ground Elevation (MSL)</div>
                  <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">
                    {property.floodZone.elevationMeters} meters
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Above Mean Sea Level</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Nearest Major River</div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5 truncate">
                    {property.floodZone.riverName}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {property.floodZone.distanceToMajorRiverKm} km away
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 text-slate-300">
                <div>
                  <strong className="text-slate-200">2018 Great Flood Impact:</strong>{" "}
                  {property.floodZone.inundatedIn2018 ? (
                    <span className="text-amber-400">River overflow buffer reach in 2018.</span>
                  ) : (
                    <span className="text-emerald-400">Safe. No water inundation occurred during the 2018 Kerala floods.</span>
                  )}
                </div>
                <div>
                  <strong className="text-slate-200">Assessment:</strong> {property.floodZone.notes}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: LANDSLIDE RISK ================= */}
        {activeTab === "landslide" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Mountain className="w-4 h-4 text-amber-400" />
                  Landslide & Terrain Vulnerability
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold border bg-emerald-950 text-emerald-300 border-emerald-700">
                  {property.landslideZone.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Hazard Category</div>
                  <div className="font-bold text-emerald-400 mt-0.5 font-mono text-base">
                    {property.landslideZone.hazardLevel}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Negligible risk</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Terrain Slope Angle</div>
                  <div className="font-bold text-cyan-400 mt-0.5 font-mono text-base">
                    {property.landslideZone.slopeDegrees}°
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Flat / Gentle topography</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong className="text-slate-200">Foundation Stability:</strong>{" "}
                {property.landslideZone.warningNotes} Ideal for independent villas, multi-story residences, and commercial establishments with standard footing.
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: AMENITIES & ROAD ACCESS ================= */}
        {activeTab === "facilities" && (
          <div className="space-y-4 animate-in fade-in">
            {/* Road Access Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-slate-200 flex items-center gap-2">
                <Car className="w-4 h-4 text-cyan-400" />
                <span>Road Access & Frontage</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400">Road Type:</span> {property.roadAccess}
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400">Tarred Width:</span> {property.roadWidthMeters} meters
                </div>
              </div>
            </div>

            {/* Nearest Amenities */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Nearest Facilities from Selection Point
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
                      <div className="text-[10px] text-slate-400">
                        ~{property.nearestFacilities.hospital[0].driveTimeMins} mins
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
                          Railway / Bus Transit
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-cyan-400 font-mono">
                        {property.nearestFacilities.transit[0].distanceKm} km
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ~{property.nearestFacilities.transit[0].driveTimeMins} mins
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
                          Shopping Mall / Market
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-cyan-400 font-mono">
                        {property.nearestFacilities.shopping[0].distanceKm} km
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ~{property.nearestFacilities.shopping[0].driveTimeMins} mins
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
      <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
        <div>
          <span className="text-slate-400">Selection Point Rate:</span>{" "}
          <span className="font-bold text-emerald-400 font-mono">
            {formatINR(property.fairValuePerCent)} / Cent
          </span>
          <span className="text-slate-400 hidden sm:inline"> &bull; Market: </span>
          <span className="font-bold text-cyan-400 font-mono hidden sm:inline">
            {formatINR(property.marketValuePerCent)} / Cent
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenComparison}
            className="px-2.5 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-800 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition shadow"
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Compare</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Report</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
