import React from "react";
import { formatINR, calculateKeralaRegistrationCost } from "../utils/geoCalculations";
import { CENT_TO_ARE, CENT_TO_SQFT } from "../data/keralaGeoData";

export default function PrintableDossier({ property }) {
  if (!property) return null;

  const cost10Cents = calculateKeralaRegistrationCost(property.fairValuePerCent, 10, property.marketValuePerCent / property.fairValuePerCent);

  return (
    <div className="hidden print:block p-8 bg-white text-slate-900 font-sans print-only">
      {/* Dossier Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
        <div>
          <div className="text-2xl font-black tracking-tight text-slate-900">
            BHOOMIKERALA | ഭൂമികേരളം
          </div>
          <div className="text-sm font-semibold text-slate-700">
            Comprehensive Property Valuation & Geo-Risk Intelligence Report
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Reference: Kerala Registration Department (IGR) & Kerala State Disaster Management Authority (KSDMA)
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-mono text-slate-500">Report Date: {new Date().toLocaleDateString("en-IN")}</div>
          <div className="text-xs font-bold text-slate-800 mt-1">Parcel ID: {property.id}</div>
          <div className="inline-block mt-2 px-3 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-bold">
            Viability Score: {property.overallScore} / 100
          </div>
        </div>
      </div>

      {/* Property Overview */}
      <div className="mb-6 p-4 border border-slate-300 rounded-lg bg-slate-50">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
          1. Cadastral & Geographic Identification
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
          <div><strong>Property Name:</strong> {property.name}</div>
          <div><strong>District:</strong> {property.district}</div>
          <div><strong>Taluk:</strong> {property.taluk}</div>
          <div><strong>Village:</strong> {property.village}</div>
          <div><strong>Re-Survey No:</strong> {property.surveyNo}</div>
          <div><strong>Block Number:</strong> {property.blockNo}</div>
          <div><strong>Coordinates:</strong> {property.center[0].toFixed(5)}°N, {property.center[1].toFixed(5)}°E</div>
          <div><strong>Land Classification:</strong> {property.classification}</div>
        </div>
      </div>

      {/* Fair Value & Cost Breakdown */}
      <div className="mb-6 p-4 border border-slate-300 rounded-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
          2. Government Fair Value & Statutory Acquisition Outlay
        </h3>
        {property.isSea || property.isBeach || property.isWaterbody ? (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800 space-y-1">
            <div className="font-bold uppercase tracking-wide">NON-SALEABLE PUBLIC DOMAIN / SOVEREIGN NATURAL COMMONS</div>
            <p>
              Govt Fair Value: ₹ 0. Under the Constitution of India (Article 297), the Public Trust Doctrine, and the Coastal Regulation Zone (CRZ) Notification, the sea, intertidal beaches, and public backwaters cannot be bought, sold, or registered by private individuals.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 mb-3 text-xs">
              <div className="p-2 border border-slate-200 rounded">
                <div className="text-slate-500">Govt Fair Value / Are:</div>
                <div className="text-sm font-bold font-mono">{formatINR(property.fairValuePerAre)}</div>
              </div>
              <div className="p-2 border border-slate-200 rounded">
                <div className="text-slate-500">Govt Fair Value / Cent:</div>
                <div className="text-sm font-bold font-mono">{formatINR(property.fairValuePerCent)}</div>
              </div>
              <div className="p-2 border border-slate-200 rounded">
                <div className="text-slate-500">Est. Market Rate / Cent:</div>
                <div className="text-sm font-bold font-mono">{formatINR(property.marketValuePerCent)}</div>
              </div>
            </div>

            <div className="text-xs space-y-1 border-t border-slate-200 pt-2">
              <div className="font-semibold text-slate-700">Sample 10 Cents Acquisition Outlay:</div>
              <div className="flex justify-between">
                <span>Land Price (at Market Value):</span>
                <span className="font-mono">{formatINR(cost10Cents.totalConsideration)}</span>
              </div>
              <div className="flex justify-between">
                <span>Kerala Stamp Duty (8%):</span>
                <span className="font-mono">{formatINR(cost10Cents.stampDuty)}</span>
              </div>
              <div className="flex justify-between">
                <span>Registration Fee (2%):</span>
                <span className="font-mono">{formatINR(cost10Cents.registrationFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Pokkuvaravu (Mutation) & Documentation:</span>
                <span className="font-mono">{formatINR(cost10Cents.legalAndDocFee + cost10Cents.mutationPokkuvaravuFee)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-slate-300 pt-1 text-slate-900">
                <span>Total Estimated Outlay:</span>
                <span className="font-mono">{formatINR(cost10Cents.grandTotalCost)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Geo-Risk Assessment */}
      <div className="mb-6 p-4 border border-slate-300 rounded-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
          3. Natural Hazard & Geo-Risk Assessment
        </h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="font-bold text-slate-700">Flood Inundation Profile:</div>
            <div><strong>Hazard Tier:</strong> {property.floodZone.status}</div>
            <div><strong>Elevation above MSL:</strong> {property.floodZone.elevationMeters} meters</div>
            <div><strong>2018 Flood Inundated:</strong> {property.floodZone.inundatedIn2018 ? "YES (Submerged)" : "NO (Safe)"}</div>
            <div><strong>Nearest Major River:</strong> {property.floodZone.riverName} ({property.floodZone.distanceToMajorRiverKm} km)</div>
          </div>

          <div>
            <div className="font-bold text-slate-700">Landslide & Slope Stability:</div>
            <div><strong>KSDMA Susceptibility:</strong> {property.landslideZone.status}</div>
            <div><strong>Terrain Slope:</strong> {property.landslideZone.slopeDegrees}°</div>
            <div><strong>Wetland / Nilam Status:</strong> {property.isWetland ? "NILAM (In Data Bank)" : "PURAYIDAM (Dryland)"}</div>
            <div><strong>Building Permit Eligible:</strong> {property.buildingPermitEligible ? "YES" : "Approval / Clearance Mandatory"}</div>
          </div>
        </div>
      </div>

      {/* Accessibility & Infrastructure */}
      <div className="mb-6 p-4 border border-slate-300 rounded-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
          4. Infrastructure, Road Access & Amenities
        </h3>
        <div className="grid grid-cols-2 gap-4 text-xs mb-2">
          <div><strong>Road Width:</strong> {property.roadWidthMeters} meters (KMBR min 3.0m compliant)</div>
          <div><strong>Road Access Type:</strong> {property.roadAccess}</div>
        </div>
        <div className="text-xs space-y-1">
          {property.nearestFacilities?.hospital?.[0] && (
            <div>&bull; <strong>Nearest Hospital:</strong> {property.nearestFacilities.hospital[0].name} ({property.nearestFacilities.hospital[0].distanceKm} km, ~{property.nearestFacilities.hospital[0].driveTimeMins} mins)</div>
          )}
          {property.nearestFacilities?.transit?.[0] && (
            <div>&bull; <strong>Nearest Transit:</strong> {property.nearestFacilities.transit[0].name} ({property.nearestFacilities.transit[0].distanceKm} km)</div>
          )}
          {property.nearestFacilities?.education?.[0] && (
            <div>&bull; <strong>Nearest Educational Hub:</strong> {property.nearestFacilities.education[0].name} ({property.nearestFacilities.education[0].distanceKm} km)</div>
          )}
        </div>
      </div>

      {/* Buyer Verification Checklist */}
      <div className="p-4 border border-slate-300 rounded-lg text-xs space-y-1">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
          5. Pre-Registration Verification Checklist
        </h3>
        <div>[ ] 30 Years Prior Title Deed (മുന്നാധാരം) examined by legal advocate</div>
        <div>[ ] 30 Years Encumbrance Certificate (EC Form 15) obtained from PEARL portal</div>
        <div>[ ] Current Year Land Tax Receipt & Thandapper verified on revenue.kerala.gov.in</div>
        <div>[ ] Physical boundaries checked against Taluk Re-Survey FMB sketch</div>
        <div>[ ] Verified not notified in LLMC Wetland Data Bank</div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-300 text-[10px] text-slate-500 flex justify-between items-center">
        <span>Generated by BhoomiKerala Geo-Intelligence Engine</span>
        <span>For informational and due-diligence reference only</span>
      </div>
    </div>
  );
}
