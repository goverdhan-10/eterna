import { useCallback, useRef, useEffect } from 'react';
import { useAppDispatch } from './redux';
import { updateTokenPrice } from '@/store/slices/tokensSlice';
import type { Token, PriceUpdate } from '@/types';

/**
 * Mock WebSocket for real-time price updates with smooth color transitions
 * Returns price updates with animation support
 */
export const usePriceUpdates = (tokens: Token[] = []) => {
  const dispatch = useAppDispatch();
  const wsRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const priceHistoryRef = useRef<Map<string, number>>(new Map());

  const startPriceUpdates = useCallback(() => {
    // Initialize price history
    tokens.forEach(token => {
      if (!priceHistoryRef.current.has(token.id)) {
        priceHistoryRef.current.set(token.id, token.currentPrice);
      }
    });

    // Simulate WebSocket price updates every 2-3 seconds
    wsRef.current = setInterval(() => {
      tokens.forEach(token => {
        const volatility = 0.02; // 2% max change per update
        const random = (Math.random() - 0.5) * 2;
        const changePercent = random * volatility;
        
        const oldPrice = priceHistoryRef.current.get(token.id) || token.currentPrice;
        const newPrice = oldPrice * (1 + changePercent);
        
        priceHistoryRef.current.set(token.id, newPrice);

        const newChange = token.priceChange24h + (changePercent * 100);

        dispatch(updateTokenPrice({
          tokenId: token.id,
          newPrice: parseFloat(newPrice.toFixed(8)),
          change: parseFloat(newChange.toFixed(2)),
        }));
      });
    }, 2000 + Math.random() * 1000);
  }, [tokens, dispatch]);

  const stopPriceUpdates = useCallback(() => {
    if (wsRef.current) {
      clearInterval(wsRef.current);
      wsRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (tokens.length > 0) {
      startPriceUpdates();
    }

    return () => stopPriceUpdates();
  }, [tokens, startPriceUpdates, stopPriceUpdates]);

  return { startPriceUpdates, stopPriceUpdates };
};
