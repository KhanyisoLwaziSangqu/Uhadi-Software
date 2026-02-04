# CoworkAI Landing Page

#### Command to open Landing page

# Using Node.js (you already have it):
cd "c:\Users\Khanyiso Sangqu\Uhadi\UmncediAI\landing-page"
npx http-server -p 8000 -o

> **Professional landing page for CoworkAI - Your Multilingual AI Meeting Assistant**
> Built by Uhadi Technology

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [About CoworkAI](#about-coworkai)
- [Features & Capabilities](#features--capabilities)
- [Technical Architecture](#technical-architecture)
- [Landing Page Structure](#landing-page-structure)
- [Design Philosophy](#design-philosophy)
- [File Structure](#file-structure)
- [Deployment Guide](#deployment-guide)
- [Analytics Integration](#analytics-integration)
- [SEO Optimization](#seo-optimization)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

This landing page serves as the primary web presence for **CoworkAI**, a revolutionary mobile application that provides AI-powered meeting transcription and summarization in 11+ African languages. The page is designed to convert visitors into app downloads by clearly communicating the value proposition, features, and pricing of CoworkAI.

### Purpose
- Educate potential users about CoworkAI's capabilities
- Drive mobile app downloads (Android with iOS coming soon)
- Showcase support for African languages (isiZulu, isiXhosa, Sepedi, Swahili, etc.)
- Convert free users to paid subscriptions through clear pricing communication

### Target Audience
- African professionals conducting business meetings
- Organizations requiring multilingual transcription services
- Teams needing AI-powered meeting minutes and summaries
- Users seeking affordable, accurate transcription in indigenous languages

---

## 🚀 About CoworkAI

**CoworkAI** (formerly UmncediAI) is a mobile-first AI meeting assistant developed by **Uhadi Technology**. It addresses a critical gap in the market: professional-grade transcription services for African languages.

### Core Value Proposition
- **Multilingual Support**: 11+ African languages (isiZulu, isiXhosa, Sepedi, Sesotho, Swahili, Yoruba, Hausa, Igbo, Amharic, Oromo, Shona, Wolof) + global languages (English, Afrikaans, French, Spanish, etc.)
- **AI-Powered Intelligence**: Automatic speaker identification, meeting summaries, action items extraction
- **Professional Output**: Export formatted meeting minutes as PDFs with timestamps and speaker labels
- **Affordable Pricing**: Free tier (180 min/month) with premium plans (900-1500 min/month) at R149-R199/month
- **Guest Mode**: Try without signing up - 180 free minutes to explore the app

### Key Differentiators
1. **African Language Focus**: First-class support for indigenous South African and African languages
2. **Intelligent Routing**: Automatically routes transcription to the best AI provider (Google Cloud Speech-to-Text V2, AssemblyAI, Lelapa AI)
3. **Duration-Aware Processing**: Automatically selects sync vs. async API based on recording length
4. **No Data Loss**: Smart reminders prevent wasted recording minutes from forgotten sessions

---

## ✨ Features & Capabilities

### 1. **Multilingual Transcription**
- **Technology**: Google Cloud Speech-to-Text V2 (Chirp 2 model), AssemblyAI, Lelapa AI
- **Languages**:
  - **African**: isiZulu, isiXhosa, Sepedi, Sesotho, Swahili, Yoruba, Hausa, Igbo, Amharic, Oromo, Shona, Wolof
  - **Global**: English, Afrikaans, Spanish, French, Portuguese, German, Italian, Dutch + 90 more
- **Recording Format**: WAV (LINEAR16, 16kHz, mono) - ~1.92 MB/min
- **Duration Support**: Up to 8 hours per recording (Pro plan)

### 2. **Speaker Identification (Diarization)**
- Automatically detects and labels different speakers
- Formats output with speaker labels: `[Speaker A]: Hello everyone`
- Supports multi-speaker meetings and conferences

### 3. **AI-Powered Summaries**
- Generates meeting summaries using advanced AI
- Extracts action items and key decisions
- Supports English language summaries (via AssemblyAI)

### 4. **Professional Exports**
- **PDF**: Formatted meeting minutes with speaker labels, timestamps, branding
- **Text**: Plain text transcription for free tier users
- **Email Sharing**: Direct email composition with meeting content
- **Future**: DOCX, CSV formats for premium users

### 5. **Smart Reminders**
- Prevents wasted recording minutes by alerting users to active recordings
- Uses foreground service notifications during recording sessions
- Battery-aware to prevent drain

### 6. **Cloud Storage & Sync**
- Unlimited meeting history for premium users
- Secure cloud storage via Supabase
- Cross-device access (future web app integration planned)

### 7. **Subscription Management**
- **Free Tier**: 180 minutes/month (3 hours), basic features, ads
- **Starter Plan** (R149/month): 900 minutes/month (15 hours), no ads, PDF exports
- **Pro Plan** (R199/month): 1,500 minutes/month (25 hours), priority processing
- RevenueCat integration for subscription management
- Guest mode for trial without account creation

---

## 🏗 Technical Architecture

### Mobile App Stack
- **Framework**: React Native + Expo (v51.0.8)
- **Router**: Expo Router v3 (file-based routing)
- **State Management**: React Context API
- **Authentication**: Supabase Auth (email/password, Google OAuth, Apple Sign-In)
- **Database**: Supabase (PostgreSQL) for user data, transcriptions, usage tracking
- **Payments**: RevenueCat (handles iOS/Android subscriptions)
- **Analytics**: Google Mobile Ads (free tier monetization)

### AI/Transcription Services
1. **Google Cloud Speech-to-Text V2** (Primary for African languages)
   - Chirp 2 model optimized for African languages
   - Supports 11 African languages
   - Intelligent API selection:
     - **Recognize API**: < 60 seconds (synchronous)
     - **BatchRecognize API**: > 60 seconds (async, up to 8 hours)
   - Cloud Storage integration for large files

2. **AssemblyAI** (Global languages + English summarization)
   - 99 languages including English, Afrikaans, European languages
   - AI summarization for English transcriptions
   - Speaker diarization included

3. **Lelapa AI** (Fallback for Sesotho)
   - Supports Sesotho (not available in Google Cloud)
   - Note: Experiencing intermittent 502 errors (infrastructure issue)

### Cloud Infrastructure
- **Cloud Storage**: `umncediai-transcriptions` bucket (us-central1)
- **Cloud Functions**: Signed URL generation for secure uploads
- **Service Account**: Authentication without exposing private keys on device
- **Supabase**: User management, database, storage

### Security & Privacy
- No API keys stored in app (uses Cloud Functions for secure access)
- RevenueCat handles payment processing (PCI compliance)
- Supabase Row Level Security (RLS) for data isolation
- Deep linking for password reset flow (intermediary Netlify page)

---

## 📄 Landing Page Structure

### Navigation
- **Logo**: CoworkAI branding with "by Uhadi Technology" subtitle
- **Links**: Features, Languages, Pricing, Get Started (CTA)
- **Mobile Menu**: Hamburger menu for responsive design

### Hero Section
- **Headline**: "Your Multilingual AI Meeting Assistant"
- **Rotating Taglines**: Same message in 5 languages (English, isiZulu, Sepedi, Afrikaans, Swahili)
- **CTA Buttons**: Download Now (primary), Learn More (secondary)
- **Value Badges**: 11+ African Languages, Real-time Transcription, AI Summaries

### Features Section (8 Cards)
1. Multilingual Transcription
2. Speaker Identification
3. AI-Powered Summaries
4. Professional Exports
5. Smart Reminders
6. Ad-Free Experience (premium)
7. Secure Cloud Storage
8. Long Recording Support (up to 8 hours)

### Languages Section
- **South African Languages**: isiZulu, isiXhosa, Sepedi, Sesotho
- **African Languages**: Swahili, Yoruba, Hausa, Igbo, Amharic, Oromo, Shona, Wolof
- **Global Languages**: English, Afrikaans, Spanish, French, Portuguese, German, Italian, Dutch + 90 more
- **Tech Stack Showcase**: Google Cloud, AssemblyAI, Lelapa AI logos

### Pricing Section (3 Tiers)
1. **Free**: R0/month, 180 minutes, basic features, ads
2. **Starter** (Recommended): R149/month, 900 minutes, no ads, PDF exports
3. **Pro**: R199/month, 1,500 minutes, unlimited session length, priority processing

### How It Works (4 Steps)
1. Record meeting with language selection
2. AI transcribes with speaker identification
3. Get AI-generated summaries and insights
4. Export as PDF or share via email

### Download Section
- **Google Play**: Active download link (update with real store URL)
- **App Store**: "Coming Soon" (iOS version in development)
- **Guest Mode CTA**: Emphasize trying without signup

### Footer
- **About**: Company info, mission statement
- **Links**: Features, Languages, Pricing, Download
- **Legal**: Privacy Policy, Terms of Use
- **Contact**: support@uhadi.co.za
- **Social**: Placeholder links for Twitter, LinkedIn, Instagram

---

## 🎨 Design Philosophy

### Visual Identity
- **Primary Color**: `#2196F3` (Blue) - Trust, technology, professionalism
- **Secondary Color**: `#9C27B0` (Purple) - Creativity, AI/innovation
- **Accent Color**: `#4CAF50` (Green) - Success, growth
- **Typography**: System fonts for performance (-apple-system, Segoe UI, Roboto)

### User Experience Principles
1. **Mobile-First**: Responsive design optimized for mobile viewing
2. **Progressive Disclosure**: Show essential info first, details on interaction
3. **Clear Hierarchy**: Large headings, scannable content, visual grouping
4. **Trust Signals**: Technology logos, pricing transparency, legal compliance
5. **Speed**: Lightweight CSS/JS, no heavy frameworks, optimized animations

### Accessibility
- Semantic HTML5 structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Responsive typography (scales with viewport)

---

## 📁 File Structure

```
landing-page/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript interactivity
└── README.md           # This documentation file
```

### index.html
- **Size**: ~500 lines
- **Sections**: 10 major sections (nav, hero, features, languages, pricing, how-it-works, download, footer)
- **SEO**: Meta tags, structured headings, semantic HTML
- **Accessibility**: ARIA labels, alt text placeholders

### styles.css
- **Size**: ~1000 lines
- **Architecture**: Component-based CSS with clear section comments
- **Features**:
  - CSS Variables for theming
  - Mobile-first responsive breakpoints
  - Smooth animations and transitions
  - Grid and Flexbox layouts
- **Performance**: No external CSS frameworks, optimized selectors

### script.js
- **Size**: ~300 lines
- **Features**:
  - Mobile menu toggle with animation
  - Rotating taglines (5 languages)
  - Smooth scroll for anchor links
  - Intersection Observer for scroll animations
  - Event tracking placeholders (GA ready)
  - Debounced scroll handlers for performance
  - Easter egg (Konami code)
- **Performance**: Vanilla JS (no jQuery), minimal DOM manipulation

---

## 🚀 Deployment Guide

### Quick Deploy Options

#### Option 1: Netlify (Recommended)
1. Push files to GitHub repository
2. Connect Netlify to repo
3. Build settings: None required (static site)
4. Deploy URL: `https://coworkai.netlify.app` (or custom domain)

**Netlify Configuration**:
```toml
# netlify.toml
[build]
  publish = "landing-page"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to `landing-page/` directory
3. Run `vercel deploy`
4. Follow prompts for production deployment

#### Option 3: GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to `main` branch, `/landing-page` folder
4. Access at: `https://[username].github.io/[repo-name]`

#### Option 4: Custom Hosting (cPanel/FTP)
1. Upload `index.html`, `styles.css`, `script.js` to public_html
2. Ensure index.html is in root directory
3. Configure .htaccess for clean URLs (optional)

### Custom Domain Setup
1. Purchase domain (e.g., `coworkai.co.za`)
2. Add DNS records:
   - **A Record**: Point to hosting IP
   - **CNAME**: `www` → `coworkai.co.za`
3. Configure SSL certificate (Let's Encrypt via hosting provider)

### Pre-Launch Checklist
- [ ] Update Google Play link with actual store URL
- [ ] Add real company logo/favicon images
- [ ] Configure analytics (Google Analytics, Mixpanel)
- [ ] Test on real mobile devices (iOS/Android browsers)
- [ ] Run Lighthouse audit (target: 95+ performance score)
- [ ] Validate HTML/CSS (W3C validator)
- [ ] Test all CTAs and links
- [ ] Configure contact form/email forwarding
- [ ] Set up social media accounts and update links
- [ ] Add privacy policy and terms of use pages

---

## 📊 Analytics Integration

### Google Analytics 4 (GA4)

Add this script before closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Event Tracking (Already Implemented)
The `script.js` file includes tracking functions ready for GA4:
- Button clicks (CTAs)
- Pricing plan selections
- Download button clicks
- Navigation interactions

Uncomment the `gtag()` calls in `script.js` after adding GA4.

### Recommended Events to Track
1. **Conversions**:
   - Download button click (primary goal)
   - Pricing plan selection
   - Email signup (if added)

2. **Engagement**:
   - Time on page
   - Scroll depth
   - Video plays (if demo videos added)

3. **User Flow**:
   - Section visibility (which sections users view)
   - Exit pages
   - Referral sources

---

## 🔍 SEO Optimization

### On-Page SEO (Already Implemented)
- ✅ Descriptive `<title>` tag
- ✅ Meta description (155 characters)
- ✅ Meta keywords
- ✅ Semantic HTML5 structure
- ✅ Heading hierarchy (H1 → H2 → H3)
- ✅ Alt text placeholders for images

### Additional SEO Improvements

#### 1. Add Structured Data (Schema.org)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CoworkAI",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "ZAR"
  },
  "operatingSystem": "Android",
  "description": "Multilingual AI meeting assistant for African languages"
}
</script>
```

#### 2. Open Graph Tags (Social Sharing)
```html
<meta property="og:title" content="CoworkAI - Your Multilingual AI Meeting Assistant">
<meta property="og:description" content="Record, transcribe, and summarize meetings in 11+ African languages">
<meta property="og:image" content="https://coworkai.co.za/og-image.jpg">
<meta property="og:url" content="https://coworkai.co.za">
<meta name="twitter:card" content="summary_large_image">
```

#### 3. Sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://coworkai.co.za/</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
</urlset>
```

#### 4. Robots.txt
```
User-agent: *
Allow: /
Sitemap: https://coworkai.co.za/sitemap.xml
```

---

## 🔮 Future Enhancements

### Phase 1: Content Additions
- [ ] Add demo video showcasing app in action
- [ ] Include customer testimonials/case studies
- [ ] Add FAQ section addressing common questions
- [ ] Create blog section for SEO content (transcription tips, language guides)

### Phase 2: Interactive Features
- [ ] Add live chat support widget
- [ ] Implement contact form with email notifications
- [ ] Add interactive language selector/demo
- [ ] Include pricing calculator (estimate minutes needed)

### Phase 3: Technical Improvements
- [ ] Progressive Web App (PWA) capabilities
- [ ] Service Worker for offline functionality
- [ ] Implement A/B testing for CTAs
- [ ] Add exit-intent popup for lead capture

### Phase 4: Marketing Integration
- [ ] Email newsletter signup with drip campaigns
- [ ] Integration with CRM (HubSpot/Mailchimp)
- [ ] Referral program landing page
- [ ] Partner/affiliate program page

### Phase 5: Web App Integration
The CoworkAI mobile app is planned to have a web version. This landing page can evolve into:
- **Web App Gateway**: Login portal to access transcriptions via browser
- **Unified Experience**: Same RevenueCat subscriptions work on mobile and web
- **Cross-Device Sync**: Start recording on mobile, review/edit on desktop

---

## 📱 Mobile App Details (Reference)

### Current App Status
- **Version**: v1.0.10 (versionCode 32)
- **Platform**: Android (Google Play)
- **iOS Status**: Coming soon (TestFlight testing in progress)
- **Framework**: React Native + Expo 51.0.8
- **Bundle ID**: com.umncediai.newapp
- **Deep Link Scheme**: `coworkai://`

### Key Screens
1. **Home Screen**: Usage stats, tier badge, CTA to start transcription
2. **Transcription Screen**: Language selection, record button, real-time duration
3. **History Screen**: Saved transcriptions with search/filter
4. **Profile Screen**: Account management, subscription status, settings
5. **Subscription Screen**: Pricing plans with RevenueCat integration

### Authentication Flow
- Email/Password (Supabase)
- Google Sign-In (OAuth 2.0)
- Apple Sign-In (iOS only)
- Guest Mode (anonymous RevenueCat customer ID)

### Usage Limits (Enforced by app)
- **Free**: 180 minutes/month
- **Starter**: 900 minutes/month
- **Pro**: 1,500 minutes/month
- Resets monthly, tracked in Supabase `usage_records` table

---

## 🛠 Troubleshooting

### Common Issues

#### 1. Mobile Menu Not Working
- **Cause**: JavaScript not loading
- **Fix**: Check browser console for errors, ensure `script.js` is loaded

#### 2. Animations Not Smooth on Mobile
- **Cause**: Too many animated elements
- **Fix**: Reduce Intersection Observer threshold, use CSS transforms (hardware-accelerated)

#### 3. Layout Breaks on Small Screens
- **Cause**: Fixed widths or missing media queries
- **Fix**: Check `styles.css` responsive breakpoints (768px, 480px)

#### 4. Tagline Not Rotating
- **Cause**: JavaScript error or element ID mismatch
- **Fix**: Verify `id="rotatingText"` exists in HTML, check console for errors

---

## 📞 Support & Contact

### For Landing Page Issues
- **Developer**: Uhadi Technology
- **Email**: support@uhadi.co.za
- **Website**: https://uhadi.co.za

### For App-Related Questions
- **In-App Support**: Profile → Help & Support
- **Email**: support@uhadi.co.za
- **Privacy Policy**: https://uhadi.co.za/privacy-policy.html

---

## 📄 License & Credits

### Copyright
© 2026 Uhadi Technology. All rights reserved.

### Third-Party Services
- **Google Cloud Platform**: Speech-to-Text V2 API
- **AssemblyAI**: Transcription and summarization API
- **Lelapa AI**: African language transcription
- **Supabase**: Backend infrastructure
- **RevenueCat**: Subscription management
- **Expo**: React Native framework

### Design Resources
- **Icons**: Emoji Unicode (no external icon libraries)
- **Fonts**: System fonts (performance optimization)
- **Colors**: Custom palette based on CoworkAI branding

---

## 🚀 Quick Start

1. Clone repository or download files
2. Open `index.html` in browser to preview locally
3. Make customizations (update links, colors, content)
4. Deploy to hosting platform (Netlify/Vercel recommended)
5. Update Google Play link with actual store URL
6. Configure analytics and tracking
7. Test on real devices before launch

---

**Built with ❤️ by Uhadi Technology for African professionals**

*This landing page is part of the CoworkAI ecosystem - bringing AI-powered productivity to African workplaces.*
