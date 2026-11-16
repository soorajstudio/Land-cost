// BhoomiKerala - Geodetic, Risk Modeling, Coastline & Valuation Calculations

import {
  ARE_TO_CENT,
  CENT_TO_ARE,
  CENT_TO_SQFT,
  CENT_TO_SQM,
  KERALA_DISTRICTS,
  KERALA_FLOOD_ZONES,
  KERALA_LANDSLIDE_ZONES,
  KERALA_POIS,
  SAMPLE_LAND_PARCELS
} from "../data/keralaGeoData.js";

/**
 * High-precision approximation of the Kerala Western Coastline (Arabian Sea shoreline)
 * Ordered North to South (lat, lng of the High Tide Line / Coast)
 */
export const KERALA_COASTLINE_POINTS = [
  { lat: 12.85, lng: 74.86 }, // Manjeshwaram North Border
  { lat: 12.80, lng: 74.88 }, // Manjeshwaram
  { lat: 12.65, lng: 74.93 }, // Kumbla
  { lat: 12.50, lng: 74.98 }, // Kasaragod
  { lat: 12.35, lng: 75.05 }, // Kanhangad
  { lat: 12.18, lng: 75.13 }, // Nileshwaram
  { lat: 12.00, lng: 75.20 }, // Payyanur / Ezhimala
  { lat: 11.90, lng: 75.32 }, // Azhikkal
  { lat: 11.85, lng: 75.37 }, // Kannur City Beach
  { lat: 11.75, lng: 75.48 }, // Thalassery
  { lat: 11.60, lng: 75.59 }, // Vadakara
  { lat: 11.45, lng: 75.69 }, // Quilandy
  { lat: 11.25, lng: 75.77 }, // Kozhikode Beach
  { lat: 11.15, lng: 75.81 }, // Beypore
  { lat: 10.95, lng: 75.90 }, // Tanur
  { lat: 10.78, lng: 75.92 }, // Ponnani Harbour
  { lat: 10.55, lng: 76.01 }, // Chavakkad Beach
  { lat: 10.35, lng: 76.11 }, // Kodungallur Azhikode
  { lat: 10.18, lng: 76.17 }, // Munambam / Cherai Beach
  { lat: 10.02, lng: 76.22 }, // Vypin Light House
  { lat: 9.97,  lng: 76.24 }, // Fort Kochi Beach
  { lat: 9.75,  lng: 76.28 }, // Chellanam Beach
  { lat: 9.50,  lng: 76.32 }, // Alappuzha Beach
  { lat: 9.25,  lng: 76.44 }, // Thottappally Spillway
  { lat: 9.00,  lng: 76.54 }, // Kollam Beach / Neendakara
  { lat: 8.73,  lng: 76.70 }, // Varkala Cliff / Papanasam Beach
  { lat: 8.56,  lng: 76.87 }, // Shanghumukham Beach (Trivandrum)
  { lat: 8.38,  lng: 76.99 }, // Kovalam Beach
  { lat: 8.30,  lng: 77.05 }, // Vizhinjam Sea Port
  { lat: 8.18,  lng: 77.10 }, // Poovar / Pozhiyoor South Border
];

/**
 * Major inland open water bodies / Kayal Puramboke (Vembanad Lake, Ashtamudi Lake)
 */
export const MAJOR_WATERBODIES = [
  {
    id: "WB-VEMBANAD",
    name: "Vembanad Lake (വേമ്പനാട് കായൽ - Kayal Puramboke)",
    type: "Tidal Backwater / Ramsar Wetland",
    polygon: [
      [9.90, 76.28],
      [9.93, 76.32],
      [9.80, 76.38],
      [9.65, 76.42],
      [9.58, 76.43],
      [9.55, 76.38],
      [9.65, 76.33],
      [9.82, 76.28]
    ]
  },
  {
    id: "WB-ASHTAMUDI",
    name: "Ashtamudi Lake (അഷ്ടമുടി കായൽ - Kayal Puramboke)",
    type: "Estuarine Lake / Ramsar Site",
    polygon: [
      [8.97, 76.53],
      [8.98, 76.60],
      [8.92, 76.62],
      [8.90, 76.55]
    ]
  }
];

/**
 * Calculates Haversine distance between two coordinates in kilometers.
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Point in polygon check using ray-casting algorithm.
 */
export function isPointInPolygon(point, polygon) {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Interpolates the coastline longitude at a given latitude along Kerala's coast.
 */
export function getCoastlineLongitude(lat) {
  const pts = KERALA_COASTLINE_POINTS;
  if (lat >= pts[0].lat) return pts[0].lng;
  if (lat <= pts[pts.length - 1].lat) return pts[pts.length - 1].lng;

  for (let i = 0; i < pts.length - 1; i++) {
    const p1 = pts[i];
    const p2 = pts[i + 1];
    if (lat <= p1.lat && lat >= p2.lat) {
      const ratio = (lat - p2.lat) / (p1.lat - p2.lat);
      return p2.lng + ratio * (p1.lng - p2.lng);
    }
  }
  return 76.0;
}

/**
 * Formats Indian Currency (INR) with commas. e.g. ₹ 24,50,000
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount) || amount === 0) return "₹ 0";
  const rounded = Math.round(amount);
  return "₹ " + rounded.toLocaleString("en-IN");
}

/**
 * Computes Stamp Duty & Registration Expenses based on Kerala Registration Dept Rules
 */
export function calculateKeralaRegistrationCost(fairValuePerCent, areaCents, marketValueMultiplier = 1.0) {
  if (!fairValuePerCent || fairValuePerCent <= 0) {
    return {
      totalFairValue: 0,
      totalConsideration: 0,
      taxableValue: 0,
      stampDutyRatePercent: 8,
      registrationFeeRatePercent: 2,
      stampDuty: 0,
      registrationFee: 0,
      legalAndDocFee: 0,
      mutationPokkuvaravuFee: 0,
      totalExpenses: 0,
      grandTotalCost: 0
    };
  }

  const totalFairValue = fairValuePerCent * areaCents;
  const totalConsideration = totalFairValue * marketValueMultiplier;
  const taxableValue = Math.max(totalFairValue, totalConsideration);

  const stampDutyRate = 0.08;
  const registrationFeeRate = 0.02;

  const stampDuty = taxableValue * stampDutyRate;
  const registrationFee = taxableValue * registrationFeeRate;
  const legalAndDocFee = Math.max(12000, Math.min(65000, taxableValue * 0.004));
  const mutationPokkuvaravuFee = 1500;
  const totalExpenses = stampDuty + registrationFee + legalAndDocFee + mutationPokkuvaravuFee;
  const grandTotalCost = taxableValue + totalExpenses;

  return {
    totalFairValue,
    totalConsideration,
    taxableValue,
    stampDutyRatePercent: 8,
    registrationFeeRatePercent: 2,
    stampDuty,
    registrationFee,
    legalAndDocFee,
    mutationPokkuvaravuFee,
    totalExpenses,
    grandTotalCost
  };
}

/**
 * Calculates Form 6 Kerala Paddy Land & Wetland Conversion Fee
 */
export function calculateWetlandConversionFee(fairValuePerCent, areaCents) {
  if (!fairValuePerCent || fairValuePerCent <= 0) {
    return { areaCents, feePercentage: 0, feeAmount: 0, isExempt: true };
  }
  const totalFairValue = fairValuePerCent * areaCents;
  let feePercentage = 0;

  if (areaCents <= 25) {
    feePercentage = 0;
  } else if (areaCents <= 50) {
    feePercentage = 10;
  } else if (areaCents <= 100) {
    feePercentage = 20;
  } else {
    feePercentage = 30;
  }

  const feeAmount = (totalFairValue * feePercentage) / 100;
  return {
    areaCents,
    feePercentage,
    feeAmount,
    isExempt: areaCents <= 25
  };
}

/**
 * Finds the nearest POIs (Hospitals, Transit, Schools, Supermarkets) to a coordinate
 */
export function findNearestFacilities(lat, lng) {
  const mapped = KERALA_POIS.map((poi) => {
    const distanceKm = calculateDistanceKm(lat, lng, poi.lat, poi.lng);
    const driveTimeMins = Math.max(2, Math.round((distanceKm / 32) * 60));
    return {
      ...poi,
      distanceKm: parseFloat(distanceKm.toFixed(2)),
      driveTimeMins
    };
  });

  return {
    hospital: mapped.filter((p) => p.category === "hospital").sort((a, b) => a.distanceKm - b.distanceKm),
    transit: mapped.filter((p) => p.category === "transit" || p.category === "bus").sort((a, b) => a.distanceKm - b.distanceKm),
    education: mapped.filter((p) => p.category === "education").sort((a, b) => a.distanceKm - b.distanceKm),
    shopping: mapped.filter((p) => p.category === "shopping").sort((a, b) => a.distanceKm - b.distanceKm),
    airport: mapped.filter((p) => p.category === "airport").sort((a, b) => a.distanceKm - b.distanceKm)
  };
}

/**
 * Evaluates any arbitrary clicked location in Kerala or matches an existing sampled parcel.
 * Accurately detects:
 * 1. Arabian Sea (Territorial Waters - Non-Purchasable)
 * 2. Public Beaches / CRZ-I No-Development Zones
 * 3. Major Inland Backwaters & Lakes (Kayal Puramboke)
 * 4. Outside Kerala state boundaries
 * 5. Mainland cadastral parcels & private land
 */
export function evaluateLocation(lat, lng) {
  // 1. Check if clicked inside an existing sampled parcel polygon
  for (const parcel of SAMPLE_LAND_PARCELS) {
    if (isPointInPolygon([lat, lng], parcel.polygon)) {
      const nearest = findNearestFacilities(lat, lng);
      return {
        ...parcel,
        isCustomEvaluated: false,
        nearestFacilities: nearest,
        overallScore: computeSafetyScore(parcel.floodZone.status, parcel.landslideZone.status, parcel.isWetland, parcel.roadWidthMeters)
      };
    }
  }

  // Check if clicked close to a sample parcel center (< 450m)
  for (const parcel of SAMPLE_LAND_PARCELS) {
    const dist = calculateDistanceKm(lat, lng, parcel.center[0], parcel.center[1]);
    if (dist < 0.45) {
      const nearest = findNearestFacilities(lat, lng);
      return {
        ...parcel,
        isCustomEvaluated: false,
        nearestFacilities: nearest,
        overallScore: computeSafetyScore(parcel.floodZone.status, parcel.landslideZone.status, parcel.isWetland, parcel.roadWidthMeters)
      };
    }
  }

  // 2. CHECK IF CLICKED IN THE ARABIAN SEA OR COASTAL BEACH
  const coastLng = getCoastlineLongitude(lat);
  const diffFromCoast = lng - coastLng; // negative = out in the sea, positive = on land

  // If clicked west of the coastline (more than ~250m into the sea)
  if (lat >= 8.18 && lat <= 12.85 && diffFromCoast < -0.0025) {
    const seaDistanceKm = Math.abs(diffFromCoast * 111).toFixed(2);
    return {
      id: `SEA-${Math.round(lat * 1000)}-${Math.round(lng * 1000)}`,
      name: "🌊 Arabian Sea / Territorial Waters (ലക്ഷദ്വീപ് കടൽ)",
      district: "Off Kerala Coast",
      taluk: "Territorial Waters of India",
      village: "Not Applicable (Maritime Zone)",
      surveyNo: "None (Sovereign Waters)",
      blockNo: "N/A",
      desom: "Arabian Sea Continental Shelf",
      center: [lat, lng],
      polygon: [
        [lat + 0.001, lng - 0.001],
        [lat + 0.001, lng + 0.001],
        [lat - 0.001, lng + 0.001],
        [lat - 0.001, lng - 0.001]
      ],
      areaCents: 0,
      areaAres: 0,
      classification: "Sovereign Territorial Waters / Marine Public Domain",
      roadAccess: "No Road Access (Open Sea Water)",
      roadWidthMeters: 0,
      fairValuePerAre: 0,
      fairValuePerCent: 0,
      marketValuePerCent: 0,
      isSea: true,
      isWaterbody: true,
      isBeach: false,
      isWetland: true,
      inDataBank: false,
      waterStatus: `Arabian Sea Marine Waters (~${seaDistanceKm} km offshore from coastline)`,
      groundWaterTableDepthMeters: 0,
      floodZone: {
        status: "Permanently Submerged (Sea Bed)",
        elevationMeters: -12,
        inundatedIn2018: true,
        distanceToMajorRiverKm: 0,
        riverName: "Arabian Sea",
        notes: "Located entirely within oceanic territorial waters. 100% submerged by sea water."
      },
      landslideZone: {
        status: "Marine Seabed / Tidal Surge & Cyclone Risk",
        slopeDegrees: 0,
        hazardLevel: "Marine Zone",
        warningNotes: "Subject to high-energy maritime swell, monsoonal sea erosion, and cyclones."
      },
      zoning: "Sovereign Maritime Domain (Union of India)",
      buildingPermitEligible: false,
      kmbrCategory: "Non-Registrable / Sovereign Waters",
      description: "CRITICAL LEGAL NOTICE: You cannot buy the Arabian Sea! Under Article 297 of the Constitution of India, the Territorial Waters Act 1976, and the Public Trust Doctrine, all territorial waters and seabed are sovereign government property. Private ownership, deed registration, or sale is legally impossible and fraudulent.",
      legalNoticeTitle: "CAN I BUY THE SEA? ABSOLUTELY NOT!",
      legalNoticeText: "The sea, seabed, and ocean waters are sovereign territory of the Republic of India held in public trust. No private individual can purchase, register, survey, or build in the sea. The Kerala Registration Department has zero fair value for the ocean.",
      isCustomEvaluated: true,
      nearestFacilities: findNearestFacilities(lat, coastLng),
      overallScore: 0
    };
  }

  // If clicked within 250m of coastline (Public Beach / CRZ-I Intertidal Sand)
  if (lat >= 8.18 && lat <= 12.85 && diffFromCoast >= -0.0025 && diffFromCoast <= 0.002) {
    return {
      id: `BCH-${Math.round(lat * 1000)}-${Math.round(lng * 1000)}`,
      name: "🏖️ Public Coastal Beach / CRZ-I Intertidal Zone (തീരദേശ പുറമ്പോക്ക്)",
      district: "Coastal Taluk",
      taluk: "Coastal Belt",
      village: "Coastal Ward",
      surveyNo: "Coastal Puramboke (പുറമ്പോക്ക്)",
      blockNo: "CRZ-I",
      desom: "High Tide Line (HTL) Beach Front",
      center: [lat, lng],
      polygon: [
        [lat + 0.0006, lng - 0.0006],
        [lat + 0.0008, lng + 0.0007],
        [lat - 0.0005, lng + 0.0008],
        [lat - 0.0007, lng - 0.0005]
      ],
      areaCents: 0,
      areaAres: 0,
      classification: "Intertidal Beach / CRZ-I No Development Zone (NDZ)",
      roadAccess: "Beach Sand / Footpath Only",
      roadWidthMeters: 0,
      fairValuePerAre: 0,
      fairValuePerCent: 0,
      marketValuePerCent: 0,
      isSea: false,
      isWaterbody: true,
      isBeach: true,
      isWetland: true,
      inDataBank: false,
      waterStatus: "Intertidal High Tide Line (HTL) - Saline Tidal Inundation",
      groundWaterTableDepthMeters: 0.2,
      floodZone: {
        status: "Tidal Inundation & Severe Coastal Erosion",
        elevationMeters: 0.5,
        inundatedIn2018: true,
        distanceToMajorRiverKm: 0.05,
        riverName: "Arabian Sea Shoreline",
        notes: "Intertidal beach sand within 50m of High Tide Line. Highly vulnerable to sea surges and monsoon coastal erosion."
      },
      landslideZone: {
        status: "Severe Coastal Sea Erosion Zone",
        slopeDegrees: 1.0,
        hazardLevel: "Coastal Erosion Hazard",
        warningNotes: "Heavy wave action and seasonal beach loss. KCZMA strictly bars any construction."
      },
      zoning: "CRZ-I / CRZ-III No Development Zone (NDZ)",
      buildingPermitEligible: false,
      kmbrCategory: "Strictly Protected Coastal Commons",
      description: "LEGAL NOTICE: Public beaches cannot be purchased or registered by private individuals! Under the Coastal Regulation Zone (CRZ) Notification (2011/2019) and Kerala Coastal Zone Management Authority (KCZMA) regulations, intertidal sands and beaches are government commons protected for public and fishing community access. Private construction is illegal and subject to demolition.",
      legalNoticeTitle: "CAN I BUY THE BEACH? NO!",
      legalNoticeText: "Public beaches are classified as Government Coastal Puramboke (തീരദേശ പുറമ്പോക്ക്) and CRZ-I/NDZ. Under the Environment (Protection) Act, private deed registration and construction are strictly prohibited. Remember the Supreme Court Maradu demolition order for CRZ violations!",
      isCustomEvaluated: true,
      nearestFacilities: findNearestFacilities(lat, lng),
      overallScore: 2
    };
  }

  // 3. CHECK MAJOR INLAND WATER BODIES (Lakes / Backwaters / Kayal Puramboke)
  for (const wb of MAJOR_WATERBODIES) {
    if (isPointInPolygon([lat, lng], wb.polygon)) {
      return {
        id: `LAKE-${Math.round(lat * 1000)}-${Math.round(lng * 1000)}`,
        name: wb.name,
        district: "Backwater Region",
        taluk: "Inland Waterways",
        village: "Kayal Puramboke (കായൽ പുറമ്പോക്ക്)",
        surveyNo: "Kayal Puramboke",
        blockNo: "Waterbody",
        desom: "Backwater Channel",
        center: [lat, lng],
        polygon: [
          [lat + 0.0006, lng - 0.0006],
          [lat + 0.0008, lng + 0.0007],
          [lat - 0.0005, lng + 0.0008],
          [lat - 0.0007, lng - 0.0005]
        ],
        areaCents: 0,
        areaAres: 0,
        classification: "Government Waterbody Commons (Kayal Puramboke)",
        roadAccess: "No Road Access (Navigable Waterbody)",
        roadWidthMeters: 0,
        fairValuePerAre: 0,
        fairValuePerCent: 0,
        marketValuePerCent: 0,
        isSea: false,
        isWaterbody: true,
        isBeach: false,
        isWetland: true,
        inDataBank: true,
        waterStatus: "Deep Estuarine / Freshwater Backwater Lake",
        groundWaterTableDepthMeters: 0,
        floodZone: {
          status: "Permanent Waterbody / 100% Inundated",
          elevationMeters: 0.2,
          inundatedIn2018: true,
          distanceToMajorRiverKm: 0,
          riverName: wb.name,
          notes: "Classified as waterbody under Kerala Land Reforms and Revenue laws. Reclamation strictly illegal."
        },
        landslideZone: {
          status: "Safe from Slides (Waterbody Silt Bed)",
          slopeDegrees: 0,
          hazardLevel: "Zone-0",
          warningNotes: "Water basin floor."
        },
        zoning: "Ramsar Protected Wetland / CRZ-IV Waterbody",
        buildingPermitEligible: false,
        kmbrCategory: "Non-Registrable Waterbody",
        description: `LEGAL NOTICE: This location is inside ${wb.name}, a protected public waterbody and Ramsar site. Under Kerala High Court and Supreme Court precedents, reclamation (തണ്ണീർത്തട നികത്തൽ) or private registration of Kayal Puramboke is a non-bailable offense.`,
        legalNoticeTitle: "CAN I BUY A BACKWATER / LAKE? NO!",
        legalNoticeText: "Lakes, backwaters, and rivers are public water commons (Kayal Puramboke) held in trust by the Revenue Department. Private title deeds cannot be registered for open water.",
        isCustomEvaluated: true,
        nearestFacilities: findNearestFacilities(lat, lng),
        overallScore: 0
      };
    }
  }

  // 4. MAINLAND EVALUATION (FOR ACTUAL REAL ESTATE / LAND IN KERALA)
  // Find nearest district
  let nearestDistrict = KERALA_DISTRICTS[0];
  let minDistrictDist = 999999;
  for (const dist of KERALA_DISTRICTS) {
    const d = calculateDistanceKm(lat, lng, dist.lat, dist.lng);
    if (d < minDistrictDist) {
      minDistrictDist = d;
      nearestDistrict = dist;
    }
  }

  const taluk = nearestDistrict.taluks[0];
  const village = taluk.villages[0];

  // Check Flood Inundation Zones
  let floodStatus = "Low Risk";
  let floodNote = "Normal upland natural drainage.";
  let isInundated2018 = false;
  for (const fz of KERALA_FLOOD_ZONES) {
    if (isPointInPolygon([lat, lng], fz.polygon)) {
      floodStatus = fz.severity === "Severe" ? "Severe Flood Risk" : "High Flood Risk";
      floodNote = `${fz.name}: ${fz.historicalNotes}`;
      isInundated2018 = true;
      break;
    }
  }

  // Check Landslide Susceptibility Zones
  let landslideStatus = "Safe / Zero Risk";
  let landslideHazard = "Zone-0";
  let landslideNote = "Gentle slope, no history of mass slope movements.";
  let slopeDeg = 2.0;

  for (const lsz of KERALA_LANDSLIDE_ZONES) {
    if (isPointInPolygon([lat, lng], lsz.polygon)) {
      landslideStatus = lsz.riskLevel;
      landslideHazard = lsz.riskLevel;
      landslideNote = `${lsz.name}: ${lsz.kSdmaNotice}`;
      slopeDeg = parseFloat(lsz.slopeAverage) || 28.0;
      break;
    }
  }

  // Approximate terrain elevation based on distance from coast (longitude) and district
  let estimatedElevation = Math.max(1, Math.round(village.elevation + (lng - 76.2) * 25));
  if (nearestDistrict.id === "idk" || nearestDistrict.id === "wyd") {
    estimatedElevation = Math.max(650, Math.round(750 + (lat - 10) * 120));
  } else if (nearestDistrict.id === "alp" && lng < 76.45) {
    estimatedElevation = -0.8;
  }

  // Wetland status estimation
  const isWetland = floodStatus === "Severe Flood Risk" || (nearestDistrict.id === "alp" && estimatedElevation <= 1);
  const classification = isWetland
    ? "Nilam (Wetland / Paddy Buffer)"
    : slopeDeg > 20
    ? "Thottam (Plantation / Hill Slope)"
    : "Purayidam (Dryland / Garden Land)";

  // Compute realistic fair value based on distance to district center
  const distFactor = Math.max(0.45, 1 - Math.min(0.65, minDistrictDist / 45));
  const computedFairValuePerAre = Math.round(village.baseFairValuePerAre * distFactor);
  const computedFairValuePerCent = Math.round(computedFairValuePerAre / ARE_TO_CENT);
  const computedMarketValuePerCent = Math.round(computedFairValuePerCent * village.marketMultiplier);

  const simulatedSurveyNo = `Re-Sy ${Math.floor((lat * 100) % 350) + 1}/${Math.floor((lng * 100) % 15) + 1}A`;
  const simulatedBlockNo = `Block ${Math.floor((lat * 10) % 25) + 1}`;

  const nearestFacilities = findNearestFacilities(lat, lng);
  const roadWidth = minDistrictDist < 8 ? 8.0 : 4.5;

  const safetyScore = computeSafetyScore(floodStatus, landslideStatus, isWetland, roadWidth);

  return {
    id: `LOC-${Math.round(lat * 1000)}-${Math.round(lng * 1000)}`,
    name: `${nearestDistrict.name} Parcel (${simulatedSurveyNo})`,
    district: nearestDistrict.name,
    taluk: taluk.name,
    village: village.name,
    surveyNo: simulatedSurveyNo,
    blockNo: simulatedBlockNo,
    desom: village.desoms[0] || `${nearestDistrict.name} Town Outer`,
    center: [lat, lng],
    polygon: [
      [lat + 0.0006, lng - 0.0006],
      [lat + 0.0008, lng + 0.0007],
      [lat - 0.0005, lng + 0.0008],
      [lat - 0.0007, lng - 0.0005]
    ],
    areaCents: 10.0,
    areaAres: parseFloat((10.0 / ARE_TO_CENT).toFixed(2)),
    classification,
    roadAccess: roadWidth >= 7 ? "PWD 2-Lane Tarred Road" : "Panchayat Tarred Road",
    roadWidthMeters: roadWidth,
    fairValuePerAre: computedFairValuePerAre,
    fairValuePerCent: computedFairValuePerCent,
    marketValuePerCent: computedMarketValuePerCent,
    isSea: false,
    isWaterbody: false,
    isBeach: false,
    waterStatus: isWetland ? "Low-lying Waterlogged Delta" : "Safe & Adequate Groundwater",
    isWetland,
    inDataBank: isWetland,
    groundWaterTableDepthMeters: isWetland ? 0.6 : 5.5,
    floodZone: {
      status: floodStatus,
      elevationMeters: estimatedElevation,
      inundatedIn2018: isInundated2018,
      distanceToMajorRiverKm: parseFloat((minDistrictDist * 0.15 + 0.8).toFixed(1)),
      riverName: nearestDistrict.id === "ekm" ? "Periyar River" : "Regional Canal / River",
      notes: floodNote
    },
    landslideZone: {
      status: landslideStatus,
      slopeDegrees: slopeDeg,
      hazardLevel: landslideHazard,
      warningNotes: landslideNote
    },
    zoning: isWetland ? "Agricultural Wetland (Act 2008)" : "Residential / Commercial Mixed",
    buildingPermitEligible: !isWetland && slopeDeg <= 25,
    kmbrCategory: minDistrictDist < 10 ? "Municipality / Corporation" : "Grama Panchayat",
    description: `Evaluated location in ${village.name}, ${taluk.name}, ${nearestDistrict.name}. Fair value calculated in compliance with Kerala Registration Dept guidelines.`,
    isCustomEvaluated: true,
    nearestFacilities,
    overallScore: safetyScore
  };
}

/**
 * Computes an overall Due-Diligence / Safety Score (0-100)
 */
function computeSafetyScore(floodStatus, landslideStatus, isWetland, roadWidth) {
  let score = 100;

  if (floodStatus.includes("Severe")) score -= 35;
  else if (floodStatus.includes("High")) score -= 22;
  else if (floodStatus.includes("Moderate")) score -= 10;

  if (landslideStatus.includes("Critical") || landslideStatus.includes("Red")) score -= 40;
  else if (landslideStatus.includes("High")) score -= 25;
  else if (landslideStatus.includes("Moderate")) score -= 12;

  if (isWetland) score -= 30;

  if (roadWidth < 3.0) score -= 15;
  else if (roadWidth < 5.0) score -= 5;

  return Math.max(15, Math.min(98, score));
}
