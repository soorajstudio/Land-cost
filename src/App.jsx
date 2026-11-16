import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MapViewer from "./components/MapViewer";
import PropertyDetailsDrawer from "./components/PropertyDetailsDrawer";
import IGRSearchPanel from "./components/IGRSearchPanel";
import UnitConverterModal from "./components/UnitConverterModal";
import ComparisonModal from "./components/ComparisonModal";
import DueDiligenceGuideModal from "./components/DueDiligenceGuideModal";
import PrintableDossier from "./components/PrintableDossier";
import { SAMPLE_LAND_PARCELS } from "./data/keralaGeoData";
import { evaluateLocation } from "./utils/geoCalculations";
import { ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState(
    evaluateLocation(SAMPLE_LAND_PARCELS[0].center[0], SAMPLE_LAND_PARCELS[0].center[1])
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

  const handleSearchLocation = (lat, lng, zoom = 14) => {
    const evaluation = evaluateLocation(lat, lng);
    setSelectedProperty(evaluation);
    setIsDrawerOpen(true);
    setFlyToLocation({ lat, lng, zoom });
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Check if roughly in Kerala bounds (approx 8.1 - 12.9 N, 74.8 - 77.5 E)
        if (latitude >= 8.0 && latitude <= 13.0 && longitude >= 74.5 && longitude <= 77.8) {
          handleSearchLocation(latitude, longitude, 15);
        } else {
          // If outside Kerala, alert and center on Kakkanad
          alert(
            `Your detected coordinates (${latitude.toFixed(2)}, ${longitude.toFixed(2)}) are outside Kerala. Centering on Kochi / Ernakulam instead!`
          );
          handleSearchLocation(9.9816, 76.2999, 13);
        }
      },
      (err) => {
        alert("Unable to fetch current location. Please allow location permissions in your browser.");
      }
    );
  };

  const handleIGRSelect = (locationData) => {
    handleSearchLocation(locationData.lat, locationData.lng, 15);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans select-none">
      {/* Top Navbar */}
      <Navbar
        onSelectParcel={handleSelectProperty}
        onSearchLocation={handleSearchLocation}
        onLocateMe={handleLocateMe}
        onOpenIGRSearch={() => setIsIGRSearchOpen(true)}
        onOpenConverter={() => setIsConverterOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
      />

      {/* Main Map & Interface Viewport */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        {/* Full-bleed Leaflet Map */}
        <MapViewer
          selectedProperty={selectedProperty}
          onSelectProperty={handleSelectProperty}
          flyToLocation={flyToLocation}
        />

        {/* Drawer Toggle Floating Pill (When drawer is closed) */}
        {!isDrawerOpen && selectedProperty && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="absolute bottom-5 right-5 z-20 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 hover:from-cyan-500 hover:to-blue-500 transition animate-bounce"
          >
            <Eye className="w-4 h-4" />
            <span>View Property Intelligence ({selectedProperty.village})</span>
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

      {/* Hidden Printable Evaluation Dossier for PDF / Print Output */}
      <PrintableDossier property={selectedProperty} />
    </div>
  );
}
