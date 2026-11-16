// BhoomiKerala - Comprehensive Geo-spatial & Valuation Data Engine for Kerala
// References: Kerala Registration Department (IGR) Fair Value Portal (igr.kerala.gov.in)
// and Kerala State Disaster Management Authority (KSDMA) hazard mapping.

export const KERALA_CENTER = [10.1632, 76.6413]; // Lat, Lng
export const KERALA_BOUNDS = [
  [8.18, 74.85],  // Southwest (near Kanyakumari/Parassala)
  [12.85, 77.40]  // Northeast (near Kasaragod/Manjeshwaram)
];

// 1 Cent = 435.6 sq ft = 40.4686 sq m
// 1 Are = 100 sq m = 2.47105 Cents
// Therefore 1 Cent = 1 / 2.47105 Are = ~0.404686 Are
export const ARE_TO_CENT = 2.47105;
export const CENT_TO_ARE = 1 / ARE_TO_CENT;
export const CENT_TO_SQFT = 435.6;
export const CENT_TO_SQM = 40.4686;

// Kerala 14 Districts with Taluks, Villages and Representative Baseline Fair Values
export const KERALA_DISTRICTS = [
  {
    id: "ekm",
    name: "Ernakulam",
    malayalam: "എറണാകുളം",
    headquarters: "Kakkanad",
    lat: 9.9816,
    lng: 76.2999,
    zoom: 12,
    taluks: [
      {
        id: "kanayannur",
        name: "Kanayannur (Kochi)",
        villages: [
          {
            id: "kakkanad",
            name: "Kakkanad",
            desoms: ["Infopark Phase 1", "Civil Station", "Kakkanad Junction", "Vazhakkala Border", "Chittethukara"],
            baseFairValuePerAre: 1850000,
            marketMultiplier: 2.4,
            elevation: 28,
            floodSusceptibility: "Low",
            landslideSusceptibility: "Very Low",
            defaultType: "Commercial / Residential Purayidam",
            soilType: "Laterite Red Earth",
            surveyPrefix: "Block 10, Re-Sy 142/"
          },
          {
            id: "edappally_north",
            name: "Edappally North",
            desoms: ["Lulu Mall Belt", "Toll Junction", "Ponekkara", "Kunnumpuram"],
            baseFairValuePerAre: 2600000,
            marketMultiplier: 2.8,
            elevation: 8,
            floodSusceptibility: "Moderate",
            landslideSusceptibility: "None",
            defaultType: "Commercial Purayidam",
            soilType: "Alluvial Clay",
            surveyPrefix: "Block 15, Re-Sy 388/"
          },
          {
            id: "ernakulam_town",
            name: "Ernakulam (Marine Drive / MG Road)",
            desoms: ["Marine Drive Walkway", "MG Road North", "Broadway", "High Court Junction"],
            baseFairValuePerAre: 4200000,
            marketMultiplier: 3.1,
            elevation: 4,
            floodSusceptibility: "Moderate",
            landslideSusceptibility: "None",
            defaultType: "Prime Commercial",
            soilType: "Coastal Alluvium",
            surveyPrefix: "Block 21, Re-Sy 72/"
          },
          {
            id: "maradu",
            name: "Maradu",
            desoms: ["Kundannoor Junction", "Nettoor Border", "Maradu Market", "Champakkara"],
            baseFairValuePerAre: 1950000,
            marketMultiplier: 2.5,
            elevation: 3,
            floodSusceptibility: "High",
            landslideSusceptibility: "None",
            defaultType: "Residential Purayidam (CRZ Caution)",
            soilType: "Backwater Coastal Clay",
            surveyPrefix: "Block 7, Re-Sy 219/"
          }
        ]
      },
      {
        id: "aluva",
        name: "Aluva",
        villages: [
          {
            id: "aluva_west",
            name: "Aluva West (Bank of Periyar)",
            desoms: ["Manappuram", "Railway Station Road", "Thottakkattukara", "Desom"],
            baseFairValuePerAre: 1750000,
            marketMultiplier: 2.1,
            elevation: 7,
            floodSusceptibility: "High", // Periyar 2018 flood zone
            landslideSusceptibility: "None",
            defaultType: "Residential Purayidam",
            soilType: "Riverine Alluvial",
            surveyPrefix: "Block 4, Re-Sy 85/"
          },
          {
            id: "choornikkara",
            name: "Choornikkara",
            desoms: ["Ambattukavu Metro", "Companypady", "Thayikkattukara"],
            baseFairValuePerAre: 1400000,
            marketMultiplier: 2.2,
            elevation: 11,
            floodSusceptibility: "Moderate",
            landslideSusceptibility: "None",
            defaultType: "Residential / Commercial",
            soilType: "Riverine Clay",
            surveyPrefix: "Block 8, Re-Sy 112/"
          }
        ]
      },
      {
        id: "kochi_taluk",
        name: "Kochi (Fort Kochi / Mattancherry)",
        villages: [
          {
            id: "fort_kochi",
            name: "Fort Kochi",
            desoms: ["Princess Street", "Dutch Square", "Beach Road", "Bazaar Road"],
            baseFairValuePerAre: 2800000,
            marketMultiplier: 2.9,
            elevation: 3,
            floodSusceptibility: "Moderate",
            landslideSusceptibility: "None",
            defaultType: "Heritage / Commercial (CRZ-II)",
            soilType: "Sandy Alluvial",
            surveyPrefix: "Block 1, Re-Sy 45/"
          }
        ]
      }
    ]
  },
  {
    id: "tvm",
    name: "Thiruvananthapuram",
    malayalam: "തിരുവനന്തപുരം",
    headquarters: "Thiruvananthapuram",
    lat: 8.5241,
    lng: 76.9366,
    zoom: 12,
    taluks: [
      {
        id: "tvm_taluk",
        name: "Thiruvananthapuram",
        villages: [
          {
            id: "kowdiar",
            name: "Kowdiar",
            desoms: ["Palace Road", "Golf Links", "Jawahar Nagar", "Devaswom Board"],
            baseFairValuePerAre: 3500000,
            marketMultiplier: 2.6,
            elevation: 42,
            floodSusceptibility: "Very Low",
            landslideSusceptibility: "None",
            defaultType: "High-End Residential Purayidam",
            soilType: "Laterite Red Soil",
            surveyPrefix: "Block 14, Re-Sy 204/"
          },
          {
            id: "kazhakoottam",
            name: "Kazhakoottam (Technopark)",
            desoms: ["Technopark Phase 1", "Karyavattom", "Kulathoor", "Chanthavila"],
            baseFairValuePerAre: 2100000,
            marketMultiplier: 2.4,
            elevation: 25,
            floodSusceptibility: "Low",
            landslideSusceptibility: "None",
            defaultType: "IT Corridor Commercial / Residential",
            soilType: "Lateritic Loam",
            surveyPrefix: "Block 6, Re-Sy 340/"
          },
          {
            id: "pattom",
            name: "Pattom",
            desoms: ["Pattom Palace", "Mar Ivanios Hill", "Kumarapuram Road", "Plamoodu"],
            baseFairValuePerAre: 2900000,
            marketMultiplier: 2.5,
            elevation: 30,
            floodSusceptibility: "Low",
            landslideSusceptibility: "None",
            defaultType: "Prime Commercial / Residential",
            soilType: "Laterite",
            surveyPrefix: "Block 11, Re-Sy 98/"
          }
        ]
      },
      {
        id: "neyyattinkara",
        name: "Neyyattinkara",
        villages: [
          {
            id: "vizhinjam",
            name: "Vizhinjam (Port Hub)",
            desoms: ["Port Road", "Harbour View", "Mullur", "Kottukal"],
            baseFairValuePerAre: 1800000,
            marketMultiplier: 3.2,
            elevation: 18,
            floodSusceptibility: "Low",
            landslideSusceptibility: "Low",
            defaultType: "Port Vicinity Commercial (CRZ-III)",
            soilType: "Coastal Laterite",
            surveyPrefix: "Block 3, Re-Sy 177/"
          }
        ]
      }
    ]
  },
  {
    id: "clt",
    name: "Kozhikode",
    malayalam: "കോഴിക്കോട്",
    headquarters: "Kozhikode",
    lat: 11.2588,
    lng: 75.7804,
    zoom: 12,
    taluks: [
      {
        id: "kozhikode_taluk",
        name: "Kozhikode",
        villages: [
          {
            id: "nadakkavu",
            name: "Nadakkavu",
            desoms: ["Vandipetta", "English Church Road", "Bilathikulam", "East Nadakkavu"],
            baseFairValuePerAre: 2750000,
            marketMultiplier: 2.3,
            elevation: 12,
            floodSusceptibility: "Low",
            landslideSusceptibility: "None",
            defaultType: "Commercial / Residential Purayidam",
            soilType: "Laterite Red Loam",
            surveyPrefix: "Block 9, Re-Sy 64/"
          },
          {
            id: "thondayad",
            name: "Thondayad (Cyberpark)",
            desoms: ["Bypass Junction", "Nellikkode", "Cyberpark Hub", "Palazhi"],
            baseFairValuePerAre: 1900000,
            marketMultiplier: 2.5,
            elevation: 19,
            floodSusceptibility: "Low",
            landslideSusceptibility: "None",
            defaultType: "Commercial / IT Zone",
            soilType: "Laterite",
            surveyPrefix: "Block 18, Re-Sy 211/"
          }
        ]
      }
    ]
  },
  {
    id: "tsr",
    name: "Thrissur",
    malayalam: "തൃശ്ശൂർ",
    headquarters: "Thrissur",
    lat: 10.5276,
    lng: 76.2144,
    zoom: 12,
    taluks: [
      {
        id: "thrissur_taluk",
        name: "Thrissur",
        villages: [
          {
            id: "chembookavu",
            name: "Chembookavu (Round East)",
            desoms: ["Round East", "Museum Road", "Chembukkavu Temple Road", "Palace Road"],
            baseFairValuePerAre: 3100000,
            marketMultiplier: 2.4,
            elevation: 20,
            floodSusceptibility: "Low",
            landslideSusceptibility: "None",
            defaultType: "Prime Commercial",
            soilType: "Laterite",
            surveyPrefix: "Block 12, Re-Sy 31/"
          }
        ]
      },
      {
        id: "chalakudy_taluk",
        name: "Chalakudy",
        villages: [
          {
            id: "chalakudy_town",
            name: "Chalakudy Town (Chalakudy River)",
            desoms: ["River View Road", "South Junction", "Potty Road", "Anamala Junction"],
            baseFairValuePerAre: 1250000,
            marketMultiplier: 2.0,
            elevation: 14,
            floodSusceptibility: "High", // Severe 2018 river flooding
            landslideSusceptibility: "Low",
            defaultType: "Residential Purayidam",
            soilType: "Alluvial Sandy Loam",
            surveyPrefix: "Block 5, Re-Sy 152/"
          }
        ]
      }
    ]
  },
  {
    id: "alp",
    name: "Alappuzha",
    malayalam: "ആലപ്പുഴ",
    headquarters: "Alappuzha",
    lat: 9.4981,
    lng: 76.3388,
    zoom: 12,
    taluks: [
      {
        id: "kuttanad_taluk",
        name: "Kuttanad",
        villages: [
          {
            id: "nedumudi",
            name: "Nedumudi (Below Sea Level)",
            desoms: ["Champakkulam Boundary", "Riverbank North", "Ponga", "Chennamkary"],
            baseFairValuePerAre: 450000,
            marketMultiplier: 1.8,
            elevation: -1.5, // Below sea level delta
            floodSusceptibility: "Severe",
            landslideSusceptibility: "None",
            defaultType: "Nilam / Paddy Field (Act 2008 Protected)",
            soilType: "Kari / Peat Clay",
            surveyPrefix: "Block 2, Re-Sy 94/"
          }
        ]
      },
      {
        id: "cherthala_taluk",
        name: "Cherthala",
        villages: [
          {
            id: "arookkutty",
            name: "Aroor / Arookkutty",
            desoms: ["Industrial Belt", "Vembanad Lake Side", "National Highway Road"],
            baseFairValuePerAre: 1100000,
            marketMultiplier: 2.1,
            elevation: 2.5,
            floodSusceptibility: "High",
            landslideSusceptibility: "None",
            defaultType: "Industrial / Residential (CRZ buffer)",
            soilType: "Coastal Sand / Alluvium",
            surveyPrefix: "Block 8, Re-Sy 410/"
          }
        ]
      }
    ]
  },
  {
    id: "wyd",
    name: "Wayanad",
    malayalam: "വയനാട്",
    headquarters: "Kalpetta",
    lat: 11.6050,
    lng: 76.0828,
    zoom: 11,
    taluks: [
      {
        id: "vythiri_taluk",
        name: "Vythiri (Meppadi / Chooralmala)",
        villages: [
          {
            id: "meppadi",
            name: "Meppadi (Landslide Red Zone)",
            desoms: ["Chooralmala Belt", "Mundakkai Range", "Vellarimala Foot", "Tea Estate Valley"],
            baseFairValuePerAre: 320000,
            marketMultiplier: 1.6,
            elevation: 780,
            floodSusceptibility: "Moderate", // flash flood
            landslideSusceptibility: "Critical Red Zone",
            defaultType: "Plantation / Hill Slope (High Geological Risk)",
            soilType: "Forest Mountain Loam / High Porosity",
            surveyPrefix: "Block 19, Re-Sy 502/"
          },
          {
            id: "kalpetta_town",
            name: "Kalpetta Town",
            desoms: ["Bypass Junction", "Civil Station Road", "Munderi", "Pinangode Road"],
            baseFairValuePerAre: 980000,
            marketMultiplier: 2.0,
            elevation: 750,
            floodSusceptibility: "Low",
            landslideSusceptibility: "Moderate",
            defaultType: "Township Residential Purayidam",
            soilType: "Lateritic Hill Soil",
            surveyPrefix: "Block 4, Re-Sy 88/"
          }
        ]
      }
    ]
  },
  {
    id: "idk",
    name: "Idukki",
    malayalam: "ഇടുക്കി",
    headquarters: "Painavu",
    lat: 9.8500,
    lng: 76.9800,
    zoom: 11,
    taluks: [
      {
        id: "devikulam_taluk",
        name: "Devikulam (Munnar)",
        villages: [
          {
            id: "munnar",
            name: "Kannan Devan Hills (Munnar)",
            desoms: ["Old Munnar", "Mattupetty Road", "Nullatanni", "Tea Valley"],
            baseFairValuePerAre: 850000,
            marketMultiplier: 2.8,
            elevation: 1530,
            floodSusceptibility: "Low",
            landslideSusceptibility: "High",
            defaultType: "Cardamom / Tea Settlement (Title Verification Mandatory)",
            soilType: "Mountain Humus Soil",
            surveyPrefix: "Block 32, Re-Sy 21/"
          }
        ]
      }
    ]
  },
  {
    id: "ktm",
    name: "Kottayam",
    malayalam: "കോട്ടയം",
    headquarters: "Kottayam",
    lat: 9.5916,
    lng: 76.5222,
    zoom: 12,
    taluks: [
      {
        id: "kottayam_taluk",
        name: "Kottayam",
        villages: [
          {
            id: "kumaranalloor",
            name: "Kumaranalloor",
            desoms: ["Temple View", "M.C Road North", "Perumbaikad Border"],
            baseFairValuePerAre: 1450000,
            marketMultiplier: 2.1,
            elevation: 14,
            floodSusceptibility: "Low",
            landslideSusceptibility: "None",
            defaultType: "Residential Purayidam",
            soilType: "Laterite Loam",
            surveyPrefix: "Block 11, Re-Sy 77/"
          }
        ]
      }
    ]
  },
  {
    id: "pkd",
    name: "Palakkad",
    malayalam: "പാലക്കാട്",
    headquarters: "Palakkad",
    lat: 10.7867,
    lng: 76.6548,
    zoom: 12,
    taluks: [
      {
        id: "palakkad_taluk",
        name: "Palakkad",
        villages: [
          {
            id: "palakkad_town",
            name: "Palakkad (Fort Maidan)",
            desoms: ["Fort South", "TB Road", "Kunnathurmedu", "Robinson Road"],
            baseFairValuePerAre: 1650000,
            marketMultiplier: 2.2,
            elevation: 84,
            floodSusceptibility: "Very Low",
            landslideSusceptibility: "None",
            defaultType: "Commercial / Residential",
            soilType: "Black Cotton / Laterite Mix",
            surveyPrefix: "Block 7, Re-Sy 190/"
          }
        ]
      }
    ]
  },
  {
    id: "mlp",
    name: "Malappuram",
    malayalam: "മലപ്പുറം",
    headquarters: "Malappuram",
    lat: 11.0732,
    lng: 76.0740,
    zoom: 12,
    taluks: [
      {
        id: "ernad_taluk",
        name: "Ernad (Manjeri)",
        villages: [
          {
            id: "manjeri",
            name: "Manjeri Town",
            desoms: ["Court Road", "Pandikkad Road", "Vettekode", "Kacherippadi"],
            baseFairValuePerAre: 1350000,
            marketMultiplier: 2.2,
            elevation: 38,
            floodSusceptibility: "Low",
            landslideSusceptibility: "Low",
            defaultType: "Township Purayidam",
            soilType: "Laterite Soil",
            surveyPrefix: "Block 14, Re-Sy 315/"
          }
        ]
      }
    ]
  },
  {
    id: "knr",
    name: "Kannur",
    malayalam: "കണ്ണൂർ",
    headquarters: "Kannur",
    lat: 11.8745,
    lng: 75.3704,
    zoom: 12,
    taluks: [
      {
        id: "kannur_taluk",
        name: "Kannur",
        villages: [
          {
            id: "thalap",
            name: "Thalap",
            desoms: ["Civil Station East", "AKG Hospital Road", "Kakkanad Road", "Thana Junction"],
            baseFairValuePerAre: 2150000,
            marketMultiplier: 2.3,
            elevation: 22,
            floodSusceptibility: "Very Low",
            landslideSusceptibility: "None",
            defaultType: "Commercial / Residential Purayidam",
            soilType: "Laterite Hard Crust",
            surveyPrefix: "Block 8, Re-Sy 105/"
          }
        ]
      }
    ]
  },
  {
    id: "ksd",
    name: "Kasaragod",
    malayalam: "കാസർഗോഡ്",
    headquarters: "Kasaragod",
    lat: 12.5102,
    lng: 74.9852,
    zoom: 12,
    taluks: [
      {
        id: "kasaragod_taluk",
        name: "Kasaragod",
        villages: [
          {
            id: "kasaragod_town",
            name: "Kasaragod Town",
            desoms: ["New Bus Stand", "Vidyanagar Junction", "Karanakkad", "Nullipady"],
            baseFairValuePerAre: 1400000,
            marketMultiplier: 2.1,
            elevation: 19,
            floodSusceptibility: "Low",
            landslideSusceptibility: "None",
            defaultType: "Commercial / Residential Purayidam",
            soilType: "Coastal Sand & Laterite",
            surveyPrefix: "Block 10, Re-Sy 260/"
          }
        ]
      }
    ]
  },
  {
    id: "klm",
    name: "Kollam",
    malayalam: "കൊല്ലം",
    headquarters: "Kollam",
    lat: 8.8932,
    lng: 76.6141,
    zoom: 12,
    taluks: [
      {
        id: "kollam_taluk",
        name: "Kollam",
        villages: [
          {
            id: "kollam_town",
            name: "Kollam West (Ashtamudi Vicinity)",
            desoms: ["Chinnakkada", "Asramam", "Thevally", "Cantonment"],
            baseFairValuePerAre: 2300000,
            marketMultiplier: 2.3,
            elevation: 7,
            floodSusceptibility: "Moderate",
            landslideSusceptibility: "None",
            defaultType: "Township Purayidam (Lake Buffer)",
            soilType: "Coastal Sandy Alluvial",
            surveyPrefix: "Block 16, Re-Sy 144/"
          }
        ]
      }
    ]
  },
  {
    id: "pta",
    name: "Pathanamthitta",
    malayalam: "പത്തനംതിട്ട",
    headquarters: "Pathanamthitta",
    lat: 9.2648,
    lng: 76.7870,
    zoom: 12,
    taluks: [
      {
        id: "kozhencherry_taluk",
        name: "Kozhencherry / Aranmula",
        villages: [
          {
            id: "aranmula",
            name: "Aranmula (Pamba Basin)",
            desoms: ["Parthasarathy Temple Road", "Mallappuzhassery", "Kadapra", "Aranmula West"],
            baseFairValuePerAre: 880000,
            marketMultiplier: 1.9,
            elevation: 11,
            floodSusceptibility: "High", // Severe 2018 Pamba flood
            landslideSusceptibility: "None",
            defaultType: "Heritage Residential / Nilam Fringe",
            soilType: "Riverine Alluvial Loam",
            surveyPrefix: "Block 7, Re-Sy 83/"
          }
        ]
      }
    ]
  }
];

// Curated Sample Cadastral Parcels with exact boundary polygons for instant interactive inspection
export const SAMPLE_LAND_PARCELS = [
  {
    id: "PCL-EKM-001",
    name: "Infopark Tech Corridor Plot",
    district: "Ernakulam",
    taluk: "Kanayannur",
    village: "Kakkanad",
    surveyNo: "Re-Sy 142/4B",
    blockNo: "Block 10",
    desom: "Infopark Phase 1 Road",
    center: [10.0125, 76.3620],
    polygon: [
      [10.0132, 76.3614],
      [10.0135, 76.3628],
      [10.0118, 76.3632],
      [10.0115, 76.3618]
    ],
    areaCents: 15.5,
    areaAres: 6.27,
    classification: "Purayidam (Dry Land)",
    roadAccess: "PWD 4-Lane Road (Infopark Expressway)",
    roadWidthMeters: 22,
    fairValuePerAre: 2400000,
    fairValuePerCent: 971247, // 2400000 / 2.47105
    marketValuePerCent: 2450000,
    waterStatus: "Safe & Well Drained",
    isWetland: false,
    inDataBank: false,
    groundWaterTableDepthMeters: 4.8,
    floodZone: {
      status: "Low Risk",
      elevationMeters: 31,
      inundatedIn2018: false,
      distanceToMajorRiverKm: 4.2,
      riverName: "Chitrapuzha River"
    },
    landslideZone: {
      status: "Safe / Negligible",
      slopeDegrees: 2.1,
      hazardLevel: "Zone-0 (Zero Risk)"
    },
    zoning: "Commercial / High Density Mixed Residential",
    buildingPermitEligible: true,
    kmbrCategory: "Corporation/Municipality Type 1",
    description: "Prime rectangular plot with 24-meter frontage on Infopark Express highway. Fully developed dryland, no wetland conversion needed."
  },
  {
    id: "PCL-EKM-002",
    name: "Periyar Waterfront Residential Plot",
    district: "Ernakulam",
    taluk: "Aluva",
    village: "Aluva West",
    surveyNo: "Re-Sy 85/12A",
    blockNo: "Block 4",
    desom: "Manappuram Bank",
    center: [10.1110, 76.3530],
    polygon: [
      [10.1118, 76.3522],
      [10.1121, 76.3539],
      [10.1102, 76.3543],
      [10.1099, 76.3526]
    ],
    areaCents: 12.0,
    areaAres: 4.85,
    classification: "Purayidam with River Buffer Caution",
    roadAccess: "Panchayat Tarred Road (5.5m width)",
    roadWidthMeters: 5.5,
    fairValuePerAre: 1750000,
    fairValuePerCent: 708197,
    marketValuePerCent: 1450000,
    waterStatus: "Riverine Waterfront (High Water Table)",
    isWetland: false,
    inDataBank: false,
    groundWaterTableDepthMeters: 1.2,
    floodZone: {
      status: "High Flood Risk",
      elevationMeters: 6.5,
      inundatedIn2018: true,
      inundationLevel2018Meters: 2.4, // Submerged in 2018 Periyar surge
      distanceToMajorRiverKm: 0.08,
      riverName: "Periyar River"
    },
    landslideZone: {
      status: "Safe from Slides (Riverbank Scouring Caution)",
      slopeDegrees: 1.2,
      hazardLevel: "Zone-0"
    },
    zoning: "Residential (CRZ / River Buffer Setback 50m applies)",
    buildingPermitEligible: true,
    kmbrCategory: "Municipality Riverfront",
    description: "Scenic plot right next to Periyar river. Note: Submerged under 2.4m water during 2018 deluge. Requires stilt foundation or flood-proof construction."
  },
  {
    id: "PCL-TVM-001",
    name: "Kowdiar Prime Villa Plot",
    district: "Thiruvananthapuram",
    taluk: "Thiruvananthapuram",
    village: "Kowdiar",
    surveyNo: "Re-Sy 204/9",
    blockNo: "Block 14",
    desom: "Golf Links Avenue",
    center: [8.5280, 76.9610],
    polygon: [
      [8.5288, 76.9602],
      [8.5291, 76.9618],
      [8.5273, 76.9622],
      [8.5270, 76.9606]
    ],
    areaCents: 10.0,
    areaAres: 4.04,
    classification: "Purayidam (Prime Residential)",
    roadAccess: "Corporation Avenue Road (12m width)",
    roadWidthMeters: 12,
    fairValuePerAre: 3500000,
    fairValuePerCent: 1416402,
    marketValuePerCent: 3200000,
    waterStatus: "Excellent Drainage & Perennial Well Water",
    isWetland: false,
    inDataBank: false,
    groundWaterTableDepthMeters: 8.5,
    floodZone: {
      status: "Safe / Zero Flood Risk",
      elevationMeters: 45,
      inundatedIn2018: false,
      distanceToMajorRiverKm: 3.8,
      riverName: "Killi River (Far Below)"
    },
    landslideZone: {
      status: "Safe / Hard Rock Basement",
      slopeDegrees: 3.0,
      hazardLevel: "Zone-0"
    },
    zoning: "High-End Residential Zone R1",
    buildingPermitEligible: true,
    kmbrCategory: "Trivandrum Municipal Corporation",
    description: "Ultra-luxury residential pocket in Kowdiar. High elevation plateau, zero flood risk, pristine ground water, prestigious address."
  },
  {
    id: "PCL-WYD-001",
    name: "Meppadi Valley Plantation / Resort Land",
    district: "Wayanad",
    taluk: "Vythiri",
    village: "Meppadi",
    surveyNo: "Re-Sy 502/1A",
    blockNo: "Block 19",
    desom: "Chooralmala Road",
    center: [11.5540, 76.1280],
    polygon: [
      [11.5552, 76.1265],
      [11.5558, 76.1292],
      [11.5530, 76.1301],
      [11.5524, 76.1274]
    ],
    areaCents: 45.0,
    areaAres: 18.21,
    classification: "Thottam (Plantation / Hill Slope)",
    roadAccess: "Ghats Road (4m width)",
    roadWidthMeters: 4.0,
    fairValuePerAre: 320000,
    fairValuePerCent: 129499,
    marketValuePerCent: 240000,
    waterStatus: "Natural Hill Stream Traversing Boundary",
    isWetland: false,
    inDataBank: false,
    groundWaterTableDepthMeters: 2.5,
    floodZone: {
      status: "Flash Flood Prone Stream Corridor",
      elevationMeters: 790,
      inundatedIn2018: false,
      distanceToMajorRiverKm: 0.15,
      riverName: "Chaliyar River Headwaters"
    },
    landslideZone: {
      status: "CRITICAL RED ZONE (KSDMA Alert)",
      slopeDegrees: 28.5,
      hazardLevel: "High Susceptibility Landslide Red Zone",
      warningNotes: "Located within the severe Wayanad debris flow/landslide corridor. Construction strictly controlled under District Disaster Management guidelines."
    },
    zoning: "Eco-Sensitive / Plantation Conservation",
    buildingPermitEligible: false, // Restrictions apply
    kmbrCategory: "Panchayat Hill Slope Building Rules",
    description: "Scenic mountain tea land. WARNING: Classified under KSDMA Landslide Susceptibility Red Zone. Heavy structural restrictions apply, soil testing mandatory."
  },
  {
    id: "PCL-ALP-001",
    name: "Kuttanad Backwater Paddy Fringe",
    district: "Alappuzha",
    taluk: "Kuttanad",
    village: "Nedumudi",
    surveyNo: "Re-Sy 94/3",
    blockNo: "Block 2",
    desom: "Champakkulam Waterway",
    center: [9.4320, 76.4020],
    polygon: [
      [9.4330, 76.4008],
      [9.4335, 76.4031],
      [9.4310, 76.4038],
      [9.4305, 76.4015]
    ],
    areaCents: 22.0,
    areaAres: 8.90,
    classification: "Nilam (Paddy Land / Wetland in Data Bank)",
    roadAccess: "Canal Walkway / 2.5m Concrete Road",
    roadWidthMeters: 2.5,
    fairValuePerAre: 420000,
    fairValuePerCent: 169968,
    marketValuePerCent: 350000,
    waterStatus: "Waterlogged Paddy Delta (Below Sea Level)",
    isWetland: true,
    inDataBank: true,
    groundWaterTableDepthMeters: 0.3,
    floodZone: {
      status: "Severe Annual Flood Zone",
      elevationMeters: -1.2, // Below sea level
      inundatedIn2018: true,
      inundationLevel2018Meters: 3.5,
      distanceToMajorRiverKm: 0.05,
      riverName: "Pamba River Delta"
    },
    landslideZone: {
      status: "Safe (Flat Delta)",
      slopeDegrees: 0.1,
      hazardLevel: "Zone-0"
    },
    zoning: "Agricultural Wetland (Act 28 of 2008)",
    buildingPermitEligible: false, // Requires RDO conversion / Data Bank removal
    kmbrCategory: "Panchayat Wetland Regulation",
    description: "Traditional Kuttanad delta land. CRITICAL: Listed as NILAM in Local Level Monitoring Committee (LLMC) Data Bank. Cannot construct residential house without Form 5 & Form 6 RDO clearance."
  },
  {
    id: "PCL-CLT-001",
    name: "Cyberpark IT Hub Residential Plot",
    district: "Kozhikode",
    taluk: "Kozhikode",
    village: "Thondayad",
    surveyNo: "Re-Sy 211/5",
    blockNo: "Block 18",
    desom: "Bypass Junction",
    center: [11.2650, 75.8230],
    polygon: [
      [11.2658, 75.8220],
      [11.2662, 75.8242],
      [11.2642, 75.8248],
      [11.2638, 75.8226]
    ],
    areaCents: 8.5,
    areaAres: 3.44,
    classification: "Purayidam (Commercial/Residential)",
    roadAccess: "NH 66 Bypass Service Road (10m)",
    roadWidthMeters: 10,
    fairValuePerAre: 2100000,
    fairValuePerCent: 849841,
    marketValuePerCent: 2100000,
    waterStatus: "Good Natural Drainage",
    isWetland: false,
    inDataBank: false,
    groundWaterTableDepthMeters: 6.2,
    floodZone: {
      status: "Low Flood Risk",
      elevationMeters: 22,
      inundatedIn2018: false,
      distanceToMajorRiverKm: 3.5,
      riverName: "Kallayi River"
    },
    landslideZone: {
      status: "Safe",
      slopeDegrees: 1.8,
      hazardLevel: "Zone-0"
    },
    zoning: "Commercial / Residential Mixed",
    buildingPermitEligible: true,
    kmbrCategory: "Kozhikode Municipal Corporation",
    description: "High demand plot along Kozhikode NH Bypass near Cyberpark and Aster MIMS. Ideal for apartment or commercial building."
  }
];

// Major Kerala Disasters & Flood Susceptibility Overlay Polygons (2018 Flood Inundated Basins)
export const KERALA_FLOOD_ZONES = [
  {
    id: "FL-ALUVA-PERIYAR",
    name: "Periyar River Basin Inundation Zone (Aluva-Kalady-Paravur)",
    severity: "High",
    color: "#0284c7",
    fillColor: "#38bdf8",
    fillOpacity: 0.35,
    polygon: [
      [10.155, 76.320],
      [10.160, 76.420],
      [10.100, 76.450],
      [10.070, 76.370],
      [10.090, 76.310],
      [10.130, 76.300]
    ],
    historicalNotes: "Experienced 3.5m+ river overflow during 2018 shutter opening of Idukki & Idamalayar dams. Low-lying river banks severely affected."
  },
  {
    id: "FL-KUTTANAD-DELTA",
    name: "Kuttanad & Upper Kuttanad Deltaic Floodplain",
    severity: "Severe",
    color: "#0369a1",
    fillColor: "#0284c7",
    fillOpacity: 0.45,
    polygon: [
      [9.550, 76.350],
      [9.580, 76.550],
      [9.320, 76.580],
      [9.300, 76.400],
      [9.420, 76.320]
    ],
    historicalNotes: "Geographically below sea level delta receiving runoff from 4 major rivers (Pamba, Manimala, Meenachil, Achenkovil). Prolonged monsoon waterlogging."
  },
  {
    id: "FL-CHALAKUDY-BASIN",
    name: "Chalakudy River Lowland Basin",
    severity: "High",
    color: "#0284c7",
    fillColor: "#38bdf8",
    fillOpacity: 0.35,
    polygon: [
      [10.350, 76.280],
      [10.380, 76.420],
      [10.280, 76.410],
      [10.260, 76.300]
    ],
    historicalNotes: "Chalakudy town, Meloor, and riverside colonies submerged up to first floor during August 2018 due to Sholayar/Peringalkuthu discharge."
  },
  {
    id: "FL-RANNI-ARANMULA",
    name: "Pamba River Overflow Plain (Ranni-Aranmula-Chengannur)",
    severity: "High",
    color: "#0284c7",
    fillColor: "#38bdf8",
    fillOpacity: 0.35,
    polygon: [
      [9.410, 76.600],
      [9.380, 76.850],
      [9.280, 76.820],
      [9.300, 76.550]
    ],
    historicalNotes: "Rapid water level rise during 2018 flood submerged Aranmula heritage village, Chengannur west, and Ranni market town."
  }
];

// Major Kerala Landslide Susceptibility Hazard Zones (KSDMA Western Ghats Red/Orange Zones)
export const KERALA_LANDSLIDE_ZONES = [
  {
    id: "LS-WAYANAD-MEPPADI",
    name: "Wayanad Western Ghats Slope (Meppadi - Chooralmala - Mundakkai)",
    riskLevel: "Critical Red Zone",
    color: "#dc2626",
    fillColor: "#ef4444",
    fillOpacity: 0.45,
    polygon: [
      [11.580, 76.100],
      [11.590, 76.200],
      [11.510, 76.220],
      [11.500, 76.110]
    ],
    slopeAverage: "25° - 42°",
    kSdmaNotice: "High susceptibility debris flow corridor. Extensive soil piping, high steep slopes, restricted commercial constructions."
  },
  {
    id: "LS-IDUKKI-MUNNAR",
    name: "Idukki High Ranges (Munnar - Devikulam - Pettimudi)",
    riskLevel: "High Hazard Zone",
    color: "#ea580c",
    fillColor: "#f97316",
    fillOpacity: 0.4,
    polygon: [
      [10.150, 77.000],
      [10.180, 77.150],
      [10.020, 77.180],
      [10.000, 77.020]
    ],
    slopeAverage: "22° - 38°",
    kSdmaNotice: "Hill slopes subject to intense monsoon saturation landslides. Land development requires District Geologist NOC."
  },
  {
    id: "LS-MALAPPURAM-KAVALAPPARA",
    name: "Nilambur Hills / Kavalappara Region",
    riskLevel: "High Hazard Zone",
    color: "#ea580c",
    fillColor: "#f97316",
    fillOpacity: 0.38,
    polygon: [
      [11.380, 76.250],
      [11.420, 76.380],
      [11.300, 76.390],
      [11.280, 76.260]
    ],
    slopeAverage: "20° - 35°",
    kSdmaNotice: "Historical massive slope failure zone (August 2019). Highly weathered soil crust on steep rocky beds."
  }
];

// Rich Curated Kerala Points of Interest (POIs) across categories for instant proximity analysis
export const KERALA_POIS = [
  // Premier Hospitals & Medical Centers
  { name: "Aster Medcity Kochi", category: "hospital", lat: 10.0519, lng: 76.2662, type: "Multi-Specialty Hospital" },
  { name: "Amrita Hospital Kochi", category: "hospital", lat: 10.0326, lng: 76.2941, type: "Quaternary Care Hospital" },
  { name: "Lisie Hospital Ernakulam", category: "hospital", lat: 9.9934, lng: 76.2891, type: "Tertiary Cardiac Care" },
  { name: "Rajagiri Hospital Aluva", category: "hospital", lat: 10.1172, lng: 76.3768, type: "Super-Specialty Hospital" },
  { name: "Apollo Adlux Hospital Karukutty", category: "hospital", lat: 10.2312, lng: 76.3920, type: "Super-Specialty Hospital" },
  { name: "KIMSHEALTH Trivandrum", category: "hospital", lat: 8.4982, lng: 76.9042, type: "Super-Specialty Hospital" },
  { name: "Government Medical College Trivandrum", category: "hospital", lat: 8.5222, lng: 76.9281, type: "Apex Tertiary Govt Hospital" },
  { name: "Baby Memorial Hospital Kozhikode", category: "hospital", lat: 11.2588, lng: 75.7944, type: "Super-Specialty Hospital" },
  { name: "Aster MIMS Kozhikode", category: "hospital", lat: 11.2421, lng: 75.8242, type: "Multi-Specialty Hospital" },
  { name: "Amala Institute of Medical Sciences Thrissur", category: "hospital", lat: 10.5694, lng: 76.1678, type: "Medical College Hospital" },
  { name: "Jubilee Mission Medical College Thrissur", category: "hospital", lat: 10.5192, lng: 76.2305, type: "Medical College Hospital" },
  { name: "Pushpagiri Medical College Thiruvalla", category: "hospital", lat: 9.3872, lng: 76.5772, type: "Super-Specialty Hospital" },

  // Key Educational Institutions (Colleges & Schools)
  { name: "CUSAT (Cochin University of Science & Tech)", category: "education", lat: 10.0441, lng: 76.3268, type: "State University" },
  { name: "Rajagiri College of Social Sciences & Engg", category: "education", lat: 10.0078, lng: 76.3575, type: "Autonomous Engineering College" },
  { name: "CET (College of Engineering Trivandrum)", category: "education", lat: 8.5458, lng: 76.9061, type: "Premier Govt Engineering College" },
  { name: "University of Kerala Kariavattom Campus", category: "education", lat: 8.5583, lng: 76.8833, type: "University Campus" },
  { name: "NIT Calicut (National Institute of Tech)", category: "education", lat: 11.3216, lng: 75.9336, type: "National Institute" },
  { name: "IIM Kozhikode (Kunnamangalam)", category: "education", lat: 11.2858, lng: 75.8778, type: "Premier Management Institute" },
  { name: "IIT Palakkad (Kanjikode)", category: "education", lat: 10.8048, lng: 76.7725, type: "National Institute" },
  { name: "Bhavans Vidya Mandir Elamakkara", category: "education", lat: 10.0210, lng: 76.2910, type: "Senior Secondary School" },
  { name: "St. Thomas Residential School Trivandrum", category: "education", lat: 8.5412, lng: 76.9452, type: "Premier ICSE School" },
  { name: "The Choice School Tripunithura", category: "education", lat: 9.9532, lng: 76.3456, type: "International School" },

  // Transit: Railways & Metro
  { name: "Kochi Metro - Aluva Station", category: "transit", lat: 10.1102, lng: 76.3524, type: "Metro Terminal Station" },
  { name: "Kochi Metro - Edappally (Lulu Mall)", category: "transit", lat: 10.0261, lng: 76.3082, type: "Major Metro Station" },
  { name: "Kochi Metro - MG Road Ernakulam", category: "transit", lat: 9.9778, lng: 76.2825, type: "City Center Metro Station" },
  { name: "Ernakulam Junction (South) Railway Station", category: "transit", lat: 9.9682, lng: 76.2912, type: "Major Railway Junction" },
  { name: "Ernakulam Town (North) Railway Station", category: "transit", lat: 9.9944, lng: 76.2872, type: "Major Railway Station" },
  { name: "Aluva Railway Station", category: "transit", lat: 10.1116, lng: 76.3538, type: "Express Railway Station" },
  { name: "Thiruvananthapuram Central Railway Station", category: "transit", lat: 8.4872, lng: 76.9502, type: "Divisional Railway HQ" },
  { name: "Kozhikode Main Railway Station", category: "transit", lat: 11.2468, lng: 75.7828, type: "A1 Railway Station" },
  { name: "Thrissur Railway Station", category: "transit", lat: 10.5186, lng: 76.2112, type: "Major Railway Junction" },
  { name: "Shoranur Junction Railway Station", category: "transit", lat: 10.7634, lng: 76.2778, type: "Biggest Railway Junction in Kerala" },

  // Transit: Airports
  { name: "Cochin International Airport (CIAL Nedumbassery)", category: "airport", lat: 10.1558, lng: 76.3917, type: "International Solar Airport" },
  { name: "Trivandrum International Airport (TRV)", category: "airport", lat: 8.4821, lng: 76.9198, type: "International Airport" },
  { name: "Calicut International Airport (Karipur CCJ)", category: "airport", lat: 11.1368, lng: 75.9553, type: "International Airport" },
  { name: "Kannur International Airport (Mattannur CNN)", category: "airport", lat: 11.9174, lng: 75.5484, type: "International Airport" },

  // Bus Hubs
  { name: "Vyttila Mobility Hub Kochi", category: "bus", lat: 9.9675, lng: 76.3204, type: "Integrated Multi-Modal Hub" },
  { name: "KSRTC Central Bus Terminal Thampanoor TVM", category: "bus", lat: 8.4892, lng: 76.9520, type: "Central Bus Terminal" },
  { name: "KSRTC Kozhikode Bus Terminal (Mavoor Road)", category: "bus", lat: 11.2575, lng: 75.7892, type: "Central Bus Complex" },
  { name: "KSRTC Stand Thrissur", category: "bus", lat: 10.5178, lng: 76.2125, type: "District Bus Stand" },

  // Commercial & Shopping Hubs
  { name: "Lulu International Shopping Mall Kochi", category: "shopping", lat: 10.0272, lng: 76.3080, type: "Mega Mall & Hypermarket" },
  { name: "Lulu Mall Thiruvananthapuram (Akkulam)", category: "shopping", lat: 8.5284, lng: 76.8962, type: "Mega Mall & Hypermarket" },
  { name: "Mall of Travancore Trivandrum", category: "shopping", lat: 8.4856, lng: 76.9242, type: "Shopping Mall" },
  { name: "HiLITE Mall Kozhikode (NH Bypass)", category: "shopping", lat: 11.2536, lng: 75.8335, type: "Mega Mall & Retail Hub" },
  { name: "Centre Square Mall MG Road Kochi", category: "shopping", lat: 9.9806, lng: 76.2828, type: "Shopping Mall" },
  { name: "Sobha City Mall Thrissur", category: "shopping", lat: 10.5592, lng: 76.1950, type: "Shopping & Entertainment" }
];
