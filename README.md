# Forests by Heartfulness - Next.js

A Next.js application showcasing forest restoration and conservation efforts.

## Tech Stack

- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **Emotion** for styled components

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                 # Next.js App Router directory
│   ├── layout.tsx      # Root layout with theme provider
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── src/
│   ├── components/     # React components
│   └── theme/         # MUI theme configuration
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint