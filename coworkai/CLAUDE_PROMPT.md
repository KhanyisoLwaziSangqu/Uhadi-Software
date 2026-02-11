# CoworkAI Project - Comprehensive Claude Code Prompt

> **Use this prompt to onboard any Claude Code session working on CoworkAI (landing page or mobile app)**

---

## 🎯 Project Summary

**CoworkAI** is a mobile-first AI meeting assistant built by **Uhadi Technology** that provides professional transcription and summarization services with first-class support for **11+ African languages** (isiZulu, isiXhosa, Sepedi, Sesotho, Swahili, Yoruba, Hausa, Igbo, Amharic, Oromo, Shona, Wolof) plus global languages.

### Key Differentiator
While competitors focus on English/European languages, CoworkAI serves African professionals by supporting indigenous languages with the same quality as English, using cutting-edge AI from Google Cloud, AssemblyAI, and Lelapa AI.

---

## 📱 Product Overview

### What CoworkAI Does
1. **Records** meetings with user-selected language
2. **Transcribes** speech to text using AI (automatic provider routing)
3. **Identifies Speakers** (diarization) - labels who said what
4. **Generates Summaries** - AI-powered meeting summaries and action items
5. **Exports Minutes** - Professional PDFs with timestamps and speaker labels

### Target Users
- African professionals conducting business meetings
- Multilingual teams needing accurate transcription
- Organizations requiring meeting documentation
- Users who speak isiZulu, isiXhosa, Sepedi, Swahili, and other African languages

### Business Model
- **Free Tier**: 180 minutes/month (3 hours), basic features, ads
- **Starter Plan**: R149/month, 900 minutes (15 hours), no ads, PDF exports
- **Pro Plan**: R199/month, 1,500 minutes (25 hours), priority processing
- **Guest Mode**: Try without signup (anonymous RevenueCat ID)

---

## 🏗 Technical Architecture

### Mobile App Stack
```
Framework:     React Native + Expo 51.0.8
Router:        Expo Router v3 (file-based routing)
Language:      TypeScript
State:         React Context API
Auth:          Supabase (email, Google OAuth, Apple Sign-In)
Database:      Supabase (PostgreSQL)
Subscriptions: RevenueCat (iOS + Android)
Payments:      Google Play / App Store (via RevenueCat)
Ads:           Google Mobile Ads (free tier only)
Storage:       Supabase Storage + Google Cloud Storage
```

### AI/Transcription Services

#### 1. Google Cloud Speech-to-Text V2 (Primary for African Languages)
- **Model**: Chirp 2 (optimized for African languages)
- **Languages**: 11 African languages (isiZulu, isiXhosa, Sepedi, Swahili, Yoruba, Hausa, Igbo, Amharic, Oromo, Shona, Wolof, Sesotho not supported)
- **API Selection** (Intelligent Duration Routing):
  - **< 60 seconds**: Recognize API (synchronous, fast)
  - **> 60 seconds**: BatchRecognize API (async, up to 8 hours)
- **Cloud Storage**: Large files uploaded to `umncediai-transcriptions` bucket
- **Pricing**: $0.004/min (~R0.07/min), 60 min/month free tier

#### 2. AssemblyAI (Global Languages + Summarization)
- **Languages**: 99 languages (English, Afrikaans, Spanish, French, Portuguese, etc.)
- **Features**: Transcription + AI summarization (English only)
- **Pricing**: $0.27/hour (~R5/hour)

#### 3. Lelapa AI (Fallback for Sesotho)
- **Languages**: Sesotho (sot) - not available in Google Cloud or AssemblyAI
- **Status**: Intermittent 502 errors (infrastructure issues)
- **Future**: May be deprecated in favor of Google Cloud as primary

### Routing Logic (TranscriptionRouter.ts)
1. User selects language in UI
2. Router determines provider:
   - **African languages** → Google Cloud Speech-to-Text V2
   - **English/Afrikaans/Global** → AssemblyAI
   - **Sesotho** → Lelapa AI
3. Router checks duration:
   - **< 60s** → Synchronous API
   - **> 60s** → Upload to Cloud Storage → Async API
4. Returns transcription with speaker labels and timestamps

### Recording Format
- **Format**: WAV (LINEAR16 encoding)
- **Sample Rate**: 16kHz
- **Channels**: Mono
- **File Size**: ~1.92 MB per minute
- **Why WAV**: Supported by all providers, lossless quality

---

## 📂 Project Structure

```
UmncediAI/
├── app/                          # Expo Router screens
│   ├── (auth)/                   # Authentication screens
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── reset-password.tsx
│   ├── (tabs)/                   # Main app tabs
│   │   ├── index.tsx             # Home screen (usage stats, CTA)
│   │   ├── a-TranscriptionScreen.tsx  # Recording screen
│   │   ├── b-history.tsx         # Transcription history
│   │   ├── profile.tsx           # User profile, settings
│   │   ├── _layout.tsx           # Tab navigation layout
│   ├── (subscription)/           # Subscription flow
│   │   ├── index.tsx             # Pricing plans (RevenueCat)
│   ├── contexts/                 # React Context providers
│   │   ├── AuthContext.tsx       # User authentication state
│   ├── services/                 # Business logic
│   │   ├── TranscriptionRouter.ts         # AI provider routing
│   │   ├── CloudStorageUploader.ts        # Google Cloud Storage
│   │   ├── UsageTracker.ts                # Monthly limit tracking
│   │   ├── RevenueCatService.ts           # Subscription management
│   │   ├── SubscriptionSync.ts            # Sync RevenueCat ↔ Supabase
│   │   ├── AdService.ts                   # Google Mobile Ads
│   ├── types/                    # TypeScript type definitions
│   │   ├── database.types.ts     # Supabase table types
│   ├── _layout.tsx               # Root layout
├── assets/                       # Images, icons, splash screens
├── components/                   # Reusable UI components
├── constants/                    # App constants (colors, etc.)
├── patches/                      # npm patch-package fixes
│   ├── expo-dev-menu+5.0.23.patch
│   ├── react-native-google-mobile-ads+14.8.1.patch
├── cloud-functions/              # Google Cloud Functions
│   ├── index.js                  # generateSignedUrl function
├── landing-page/                 # Marketing website (THIS PROJECT)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── README.md
│   ├── CLAUDE_PROMPT.md          # This file
├── android/                      # Native Android code (prebuild)
├── app.config.js                 # Expo configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── CLAUDE.md                     # Technical documentation (CRITICAL)
├── Notes/                        # Project notes and guides
│   ├── Features                  # Feature roadmap
│   ├── A Logs                    # Development logs
│   ├── Commands                  # Useful commands
│   ├── GOOGLE_CLOUD_IMPLEMENTATION_GUIDE.md
```

---

## 🎨 UI/UX Design Philosophy

### Visual Design
- **Color Palette**:
  - Primary: `#2196F3` (Blue) - Trust, professionalism
  - Secondary: `#9C27B0` (Purple) - Innovation, AI
  - Accent: `#4CAF50` (Green) - Success, growth
  - Background: `#f5f5f5` (Light gray)
- **Typography**: System fonts (Roboto/San Francisco)
- **Icons**: Emoji-based (performance, no icon libraries)

### Key Screens

#### 1. Home Screen (index.tsx)
- **Purpose**: Dashboard showing usage stats and primary CTA
- **Elements**:
  - Hero: "Welcome to CoworkAI"
  - Rotating taglines (5 languages)
  - Usage card: Minutes remaining, tier badge, progress bar
  - "Start Transcription" CTA button
  - Feature info modal
  - Banner ads (free tier only)
- **User States**:
  - Guest (no account): Shows plan CTA
  - Free user: Shows usage + upgrade CTA
  - Paid user: Shows usage + manage subscription link

#### 2. Transcription Screen (a-TranscriptionScreen.tsx)
- **Purpose**: Record and transcribe meetings
- **Elements**:
  - Language selector dropdown (11+ languages)
  - Record button (tap to start/stop)
  - Real-time duration counter
  - Audio waveform visualization (optional)
  - Processing indicator during transcription
- **Flow**:
  1. User selects language
  2. Taps record button
  3. Recording starts (WAV format)
  4. User taps stop
  5. Audio uploaded to cloud (if > 60s)
  6. AI transcription begins
  7. Results displayed with speaker labels

#### 3. History Screen (b-history.tsx)
- **Purpose**: View past transcriptions
- **Elements**:
  - List of transcriptions (date, title, duration)
  - Search/filter functionality
  - Tap to view full transcript
  - Share/export buttons
  - Delete functionality
- **Data Source**: Supabase `transcriptions` table

#### 4. Subscription Screen ((subscription)/index.tsx)
- **Purpose**: Show pricing plans and handle purchases
- **Elements**:
  - 3 pricing cards (Free, Starter, Pro)
  - Feature comparison
  - "Subscribe Now" buttons (RevenueCat)
  - "Restore Purchases" link
  - Legal links (Terms, Privacy Policy)
- **Flow**:
  1. User taps Subscribe button
  2. RevenueCat handles payment flow
  3. On success, SubscriptionSync updates Supabase
  4. UsageTracker updates limits

---

## 🔑 Key Features & Implementation

### 1. Multilingual Support
**File**: `app/services/TranscriptionRouter.ts`

The app supports 11+ African languages by routing to the best AI provider:

```typescript
// Example routing logic
if (language === 'zu-ZA' || language === 'xh-ZA' || language === 'nso-ZA') {
  // Use Google Cloud Speech-to-Text V2 (Chirp 2)
  return await GoogleCloudService.transcribe(audioUri, language);
} else if (language === 'en' || language === 'af' || language === 'es') {
  // Use AssemblyAI (global languages + summarization)
  return await AssemblyAIService.transcribe(audioUri);
} else if (language === 'sot') {
  // Use Lelapa AI (Sesotho only)
  return await LelapaService.transcribe(audioUri, language);
}
```

**Language Codes**:
- isiZulu: `zu-ZA`
- isiXhosa: `xh-ZA`
- Sepedi: `nso-ZA`
- Sesotho: `sot` (Lelapa only)
- Swahili: `sw-KE`
- English: `en`
- Afrikaans: `af`

### 2. Usage Tracking & Limits
**File**: `app/services/UsageTracker.ts`

Tracks monthly transcription minutes per user:

```typescript
// Example usage check
const stats = await UsageTracker.getUsageStats(userId);
if (stats.minutesUsed >= stats.minutesLimit) {
  // User has exceeded limit
  Alert.alert("Limit Reached", "Upgrade to continue transcribing");
  return;
}

// After transcription
await UsageTracker.recordUsage(userId, durationInMinutes);
```

**Limits by Tier**:
- Free: 180 minutes/month
- Starter: 900 minutes/month
- Pro: 1,500 minutes/month

**Database**: Supabase `usage_records` table
- Columns: `user_id`, `month`, `minutes_used`, `minutes_limit`, `tier`

### 3. Subscription Management
**Files**: `app/services/RevenueCatService.ts`, `app/services/SubscriptionSync.ts`

RevenueCat handles subscriptions, synced to Supabase:

```typescript
// Purchase flow
const { success, customerInfo } = await RevenueCatService.purchasePackage(pkg);
if (success && user?.id) {
  // Sync subscription status to Supabase
  await SubscriptionSync.syncSubscriptionStatus(user.id);
  // Update usage limits
  await UsageTracker.syncUsageLimitsWithTier(user.id);
}
```

**RevenueCat Configuration**:
- Products: `starter_monthly`, `pro_monthly`
- Platforms: Android (Google Play), iOS (App Store) coming soon
- Offerings API: Fetches available packages dynamically

### 4. Speaker Identification (Diarization)
**Output Format**:
```json
{
  "text": "Full transcript text",
  "utterances": [
    {
      "speaker": "Speaker A",
      "text": "Hello everyone, let's begin the meeting.",
      "start": 0.0,
      "end": 3.5
    },
    {
      "speaker": "Speaker B",
      "text": "Good morning, I have the report ready.",
      "start": 3.6,
      "end": 6.2
    }
  ]
}
```

**Providers Supporting Diarization**:
- ✅ Google Cloud Speech-to-Text V2 (diarizationConfig)
- ✅ AssemblyAI (speaker_labels: true)
- ❌ Lelapa AI (no diarization support)

### 5. Cloud Storage Integration
**File**: `app/services/CloudStorageUploader.ts`

For recordings > 60 seconds:
1. Generate signed URL via Cloud Function
2. Upload WAV file to `umncediai-transcriptions` bucket
3. Pass Cloud Storage URI to BatchRecognize API
4. Delete file after transcription completes

**Security**: No private keys on device, uses signed URLs

### 6. Guest Mode
Users can try the app without creating an account:
- RevenueCat generates anonymous customer ID
- Usage tracked via RevenueCat ID instead of Supabase user ID
- Limits: Same as free tier (180 min/month)
- Upgrade flow: Prompts account creation after purchase

---

## 📋 Database Schema (Supabase)

### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### transcriptions
```sql
CREATE TABLE transcriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  language TEXT NOT NULL,
  audio_uri TEXT,
  transcript_text TEXT,
  utterances JSONB,  -- Speaker diarization data
  summary TEXT,
  duration_seconds INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### usage_records
```sql
CREATE TABLE usage_records (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  month TEXT NOT NULL,  -- Format: "2026-02"
  minutes_used DECIMAL(10,2) DEFAULT 0,
  minutes_limit INTEGER NOT NULL,
  tier TEXT NOT NULL,  -- 'free', 'starter', 'pro'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, month)
);
```

### subscription_status
```sql
CREATE TABLE subscription_status (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) UNIQUE,
  revenuecat_customer_id TEXT,
  tier TEXT DEFAULT 'free',  -- 'free', 'starter', 'pro'
  active BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🛠 Development Workflow

### Local Development
```powershell
# Install dependencies
npm install

# Run on Android emulator
npx expo run:android

# Run on iOS simulator (Mac only)
npx expo run:ios

# Start Expo dev server
npx expo start
```

### Building for Production
```powershell
# Android (Google Play)
eas build --platform android --profile production

# iOS (App Store) - Coming soon
eas build --platform ios --profile production
```

**Important**: Update version numbers in BOTH locations before building:
- `app.config.js`: `version` and `android.versionCode`
- `android/app/build.gradle`: `versionCode` and `versionName`

### Patching Dependencies
After installing new native modules:
```powershell
# Rebuild native code
Remove-Item -Recurse -Force android
npx expo prebuild --clean

# Re-apply patches
npx patch-package
```

**Current Patches**:
1. `expo-dev-menu@5.0.23` - Dev menu fix
2. `react-native-google-mobile-ads@14.8.1` - AndroidManifest duplicate ID fix

---

## 🚨 Critical Issues & Solutions

### 1. Metro Serializer Bug (SOLVED)
**Issue**: `@expo/cli` versions > 0.18.13 cause bundle serialization errors.

**Solution**: Lock Expo to version `51.0.8` (uses `@expo/cli@0.18.13`).
```json
"expo": "51.0.8"  // NO caret (^)
```

### 2. Typed Routes Disabled (SOLVED)
**Issue**: Expo Router typed routes caused "screen doesn't exist" errors in production.

**Solution**: Removed `experiments.typedRoutes: true` from `app.config.js`.

### 3. Password Reset on Mobile (SOLVED)
**Issue**: Mobile browsers block automatic deep link redirects from Supabase email links.

**Solution**: Created intermediary Netlify page that extracts tokens and prompts user to manually open app.
- URL: `https://incredible-daffodil-230734.netlify.app/password-reset-redirect.html`
- Flow: Email → Netlify page → User clicks "Open App" → Deep link with tokens

### 4. Lelapa AI Reliability (ONGOING)
**Issue**: Lelapa API experiences intermittent 502 errors.

**Impact**: Sesotho transcriptions may fail.

**Mitigation**: Google Cloud is primary provider; Lelapa used only for Sesotho. Consider adding retry logic or deprecating Lelapa.

---

## 🎯 Current Focus & Roadmap

### Current Sprint (from Notes/Features)
1. ✅ Fix subscribe page showing incorrect minutes for Starter plan
2. 🔄 Build working web browser version of app
   - Same RevenueCat subscriptions
   - Cross-device sync (mobile + web)
   - Access transcriptions from browser
3. 🔄 Test extensively with real users (Mommy, Sange)
4. 🔄 Marketing push (social media, tech communities)

### Next Sprints
1. **Premium Export Formats**: PDF with formatting, DOCX, CSV
2. **Cloud Storage for Transcriptions**: Auto-sync across devices
3. **iOS Version**: TestFlight → App Store
4. **Enterprise Version**: Usage-based or team subscriptions
5. **Real-Time Transcription**: Pro tier exclusive, English only initially

---

## 🎨 Landing Page Details (Current Project)

### Purpose
Convert website visitors into mobile app downloads by:
1. Explaining CoworkAI's value proposition
2. Showcasing African language support
3. Displaying transparent pricing
4. Providing clear download CTAs

### Key Sections
1. **Hero**: Rotating taglines in 5 languages, download CTAs
2. **Features**: 8 feature cards highlighting capabilities
3. **Languages**: Visual showcase of 11+ African languages
4. **Pricing**: 3-tier comparison (Free, Starter, Pro)
5. **How It Works**: 4-step process (Record → Transcribe → Summarize → Export)
6. **Download**: Google Play + App Store (coming soon)

### Design Highlights
- **Mobile-first**: Responsive design optimized for mobile viewing
- **Fast Loading**: Vanilla JS/CSS, no frameworks, < 100KB total
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **SEO Optimized**: Meta tags, structured data ready, sitemap ready

### Files
- `index.html`: Structure (500 lines)
- `styles.css`: Styling (1000 lines, CSS variables, mobile-first)
- `script.js`: Interactivity (300 lines, vanilla JS)
- `README.md`: Complete documentation
- `CLAUDE_PROMPT.md`: This file

---

## 📚 Key Documentation Files

### CLAUDE.md (MUST READ)
Contains critical technical decisions and solutions:
- Expo Router typed routes issue
- Password reset flow architecture
- Transcription routing system (3 providers)
- Metro serializer bug fix
- Version number update process
- Native module installation process
- AndroidManifest merge conflicts
- Subscription price update

**Location**: `c:\Users\Khanyiso Sangqu\Uhadi\UmncediAI\CLAUDE.md`

### Notes/Features
Roadmap and feature wishlist:
- Current sprint tasks
- User feedback (Mommy, Sange)
- Future enhancements (real-time transcription, Teams integration, calendar sync)

**Location**: `c:\Users\Khanyiso Sangqu\Uhadi\UmncediAI\Notes\Features`

### Notes/GOOGLE_CLOUD_IMPLEMENTATION_GUIDE.md
Google Cloud Speech-to-Text V2 setup guide:
- API setup
- Cloud Storage bucket configuration
- Service account creation
- Cloud Function deployment

---

## 🤖 Working with Claude Code on This Project

### When Starting a Session

1. **Read CLAUDE.md first**:
   ```
   Read c:\Users\Khanyiso Sangqu\Uhadi\UmncediAI\CLAUDE.md
   ```

2. **Understand current sprint**:
   ```
   Read c:\Users\Khanyiso Sangqu\Uhadi\UmncediAI\Notes\Features
   ```

3. **Locate relevant files**:
   ```
   Find all files related to [feature/component]:
   Glob **/*[keyword]*.{ts,tsx,js}
   ```

### Common Tasks

#### Adding a New Feature
1. Check if feature exists in roadmap (Notes/Features)
2. Identify affected files (UI screens, services, database)
3. Update TypeScript types if needed (types/database.types.ts)
4. Test with usage limits (free vs. paid tier)
5. Document in CLAUDE.md if it's a significant change

#### Debugging Transcription Issues
1. Check TranscriptionRouter.ts for provider selection logic
2. Verify language code mapping (e.g., isiZulu = `zu-ZA`)
3. Check audio format (must be WAV, 16kHz, mono)
4. Test with < 60s recording (sync API) and > 60s (async API)
5. Check Cloud Function logs for signed URL generation

#### Updating Subscription Tiers
1. Update pricing in `(subscription)/index.tsx`
2. Update limits in `UsageTracker.ts`
3. Update landing page pricing section
4. Update RevenueCat dashboard (product metadata)
5. Document price change in CLAUDE.md

### Code Style Guidelines
- **TypeScript**: Strict mode enabled, avoid `any` (use `as any` only for Expo Router navigation)
- **React**: Functional components, hooks, Context API
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: Document complex logic, especially AI routing decisions
- **File Structure**: Group by feature (screens, services, contexts)

---

## 🔗 External Resources

### Documentation Links
- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Supabase Docs](https://supabase.com/docs)
- [RevenueCat Docs](https://docs.revenuecat.com/)
- [Google Cloud Speech-to-Text](https://cloud.google.com/speech-to-text/docs)
- [AssemblyAI Docs](https://www.assemblyai.com/docs)

### App Links
- **Supabase Dashboard**: https://supabase.com/dashboard/project/zvsmgppapnzllgpjcssz
- **RevenueCat Dashboard**: https://app.revenuecat.com/
- **Google Cloud Console**: https://console.cloud.google.com/
- **EAS Build Dashboard**: https://expo.dev/accounts/uhadi/projects/NewUmncediAI

### Social Media (Planned)
- Twitter: @CoworkAI
- LinkedIn: Uhadi Technology
- Instagram: @coworkai

---

## ✅ Pre-Launch Checklist (When Working on Production)

### Mobile App
- [ ] Update version numbers (app.config.js + build.gradle)
- [ ] Test on real Android device (not just emulator)
- [ ] Test all payment flows (purchase, restore, cancellation)
- [ ] Test usage limits (free, starter, pro)
- [ ] Test all AI providers (Google Cloud, AssemblyAI, Lelapa)
- [ ] Verify ads display correctly (free tier only)
- [ ] Test guest mode → account creation flow
- [ ] Run EAS build with production profile

### Landing Page
- [ ] Update Google Play link with actual store URL
- [ ] Add real logo/favicon images
- [ ] Configure Google Analytics
- [ ] Test on mobile browsers (iOS Safari, Android Chrome)
- [ ] Run Lighthouse audit (target: 95+ performance)
- [ ] Validate HTML/CSS (W3C validator)
- [ ] Test all CTAs and anchor links
- [ ] Add privacy policy and terms pages

---

## 🎓 Onboarding Summary

CoworkAI is a **mobile-first AI meeting assistant** that transcribes meetings in **11+ African languages** (isiZulu, isiXhosa, Sepedi, Swahili, etc.) using **Google Cloud, AssemblyAI, and Lelapa AI**. The app is built with **React Native + Expo**, uses **Supabase** for backend, and **RevenueCat** for subscriptions.

**Key Features**:
- Multilingual transcription (11+ African languages)
- Speaker identification (diarization)
- AI-powered summaries and action items
- Professional PDF exports
- Tiered pricing: Free (180 min), Starter (900 min), Pro (1,500 min)
- Guest mode (try without signup)

**Landing Page**: This project is the marketing website that converts visitors into app downloads by showcasing features, languages, and pricing.

**Current Focus**: Building web browser version, testing with real users, and marketing push.

**Critical Files**:
- `CLAUDE.md`: Technical decisions and solutions (MUST READ)
- `Notes/Features`: Roadmap and current sprint
- `app/services/TranscriptionRouter.ts`: AI provider routing logic
- `app/(subscription)/index.tsx`: Pricing and purchase flow

**Architecture**:
- User records in-app → Audio saved as WAV → Uploaded to Cloud Storage (if > 60s) → Routed to AI provider → Transcription returned with speaker labels → Saved to Supabase → Usage tracked

**Next Steps**: Read CLAUDE.md, explore codebase structure, and start with current sprint tasks in Notes/Features.

---

**Welcome to the CoworkAI project! 🚀**

*Built with ❤️ by Uhadi Technology for African professionals.*
