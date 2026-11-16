import React, { useState } from "react";
import { X, Calculator, ArrowRightLeft, Check, Sparkles } from "lucide-react";
import { ARE_TO_CENT, CENT_TO_ARE, CENT_TO_SQFT, CENT_TO_SQM } from "../data/keralaGeoData";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg shadow-2xl p-5 text-slate-100 flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Kerala Land Area Converter
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  സെന്റ് / ഏർ / ചതുരശ്രയടി
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Official Revenue & Registration Units in Kerala
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Converter Fields */}
        <div className="space-y-3 text-xs sm:text-sm">
          {/* Cents Input */}
          <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/50">
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-cyan-300">Cents (സെന്റ്)</label>
              <span className="text-[10px] text-slate-400">Primary Kerala Real Estate Unit</span>
            </div>
            <input
              type="number"
              step="0.01"
              value={cents || ""}
              onChange={(e) => handleCentsChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-base font-bold font-mono text-cyan-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Ares Input */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-slate-300">Ares (ഏർ)</label>
              <span className="text-[10px] text-slate-400">Govt Fair Value Portal Unit</span>
            </div>
            <input
              type="number"
              step="0.001"
              value={ares || ""}
              onChange={(e) => handleAresChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-base font-bold font-mono text-emerald-400 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Square Feet & Square Metres Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <label className="block font-semibold text-slate-300 mb-1">
                Square Feet (Sq. Ft)
              </label>
              <div className="text-sm font-bold font-mono text-amber-300 py-1">
                {sqft} sq ft
              </div>
              <div className="text-[10px] text-slate-400">1 Cent = 435.6 sq ft</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <label className="block font-semibold text-slate-300 mb-1">
                Square Metres (Sq. M)
              </label>
              <div className="text-sm font-bold font-mono text-purple-300 py-1">
                {sqm} sq m
              </div>
              <div className="text-[10px] text-slate-400">1 Are = 100 sq m</div>
            </div>
          </div>

          {/* Acres & Hectares Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <label className="block font-semibold text-slate-300 mb-1">
                Acres (ഏക്കർ)
              </label>
              <div className="text-sm font-bold font-mono text-slate-200 py-1">
                {acres} Acres
              </div>
              <div className="text-[10px] text-slate-400">1 Acre = 100 Cents</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <label className="block font-semibold text-slate-300 mb-1">
                Hectares (ഹെക്ടർ)
              </label>
              <div className="text-sm font-bold font-mono text-slate-200 py-1">
                {hectares} Ha
              </div>
              <div className="text-[10px] text-slate-400">1 Hectare = 2.471 Acres</div>
            </div>
          </div>
        </div>

        {/* Conversion Rules Reference Pill */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Kerala Revenue Conversion Formulas:
          </div>
          <div>&bull; <strong>1 Cent</strong> = 435.6 Sq Ft = 40.4686 Sq Metres = 0.4047 Ares</div>
          <div>&bull; <strong>1 Are</strong> = 2.471 Cents = 100 Sq Metres = 1076.39 Sq Ft</div>
          <div>&bull; <strong>1 Acre</strong> = 100 Cents = 40.468 Ares = 43,560 Sq Ft</div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
        >
          Close Converter
        </button>
      </div>
    </div>
  );
}
