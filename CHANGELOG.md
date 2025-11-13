# Changelog

All notable changes to the Svatební Deník wedding shop project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-13

### Added

- **Initial MVP Release**: Complete wedding shop implementation
- **Project Setup**: Next.js 15 with TypeScript and Tailwind CSS
- **Stripe Integration**: Secure payment processing with Stripe Checkout
- **Product Management**: Three wedding planning products with CZK pricing
- **Responsive Design**: Mobile-first design with clean, professional UI
- **Czech Localization**: Full Czech language support with proper formatting
- **SEO Optimization**: Meta tags, Open Graph, and structured data
- **Component Architecture**:
  - `ProductCard` component with image, description, and pricing
  - `BuyButton` component with loading states and error handling
  - Responsive product grid layout
- **API Routes**:
  - `/api/create-checkout` for Stripe session creation
- **Pages**:
  - Homepage with hero section, product grid, about, and contact
  - Success page with order confirmation
  - Cancel page with friendly messaging
- **Layout & Navigation**:
  - Professional header with site branding
  - Clean footer with copyright
  - Google Fonts integration (Inter + Playfair Display)
- **Configuration**:
  - Tailwind CSS custom configuration
  - Environment variable setup for Stripe
  - TypeScript interfaces for type safety
- **Development Tools**:
  - ESLint configuration
  - Next.js build optimization
  - Development server setup
- **Real Product Data**: Updated first product with actual Stripe data (name, description, image, Price ID)
- **Image Configuration**: Added Stripe files domain to Next.js image config
- **Product Detail Page**: New dynamic route `/product/[slug]` with comprehensive product information
- **Enhanced Product Data**: Added detailed descriptions, features, what's included, and category fields
- **Product Navigation**: Clickable product cards linking to detail pages
- **User Experience**: Breadcrumb navigation and improved product discovery flow
- **Resend Email Service**: Complete email infrastructure with order confirmation templates
- **Email API Route**: `/api/send-email` for sending transactional emails
- **Email Templates**: Beautiful HTML and text templates for order confirmations
- **Email Service Functions**: Utility functions for sending emails with error handling

### Enhanced

- **Design Polish**: Added gradient hero section with decorative elements
- **Trust Signals**: Implemented security badges (secure payment, instant delivery, money-back guarantee)
- **Product Card Animations**: Added scale, lift, and image zoom effects on hover
- **Typography**: Enhanced main heading with gradient text effect
- **SEO Improvements**:
  - Enhanced metadata with comprehensive Open Graph and Twitter cards
  - Added favicon configuration
  - Created robots.txt for search engine guidelines
  - Added XML sitemap for better indexing
  - Improved robots directives and SEO properties
- **Performance**: Optimized animations and transitions for smooth UX

### Fixed

- **Image Configuration**: Added Next.js image config for external placeholder images
- **Product IDs**: Updated with real Stripe Product ID (prod_TPvGUCVAvwlQUl)
- **Product Information**: Synchronized with actual Stripe product data
- **Hydration Mismatch**: Fixed server/client rendering inconsistency on success page by using Next.js searchParams instead of window.location.search

### Security

- **Environment Variables**: Verified .env\*.local is properly excluded from git

### Changed

- **Product Strategy**: Simplified to single product offering for focused launch
- **Homepage Layout**: Centered single product display for better conversion

### Technical Details

- **Framework**: Next.js 15.0.3 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Payments**: Stripe API v2025-10-29.clover
- **Dependencies**:
  - React 19.2.0
  - Stripe SDK 19.3.1
  - @stripe/stripe-js 8.4.0
- **Build Tools**: Turbopack for fast development

### Features Implemented

- ✅ Product catalog with 3 wedding planning items
- ✅ Secure checkout flow with Stripe
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Error handling and loading states
- ✅ SEO-friendly with proper metadata
- ✅ Type-safe development with TypeScript
- ✅ Clean, maintainable code architecture
- ✅ Ready for deployment to Vercel

### Known Limitations

- Uses placeholder product images (via.placeholder.com)
- Stripe Price IDs need to be configured with real values
- No database integration (planned for Phase 2)
- No email notifications (planned for Phase 2)
- No admin dashboard (planned for Phase 2)

### Next Steps (Phase 2)

- Database integration with Supabase
- Order tracking and management
- Email notifications with Resend
- Admin dashboard for order management
- Multi-language support (EN/CZ)
- Advanced features (service booking, blog)

---

## Development Timeline

- **2025-11-13**: MVP implementation completed
  - Project initialization with Next.js 15
  - Stripe integration setup
  - Component development
  - UI/UX implementation
  - Testing and documentation

## Contributors

- **Michal Šoukromě**: Lead developer and project architect

---

**Legend:**

- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities
