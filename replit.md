# Workspace

## Overview

Full-stack photography studio website built on a pnpm monorepo with TypeScript. Features a premium dark-luxury design with gold accents.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── photography-studio/ # React + Vite frontend
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
│   └── src/seed.ts         # Database seeder
└── ...
```

## Photography Studio Features

### Pages
- **Homepage** (`/`) — Hero banner, featured work, service highlights, testimonials, CTA
- **Gallery** (`/gallery`) — Masonry photo grid with category filters, lightbox
- **Videos** (`/videos`) — Video showcase with YouTube embeds
- **About & Contact** (`/about`) — Photographer bio, contact form, Google Maps, WhatsApp
- **Bookings** (`/book`) — Package selection, booking form, invoice generation
- **Booking Confirmation** (`/booking-confirmation/:id`) — Invoice display
- **Admin Panel** (`/admin`) — Dashboard, Bookings, Messages, Testimonials

### API Endpoints
- `GET /api/packages` — Photography packages
- `GET /api/bookings` — All bookings (admin)
- `POST /api/bookings` — Create booking
- `GET /api/bookings/:id` — Get booking by ID
- `PATCH /api/bookings/:id` — Update booking status
- `POST /api/contact` — Submit contact form
- `GET /api/contact` — Get contact messages (admin)
- `GET /api/testimonials` — Get published testimonials
- `POST /api/testimonials` — Create testimonial (admin)
- `GET /api/admin/stats` — Dashboard statistics

### Database Tables
- `packages` — Photography service packages
- `bookings` — Customer bookings with invoices
- `contact_messages` — Contact form submissions
- `testimonials` — Client testimonials

### Seeding
Run `pnpm --filter @workspace/scripts run seed` to populate sample packages and testimonials.

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
- `pnpm --filter @workspace/api-spec run codegen` — regenerates React Query hooks and Zod schemas
- `pnpm --filter @workspace/db run push` — push schema changes to database
- `pnpm --filter @workspace/scripts run seed` — seed database with sample data
