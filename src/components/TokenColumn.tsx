import React, { memo, useCallback, useMemo } from 'react';
import { Token } from '@/types';
import { TokenRow } from './TokenRow';
import { TokenSkeleton } from './ui/Loading';
import { sortTokens } from '@/utils/format';

interface TokenColumnProps {
  title: string;
  tokens: Token[];
  isLoading?: boolean;
  sortBy?: 'price' | 'volume' | 'change' | 'marketcap';
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (sortBy: 'price' | 'volume' | 'change' | 'marketcap', order: 'asc' | 'desc') => void;
  onTokenSelect?: (token: Token) => void;
  selectedTokenId?: string;
}

export const TokenColumn: React.FC<TokenColumnProps> = memo(({
  title,
  tokens,
  isLoading,
  sortBy = 'price',
  sortOrder = 'desc',
  onSortChange,
  onTokenSelect,
  selectedTokenId,
}) => {
  const handleSort = useCallback((newSortBy: string) => {
    if (newSortBy === sortBy) {
      onSortChange?.(sortBy as any, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange?.(newSortBy as any, 'desc');
    }
  }, [sortBy, sortOrder, onSortChange]);

  const sortedTokens = useMemo(
    () => sortTokens(tokens, sortBy, sortOrder),
    [tokens, sortBy, sortOrder]
  );

  return (
    <div className="border-r-[1px] border-[#1c1d24] flex flex-1 flex-col h-full justify-start items-center overflow-hidden bg-[#101114]">
      
      {/* --- Sticky Header --- */}
      <div className="sticky top-0 z-30 w-full">
        <div className="hidden sm:flex sticky top-0 z-30 whitespace-nowrap flex-row w-full gap-[12px] min-h-[48px] justify-end items-center pr-[12px] pl-[4px] lg:pl-[12px] xl:pl-[12px] border-b-[1px] border-primaryStroke bg-background">
          <div className="flex flex-row items-center gap-[16px] flex-1">
            <span className="text-textPrimary text-[16px] font-medium flex-1">
              {title}
            </span>
          </div>

          {/* Right Side Controls */}
          <div className="hidden lg:block">
    <div
      className="
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
        <img
          src="/images/flash.png"
          alt="flash"
          className="w-[14px] h-[14px] object-contain"
        />
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
      <img
        src="/images/sol.svg"
        width={14}
        height={14}
        alt="SOL"
        className="w-[14px] h-[14px]"
      />

      {/* Divider + P Buttons */}
      <div
        className="
          border-l border-[#1E1E22]
          flex h-full pr-[2px] pl-[2px] gap-[3px]
          justify-center items-center cursor-pointer
        "
      >
        {/* P1 */}
        <button
          type="button"
          className="
            group w-[22px] h-[22px] flex flex-row gap-[4px]
            rounded-[4px] justify-center items-center
            transition-colors duration-125
            hover:bg-[rgba(76,122,242,0.10)]
          "
        >
          <span
            className="
              text-[12px] flex flex-row justify-center items-center font-medium
              text-[#4C7AF2] group-hover:text-[#6B95FF]
              transition-colors duration-125
            "
          >
            P1
          </span>
        </button>

        {/* P2 */}
        <button
          type="button"
          className="
            group w-[22px] h-[22px] flex flex-row gap-[4px]
            rounded-[4px] justify-center items-center
            transition-colors duration-125
            hover:bg-[rgba(255,255,255,0.10)]
          "
        >
          <span className="text-[12px] font-medium text-[#8E8E93]">P2</span>
        </button>

        {/* P3 */}
        <button
          type="button"
          className="
            group w-[22px] h-[22px] flex flex-row gap-[4px]
            rounded-r-full rounded-l-[4px] justify-center items-center
            transition-colors duration-125
            hover:bg-[rgba(255,255,255,0.10)]
          "
        >
          <span className="text-[12px] font-medium text-[#8E8E93]">P3</span>
        </button>
      </div>
    </div>
  </div>

  {/* === SLIDER ICON (OUTSIDE MAIN CHIP) === */}
  <button
    type="button"
    className="
      flex flex-row p-[4px] w-[24px] h-[24px]
      justify-center items-center cursor-pointer 
      rounded-[8px] sm:rounded-[4px]
      transition-opacity duration-150 ease-in-out
      hover:bg-[rgba(255,255,255,0.07)]
    "
  >
    <img
      src="/images/slider.png"
      alt="slider"
      className="w-[14px] h-[14px] opacity-70"
    />
  </button>


        </div>
      </div>

      {/* --- Scrollable List Area --- */}
      <div className="flex flex-1 w-full relative">
        <div className="absolute inset-0 overflow-y-auto">
          <div style={{ width: '100%', position: 'relative' }}>
            {isLoading ? (
              <div className="p-4">
                <TokenSkeleton count={5} />
              </div>
            ) : sortedTokens.length > 0 ? (
              sortedTokens.map(token => (
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