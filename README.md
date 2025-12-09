# Auth Board

A Next.js 16 authentication demo application with login functionality, protected routes, and user dashboard.

## Features

- 🔐 Login authentication with HttpOnly cookies
- 🛡️ Protected dashboard route with middleware
- 👤 User profile display with avatar
- 🎨 Tailwind CSS styling
- ✅ Comprehensive Jest testing
- 🔄 Zod validation
- 🚀 Next.js 16 with App Router

## Tech Stack

- **Framework:** Next.js 16
- **React:** 19
- **Styling:** Tailwind CSS 4
- **Validation:** Zod
- **Testing:** Jest + React Testing Library
- **Icons:** Lucide React
- **Package Manager:** Bun

## Getting Started

### Prerequisites

- Bun installed on your machine
- Node.js 22+ (for compatibility)

### Installation

```bash
# Install dependencies
bun install
```

### Environment Variables

Create a `.env` file in the root directory (optional):

```bash
cp .env.example .env
```

## Available Scripts

### Development

```bash
# Start development server
bun dev
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### Build

```bash
# Build for production
bun run build
```

Creates an optimized production build

### Production

```bash
# Start production server
bun start
```

Starts the production server (requires build first)

### Testing

```bash
# Run all tests
bun run test

```

### Code Quality

```bash
# Run ESLint
bun run lint

# TypeScript type checking
bun run check
```

## Project Structure

```
src/
├── actions/          # Server actions (login, logout)
├── app/             # Next.js app router pages
│   ├── dashboard/   # Protected dashboard page
│   ├── login/       # Login page
│   └── layout.tsx   # Root layout
├── components/      # Reusable components
│   ├── shared/      # Shared components (sidebar)
│   └── ui/          # UI components (button, input)
├── lib/             # Utility functions
│   ├── req-res.ts   # API fetch wrapper
│   └── schema/      # Zod validation schemas
└── proxy.ts         # Authentication middleware
```
