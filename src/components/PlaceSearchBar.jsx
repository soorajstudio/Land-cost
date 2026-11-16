import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  X,
  Loader2,
  Sparkles,
  Waves,
  Mountain,
  Building,
  Navigation,
  ChevronRight
} from "lucide-react";
import { KERALA_SEARCHABLE_PLACES, SAMPLE_LAND_PARCELS, KERALA_DISTRICTS } from "../data/keralaGeoData.js";

export default function PlaceSearchBar({ onSelectPlace }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all"); // 'all' | 'it' | 'coastal' | 'hill' | 'flood'
  const wrapperRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter local database and perform debounced live geocoding
  useEffect(() => {
    if (!query.trim()) {
      // If query is empty, show curated category picks
      if (activeCategory === "all") {
        setResults(KERALA_SEARCHABLE_PLACES.slice(0, 8));
      } else if (activeCategory === "it") {
        setResults(KERALA_SEARCHABLE_PLACES.filter((p) => p.category === "IT Corridor"));
      } else if (activeCategory === "coastal") {
        setResults(KERALA_SEARCHABLE_PLACES.filter((p) => p.category === "Coastal"));
      } else if (activeCategory === "hill") {
        setResults(KERALA_SEARCHABLE_PLACES.filter((p) => p.category === "Hill Station"));
      } else if (activeCategory === "flood") {
        setResults(KERALA_SEARCHABLE_PLACES.filter((p) => p.category === "Riverfront" || p.category === "Wetland"));
      }
      return;
    }

    const q = query.toLowerCase().trim();

    // 1. Instant match in local curated database
    const localMatches = KERALA_SEARCHABLE_PLACES.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.malayalam.includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
    );

    // Also match sample parcels
    const parcelMatches = SAMPLE_LAND_PARCELS.filter(
      (parcel) =>
        parcel.name.toLowerCase().includes(q) ||
        parcel.village.toLowerCase().includes(q) ||
        parcel.surveyNo.toLowerCase().includes(q)
    ).map((parcel) => ({
      name: `${parcel.name} (${parcel.surveyNo})`,
      malayalam: parcel.village,
      district: parcel.district,
      category: "Sample Cadastral Parcel",
      tag: "Surveyed Plot",
      lat: parcel.center[0],
      lng: parcel.center[1],
      zoom: 16
    }));

    // Also match districts
    const districtMatches = KERALA_DISTRICTS.filter(
      (d) => d.name.toLowerCase().includes(q) || d.malayalam.includes(q)
    ).map((d) => ({
      name: `${d.name} District HQ (${d.headquarters})`,
      malayalam: d.malayalam,
      district: d.name,
      category: "District",
      tag: "District Capital",
      lat: d.lat,
      lng: d.lng,
      zoom: 12
    }));

    const combinedLocal = [...localMatches, ...parcelMatches, ...districtMatches];
    setResults(combinedLocal);

    // 2. If query > 2 chars, also fetch live Nominatim OSM geocoding for Kerala
    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query + ", Kerala, India"
          )}&format=json&addressdetails=1&limit=5&countrycodes=in&viewbox=74.5,13.0,77.8,8.0`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const geocoded = data.map((item) => ({
              name: item.display_name.split(",")[0] + ", " + (item.address?.county || item.address?.state_district || "Kerala"),
              malayalam: item.name || "",
              district: item.address?.county || item.address?.state_district || "Kerala",
              category: "Live Address Match",
              tag: item.type || "Location",
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
              zoom: 15
            }));

            // Merge avoiding close duplicates
            setResults((prev) => {
              const existingNames = new Set(prev.map((p) => p.name.toLowerCase()));
              const filteredGeo = geocoded.filter((g) => !existingNames.has(g.name.toLowerCase()));
              return [...prev, ...filteredGeo];
            });
          }
        }
      } catch (err) {
        // Silently fallback to local results on network error
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [query, activeCategory]);

  const handleSelect = (place) => {
    onSelectPlace(place.lat, place.lng, place.zoom || 15);
    setQuery(place.name.split(",")[0]);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    setResults(KERALA_SEARCHABLE_PLACES.slice(0, 8));
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md pointer-events-auto">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search any place in Kerala (e.g. Cherai, Kakkanad, Munnar)..."
          className="w-full bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-2xl transition"
        />

        {/* Left Search Icon */}
        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>

        {/* Right Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-12 left-0 right-0 bg-slate-900/98 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 max-h-96 flex flex-col">
          {/* Category Filter Chips */}
          <div className="p-2 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-slate-950/60">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition ${
                activeCategory === "all"
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-700"
                  : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
              }`}
            >
              All Places
            </button>
            <button
              onClick={() => setActiveCategory("it")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition flex items-center gap-1 ${
                activeCategory === "it"
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-700"
                  : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Building className="w-3 h-3 text-cyan-400" />
              IT Hubs
            </button>
            <button
              onClick={() => setActiveCategory("coastal")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition flex items-center gap-1 ${
                activeCategory === "coastal"
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-700"
                  : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Waves className="w-3 h-3 text-sky-400" />
              Beaches & CRZ
            </button>
            <button
              onClick={() => setActiveCategory("hill")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition flex items-center gap-1 ${
                activeCategory === "hill"
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-700"
                  : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Mountain className="w-3 h-3 text-rose-400" />
              Hills / Wayanad
            </button>
            <button
              onClick={() => setActiveCategory("flood")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition flex items-center gap-1 ${
                activeCategory === "flood"
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-700"
                  : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
              }`}
            >
              🌊 Flood Basins
            </button>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto divide-y divide-slate-800/50 p-1 flex-1">
            {results.length > 0 ? (
              results.map((place, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(place)}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 text-xs flex items-center justify-between text-slate-200 hover:text-white transition group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0 group-hover:border-cyan-500/50">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="font-semibold text-slate-100 group-hover:text-cyan-300 truncate">
                        {place.name}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 truncate">
                        {place.malayalam && <span className="text-slate-300">{place.malayalam}</span>}
                        <span>&bull;</span>
                        <span>{place.district}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700">
                      {place.tag}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
                  </div>
                </button>
              ))
            ) : (
              <div className="p-6 text-center text-slate-400 text-xs space-y-1">
                <p>No direct match found for "{query}".</p>
                <p className="text-[11px] text-slate-400">
                  Try typing the district name (e.g. Ernakulam, Wayanad) or landmark.
                </p>
              </div>
            )}
          </div>

          {/* Dropdown Footer */}
          <div className="p-2 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[10px] text-slate-400 px-3">
            <span>Powered by BhoomiKerala Geo-Engine & OSM</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-cyan-400 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
