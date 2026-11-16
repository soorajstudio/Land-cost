import React from "react";
import {
  X,
  FileCheck,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  CheckCircle,
  BookOpen,
  Scale,
  ShieldCheck,
  FileText
} from "lucide-react";

export default function DueDiligenceGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900/98 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col text-slate-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/90 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-100">
                  Kerala Land Buyer Due Diligence Guide
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-semibold">
                  ഭൂമി വാങ്ങുമ്പോൾ ശ്രദ്ധിക്കേണ്ടവ
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Essential legal verifications, portal links & government compliance in Kerala
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs sm:text-sm">
          {/* Section 1: The Essential Document Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <h3 className="text-xs sm:text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                1. Five Mandatory Legal Documents to Demand from Seller
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">Checklist</span>
            </div>

            <div className="space-y-3">
              {/* Document 1 */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="font-bold text-slate-200">
                      Original Title Deed (ആധാരം) & Prior Title Deeds (മുന്നാധാരം)
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Demand prior deeds for at least 30 uninterrupted years. Verify how the seller acquired title (Sale, Partition Deed / ഭാഗപത്രം, Gift Deed / ദാനപത്രം, or Will / വിൽപത്രം). Ensure there are no unresolved minor shares.
                    </p>
                  </div>
                </div>
              </div>

              {/* Document 2 */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-slate-200">
                        Encumbrance Certificate (കുടിക്കിടപ്പ് സർട്ടിഫിക്കറ്റ് - EC)
                      </span>
                      <a
                        href="https://keralaregistration.gov.in"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 transition flex items-center gap-1"
                      >
                        PEARL Portal <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Must be obtained for minimum 30 years up to the current date. Ensure Form 15 (showing transactions or Nil encumbrance) has zero bank mortgages, chit attachments or civil court stays.
                    </p>
                  </div>
                </div>
              </div>

              {/* Document 3 */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-950 border border-amber-700 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-slate-200">
                        Land Tax Receipt & Thandapper Account (ഭൂനികുതി രസീത്)
                      </span>
                      <a
                        href="https://revenue.kerala.gov.in"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 transition flex items-center gap-1"
                      >
                        e-Revenue Portal <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Tax receipt must be for the current financial year and strictly in the seller's name. Check that Pokkuvaravu (mutation) is complete under their Thandapper account number.
                    </p>
                  </div>
                </div>
              </div>

              {/* Document 4 */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-slate-200">
                        Possession Certificate & Location Sketch (കൈവശാവകാശ സർട്ടിഫിക്കറ്റ്)
                      </span>
                      <a
                        href="https://edistrict.kerala.gov.in"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 hover:bg-purple-900 transition flex items-center gap-1"
                      >
                        e-District Portal <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Issued by the Village Officer through e-District Kerala portal, verifying that the seller is in physical, undisputed possession of the surveyed land parcel.
                    </p>
                  </div>
                </div>
              </div>

              {/* Document 5 */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-950 border border-rose-700 text-rose-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="font-bold text-slate-200">
                      Field Measurement Book (FMB / സർവേ സ്കെച്ച്)
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Ensure physical boundaries tally with the Taluk / Re-survey sketch. In Kerala, discrepancies between old survey numbers and re-survey numbers can delay building permits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Kerala Conservation of Paddy Land & Wetland Act */}
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Kerala Wetland & Paddy Land Act 28 of 2008 (ഡാറ്റാ ബാങ്ക് പരിശോധന)
            </h4>
            <p className="text-[11px] text-amber-200/90 leading-relaxed">
              Before paying any advance, verify whether the land is classified as <strong>Purayidam (പുരയിടം - Dryland)</strong> or <strong>Nilam (നിലം - Wetland)</strong> in the village BTR (Basic Tax Register). If listed in the Wetland Data Bank, construction is prohibited without formal Form 5 & Form 6 conversion approval from the Revenue Divisional Officer (RDO).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Official Kerala Revenue Due Diligence Guide
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
