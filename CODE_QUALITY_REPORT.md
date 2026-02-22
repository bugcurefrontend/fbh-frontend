## CRITICAL SECURITY ISSUES

### 1. Hardcoded API Secret
- **File**: `src/components/OneAuth.tsx:40`
- **Issue**: Real API client secret hardcoded as fallback
- **Code**: `xClientId: process.env.NEXT_PUBLIC_X_CLIENT_ID || "sNoCucDYc1ok5D8HzktKJUROtXGlD49tSGIPiXzn"`
- **Risk**: Exposed in browser bundle if env var missing
- **Fix**: Remove hardcoded value, fail gracefully if env var not set

### 2. XSS Vulnerability in Footer
- **File**: `src/components/Footer.tsx:176`
- **Issue**: CMS content injected via `dangerouslySetInnerHTML` without sanitization
- **Related**: `app/layout.tsx:71` uses regex string replacement to convert markdown to HTML
- **Risk**: Attacker can inject malicious scripts through CMS
- **Fix**: Use DOMPurify library to sanitize HTML before rendering

### 3. Hardcoded API URLs with Dev Fallbacks
- **Files**:
  - `src/services/api.ts:2`
  - `src/components/plant-tree/ProceedToPay.tsx:183`
  - `src/services/admin.ts`
- **Issue**: Dev API URL `https://api-django.fbh.dev.heartfulness.org` hardcoded as fallback
- **Risk**: Production could accidentally hit dev servers
- **Fix**: Fail gracefully if env var not set, never use dev URLs as fallback

---

## HIGH PRIORITY ISSUES

### 4. PII Logged to Browser Console
- **File**: `src/services/payment.ts`
- **Lines**: 72, 91, 139-145, 163, 169
- **Issue**: Complete donation payloads (name, email, phone) logged to console
- **Other files**: 80+ console.log statements throughout codebase
- **Risk**: User data exposure in browser devtools
- **Fix**: Remove all console.logs or use proper logging library with levels

   

## MEDIUM PRIORITY ISSUES

### 5. Excessive Use of TypeScript `any`
- **Examples** (50+ total instances):
  - `src/services/api.ts:33` - `params: Record<string, any>`
  - `src/services/api.ts:62` - `urlParamsObject: Record<string, any>`
  - `src/components/plant-tree/ProceedToPay.tsx:34-35` - `personalDetails?: any`, `taxDetails?: any`
  - `src/store/userStore.ts:16` - `[key: string]: any`
  - `src/types/project.ts:50,53,55,72,77` - `description: any`, `species: any[]`, `trees: any[]`
  - `src/lib/auth-context.tsx:18` - `[key: string]: any`
  - `app/layout.tsx:46-49` - all layout data typed as `any`
- **Risk**: TypeScript benefits lost, no type safety
- **Fix**: Add proper type definitions for all data structures



### 6. Oversized Components/Hooks
- **File**: `src/components/plant-tree/useTreeCheckout.ts`
  - 625 lines long
  - 18+ state variables
  - 10+ derived values
  - 8+ effects
  - Multiple async operations
- **File**: `src/components/light-box/LightBox.tsx`
  - 541 lines with duplicated validation logic
- **Risk**: Hard to maintain, test, and debug
- **Fix**: Split into smaller, focused hooks and components

### 7. Hardcoded Location Values
- **File**: `src/components/plant-tree/useTreeCheckout.ts:308,321,332,334`
- **Issue**: "Shivgarh, Madhya Pradesh" hardcoded in multiple places
- **File**: `src/components/plant-tree/OrderSummary.tsx:65`
- **Issue**: "Shivgarh, MP" hardcoded in UI
- **Risk**: Can't support multiple locations without code changes
- **Fix**: Make location configurable from API/CMS

---

## LOW PRIORITY ISSUES

### 8. User-Facing Typos
- **"CO2 Sequested"** (should be "Sequestered"):
  - `src/components/account/DashboardTab.tsx:11,47,124`
  - `src/components/account/mock-data.ts:3`
  - `src/components/plant-tree/OrderSummary.tsx:58`
  - `src/components/light-box/NewOrderSummary.tsx:55`
- **"Occassion"** (should be "Occasion"):
  - `src/components/light-box/NewOrderSummary.tsx:52`

### 9. Filename Typos
- `src/components/DownloadCertiifcate.tsx` - should be "Certificate" (double 'i')
- `src/components/about-us/OurJourny.tsx` - should be "Journey"
- `src/components/icons/overview.tsx` - lowercase, inconsistent with other icons
- `src/components/icons/update.tsx` - lowercase, inconsistent with other icons


### 13. Inconsistent File Naming
- Some components use PascalCase (most)
- Some icons use lowercase (overview.tsx, update.tsx)
- **Fix**: Standardize on PascalCase for all component files