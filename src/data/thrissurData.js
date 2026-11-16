// BhoomiKerala - Thrissur District Exclusive Cadastral, Fair Value & Geo-Risk Database
// References: Kerala Registration Department (IGR) Fair Value Portal (igr.kerala.gov.in)
// Official Gazette Notifications for Thrissur District (All 7 Taluks & Villages)

export const THRISSUR_CENTER = [10.5276, 76.2144]; // Thrissur Swaraj Round
export const THRISSUR_BOUNDS = [
  [10.15, 75.90],  // Southwest (near Azhikode / Kodungallur coast)
  [10.85, 76.60]   // Northeast (near Chelakkara / Sholayar borders)
];

// Conversion Constants
export const ARE_TO_CENT = 2.47105;
export const CENT_TO_ARE = 1 / ARE_TO_CENT;
export const CENT_TO_SQFT = 435.6;
export const CENT_TO_SQM = 40.4686;

// All 7 Taluks of Thrissur District with complete Village registry and baseline fair values
export const THRISSUR_TALUKS = [
  {
    id: "thrissur",
    name: "Thrissur Taluk (തൃശ്ശൂർ താലൂക്ക്)",
    headquarters: "Thrissur Corporation",
    villages: [
      {
        id: "chembookavu",
        name: "Chembookavu (Round East)",
        desoms: ["Swaraj Round East", "Museum Road", "Palace Road", "Chembukkavu Temple Road"],
        baseFairValuePerAre: 3200000,
        fairValuePerCent: 1294996,
        marketMultiplier: 2.6,
        elevation: 20,
        zoneType: "Commercial / High-Density Residential",
        koleWetland: false,
        floodRisk: "Low Risk",
        surveyPrefix: "Block 12, Re-Sy 31/"
      },
      {
        id: "ayyanthole",
        name: "Ayyanthole (Civil Station / Collectorate)",
        desoms: ["Collectorate Belt", "Court Complex", "Puzhakkal Border", "Kariattukara"],
        baseFairValuePerAre: 2400000,
        fairValuePerCent: 971247,
        marketMultiplier: 2.4,
        elevation: 16,
        zoneType: "Administrative & Prime Residential Purayidam",
        koleWetland: false,
        floodRisk: "Low Risk",
        surveyPrefix: "Block 8, Re-Sy 144/"
      },
      {
        id: "ollur",
        name: "Ollur (Industrial & Residential)",
        desoms: ["Industrial Estate", "Church Junction", "Marathakkara Highway", "Chiyyaram Border"],
        baseFairValuePerAre: 1850000,
        fairValuePerCent: 748669,
        marketMultiplier: 2.2,
        elevation: 18,
        zoneType: "Industrial / Residential Purayidam",
        koleWetland: false,
        floodRisk: "Low Risk",
        surveyPrefix: "Block 19, Re-Sy 205/"
      },
      {
        id: "nadathara",
        name: "Nadathara / Ollukkara",
        desoms: ["NH 544 Highway Frontage", "Agricultural University Border", "Moorkkanikkara"],
        baseFairValuePerAre: 1950000,
        fairValuePerCent: 789138,
        marketMultiplier: 2.3,
        elevation: 22,
        zoneType: "Commercial / Highway Residential",
        koleWetland: false,
        floodRisk: "Low Risk",
        surveyPrefix: "Block 14, Re-Sy 88/"
      },
      {
        id: "puzhakkal",
        name: "Puzhakkal (Sobha City Belt)",
        desoms: ["Sobha City Road", "Puzhakkal River Bridge", "Muthuvara", "Punkunnam North"],
        baseFairValuePerAre: 2600000,
        fairValuePerCent: 1052184,
        marketMultiplier: 2.5,
        elevation: 12,
        zoneType: "High-End Commercial / Residential",
        koleWetland: false,
        floodRisk: "Moderate (River Proximity)",
        surveyPrefix: "Block 5, Re-Sy 92/"
      }
    ]
  },
  {
    id: "chalakudy",
    name: "Chalakudy Taluk (ചാലക്കുടി താലൂക്ക്)",
    headquarters: "Chalakudy Town",
    villages: [
      {
        id: "chalakudy_town",
        name: "Chalakudy Town (South Junction)",
        desoms: ["Railway Station Road", "Anamala Junction", "Market Road", "Potty Road"],
        baseFairValuePerAre: 1750000,
        fairValuePerCent: 708197,
        marketMultiplier: 2.2,
        elevation: 14,
        zoneType: "Town Commercial Purayidam",
        koleWetland: false,
        floodRisk: "High (Chalakudy River 2018 Inundated)",
        surveyPrefix: "Block 7, Re-Sy 112/"
      },
      {
        id: "meloor",
        name: "Meloor (Riverbank Plain)",
        desoms: ["Poolany", "Meloor Church Road", "Riverside", "Kuruvilassery"],
        baseFairValuePerAre: 980000,
        fairValuePerCent: 396592,
        marketMultiplier: 2.0,
        elevation: 9,
        zoneType: "Residential Purayidam (River Buffer Alert)",
        koleWetland: false,
        floodRisk: "Severe (2018 River Overbank Flooding)",
        surveyPrefix: "Block 3, Re-Sy 54/"
      },
      {
        id: "koratty",
        name: "Koratty (Infopark / NH 544)",
        desoms: ["Koratty Infopark", "Muringoor Highway", "Chirangara", "Konoor"],
        baseFairValuePerAre: 1650000,
        fairValuePerCent: 667732,
        marketMultiplier: 2.3,
        elevation: 21,
        zoneType: "Industrial / IT Corridor Purayidam",
        koleWetland: false,
        floodRisk: "Low Risk",
        surveyPrefix: "Block 11, Re-Sy 340/"
      }
    ]
  },
  {
    id: "mukundapuram",
    name: "Mukundapuram / Irinjalakuda (മുകുന്ദപുരം താലൂക്ക്)",
    headquarters: "Irinjalakuda Municipality",
    villages: [
      {
        id: "irinjalakuda",
        name: "Irinjalakuda (Koodalmanikyam)",
        desoms: ["Temple Square", "Chandakkunnu", "Bus Stand Road", "Mapranam Border"],
        baseFairValuePerAre: 1900000,
        fairValuePerCent: 768823,
        marketMultiplier: 2.2,
        elevation: 17,
        zoneType: "Heritage & Commercial Purayidam",
        koleWetland: false,
        floodRisk: "Low Risk",
        surveyPrefix: "Block 9, Re-Sy 77/"
      },
      {
        id: "kallettumkara",
        name: "Kallettumkara (Railway Belt)",
        desoms: ["Railway Station Junction", "BVM School Road", "Aloor Border"],
        baseFairValuePerAre: 1100000,
        fairValuePerCent: 445155,
        marketMultiplier: 1.9,
        elevation: 15,
        zoneType: "Residential Purayidam",
        koleWetland: false,
        floodRisk: "Low Risk",
        surveyPrefix: "Block 4, Re-Sy 190/"
      }
    ]
  },
  {
    id: "kodungallur",
    name: "Kodungallur Taluk (കൊടുങ്ങല്ലൂർ താലൂക്ക്)",
    headquarters: "Kodungallur Municipality",
    villages: [
      {
        id: "lokamaleshwaram",
        name: "Lokamaleshwaram / Chandapura",
        desoms: ["Temple Road", "Chandapura Market", "North Paravur Highway", "Cheraman Mosque Road"],
        baseFairValuePerAre: 1800000,
        fairValuePerCent: 728435,
        marketMultiplier: 2.1,
        elevation: 4.5,
        zoneType: "Historic Commercial Purayidam",
        koleWetland: false,
        floodRisk: "Moderate (Tidal River Reach)",
        surveyPrefix: "Block 6, Re-Sy 89/"
      },
      {
        id: "azhikode_kodungallur",
        name: "Azhikode / Munambam Estuary",
        desoms: ["Munakkal Beach Road", "Light House Road", "Harbour Belt"],
        baseFairValuePerAre: 1250000,
        fairValuePerCent: 505858,
        marketMultiplier: 2.0,
        elevation: 2.5,
        zoneType: "Coastal Residential Purayidam (CRZ Regulated)",
        koleWetland: false,
        floodRisk: "High (Coastal Tidal Surge)",
        surveyPrefix: "Block 2, Re-Sy 41/"
      }
    ]
  },
  {
    id: "chavakkad",
    name: "Chavakkad Taluk (ചാവക്കാട് താലൂക്ക്)",
    headquarters: "Chavakkad / Guruvayur",
    villages: [
      {
        id: "guruvayur",
        name: "Guruvayur (Temple Heritage Zone)",
        desoms: ["East Nada", "West Nada", "Outer Ring Road", "Railway Station Road"],
        baseFairValuePerAre: 3500000,
        fairValuePerCent: 1416402,
        marketMultiplier: 2.8,
        elevation: 9,
        zoneType: "Prime Pilgrimage Commercial Purayidam",
        koleWetland: false,
        floodRisk: "Low Risk",
        surveyPrefix: "Block 15, Re-Sy 210/"
      },
      {
        id: "manathala",
        name: "Manathala / Chavakkad Town",
        desoms: ["Municipal Town Hall Road", "Blangad Beach Road", "Enamakkal Road"],
        baseFairValuePerAre: 1550000,
        fairValuePerCent: 627264,
        marketMultiplier: 2.1,
        elevation: 4.0,
        zoneType: "Township Residential Purayidam",
        koleWetland: false,
        floodRisk: "Moderate (Coastal Lowland)",
        surveyPrefix: "Block 8, Re-Sy 165/"
      }
    ]
  },
  {
    id: "thalapilly",
    name: "Thalapilly Taluk / Wadakkanchery (തലപ്പിള്ളി താലൂക്ക്)",
    headquarters: "Wadakkanchery Municipality",
    villages: [
      {
        id: "wadakkanchery",
        name: "Wadakkanchery Town",
        desoms: ["Ottupara", "Railway Station Road", "Enkakad", "Kumaranellur"],
        baseFairValuePerAre: 1450000,
        fairValuePerCent: 586795,
        marketMultiplier: 2.0,
        elevation: 32,
        zoneType: "Midland Residential Purayidam",
        koleWetland: false,
        floodRisk: "Low Risk",
        surveyPrefix: "Block 10, Re-Sy 95/"
      },
      {
        id: "chelakkara",
        name: "Chelakkara",
        desoms: ["Main Road", "Killimangalam Border", "Pangavu", "Venganellur"],
        baseFairValuePerAre: 850000,
        fairValuePerCent: 344004,
        marketMultiplier: 1.8,
        elevation: 45,
        zoneType: "Agricultural / Residential Purayidam",
        koleWetland: false,
        floodRisk: "Low Risk",
        surveyPrefix: "Block 13, Re-Sy 120/"
      }
    ]
  },
  {
    id: "kunnamkulam",
    name: "Kunnamkulam Taluk (കുന്നത്ത്കുളം താലൂക്ക്)",
    headquarters: "Kunnamkulam Municipality",
    villages: [
      {
        id: "kunnamkulam_town",
        name: "Kunnamkulam Commercial Hub",
        desoms: ["Market Road", "Porkulam Road", "Guruvayur Road", "Arthat Border"],
        baseFairValuePerAre: 2100000,
        fairValuePerCent: 849841,
        marketMultiplier: 2.3,
        elevation: 25,
        zoneType: "Commercial Trading Purayidam",
        koleWetland: false,
        floodRisk: "Low Risk",
        surveyPrefix: "Block 7, Re-Sy 315/"
      }
    ]
  }
];

// Pre-surveyed Realistic Land Parcels in Thrissur District with EXACT SPECIFIED DIMENSIONS
export const THRISSUR_SPECIFIED_PARCELS = [
  {
    id: "TSR-PCL-001",
    name: "Ayyanthole Collectorate Villa Plot",
    taluk: "Thrissur",
    village: "Ayyanthole",
    desom: "Court Complex Road",
    surveyNo: "Re-Sy 144/3B",
    blockNo: "Block 8",
    center: [10.5342, 76.1950],
    specifiedAreaCents: 8.50, // EXACT SPECIFIED AREA
    specifiedAreaAres: 3.44,
    specifiedAreaSqFt: 3702.6,
    dimensions: {
      frontageFt: 52.0,   // Road Frontage
      depthFt: 71.2,      // Depth
      rearFt: 52.0,       // Back boundary
      sideFt: 71.2,       // Side boundary
      roadWidthMeters: 5.5,
      roadType: "Panchayat Tarred Road"
    },
    polygon: [
      [10.5345, 76.1946],
      [10.5347, 76.1954],
      [10.5339, 76.1956],
      [10.5337, 76.1948]
    ],
    classification: "Purayidam (Dryland - Ready for Building)",
    isBuyable: true,
    fairValuePerAre: 2400000,
    fairValuePerCent: 971247,
    marketValuePerCent: 2350000,
    floodZone: "Safe (Elevation 16m MSL, Zero 2018 Flood Inundation)",
    landslideRisk: "Zero Risk (Stable Laterite Soil)",
    waterStatus: "Perennial Well Water (Depth 5.2m)",
    kmbrStatus: "Meets KMBR 5.5m road requirement for Building Permit",
    description: "Rectangular villa plot with 52 ft road frontage in Ayyanthole near District Collectorate. Clean freehold title, single owner, mutation completed."
  },
  {
    id: "TSR-PCL-002",
    name: "Sobha City Highway Commercial Plot",
    taluk: "Thrissur",
    village: "Puzhakkal",
    desom: "Guruvayur Highway Frontage",
    surveyNo: "Re-Sy 92/1A",
    blockNo: "Block 5",
    center: [10.5520, 76.1880],
    specifiedAreaCents: 15.00, // EXACT SPECIFIED AREA
    specifiedAreaAres: 6.07,
    specifiedAreaSqFt: 6534.0,
    dimensions: {
      frontageFt: 75.0,
      depthFt: 87.1,
      rearFt: 75.0,
      sideFt: 87.1,
      roadWidthMeters: 14.0,
      roadType: "State Highway 4-Lane"
    },
    polygon: [
      [10.5525, 76.1874],
      [10.5528, 76.1888],
      [10.5515, 76.1891],
      [10.5512, 76.1877]
    ],
    classification: "Commercial Purayidam (Highway Frontage)",
    isBuyable: true,
    fairValuePerAre: 2600000,
    fairValuePerCent: 1052184,
    marketValuePerCent: 2800000,
    floodZone: "Low-Moderate Risk (Puzhakkal River 450m away)",
    landslideRisk: "Zero Risk",
    waterStatus: "KWA Municipal Water Pipeline + Well",
    kmbrStatus: "Eligible for Multi-Storey Commercial Building",
    description: "Prime commercial plot with 75 ft wide highway frontage near Sobha City Mall. Ideal for showrooms, corporate offices or luxury apartments."
  },
  {
    id: "TSR-PCL-003",
    name: "Chalakudy South Junction Residential Plot",
    taluk: "Chalakudy",
    village: "Chalakudy Town",
    desom: "Railway Station Road",
    surveyNo: "Re-Sy 112/5C",
    blockNo: "Block 7",
    center: [10.3080, 76.3350],
    specifiedAreaCents: 10.00, // EXACT SPECIFIED AREA
    specifiedAreaAres: 4.05,
    specifiedAreaSqFt: 4356.0,
    dimensions: {
      frontageFt: 55.0,
      depthFt: 79.2,
      rearFt: 55.0,
      sideFt: 79.2,
      roadWidthMeters: 4.5,
      roadType: "Municipality Tarred Road"
    },
    polygon: [
      [10.3085, 76.3344],
      [10.3087, 76.3357],
      [10.3075, 76.3360],
      [10.3073, 76.3347]
    ],
    classification: "Purayidam (Residential - Flood Mitigation Recommended)",
    isBuyable: true,
    fairValuePerAre: 1750000,
    fairValuePerCent: 708197,
    marketValuePerCent: 1550000,
    floodZone: "High Flood Caution (Submerged 1.8m in 2018 Chalakudy River overflow; Stilt foundation recommended)",
    landslideRisk: "Zero Risk",
    waterStatus: "Adequate Water Table (1.5m depth)",
    kmbrStatus: "Municipality Residential Permit with elevated plinth",
    description: "10 Cents residential plot within 800m of Chalakudy Railway Station. Note: Experienced water ingress during August 2018 dam discharge."
  },
  {
    id: "TSR-PCL-004",
    name: "Guruvayur Temple Outer Ring Villa Plot",
    taluk: "Chavakkad",
    village: "Guruvayur",
    desom: "East Nada Ring Road",
    surveyNo: "Re-Sy 210/8",
    blockNo: "Block 15",
    center: [10.5960, 76.0420],
    specifiedAreaCents: 6.25, // EXACT SPECIFIED AREA
    specifiedAreaAres: 2.53,
    specifiedAreaSqFt: 2722.5,
    dimensions: {
      frontageFt: 45.0,
      depthFt: 60.5,
      rearFt: 45.0,
      sideFt: 60.5,
      roadWidthMeters: 5.0,
      roadType: "Guruvayur Municipality Tar Road"
    },
    polygon: [
      [10.5964, 76.0415],
      [10.5966, 76.0426],
      [10.5956, 76.0428],
      [10.5954, 76.0417]
    ],
    classification: "Purayidam (Pilgrimage Residential / Guest House)",
    isBuyable: true,
    fairValuePerAre: 3500000,
    fairValuePerCent: 1416402,
    marketValuePerCent: 3200000,
    floodZone: "Zero Flood Risk (Safe Elevation)",
    landslideRisk: "Zero Risk",
    waterStatus: "Clean Ground Water + KWA Supply",
    kmbrStatus: "Guruvayur Special Heritage Building Rules apply",
    description: "Prestigious 6.25 Cents rectangular plot located 650m from Guruvayur Sree Krishna Temple East Gate. Highly sought after for devotional guest houses."
  },
  {
    id: "TSR-PCL-005",
    name: "Irinjalakuda Town Villa Plot",
    taluk: "Mukundapuram",
    village: "Irinjalakuda",
    desom: "Chandakkunnu Road",
    surveyNo: "Re-Sy 77/4",
    blockNo: "Block 9",
    center: [10.3540, 76.2110],
    specifiedAreaCents: 12.00, // EXACT SPECIFIED AREA
    specifiedAreaAres: 4.86,
    specifiedAreaSqFt: 5227.2,
    dimensions: {
      frontageFt: 60.0,
      depthFt: 87.1,
      rearFt: 60.0,
      sideFt: 87.1,
      roadWidthMeters: 6.0,
      roadType: "Municipal Paved Road"
    },
    polygon: [
      [10.3546, 76.2104],
      [10.3548, 76.2118],
      [10.3534, 76.2120],
      [10.3532, 76.2106]
    ],
    classification: "Purayidam (Prime Residential)",
    isBuyable: true,
    fairValuePerAre: 1900000,
    fairValuePerCent: 768823,
    marketValuePerCent: 1650000,
    floodZone: "Safe (Zero Flood Risk)",
    landslideRisk: "Zero Risk",
    waterStatus: "Excellent Well Water (Depth 4.8m)",
    kmbrStatus: "Municipality Building Permit Approved",
    description: "Quiet residential layout in Irinjalakuda near Koodalmanikyam Temple. Compound walled, level ground, ready for immediate construction."
  }
];

// Thrissur Hazard Layers
export const THRISSUR_FLOOD_ZONES = [
  {
    id: "FL-TSR-CHALAKUDY",
    name: "Chalakudy River Basin (Meloor - Chalakudy - Koratty)",
    severity: "High Hazard Inundation Zone",
    color: "#0284c7",
    fillColor: "#38bdf8",
    fillOpacity: 0.35,
    polygon: [
      [10.350, 76.280],
      [10.380, 76.420],
      [10.280, 76.410],
      [10.260, 76.300]
    ],
    historicalNotes: "Chalakudy town, Meloor riverbank colonies, and railway underpass submerged up to 2.8m in August 2018 during peak Sholayar/Peringalkuthu release."
  },
  {
    id: "FL-TSR-KOLE",
    name: "Thrissur Kole Wetland Basin (തൃശ്ശൂർ കോൾ നിലങ്ങൾ)",
    severity: "Protected Ramsar Wetland (Submerged Delta)",
    color: "#0369a1",
    fillColor: "#0284c7",
    fillOpacity: 0.45,
    polygon: [
      [10.580, 76.080],
      [10.600, 76.160],
      [10.450, 76.180],
      [10.420, 76.090]
    ],
    historicalNotes: "Low-lying Kole paddy basin fed by Karuvannur & Kechery rivers. Geographically serves as flood sponge for Thrissur. Conversion strictly barred under Act 28/2008."
  }
];

// Key POIs in Thrissur District
export const THRISSUR_POIS = [
  { name: "Jubilee Mission Medical College Hospital", category: "hospital", lat: 10.5192, lng: 76.2305, type: "Multi-Specialty Medical College" },
  { name: "Amala Institute of Medical Sciences", category: "hospital", lat: 10.5694, lng: 76.1678, type: "Super-Specialty Hospital" },
  { name: "Government Medical College Thrissur (MGM)", category: "hospital", lat: 10.6214, lng: 76.2052, type: "Apex Govt Medical College" },
  { name: "Mother Hospital Olari", category: "hospital", lat: 10.5120, lng: 76.1850, type: "Tertiary Care Hospital" },
  { name: "Thrissur Railway Station (Junction)", category: "transit", lat: 10.5186, lng: 76.2112, type: "Major Railway Junction" },
  { name: "Chalakudy Railway Station", category: "transit", lat: 10.3060, lng: 76.3320, type: "Express Railway Station" },
  { name: "Guruvayur Railway Station", category: "transit", lat: 10.5920, lng: 76.0460, type: "Terminal Railway Station" },
  { name: "Wadakkanchery Railway Station", category: "transit", lat: 10.6650, lng: 76.2420, type: "Passenger & Express Station" },
  { name: "KSRTC Central Bus Stand Thrissur", category: "transit", lat: 10.5178, lng: 76.2125, type: "Central Bus Terminal" },
  { name: "Sobha City Mall (Puzhakkal)", category: "shopping", lat: 10.5592, lng: 76.1950, type: "Mega Shopping Mall" },
  { name: "Selex Mall East Fort Thrissur", category: "shopping", lat: 10.5230, lng: 76.2250, type: "Shopping Center" },
  { name: "Sree Krishna Temple Guruvayur", category: "temple", lat: 10.5946, lng: 76.0384, type: "Pilgrimage Center" },
  { name: "Vadakkumnathan Shiva Temple", category: "temple", lat: 10.5245, lng: 76.2135, type: "UNESCO Heritage Monument" }
];
