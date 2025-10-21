# Forests by Heartfulness   

A modern web application dedicated to creating a greener, more sustainable future through forest restoration and conservation.

## 🚀 Tech Stack

### Frontend Framework
- **Next.js 15.1.0** - React-based full-stack framework with App Router
- **React 18.3.1** - JavaScript library for building user interfaces
- **TypeScript 5.7.2** - Type-safe JavaScript superset

### UI Framework & Styling
- **Material-UI (MUI) 6.1.9** - React UI component library
  - `@mui/material` - Core MUI components
  - `@mui/icons-material` - Material Design icons
  - `@mui/material-nextjs` - MUI integration for Next.js App Router
- **Emotion** - CSS-in-JS styling solution
  - `@emotion/react` - Core Emotion library
  - `@emotion/styled` - Styled components
  - `@emotion/cache` - Emotion cache for SSR

### Fonts & Typography
- **Google Fonts Integration**:
  - **Poppins** - Modern geometric font (weights: 400, 500, 700)
  - **Public Sans** - Primary body text font (weights: 400, 600, 700)
  - **Playfair Display** - Elegant serif font for headings (weights: 600, 700)
  - **Roboto** - Fallback font (weight: 400)

### Development Tools
- **ESLint 9.15.0** - Code linting and formatting
- **eslint-config-next** - Next.js specific ESLint configuration

### Build & Development
- **Node.js** - Runtime environment
- **npm** - Package manager
- **Next.js Dev Server** - Hot reload development environment

## 🏗️ Project Structure

```
fbh/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme providers
│   ├── page.tsx           # Homepage with all sections
│   └── globals.css        # Global CSS styles
├── src/
│   ├── components/        # React components
│   │   ├── icons/         # Custom SVG icon components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── HeroSection.tsx
│   │   ├── StatisticsSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── PartnersSection.tsx
│   │   ├── SpeciesSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ActivitiesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── CaseStudiesSection.tsx
│   │   └── Footer.tsx
│   ├── providers/         # Context providers
│   │   └── ThemeProvider.tsx
│   └── theme/            # MUI theme configuration
│       └── theme.ts
├── public/               # Static assets
├── next.config.js       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## 🎨 Design System

### Color Palette
- **Primary**: #003399 (Blue) - Main brand color
- **Secondary**: #19212c (Dark Gray) - Supporting elements
- **Success**: #206f32 (Green) - Success states and nature theme
- **Text**: #090c0f (Almost Black) - Primary text
- **Background**: #ffffff (White) - Clean background

### Typography Hierarchy
- **H1-H3**: Playfair Display (Serif) - Elegant headings
- **H4-H6**: Public Sans (Sans-serif) - Modern subheadings
- **Body Text**: Public Sans - Clean, readable body text
- **Buttons**: Public Sans Bold - Strong call-to-actions

### Component Features
- **Custom MUI Theme** - Consistent design tokens
- **Responsive Design** - Mobile-first approach
- **Smooth Scrolling** - Enhanced user experience
- **Custom Scrollbar** - Styled browser scrollbars
- **Glass Morphism** - Modern backdrop blur effects
- **Hover Animations** - Interactive feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fbh
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🌐 Features

- **Responsive Design** - Optimized for all device sizes
- **Modern UI Components** - Material Design 3.0 principles
- **Performance Optimized** - Next.js Image optimization and lazy loading
- **SEO Ready** - Meta tags and semantic HTML structure
- **TypeScript** - Type safety and better developer experience
- **Component-Based Architecture** - Modular and maintainable code

## 🔧 Configuration

### Next.js Configuration
- Image domains configured for external images
- Static export capability (commented out)
- Optimized build settings

### TypeScript Configuration
- Strict mode enabled
- Path mapping with `@/*` alias pointing to `src/*`
- Next.js plugin integration

## 📦 Dependencies Overview

### Production Dependencies
- **Core**: React, Next.js, TypeScript
- **UI Library**: Material-UI (MUI) v6
- **Styling**: Emotion CSS-in-JS

### Development Dependencies
- **Linting**: ESLint with Next.js config
- **Types**: TypeScript definitions for React and Node.js

## 🌱 About the Project

Forests by Heartfulness is a conservation platform focused on:
- Forest restoration and reforestation
- Wildlife conservation and species protection
- Sustainable environmental practices
- Community engagement in conservation efforts
- Educational resources about environmental sustainability

The application features multiple sections showcasing statistics, projects, activities, testimonials, and case studies related to forest conservation efforts.
