# Design Guidelines: YouTube Video Downloader

## Design Approach
**System-Based Approach** - Utility-focused design inspired by modern productivity tools like Linear and Vercel, emphasizing efficiency, clarity, and seamless theme switching.

## Core Design Principles
1. **Efficiency First**: Streamlined download flow with minimal clicks
2. **Ad-Friendly Layout**: Strategic placement that maintains UX quality
3. **Theme Consistency**: Flawless dark/light mode across all components

---

## Color Palette

### Light Mode
- **Background**: 0 0% 100% (pure white)
- **Surface**: 240 10% 98% (light gray surface)
- **Primary**: 217 91% 60% (YouTube-inspired blue)
- **Accent**: 348 83% 47% (download red)
- **Text Primary**: 222 47% 11% (near black)
- **Text Secondary**: 215 16% 47% (medium gray)
- **Border**: 214 32% 91% (subtle gray)

### Dark Mode
- **Background**: 222 47% 11% (deep navy black)
- **Surface**: 217 33% 17% (elevated dark surface)
- **Primary**: 217 91% 60% (same blue, accessibility maintained)
- **Accent**: 348 83% 57% (brightened red for dark mode)
- **Text Primary**: 210 40% 98% (off-white)
- **Text Secondary**: 217 33% 77% (light gray)
- **Border**: 217 33% 27% (dark border)

---

## Typography

**Font Families**: 
- Primary: 'Inter' (via Google Fonts) - UI elements, body text
- Monospace: 'JetBrains Mono' - URL inputs, technical info

**Hierarchy**:
- Hero Heading: text-4xl md:text-5xl font-bold
- Section Titles: text-2xl md:text-3xl font-semibold
- Card Titles: text-lg font-semibold
- Body Text: text-base font-normal
- Captions: text-sm font-medium
- Labels: text-xs font-medium uppercase tracking-wide

---

## Layout System

**Spacing Scale**: Use Tailwind units of **4, 6, 8, 12, 16** (e.g., p-4, gap-6, mb-8, py-12, mt-16)

**Container Strategy**:
- Max-width: max-w-6xl for main content area
- Ad zones: Full-width containers with inner max-w-7xl
- Form elements: max-w-2xl for optimal focus

**Grid System**: 
- Desktop: 12-column grid with gap-8
- Mobile: Single column with gap-4

---

## Component Library

### Navigation Header
- Fixed top bar with logo, theme toggle, minimal links
- Height: h-16 with backdrop blur effect
- Border bottom in theme colors

### Hero Section (No Large Image)
- Clean typographic focus with gradient text effect
- Centered layout with primary CTA
- Compact height (60vh max) - utility focused
- Subtitle explaining MP4/MP3 download capability

### URL Input Card
- Elevated surface with shadow-lg
- Large text input with paste button
- Rounded-xl corners (border-radius: 1rem)
- Instant validation feedback with color-coded borders
- "Fetch Video" primary action button

### Video Preview Card
- Thumbnail on left (16:9 aspect ratio, w-48)
- Title, duration, channel info on right
- Appears after successful URL fetch
- Quality selector dropdown (1080p, 720p, 480p for MP4)

### Download Options
- Two prominent cards: MP4 (Video) and MP3 (Audio)
- Icon-led design with format badges
- Quality selection for MP4, bitrate for MP3
- Download buttons with progress indicators

### Ad Placement Zones
1. **Header Banner**: 728x90 leaderboard (desktop), 320x50 mobile
2. **Sidebar**: 300x250 medium rectangle (desktop only)
3. **Between Actions**: 336x280 large rectangle after video preview
4. **Footer Banner**: 728x90 leaderboard

Ad containers: border-2 border-dashed with "Ad Space" placeholder, easily replaceable

### Download Progress
- Linear progress bar with percentage
- Status messages (Fetching, Converting, Ready)
- Color transitions: blue (processing) → green (complete)

### Footer
- Minimal with disclaimer, privacy policy, contact
- Social proof indicators (downloads served counter)
- Secondary navigation links

---

## Theme Toggle Implementation
- Moon/Sun icon button in header (top-right)
- Smooth transition: transition-colors duration-300
- Persist preference in localStorage
- All components inherit theme via CSS variables

---

## Responsive Breakpoints
- Mobile: 0-768px (single column, stacked ads)
- Tablet: 768-1024px (sidebar ads hidden)
- Desktop: 1024px+ (full layout with all ad zones)

---

## Animations (Minimal)
- Button hover: slight scale (1.02) and shadow increase
- Card hover: subtle lift with shadow-xl
- Download progress: smooth width transitions
- Theme switch: color crossfade (300ms)
- NO scroll-triggered animations or parallax

---

## Accessibility
- WCAG AA contrast ratios maintained in both themes
- Keyboard navigation for all interactive elements
- ARIA labels for download buttons and progress indicators
- Focus rings visible (ring-2 ring-primary ring-offset-2)
- Theme toggle accessible with keyboard

---

## Images Section
**Hero Section**: NO large hero image - typography-focused design with optional abstract background pattern

**Video Thumbnails**: Dynamically fetched from YouTube API - displayed in preview card (16:9 aspect ratio, rounded corners)

**Icons**: Use Heroicons via CDN for download icons, theme toggle, format badges (video/audio icons)