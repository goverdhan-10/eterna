# 📋 Eterna Quick Reference Card

## 🎯 What You Have

A fully functional, production-ready Pulse trading UI clone with:

✅ **3 Token Columns** (New Pairs, Final Stretch, Migrated)
✅ **Real-time Price Updates** (WebSocket mock)
✅ **Advanced Interactions** (Tooltips, Popovers, Modals)
✅ **Sorting & Filtering** (Multi-column, toggle order)
✅ **Loading States** (Skeleton, shimmer, error boundary)
✅ **Redux State Management** (Centralized, typed)
✅ **TypeScript Strict Mode** (Type-safe codebase)
✅ **Tailwind CSS** (Responsive, pixel-perfect design)
✅ **Performance Optimized** (Memoization, code splitting)
✅ **Fully Documented** (Types, comments, guides)

---

## 🚀 Getting Started

### Start Dev Server
```bash
cd eterna
npm install
npm run dev
# http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

### Check Lint
```bash
npm run lint
```

---

## 📁 Key Files to Know

| File | Purpose | Key Code |
|------|---------|----------|
| `page.tsx` | Main explorer UI | Redux dispatch, TokenColumns |
| `TokenRow.tsx` | Single token display | Formatted price, color-coded change |
| `TokenColumn.tsx` | Sortable column | Handles sorting, displays rows |
| `TokenDetailModal.tsx` | Token info popup | Full details + copy address |
| `tokensSlice.ts` | Redux state | Store shape, mock data |
| `usePriceUpdates.ts` | Price updates | WebSocket mock, Redux dispatch |
| `format.ts` | Utilities | Price formatting, sorting logic |

---

## 🎮 User Interactions

### Click Token Row
```
TokenRow → dispatch(setSelectedToken(token))
         → TokenDetailModal opens
         → Click close → setSelectedToken(null)
```

### Click Column Header
```
Column header "Price" → dispatch(setSortBy('price', 'desc'))
                     → TokenColumn re-sorts tokens
                     → Shows chevron icon indicating sort direction
```

### Hover Tooltip
```
Tooltip trigger → Show on hover
               → Delay 200ms (configurable)
               → Hide on hover-away
```

### Copy Address
```
Copy button → navigator.clipboard.writeText()
           → Address copied to clipboard
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────┐
│  App Initialization │
│  dispatch(setTokens)│
└──────────┬──────────┘
           │
    Redux Store
    ├─ newPairs[]
    ├─ finalStretch[]
    ├─ migrated[]
    ├─ selectedToken
    ├─ sortBy, sortOrder
    └─ loading state
           │
    ┌──────┴──────┐
    │ useSelector │
    └──────┬──────┘
           │
   ┌───────┴────────┐
   │                │
TokenColumn    TokenDetailModal
┌──────────┐
│ TokenRow │  (×3 columns)
│TokenRow  │
│TokenRow  │
└──────────┘

usePriceUpdates Hook:
setInterval → updateTokenPrice → Redux → Re-render
```

---

## 🎨 Color System

```
Token Status Badges:
├─ 🆕 New Pair    → Purple (bg-purple-500/10, text-purple-400)
├─ 🎯 Final Stretch → Orange (bg-orange-500/10, text-orange-400)
└─ ✅ Migrated    → Green (bg-green-500/10, text-green-400)

Price Change Colors:
├─ Green  → +5% or higher (+2% visible)
├─ Red    → -5% or lower (-2% visible)
└─ Gray   → Between -2% and +2%
```

---

## 📊 Redux Actions Cheat Sheet

```typescript
// Initialize tokens
dispatch(setTokens({
  newPairs: Token[],
  finalStretch: Token[],
  migrated: Token[]
}))

// Update price (WebSocket mock)
dispatch(updateTokenPrice({
  tokenId: string,
  newPrice: number,
  change: number
}))

// Select token for modal
dispatch(setSelectedToken(token))
dispatch(setSelectedToken(null))  // Clear

// Change sorting
dispatch(setSortBy({
  sortBy: 'price' | 'volume' | 'change' | 'marketcap',
  sortOrder: 'asc' | 'desc'
}))

// Loading state
dispatch(setLoading({ 
  isLoading: true,
  error?: null 
}))
```

---

## 🛠️ Component Props

### TokenColumn
```typescript
interface TokenColumnProps {
  title: string;                    // "🆕 New Pairs"
  tokens: Token[];                  // Array of tokens
  isLoading?: boolean;              // Show skeleton
  sortBy?: 'price' | 'volume' | ... // Current sort
  sortOrder?: 'asc' | 'desc';       // Sort direction
  onSortChange?: (by, order) => {}  // Callback
  onTokenSelect?: (token) => {};    // Click handler
  selectedTokenId?: string;         // Highlight token
}
```

### TokenRow
```typescript
interface TokenRowProps {
  token: Token;                     // Token data
  onSelect?: (token) => {};         // Click handler
  isSelected?: boolean;             // Highlight
}
```

### Tooltip
```typescript
interface TooltipProps {
  content: string;                  // Tooltip text
  children: React.ReactNode;        // Trigger element
  side?: 'top' | 'right' | ...;    // Position
  delay?: number;                   // ms (default 200)
}
```

---

## 🐛 Common Issues & Fixes

### Issue: Build fails
```
Solution:
npm run build --verbose
Check TypeScript errors
Fix type issues in src/
```

### Issue: Price not updating
```
Check:
1. usePriceUpdates hook called in useEffect
2. Redux dispatch working: check Redux DevTools
3. Component not memoized (remove React.memo)
4. useAppSelector has proper selector
```

### Issue: Styles not applying
```
Solution:
1. Restart dev server: npm run dev
2. Clear .next: rm -rf .next
3. Check className syntax
4. Verify Tailwind config includes src/
```

### Issue: Modal not closing
```
Check:
1. setSelectedToken(null) called
2. Modal onClick stops propagation
3. Redux state updated in DevTools
```

---

## 📈 Performance Tips

### Make it Faster

1. **Reduce Re-renders**
   ```typescript
   // Good: Memoize
   export const TokenRow = memo(...)
   
   // Good: Selector
   const token = useAppSelector(s => s.tokens.selectedToken)
   
   // Bad: New object every render
   const allTokens = [...tokens].sort()
   ```

2. **Optimize Sorting**
   ```typescript
   // Use useMemo
   const sorted = useMemo(
     () => sortTokens(tokens, sortBy, sortOrder),
     [tokens, sortBy, sortOrder]
   )
   ```

3. **Lazy Load Images**
   ```typescript
   <img loading="lazy" src={token.image} alt={token.symbol} />
   ```

---

## 🔗 File Imports Reference

```typescript
// Redux
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setTokens, updateTokenPrice, ... } from '@/store/slices/tokensSlice'

// Components
import { TokenColumn } from '@/components/TokenColumn'
import { Tooltip } from '@/components/ui/Tooltip'
import { Spinner } from '@/components/ui/Loading'

// Utilities
import { formatPrice, formatCurrency, sortTokens } from '@/utils/format'

// Types
import type { Token, TokensState } from '@/types'

// Hooks
import { usePriceUpdates } from '@/hooks/usePriceUpdates'
```

---

## 🎓 Code Examples

### Creating a New Token Component
```typescript
// 1. Define interface
interface MyTokenProps {
  token: Token;
  onAction?: () => void;
}

// 2. Create component with TypeScript
export const MyToken: React.FC<MyTokenProps> = ({ token, onAction }) => {
  // 3. Use formatting utilities
  const price = formatPrice(token.currentPrice);
  const color = getPriceColor(token.priceChange24h);
  
  return (
    <div className={`p-4 rounded-sm ${color}`}>
      <p className="font-semibold">{token.symbol}</p>
      <p className="text-sm">{price}</p>
      <button onClick={onAction}>Action</button>
    </div>
  );
};

// 4. Export memoized
export default memo(MyToken);
```

### Dispatching Actions
```typescript
const dispatch = useAppDispatch();

// Initialize
dispatch(setTokens(generateMockTokens()));

// Update price
dispatch(updateTokenPrice({
  tokenId: 'token-1',
  newPrice: 0.0045,
  change: +12.5
}));

// Select token
dispatch(setSelectedToken(token));
```

### Using Selectors
```typescript
const tokens = useAppSelector(state => state.tokens.newPairs);
const isLoading = useAppSelector(state => state.tokens.loading.isLoading);
const selectedToken = useAppSelector(state => state.tokens.selectedToken);
```

---

## 📚 Resources

### Documentation
- `IMPLEMENTATION.md` - Full architecture details
- `GUIDE.md` - Comprehensive guide
- `README.md` - Project overview

### Libraries
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/docs)

### Tools
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [React Developer Tools](https://react-devtools-tutorial.vercel.app/)
- [Chrome Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## ✅ Final Checklist

Before deploying:

- [ ] Run `npm run build` (no errors)
- [ ] Test on mobile via DevTools
- [ ] Verify price updates working
- [ ] Check modal opens/closes
- [ ] Test sorting on each column
- [ ] Verify responsive design
- [ ] Check Lighthouse score ≥90
- [ ] Review console for errors
- [ ] Test keyboard navigation
- [ ] Verify color contrast

---

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Last Updated**: Nov 20, 2025
