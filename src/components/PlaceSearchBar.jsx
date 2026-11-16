import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  X,
  Loader2,
  Building,
  ChevronRight
} from "lucide-react";
import {
  THRISSUR_TALUKS,
  THRISSUR_SPECIFIED_PARCELS
} from "../data/thrissurData.js";

export default function PlaceSearchBar({ onSelectPlace }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Build local list of Thrissur places
  const thrissurPlaces = [
    { name: "Thrissur Swaraj Round", malayalam: "തൃശ്ശൂർ റൗണ്ട്", taluk: "Thrissur", tag: "City Center", lat: 10.5276, lng: 76.2144 },
    { name: "Ayyanthole Civil Station (Collectorate)", malayalam: "അയ്യന്തോൾ", taluk: "Thrissur", tag: "Administrative", lat: 10.5342, lng: 76.1950 },
    { name: "Sobha City / Puzhakkal", malayalam: "ശോഭാ സിറ്റി / പുഴയ്ക്കൽ", taluk: "Thrissur", tag: "Commercial Corridor", lat: 10.5520, lng: 76.1880 },
    { name: "Ollur Industrial Belt", malayalam: "ഒല്ലൂർ", taluk: "Thrissur", tag: "Industrial & Residential", lat: 10.4780, lng: 76.2410 },
    { name: "Nadathara / NH 544 Highway", malayalam: "നടത്തറ", taluk: "Thrissur", tag: "Highway Frontage", lat: 10.5050, lng: 76.2550 },
    { name: "Chalakudy South Junction", malayalam: "ചാലക്കുടി", taluk: "Chalakudy", tag: "Railway Town", lat: 10.3080, lng: 76.3350 },
    { name: "Meloor Riverbank", malayalam: "മേലൂർ", taluk: "Chalakudy", tag: "River Basin", lat: 10.2820, lng: 76.3680 },
    { name: "Koratty Infopark", malayalam: "കൊരട്ടി ഇൻഫോപാർക്ക്", taluk: "Chalakudy", tag: "IT Park Corridor", lat: 10.2640, lng: 76.3580 },
    { name: "Guruvayur Temple East Nada", malayalam: "ഗുരുവായൂർ", taluk: "Chavakkad", tag: "Temple Heritage", lat: 10.5960, lng: 76.0420 },
    { name: "Chavakkad Town", malayalam: "ചാവക്കാട്", taluk: "Chavakkad", tag: "Municipal Town", lat: 10.5820, lng: 76.0240 },
    { name: "Irinjalakuda Town (Koodalmanikyam)", malayalam: "ഇരിഞ്ഞാലക്കുട", taluk: "Mukundapuram", tag: "Heritage Town", lat: 10.3540, lng: 76.2110 },
    { name: "Kallettumkara Railway Belt", malayalam: "കല്ലേറ്റുംകര", taluk: "Mukundapuram", tag: "Residential", lat: 10.3340, lng: 76.2580 },
    { name: "Kodungallur Town (Chandapura)", malayalam: "കൊടുങ്ങല്ലൂർ", taluk: "Kodungallur", tag: "Historic Town", lat: 10.2280, lng: 76.1960 },
    { name: "Wadakkanchery Ottupara", malayalam: "വടക്കാഞ്ചേരി", taluk: "Thalapilly", tag: "Taluk HQ", lat: 10.6650, lng: 76.2420 },
    { name: "Chelakkara Town", malayalam: "ചേലക്കര", taluk: "Thalapilly", tag: "North Midland", lat: 10.7020, lng: 76.3500 },
    { name: "Kunnamkulam Market Junction", malayalam: "കുന്നത്ത്കുളം", taluk: "Kunnamkulam", tag: "Trading Hub", lat: 10.6500, lng: 76.0700 },
    { name: "Mannuthy Agricultural University", malayalam: "മണ്ണുത്തി", taluk: "Thrissur", tag: "Education Corridor", lat: 10.5390, lng: 76.2710 },
    { name: "Amala Hospital Junction", malayalam: "അമല ജംഗ്ഷൻ", taluk: "Thrissur", tag: "Medical Hub", lat: 10.5690, lng: 76.1680 }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults(thrissurPlaces.slice(0, 8));
      return;
    }

    const q = query.toLowerCase().trim();

    // 1. Local match
    const local = thrissurPlaces.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.malayalam.includes(q) ||
        p.taluk.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
    );

    // Also match specified parcels in Thrissur
    const parcelMatches = THRISSUR_SPECIFIED_PARCELS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.surveyNo.toLowerCase().includes(q)
    ).map((p) => ({
      name: `${p.name} (${p.surveyNo})`,
      malayalam: p.village,
      taluk: p.taluk,
      tag: `${p.specifiedAreaCents} Cents Plot`,
      lat: p.center[0],
      lng: p.center[1]
    }));

    setResults([...local, ...parcelMatches]);

    // 2. OpenStreetMap Geocoding restricted strictly to Thrissur District
    setIsLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query + ", Thrissur, Kerala"
          )}&format=json&limit=5&countrycodes=in&viewbox=75.90,10.85,76.60,10.15&bounded=1`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const geocoded = data.map((item) => ({
              name: item.display_name.split(",")[0] + ", Thrissur",
              malayalam: item.name || "",
              taluk: "Thrissur District",
              tag: item.type || "Place",
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon)
            }));
            setResults((prev) => {
              const existing = new Set(prev.map((p) => p.name.toLowerCase()));
              const filtered = geocoded.filter((g) => !existing.has(g.name.toLowerCase()));
              return [...prev, ...filtered];
            });
          }
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (place) => {
    onSelectPlace(place.lat, place.lng, 16);
    setQuery(place.name.split(",")[0]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md pointer-events-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search anywhere in Thrissur (e.g. Swaraj Round, Ayyanthole, Sobha City)..."
          className="w-full bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 shadow-2xl transition"
        />

        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
          ) : (
            <Search className="w-4 h-4 text-emerald-400" />
          )}
        </div>

        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults(thrissurPlaces.slice(0, 8));
            }}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-12 left-0 right-0 bg-slate-900/98 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 max-h-80 flex flex-col">
          <div className="p-2 border-b border-slate-800 bg-slate-950/60 text-[10px] uppercase font-bold text-slate-400 px-3 flex justify-between items-center">
            <span>Thrissur District Locations & Parcels</span>
            <span className="text-emerald-400">All 7 Taluks</span>
          </div>

          <div className="overflow-y-auto divide-y divide-slate-800/50 p-1 flex-1">
            {results.map((place, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(place)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 text-xs flex items-center justify-between text-slate-200 hover:text-white transition group"
              >
                <div className="flex items-center gap-2.5 truncate pr-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 shrink-0 group-hover:border-emerald-500">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-slate-100 group-hover:text-emerald-300 truncate">
                      {place.name}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                      {place.malayalam && <span className="text-slate-300">{place.malayalam}</span>}
                      <span>&bull;</span>
                      <span>Taluk: {place.taluk}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {place.tag}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
