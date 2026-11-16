import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MapViewer from "./components/MapViewer";
import PropertyDetailsDrawer from "./components/PropertyDetailsDrawer";
import IGRSearchPanel from "./components/IGRSearchPanel";
import UnitConverterModal from "./components/UnitConverterModal";
import ComparisonModal from "./components/ComparisonModal";
import DueDiligenceGuideModal from "./components/DueDiligenceGuideModal";
import PrintableDossier from "./components/PrintableDossier";
import { THRISSUR_SPECIFIED_PARCELS, THRISSUR_CENTER } from "./data/thrissurData.js";
import { evaluateLocation, computeSpecifiedDimensions, generateScaledPolygon } from "./utils/geoCalculations.js";
import { ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState(
    evaluateLocation(THRISSUR_CENTER[0], THRISSUR_CENTER[1])
  );
  const [flyToLocation, setFlyToLocation] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isIGRSearchOpen, setIsIGRSearchOpen] = useState(false);
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleSelectProperty = (prop) => {
    setSelectedProperty(prop);
    setIsDrawerOpen(true);
  };

  const handleSearchLocation = (lat, lng) => {
    const evaluation = evaluateLocation(lat, lng);
    setSelectedProperty(evaluation);
    setIsDrawerOpen(true);
    setFlyToLocation({ lat, lng });
  };

  // Update specified area and dynamically resize parcel polygon on the map
  const handleUpdateArea = (newAreaCents) => {
    if (!selectedProperty) return;
    const dims = computeSpecifiedDimensions(newAreaCents, selectedProperty.dimensions?.frontageFt);
    const newPolygon = generateScaledPolygon(
      selectedProperty.center[0],
      selectedProperty.center[1],
      dims.frontageM,
      dims.depthM
    );

    setSelectedProperty({
      ...selectedProperty,
      specifiedAreaCents: newAreaCents,
      specifiedAreaAres: dims.areaAres,
      specifiedAreaSqFt: dims.areaSqFt,
      dimensions: {
        ...selectedProperty.dimensions,
        ...dims
      },
      polygon: newPolygon
    });
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Check if inside Thrissur District bounds roughly (lat 10.15 - 10.85, lng 75.90 - 76.60)
        if (latitude >= 10.15 && latitude <= 10.85 && longitude >= 75.90 && longitude <= 76.60) {
          handleSearchLocation(latitude, longitude);
        } else {
          alert(
            `Your detected coordinates (${latitude.toFixed(2)}, ${longitude.toFixed(2)}) are outside Thrissur District. Centering on Thrissur Swaraj Round!`
          );
          handleSearchLocation(THRISSUR_CENTER[0], THRISSUR_CENTER[1]);
        }
      },
      (err) => {
        alert("Unable to fetch current location. Please allow location permissions in your browser.");
      }
    );
  };

  const handleIGRSelect = (locationData) => {
    const evalData = evaluateLocation(locationData.lat, locationData.lng, locationData.specifiedAreaCents);
    setSelectedProperty({
      ...evalData,
      taluk: locationData.taluk,
      village: locationData.village,
      surveyNo: locationData.surveyNo,
      fairValuePerAre: locationData.fairValuePerAre,
      fairValuePerCent: locationData.fairValuePerCent
    });
    setFlyToLocation({ lat: locationData.lat, lng: locationData.lng });
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans select-none">
      {/* Top Navbar */}
      <Navbar
        onSearchLocation={handleSearchLocation}
        onLocateMe={handleLocateMe}
        onOpenIGRSearch={() => setIsIGRSearchOpen(true)}
        onOpenConverter={() => setIsConverterOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Map & Interface Viewport */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        {/* Full-bleed Leaflet Map */}
        <MapViewer
          selectedProperty={selectedProperty}
          onSelectProperty={handleSelectProperty}
          onSearchLocation={handleSearchLocation}
          flyToLocation={flyToLocation}
        />

        {/* Drawer Toggle Floating Pill (When drawer is closed) */}
        {!isDrawerOpen && selectedProperty && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="absolute bottom-5 right-5 z-20 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 hover:from-emerald-500 hover:to-teal-500 transition animate-bounce"
          >
            <Eye className="w-4 h-4" />
            <span>View Point Land Rate ({selectedProperty.village})</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Property Evaluation Drawer */}
        {isDrawerOpen && (
          <PropertyDetailsDrawer
            property={selectedProperty}
            onClose={() => setIsDrawerOpen(false)}
            onOpenComparison={() => setIsComparisonOpen(true)}
          />
        )}
      </main>

      {/* Modals & Dialogs */}
      <IGRSearchPanel
        isOpen={isIGRSearchOpen}
        onClose={() => setIsIGRSearchOpen(false)}
        onSelectLocation={handleIGRSelect}
      />

      <UnitConverterModal
        isOpen={isConverterOpen}
        onClose={() => setIsConverterOpen(false)}
      />

      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        currentProperty={selectedProperty}
        onSelectProperty={handleSelectProperty}
      />

      <DueDiligenceGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <PrintableDossier property={selectedProperty} />
    </div>
  );
}
