# BhoomiKerala (ഭൂമികേരളം) 🌴
### Kerala Land Valuation, Natural Risk Intelligence & Due-Diligence Engine

> An interactive map-based property evaluation platform for land buyers in Kerala, built with direct reference to the **Kerala Registration Department (IGR) Fair Value Portal** ([igr.kerala.gov.in](https://igr.kerala.gov.in/index.php/fairvalue/view_fairvalue)) and **Kerala State Disaster Management Authority (KSDMA)** hazard mapping.

---

## 🌟 Key Features

- **Google Maps-Style Interactive GIS Viewer:**
  - High-res Satellite Imagery (Esri World Imagery), OpenStreetMap (Streets), and OpenTopoMap (Elevation Contours).
  - Hazard overlays for **2018 Flood Inundated Basins** (Periyar, Kuttanad, Chalakudy, Pamba) and **KSDMA Landslide Susceptibility Red Zones** (Wayanad, Idukki, Nilambur).
  - Click anywhere on the map to evaluate land value, risks, water table, and accessibility.

- **Kerala Coastline & Waterbody Boundary Protection:**
  - Accurate spatial detection of the **Arabian Sea (Territorial Waters)**, **Public Coastal Beaches (CRZ-I/NDZ)**, and **Inland Backwaters (Kayal Puramboke)**.
  - Automatically flags non-purchasable public domains with legal notices under Article 297, the Public Trust Doctrine, and KCZMA regulations.

- **Valuation & Stamp Duty Simulator:**
  - Government Fair Value per Are and per Cent.
  - Prevailing market rate estimation and comparison multiplier.
  - Interactive land area slider (1 to 50 Cents) computing Kerala Stamp Duty (8%), Registration Fee (2%), Pokkuvaravu (Mutation), and legal documentation expenses.

- **Kerala Conservation of Paddy Land & Wetland Act (2008) Engine:**
  - Differentiates *Purayidam* (Dryland) vs *Nilam* (Wetland/Paddy).
  - Form 6 RDO conversion fee simulator (exempt up to 25 cents; 10% fee for 25–50 cents; 20% for 50–100 cents).
  - LLMC Data Bank check alert.

- **Nearby Facilities & Accessibility:**
  - Nearest hospitals, railway stations, Kochi Metro stops, schools/colleges, shopping malls, and airports with accurate distance (km) and driving time estimates.
  - Road access classification and Kerala Municipality Building Rules (KMBR) minimum 3.0-meter road width permit compliance check.

- **Integrated Buyer Tools:**
  - **Official IGR Fair Value Search:** Cascading District $\rightarrow$ Taluk $\rightarrow$ Village $\rightarrow$ Desom $\rightarrow$ Survey No workflow with road frontage multipliers.
  - **Kerala Land Unit Converter:** Instant conversion between Cents (സെന്റ്), Ares (ഏർ), Sq. Ft, Sq. M, and Acres.
  - **Side-by-Side Comparison Matrix:** Compare two plots across valuation, flood, landslide, and legal metrics.
  - **Due-Diligence Guide & Printable Dossier:** 5-point buyer verification checklist and one-click printable report for banks/advocates.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/soorajstudio/Land-cost.git
cd Land-cost

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite
- **Styling:** Tailwind CSS v4, Lucide Icons
- **Mapping & GIS:** Leaflet, Esri World Imagery, OpenStreetMap, OpenTopoMap
- **References:** Kerala Registration Department (PEARL / igr.kerala.gov.in), KSDMA Hazard Atlas, Kerala Conservation of Paddy Land and Wetland Act 2008, KMBR / KPBR.

---

## ⚖️ Legal Disclaimer
*BhoomiKerala is an independent real estate evaluation and risk intelligence tool designed for informational and due-diligence reference. Official land registration, survey sketches, and legal verifications must always be corroborated with the Kerala Registration Department, Taluk Revenue Offices, and the Kerala Coastal Zone Management Authority (KCZMA).*
