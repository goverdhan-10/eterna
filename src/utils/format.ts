import type { Token } from '@/types';

/**
 * Utility functions for formatting and number operations
 */

export const formatPrice = (price: number): string => {
  if (price >= 1) {
    return `$${price.toFixed(2)}`;
  }
  if (price >= 0.001) {
    return `$${price.toFixed(4)}`;
  }
  return `$${price.toFixed(8)}`;
};

export const formatCurrency = (value: number): string => {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
};

export const formatPercent = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

export const getPriceColor = (change: number): string => {
  if (change > 5) return 'text-green-500';
  if (change > 0) return 'text-green-400';
  if (change < -5) return 'text-red-500';
  if (change < 0) return 'text-red-400';
  return 'text-gray-400';
};

export const getPriceBgColor = (change: number): string => {
  if (change > 5) return 'bg-green-500/10';
  if (change > 0) return 'bg-green-400/5';
  if (change < -5) return 'bg-red-500/10';
  if (change < 0) return 'bg-red-400/5';
  return 'bg-gray-400/5';
};

/**
 * Sort tokens by various criteria
 */
export const sortTokens = (
  tokens: Token[],
  sortBy: 'price' | 'volume' | 'change' | 'marketcap',
  order: 'asc' | 'desc'
): Token[] => {
  const sorted = [...tokens].sort((a, b) => {
    let aVal: number = 0;
    let bVal: number = 0;

    switch (sortBy) {
      case 'price':
        aVal = a.currentPrice;
        bVal = b.currentPrice;
        break;
      case 'change':
        aVal = a.priceChange24h;
        bVal = b.priceChange24h;
        break;
      case 'volume':
        aVal = a.volume24h || 0;
        bVal = b.volume24h || 0;
        break;
      case 'marketcap':
        aVal = a.marketCap || 0;
        bVal = b.marketCap || 0;
        break;
    }

    return order === 'asc' ? aVal - bVal : bVal - aVal;
  });

  return sorted;
};
