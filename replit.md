# ToolSuite Pro - Online Tools Platform

## Overview

ToolSuite Pro is a comprehensive online platform offering 80+ professional tools and converters for PDF, Image, Audio, Text, and Productivity tasks. Built as a modern full-stack web application, it provides users with secure file processing capabilities while featuring an admin portal for content management and analytics tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & UI Stack**
- **React with TypeScript**: Modern React application with TypeScript for type safety
- **Wouter Router**: Lightweight client-side routing solution
- **Vite Build System**: Fast development server and optimized production builds
- **Shadcn/ui Components**: Radix UI-based component library with Tailwind CSS styling
- **TanStack Query**: Server state management for API calls and caching

**Styling & Design System**
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **CSS Variables**: Dynamic theming system supporting dark mode
- **Glassmorphism Design**: Modern UI aesthetic with glass-like transparency effects
- **Responsive Design**: Mobile-first approach with adaptive layouts

**State Management**
- **React Query**: Server state management and caching
- **React Context**: Local state management for authentication and UI state
- **Custom Hooks**: Reusable logic for authentication, ad management, and mobile detection

### Backend Architecture

**Server Framework**
- **Express.js**: Web application framework with middleware support
- **TypeScript**: Type-safe server-side development
- **RESTful API Design**: Structured endpoints for authentication, tool usage, and admin functions

**Database Layer**
- **PostgreSQL**: Primary database for persistent data storage
- **Drizzle ORM**: Type-safe database operations with schema management
- **Schema-First Design**: Centralized schema definitions in shared directory

**Authentication & Security**
- **Role-Based Access Control**: User and admin role separation
- **Bcrypt Password Hashing**: Secure password storage
- **Session Management**: User authentication state tracking

### Data Storage Solutions

**Database Schema**
- **Users Table**: Authentication and profile management
- **Tool Usage Table**: Analytics and usage tracking per tool
- **Ad Slots Table**: Dynamic advertisement management
- **Analytics Table**: Aggregated metrics and reporting data

**File Processing**
- **Temporary File Storage**: Uploaded files processed and automatically deleted
- **Memory Storage**: In-memory storage implementation for development
- **File Validation**: Type and size restrictions for security

### External Dependencies

**Core Technologies**
- **Node.js Runtime**: Server execution environment
- **PostgreSQL Database**: Persistent data storage
- **Neon Database**: Cloud-hosted PostgreSQL service integration

**Frontend Libraries**
- **Radix UI**: Accessible component primitives
- **Lucide Icons**: SVG icon library
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation
- **Date-fns**: Date manipulation utilities

**Development Tools**
- **ESBuild**: Fast JavaScript bundler for production
- **Replit Integration**: Development environment optimizations
- **Font Awesome**: Icon library for tool representations

**Ad Management System**
- **Google AdSense Integration**: Revenue generation through advertisements
- **Media.net Support**: Alternative ad network integration
- **Dynamic Ad Placement**: Position-based ad slot management

**SEO & Analytics**
- **Meta Tags Management**: Dynamic SEO optimization
- **Structured Data**: Schema.org markup for search engines
- **Analytics Tracking**: User behavior and tool usage metrics
- **Sitemap Generation**: Automated sitemap creation for search engines