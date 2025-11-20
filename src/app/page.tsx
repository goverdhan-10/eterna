'use client';
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setTokens, setSortBy, setSelectedToken, setLoading } from '@/store/slices/tokensSlice';
import { generateMockTokens } from '@/store/slices/tokensSlice';
import { usePriceUpdates } from '@/hooks/usePriceUpdates';
import { TokenColumn } from '@/components/TokenColumn';
import { TokenDetailModal } from '@/components/TokenDetailModal';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import KeyboardBoxLineIcon from '@/components/ui/KeyboardBoxLineIcon';
import Filter from '@/components/Filter';

// ==========================================
// 1. REUSABLE UI PRIMITIVES
// ==========================================

const TooltipRight = ({ children, text }: { children: React.ReactNode; text: string }) => (
  <div className="relative flex items-center justify-center group z-50">
    {children}
    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 hidden group-hover:block z-[100] whitespace-nowrap pointer-events-none">
      <div 
        className="bg-[#101114] text-slate-200 text-[10px] leading-3 font-medium py-1.5 px-2 rounded-sm shadow-xl border border-[#2A2F3A] relative"
        style={{ backgroundColor: '#101114' }} 
      >
        {text}
        <div 
          className="bg-[#101114] w-1.5 h-1.5 border-l border-b border-[#2A2F3A] transform rotate-45 absolute top-1/2 -translate-y-1/2 -left-[3.5px]"
          style={{ backgroundColor: '#101114' }} 
        ></div>
      </div>
    </div>
  </div>
);

const TooltipTop = ({ children, text }: { children: React.ReactNode; text: string }) => (
  <div className="relative flex items-center justify-center group z-50">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-[100] whitespace-nowrap pointer-events-none">
      <div 
        className="bg-[#101114] text-slate-200 text-[10px] leading-3 font-medium py-1 px-2 rounded-sm shadow-xl border border-[#2A2F3A] relative"
        style={{ backgroundColor: '#101114' }}
      >
        {text}
      </div>
    </div>
  </div>
);

const VerticalDivider = ({ width = "w-px" }: { width?: string }) => (
  <div className="flex flex-row h-full items-center z-20 gap-[8px]">
    <div className={`${width} h-[16px] bg-[#212229]`}></div>
  </div>
);

// ==========================================
// 2. HEADER COMPONENTS (Thin Top Bar)
// ==========================================

interface HeaderIconProps {
  icon: string;
  alt: string;
  tooltip: string;
  isGroup?: boolean;
  className?: string;
}

const HeaderIconButton: React.FC<HeaderIconProps> = ({ icon, alt, tooltip, isGroup, className }) => (
  <span className="contents">
    <TooltipRight text={tooltip}>
      <button
        type="button"
        className={`
          ${isGroup ? 'group' : ''}
          min-w-[24px] min-h-[24px] flex items-center justify-center
          ${className || 'hover:bg-[#171820] transition-colors duration-125 ease-in-out rounded-[4px]'}
        `}
      >
        <img
          src={icon}
          alt={alt}
          className={`w-3 h-3 ${isGroup ? 'opacity-50 group-hover:opacity-100' : ''} transition-opacity duration-150`}
        />
      </button>
    </TooltipRight>
  </span>
);

const Ticker = () => (
  <div className="flex flex-row justify-start items-center flex-1 overflow-hidden show-bins-container duration-150 ease-in-out">
    <div className="h-full flex flex-row gap-[1px] pt-[1px] items-center overflow-x-auto ticker-scroll-container [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] animate-ticker">
      <div style={{ width: "0px", height: "100%", position: "relative", display: "flex" }}></div>
    </div>
  </div>
);

// ==========================================
// 3. TOOLBAR COMPONENTS (Main Action Bar)
// ==========================================

const ChainToggle = () => (
  <div className="flex items-center gap-1">
    <TooltipTop text="Solana">
      <button type="button" className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full transition-all duration-150 bg-[#171820] scale-110">
        <img src="/images/sol.svg" alt="SOL" width={20} height={20} />
      </button>
    </TooltipTop>
    <TooltipTop text="BNB">
      <button type="button" className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full transition-all duration-150 hover:bg-primaryStroke/30 hover:opacity-100">
        <img src="/images/bnb.svg" alt="BNB" width={20} height={20} className="grayscale-[0.3]" />
      </button>
    </TooltipTop>
  </div>
);

const ToolbarAction = ({ icon, tooltip, isKeyboard }: { icon?: string, tooltip: string, isKeyboard?: boolean }) => (
  <TooltipTop text={tooltip}>
    <button className={`group w-8 h-8 ${isKeyboard ? 'hover:bg-primaryStroke/60' : 'bg-background hover:bg-primaryStroke/60'} rounded-full flex items-center justify-center relative`}>
      {isKeyboard ? (
        <KeyboardBoxLineIcon className="w-4 h-4 text-textSecondary group-hover:text-textPrimary" />
      ) : (
        <img src={icon} alt="action" className="w-5 h-5 group-hover:opacity-100" />
      )}
    </button>
  </TooltipTop>
);

const WalletSelector = () => (
  <TooltipTop text="Active Wallets">
    <button className="flex border border-primaryStroke flex-row p-[4px] pr-[12px] pl-[12px] h-[32px] gap-[8px] justify-center items-center rounded-full hover:bg-primaryStroke/35 transition-colors">
      <img src="/images/wal2.png" alt="wallet" className="w-[18px] h-[18px] opacity-70 group-hover:opacity-100 transition-colors duration-150 ease-in-out" />
      <span className="text-[14px] text-textSecondary font-medium">1</span>
      <img src="/images/sol.svg" width={16} height={16} alt="SOL" />
      <span className="text-[14px] text-textPrimary font-medium">0</span>
      <i className="ri-arrow-down-s-line text-[18px] text-textSecondary"></i>
    </button>
  </TooltipTop>
);

const QuickActions = () => (
  <div className="hidden sm:block lg:hidden">
    <div className="flex flex-row h-full gap-[8px] items-center">
      <div className="overflow-hidden whitespace-nowrap border-primaryStroke border-[1px] flex flex-row min-w-[216px] h-[32px] pl-[12px] gap-[8px] justify-start items-center rounded-full hover:bg-primaryStroke/35 transition-colors cursor-pointer">
        <i className="ri-flashlight-fill text-textTertiary" />
        <input placeholder="0.0" className="text-[14px] w-full text-textPrimary placeholder:text-textTertiary bg-transparent outline-none" />
        <img src="/images/sol.svg" width={16} height={16} alt="SOL" />
        <div className="border-primaryStroke border-l-[1px] flex pr-[3px] pl-[3px] gap-[6px] items-center">
          {['P1', 'P2', 'P3'].map((p, i) => (
            <button key={p} className={`group w-[24px] h-[24px] ${i===2 ? 'rounded-r-full rounded-l-[4px]' : 'rounded-[4px]'} ${i===0 ? 'hover:bg-primaryBlueHover/10' : 'hover:bg-primaryStroke/60'} flex items-center justify-center`}>
              <span className={`text-[13px] ${i===0 ? 'text-primaryBlue group-hover:text-primaryBlueHover' : 'text-textSecondary'} font-medium`}>{p}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ==========================================
// 4. PAGE CONTENT
// ==========================================

function PageContent() {
  const dispatch = useAppDispatch();
  const { newPairs, finalStretch, migrated, selectedToken, sortBy, sortOrder, loading } = useAppSelector(state => state.tokens);
  const [showFilter, setShowFilter] = React.useState(false);

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    const timer = setTimeout(() => {
      const mockData = generateMockTokens();
      dispatch(setTokens(mockData));
      dispatch(setLoading({ isLoading: false }));
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const allTokens = useMemo(() => [...newPairs, ...finalStretch, ...migrated], [newPairs, finalStretch, migrated]);
  usePriceUpdates(allTokens);

  const handleSortChange = (newSortBy: 'price' | 'volume' | 'change' | 'marketcap', order: 'asc' | 'desc') => {
    dispatch(setSortBy({ sortBy: newSortBy, sortOrder: order }));
  };

  const handleTokenSelect = (token: any) => {
    dispatch(setSelectedToken(selectedToken?.id === token.id ? null : token));
  };

  const columnProps = {
    isLoading: loading.isLoading,
    sortBy,
    sortOrder,
    onSortChange: handleSortChange,
    onTokenSelect: handleTokenSelect,
    selectedTokenId: selectedToken?.id,
    onOpenFilter: () => setShowFilter(true),
  };

  return (
    <>
      {/* Thin Top Bar - h-7 (28px) */}
      <div className="grayscale-30 hover:grayscale-0 transition-[filter] relative flex flex-row w-full h-7 gap-2 px-4 pb-px overflow-visible z-50 border-b border-[#171820] sm:border-[#171820]/70 bg-[#06070b]">
        <div className="flex flex-row h-full items-center z-20 gap-2">
          <HeaderIconButton icon="/images/setting.png" alt="settings" tooltip="Settings" isGroup />
        </div>
        <VerticalDivider width="w-px" />
        <div className="flex flex-row h-full items-center z-20 gap-2">
          <HeaderIconButton 
            icon="/images/star.png" 
            alt="star" 
            tooltip="Watchlist" 
            className="min-w-6 min-h-6 flex items-center justify-center text-textSecondary hover:text-textSecondary hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out rounded-[4px]"
          />
          <HeaderIconButton icon="/images/chart.png" alt="chart" tooltip="Active Positions" isGroup />
        </div>
        <VerticalDivider width="w-[1.5px]" />
        <Ticker />
      </div>

      {/* MAIN CONTAINER FIX: 
          Calculated Height to Remove Page Scroll: 100vh - (Header + ThinBar + Footer)
          Header (~64px) + ThinBar (28px) + Footer (36px) = 128px
          Mobile Header (~52px) = 116px total deduction
      */}
      <div className="flex flex-col bg-[#06070b] h-[calc(100vh-116px)] sm:h-[calc(100vh-128px)] overflow-hidden">
        
        {showFilter && (
          <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-80" />
            <div className="fixed inset-0 z-90 flex justify-center items-center">
              <Filter onClose={() => setShowFilter(false)} />
            </div>
          </>
        )}

        {/* Main Content Area - Flex 1 to fill remaining space, no scroll here */}
        <div className="flex-1 flex flex-col p-3 sm:p-6 lg:p-8 overflow-hidden bg-[#06070b]">
          
          {/* Toolbar Row - Fixed Height */}
          <div className="flex-none flex flex-row w-full h-8 justify-start items-center mb-4">
            <div className="flex-1 flex items-center gap-3 bg-[#06070b] p-4">
              <span className="text-textPrimary text-[20px] font-bold">Pulse</span>
              <ChainToggle />
            </div>
            <div className="flex flex-row gap-4 items-center bg-[#06070b] p-4">
              <TooltipTop text="Help with Pulse, Filters Settings">
                <button className="flex flex-row w-[24px] h-[24px] justify-center items-center">
                  <img src="/images/help.png" alt="Help" className="w-[20px] h-[20px] object-contain opacity-70 hover:opacity-100 transition-all" />
                </button>
              </TooltipTop>
              <button className="bg-[#22242d] flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full hover:bg-secondaryStroke/80 transition-color duration-[150ms] ease-in-out">
                <div className="relative"><img src="/images/list.png" alt="list icon" className="w-[18px] h-[18px]" /></div>
                <div className="whitespace-nowrap flex flex-row gap-[4px] justify-start items-center"><span className="text-[14px] font-bold text-textPrimary">Display</span></div>
                <img src="/images/down.png" alt="down arrow" className="w-4 h-4" />
              </button>
              <ToolbarAction icon="/images/bookmark.png" tooltip="Blacklist dev, handle, keywords" />
              <ToolbarAction isKeyboard tooltip="Pulse Hot Keys" />
              <ToolbarAction icon="/images/volume.png" tooltip="Alerts" />
              <ToolbarAction icon="/images/target.png" tooltip="Snipe Settings" />
              <WalletSelector />
              <QuickActions />
            </div>
          </div>

          {/* Token Columns Grid - Flex-1 to take all remaining space, min-h-0 to allow internal scrolling */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 bg-[#101114] border border-[#323239] rounded-lg overflow-hidden">
            <TokenColumn title="New Pairs" tokens={newPairs} {...columnProps} />
            <TokenColumn title="Final Stretch" tokens={finalStretch} {...columnProps} />
            <TokenColumn title="Migrated" tokens={migrated} {...columnProps} />
          </div>

        </div>

      </div>

      {selectedToken && (
        <TokenDetailModal 
          token={selectedToken} 
          onClose={() => dispatch(setSelectedToken(null))}
        />
      )}
    </>
  );
}

export default function Page() {
  return (
    <ErrorBoundary>
      <PageContent />
    </ErrorBoundary>
  );
}