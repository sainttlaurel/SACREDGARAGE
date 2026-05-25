# HRVD Car Trading - Known Issues & Roadmap

**Last Updated:** May 25, 2026  
**Status:** In Development  
**Build Status:** ✅ Passing (No TypeScript Errors)

---

## 🔴 CRITICAL ISSUES (Priority 1)

### 1. Supabase Tables Not Created
- **Status:** ⏳ Pending
- **Severity:** CRITICAL
- **Description:** Database tables (inquiries, vehicles, parts, part_orders, vehicle_inquiries) don't exist in Supabase
- **Impact:** Data only persists in localStorage; lost when browser cache cleared
- **Solution:** Create SQL migration with proper schema and RLS policies
- **Estimated Fix Time:** 2-3 hours
- **Files:** `src/lib/supabase.ts`

### 2. Hardcoded Admin Password
- **Status:** ⏳ Pending
- **Severity:** CRITICAL
- **Description:** Admin password "admin123" hardcoded in `AdminPortal.tsx:47`
- **Impact:** Security vulnerability; anyone with code access can login
- **Solution:** Implement proper authentication with hashed passwords or Supabase Auth
- **Estimated Fix Time:** 4-6 hours
- **Files:** `src/pages/AdminPortal.tsx`

### 3. No Real-Time Sync (Using Polling)
- **Status:** ⏳ Pending
- **Severity:** CRITICAL
- **Description:** Inventory and Parts use 2-second polling instead of real-time subscriptions
- **Impact:** Inefficient, battery drain, 2-second delay before updates
- **Solution:** Replace polling with Supabase real-time subscriptions
- **Estimated Fix Time:** 3-4 hours
- **Files:** `src/components/Inventory.tsx`, `src/components/Parts.tsx`, `src/lib/syncToSupabase.ts`

### 4. No Error Boundaries
- **Status:** ⏳ Pending
- **Severity:** CRITICAL
- **Description:** Single component error crashes entire app
- **Impact:** Poor user experience; no fallback UI
- **Solution:** Add React Error Boundary component
- **Estimated Fix Time:** 1 hour
- **Files:** `src/App.tsx`

### 5. Silent Supabase Failures
- **Status:** ⏳ Pending
- **Severity:** CRITICAL
- **Description:** Errors logged to console but not shown to users
- **Impact:** Users don't know if operations failed
- **Solution:** Show Toast notifications for all errors
- **Estimated Fix Time:** 2 hours
- **Files:** `src/lib/supabase.ts`, `src/lib/syncToSupabase.ts`

---

## 🟠 HIGH PRIORITY ISSUES (Priority 2)

### 6. Admin Portal Incomplete
- **Status:** ⏳ Pending
- **Severity:** HIGH
- **Description:** Missing features in admin panel
- **Missing Features:**
  - ❌ "Add Vehicle" button (no form implementation)
  - ❌ "Add Parts" button (missing entirely)
  - ❌ Vehicle Inquiries tracking (separate from general inquiries)
  - ❌ Search/filter functionality
  - ❌ Bulk operations
- **Impact:** Admin can't add new inventory
- **Solution:** Implement missing admin features
- **Estimated Fix Time:** 8-10 hours
- **Files:** `src/pages/AdminPortal.tsx`, `src/components/admin/`

### 7. Large Bundle Size
- **Status:** ⏳ Pending
- **Severity:** HIGH
- **Description:** Bundle size 608.35 kB (165.18 kB gzipped) exceeds 500 kB warning
- **Impact:** Slower page load, higher bandwidth usage
- **Solution:** Implement code splitting and lazy loading
- **Estimated Fix Time:** 4-6 hours
- **Files:** `vite.config.ts`, `src/App.tsx`

### 8. Missing Input Validation
- **Status:** ⏳ Pending
- **Severity:** HIGH
- **Description:** Forms accept any input without validation
- **Impact:** Invalid data in database; poor UX
- **Solution:** Add email, phone, address validation
- **Estimated Fix Time:** 2-3 hours
- **Files:** `src/components/Contact.tsx`, `src/components/PartsPurchaseModal.tsx`

### 9. No Offline Support
- **Status:** ⏳ Pending
- **Severity:** HIGH
- **Description:** App doesn't work without internet connection
- **Impact:** Users can't view data if connection drops
- **Solution:** Implement service workers and offline mode
- **Estimated Fix Time:** 6-8 hours
- **Files:** `src/App.tsx`, `public/`

### 10. Mobile Admin Portal Issues
- **Status:** ⏳ Pending
- **Severity:** HIGH
- **Description:** Photo manager and modals not optimized for mobile
- **Impact:** Poor admin experience on phones/tablets
- **Solution:** Improve responsive design for admin panels
- **Estimated Fix Time:** 4-5 hours
- **Files:** `src/components/admin/AdminInventory.tsx`, `src/components/PartModal.tsx`

---

## 🟡 MEDIUM PRIORITY ISSUES (Priority 3)

### 11. Image Optimization
- **Status:** ⏳ Pending
- **Severity:** MEDIUM
- **Description:** No lazy loading, no WebP format, full-resolution images loaded upfront
- **Impact:** Slower page load, higher bandwidth
- **Solution:** Add lazy loading and image optimization
- **Estimated Fix Time:** 2-3 hours
- **Files:** `src/components/Inventory.tsx`, `src/components/Parts.tsx`, `src/components/GalleryWall.tsx`

### 12. Search & Filtering
- **Status:** ⏳ Pending
- **Severity:** MEDIUM
- **Description:** Admin panels lack search and filter functionality
- **Impact:** Hard to find specific inquiries/orders
- **Solution:** Add search and filtering to admin panels
- **Estimated Fix Time:** 3-4 hours
- **Files:** `src/components/admin/AdminInquiries.tsx`, `src/components/admin/AdminPartOrders.tsx`

### 13. Email Notifications
- **Status:** ⏳ Pending
- **Severity:** MEDIUM
- **Description:** No email sent when inquiries received or orders placed
- **Impact:** Admin doesn't get notified of new inquiries
- **Solution:** Integrate email service (SendGrid, Resend, etc.)
- **Estimated Fix Time:** 4-6 hours
- **Files:** `src/lib/supabase.ts`, `src/components/Contact.tsx`

### 14. Data Export/Import
- **Status:** ⏳ Pending
- **Severity:** MEDIUM
- **Description:** No way to backup or import data
- **Impact:** No backup strategy
- **Solution:** Add CSV export and import functionality
- **Estimated Fix Time:** 3-4 hours
- **Files:** `src/components/admin/`

---

## 🟢 LOW PRIORITY ISSUES (Priority 4)

### 15. Analytics
- **Status:** ⏳ Pending
- **Severity:** LOW
- **Description:** No analytics tracking
- **Impact:** Can't track user behavior
- **Solution:** Integrate Google Analytics or similar
- **Estimated Fix Time:** 2-3 hours

### 16. Customer Reviews
- **Status:** ⏳ Pending
- **Severity:** LOW
- **Description:** No review system for vehicles/parts
- **Impact:** No social proof
- **Solution:** Add review functionality
- **Estimated Fix Time:** 4-5 hours

### 17. Wishlist/Favorites
- **Status:** ⏳ Pending
- **Severity:** LOW
- **Description:** No way for customers to save favorites
- **Impact:** Lower engagement
- **Solution:** Add wishlist feature
- **Estimated Fix Time:** 3-4 hours

---

## 🔒 SECURITY CONCERNS

| Issue | Severity | Status | Fix Time |
|-------|----------|--------|----------|
| Hardcoded password | CRITICAL | ⏳ | 4-6 hours |
| No input sanitization | HIGH | ⏳ | 2-3 hours |
| No CSRF protection | HIGH | ⏳ | 2 hours |
| No rate limiting | MEDIUM | ⏳ | 2-3 hours |
| Exposed API keys | LOW | ⏳ | 1 hour |

---

## ✅ WHAT'S WORKING WELL

- ✅ Design System - Beautiful luxury aesthetic
- ✅ Components - Well-structured React components
- ✅ TypeScript - Proper type safety throughout
- ✅ Animations - Smooth Framer Motion animations
- ✅ Responsive Design - Good mobile support (except admin)
- ✅ Admin Portal UI - Good UX (just needs features)
- ✅ Photo Gallery - Works well with zoom and navigation
- ✅ Theme Toggle - Dark/light mode working
- ✅ Forms - Contact and purchase forms functional
- ✅ Build Process - Clean build with no errors

---

## 📊 ISSUE SUMMARY

| Priority | Count | Total Hours |
|----------|-------|-------------|
| 🔴 Critical | 5 | 12-15 |
| 🟠 High | 5 | 24-30 |
| 🟡 Medium | 4 | 12-17 |
| 🟢 Low | 3 | 9-12 |
| **Total** | **17** | **57-74** |

---

## 🚀 RECOMMENDED FIX ORDER

### Week 1: Critical Fixes (12-15 hours)
1. Create Supabase tables (2-3 hours)
2. Fix admin authentication (4-6 hours)
3. Add error boundaries (1 hour)
4. Replace polling with real-time sync (3-4 hours)
5. Add error notifications (2 hours)

### Week 2: High Priority (24-30 hours)
1. Complete admin portal features (8-10 hours)
2. Reduce bundle size (4-6 hours)
3. Add input validation (2-3 hours)
4. Improve mobile admin (4-5 hours)
5. Add offline support (6-8 hours)

### Week 3: Medium Priority (12-17 hours)
1. Optimize images (2-3 hours)
2. Add search/filtering (3-4 hours)
3. Email notifications (4-6 hours)
4. Data export/import (3-4 hours)

---

## 📝 NOTES

- All issues are non-breaking; website functions despite them
- No database schema changes needed for fixes
- All fixes are backward compatible
- No API changes required
- Estimated total fix time: 57-74 hours
- Recommended timeline: 3 weeks (part-time) or 1 week (full-time)

---

## 🔄 STATUS LEGEND

- ⏳ Pending - Not started
- 🔄 In Progress - Currently being worked on
- ✅ Completed - Fixed and tested
- 🚫 Blocked - Waiting for something else
- ⚠️ Partial - Partially fixed

---

**Last Updated:** May 25, 2026  
**Next Review:** After critical fixes implemented
