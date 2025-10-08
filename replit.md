# YouTube Video Downloader

## Overview

A modern web application for downloading YouTube videos and audio with a clean, utility-focused interface. Built with a full-stack TypeScript architecture, the application allows users to paste YouTube URLs, preview video information, and download content in various formats (MP4 video or MP3 audio) with quality selection options. The design emphasizes efficiency, seamless theme switching (light/dark mode), and strategic ad placement while maintaining excellent user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Libraries:**
- React with TypeScript (no RSC - client-side only)
- Vite as the build tool and dev server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management
- Tailwind CSS with custom theme system for styling

**UI Component System:**
- shadcn/ui components (New York style variant) using Radix UI primitives
- Custom theme provider supporting light/dark modes with CSS variables
- Design system following utility-first approach inspired by Linear and Vercel
- Typography using Inter (UI) and JetBrains Mono (monospace/technical)

**State Management:**
- React Query for async data fetching and caching
- Local component state for UI interactions
- Theme state persisted to localStorage

**Key Design Patterns:**
- Component composition with shadcn/ui
- Custom hooks for reusable logic (useToast, useIsMobile, useTheme)
- Path aliases (@/, @shared/, @assets/) for clean imports
- Test-friendly component structure with data-testid attributes

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- ESM module system
- Custom middleware for request logging and error handling

**API Design:**
- RESTful endpoints under `/api` prefix
- POST `/api/video/info` - Fetch YouTube video metadata
- GET `/api/download/video` - Stream video download (MP4)
- Zod for runtime request validation

**Video Processing:**
- @distube/ytdl-core for YouTube video extraction
- Server-side streaming for efficient downloads
- Quality selection support (highest, 1080p, 720p, 480p, 360p)

**Development Setup:**
- Vite middleware mode for HMR in development
- Separate production build process (client + server bundling with esbuild)
- Custom logging with timestamp formatting

### Data Storage Solutions

**Database:**
- Drizzle ORM configured for PostgreSQL
- Neon Database serverless driver (@neondatabase/serverless)
- Schema defined in shared/schema.ts
- Migration support via drizzle-kit

**Current Schema:**
- Users table with UUID primary key, username, and password fields
- Zod validation schemas for type safety
- In-memory storage fallback (MemStorage class) for development/testing

**Note:** The application currently includes user authentication scaffolding but the main YouTube download functionality doesn't require authentication.

### External Dependencies

**Third-Party Services:**
- YouTube (via ytdl-core) - Video metadata extraction and streaming
- Google Fonts - Inter and JetBrains Mono typography
- Neon Database - PostgreSQL serverless hosting

**Key Libraries:**
- @distube/ytdl-core - YouTube video downloading
- @radix-ui/* - Accessible UI primitives (20+ components)
- Tailwind CSS - Utility-first styling
- Drizzle ORM - Type-safe database toolkit
- Zod - Runtime validation and type inference
- date-fns - Date formatting utilities

**Development Tools:**
- Replit-specific plugins (cartographer, dev-banner, runtime error overlay)
- TypeScript with strict mode
- PostCSS with autoprefixer

**Ad Integration:**
- Placeholder ad spaces implemented (AdSpace component)
- Strategic placement at 728x90 (leaderboard) and 300x250 (rectangle) sizes
- Designed for future ad network integration