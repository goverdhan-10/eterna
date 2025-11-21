import React, { memo, useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { Token } from '@/types';
import { TokenRow } from './TokenRow';
import { TokenSkeleton } from './ui/Loading';

interface TokenColumnProps {
  title: string;
  tokens: Token[];
  isLoading?: boolean;
  onTokenSelect?: (token: Token) => void;
  selectedTokenId?: string;
  onOpenFilter?: () => void;
}

// Helper to shuffle array (Fisher-Yates)
const shuffleIds = (ids: string[]): string[] => {
  const newIds = [...ids];
  for (let i = newIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newIds[i], newIds[j]] = [newIds[j], newIds[i]];
  }
  return newIds;
};

export const TokenColumn: React.FC<TokenColumnProps> = memo(({
  title,
  tokens,
  isLoading,
  onTokenSelect,
  selectedTokenId,
  onOpenFilter,
}) => {
  const [orderedIds, setOrderedIds] = useState<string[]>([]);

  const tokensRef = useRef(tokens);
  tokensRef.current = tokens;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;

    const scheduleNextShuffle = () => {
      const randomDuration = Math.floor(Math.random() * 3500) + 2500;

      timeoutId = setTimeout(() => {
        if (!isMounted) return;
        const currentIds = tokensRef.current.map(t => t.id);
        const shuffled = shuffleIds(currentIds);

        setOrderedIds(shuffled);
        scheduleNextShuffle();
      }, randomDuration);
    };

    scheduleNextShuffle();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const displayTokens = useMemo(() => {
    if (orderedIds.length === 0) return tokens;

    const tokenMap = new Map(tokens.map(t => [t.id, t]));
    const reordered = orderedIds
      .map(id => tokenMap.get(id))
      .filter((t): t is Token => t !== undefined);

    const newTokens = tokens.filter(t => !orderedIds.includes(t.id));

    return [...reordered, ...newTokens];
  }, [tokens, orderedIds]);

  return (
    <div className="border-[1px] border-[#1f2128] flex flex-1 flex-col h-full justify-start items-center overflow-hidden bg-[#101114]">
      
      <div className="sticky top-0 z-30 w-full">
        <div className="hidden sm:flex sticky top-0 z-30 whitespace-nowrap flex-row w-full gap-[12px] min-h-[48px] justify-end items-center pr-[12px] pl-[4px] lg:pl-[12px] xl:pl-[12px] border-primaryStroke bg-[#101114]">
          <div className="flex flex-row items-center gap-[16px] flex-1">
            <span className="text-textPrimary text-[16px] font-medium flex-1">
              {title}
            </span>
          </div>

          {/* Right Side Controls */}
          <div className="hidden lg:block">
            <div className="
                overflow-hidden whitespace-nowrap
                border border-[#1E1E22]
                font-normal flex flex-row
                h-[28px] pl-[4px] gap-[6px]
                justify-start items-center rounded-full
                cursor-pointer
                transition-colors duration-125
                hover:bg-[rgba(255,255,255,0.07)]
              "
            >
              {/* Flash Icon */}
              <span className="flex items-center justify-center">
                <img src="/images/flash.png" alt="flash" className="w-[14px] h-[14px] object-contain" />
              </span>

              {/* Input */}
              <div className="flex flex-1 sm:max-w-[32px] min-w-[0px]">
                <input
                  placeholder="0.0"
                  defaultValue="0"
                  type="text"
                  className="
                    text-[12px] w-full font-medium outline-none bg-transparent text-left
                    text-[#E5E5E5] placeholder:text-[#6B6B70]
                  "
                />
              </div>

              {/* SOL Icon */}
              <img src="/images/sol.svg" width={14} height={14} alt="SOL" className="w-[14px] h-[14px]" />

              {/* Divider + P Buttons */}
              <div className="
                  border-l border-[#1E1E22]
                  flex h-full pr-[2px] pl-[2px] gap-[3px]
                  justify-center items-center cursor-pointer
                "
              >
                <button type="button" className="group w-[22px] h-[22px] rounded-[4px] flex justify-center items-center hover:bg-[rgba(76,122,242,0.10)]">
                  <span className="text-[12px] font-medium text-[#4C7AF2] group-hover:text-[#6B95FF]">P1</span>
                </button>

                <button type="button" className="group w-[22px] h-[22px] rounded-[4px] flex justify-center items-center hover:bg-[rgba(255,255,255,0.10)]">
                  <span className="text-[12px] font-medium text-[#8E8E93]">P2</span>
                </button>

                <button type="button" className="group w-[22px] h-[22px] rounded-r-full rounded-l-[4px] flex justify-center items-center hover:bg-[rgba(255,255,255,0.10)]">
                  <span className="text-[12px] font-medium text-[#8E8E93]">P3</span>
                </button>
              </div>
            </div>
          </div>

          {/* === SLIDER ICON === */}
          <button
            type="button"
            onClick={() => onOpenFilter?.()}
            className="
              flex flex-row p-[4px] w-[24px] h-[24px]
              justify-center items-center cursor-pointer 
              rounded-[8px] sm:rounded-[4px]
              transition-opacity duration-150 ease-in-out
              hover:bg-[rgba(255,255,255,0.07)]
            "
          >
            <img src="/images/slider.png" alt="slider" className="w-[14px] h-[14px] opacity-70" />
          </button>

        </div>
      </div>

      <div className="flex flex-1 w-full relative">
        {/* SCROLLBAR CUSTOMIZATION APPLIED HERE:
            1. [&::-webkit-scrollbar]:w-[5px]  -> Sets width to 5px (thin)
            2. [&::-webkit-scrollbar-track]:bg-[#101114] -> Sets track color to background
            3. [&::-webkit-scrollbar-thumb]:bg-[#2A2F3A] -> Sets thumb color to a visible dark grey
            4. [&::-webkit-scrollbar-thumb]:rounded-full -> Rounds the scrollbar edges
        */}
        <div className="
            absolute inset-0 overflow-y-auto transition-all
            [&::-webkit-scrollbar]:w-[5px]
            [&::-webkit-scrollbar-track]:bg-[#101114]
            [&::-webkit-scrollbar-thumb]:bg-[#2A2F3A]
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-[#3B4049]
        ">
          <div style={{ width: '100%', position: 'relative' }}>
            {isLoading ? (
              <div className="p-4">
                <TokenSkeleton count={5} />
              </div>
            ) : displayTokens.length > 0 ? (
              displayTokens.map(token => (
                <TokenRow
                  key={token.id}
                  token={token}
                  onSelect={onTokenSelect}
                  isSelected={selectedTokenId === token.id}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-32 text-textTertiary">
                <p className="text-sm font-medium">No tokens available</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
});

TokenColumn.displayName = 'TokenColumn';