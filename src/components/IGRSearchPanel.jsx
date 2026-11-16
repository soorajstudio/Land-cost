import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  CheckCircle,
  Building,
  MapPin,
  FileSpreadsheet,
  AlertCircle,
  Compass,
  ArrowRight
} from "lucide-react";
import { KERALA_DISTRICTS, ARE_TO_CENT } from "../data/keralaGeoData";
import { formatINR, calculateKeralaRegistrationCost } from "../utils/geoCalculations";

export default function IGRSearchPanel({ isOpen, onClose, onSelectLocation }) {
  const [selectedDistrictId, setSelectedDistrictId] = useState("ekm");
  const [selectedTalukId, setSelectedTalukId] = useState("");
  const [selectedVillageId, setSelectedVillageId] = useState("");
  const [selectedDesom, setSelectedDesom] = useState("");
  const [surveyNo, setSurveyNo] = useState("142/4B");
  const [blockNo, setBlockNo] = useState("10");
  const [roadType, setRoadType] = useState("pwd_road"); // 'pwd_road' | 'panchayat_road' | 'private_road' | 'no_road'

  const currentDistrict = KERALA_DISTRICTS.find((d) => d.id === selectedDistrictId);

  // Update taluk when district changes
  useEffect(() => {
    if (currentDistrict && currentDistrict.taluks.length > 0) {
      setSelectedTalukId(currentDistrict.taluks[0].id);
    }
  }, [selectedDistrictId]);

  const currentTaluk = currentDistrict?.taluks.find((t) => t.id === selectedTalukId);

  // Update village when taluk changes
  useEffect(() => {
    if (currentTaluk && currentTaluk.villages.length > 0) {
      setSelectedVillageId(currentTaluk.villages[0].id);
      setSelectedDesom(currentTaluk.villages[0].desoms[0] || "");
    }
  }, [selectedTalukId]);

  const currentVillage = currentTaluk?.villages.find((v) => v.id === selectedVillageId);

  useEffect(() => {
    if (currentVillage && currentVillage.desoms.length > 0) {
      setSelectedDesom(currentVillage.desoms[0]);
    }
  }, [selectedVillageId]);

  if (!isOpen) return null;

  // Road access multiplier according to Kerala Registration Department Fair Value rules
  let roadMultiplier = 1.0;
  if (roadType === "pwd_road") roadMultiplier = 1.25;
  else if (roadType === "panchayat_road") roadMultiplier = 1.0;
  else if (roadType === "private_road") roadMultiplier = 0.85;
  else if (roadType === "no_road") roadMultiplier = 0.65;

  const baseAreValue = currentVillage ? currentVillage.baseFairValuePerAre : 1200000;
  const calculatedFairValuePerAre = Math.round(baseAreValue * roadMultiplier);
  const calculatedFairValuePerCent = Math.round(calculatedFairValuePerAre / ARE_TO_CENT);

  const sampleCost = calculateKeralaRegistrationCost(calculatedFairValuePerCent, 10, currentVillage?.marketMultiplier || 2.2);

  const handleApply = () => {
    // Determine latitude/longitude to fly to
    const lat = currentDistrict.lat;
    const lng = currentDistrict.lng;
    onSelectLocation({
      lat,
      lng,
      district: currentDistrict.name,
      taluk: currentTaluk?.name,
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
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-slate-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Kerala IGR Fair Value Search
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                  ഭൂമി ന്യായവില
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Official Registration Department Portal Workflow (igr.kerala.gov.in)
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
          {/* Step 1: District & Taluk */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                District / ജില്ല <span className="text-cyan-400">*</span>
              </label>
              <select
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                {KERALA_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.malayalam})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Taluk / താലൂക്ക് <span className="text-cyan-400">*</span>
              </label>
              <select
                value={selectedTalukId}
                onChange={(e) => setSelectedTalukId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                {currentDistrict?.taluks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 2: Village & Desom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Village / വില്ലേജ് <span className="text-cyan-400">*</span>
              </label>
              <select
                value={selectedVillageId}
                onChange={(e) => setSelectedVillageId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                {currentTaluk?.villages.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Desom / പ്രദേശം <span className="text-cyan-400">*</span>
              </label>
              <select
                value={selectedDesom}
                onChange={(e) => setSelectedDesom(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                {currentVillage?.desoms.map((desom, idx) => (
                  <option key={idx} value={desom}>
                    {desom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 3: Survey & Block Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Re-Survey No / റീ-സർവേ നമ്പർ
              </label>
              <input
                type="text"
                value={surveyNo}
                onChange={(e) => setSurveyNo(e.target.value)}
                placeholder="e.g. 142/4B or 88/1"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Block Number / ബ്ലോക്ക് നമ്പർ
              </label>
              <input
                type="text"
                value={blockNo}
                onChange={(e) => setBlockNo(e.target.value)}
                placeholder="e.g. Block 10"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Step 4: Road Access / Land Tier Classification */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Road Access & Land Classification Tier (Kerala Fair Value Revision Factor)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                  roadType === "pwd_road"
                    ? "bg-cyan-950/60 border-cyan-500 text-cyan-200"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="road"
                  checked={roadType === "pwd_road"}
                  onChange={() => setRoadType("pwd_road")}
                  className="accent-cyan-500"
                />
                <div>
                  <div className="font-semibold">PWD / Highway Road Frontage (+25%)</div>
                  <div className="text-[11px] text-slate-400">Direct road width &gt; 8 meters</div>
                </div>
              </label>

              <label
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                  roadType === "panchayat_road"
                    ? "bg-cyan-950/60 border-cyan-500 text-cyan-200"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="road"
                  checked={roadType === "panchayat_road"}
                  onChange={() => setRoadType("panchayat_road")}
                  className="accent-cyan-500"
                />
                <div>
                  <div className="font-semibold">Panchayat Tarred Road (Standard)</div>
                  <div className="text-[11px] text-slate-400">Road width 3.5m - 6m</div>
                </div>
              </label>

              <label
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                  roadType === "private_road"
                    ? "bg-cyan-950/60 border-cyan-500 text-cyan-200"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="road"
                  checked={roadType === "private_road"}
                  onChange={() => setRoadType("private_road")}
                  className="accent-cyan-500"
                />
                <div>
                  <div className="font-semibold">Private Road / Mud Road (-15%)</div>
                  <div className="text-[11px] text-slate-400">Interior residential pathway</div>
                </div>
              </label>

              <label
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                  roadType === "no_road"
                    ? "bg-cyan-950/60 border-cyan-500 text-cyan-200"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="road"
                  checked={roadType === "no_road"}
                  onChange={() => setRoadType("no_road")}
                  className="accent-cyan-500"
                />
                <div>
                  <div className="font-semibold">No Direct Vehicular Access (-35%)</div>
                  <div className="text-[11px] text-slate-400">Footpath / Walkway only</div>
                </div>
              </label>
            </div>
          </div>

          {/* Results Preview Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Calculated Fair Value (ന്യായവില)
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Kerala Govt Gazette Ready
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <div className="text-[11px] text-slate-400">Fair Value / Are</div>
                <div className="text-base sm:text-lg font-bold text-cyan-400 font-mono">
                  {formatINR(calculatedFairValuePerAre)}
                </div>
                <div className="text-[10px] text-slate-400">1 Are = 100 sq m</div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400">Fair Value / Cent</div>
                <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                  {formatINR(calculatedFairValuePerCent)}
                </div>
                <div className="text-[10px] text-slate-400">1 Cent = 435.6 sq ft</div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div className="text-[11px] text-slate-400">Est. Market Rate / Cent</div>
                <div className="text-base sm:text-lg font-bold text-amber-300 font-mono">
                  {formatINR(calculatedFairValuePerCent * (currentVillage?.marketMultiplier || 2.2))}
                </div>
                <div className="text-[10px] text-slate-400">Based on recent sales</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Sample 10 Cents Acquisition:</span>{" "}
                <span className="font-semibold text-slate-200">
                  {formatINR(sampleCost.grandTotalCost)}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Stamp Duty (8%): {formatINR(sampleCost.stampDuty)} | Reg (2%): {formatINR(sampleCost.registrationFee)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-900/30 transition"
          >
            <span>View on Interactive Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
