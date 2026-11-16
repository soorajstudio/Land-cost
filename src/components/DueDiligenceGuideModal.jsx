import React from "react";
import {
  X,
  FileCheck,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  CheckCircle,
  BookOpen,
  Scale
} from "lucide-react";

export default function DueDiligenceGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-slate-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Kerala Land Buyer Due Diligence Guide
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                  ഭൂമി വാങ്ങുമ്പോൾ ശ്രദ്ധിക്കേണ്ടവ
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Essential legal verifications, portal links & government compliance in Kerala
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

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 text-xs sm:text-sm">
          {/* Section 1: The Essential Document Checklist */}
          <div>
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              1. Five Mandatory Legal Documents to Demand from Seller
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-semibold text-slate-200">
                  A. Original Title Deed (ആധാരം) & Prior Title Deeds (മുന്നാധാരം)
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Demand prior deeds for at least 30 uninterrupted years. Verify how the seller acquired title (Sale, Partition Deed / ഭാഗപത്രം, Gift Deed / ദാനപത്രം, or Will / വിൽപത്രം).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-semibold text-slate-200 flex items-center justify-between">
                  <span>B. Encumbrance Certificate (കുടിക്കിടപ്പ് സർട്ടിഫിക്കറ്റ് - EC)</span>
                  <a
                    href="https://keralaregistration.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    PEARL Portal <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Must be obtained for minimum 30 years up to the current date. Ensure Form 15 (showing transactions or Nil encumbrance) has zero bank mortgages, chit attachments or civil court stays.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-semibold text-slate-200 flex items-center justify-between">
                  <span>C. Land Tax Receipt & Thandapper Account (ഭൂനികുതി രസീത്)</span>
                  <a
                    href="https://revenue.kerala.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    e-Revenue Portal <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Tax receipt must be current financial year and strictly in the seller's name. Check that Pokkuvaravu (mutation) is complete under their Thandapper number.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-semibold text-slate-200">
                  D. Possession Certificate & Location Sketch (കൈവശാവകാശ സർട്ടിഫിക്കറ്റ്)
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Issued by the Village Officer through e-District Kerala portal, verifying that the seller is in physical, undisputed possession of the surveyed land.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-semibold text-slate-200">
                  E. Field Measurement Book (FMB / സർവേ സ്കെച്ച്)
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Ensure physical boundaries tally with the Taluk / Re-survey sketch. In Kerala, discrepancies between old survey numbers and re-survey numbers can delay building permits.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Kerala Paddy Land & Wetland Act 2008 Guide */}
          <div>
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              2. Kerala Paddy Land & Wetland Act (Data Bank & Form 6 Rules)
            </h3>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
              <p className="leading-relaxed">
                If the land is classified in the Village BTR (Basic Tax Register) as <strong>NILAM (നിലം)</strong> or <strong>NANJA/PUNJA</strong>, you cannot build a home without revenue clearances:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-[11px]">
                <li>
                  <strong className="text-slate-200">Local Data Bank Check:</strong> Check if the plot is included in the Local Level Monitoring Committee (LLMC) Data Bank.
                </li>
                <li>
                  <strong className="text-slate-200">Form 5 Application:</strong> If dry land was wrongly included in the Data Bank, apply to the RDO under Form 5 for removal.
                </li>
                <li>
                  <strong className="text-slate-200">Form 6 Conversion (Section 27A):</strong> For unnotified land converted before 2008, up to 25 cents is <em>FREE OF CHARGE</em>. For 25 to 50 cents, 10% of Govt Fair Value is payable.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Building Rules & Disaster Zone Setbacks */}
          <div>
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              3. Building Setbacks & Disaster Precautions (KMBR / KPBR)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-semibold text-slate-200">Road Width Rule:</div>
                <p className="text-[11px] text-slate-400">
                  Minimum road width required for residential building permit is <strong>3.0 meters</strong> (or 5.0m for commercial). Plots with only pedestrian footpath access cannot obtain a municipal permit!
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-semibold text-slate-200">Flood & River Setbacks:</div>
                <p className="text-[11px] text-slate-400">
                  Properties adjacent to major rivers (Periyar, Pamba, Chalakudy) require a minimum <strong>50-meter river buffer setback</strong>. Coastal areas fall under Coastal Regulation Zone (CRZ-II or CRZ-III).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-xs shadow-lg transition"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
}
