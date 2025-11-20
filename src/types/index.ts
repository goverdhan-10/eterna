/**
 * Core type definitions for the Eterna application
 */

export interface Token {
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

export interface PriceUpdate {
  tokenId: string;
  price: number;
  change: number;
  timestamp: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: number;
}

export interface TokensState {
  newPairs: Token[];
  finalStretch: Token[];
  migrated: Token[];
  loading: LoadingState;
  selectedToken: Token | null;
  sortBy: 'price' | 'volume' | 'change' | 'marketcap';
  sortOrder: 'asc' | 'desc';
}

export interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
}

export interface NotificationState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
