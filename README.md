# East End Apartments — Project Architecture & Complete Structure

A responsive, high-performance web portal for **East End Apartments** (Mayur Vihar Phase I Extn., Delhi 110096). Built using semantic HTML5, custom modular CSS design tokens, and lightweight vanilla JavaScript with interactive modal dialogs and dynamic listing filters.

---

## 📁 Directory & File Structure

```text
├── index.html                   # Homepage (Hero, Key Stats, Story, Previews, FAQ, Desks)
├── society.html                 # The Society (Scale, History, 29 Blocks, Parks & Temple)
├── residences.html              # Residences (Sale & Rent Units, Filters, Price Ranges)
├── layouts.html                 # Layouts & Floor Plans (A, A-1, B-Front, B-Back, B-1, C, D)
├── amenities.html               # Amenities (Parks, Badmintons, Gyms, Conveniences, Security)
├── location.html                # Location & Transit (Metro, Connaught Place, Airports, Roads)
├── contact.html                 # Contact Desk (Enquiry form, Direct phone, WhatsApp, Visit)
├── README.md                    # Project structure, architecture, and developer guide
├── assets/
│   ├── css/
│   │   ├── layout.css           # Base layout rules and responsive grid setup
│   │   └── site.css             # Complete design system, typography, components, animations
│   ├── js/
│   │   ├── data.js              # Data store (EE_LAYOUTS, EE_LISTINGS, EE_GALLERY)
│   │   └── site.js              # DOM controllers, filter logic, dialogs, mobile navigation
│   ├── fonts/                   # Fraunces & Manrope variable web fonts (WOFF2)
│   ├── plans/                   # Floor plan schematics (A, A1, B-Front, B-Back, B1, C, D)
│   ├── society/                 # Society photography (Gates, parks, temple, blocks)
│   ├── stock/                   # Lifestyle and contextual imagery
│   └── favicon.svg              # SVG brand icon
├── .od-frames/                  # Open Design preview frames (iPhone, Android, Neutral)
├── .file-versions/              # Revision history & checkpoints
└── *.artifact.json              # Open Design artifact metadata files
```

---

## 🌐 Page Directory & Routing

| Page | File | Purpose | Active Features |
| :--- | :--- | :--- | :--- |
| **Home** | `index.html` | Portal landing page | Hero scrim, quick stats, editorial stories, preview cards, full interactive gallery |
| **The Society** | `society.html` | History & campus | Detailed overview of 21.7 acres, 4 gates, 1,306 homes, community life |
| **Residences** | `residences.html` | Property listings | Filterable buy/rent inventory cards, interactive modal details, direct enquiry |
| **Layouts** | `layouts.html` | Architectural floor plans | 7 floor plans with dimensions, towers, lift ratios, interactive plan viewer |
| **Amenities** | `amenities.html` | On-campus facilities | Central park, sports courts, Mother Dairy, security gates, daily conveniences |
| **Location** | `location.html` | Neighborhood & transit | Distance charts to metro, railway, airports, Noida, and central Delhi |
| **Contact** | `contact.html` | Property desk & enquiry | Direct phone numbers, WhatsApp link, physical address, and enquiry form |

---

## 🎨 Design System & Theme Tokens

The site styles are governed by design tokens defined in [`assets/css/site.css`](assets/css/site.css):

### Colors
- **Ink Primary (`--ink`)**: `#0b1a15` (Deep dark slate green)
- **Ink Secondary (`--ink-2`, `--ink-3`)**: `#13271f`, `#1e3a2d`
- **Paper Background (`--paper`)**: `#f4f4ef` (Subtle warm off-white)
- **Paper Accent (`--paper-2`, `--paper-3`)**: `#eaebe3`, `#dfe1d7`
- **Accent Brass (`--brass`, `--brass-deep`)**: `#b18745`, `#6d4f1e`
- **Sand Highlight (`--sand`)**: `#dcc9a7`

### Typography
- **Display Serif (`--font-display`)**: `"Fraunces"`, Georgia, serif
  - `h1`: `clamp(2rem, 3.2vw, 3.125rem)` (~32px to 50px max), weight `400-520`, line-height `1.08`, optical size `48`, italic `em` in `--sand`
  - `h2`: `clamp(1.625rem, 2.3vw, 2.25rem)` (~26px to 36px max), weight `450-540`, line-height `1.12`
  - Stats numbers: `clamp(1.625rem, 2.1vw, 2.125rem)`, weight `500-620`
- **Body Sans-Serif (`--font-body`)**: `"Manrope"`, system-ui, sans-serif
  - Body copy: `0.9375rem` (15px), line-height `1.6`
  - Micro-copy / Eyebrows: `0.625rem` - `0.75rem`, weight `700`, tracking `0.14em - 0.24em`
  - Card headings: `1.1875rem` (19px) display / `0.9375rem` (15px) body sans

### Responsive Standards
- **Container Max-Width**: `1240px`
- **Fluid Gutters**: `clamp(20px, 5vw, 56px)`
- **Header Height**: `78px`
- **Accessibility**: Native `:focus-visible` outlines, skip-to-content links, and prefers-reduced-motion fallbacks.

---

## ⚡ Interactivity & Script Controllers

- **`data.js`**:
  - `window.EE_LAYOUTS`: Standardized schema for all 7 layout types (area, bhk, towers, lifts, balconies, images).
  - `window.EE_LISTINGS`: Active inventory for sale and rent linked to layout specifications.
  - `window.EE_GALLERY`: Photo registry for the modal gallery viewer.

- **`site.js`**:
  - **Mobile Navigation**: Toggle drawer with accessible `aria-expanded` and trap management.
  - **Dialog Modals**: Accessible `<dialog>` elements for Residence details (`#listing-dialog`), Floor plans (`#layout-dialog`), and Fullscreen image gallery (`#gallery-dialog`).
  - **Scroll Reveal**: Observer-based `.reveal` animations with `<noscript>` accessibility.

---

## 🚀 Running & Previewing Locally

Because this project is written in pure standards-compliant HTML5, CSS3, and JavaScript, it does not require a compilation step:
1. Open any `.html` file directly in any modern browser (Chrome, Edge, Firefox, Safari).
2. Or serve via any local static server:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```
