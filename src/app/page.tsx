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

function PageContent() {
  const dispatch = useAppDispatch();
  const { newPairs, finalStretch, migrated, selectedToken, sortBy, sortOrder, loading } = useAppSelector(state => state.tokens);

  // Initialize with mock data
  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const mockData = generateMockTokens();
      dispatch(setTokens(mockData));
      dispatch(setLoading({ isLoading: false }));
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  // Enable price updates
  const allTokens = useMemo(
    () => [...newPairs, ...finalStretch, ...migrated],
    [newPairs, finalStretch, migrated]
  );

  usePriceUpdates(allTokens);

  const handleSortChange = (newSortBy: 'price' | 'volume' | 'change' | 'marketcap', order: 'asc' | 'desc') => {
    dispatch(setSortBy({ sortBy: newSortBy, sortOrder: order }));
  };

  const handleTokenSelect = (token: any) => {
    dispatch(setSelectedToken(selectedToken?.id === token.id ? null : token));
  };

  return (
    <>
      <div
  className="
    grayscale-30 hover:grayscale-0 transition-[filter]
    relative flex flex-row w-full h-7 gap-2
    px-4 pb-[px] overflow-hidden
    border-b border-[#171820] sm:border-[#171820]/70
  "
>
  {/* Settings */}
  <div className="flex flex-row h-full items-center z-20 gap-[8px]">
    <span className="contents">
      <button
  type="button"
  className="
    group
    min-w-[24px] min-h-[24px] flex items-center justify-center
    hover:bg-[#171820] transition-colors duration-125 ease-in-out
    rounded-[4px]
  "
>
  <img
    src="/images/setting.png"
    alt="star"
    className="
      w-3 h-3
      opacity-50
      group-hover:opacity-100
      transition-opacity duration-150
    "
  />
</button>

    </span>
  </div>

  {/* Divider */}
  <div className="flex flex-row h-full items-center z-20 gap-[8px]">
    <div className="w-[1px] h-[16px] bg-[#212229]"></div>
  </div>

  {/* Star + Chart */}
  <div className="flex flex-row h-full items-center z-20 gap-[8px]">
    <span className="contents">
      <button
        type="button"
        className="
          min-w-[24px] min-h-[24px] flex items-center justify-center
          text-textSecondary hover:text-textSecondary
          hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out
          rounded-[4px]
        "
      >
        <img
  src="/images/star.png"
  alt="star"
  className="w-3 h-3"
/>

      </button>
    </span>

    <span className="contents">
      <button
  type="button"
  className="
    group
    min-w-[24px] min-h-[24px] flex items-center justify-center
    hover:bg-[#171820] transition-colors duration-125 ease-in-out
    rounded-[4px]
  "
>
  <img
    src="/images/chart.png"
    alt="star"
    className="
      w-3 h-3
      opacity-50
      group-hover:opacity-100
      transition-opacity duration-150
    "
  />
</button>

    </span>
  </div>

  {/* Divider */}
  <div className="flex flex-row h-full items-center z-20 gap-[8px]">
    <div className="w-[1.5px] h-[16px] bg-[#212229]"></div>
  </div>

  {/* Ticker Scroll Container */}
  <div
    className="
      flex flex-row justify-start items-center flex-1 overflow-hidden
      show-bins-container duration-150 ease-in-out
    "
  >
    <div
      className="
        h-full flex flex-row gap-[1px] pt-[1px] items-center overflow-x-auto
        ticker-scroll-container
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        animate-ticker
      "
    >
      <div
        style={{
          width: "0px",
          height: "100%",
          position: "relative",
          display: "flex",
        }}
      ></div>
    </div>
  </div>
</div>

      <div className="min-h-screen bg-[#06070b] flex flex-col">
        {/* Main Content */}
        <div className="flex-1 p-3 sm:p-6 lg:p-8 overflow-auto">
          <div className="flex-none flex flex-row w-full h-[32px] justify-start items-center">

  {/* LEFT — Title + Chain Switch */}
  <div className="flex-1 flex items-center gap-3">
    <span className="text-textPrimary text-[20px] font-bold">Pulse</span>

    {/* Chain Buttons */}
    <div className="flex items-center gap-1">

      {/* SOL Active */}
      <button
        type="button"
        className="
          relative flex items-center justify-center
          w-[32px] h-[32px] rounded-full
          transition-all duration-150
          bg-[#171820] scale-110
        "
      >
        <img src="/images/sol.svg" alt="SOL" width={20} height={20} />
      </button>

      {/* BNB Inactive */}
      <button
        type="button"
        className="
          relative flex items-center justify-center
          w-[32px] h-[32px] rounded-full
          transition-all duration-150
          hover:bg-primaryStroke/30 hover:opacity-100
        "
      >
        <img
          src="/images/bnb.svg"
          alt="BNB"
          width={20}
          height={20}
          className="grayscale-[0.3]"
        />
      </button>
    </div>
  </div>

  {/* RIGHT SECTION */}
  <div className="flex flex-row gap-4 items-center">

    {/* Help Icon */}
    <button className="flex flex-row w-[24px] h-[24px] justify-center items-center">
  <img
    src="/images/help.png"
    alt="Help"
    className="w-[20px] h-[20px] object-contain opacity-70 hover:opacity-100 transition-all"
  />
</button>


    {/* Display Dropdown */}
    <button
  className="
    bg-[#22242d] flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full
    hover:bg-secondaryStroke/80 transition-color duration-[150ms] ease-in-out
  "
>
  {/* left icon wrapper */}
  <div className="relative">
    <img
      src="/images/list.png"
      alt="list icon"
      className="w-[18px] h-[18px]"
    />
  </div>

  {/* text wrapper */}
  <div className="whitespace-nowrap flex flex-row gap-[4px] justify-start items-center">
    <span className="text-[14px] font-bold text-textPrimary">
      Display
    </span>
  </div>

  {/* right arrow */}
  <img
    src="/images/down.png"
    alt="down arrow"
    className="w-4 h-4"
  />
</button>


    {/* Toolbar Icons */}
    <button className="group w-8 h-8 bg-background hover:bg-primaryStroke/60 rounded-full flex items-center justify-center">
      <img
        src="/images/bookmark.png"
        alt="bookmark"
        className="w-5 h-5 group-hover:opacity-100"
      />
    </button>


    <button className="group w-8 h-8 hover:bg-primaryStroke/60 rounded-full flex items-center justify-center">
  <KeyboardBoxLineIcon className="w-4 h-4 text-textSecondary group-hover:text-textPrimary" />
</button>

    <button className="group w-8 h-8 bg-background hover:bg-primaryStroke/60 rounded-full flex items-center justify-center">
  <img 
    src="/images/volume.png" 
    alt="volume" 
    className="w-5 h-5 group-hover:opacity-100"
  />
</button>


    <button className="group w-8 h-8 bg-background hover:bg-primaryStroke/60 rounded-full flex items-center justify-center relative">
  <img
    src="/images/target.png"
    alt="target"
    className="w-6 h-6 group-hover:opacity-100"
  />

  
</button>


    {/* Wallet Selector */}
    <button
      className="
        flex border border-primaryStroke flex-row p-[4px] pr-[12px] pl-[12px] h-[32px] gap-[8px]
        justify-center items-center rounded-full hover:bg-primaryStroke/35 transition-colors
      "
    >
      <img
  src="/images/wal2.png"
  alt="wallet"
  className="w-[18px] h-[18px] opacity-70 group-hover:opacity-100 transition-colors duration-150 ease-in-out"
/>

      <span className="text-[14px] text-textSecondary font-medium">1</span>

      <img src="/images/sol.svg" width={16} height={16} alt="SOL" />
      <span className="text-[14px] text-textPrimary font-medium">0</span>

      <i className="ri-arrow-down-s-line text-[18px] text-textSecondary"></i>
    </button>

    {/* Right Input + P Buttons (visible on SM only) */}
    <div className="hidden sm:block lg:hidden">
      <div className="flex flex-row h-full gap-[8px] items-center">
        <div
          className="
            overflow-hidden whitespace-nowrap border-primaryStroke border-[1px]
            flex flex-row min-w-[216px] h-[32px] pl-[12px] gap-[8px] justify-start items-center
            rounded-full hover:bg-primaryStroke/35 transition-colors cursor-pointer
          "
        >
          <i className="ri-flashlight-fill text-textTertiary" />

          <input
            placeholder="0.0"
            className="text-[14px] w-full text-textPrimary placeholder:text-textTertiary bg-transparent outline-none"
          />

          <img src="/images/sol.svg" width={16} height={16} alt="SOL" />

          <div className="border-primaryStroke border-l-[1px] flex pr-[3px] pl-[3px] gap-[6px] items-center">

            {/* P1 */}
            <button className="group w-[24px] h-[24px] rounded-[4px] hover:bg-primaryBlueHover/10 flex items-center justify-center">
              <span className="text-[13px] text-primaryBlue group-hover:text-primaryBlueHover font-medium">P1</span>
            </button>

            {/* P2 */}
            <button className="group w-[24px] h-[24px] rounded-[4px] hover:bg-primaryStroke/60 flex items-center justify-center">
              <span className="text-[13px] text-textSecondary">P2</span>
            </button>

            {/* P3 */}
            <button className="group w-[24px] h-[24px] rounded-r-full rounded-l-[4px] hover:bg-primaryStroke/60 flex items-center justify-center">
              <span className="text-[13px] text-textSecondary">P3</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>


          {/* Token Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] bg-[#101114]">
            {/* New Pairs */}
            <TokenColumn
              title="New Pairs"
              tokens={newPairs}
              isLoading={loading.isLoading}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              onTokenSelect={handleTokenSelect}
              selectedTokenId={selectedToken?.id}
            />

            {/* Final Stretch */}
            <TokenColumn
              title="Final Stretch"
              tokens={finalStretch}
              isLoading={loading.isLoading}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              onTokenSelect={handleTokenSelect}
              selectedTokenId={selectedToken?.id}
            />

            {/* Migrated */}
            <TokenColumn
              title="Migrated"
              tokens={migrated}
              isLoading={loading.isLoading}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              onTokenSelect={handleTokenSelect}
              selectedTokenId={selectedToken?.id}
            />
          </div>
        </div>

        {/* Bottom Spacer for Footer */}
        <div className="h-9 sm:h-9" />
      </div>

      {/* Token Detail Modal */}
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

