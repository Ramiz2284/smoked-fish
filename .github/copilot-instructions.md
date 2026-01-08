# Smoked Fish Shop - AI Coding Agent Instructions

## Architecture Overview

**Smoked Fish Shop** is a React + TypeScript e-commerce frontend for selling smoked fish products in Antalya, with an admin panel for product management.

### Core Structure

- **Frontend Framework**: React 18.3 + TypeScript with Vite bundler
- **Routing**: React Router v6 (2 main routes: `/` for Home, `/admin` for Admin)
- **State Management**: React Context API (ProductContext) + local component state
- **API Communication**: Fetch API calls to `https://smokedfish.marketlistem.site/api/products`
- **Styling**: CSS Modules (one module per page/component)

### Key Data Flow

1. **HomePage** → fetches products directly via `fetchProducts()` API
2. **AdminPage** → uses protected endpoints (addProduct, updateProduct, deleteProduct, updateProductStatus)
3. **ProductCard** → reusable component displaying individual products with WhatsApp integration for orders

## Product Type Definition

All product operations use this consistent type (defined in `src/services/api.ts`):

```typescript
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string; // URL string in API responses
  status: 'available' | 'inProduction';
};
```

## Developer Commands

```bash
npm install       # Install dependencies (sets up Husky git hooks)
npm run dev       # Start Vite dev server with HMR (http://localhost:5173)
npm run build     # Compile TypeScript + bundle with Vite
npm run lint      # Run ESLint (configured with React + TS rules)
npm run preview   # Preview production build locally
```

**Pre-commit Hook**: Husky + lint-staged automatically runs `eslint --fix` on .js/.ts/.tsx files and `prettier --write` on .css files before each commit. Configured in `lint-staged` section of `package.json`.

## API Layer (src/services/api.ts)

All backend communication goes through this single file. Functions:

- `fetchProducts()` → GET list of all products
- `addProduct(formData: FormData)` → POST new product (note: expects FormData for multipart)
- `updateProduct(id, formData)` → PUT existing product
- `deleteProduct(id: string)` → DELETE product
- `updateProductStatus(id, status)` → PATCH product status

**Error Handling Pattern**: Functions catch errors, log to console, and rethrow for caller handling. (Note: `updateProductStatus` lacks try-catch; follows same pattern for consistency)

## Component Organization

- **ProductCard** (`src/components/ProductCard/ProductCard.tsx`) - Displays product with WhatsApp integration

  - Hardcoded phone number: `905444558407`
  - Generates WhatsApp links with pre-filled messages for ordering or photo requests
  - Falls back to stub image (`img/stub.jpeg`) on load failures

- **HomePage** (`src/pages/Home.tsx`) - Product listing with business info

  - Displays all available products
  - Embeds Google Maps link
  - Direct API calls in `useEffect` (no Context usage)

- **AdminPage** (`src/pages/Admin.tsx`) - Protected product management UI
  - Password-protected: hardcoded password is `admin123` (checked in `handleLogin()`)
  - Features: add, edit, delete, update status
  - Handles both string URLs and File objects for images
  - Form state management via `newProductData` state and `editingProduct` state for edits

## Important Patterns & Conventions

### Authentication

`admin123` is hardcoded in `handleLogin()` function - **not production-ready**. Only one user supported; real JWT/session auth needed for production.

### Product Image Handling

- API expects FormData with multipart encoding for image uploads
- Images stored as URLs in database, displayed as `<img src={image}>`
- Stub image fallback in ProductCard for broken images

### Filtering & Status

- Products have two states: `'available'` or `'inProduction'` (sent as status badge on ProductCard)
- ProductContext (in `src/context/ProductContext.tsx`) includes filtering methods but **NOT used by current pages**
  - Context exists for future refactoring; pages directly call API via `fetchProducts()`, `addProduct()`, etc.
  - Context provides `filterProducts('all' | 'available' | 'inProduction')` method for potential implementation

### Code Style

- TypeScript strict mode enabled via tsconfig
- CSS Modules used exclusively (files: `*.module.css`)
- React.FC<Props> functional component pattern
- Comments in Russian (product names, UI labels, error messages)

## Key Files for Reference

- **Entry**: `src/main.tsx` (mounts App in index.html)
- **Routes**: `src/App.tsx` (BrowserRouter setup)
- **API Hub**: `src/services/api.ts` (all backend calls here)
- **Context**: `src/context/ProductContext.tsx` (prepared but underutilized)
- **Config**: `vite.config.ts` (minimal, uses @vitejs/plugin-react), `eslint.config.js` (flat config)

## Known Inconsistencies & Debt

- **HomePage vs AdminPage**: HomePage doesn't use ProductContext, AdminPage uses both API calls and local state
  - Future refactor: migrate both to ProductContext or establish single state pattern
- **ProductContext**: Defined with full CRUD but currently unused in pages
- **No error boundaries**: Client-side errors not caught componentwise
- **No loading states**: HomePage doesn't show loading indicator during fetch

## When Adding Features

1. **New API endpoints**: Add function to `src/services/api.ts` with consistent error handling
2. **New pages**: Create in `src/pages/`, add route in `App.tsx`, consider ProductContext usage
3. **New components**: Place in `src/components/ComponentName/`, use CSS Module at `ComponentName.module.css`
4. **Type definitions**: Reuse Product type from api.ts; define custom types locally per component if needed
5. **Styling**: Use CSS Modules only; nest media queries and pseudo-classes within module
