import React, { useState, useEffect } from "react";
import {
  X,
  Compass,
  ArrowRight,
  Ruler,
  Building
} from "lucide-react";
import { THRISSUR_TALUKS, ARE_TO_CENT } from "../data/thrissurData.js";
import { formatINR, calculateKeralaRegistrationCost, computeSpecifiedDimensions } from "../utils/geoCalculations.js";

export default function IGRSearchPanel({ isOpen, onClose, onSelectLocation }) {
  const [selectedTalukId, setSelectedTalukId] = useState(THRISSUR_TALUKS[0].id);
  const [selectedVillageId, setSelectedVillageId] = useState("");
  const [selectedDesom, setSelectedDesom] = useState("");
  const [surveyNo, setSurveyNo] = useState("144/3B");
  const [blockNo, setBlockNo] = useState("Block 8");
  const [areaCents, setAreaCents] = useState(8.5);
  const [roadType, setRoadType] = useState("pwd_road");

  const currentTaluk = THRISSUR_TALUKS.find((t) => t.id === selectedTalukId) || THRISSUR_TALUKS[0];

  useEffect(() => {
    if (currentTaluk && currentTaluk.villages.length > 0) {
      setSelectedVillageId(currentTaluk.villages[0].id);
      setSelectedDesom(currentTaluk.villages[0].desoms[0] || "");
    }
  }, [selectedTalukId]);

  const currentVillage = currentTaluk?.villages.find((v) => v.id === selectedVillageId) || currentTaluk?.villages[0];

  useEffect(() => {
    if (currentVillage && currentVillage.desoms.length > 0) {
      setSelectedDesom(currentVillage.desoms[0]);
    }
  }, [selectedVillageId]);

  if (!isOpen) return null;

  let roadMultiplier = 1.0;
  if (roadType === "pwd_road") roadMultiplier = 1.25;
  else if (roadType === "panchayat_road") roadMultiplier = 1.0;
  else if (roadType === "private_road") roadMultiplier = 0.85;

  const baseAreValue = currentVillage ? currentVillage.baseFairValuePerAre : 2400000;
  const calculatedFairValuePerAre = Math.round(baseAreValue * roadMultiplier);
  const calculatedFairValuePerCent = Math.round(calculatedFairValuePerAre / ARE_TO_CENT);

  const dims = computeSpecifiedDimensions(parseFloat(areaCents) || 8.0);
  const sampleCost = calculateKeralaRegistrationCost(calculatedFairValuePerCent, parseFloat(areaCents) || 8.0, currentVillage?.marketMultiplier || 2.4);

  const handleApply = () => {
    // Village exact center coordinate in Thrissur
    const centerLat = currentVillage?.center ? currentVillage.center[0] : 10.5276;
    const centerLng = currentVillage?.center ? currentVillage.center[1] : 76.2144;

    onSelectLocation({
      lat: centerLat,
      lng: centerLng,
      district: "Thrissur",
      taluk: currentTaluk.name,
      village: currentVillage?.name,
      desom: selectedDesom,
      surveyNo,
      blockNo,
      fairValuePerAre: calculatedFairValuePerAre,
      fairValuePerCent: calculatedFairValuePerCent
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-slate-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Thrissur District IGR Fair Value Search
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  തൃശ്ശൂർ ന്യായവില
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Official Registration Portal Workflow for Thrissur's 7 Taluks
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

        {/* Form Body */}
        <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          {/* Taluk Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Taluk / താലൂക്ക് <span className="text-emerald-400">*</span>
              </label>
              <select
                value={selectedTalukId}
                onChange={(e) => setSelectedTalukId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {THRISSUR_TALUKS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Village / വില്ലേജ് <span className="text-emerald-400">*</span>
              </label>
              <select
                value={selectedVillageId}
                onChange={(e) => setSelectedVillageId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {currentTaluk?.villages.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Survey No & Specified Area in Cents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Re-Survey No / റീ-സർവേ നമ്പർ
              </label>
              <input
                type="text"
                value={surveyNo}
                onChange={(e) => setSurveyNo(e.target.value)}
                placeholder="e.g. 144/3B"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Specified Land Area (Cents) <span className="text-emerald-400">*</span>
              </label>
              <input
                type="number"
                step="0.25"
                value={areaCents}
                onChange={(e) => setAreaCents(e.target.value)}
                placeholder="e.g. 8.5"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 font-mono font-bold text-emerald-300 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Road Access Tier */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Road Access Factor (Kerala Fair Value Revision Tier)
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <label
                className={`p-2 rounded-xl border flex flex-col cursor-pointer transition ${
                  roadType === "pwd_road"
                    ? "bg-emerald-950/70 border-emerald-500 text-emerald-200"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                <div className="font-semibold">PWD Road (+25%)</div>
                <div className="text-[10px]">&gt; 8m Road width</div>
                <input
                  type="radio"
                  name="road"
                  checked={roadType === "pwd_road"}
                  onChange={() => setRoadType("pwd_road")}
                  className="hidden"
                />
              </label>

              <label
                className={`p-2 rounded-xl border flex flex-col cursor-pointer transition ${
                  roadType === "panchayat_road"
                    ? "bg-emerald-950/70 border-emerald-500 text-emerald-200"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                <div className="font-semibold">Panchayat Road</div>
                <div className="text-[10px]">3.5m - 6m Road width</div>
                <input
                  type="radio"
                  name="road"
                  checked={roadType === "panchayat_road"}
                  onChange={() => setRoadType("panchayat_road")}
                  className="hidden"
                />
              </label>

              <label
                className={`p-2 rounded-xl border flex flex-col cursor-pointer transition ${
                  roadType === "private_road"
                    ? "bg-emerald-950/70 border-emerald-500 text-emerald-200"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                <div className="font-semibold">Interior (-15%)</div>
                <div className="text-[10px]">&lt; 3.5m pathway</div>
                <input
                  type="radio"
                  name="road"
                  checked={roadType === "private_road"}
                  onChange={() => setRoadType("private_road")}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Specified Area & Dimension Summary Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-300">
              <span>Specified Area: {areaCents} Cents</span>
              <span className="text-emerald-400 font-mono">
                {dims.frontageFt} ft (Front) × {dims.depthFt} ft (Depth)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-slate-400">Govt Fair Value:</span>{" "}
                <strong className="text-emerald-400 font-mono">{formatINR(calculatedFairValuePerCent)}/cent</strong>
              </div>
              <div>
                <span className="text-slate-400">Est. Total Outlay:</span>{" "}
                <strong className="text-cyan-400 font-mono">{formatINR(sampleCost.grandTotalCost)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition"
          >
            <span>View Specified Parcel on Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
