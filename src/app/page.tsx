'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setTokens, setSortBy, setSelectedToken, setLoading } from '@/store/slices/tokensSlice';
import { generateMockTokens } from '@/store/slices/tokensSlice';
import { usePriceUpdates } from '@/hooks/usePriceUpdates';
import { TokenColumn } from '@/components/TokenColumn';
import { TokenDetailModal } from '@/components/TokenDetailModal';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import KeyboardBoxLineIcon from '@/components/ui/KeyboardBoxLineIcon';
import Filter from '@/components/Filter';
import DisplayDropdown from '@/components/Display';

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
  <div className="flex flex-row h-full items-center z-20 gap-2">
    <div className={`${width} h-4 bg-[#212229]`}></div>
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
          min-w-6 min-h-6 flex items-center justify-center
          ${className || 'hover:bg-[#171820] transition-colors duration-125 ease-in-out rounded'}
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
    <div className="h-full flex flex-row gap-px pt-px items-center overflow-x-auto ticker-scroll-container [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] animate-ticker">
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
      <button type="button" className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150 bg-[#171820] scale-110">
        <img src="/images/sol.svg" alt="SOL" width={20} height={20} />
      </button>
    </TooltipTop>
    <TooltipTop text="BNB">
      <button type="button" className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150 hover:bg-primaryStroke/30 hover:opacity-100">
        <img src="/images/bnb.svg" alt="BNB" width={20} height={20} className="grayscale-30" />
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

const WalletSelector = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <TooltipTop text="Active Wallets">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex border border-[#2A2F3A] flex-row p-1 pr-3 pl-3 h-8 gap-2 justify-center items-center rounded-full hover:bg-[#2A2F3A]/35 transition-colors ${isOpen ? 'bg-[#2A2F3A]/35' : ''}`}
        >
          <img src="/images/wal2.png" alt="wallet" className="w-[18px] h-[18px] opacity-70 group-hover:opacity-100 transition-colors duration-150 ease-in-out" />
          <span className="text-sm text-slate-400 font-medium">1</span>
          <img src="/images/sol.svg" width={16} height={16} alt="SOL" />
          <span className="text-sm text-slate-200 font-medium">0</span>
          <img 
            src="/images/down.png" 
            alt="down arrow" 
            className={`w-3 h-3 object-contain opacity-70 group-hover:opacity-100 ml-1 transition-all ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </TooltipTop>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-[348px] bg-[#101114] border border-[#2A2F3A] rounded shadow-xl z-[9999] origin-top-right"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              {/* Header */}
              <div className="flex flex-col">
                <div className="flex flex-row gap-1 pl-4 pr-3 h-11 justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <button type="button" className="group flex flex-row gap-1 justify-start items-center rounded-full px-1.5 h-6 border border-[#2A2F3A] bg-[#2A2F3A]/60 hover:bg-[#2A2F3A]/90 transition-colors duration-125 ease-in-out">
                      <span className="text-slate-200 text-xs leading-4 font-medium">Unselect All</span>
                    </button>
                    <button type="button" disabled className="group flex flex-row gap-1 justify-start items-center rounded-full px-1.5 h-6 opacity-50 cursor-not-allowed border border-[#2A2F3A]/20 bg-[#2A2F3A]/30 transition-colors duration-125 ease-in-out">
                      <span className="text-slate-200 text-xs leading-4 font-medium">Select All with Balance</span>
                    </button>
                  </div>
                  <button type="button" className="group flex items-center justify-center w-6 h-6 rounded hover:bg-[#2A2F3A]/20 transition-colors duration-150 ease-in-out">
                  <img
                    src="/images/setting.png"
                    alt="settings"
                    className="w-[13px] h-[13px] object-contain 
                              text-slate-500 group-hover:text-slate-400 
                              transition-colors duration-150 ease-in-out"
                  />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="flex flex-col border-t border-[#2A2F3A] max-h-[342px] overflow-y-auto custom-scrollbar">
                <div className="group hover:bg-[#2A2F3A]/10 flex flex-row justify-start items-center cursor-pointer">
                  
                  {/* Checkbox Section */}
                  <div className="flex flex-row gap-0 p-4 pr-4 items-start">
                    <div className="inline-flex flex-row h-4 justify-start items-center cursor-pointer">
                      <div className="border border-[rgb(247,147,26)] flex flex-row w-4 h-4 p-0.5 justify-center items-center rounded cursor-pointer">
                        <div className="w-2.5 h-2.5 bg-[rgb(247,147,26)] rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* Wallet Info Section */}
                  <div className="border-[#2A2F3A]/50 border-b flex flex-1 flex-row h-14 gap-0 pl-0 justify-start items-center">
                    <div className="flex flex-col flex-1 gap-1 justify-start items-start pr-4 min-w-[100px]">
                      <span className="text-[rgb(247,147,26)] whitespace-nowrap text-sm leading-[18px] font-medium flex items-center gap-1">
                        Axiom Main
                      </span>
                      <div className="flex flex-row gap-1.5">
                        <button className="text-slate-500 hover:text-slate-400 transition-colors duration-[125ms] ease-in-out group h-4 flex flex-row gap-0.75 pl-1 pr-1.25 cursor-pointer justify-start items-center rounded-full">
                          <img
                            src="/images/rocket.png"
                            alt="rocket"
                            className="w-[11px] h-[11px] object-contain"
                          />

                          <span className="whitespace-nowrap text-[11px] font-medium">Off</span>
                        </button>
                        <button className="text-slate-500 hover:text-slate-400 flex flex-row gap-1 transition-colors duration-[125ms] ease-in-out cursor-pointer">
                          <span className="text-xs leading-4 font-medium">Dh7Hg</span>
                          <img
                            src="/images/copy.png"
                            alt="copy"
                            className="w-3 h-3 object-contain leading-4 font-medium mt-0.5"
                          />

                        </button>
                      </div>
                    </div>

                    {/* Balance Section */}
                    <div className="flex flex-1 flex-row gap-0 pr-0 justify-end items-center">
                      <div className="border border-[#2A2F3A]/50 flex flex-row h-[26px] pl-1.5 pr-1.5 gap-1 justify-end items-center rounded-full">
                        <img alt="SOL" width="16" height="16" src="/images/sol.svg" />
                        <span className="text-slate-400 text-xs leading-4 font-normal">0</span>
                      </div>
                    </div>

                    {/* Token Count Section */}
                    <div className="flex flex-1 flex-row pr-4 justify-end items-center gap-0">
                      <div className="border border-[#2A2F3A]/50 flex flex-row h-[26px] pl-1.75 pr-1.5 gap-1 justify-end items-center rounded-full ml-2">
                        <div className="relative flex flex-row justify-start items-center w-[26px] h-[13px]">
                          <div className="absolute left-0 bg-[#323239] flex flex-row h-[13px] w-[13px] justify-center items-center rounded z-3"></div>
                          <div className="absolute left-1.5 bg-[#2A2F3A] flex flex-row h-[13px] w-[13px] justify-center items-center rounded z-2"></div>
                          <div className="absolute left-3 bg-slate-600 flex flex-row h-[13px] w-[13px] justify-center items-center rounded z-1"></div>
                        </div>
                        <span className="text-slate-400 text-xs leading-4 font-normal">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <button type="button" className="flex flex-row w-full h-12 px-4 gap-4 items-center hover:bg-[#2A2F3A]/35 transition-colors duration-150 ease-in-out cursor-pointer border-t border-[#2A2F3A]">
                <img
                  src="/images/plus.png"
                  alt="add"
                  className="w-3 h-3 object-contain opacity-70 group-hover:opacity-100 transition-colors duration-150 ease-in-out"
                />

                <span className="text-slate-200 text-sm font-medium">Add Wallet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const QuickActions = () => (
  <div className="hidden sm:block lg:hidden">
    <div className="flex flex-row h-full gap-2 items-center">
      <div className="overflow-hidden whitespace-nowrap border-primaryStroke border flex flex-row min-w-[216px] h-8 pl-3 gap-2 justify-start items-center rounded-full hover:bg-primaryStroke/35 transition-colors cursor-pointer">
        <i className="ri-flashlight-fill text-textTertiary" />
        <input placeholder="0.0" className="text-sm w-full text-textPrimary placeholder:text-textTertiary bg-transparent outline-none" />
        <img src="/images/sol.svg" width={16} height={16} alt="SOL" />
        <div className="border-primaryStroke border-l flex pr-0.75 pl-0.75 gap-1.5 items-center">
          {['P1', 'P2', 'P3'].map((p, i) => (
            <button key={p} className={`group w-6 h-6 ${i===2 ? 'rounded-r-full rounded-l' : 'rounded'} ${i===0 ? 'hover:bg-primaryBlueHover/10' : 'hover:bg-primaryStroke/60'} flex items-center justify-center`}>
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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
            className="min-w-6 min-h-6 flex items-center justify-center text-textSecondary hover:text-textSecondary hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out rounded"
          />
          <HeaderIconButton icon="/images/chart.png" alt="chart" tooltip="Active Positions" isGroup />
        </div>
        <VerticalDivider width="w-[1.5px]" />
        <Ticker />
      </div>

      
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
              <span className="text-textPrimary text-xl font-bold">Pulse</span>
              <ChainToggle />
            </div>
            <div className="flex flex-row gap-4 items-center bg-[#06070b] p-4">
              <TooltipTop text="Help with Pulse, Filters Settings">
                <button className="flex flex-row w-6 h-6 justify-center items-center">
                  <img src="/images/help.png" alt="Help" className="w-5 h-5 object-contain opacity-70 hover:opacity-100 transition-all" />
                </button>
              </TooltipTop>
              <div className="relative inline-block" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    bg-[#22242d] flex flex-row h-8 px-3 gap-2 justify-center items-center rounded-full 
                    hover:bg-[#2d2f39]/80 transition-colors duration-150 ease-in-out
                    ${isOpen ? 'bg-[#2d2f39]/80' : ''}
                `}
              >
                <div className="relative">
                    <img src="/images/list.png" alt="list icon" className="w-[18px] h-[18px]" />
                </div>
                <div className="whitespace-nowrap flex flex-row gap-1 justify-start items-center">
                    <span className="text-sm font-bold text-white">Display</span>
                </div>
                {/* Rotate arrow when open */}
                <img 
                    src="/images/down.png" 
                    alt="down arrow" 
                    className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {isOpen && <DisplayDropdown />}
            </div>
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