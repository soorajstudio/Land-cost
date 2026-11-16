import React, { useState } from "react";
import {
  Compass,
  Search,
  MapPin,
  FileText,
  Layers,
  Scale,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  Calculator,
  ChevronDown
} from "lucide-react";
import { SAMPLE_LAND_PARCELS, KERALA_DISTRICTS } from "../data/keralaGeoData";

export default function Navbar({
  onSelectParcel,
  onSearchLocation,
  onLocateMe,
  onOpenIGRSearch,
  onOpenConverter,
  onOpenComparison,
  onOpenGuide,
  activeLayer,
  onChangeLayer,
  isDrawerOpen,
  onToggleDrawer
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuickPicks, setShowQuickPicks] = useState(false);

  const quickPicks = [
    { label: "Kakkanad Infopark (Ernakulam)", lat: 10.0125, lng: 76.3620, id: "PCL-EKM-001" },
    { label: "Aluva Riverfront (Periyar Flood Zone)", lat: 10.1110, lng: 76.3530, id: "PCL-EKM-002" },
    { label: "Kowdiar Palace Area (Trivandrum)", lat: 8.5280, lng: 76.9610, id: "PCL-TVM-001" },
    { label: "Meppadi Chooralmala (Wayanad Red Zone)", lat: 11.5540, lng: 76.1280, id: "PCL-WYD-001" },
    { label: "Kuttanad Delta (Below Sea Level Paddy)", lat: 9.4320, lng: 76.4020, id: "PCL-ALP-001" },
    { label: "Cyberpark NH Bypass (Kozhikode)", lat: 11.2650, lng: 75.8230, id: "PCL-CLT-001" }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Check if matches a district
    const query = searchQuery.toLowerCase().trim();
    const matchedDistrict = KERALA_DISTRICTS.find(
      (d) => d.name.toLowerCase().includes(query) || d.malayalam.includes(query)
    );

    if (matchedDistrict) {
      onSearchLocation(matchedDistrict.lat, matchedDistrict.lng, matchedDistrict.zoom);
      setSearchQuery("");
      setShowQuickPicks(false);
      return;
    }

    // Check if matches a sample parcel
    const matchedParcel = SAMPLE_LAND_PARCELS.find(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.village.toLowerCase().includes(query) ||
        p.surveyNo.toLowerCase().includes(query)
    );

    if (matchedParcel) {
      onSelectParcel(matchedParcel);
      setSearchQuery("");
      setShowQuickPicks(false);
      return;
    }

    // Fallback: search common Kerala landmarks
    const popularPlaces = {
      kochi: [9.9312, 76.2673],
      ernakulam: [9.9816, 76.2999],
      trivandrum: [8.5241, 76.9366],
      thiruvananthapuram: [8.5241, 76.9366],
      calicut: [11.2588, 75.7804],
      kozhikode: [11.2588, 75.7804],
      thrissur: [10.5276, 76.2144],
      alappuzha: [9.4981, 76.3388],
      alleppey: [9.4981, 76.3388],
      munnar: [10.0889, 77.0595],
      wayanad: [11.6050, 76.0828],
      palakkad: [10.7867, 76.6548],
      kollam: [8.8932, 76.6141],
      kottayam: [9.5916, 76.5222],
      kannur: [11.8745, 75.3704],
      kasaragod: [12.5102, 74.9852],
      malappuram: [11.0732, 76.0740],
      kakkanad: [10.0125, 76.3620],
      aluva: [10.1110, 76.3530],
      edappally: [10.0261, 76.3082],
      varkala: [8.7379, 76.7163]
    };

    for (const [key, coords] of Object.entries(popularPlaces)) {
      if (query.includes(key)) {
        onSearchLocation(coords[0], coords[1], 13);
        setSearchQuery("");
        setShowQuickPicks(false);
        return;
      }
    }

    alert(`Location "${searchQuery}" not directly matched. Try searching by District name (e.g., Ernakulam, Wayanad) or pick from the sample locations dropdown.`);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 select-none shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold text-xl">
            🌴
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                BhoomiKerala
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 font-medium hidden sm:inline-block">
                ഭൂമികേരളം
              </span>
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 hidden md:inline-block">
                IGR & KSDMA Ref
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate hidden sm:block">
              Kerala Land Value, Flood & Landslide Risk Intelligence
            </p>
          </div>
        </div>

        {/* Search Bar & Quick Picks */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowQuickPicks(true)}
              placeholder="Search Kerala city, district, village or parcel..."
              className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl pl-9 pr-24 py-1.5 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <button
              type="button"
              onClick={() => setShowQuickPicks(!showQuickPicks)}
              className="absolute right-2 top-1.5 text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 flex items-center gap-1"
            >
              <span>Samples</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </form>

          {/* Quick Picks Dropdown */}
          {showQuickPicks && (
            <div className="absolute top-12 left-0 right-0 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center px-2 py-1 mb-1 border-b border-slate-800 text-[11px] font-semibold text-slate-400">
                <span>Featured Kerala Parcels & High-Risk Zones</span>
                <button
                  onClick={() => setShowQuickPicks(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1">
                {quickPicks.map((pick, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (pick.id) {
                        const p = SAMPLE_LAND_PARCELS.find((item) => item.id === pick.id);
                        if (p) onSelectParcel(p);
                      } else {
                        onSearchLocation(pick.lat, pick.lng, 14);
                      }
                      setShowQuickPicks(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800/90 text-xs flex items-center justify-between text-slate-200 hover:text-cyan-300 transition"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {pick.label}
                    </span>
                    <span className="text-[10px] text-slate-400">Inspect</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* IGR Portal Search Trigger */}
          <button
            onClick={onOpenIGRSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium text-xs shadow-md shadow-cyan-900/40 hover:from-cyan-500 hover:to-blue-500 transition"
            title="Search by District, Taluk, Village and Survey No (Like Kerala IGR Portal)"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">IGR Fair Value Search</span>
            <span className="sm:hidden">IGR</span>
          </button>

          {/* Unit Converter */}
          <button
            onClick={onOpenConverter}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 text-xs flex items-center gap-1.5 transition"
            title="Kerala Land Unit Converter (Cent, Are, Sq Ft, Acre)"
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Cent/Are Calc</span>
          </button>

          {/* Comparison Tool */}
          <button
            onClick={onOpenComparison}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 text-xs flex items-center gap-1.5 transition"
            title="Compare 2 Land Parcels Side-by-Side"
          >
            <Scale className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">Compare</span>
          </button>

          {/* Due Diligence Checklist */}
          <button
            onClick={onOpenGuide}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 text-xs flex items-center gap-1.5 transition"
            title="Kerala Land Buyer Due Diligence Guide"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span className="hidden lg:inline">Buyer Checklist</span>
          </button>

          {/* Official IGR Link */}
          <a
            href="https://igr.kerala.gov.in/index.php/fairvalue/view_fairvalue"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-cyan-300 border border-slate-700 text-xs hidden xl:flex items-center gap-1 transition"
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
    </header>
  );
}
