# Svatební Deník - Wedding Diary E-commerce

A modern, secure e-commerce website for Tereza's wedding planning diary. Built with Next.js 15, featuring bilingual support (Czech/English), Stripe payments, and secure digital delivery.

## 🌟 Features

- **Bilingual Support**: Czech (default) and English locales with automatic routing
- **Secure E-commerce**: Stripe checkout with webhook verification
- **Digital Product Delivery**: Secure download API with session validation and expiration
- **Two Product Variants**: Basic (990 Kč) and Premium (1490 Kč) versions
- **Professional Design**: Clean, elegant wedding aesthetic with Tailwind CSS
- **Mobile Responsive**: Optimized for all devices
- **SEO Optimized**: Comprehensive metadata and Open Graph tags
- **Security First**: Rate limiting, PII redaction, environment validation
- **TypeScript**: Fully typed codebase with strict mode
- **Production Ready**: Comprehensive error handling and logging

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Payments**: Stripe Checkout + Webhooks
- **Internationalization**: Built-in Next.js i18n routing
- **Fonts**: Inter + Playfair Display
- **Animations**: Framer Motion
- **Deployment**: Vercel
- **Security**: Rate limiting, secure logging, environment validation

## � Project Structure

```
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── layout.tsx           # Locale-specific layout
│   │   ├── page.tsx             # Homepage
│   │   ├── zakladni/page.tsx    # Basic product page
│   │   ├── premium/page.tsx     # Premium product page
│   │   ├── kontakt/page.tsx     # Contact page
│   │   ├── success/page.tsx     # Post-purchase page
│   │   └── cancel/page.tsx      # Cancel page
│   ├── api/                     # API routes
│   │   ├── create-checkout/     # Stripe checkout creation
│   │   ├── validate-session/    # Session validation
│   │   ├── download/            # Secure file download
│   │   └── webhook/             # Stripe webhook handler
│   └── loading.tsx              # Global loading UI
├── components/                  # Reusable components
│   ├── Header.tsx              # Navigation header
│   ├── BuyButton.tsx           # Purchase button
│   ├── Loading.tsx             # Loading components
│   ├── RouteChangeLoader.tsx   # Route transition loader
│   └── LanguageSwitcher.tsx    # Language toggle
├── lib/                        # Business logic
│   ├── products.ts             # Product definitions
│   ├── stripe.ts               # Stripe configuration
│   ├── rate-limit.ts           # Rate limiting
│   ├── secure-logger.ts        # PII-safe logging
│   ├── env.ts                  # Environment validation
│   └── dictionaries/           # Translation files
├── private/products/           # Digital products (PDFs)
├── scripts/                    # Utility scripts
│   └── verify-stripe-prices.ts # Price validation
└── public/                     # Static assets
```

## 📦 Product Delivery Process

### Digital Products (Automated):

1. **Customer purchases** → Stripe processes payment
2. **Webhook validates** → Payment confirmed
3. **Customer gets success page** → Download link appears
4. **Secure download** → Session validation + 30-day expiration
5. **File served** → From private directory with security headers

### Physical Products (Manual):

1. **Stripe notification** → Check dashboard for order details
2. **Personal email** → Confirm receipt and shipping timeline
3. **Ship within 2-3 days** → Track and notify customer

## 📋 Routes & Pages

### Czech Routes (`/cs/*`):

- `/cs` - Homepage with hero and product overview
- `/cs/zakladni` - Basic diary product page
- `/cs/premium` - Premium diary product page
- `/cs/kontakt` - Contact page
- `/cs/success` - Post-purchase success page
- `/cs/cancel` - Payment cancellation page

### English Routes (`/en/*`):

- `/en` - English homepage
- `/en/basic` - Basic diary (English)
- `/en/premium` - Premium diary (English)
- `/en/contact` - Contact page (English)
- `/en/success` - Success page (English)
- `/en/cancel` - Cancel page (English)

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account (test mode for development)

### 2. Installation

```bash
# Clone repository
git clone <repository-url>
cd terezajinochova

# Install dependencies
npm install
```

### 3. Environment Setup

Create `.env.local`:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### 4. Stripe Setup

1. **Create products in Stripe Dashboard:**

   - Basic Diary: 990 CZK (`price_1ST6XmEZ9QJo6JyeKEHn4qSm`)
   - Premium Diary: 1490 CZK (`price_1ST6lJEZ9QJo6Jyey7YROR26`)

2. **Configure webhook:**

   - URL: `https://your-domain.com/api/webhook`
   - Events: `checkout.session.completed`

3. **Verify prices:**
   ```bash
   npm run verify-prices
   ```

### 5. Add Product Files

1. **Place PDFs in `private/products/`:**

   ```bash
   mkdir -p private/products
   # Add: svatebni-denik-basic-v1.pdf
   # Add: svatebni-denik-premium-v1.pdf
   ```

2. **Add images to `public/assets/images/`:**
   - Product photos
   - Hero images
   - Tereza's portrait

### 6. Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run lint
```

## 🔒 Security Features

- **Environment Validation**: Fail-fast on missing required variables
- **Rate Limiting**: IP-based protection (upgradeable to Redis)
- **Secure Downloads**: Session validation + expiration
- **PII Redaction**: Safe logging without personal data
- **Webhook Verification**: Stripe signature validation
- **TypeScript Strict**: Compile-time safety

## 📊 Scripts & Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build
npm run lint            # TypeScript + ESLint

# Verification
npm run verify-prices   # Validate Stripe prices match code

# Pre-deployment
npm run prebuild        # Runs price verification automatically
```

## 🎯 Architecture Decisions

### Why Next.js 15 App Router?

- **Server Components**: Better performance and SEO
- **Built-in i18n**: Automatic locale routing
- **Edge Runtime Ready**: Global deployment ready

### Why Manual Fulfillment for MVP?

- **Personal Touch**: Build customer relationships
- **Feedback Loop**: Learn what customers need
- **Simple**: No complex automation needed
- **Scalable**: Easy to automate later

### Why Secure Downloads?

- **No Public PDFs**: Products can't be downloaded without payment
- **Session Validation**: Only paid customers get access
- **Expiration**: Download links valid for 30 days
- **Audit Trail**: All access attempts logged

## 📈 Scaling Roadmap

### Phase 1: Automation (Next Month)

- **Email Integration**: Automatic download emails
- **Order Management**: Basic order tracking
- **Analytics**: User behavior insights

### Phase 2: Growth (3+ Months)

- **Database**: Order history and customer data
- **Shipping Integration**: Česká pošta API
- **Customer Portal**: Order status and downloads
- **Multi-currency**: EUR support for international customers

### Phase 3: Enterprise (6+ Months)

- **White-label**: Custom diaries for wedding planners
- **API**: Integration with wedding planning tools
- **Mobile App**: Companion app for diary users

## 📞 Support & Documentation

- **Technical Docs**: See `TECHNICAL_DOCS.md`
- **Known Issues**: See `KNOWN_ISSUES.md`
- **Stripe Docs**: stripe.com/docs
- **Next.js Docs**: nextjs.org/docs
- **Tailwind CSS**: tailwindcss.com/docs

## 🤝 Contributing

1. **TypeScript Strict**: All code must pass strict TypeScript checks
2. **Security First**: Never log PII, validate all inputs
3. **Performance**: Optimize for Core Web Vitals
4. **Accessibility**: WCAG 2.1 AA compliance
5. **Testing**: Add tests for critical business logic

---

Built with ❤️ for Czech brides and grooms planning their perfect day.
