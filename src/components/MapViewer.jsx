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
  CheckCircle2,
  Compass,
  Ruler
} from "lucide-react";
import {
  THRISSUR_CENTER,
  THRISSUR_BOUNDS,
  THRISSUR_SPECIFIED_PARCELS,
  THRISSUR_FLOOD_ZONES,
  THRISSUR_POIS
} from "../data/thrissurData.js";
import { evaluateLocation, formatINR } from "../utils/geoCalculations.js";

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
  const dimensionMarkersRef = useRef([]);
  const floodLayerGroupRef = useRef(null);
  const parcelsLayerGroupRef = useRef(null);
  const poisLayerGroupRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [activeBaseLayer, setActiveBaseLayer] = useState("satellite"); // 'streets' | 'satellite' | 'topo'
  const [showFloodZones, setShowFloodZones] = useState(true);
  const [showParcels, setShowParcels] = useState(true);
  const [showPois, setShowPois] = useState(true);
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Initialize Map focused on Thrissur District
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    const map = L.map(mapContainerRef.current, {
      center: selectedProperty ? selectedProperty.center : THRISSUR_CENTER,
      zoom: 13,
      minZoom: 10,
      maxZoom: 19,
      maxBounds: [
        [10.05, 75.75],
        [10.95, 76.75]
      ],
      zoomControl: false
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    // Default: Satellite Imagery
    const satelliteTile = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Esri Satellite Imagery",
        maxZoom: 19
      }
    ).addTo(map);
    tileLayerRef.current = satelliteTile;

    floodLayerGroupRef.current = L.layerGroup().addTo(map);
    parcelsLayerGroupRef.current = L.layerGroup().addTo(map);
    poisLayerGroupRef.current = L.layerGroup().addTo(map);

    // Map click handler anywhere in Thrissur
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

  // Base Layer toggle
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    let newTileLayer;
    if (activeBaseLayer === "satellite") {
      newTileLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { attribution: "Esri Satellite Imagery", maxZoom: 19 }
      );
    } else if (activeBaseLayer === "topo") {
      newTileLayer = L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        { attribution: "OpenTopoMap Elevation", maxZoom: 17 }
      );
    } else {
      newTileLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "&copy; OpenStreetMap contributors", maxZoom: 19 }
      );
    }

    newTileLayer.addTo(mapInstanceRef.current);
    tileLayerRef.current = newTileLayer;
  }, [activeBaseLayer]);

  // Render Thrissur Flood Zones
  useEffect(() => {
    if (!floodLayerGroupRef.current) return;
    floodLayerGroupRef.current.clearLayers();

    if (showFloodZones) {
      THRISSUR_FLOOD_ZONES.forEach((fz) => {
        const polygon = L.polygon(fz.polygon, {
          color: fz.color,
          weight: 2,
          fillColor: fz.fillColor,
          fillOpacity: fz.fillOpacity,
          dashArray: "4, 6"
        });

        polygon.bindPopup(`
          <div class="p-2 text-xs">
            <div class="font-bold text-sky-400 mb-1">🌊 ${fz.name}</div>
            <div class="text-amber-300 font-semibold mb-1">${fz.severity}</div>
            <p class="text-slate-300 text-[11px] leading-relaxed">${fz.historicalNotes}</p>
          </div>
        `);

        polygon.addTo(floodLayerGroupRef.current);
      });
    }
  }, [showFloodZones]);

  // Render Thrissur Specified Parcels
  useEffect(() => {
    if (!parcelsLayerGroupRef.current) return;
    parcelsLayerGroupRef.current.clearLayers();

    if (showParcels) {
      THRISSUR_SPECIFIED_PARCELS.forEach((parcel) => {
        const poly = L.polygon(parcel.polygon, {
          color: "#10b981",
          weight: 2.5,
          fillColor: "#10b981",
          fillOpacity: 0.35
        });

        poly.on("click", (e) => {
          L.DomEvent.stopPropagation(e);
          const evalResult = evaluateLocation(parcel.center[0], parcel.center[1]);
          onSelectProperty(evalResult);
        });

        poly.bindTooltip(
          `<b>${parcel.name}</b><br/><span style="color:#10b981;font-weight:bold">${parcel.specifiedAreaCents} Cents (${parcel.dimensions.frontageFt} × ${parcel.dimensions.depthFt} ft)</span><br/><span style="color:#38bdf8">${formatINR(parcel.fairValuePerCent)}/cent</span>`,
          { sticky: true, className: "bg-slate-900 text-slate-100 border border-slate-700 text-xs px-2 py-1 rounded" }
        );

        poly.addTo(parcelsLayerGroupRef.current);
      });
    }
  }, [showParcels, onSelectProperty]);

  // Render Thrissur POIs
  useEffect(() => {
    if (!poisLayerGroupRef.current) return;
    poisLayerGroupRef.current.clearLayers();

    if (showPois) {
      THRISSUR_POIS.forEach((poi) => {
        let iconHtml = "📍";
        let bgClass = "bg-blue-600";
        if (poi.category === "hospital") {
          iconHtml = "🏥";
          bgClass = "bg-rose-600";
        } else if (poi.category === "transit") {
          iconHtml = "🚆";
          bgClass = "bg-amber-600";
        } else if (poi.category === "shopping") {
          iconHtml = "🛍️";
          bgClass = "bg-purple-600";
        } else if (poi.category === "temple") {
          iconHtml = "🛕";
          bgClass = "bg-amber-500";
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

  // Render Active Selected Property with SPECIFIED DIMENSION LABELS
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedProperty) return;

    const map = mapInstanceRef.current;
    const [lat, lng] = selectedProperty.center;

    if (currentMarkerRef.current) map.removeLayer(currentMarkerRef.current);
    if (currentParcelPolygonRef.current) map.removeLayer(currentParcelPolygonRef.current);

    // Clear old dimension markers
    dimensionMarkersRef.current.forEach((m) => map.removeLayer(m));
    dimensionMarkersRef.current = [];

    // Pulsing Pin
    const pulseIcon = L.divIcon({
      className: "pulse-marker",
      html: `
        <div class="pulse-ring"></div>
        <div class="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-xl flex items-center justify-center text-[10px] text-white font-bold">
          ★
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = L.marker([lat, lng], { icon: pulseIcon }).addTo(map);
    currentMarkerRef.current = marker;

    // Draw active parcel polygon
    if (selectedProperty.polygon && selectedProperty.polygon.length >= 4) {
      const polygon = L.polygon(selectedProperty.polygon, {
        color: "#10b981",
        weight: 3.5,
        fillColor: "#34d399",
        fillOpacity: 0.45
      }).addTo(map);
      currentParcelPolygonRef.current = polygon;

      // Add Edge Dimension Labels (Frontage & Depth)
      const dims = selectedProperty.dimensions;
      if (dims) {
        // Label on Frontage (South edge)
        const p1 = selectedProperty.polygon[0];
        const p2 = selectedProperty.polygon[1];
        const midFrontLat = (p1[0] + p2[0]) / 2;
        const midFrontLng = (p1[1] + p2[1]) / 2;

        const frontLabelIcon = L.divIcon({
          className: "dim-label",
          html: `<div class="bg-slate-900/90 text-emerald-400 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500 shadow-md whitespace-nowrap">Front: ${dims.frontageFt} ft</div>`,
          iconSize: [60, 20],
          iconAnchor: [30, 10]
        });
        const frontLabel = L.marker([midFrontLat, midFrontLng], { icon: frontLabelIcon }).addTo(map);
        dimensionMarkersRef.current.push(frontLabel);

        // Label on Depth (East edge)
        const p3 = selectedProperty.polygon[2];
        const midDepthLat = (p2[0] + p3[0]) / 2;
        const midDepthLng = (p2[1] + p3[1]) / 2;

        const depthLabelIcon = L.divIcon({
          className: "dim-label",
          html: `<div class="bg-slate-900/90 text-cyan-300 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border border-cyan-500 shadow-md whitespace-nowrap">Depth: ${dims.depthFt} ft</div>`,
          iconSize: [60, 20],
          iconAnchor: [30, 10]
        });
        const depthLabel = L.marker([midDepthLat, midDepthLng], { icon: depthLabelIcon }).addTo(map);
        dimensionMarkersRef.current.push(depthLabel);
      }
    }

    map.flyTo([lat, lng], Math.max(map.getZoom(), 16), { duration: 1.2 });
  }, [selectedProperty]);

  useEffect(() => {
    if (!mapInstanceRef.current || !flyToLocation) return;
    mapInstanceRef.current.flyTo(
      [flyToLocation.lat, flyToLocation.lng],
      flyToLocation.zoom || 15,
      { duration: 1.5 }
    );
  }, [flyToLocation]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-slate-950">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Instructions & Quick Thrissur Taluk Shortcuts */}
      <div className="absolute top-3 left-3 sm:left-4 z-20 pointer-events-none flex flex-col gap-1.5 max-w-[90vw] sm:max-w-md">
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2.5 text-xs text-slate-200 pointer-events-auto">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="font-semibold text-emerald-400">
            Thrissur District Exclusive &bull; 100% Buyable Land
          </span>
        </div>

        {/* Quick Thrissur Location Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pointer-events-auto py-0.5">
          {[
            { name: "Swaraj Round", lat: 10.5276, lng: 76.2144, taluk: "Thrissur" },
            { name: "Ayyanthole", lat: 10.5342, lng: 76.1950, taluk: "Civil Station" },
            { name: "Sobha City", lat: 10.5520, lng: 76.1880, taluk: "Puzhakkal" },
            { name: "Chalakudy", lat: 10.3080, lng: 76.3350, taluk: "Taluk HQ" },
            { name: "Guruvayur", lat: 10.5960, lng: 76.0420, taluk: "Chavakkad" },
            { name: "Irinjalakuda", lat: 10.3540, lng: 76.2110, taluk: "Mukundapuram" },
            { name: "Wadakkanchery", lat: 10.6650, lng: 76.2420, taluk: "Thalapilly" },
            { name: "Kunnamkulam", lat: 10.6500, lng: 76.0700, taluk: "Taluk HQ" }
          ].map((loc, idx) => (
            <button
              key={idx}
              onClick={() => onSearchLocation && onSearchLocation(loc.lat, loc.lng, 15)}
              className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-[11px] font-medium text-slate-200 hover:text-emerald-300 border border-slate-700/80 shadow-md whitespace-nowrap transition flex items-center gap-1 shrink-0"
            >
              <span>{loc.name}</span>
              <span className="text-[9px] px-1 rounded bg-slate-800 text-cyan-400 font-mono">
                {loc.taluk}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Map Layer Switcher */}
      <div className="absolute top-3 right-14 z-20">
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-200 hover:text-white px-3 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold hover:border-slate-500 transition"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Layers</span>
          </button>

          {showLayerMenu && (
            <div className="absolute top-11 right-0 w-60 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl p-3 z-30 animate-in fade-in slide-in-from-top-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Map View
              </div>
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                <button
                  onClick={() => setActiveBaseLayer("satellite")}
                  className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                    activeBaseLayer === "satellite"
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                      : "bg-slate-800 border-slate-700 text-slate-300"
                  }`}
                >
                  🛰️ Sat
                </button>
                <button
                  onClick={() => setActiveBaseLayer("streets")}
                  className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                    activeBaseLayer === "streets"
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                      : "bg-slate-800 border-slate-700 text-slate-300"
                  }`}
                >
                  🗺️ Map
                </button>
                <button
                  onClick={() => setActiveBaseLayer("topo")}
                  className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                    activeBaseLayer === "topo"
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                      : "bg-slate-800 border-slate-700 text-slate-300"
                  }`}
                >
                  🏔️ Topo
                </button>
              </div>

              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 border-t border-slate-800 pt-2">
                Thrissur Overlays
              </div>
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="flex items-center gap-2 text-slate-200">
                    <Waves className="w-3.5 h-3.5 text-sky-400" />
                    <span>Flood / Kole Basin</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={showFloodZones}
                    onChange={(e) => setShowFloodZones(e.target.checked)}
                    className="accent-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="flex items-center gap-2 text-slate-200">
                    <Building className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Surveyed Parcels</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={showParcels}
                    onChange={(e) => setShowParcels(e.target.checked)}
                    className="accent-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="flex items-center gap-2 text-slate-200">
                    <Hospital className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hospitals & Stations</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={showPois}
                    onChange={(e) => setShowPois(e.target.checked)}
                    className="accent-emerald-500"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
