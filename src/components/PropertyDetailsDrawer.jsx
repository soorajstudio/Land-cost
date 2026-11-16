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
  GraduationCap,
  ShoppingBag,
  Plane,
  Car,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Printer,
  ShieldCheck,
  ShieldAlert,
  Info,
  Scale,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Minimize2,
  Ban
} from "lucide-react";
import {
  formatINR,
  calculateKeralaRegistrationCost,
  calculateWetlandConversionFee
} from "../utils/geoCalculations";
import { ARE_TO_CENT, CENT_TO_ARE, CENT_TO_SQFT, CENT_TO_SQM } from "../data/keralaGeoData";

export default function PropertyDetailsDrawer({
  property,
  onClose,
  onOpenComparison
}) {
  const [activeTab, setActiveTab] = useState("valuation");
  const [customAreaCents, setCustomAreaCents] = useState(property?.areaCents || 10);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!property) return null;

  const isNonPurchasable = property.isSea || property.isBeach || property.isWaterbody;

  // Recalculate costs for custom area (only if purchasable)
  const marketMultiplier = property.fairValuePerCent > 0 ? property.marketValuePerCent / property.fairValuePerCent : 0;
  const registrationOutlay = calculateKeralaRegistrationCost(
    property.fairValuePerCent,
    customAreaCents,
    marketMultiplier
  );

  const wetlandFee = calculateWetlandConversionFee(property.fairValuePerCent, customAreaCents);

  // Overall Score Color
  let scoreBadgeColor = "bg-emerald-950 border-emerald-500 text-emerald-400";
  let scoreLabel = "High Viability & Safe";
  if (isNonPurchasable || property.overallScore <= 10) {
    scoreBadgeColor = "bg-rose-950 border-rose-500 text-rose-400";
    scoreLabel = property.isSea ? "Sovereign Waters (Illegal to Buy)" : property.isBeach ? "CRZ-I Public Beach (Cannot Buy)" : "Public Waterbody (Kayal Puramboke)";
  } else if (property.overallScore < 50) {
    scoreBadgeColor = "bg-rose-950 border-rose-500 text-rose-400";
    scoreLabel = "High Hazard / Critical Caution";
  } else if (property.overallScore < 75) {
    scoreBadgeColor = "bg-amber-950 border-amber-500 text-amber-400";
    scoreLabel = "Moderate Caution / Review Needed";
  }

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
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {property.district} &bull; {property.taluk}
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${scoreBadgeColor}`}>
              Viability: {property.overallScore}/100 ({scoreLabel})
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

      {/* Prominent Legal Warning Banner for Sea, Beach, or Public Waterbody */}
      {isNonPurchasable && (
        <div className="p-3.5 bg-rose-950/90 border-b border-rose-800 flex items-start gap-3 text-rose-200 animate-in fade-in">
          <Ban className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <div className="font-extrabold text-white text-sm flex items-center gap-2">
              <span>{property.legalNoticeTitle || "LEGAL NOTICE: NON-PURCHASABLE NATURAL DOMAIN"}</span>
            </div>
            <p className="text-[11px] text-rose-200 leading-relaxed">
              {property.legalNoticeText || "Under Indian Maritime Law, the Territorial Waters Act 1976, and the Public Trust Doctrine, the sea and public beaches cannot be bought, sold, or registered by private individuals."}
            </p>
          </div>
        </div>
      )}

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
          onClick={() => setActiveTab("water")}
          className={`px-3.5 py-2.5 font-medium border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === "water"
              ? "border-cyan-400 text-cyan-300 bg-slate-800/60"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Droplets className="w-3.5 h-3.5 text-blue-400" />
          <span>Water & Wetland</span>
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
          <span>Flood & Maritime Risk</span>
        </button>

        <button
          onClick={() => setActiveTab("landslide")}
          className={`px-3.5 py-2.5 font-medium border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === "landslide"
              ? "border-cyan-400 text-cyan-300 bg-slate-800/60"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Mountain className="w-3.5 h-3.5 text-rose-400" />
          <span>Terrain & Erosion</span>
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

        <button
          onClick={() => setActiveTab("checklist")}
          className={`px-3.5 py-2.5 font-medium border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === "checklist"
              ? "border-cyan-400 text-cyan-300 bg-slate-800/60"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-purple-400" />
          <span>Legal Status</span>
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs sm:text-sm">
        {/* ================= TAB 1: VALUATION & ACQUISITION COSTS ================= */}
        {activeTab === "valuation" && (
          <div className="space-y-4 animate-in fade-in">
            {isNonPurchasable ? (
              /* Non-purchasable Sea / Beach Card */
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 space-y-4">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                  <span>Non-Registrable: Not Available for Private Purchase</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-950 border border-rose-900/60">
                    <div className="text-[11px] text-slate-400">Govt Fair Value</div>
                    <div className="text-base sm:text-lg font-bold text-rose-400 font-mono mt-0.5">
                      ₹ 0 (Non-Saleable)
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Zero Govt Assessment</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-rose-900/60">
                    <div className="text-[11px] text-slate-400">Market Rate</div>
                    <div className="text-base sm:text-lg font-bold text-rose-400 font-mono mt-0.5">
                      Illegal to Sell
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Public Domain Asset</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs leading-relaxed space-y-2">
                  <div className="font-semibold text-white">Why cannot you buy this?</div>
                  <p>
                    1. <strong>Article 297, Constitution of India:</strong> All lands, minerals, and other things of value underlying the ocean within the territorial waters or continental shelf of India vest in the Union.
                  </p>
                  <p>
                    2. <strong>Public Trust Doctrine:</strong> Established by the Supreme Court of India (M.C. Mehta v. Kamal Nath), the state is the trustee of all natural resources including the sea, shores, rivers, and forests for the benefit of the general public.
                  </p>
                  <p>
                    3. <strong>Zero Jurisdiction:</strong> The Kerala Registration Department (PEARL portal) does not issue survey numbers, thandappers, or title deeds for the ocean or public beaches.
                  </p>
                </div>
              </div>
            ) : (
              /* Normal Land Valuation Card */
              <>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                      Government Fair Value vs Market Estimate
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

                {/* Custom Area & Purchase Outlay Calculator */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">
                      Total Land Purchase Outlay Simulator
                    </span>
                    <span className="text-xs font-semibold text-cyan-400 font-mono">
                      {customAreaCents} Cents ({(customAreaCents * CENT_TO_ARE).toFixed(2)} Ares)
                    </span>
                  </div>

                  {/* Slider */}
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="0.5"
                    value={customAreaCents}
                    onChange={(e) => setCustomAreaCents(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />

                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1 Cent (435.6 sq ft)</span>
                    <span>10 Cents</span>
                    <span>25 Cents</span>
                    <span>50 Cents (0.5 Acre)</span>
                  </div>

                  {/* Expense Breakdown Table */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Land Consideration (at Market Value)</span>
                      <span className="font-mono font-medium">
                        {formatINR(registrationOutlay.totalConsideration)}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-400">
                      <span>Govt Fair Value Assessment (Tax Base)</span>
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
                      <span>Kerala Registration Fee (2%)</span>
                      <span className="font-mono">
                        {formatINR(registrationOutlay.registrationFee)}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-400">
                      <span>Mutation (Pokkuvaravu) & Legal/Doc Fee</span>
                      <span className="font-mono">
                        {formatINR(registrationOutlay.legalAndDocFee + registrationOutlay.mutationPokkuvaravuFee)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-700/80 flex justify-between items-center text-sm font-bold text-emerald-400">
                      <span>Total Buying Outlay:</span>
                      <span className="font-mono text-base">
                        {formatINR(registrationOutlay.grandTotalCost)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenComparison}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-cyan-300 flex items-center justify-center gap-2 transition"
                >
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Compare this plot with another Kerala location</span>
                </button>
              </>
            )}
          </div>
        )}

        {/* ================= TAB 2: WATER STATUS & WETLAND (NILAM / PURAYIDAM) ================= */}
        {activeTab === "water" && (
          <div className="space-y-4 animate-in fade-in">
            <div className={`p-4 rounded-xl border ${
              isNonPurchasable
                ? "bg-rose-950/40 border-rose-800/80"
                : property.isWetland
                ? "bg-amber-950/40 border-amber-800/80"
                : "bg-slate-950 border-slate-800"
            } space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  Water Table & Wetland Status
                </span>
                {isNonPurchasable ? (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-900 text-rose-300 font-bold border border-rose-700 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Oceanic / Public Water
                  </span>
                ) : property.isWetland ? (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900 text-amber-300 font-bold border border-amber-700 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> NILAM / Wetland Alert
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Dryland (Purayidam)
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Land Classification</div>
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
                <strong className="text-slate-200">Hydrological Status:</strong> {property.waterStatus}
              </div>
            </div>

            {/* Regulatory Status */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <h4 className="text-xs font-bold text-slate-200">
                  {isNonPurchasable ? "Maritime & Coastal Zone Authority (KCZMA) Rules" : "Kerala Conservation of Paddy Land & Wetland Act, 2008 Check"}
                </h4>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Legal Ownership Category:</span>
                  <span className={isNonPurchasable ? "text-rose-400 font-bold" : "text-emerald-400 font-semibold"}>
                    {isNonPurchasable ? "Public Commons / Sovereign State Property" : property.inDataBank ? "Listed in Data Bank as Paddy" : "Private Freehold / Not in Data Bank"}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Building Permit Viability:</span>
                  <span className={property.buildingPermitEligible ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                    {property.buildingPermitEligible ? "Eligible for Residential Permit" : "STRICTLY PROHIBITED (Zero Permit)"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: FLOOD RISK ASSESSMENT ================= */}
        {activeTab === "flood" && (
          <div className="space-y-4 animate-in fade-in">
            <div className={`p-4 rounded-xl border ${
              isNonPurchasable || property.floodZone.status.includes("Severe") || property.floodZone.status.includes("High")
                ? "bg-sky-950/50 border-sky-600/80"
                : "bg-slate-950 border-slate-800"
            } space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-sky-400" />
                  Flood Inundation & Hydrology
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                  isNonPurchasable || property.floodZone.status.includes("High") || property.floodZone.status.includes("Severe")
                    ? "bg-rose-950 text-rose-300 border-rose-700"
                    : "bg-emerald-950 text-emerald-300 border-emerald-700"
                }`}>
                  {property.floodZone.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Elevation above MSL</div>
                  <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">
                    {property.floodZone.elevationMeters} meters
                  </div>
                  <div className="text-[10px] text-slate-400">Mean Sea Level</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Waterbody Context</div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5 truncate">
                    {property.floodZone.riverName}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {property.floodZone.distanceToMajorRiverKm} km distance
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Inundation History:</span>
                  <span className={property.floodZone.inundatedIn2018 ? "text-rose-400 font-bold" : "text-emerald-400 font-semibold"}>
                    {isNonPurchasable ? "PERMANENTLY WATER COVERED" : property.floodZone.inundatedIn2018 ? "SUBMERGED IN 2018" : "Safe / Not Inundated"}
                  </span>
                </div>
                {property.floodZone.notes && (
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    {property.floodZone.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: LANDSLIDE & TERRAIN / EROSION ================= */}
        {activeTab === "landslide" && (
          <div className="space-y-4 animate-in fade-in">
            <div className={`p-4 rounded-xl border ${
              isNonPurchasable
                ? "bg-rose-950/50 border-rose-700/80"
                : property.landslideZone.status.includes("Critical") || property.landslideZone.status.includes("High")
                ? "bg-rose-950/50 border-rose-700/80"
                : "bg-slate-950 border-slate-800"
            } space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Mountain className="w-4 h-4 text-rose-400" />
                  {isNonPurchasable ? "Coastal Sea Erosion & Surge" : "KSDMA Landslide Susceptibility"}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold border bg-rose-950 text-rose-300 border-rose-700">
                  {property.landslideZone.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Slope Gradient</div>
                  <div className="text-base font-bold text-amber-400 font-mono mt-0.5">
                    {property.landslideZone.slopeDegrees}°
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Hazard Tier</div>
                  <div className="font-semibold text-slate-200 mt-0.5">
                    {property.landslideZone.hazardLevel}
                  </div>
                </div>
              </div>

              {property.landslideZone.warningNotes && (
                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/60 text-xs text-rose-300 leading-relaxed">
                  <strong>Geological Advisory:</strong> {property.landslideZone.warningNotes}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 5: NEARBY FACILITIES & ACCESSIBILITY ================= */}
        {activeTab === "facilities" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-cyan-400" /> Road Access & Transportation
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {property.kmbrCategory}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Road Width</div>
                  <div className={`text-base font-bold font-mono mt-0.5 ${property.roadWidthMeters >= 3 ? "text-emerald-400" : "text-rose-400"}`}>
                    {property.roadWidthMeters} meters
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {property.roadWidthMeters >= 3 ? "Meets KMBR 3m min for permit" : "No vehicular road access"}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Access Mode</div>
                  <div className="font-semibold text-slate-200 mt-0.5 truncate">
                    {property.roadAccess}
                  </div>
                </div>
              </div>
            </div>

            {/* Nearest Facilities List */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Nearest Mainland Facilities
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
                          {property.nearestFacilities.transit[0].type}
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

                {property.nearestFacilities?.education?.[0] && (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">
                          {property.nearestFacilities.education[0].name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {property.nearestFacilities.education[0].type}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-cyan-400 font-mono">
                        {property.nearestFacilities.education[0].distanceKm} km
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: BUYER DUE DILIGENCE CHECKLIST ================= */}
        {activeTab === "checklist" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Legal Verification Protocol
                </h4>
                <button
                  onClick={handlePrint}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Dossier
                </button>
              </div>

              {isNonPurchasable ? (
                <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-800 text-xs text-rose-200 space-y-2">
                  <div className="font-bold text-white text-sm">Legal Advisory for Prospective Buyers:</div>
                  <p>
                    If any broker, promoter, or individual claims to sell beach land or waterbody plots in Kerala:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-[11px]">
                    <li>Demand to see the <strong>Village BTR (Basic Tax Register)</strong>. If it mentions <em>Theera Puramboke</em>, <em>Puzha Puramboke</em>, or <em>Kayal Puramboke</em>, it is 100% government property.</li>
                    <li>Verify with the <strong>Kerala Coastal Zone Management Authority (KCZMA)</strong>. No permanent title or private building permit can be granted in CRZ-I or CRZ-III No Development Zones.</li>
                    <li>Any sale deed registered over sovereign waters or government puramboke is null and void (void ab initio) under the Indian Contract Act and Kerala Land Reforms Act.</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-200">1. Prior Title Deed (ആധാരം) Verification</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed">
                        Verify original title deed unbroken chain for minimum 30 years to check rightful inheritance or bona-fide conveyance.
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-200">2. Encumbrance Certificate (കുടിക്കിടപ്പ് സർട്ടിഫിക്കറ്റ് - EC)</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed">
                        Apply online via PEARL portal for Form 15 (Encumbrance) for 30 years to confirm no bank mortgages or court attachments.
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-200">3. Thandapper & Latest Land Tax Receipt (ഭൂനികുതി രസീത്)</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed">
                        Verify through e-Revenue portal that land tax is paid under seller's name with Pokkuvaravu (mutation) complete.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Summary / Quick Stats */}
      <div className="p-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
        <div>
          <span className="text-slate-400">Govt Fair Value:</span>{" "}
          <span className={`font-bold font-mono ${isNonPurchasable ? "text-rose-400" : "text-emerald-400"}`}>
            {isNonPurchasable ? "₹ 0 (Non-Saleable)" : `${formatINR(property.fairValuePerCent)}/cent`}
          </span>
        </div>
        <div>
          <span className="text-slate-400">Est. Total Cost:</span>{" "}
          <span className={`font-bold font-mono ${isNonPurchasable ? "text-rose-400" : "text-cyan-400"}`}>
            {isNonPurchasable ? "Illegal to Buy" : formatINR(registrationOutlay.grandTotalCost)}
          </span>
        </div>
      </div>
    </aside>
  );
}
