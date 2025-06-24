# Modular Custom Guitar App

## Overview

This is a full-stack web application that allows users to customize Fender guitars and bass guitars. The application provides an interactive interface for selecting different components (body, neck, pickups, hardware) and creating custom guitar configurations. Users can place orders for their customized instruments.

## System Architecture

The application follows a monorepo structure with separate client and server directories, sharing common types and schemas through a shared folder.

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development**: Hot reloading with tsx

## Key Components

### Database Schema (shared/schema.ts)
- **guitarComponents**: Stores available guitar parts (body, neck, pickups, hardware) with pricing and images
- **customizations**: User's guitar configurations linked by session ID
- **orders**: Order information including customer details and shipping

### API Endpoints (server/routes.ts)
- `GET /api/components` - Get all guitar components
- `GET /api/components/:category` - Get components by category (body, neck, pickups, hardware)
- `POST /api/customizations` - Create or update customization
- `POST /api/orders` - Place an order
- `GET /api/orders/:email` - Get orders by email

### Frontend Pages
- **Home**: Landing page with featured Fender models and call-to-action
- **Customize**: Interactive guitar builder with component selection
- **Gallery**: Showcase of Fender guitar models
- **Orders**: Order history lookup by email

### Storage Layer
The application uses PostgreSQL database with Drizzle ORM:
- **Database Storage**: Primary storage using Neon PostgreSQL with type-safe Drizzle ORM
- **Schema Management**: Automated schema migrations with `npm run db:push`
- **Data Seeding**: Pre-populated with authentic Fender component catalog

## Data Flow

1. **Session Management**: Each user gets a unique session ID stored in localStorage
2. **Component Selection**: Users browse and select components by category
3. **Real-time Updates**: Customization state updates immediately with price calculations
4. **Order Processing**: Completed customizations can be converted to orders
5. **Persistence**: All data is stored in PostgreSQL with session-based tracking

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Class Variance Authority**: For component variant styling

### Data and Forms
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling and validation
- **Zod**: Schema validation
- **date-fns**: Date manipulation utilities

### Database and Backend
- **Drizzle ORM**: Type-safe database toolkit
- **Neon Database**: Serverless PostgreSQL provider
- **Express.js**: Web application framework

## Deployment Strategy

The application is configured for deployment on Replit with:
- **Development**: `npm run dev` starts both frontend and backend
- **Build Process**: Vite builds the frontend, esbuild bundles the server
- **Production**: Runs the built server serving static frontend files
- **Database**: Uses environment variable `DATABASE_URL` for PostgreSQL connection
- **Port Configuration**: Server runs on port 5000, mapped to external port 80

The build process creates optimized bundles and serves the React app as static files from the Express server in production.

## Recent Changes

- June 24, 2025: Changed app name from "Fender Custom Shop" to "Modular Custom Guitar"
- June 24, 2025: Added custom hand-drawing image for design hero section
- June 24, 2025: Updated app to focus exclusively on Fender models (Stratocaster, Telecaster, Jazzmaster, P-Bass, Jazz Bass)
- June 24, 2025: Migrated from in-memory storage to PostgreSQL database with Drizzle ORM
- June 24, 2025: Seeded database with 20 authentic Fender components across 4 categories
- June 24, 2025: Updated pricing to reflect premium Fender instrument values

## User Preferences

Preferred communication style: Simple, everyday language.