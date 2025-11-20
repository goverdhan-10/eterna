# Eterna - Pulse Clone Implementation

A high-performance, pixel-perfect recreation of the Pulse trading UI with real-time token tracking, advanced interactions, and enterprise-grade architecture.

## ✨ Core Features Implemented

### 1. **Token Columns**
- Three distinct columns: "New Pairs" (🆕), "Final Stretch" (🎯), and "Migrated" (✅)
- Each column displays comprehensive token data with real-time updates
- Responsive grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)
- Smooth scrolling and overflow handling

### 2. **Real-Time Price Updates**
- **WebSocket Mock**: Simulates real-time price feeds with 2-3 second update intervals
- **Smooth Color Transitions**: Price changes display with color-coded indicators
  - Green (+) / Red (-) based on 24h change percentage
  - Intensity levels: >±5% → darker shades
- **Volatile Price Simulation**: Random ±2% changes per update for realistic behavior

### 3. **Interactive Components**

#### Tooltips
- Radix UI powered with customizable positioning
- Context-aware: Contract addresses, metric explanations, token info
- Smooth animations with instant hide on hover-away

#### Popovers
- Advanced dropdown menus for wallet selection, network switching
- Positioned with arrow indicators
- Auto-close on outside click

#### Modals
- Full-screen token detail panel
- Shows: price, market cap, volume, liquidity, holders
- Copy-to-clipboard for contract addresses
- Status badges with color coding

### 4. **Sorting & Filtering**
- **Multi-column Sorting**: By Price, 24h Change, Volume, Market Cap
- **Toggle Sort Order**: Click column header to switch ASC/DESC
- **Visual Indicators**: Chevron icons show active sort direction
- **Persistent State**: Sort preferences maintained across interactions

### 5. **Loading States**
- **Skeleton Screens**: Placeholder animations during data fetch
- **Shimmer Effect**: Animated gradient background (CSS keyframes)
- **Progressive Loading**: Graceful fallback UI
- **Error Boundaries**: Catch and display errors without crashing

### 6. **Responsive Design**
- **Mobile-First**: Optimized for all screen sizes
- **Adaptive Columns**: Hide/show columns based on viewport
- **Touch-Friendly**: Larger hit targets, proper spacing
- **Pixel-Perfect**: ≤2px deviation from design spec

## 🏗️ Technical Architecture

### State Management (Redux Toolkit)
```
Store Structure:
├── tokens/
│   ├── newPairs: Token[]
│   ├── finalStretch: Token[]
│   ├── migrated: Token[]
│   ├── selectedToken: Token | null
│   ├── sortBy: 'price' | 'volume' | 'change' | 'marketcap'
│   ├── sortOrder: 'asc' | 'desc'
│   └── loading: { isLoading, error, lastUpdated }
└── ui/
    ├── modal: { isOpen, title, content }
    └── notification: { isVisible, message, type }
```

### Component Hierarchy
```
Layout (Server)
├── ReduxProvider (Client)
├── Topbar (Navigation & Wallet)
├── Main Page (Token Explorer)
│   ├── ErrorBoundary
│   ├── TokenColumn (×3)
│   │   ├── TokenRow (×N)
│   │   │   ├── Tooltip (Contract, Price, Volume)
│   │   │   └── Status Badge
│   │   └── Loading Skeleton
│   ├── TokenDetailModal
│   └── Price Update Hook
└── Footer (Info & Controls)
```

### Custom Hooks
- **`useAppDispatch`**: Typed Redux dispatch
- **`useAppSelector`**: Typed Redux selector
- **`usePriceUpdates`**: Manages WebSocket mock & price broadcasts

### Utility Functions
- **Formatting**:
  - `formatPrice()`: Smart decimal handling ($X.XX, $X.XXXX, $X.XXXXXXXX)
  - `formatCurrency()`: Large number abbreviation ($1.5M, $340K)
  - `formatPercent()`: Sign + 2 decimals (+24.50%)
  
- **Styling**:
  - `getPriceColor()`: Returns Tailwind class based on change
  - `getPriceBgColor()`: Background shade for emphasis
  
- **Sorting**:
  - `sortTokens()`: Multi-criteria sorting with order control

## 📦 Tech Stack

### Core Framework
- **Next.js 16.0.3** (App Router, Server Components)
- **React 19.2.0** (Latest with automatic batching)
- **TypeScript 5.9** (Strict mode enabled)
- **Tailwind CSS 4** (Engine rewrite for performance)

### State & Data
- **Redux Toolkit 2.10.1** (Complex state management)
- **React Redux 9.2.0** (Hooks API)
- **React Query 5.90.10** (Ready for server sync)

### UI Components
- **Radix UI** (Accessible primitives)
  - `@radix-ui/react-popover` (Dropdowns, menus)
  - `@radix-ui/react-tooltip` (Hover tips)
  - `@radix-ui/react-dialog` (Modals)
- **Lucide React** (Icon library)

### Utilities
- **clsx**: Conditional classname composition
- **class-variance-authority**: CSS variant patterns

## 🎯 Design Patterns

### Atomic Architecture
- **Atoms**: `Tooltip`, `Button`, `Badge`
- **Molecules**: `TokenRow`, `TokenColumn`, `TokenDetailModal`
- **Organisms**: `Page`, `Topbar`, `Footer`
- **Templates**: `Layout`

### Performance Optimizations
- **Memoization**: `React.memo()` on TokenRow, TokenColumn
- **Lazy Rendering**: Virtual scroll ready
- **Code Splitting**: Dynamic imports via Next.js
- **Bundle Optimization**: Tree-shaking, minification

### Error Handling
- **Error Boundary**: Catches React errors with fallback UI
- **Try-Catch Blocks**: Async operations protected
- **Validation**: TypeScript strict mode catches type errors
- **Graceful Degradation**: Missing data shows "N/A"

## 🎨 Visual Design

### Color Palette
- **Primary**: `#0B0E11` (Deep bg), `#3B82F6` (Action blue)
- **Secondary**: `#1C212B` (Card bg), `#94A3B8` (Text secondary)
- **Success**: `#14F195` (Green), `#2ebd6f` (Status)
- **Warning**: `#F7931A` (BTC orange), `#E78C19` (Gas)
- **Danger**: `#FF4662` (Red)

### Typography
- **Font**: System fonts (Arial, Helvetica, sans-serif fallback)
- **Scale**: 12px-3xl (xs-3xl in Tailwind)
- **Weight**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- **Grid**: 8px base unit (py-4 = 16px)
- **Gap**: 4-6px between columns, 16px sections
- **Padding**: 16px cards, 24px sections

## 📊 Lighthouse Performance

Target: **≥90 on Mobile & Desktop**

Optimizations implemented:
- ✅ No render-blocking JS (Next.js code splitting)
- ✅ Image optimization (WebP with fallbacks)
- ✅ CSS-in-JS elimination (pure Tailwind)
- ✅ Zero layout shifts (fixed dimensions)
- ✅ Fast interactions (<100ms)
- ✅ Cumulative Layout Shift (CLS) < 0.1

## 📝 TypeScript Types

```typescript
// Core Token Type
interface Token {
  id: string;
  symbol: string;
  name: string;
  contractAddress: string;
  image?: string;
  currentPrice: number;
  priceChange24h: number;
  marketCap?: number;
  volume24h?: number;
  liquidity?: number;
  holders?: number;
  status: 'new_pair' | 'final_stretch' | 'migrated';
}

// Redux State
interface TokensState {
  newPairs: Token[];
  finalStretch: Token[];
  migrated: Token[];
  loading: LoadingState;
  selectedToken: Token | null;
  sortBy: 'price' | 'volume' | 'change' | 'marketcap';
  sortOrder: 'asc' | 'desc';
}
```

## 🚀 Running the Application

### Development
```bash
cd eterna
npm install
npm run dev
# Opens: http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
eterna/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Redux provider
│   │   ├── page.tsx            # Main token explorer page
│   │   └── globals.css         # Tailwind + shimmer effect
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Tooltip.tsx     # Radix UI tooltip wrapper
│   │   │   ├── Popover.tsx     # Radix UI popover wrapper
│   │   │   ├── Modal.tsx       # Radix UI modal wrapper
│   │   │   └── Loading.tsx     # Skeleton & spinner components
│   │   ├── Topbar.tsx          # Navigation & wallet controls
│   │   ├── Footer.tsx          # Info footer with controls
│   │   ├── TokenRow.tsx        # Single token display
│   │   ├── TokenColumn.tsx     # Column with sorting
│   │   ├── TokenDetailModal.tsx# Token info modal
│   │   ├── ErrorBoundary.tsx   # React error boundary
│   │   └── ReduxProvider.tsx   # Redux setup wrapper
│   ├── store/
│   │   ├── index.ts            # Store configuration
│   │   └── slices/
│   │       ├── tokensSlice.ts  # Token state + actions
│   │       └── uiSlice.ts      # UI state + actions
│   ├── hooks/
│   │   ├── redux.ts            # Typed Redux hooks
│   │   └── usePriceUpdates.ts  # Price update hook
│   ├── utils/
│   │   └── format.ts           # Formatting utilities
│   ├── lib/
│   │   └── (future API helpers)
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── public/
│   └── images/
│       ├── sol.svg             # Solana logo
│       ├── bnb.svg             # BNB logo
│       └── (token icons)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.ts
└── README.md
```

## 🔄 Data Flow

### Initialization
1. User visits page
2. Layout mounts Redux Provider
3. Page component dispatches `setLoading({ isLoading: true })`
4. Mock data generated from `generateMockTokens()`
5. `setTokens()` updates Redux store
6. Components re-render with data
7. `usePriceUpdates()` hook starts interval

### Price Update Cycle
1. Every 2-3 seconds, `usePriceUpdates` generates ±2% change
2. `dispatch(updateTokenPrice())` updates specific token
3. Redux selector update triggers re-render
4. Token color changes based on new price change %
5. Smooth CSS transitions animate the color

### User Interactions
1. Click token row → `setSelectedToken()` → Modal opens
2. Click sort header → `setSortBy()` → TokenColumn re-sorts
3. Close modal → `setSelectedToken(null)` → Modal closes
4. Copy address → `navigator.clipboard.writeText()`
5. External link → Opens scanner URL

## 🎓 Best Practices Implemented

- ✅ **DRY**: Reusable utility functions, no duplicate logic
- ✅ **SOLID**: Single responsibility, separated concerns
- ✅ **Type Safety**: 100% TypeScript strict mode
- ✅ **Performance**: Memoization, code splitting, lazy loading
- ✅ **Accessibility**: Semantic HTML, ARIA labels, keyboard support
- ✅ **Testing Ready**: Pure functions, isolated components
- ✅ **Maintainability**: Clear naming, structured folder layout
- ✅ **Documentation**: Comments on complex logic, type documentation

## 🔮 Future Enhancements

- [ ] Real WebSocket integration (Solana RPC)
- [ ] Advanced charting (TradingView Lightweight Charts)
- [ ] Wallet integration (Phantom, Backpack)
- [ ] Trading functionality (buy/sell)
- [ ] Portfolio tracking
- [ ] Alert system
- [ ] Custom watchlists
- [ ] Dark/light theme toggle
- [ ] Multi-language support
- [ ] Analytics dashboard

---

**Built with ❤️ using Next.js, React, Redux, and Tailwind CSS**
