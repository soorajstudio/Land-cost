import React, { useState } from "react";
import {
  Compass,
  MapPin,
  FileText,
  Scale,
  ExternalLink,
  Calculator,
  Search
} from "lucide-react";
import PlaceSearchBar from "./PlaceSearchBar";

export default function Navbar({
  onSearchLocation,
  onLocateMe,
  onOpenIGRSearch,
  onOpenConverter,
  onOpenComparison,
  onOpenGuide
}) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 select-none shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold text-lg sm:text-xl">
            🌴
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                BhoomiKerala
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 font-medium hidden sm:inline-block">
                ഭൂമികേരളം
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate hidden sm:block">
              Kerala Land Value & Geo-Risk Intelligence
            </p>
          </div>
        </div>

        {/* Desktop / Tablet Live Search Bar */}
        <div className="flex-1 max-w-lg hidden sm:block">
          <PlaceSearchBar onSelectPlace={onSearchLocation} />
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile search toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 sm:hidden flex items-center justify-center transition"
            title="Search Places"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* IGR Portal Search Trigger */}
          <button
            onClick={onOpenIGRSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium text-xs shadow-md shadow-cyan-900/40 hover:from-cyan-500 hover:to-blue-500 transition shrink-0"
            title="Search by District, Taluk, Village and Survey No (Like Kerala IGR Portal)"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden md:inline">IGR Portal Search</span>
            <span className="md:hidden">IGR</span>
          </button>

          {/* Unit Converter */}
          <button
            onClick={onOpenConverter}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 text-xs flex items-center gap-1.5 transition"
            title="Kerala Land Unit Converter (Cent, Are, Sq Ft, Acre)"
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span className="hidden lg:inline">Cent/Are Calc</span>
          </button>

          {/* Comparison Tool */}
          <button
            onClick={onOpenComparison}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 text-xs flex items-center gap-1.5 transition"
            title="Compare 2 Land Parcels Side-by-Side"
          >
            <Scale className="w-4 h-4 text-amber-400" />
            <span className="hidden xl:inline">Compare</span>
          </button>

          {/* Due Diligence Checklist */}
          <button
            onClick={onOpenGuide}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 text-xs flex items-center gap-1.5 transition"
            title="Kerala Land Buyer Due Diligence Guide"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span className="hidden xl:inline">Checklist</span>
          </button>

          {/* Official IGR Link */}
          <a
            href="https://igr.kerala.gov.in/index.php/fairvalue/view_fairvalue"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-cyan-300 border border-slate-700 text-xs hidden 2xl:flex items-center gap-1 transition"
            title="Open official Kerala Registration Department portal"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Govt Portal</span>
          </a>

          {/* Locate GPS */}
          <button
            onClick={onLocateMe}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 border border-slate-700 text-xs flex items-center justify-center transition"
            title="Locate my position in Kerala"
          >
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile search bar expandable drawer */}
      {mobileSearchOpen && (
        <div className="p-3 bg-slate-950 border-t border-slate-800 sm:hidden">
          <PlaceSearchBar
            onSelectPlace={(lat, lng, zoom) => {
              onSearchLocation(lat, lng, zoom);
              setMobileSearchOpen(false);
            }}
          />
        </div>
      )}
    </header>
  );
}
