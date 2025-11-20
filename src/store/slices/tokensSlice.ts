import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, TokensState } from '@/types';

const initialState: TokensState = {
  newPairs: [],
  finalStretch: [],
  migrated: [],
  loading: {
    isLoading: false,
    error: null,
    lastUpdated: 0,
  },
  selectedToken: null,
  sortBy: 'price',
  sortOrder: 'desc',
};

// Mock data generator
export const generateMockTokens = (): { newPairs: Token[]; finalStretch: Token[]; migrated: Token[] } => {
  const baseTokens: Omit<Token, 'status'>[] = [
    {
      id: '1',
      symbol: 'PUMP',
      name: 'Pump.Fun',
      contractAddress: 'PU1...',
      image: '', // Intentionally empty to trigger "First Letter" fallback UI
      currentPrice: 0.0034,
      priceChange24h: 24.5,
      marketCap: 45000000,
      volume24h: 2500000,
      liquidity: 1200000,
      holders: 5420,
    },
    {
      id: '2',
      symbol: 'BONK',
      name: 'Bonk',
      contractAddress: 'Bo1...',
      image: 'https://assets.coingecko.com/coins/images/28600/large/bonk.jpg',
      currentPrice: 0.000012,
      priceChange24h: 8.2,
      marketCap: 890000000,
      volume24h: 45000000,
      liquidity: 3200000,
      holders: 650000,
    },
    {
      id: '3',
      symbol: 'WIF',
      name: 'dogwifhat',
      contractAddress: 'EKp...',
      image: 'https://assets.coingecko.com/coins/images/33566/large/dogwifhat.jpg',
      currentPrice: 2.85,
      priceChange24h: 15.3,
      marketCap: 2800000000,
      volume24h: 150000000,
      liquidity: 45000000,
      holders: 85000,
    },
    {
      id: '4',
      symbol: 'POPCAT',
      name: 'Popcat',
      contractAddress: 'Pop...',
      image: 'https://assets.coingecko.com/coins/images/33230/large/popcat.png',
      currentPrice: 0.45,
      priceChange24h: -5.3,
      marketCap: 450000000,
      volume24h: 12000000,
      liquidity: 5500000,
      holders: 32000,
    },
    {
      id: '5',
      symbol: 'BOME',
      name: 'BOOK OF MEME',
      contractAddress: 'ukH...',
      image: 'https://assets.coingecko.com/coins/images/36071/large/bome.png',
      currentPrice: 0.011,
      priceChange24h: -2.1,
      marketCap: 750000000,
      volume24h: 85000000,
      liquidity: 12000000,
      holders: 72000,
    },
    {
      id: '6',
      symbol: 'SLERF',
      name: 'Slerf',
      contractAddress: '7Bg...',
      image: 'https://assets.coingecko.com/coins/images/36171/large/slerf.png',
      currentPrice: 0.32,
      priceChange24h: 4.5,
      marketCap: 160000000,
      volume24h: 45000000,
      liquidity: 8500000,
      holders: 24000,
    },
    {
      id: '7',
      symbol: 'MYRO',
      name: 'Myro',
      contractAddress: 'HhJ...',
      image: 'https://assets.coingecko.com/coins/images/32807/large/myro.png',
      currentPrice: 0.14,
      priceChange24h: 1.2,
      marketCap: 140000000,
      volume24h: 15000000,
      liquidity: 4200000,
      holders: 31000,
    },
    {
      id: '8',
      symbol: 'WEN',
      name: 'Wen',
      contractAddress: 'WEN...',
      image: 'https://assets.coingecko.com/coins/images/34799/large/wen.png',
      currentPrice: 0.00034,
      priceChange24h: -8.5,
      marketCap: 240000000,
      volume24h: 25000000,
      liquidity: 6500000,
      holders: 450000,
    },
    {
      id: '9',
      symbol: 'SAMO',
      name: 'Samoyedcoin',
      contractAddress: '7xK...',
      image: 'https://assets.coingecko.com/coins/images/15032/large/samo.png',
      currentPrice: 0.012,
      priceChange24h: 3.4,
      marketCap: 45000000,
      volume24h: 1200000,
      liquidity: 2100000,
      holders: 89000,
    },
    {
      id: '10',
      symbol: 'ANALOS',
      name: 'Analos',
      contractAddress: 'An1...',
      image: 'https://assets.coingecko.com/coins/images/33928/large/analos.png',
      currentPrice: 0.000085,
      priceChange24h: -12.4,
      marketCap: 8500000,
      volume24h: 4500000,
      liquidity: 850000,
      holders: 15000,
    },
    {
      id: '11',
      symbol: 'DUKO',
      name: 'Duko',
      contractAddress: 'HLp...',
      image: 'https://assets.coingecko.com/coins/images/35495/large/duko.png',
      currentPrice: 0.0045,
      priceChange24h: 28.9,
      marketCap: 45000000,
      volume24h: 8500000,
      liquidity: 1500000,
      holders: 12500,
    },
    {
      id: '12',
      symbol: 'SILLY',
      name: 'Silly Dragon',
      contractAddress: '7Ey...',
      image: 'https://assets.coingecko.com/coins/images/33775/large/silly.png',
      currentPrice: 0.024,
      priceChange24h: -1.5,
      marketCap: 24000000,
      volume24h: 1500000,
      liquidity: 3200000,
      holders: 28000,
    },
    {
      id: '13',
      symbol: 'PONKE',
      name: 'Ponke',
      contractAddress: '5z3...',
      image: 'https://assets.coingecko.com/coins/images/33997/large/ponke.png',
      currentPrice: 0.18,
      priceChange24h: 6.7,
      marketCap: 180000000,
      volume24h: 35000000,
      liquidity: 5400000,
      holders: 35000,
    },
    {
      id: '14',
      symbol: 'MICHI',
      name: 'Michi',
      contractAddress: 'Mic...',
      image: 'https://assets.coingecko.com/coins/images/37286/large/michi.jpg',
      currentPrice: 0.22,
      priceChange24h: 45.2,
      marketCap: 120000000,
      volume24h: 65000000,
      liquidity: 3800000,
      holders: 18000,
    },
    {
      id: '15',
      symbol: 'GME',
      name: 'GameStop (Sol)',
      contractAddress: '8wX...',
      image: 'https://assets.coingecko.com/coins/images/34905/large/gme.png',
      currentPrice: 0.0085,
      priceChange24h: -15.6,
      marketCap: 58000000,
      volume24h: 125000000,
      liquidity: 4500000,
      holders: 42000,
    }
  ];

  return {
    newPairs: baseTokens.map((t, i) => ({ ...t, status: 'new_pair' as const, id: `new-${i}` })),
    finalStretch: baseTokens.slice(0, 10).reverse().map((t, i) => ({ ...t, status: 'final_stretch' as const, id: `stretch-${i}` })),
    migrated: baseTokens.slice(5, 15).map((t, i) => ({ ...t, status: 'migrated' as const, id: `migrated-${i}` })),
  };
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ newPairs: Token[]; finalStretch: Token[]; migrated: Token[] }>) => {
      state.newPairs = action.payload.newPairs;
      state.finalStretch = action.payload.finalStretch;
      state.migrated = action.payload.migrated;
      state.loading.lastUpdated = Date.now();
    },
    updateTokenPrice: (state, action: PayloadAction<{ tokenId: string; newPrice: number; change: number }>) => {
      const updateTokenInArray = (tokens: Token[]) => {
        const token = tokens.find(t => t.id === action.payload.tokenId);
        if (token) {
          token.currentPrice = action.payload.newPrice;
          token.priceChange24h = action.payload.change;
        }
      };

      updateTokenInArray(state.newPairs);
      updateTokenInArray(state.finalStretch);
      updateTokenInArray(state.migrated);
    },
    setSelectedToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload;
    },
    setSortBy: (state, action: PayloadAction<{ sortBy: 'price' | 'volume' | 'change' | 'marketcap'; sortOrder: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    setLoading: (state, action: PayloadAction<{ isLoading: boolean; error?: string | null }>) => {
      state.loading.isLoading = action.payload.isLoading;
      if (action.payload.error !== undefined) {
        state.loading.error = action.payload.error;
      }
    },
  },
});

export const {
  setTokens,
  updateTokenPrice,
  setSelectedToken,
  setSortBy,
  setLoading,
} = tokensSlice.actions;

export default tokensSlice.reducer;