# Svatební Deník - Wedding Shop

A simple, beautiful e-commerce website for Tereza's wedding planning diary. Built with Next.js for the perfect MVP that can grow with her business.

## 🌟 Features

- **Simple E-commerce**: Stripe checkout with instant redirect
- **Two Product Variants**: Basic (200 Kč) and Gift (1490 Kč) versions
- **Manual Fulfillment**: Personal touch for first customers
- **Beautiful Design**: Clean, professional Czech wedding aesthetic
- **Mobile Responsive**: Works perfectly on all devices
- **SEO Optimized**: Proper metadata and Open Graph tags
- **Manual Process**: You handle orders personally via email

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Payments**: Stripe Checkout
- **Fonts**: Inter + Playfair Display
- **Deployment**: Vercel (free)

## 📦 Manual Fulfillment Process

### How Orders Work:

1. **Customer clicks "Buy Now"** → Stripe checkout opens
2. **Customer pays** → Stripe sends automatic receipt
3. **You get Stripe notification** → Check dashboard for customer details
4. **Send personal email** → PDF attachment + shipping timeline
5. **Ship physical copy** → Within 2-3 business days

### Why Manual Is Better for MVP:

- ✅ **Personal relationships** with first customers
- ✅ **Direct feedback** on what they need
- ✅ **Zero automation complexity**
- ✅ **Learn customer preferences**
- ✅ **Easy to scale later**

## 📋 Pages

- **/** - Homepage with hero, diary preview, about Tereza
- **/denik** - Product page with basic/gift variants
- **/ja** - About Tereza and her story
- **/kontakt** - Contact form for wedding coordination
- **/success** - Post-purchase confirmation
- **/cancel** - If payment cancelled

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Add Product Images

Place in `/public/images/`:

- `denik-hero.jpg` - Homepage hero image
- `denik-basic.jpg` - Basic version photo
- `denik-gift.jpg` - Gift version photo
- `tereza-portrait.jpg` - About page photo

### 4. Update Stripe Prices

In Stripe Dashboard, create two products:

- "Svatební Deník - Základní" - 200 CZK
- "Svatební Deník - Dárkové balení" - 1490 CZK

Update price IDs in `lib/products.ts`

### 5. Test & Deploy

```bash
npm run dev    # Test locally
npm run build  # Build for production
```

## 📧 Order Handling

### When You Get an Order:

1. **Stripe email notification** arrives
2. **Log into Stripe Dashboard**
3. **Find customer details** (name, email)
4. **Send personal email**:

```
Subject: Děkuji za objednávku Svatebního Deníku!

Ahoj [Jméno],

Moc děkuji za objednávku! V příloze posílám PDF verzi deníku,
kterou můžete začít používat hned.

Tištěnou verzi vám zašlu během 2-3 dnů. Jakmile balíček odešlu,
dám vám vědět.

Pokud budete mít jakékoliv dotazy, klidně se ozvěte!

Tereza
```

5. **Attach PDF** and ship physical copy

## 🎯 Future Growth

When ready to scale:

- **Add webhooks** for automatic emails
- **Integrate shipping APIs** (Česká pošta, PPL)
- **Add inventory tracking**
- **Expand to wedding services**
- **Add customer accounts**

## 📞 Support

- **Stripe Setup**: stripe.com/docs
- **Next.js Docs**: nextjs.org/docs
- **Tailwind CSS**: tailwindcss.com/docs

---
