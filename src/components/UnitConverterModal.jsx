import React, { useState } from "react";
import { X, Calculator, ArrowRightLeft, Sparkles, Check } from "lucide-react";
import { ARE_TO_CENT, CENT_TO_ARE, CENT_TO_SQFT, CENT_TO_SQM } from "../data/thrissurData.js";

export default function UnitConverterModal({ isOpen, onClose }) {
  const [cents, setCents] = useState(10);

  if (!isOpen) return null;

  const ares = (cents * CENT_TO_ARE).toFixed(4);
  const sqft = (cents * CENT_TO_SQFT).toLocaleString("en-IN", { maximumFractionDigits: 1 });
  const sqm = (cents * CENT_TO_SQM).toFixed(2);
  const acres = (cents / 100).toFixed(4);
  const hectares = (cents / 247.105).toFixed(4);

  const handleCentsChange = (val) => {
    const num = parseFloat(val);
    setCents(isNaN(num) ? 0 : Math.max(0, num));
  };

  const handleAresChange = (val) => {
    const num = parseFloat(val);
    if (!isNaN(num)) setCents(num * ARE_TO_CENT);
  };

  const handleSqFtChange = (val) => {
    const num = parseFloat(val);
    if (!isNaN(num)) setCents(num / CENT_TO_SQFT);
  };

  const handleAcresChange = (val) => {
    const num = parseFloat(val);
    if (!isNaN(num)) setCents(num * 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl w-full max-w-lg shadow-2xl p-5 sm:p-6 text-slate-100 flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">
                  Kerala Land Area Converter
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                  സെന്റ് / ഏർ / ചതുരശ്രയടി
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Official Revenue & Registration Units in Kerala
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

        {/* Quick Cents Preset Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Quick Select Standard Kerala Plot Sizes:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {[3.0, 4.0, 5.0, 6.25, 8.0, 10.0, 15.0, 20.0].map((preset) => (
              <button
                key={preset}
                onClick={() => setCents(preset)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition ${
                  cents === preset
                    ? "bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-900/30"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                }`}
              >
                {preset}c
              </button>
            ))}
          </div>
        </div>

        {/* Primary Interactive Inputs */}
        <div className="space-y-3">
          {/* Cents Input */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/50 shadow-inner">
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-bold text-cyan-300 text-xs sm:text-sm">
                Cents (സെന്റ്)
              </label>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800 font-medium">
                Primary Kerala Market Unit
              </span>
            </div>
            <input
              type="number"
              step="0.01"
              value={cents || ""}
              onChange={(e) => handleCentsChange(e.target.value)}
              className="w-full bg-slate-900 border border-cyan-500/60 rounded-xl px-3 py-2 text-lg sm:text-xl font-bold font-mono text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              placeholder="Enter cents..."
            />
          </div>

          {/* Ares Input */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 shadow-inner">
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-bold text-emerald-300 text-xs sm:text-sm">
                Ares (ഏർ)
              </label>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-medium">
                Official IGR Fair Value Unit (1 Are = 2.47c)
              </span>
            </div>
            <input
              type="number"
              step="0.001"
              value={ares || ""}
              onChange={(e) => handleAresChange(e.target.value)}
              className="w-full bg-slate-900 border border-emerald-500/60 rounded-xl px-3 py-2 text-lg sm:text-xl font-bold font-mono text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              placeholder="Enter ares..."
            />
          </div>
        </div>

        {/* Secondary Converted Metric Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Square Feet (സ്ക്വയർ ഫീറ്റ്)</div>
            <div className="text-base font-bold text-amber-300 font-mono mt-1">
              {sqft} sq ft
            </div>
            <div className="text-[9px] text-slate-500 mt-0.5">1 Cent = 435.6 sq ft</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Square Metres (ചതുരശ്ര മീറ്റർ)</div>
            <div className="text-base font-bold text-purple-300 font-mono mt-1">
              {sqm} sq m
            </div>
            <div className="text-[9px] text-slate-500 mt-0.5">1 Are = 100 sq metres</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Acres (ഏക്കർ)</div>
            <div className="text-base font-bold text-teal-300 font-mono mt-1">
              {acres} Acres
            </div>
            <div className="text-[9px] text-slate-500 mt-0.5">1 Acre = 100 Cents</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Hectares (ഹെക്ടർ)</div>
            <div className="text-base font-bold text-rose-300 font-mono mt-1">
              {hectares} Ha
            </div>
            <div className="text-[9px] text-slate-500 mt-0.5">1 Hectare = 247.1 Cents</div>
          </div>
        </div>

        {/* Kerala Revenue Formulas Card */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="font-bold text-slate-300 flex items-center gap-1.5 mb-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kerala Land Measurement Reference</span>
          </div>
          <div>&bull; <strong>1 Cent</strong> = 435.6 Sq Ft = 40.4686 Sq Metres = 0.4047 Ares</div>
          <div>&bull; <strong>1 Are</strong> = 2.471 Cents = 100 Sq Metres = 1,076.39 Sq Ft</div>
          <div>&bull; <strong>1 Acre</strong> = 100 Cents = 40.468 Ares = 43,560 Sq Ft</div>
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
        >
          Close Converter
        </button>
      </div>
    </div>
  );
}
