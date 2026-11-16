import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import {
  Layers,
  MapPin,
  Waves,
  Mountain,
  Building,
  Hospital,
  Train,
  Eye,
  Maximize2,
  AlertTriangle,
  CheckCircle2,
  Compass
} from "lucide-react";
import {
  KERALA_CENTER,
  KERALA_BOUNDS,
  SAMPLE_LAND_PARCELS,
  KERALA_FLOOD_ZONES,
  KERALA_LANDSLIDE_ZONES,
  KERALA_POIS
} from "../data/keralaGeoData";
import { evaluateLocation, formatINR } from "../utils/geoCalculations";

export default function MapViewer({
  selectedProperty,
  onSelectProperty,
  onSearchLocation,
  flyToLocation
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentMarkerRef = useRef(null);
  const currentParcelPolygonRef = useRef(null);
  const floodLayerGroupRef = useRef(null);
  const landslideLayerGroupRef = useRef(null);
  const parcelsLayerGroupRef = useRef(null);
  const poisLayerGroupRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [activeBaseLayer, setActiveBaseLayer] = useState("satellite"); // 'streets' | 'satellite' | 'topo'
  const [showFloodZones, setShowFloodZones] = useState(true);
  const [showLandslideZones, setShowLandslideZones] = useState(true);
  const [showParcels, setShowParcels] = useState(true);
  const [showPois, setShowPois] = useState(true);
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Fix default marker icon assets for Leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    const map = L.map(mapContainerRef.current, {
      center: selectedProperty ? selectedProperty.center : [10.0125, 76.3620],
      zoom: 12,
      minZoom: 7,
      maxZoom: 18,
      zoomControl: false
    });

    // Add Zoom Control to top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Initial Tile Layer: ESRI Satellite Imagery
    const satelliteTile = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        maxZoom: 18
      }
    ).addTo(map);
    tileLayerRef.current = satelliteTile;

    // Create Layer Groups
    floodLayerGroupRef.current = L.layerGroup().addTo(map);
    landslideLayerGroupRef.current = L.layerGroup().addTo(map);
    parcelsLayerGroupRef.current = L.layerGroup().addTo(map);
    poisLayerGroupRef.current = L.layerGroup().addTo(map);

    // Click handler anywhere on map
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      const evaluation = evaluateLocation(lat, lng);
      onSelectProperty(evaluation);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Base Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    let newTileLayer;
    if (activeBaseLayer === "satellite") {
      newTileLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Esri Satellite Imagery",
          maxZoom: 18
        }
      );
    } else if (activeBaseLayer === "topo") {
      newTileLayer = L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
          attribution: "OpenTopoMap Elevation Contours",
          maxZoom: 17
        }
      );
    } else {
      // Streets
      newTileLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19
        }
      );
    }

    newTileLayer.addTo(mapInstanceRef.current);
    tileLayerRef.current = newTileLayer;
  }, [activeBaseLayer]);

  // Render Flood Hazard Zones Overlay
  useEffect(() => {
    if (!floodLayerGroupRef.current) return;
    floodLayerGroupRef.current.clearLayers();

    if (showFloodZones) {
      KERALA_FLOOD_ZONES.forEach((fz) => {
        const polygon = L.polygon(fz.polygon, {
          color: fz.color,
          weight: 2,
          fillColor: fz.fillColor,
          fillOpacity: fz.fillOpacity,
          dashArray: "4, 6"
        });

        polygon.bindPopup(`
          <div class="p-2 text-xs">
            <div class="font-bold text-sky-400 flex items-center gap-1.5 mb-1">
              <span>🌊</span> ${fz.name}
            </div>
            <div class="text-slate-300 mb-1">Severity: <span class="font-semibold text-amber-400">${fz.severity}</span></div>
            <p class="text-slate-400 text-[11px] leading-relaxed">${fz.historicalNotes}</p>
          </div>
        `);

        polygon.addTo(floodLayerGroupRef.current);
      });
    }
  }, [showFloodZones]);

  // Render Landslide Hazard Zones Overlay
  useEffect(() => {
    if (!landslideLayerGroupRef.current) return;
    landslideLayerGroupRef.current.clearLayers();

    if (showLandslideZones) {
      KERALA_LANDSLIDE_ZONES.forEach((lsz) => {
        const polygon = L.polygon(lsz.polygon, {
          color: lsz.color,
          weight: 2.5,
          fillColor: lsz.fillColor,
          fillOpacity: lsz.fillOpacity,
          dashArray: "5, 5"
        });

        polygon.bindPopup(`
          <div class="p-2 text-xs">
            <div class="font-bold text-rose-400 flex items-center gap-1.5 mb-1">
              <span>⚠️</span> ${lsz.name}
            </div>
            <div class="text-slate-300 mb-1">Risk Tier: <span class="font-semibold text-rose-300">${lsz.riskLevel}</span></div>
            <div class="text-slate-300 mb-1">Slope: <span class="font-mono text-amber-300">${lsz.slopeAverage}</span></div>
            <p class="text-slate-400 text-[11px] leading-relaxed">${lsz.kSdmaNotice}</p>
          </div>
        `);

        polygon.addTo(landslideLayerGroupRef.current);
      });
    }
  }, [showLandslideZones]);

  // Render Cadastral Sample Parcels
  useEffect(() => {
    if (!parcelsLayerGroupRef.current) return;
    parcelsLayerGroupRef.current.clearLayers();

    if (showParcels) {
      SAMPLE_LAND_PARCELS.forEach((parcel) => {
        const isHazardous = parcel.floodZone.status.includes("High") || parcel.landslideZone.status.includes("Red");
        const poly = L.polygon(parcel.polygon, {
          color: isHazardous ? "#f43f5e" : "#10b981",
          weight: 2.5,
          fillColor: isHazardous ? "#f43f5e" : "#10b981",
          fillOpacity: 0.35
        });

        poly.on("click", (e) => {
          L.DomEvent.stopPropagation(e);
          const evalResult = evaluateLocation(parcel.center[0], parcel.center[1]);
          onSelectProperty(evalResult);
        });

        poly.bindTooltip(
          `<b>${parcel.name}</b><br/><span style="color:#38bdf8">${formatINR(parcel.fairValuePerCent)}/cent</span>`,
          { sticky: true, className: "bg-slate-900 text-slate-100 border border-slate-700 text-xs px-2 py-1 rounded" }
        );

        poly.addTo(parcelsLayerGroupRef.current);
      });
    }
  }, [showParcels, onSelectProperty]);

  // Render POIs
  useEffect(() => {
    if (!poisLayerGroupRef.current) return;
    poisLayerGroupRef.current.clearLayers();

    if (showPois) {
      KERALA_POIS.forEach((poi) => {
        let iconHtml = "📍";
        let bgClass = "bg-blue-600";
        if (poi.category === "hospital") {
          iconHtml = "🏥";
          bgClass = "bg-rose-600";
        } else if (poi.category === "transit" || poi.category === "bus") {
          iconHtml = "🚆";
          bgClass = "bg-amber-600";
        } else if (poi.category === "education") {
          iconHtml = "🎓";
          bgClass = "bg-emerald-600";
        } else if (poi.category === "shopping") {
          iconHtml = "🛍️";
          bgClass = "bg-purple-600";
        } else if (poi.category === "airport") {
          iconHtml = "✈️";
          bgClass = "bg-sky-600";
        }

        const customIcon = L.divIcon({
          className: "custom-poi-marker",
          html: `<div class="${bgClass} text-white w-6 h-6 rounded-full flex items-center justify-center text-[11px] shadow-md border border-white/60">${iconHtml}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([poi.lat, poi.lng], { icon: customIcon });
        marker.bindPopup(`
          <div class="p-2 text-xs">
            <div class="font-bold text-slate-100 mb-0.5">${poi.name}</div>
            <div class="text-cyan-400 font-medium text-[11px]">${poi.type}</div>
          </div>
        `);
        marker.addTo(poisLayerGroupRef.current);
      });
    }
  }, [showPois]);

  // Handle selected property changes (draw marker, polygon and zoom)
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedProperty) return;

    const map = mapInstanceRef.current;
    const [lat, lng] = selectedProperty.center;

    // Remove previous marker
    if (currentMarkerRef.current) {
      map.removeLayer(currentMarkerRef.current);
    }
    // Remove previous polygon
    if (currentParcelPolygonRef.current) {
      map.removeLayer(currentParcelPolygonRef.current);
    }

    // Custom pulsing pin icon
    const pulseIcon = L.divIcon({
      className: "pulse-marker",
      html: `
        <div class="pulse-ring"></div>
        <div class="w-5 h-5 rounded-full bg-cyan-400 border-2 border-white shadow-xl flex items-center justify-center text-[10px] text-slate-900 font-bold">
          ★
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const marker = L.marker([lat, lng], { icon: pulseIcon }).addTo(map);
    currentMarkerRef.current = marker;

    // Draw active parcel polygon
    if (selectedProperty.polygon && selectedProperty.polygon.length > 2) {
      const isForbidden = selectedProperty.isSea || selectedProperty.isBeach || selectedProperty.isWaterbody;
      const polyColor = isForbidden ? "#f43f5e" : "#06b6d4";
      const polyFill = isForbidden ? "#ef4444" : "#22d3ee";

      const polygon = L.polygon(selectedProperty.polygon, {
        color: polyColor,
        weight: 3.5,
        fillColor: polyFill,
        fillOpacity: 0.45,
        dashArray: "3, 3"
      }).addTo(map);
      currentParcelPolygonRef.current = polygon;
    }

    // Smoothly fly to location
    map.flyTo([lat, lng], Math.max(map.getZoom(), 15), {
      duration: 1.2
    });
  }, [selectedProperty]);

  // Handle external fly to location requests
  useEffect(() => {
    if (!mapInstanceRef.current || !flyToLocation) return;
    mapInstanceRef.current.flyTo(
      [flyToLocation.lat, flyToLocation.lng],
      flyToLocation.zoom || 14,
      { duration: 1.5 }
    );
  }, [flyToLocation]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-slate-950">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Instructions & Quick Place Shortcuts Pill */}
      <div className="absolute top-3 left-3 sm:left-4 z-20 pointer-events-none flex flex-col gap-1.5 max-w-[90vw] sm:max-w-md">
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2.5 text-xs text-slate-200 pointer-events-auto">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="font-medium truncate">
            Search any place above or click anywhere on the map
          </span>
        </div>

        {/* Quick Place Shortcuts */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pointer-events-auto py-0.5">
          {[
            { name: "Kakkanad", lat: 10.0125, lng: 76.3620, badge: "IT" },
            { name: "Cherai Beach", lat: 10.1412, lng: 76.1780, badge: "CRZ" },
            { name: "Aluva River", lat: 10.1110, lng: 76.3530, badge: "Flood" },
            { name: "Kowdiar TVM", lat: 8.5280, lng: 76.9610, badge: "City" },
            { name: "Munnar", lat: 10.0889, lng: 77.0595, badge: "Hills" },
            { name: "Chooralmala", lat: 11.5540, lng: 76.1280, badge: "Red Zone" },
            { name: "Kuttanad", lat: 9.4320, lng: 76.4020, badge: "Wetland" }
          ].map((place, idx) => (
            <button
              key={idx}
              onClick={() => onSearchLocation && onSearchLocation(place.lat, place.lng, 15)}
              className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-[11px] font-medium text-slate-300 hover:text-cyan-300 border border-slate-700/80 shadow-md whitespace-nowrap transition flex items-center gap-1 shrink-0"
            >
              <span>{place.name}</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-cyan-400 font-mono">
                {place.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Map Layer Switcher & Overlay Filters Control Panel */}
      <div className="absolute top-3 right-14 z-20">
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-200 hover:text-white px-3 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold hover:border-slate-500 transition"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Layers & Hazards</span>
          </button>

          {showLayerMenu && (
            <div className="absolute top-11 right-0 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl p-3 z-30 animate-in fade-in slide-in-from-top-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Base Map Style
              </div>
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                <button
                  onClick={() => setActiveBaseLayer("satellite")}
                  className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                    activeBaseLayer === "satellite"
                      ? "bg-cyan-950/80 border-cyan-500 text-cyan-300"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750"
                  }`}
                >
                  🛰️ Satellite
                </button>
                <button
                  onClick={() => setActiveBaseLayer("streets")}
                  className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                    activeBaseLayer === "streets"
                      ? "bg-cyan-950/80 border-cyan-500 text-cyan-300"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750"
                  }`}
                >
                  🗺️ Streets
                </button>
                <button
                  onClick={() => setActiveBaseLayer("topo")}
                  className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                    activeBaseLayer === "topo"
                      ? "bg-cyan-950/80 border-cyan-500 text-cyan-300"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750"
                  }`}
                >
                  🏔️ Topo
                </button>
              </div>

              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 border-t border-slate-800 pt-2">
                Disaster & Cadastral Overlays
              </div>
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="flex items-center gap-2 text-slate-200 group-hover:text-cyan-300">
                    <Waves className="w-3.5 h-3.5 text-sky-400" />
                    <span>2018 Flood Basins</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={showFloodZones}
                    onChange={(e) => setShowFloodZones(e.target.checked)}
                    className="accent-cyan-500 rounded"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="flex items-center gap-2 text-slate-200 group-hover:text-rose-300">
                    <Mountain className="w-3.5 h-3.5 text-rose-400" />
                    <span>Landslide Red Zones</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={showLandslideZones}
                    onChange={(e) => setShowLandslideZones(e.target.checked)}
                    className="accent-rose-500 rounded"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="flex items-center gap-2 text-slate-200 group-hover:text-emerald-300">
                    <Building className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cadastral Parcels</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={showParcels}
                    onChange={(e) => setShowParcels(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="flex items-center gap-2 text-slate-200 group-hover:text-amber-300">
                    <Hospital className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hospitals & Transit</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={showPois}
                    onChange={(e) => setShowPois(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                </label>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Ref: KSDMA & Kerala IGR</span>
                <button
                  onClick={() => setShowLayerMenu(false)}
                  className="text-cyan-400 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map Legend (Bottom-Left) */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:block">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-slate-300 shadow-xl space-y-1">
          <div className="font-semibold text-slate-200 text-[11px] mb-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" /> Map Legend
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-sky-500/50 border border-sky-400 inline-block" />
            <span>2018 Flood Inundated Plain</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-rose-500/50 border border-rose-400 inline-block" />
            <span>KSDMA Landslide Susceptibility Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-500/50 border border-emerald-400 inline-block" />
            <span>Cadastral Survey Parcel</span>
          </div>
        </div>
      </div>
    </div>
  );
}
