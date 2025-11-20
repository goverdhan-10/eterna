import React, { memo, useState, useEffect } from 'react';
import { Token } from '@/types';
import { formatCurrency } from '@/utils/format';

interface TokenRowProps {
  token: Token;
  onSelect?: (token: Token) => void;
  isSelected?: boolean;
}

export const TokenRow: React.FC<TokenRowProps> = memo(({ token, onSelect, isSelected }) => {
  // Calculate visual pressure for the TX bar based on price change
  const buyPercentage = token.priceChange24h > 0 
    ? Math.min(90, 50 + token.priceChange24h) 
    : Math.max(10, 50 + token.priceChange24h);
  const sellPercentage = 100 - buyPercentage;

  // Toggle states for the left-side action buttons
  const [eyeOn, setEyeOn] = useState(false);
  const [chefOn, setChefOn] = useState(false);
  const [circleOn, setCircleOn] = useState(false);

  // State for dynamic color variations
  const [lastPrice, setLastPrice] = useState(token.currentPrice);
  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | 'neutral'>('neutral');
  const [hasRecentChange, setHasRecentChange] = useState(false);

  useEffect(() => {
    if (token.currentPrice > lastPrice) {
      setPriceDirection('up');
      setHasRecentChange(true);
      const timer = setTimeout(() => setHasRecentChange(false), 1000);
      return () => clearTimeout(timer);
    } else if (token.currentPrice < lastPrice) {
      setPriceDirection('down');
      setHasRecentChange(true);
      const timer = setTimeout(() => setHasRecentChange(false), 1000);
      return () => clearTimeout(timer);
    }
    setLastPrice(token.currentPrice);
  }, [token.currentPrice, lastPrice]);

  useEffect(() => {
    setLastPrice(token.currentPrice);
  }, []);

  // Dynamic color palette based on price change
  const getColorVariant = () => {
    const absChange = Math.abs(token.priceChange24h);
    if (absChange > 50) return { text: '#FF5733', bg: '#FF5733', label: 'extreme' }; // Extreme red/orange
    if (absChange > 30) return { text: '#FF6B6B', bg: '#FF6B6B', label: 'very-high' }; // High red
    if (token.priceChange24h > 15) return { text: '#52C5FF', bg: '#52C5FF', label: 'high' }; // Bright blue
    if (token.priceChange24h > 5) return { text: '#4ECDC4', bg: '#4ECDC4', label: 'medium-up' }; // Teal
    if (token.priceChange24h > 0) return { text: '#95E1D3', bg: '#95E1D3', label: 'slight-up' }; // Light green
    if (token.priceChange24h > -5) return { text: '#F0A500', bg: '#F0A500', label: 'slight-down' }; // Orange
    if (token.priceChange24h > -15) return { text: '#FF8C42', bg: '#FF8C42', label: 'medium-down' }; // Orange-red
    if (token.priceChange24h > -30) return { text: '#FF6348', bg: '#FF6348', label: 'high-down' }; // Red
    return { text: '#EE5A6F', bg: '#EE5A6F', label: 'extreme-down' }; // Deep red
  };

  const colorVariant = getColorVariant();

  // Calculate glow intensity based on price change
  const glowIntensity = Math.min(Math.abs(token.priceChange24h) / 50, 1);
  const glowColor = token.priceChange24h >= 0 
    ? `rgba(82, 197, 255, ${glowIntensity * 0.4})`
    : `rgba(255, 107, 107, ${glowIntensity * 0.4})`;

  // Determine stat indicator colors
  const getStatColor = (value: number) => {
    if (value > 100) return '#FF5733';
    if (value > 50) return '#FF6B6B';
    if (value > 20) return '#52C5FF';
    if (value > 10) return '#4ECDC4';
    if (value > 0) return '#95E1D3';
    return '#666';
  };

  // Random variation for visual interest
  const [pillVariations] = useState(() => ({
    pill1: Math.random() > 0.5 ? '#FF6B6B' : '#52C5FF',
    pill2: Math.random() > 0.5 ? '#4ECDC4' : '#95E1D3',
    pill3: Math.random() > 0.5 ? '#F0A500' : '#FF8C42',
    pill4: Math.random() > 0.5 ? '#52C5FF' : '#4ECDC4',
  }));

  return (
    <div 
      onClick={() => onSelect?.(token)}
      className={`
        border-[#101114] border-b flex flex-col w-full justify-start items-center cursor-pointer relative overflow-hidden 
        hover:bg-primaryStroke/50 group lg:group xl:hover:bg-primaryStroke/50 
        h-[142px] min-h-[142px] sm:h-[116px] sm:min-h-[116px] md:h-[142px] md:min-h-[142px] lg:h-[142px] lg:min-h-[142px] xl:h-[116px] xl:min-h-[116px] 
        ${isSelected ? 'bg-primaryStroke/30' : ''}
        transition-all duration-300
      `}
    >
      <div className="w-full h-full flex flex-col">
        
        {/* --- Hover Action Buttons (Top Left) --- */}
        <span className="contents">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setEyeOn(prev => !prev); }}
            className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-0 text-textTertiary hover:text-[#434d89] w-6 h-6 flex items-center justify-center rounded-sm bg-[#101114]"
            style={{ top: "6px", left: "6px" }}
          >
            <img src={eyeOn ? "/images/eye.png" : "/images/eye-off.png"} alt="eye" className="w-[14px] h-[14px]" />
          </button>
        </span>

        <span className="contents">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setChefOn(prev => !prev); }}
            className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-0 text-textTertiary hover:text-[#434d89] w-6 h-6 flex items-center justify-center rounded-sm bg-[#101114]"
            style={{ top: "32px", left: "6px" }}
          >
            <img src={chefOn ? "/images/cooking.png" : "/images/cook.png"} alt="chef" className="w-[14px] h-[14px]" />
          </button>
        </span>

        <span className="contents">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setCircleOn(prev => !prev); }}
            className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-0 text-[#434d89] group-hover:text-[#434d89] w-6 h-6 flex items-center justify-center rounded-sm bg-[#101114]"
            style={{ top: "58px", left: "6px" }}
          >
            <img src={circleOn ? "/images/circle.png" : "/images/circle-off.png"} alt="circle" className="w-3.5 h-3.5" />
          </button>
        </span>
        
        {/* --- Quick Buy Button (Mobile) --- */}
        <div className="absolute right-3 bottom-2.5 sm:right-4 sm:bottom-3 z-20 block sm:hidden">
          <div>
            <div className=" ">
              <button type="button" className="bg-primaryBlue hover:bg-primaryBlueHover text-[#090909] flex flex-row gap-1 justify-center items-center rounded-[999px] h-6 whitespace-nowrap transition-all duration-0 relative overflow-hidden group/quickBuyButton " style={{ paddingLeft: '6px', paddingRight: '6px' }}>
                <img src="/images/flash.png" alt="flash" className="w-4 h-4 relative z-10" />
                <span className="text-[12px] font-bold relative z-10">0 SOL</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- Quick Buy Button (Desktop) --- */}
        <div className="absolute right-3 bottom-4 sm:right-4 sm:bottom-4 z-20 hidden sm:block lg:opacity-0 lg:group-hover:opacity-100 xl:opacity-100 2xl:!opacity-100">
          <div className="opacity-0 group-hover:opacity-100 2xl:!opacity-100">
            <div className=" ">
              <button type="button" className="bg-primaryBlue hover:bg-primaryBlueHover text-[#090909] flex flex-row gap-1 justify-center items-center rounded-[999px] h-6 whitespace-nowrap transition-all duration-0 relative overflow-hidden group/quickBuyButton " style={{ paddingLeft: '6px', paddingRight: '6px' }}>
                <img src="/images/flash.png" alt="flash" className="w-4 h-4 relative z-10" />
                <span className="text-[12px] font-bold relative z-10">0 SOL</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- Top Right Stats Block (MC, V, F, TX) --- */}
        <div className="absolute right-4 top-4 z-10 block">
          <div className="flex flex-col gap-0.5 items-end">
            
            {/* Market Cap */}
            <div className="relative">
              <div className="absolute z-0" style={{ inset: '-12px -8px 1px -4px' }}>
                <div className="group-hover:bg-primaryStroke/50 absolute inset-0 z-10"></div>
                <div className="bg-backgroundSecondary absolute inset-0 z-0"></div>
              </div>
              <div className="relative flex flex-row gap-2 justify-end items-end z-20">
                <span className="contents">
                  <div className="flex flex-row h-[18px] gap-1 justify-end items-end">
                    <span className="text-textTertiary text-[12px] font-medium pb-[1.6px]">MC</span>
                    <span className="text-[16px] font-medium" style={{ color: colorVariant.bg }}>
                      {token.marketCap ? formatCurrency(token.marketCap) : '-'}
                    </span>
                  </div>
                </span>
              </div>
            </div>

            {/* Volume */}
            <div className="relative">
              <div className="absolute z-0" style={{ inset: '-12px -8px 1px -4px' }}>
                <div className="group-hover:bg-primaryStroke/50 absolute inset-0 z-10"></div>
                <div className="bg-backgroundSecondary absolute inset-0 z-0"></div>
              </div>
              <div className="relative flex flex-row gap-2 justify-start items-start z-20">
                <span className="contents">
                  <div className="flex flex-row h-[18px] flex-1 gap-1 justify-end items-end">
                    <span className="text-textTertiary text-[12px] font-medium pb-[1.6px]">V</span>
                    <span className="text-[16px] font-medium transition-colors duration-300" style={{ color: token.priceChange24h >= 0 ? '#52C5FF' : '#FF6B6B' }}>
                      {token.volume24h ? formatCurrency(token.volume24h) : '$0'}
                    </span>
                  </div>
                </span>
              </div>
            </div>

            {/* Price (F) and Transactions (TX) */}
            <div className="relative flex flex-row gap-2 justify-start items-start -mt-0.5">
              <div className="absolute z-0" style={{ inset: '-2px -8px -4px -4px' }}>
                <div className="group-hover:bg-primaryStroke/50 absolute inset-0 z-5"></div>
                <div className="bg-backgroundSecondary absolute inset-0 z-0"></div>
              </div>
              
              {/* Floor/Price */}
              <span className="contents">
                <div className="relative flex flex-row justify-end items-center h-3 gap-1 shrink-0 group/image text-nowrap z-20">
                  <span className="text-textTertiary text-[11px] font-medium">F</span>
                  <div className="flex flex-row gap-0.5 items-center">
                    <img alt="SOL" loading="eager" width="14" height="14" decoding="async" className="w-3.5 h-3.5" src="/images/sol.png" style={{ color: 'transparent' }} />
                    <span className="text-textPrimary text-[12px] font-medium">
                      {token.currentPrice.toFixed(6)}
                    </span>
                  </div>
                </div>
              </span>

              {/* TX Bar */}
              <span className="contents">
                <div className="relative flex flex-row justify-end items-center h-3 gap-1 shrink-0 group/image text-nowrap z-20">
                  <span className="text-textTertiary text-[11px] font-medium">TX <span className="text-textPrimary text-[11px] font-medium">2</span></span>
                  <div className="flex flex-row flex-1 min-w-6 max-w-6 h-0.5 bg-secondaryStroke rounded-full overflow-hidden">
                    <div className="h-0.5 transition-all duration-300" style={{ width: `${buyPercentage}%`, backgroundColor: token.priceChange24h >= 0 ? '#52C5FF' : '#FF6B6B' }}></div>
                    <div className="h-0.5 transition-all duration-300" style={{ width: `${sellPercentage}%`, backgroundColor: token.priceChange24h >= 0 ? '#FF6B6B' : '#4ECDC4' }}></div>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>

        {/* --- Main Content Flex Row --- */}
        <div className="flex flex-row w-full gap-3 pl-3 pr-3 sm:pr-4 pt-3 pb-0.5 justify-start items-center">
          
          {/* Image Section */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-[74px] h-[74px] justify-center items-center">
              <span className="contents">
                <div className="flex bg-virtualCurve absolute -bottom-1 -right-1 p-px w-4 h-4 justify-center items-center rounded-full z-30">
                  <div className="flex justify-center items-center bg-background absolute w-3.5 h-3.5 rounded-full z-30">
                    <img alt="Virtual Curve" loading="eager" width="10" height="10" decoding="async" src="https://axiom.trade/images/virtual-curve.svg" style={{ color: 'transparent', objectFit: 'cover' }} />
                  </div>
                </div>
              </span>
              <div className="bg-virtualCurve/20 absolute flex p-px justify-start items-center rounded-sm z-20">
                <div className="bg-backgroundSecondary flex p-0.5 justify-start items-center rounded-[3px]">
                  <div className="w-[68px] h-[68px] shrink-0 group/image relative">
                    <div className="w-full h-full relative">
                      <div className="pointer-events-none border-textPrimary/10 border absolute w-[68px] h-[68px] z-10 rounded-[1px]"></div>
                      {token.image ? (
                         <img alt={token.symbol} loading="eager" width="68" height="68" decoding="async" className="rounded-[1px] w-[68px] h-[68px] object-cover" src={token.image} style={{ color: 'transparent', objectFit: 'cover' }} />
                      ) : (
                         <div className="rounded-[1px] w-[68px] h-[68px] bg-slate-800 flex items-center justify-center text-white text-xs">{token.symbol[0]}</div>
                      )}
                      <button className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 flex items-center justify-center ">
                        <img src="/images/eye.png" alt="view" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* The Ring SVG */}
              <div className="absolute top-0 left-0 w-[74px] h-[74px] rounded-sm z-10 flex items-center justify-center">
                <div className="inline-flex items-center justify-center">
                  <svg width="78" height="78" viewBox="0 0 78 78">
                    <path className="text-virtualCurve opacity-40" stroke="currentColor" fill="transparent" strokeWidth="1" d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76"></path>
                    <path className="text-virtualCurve transition-all duration-300 ease-in-out" stroke="currentColor" fill="transparent" strokeWidth="1" strokeLinecap="round" strokeDasharray="296" strokeDashoffset="0.059" d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76"></path>
                  </svg>
                </div>
              </div>
            </div>
            <span className="contents">
              <span className="text-textTertiary text-[12px] font-medium text-center max-w-[74px]">
                <button type="button" className="text-textTertiary hover:text-primaryBlueHover transition-colors duration-125 text-[12px] font-medium text-center max-w-[74px] flex items-center gap-1 group/copy">
                  <span>{token.contractAddress.slice(0, 4)}...{token.contractAddress.slice(-4)}</span>
                </button>
              </span>
            </span>
          </div>

          {/* Text Info Section */}
          <div className="flex flex-col flex-1 h-full gap-5 justify-start items-start pt-0 pb-3 overflow-hidden">
            <div className="flex flex-col w-full gap-0.5 justify-start items-start min-w-0">
              
              {/* Name and Symbol Header */}
              <div className="flex flex-row min-h-[18px] w-full gap-1 justify-between items-start min-w-0">
                <div className="overflow-hidden">
                  <div className="justify-start items-start" style={{ minWidth: '111px' }}>
                    <div className="flex flex-row gap-1 justify-start items-center ">
                      <div className="min-w-0 whitespace-nowrap overflow-hidden truncate text-textPrimary text-[16px] font-medium tracking-[-0.02em]" style={{ maxWidth: 'calc(120px)' }}>
                        {token.name}
                      </div>
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <span className="contents">
                          <button type="button" className="flex flex-row gap-1 justify-start items-center text-textTertiary hover:text-primaryBlueHover transition-colors duration-125 min-w-0 overflow-hidden">
                            <div className="min-w-0 whitespace-nowrap overflow-hidden truncate text-inherit text-[16px] sm:text-[16px] lg:text-[14px] xl:text-[16px] text-left font-medium tracking-[-0.02em] xl:truncate xl:max-w-full block" style={{ maxWidth: 'calc(48px)' }}>
                              {token.symbol}
                            </div>
                            <img src="/images/copy.png" alt="copy" className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials, Time, Badges */}
              <div className="flex flex-row w-full h-[18px] gap-3 lg:gap-2 xl:gap-3 justify-start items-center">
                <div className="flex items-center gap-2">
                  <span className="text-primaryGreen text-[14px] font-medium">6d</span>
                </div>
                <div className="flex flex-row shrink-0 gap-2 justify-start items-center">
                  <a className="flex items-center">
                    <img src="/images/bonk.svg" alt="twitter" className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity" />
                  </a>
                  
                   <a className="flex items-center">
                    <img src="/images/pump.png" alt="pump" className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity" />
                  </a>
                  <a className="flex items-center">
                    <img src="/images/search.png" alt="search" className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity" />
                  </a>
                </div>
                {/* Desktop Stats Row */}
                <div className="flex-row flex-1 h-[18px] gap-2 justify-start items-center hidden sm:flex md:hidden lg:hidden xl:flex">
                  <span className="contents">
                    <div className="flex flex-row gap-0.5 h-4 justify-start items-center">
                      <img src="/images/profile2.png" alt="holders" className="w-4 h-4" />
                      <span className="text-[12px] font-medium" style={{ color: 'rgb(255, 255, 255)' }}>1</span>
                    </div>
                  </span>
                  <span className="contents">
                    <div className="flex flex-row gap-0.5 h-4 justify-center items-center shrink-0">
                      <div className="flex justify-center items-center min-w-4 min-h-4 max-w-4 max-h-4">
                        <img src="/images/trophy.png" alt="pro-trader" className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-textPrimary text-[12px] font-medium">1</span>
                    </div>
                  </span>
                  <span className="contents">
                    <div className="flex flex-row gap-0.5 h-4 justify-center items-center shrink-0">
                      <img src="/images/slider2.png" alt="trophy" className="w-4 h-4" />
                      <span className="text-textPrimary text-[12px] font-medium">0</span>
                    </div>
                  </span>
                  <span className="contents">
                    <div className="flex flex-row gap-0.5 h-4 justify-start items-center cursor-pointer">
                      <img src="/images/crown.png" alt="sniper" className="w-4 h-4" />
                      <span className="text-textPrimary text-[12px] font-medium">11/64</span>
                    </div>
                  </span>
                </div>
              </div>

              {/* Mobile Stats Row */}
              <div className="flex sm:hidden md:flex lg:flex xl:hidden flex-row flex-1 h-[18px] gap-2 justify-start items-center pt-[3px]">
                <div className="flex flex-row gap-0.5 h-4 justify-start items-center">
                  <img src="/images/profile2.png" alt="holders" className="w-4 h-4" />
                  <span className="text-[12px] font-medium" style={{ color: 'rgb(255, 255, 255)' }}>1</span>
                </div>
                <div className="flex flex-row gap-0.5 h-4 justify-center items-center shrink-0">
                  <img src="/images/trophy.png" alt="pro-trader" className="w-4 h-4" />
                  <span className="text-textPrimary text-[12px] font-medium">1</span>
                </div>
                <span className="contents">
                  <div className="flex flex-row gap-0.5 h-4 justify-center items-center shrink-0">
                    <img src="/images/slider2.png" alt="trophy" className="w-4 h-4" />
                    <span className="text-textPrimary text-[12px] font-medium">0</span>
                  </div>
                </span>
                <span className="contents">
                    <div className="flex flex-row gap-0.5 h-4 justify-start items-center cursor-pointer">
                    <img src="/images/crown.png" alt="sniper" className="w-4 h-4" />
                    <span className="text-textPrimary text-[12px] font-medium">11/64</span>
                  </div>
                </span>
              </div>
            </div>

            {/* --- Bottom Pills Row (Desktop) --- */}
            <div className="hidden sm:flex md:hidden lg:hidden xl:flex flex-row w-full h-6 gap-1 justify-start items-end">
              <div>
                <div className="flex flex-row gap-1 shrink-0 h-6 px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border transition-all duration-300" style={{ borderColor: colorVariant.bg, backgroundColor: `${colorVariant.bg}20` }}>
                  <img src="/images/profile.png" alt="user-star" className="w-3.5 h-3.5" />
                  <span className="text-[12px] font-medium transition-colors duration-300" style={{ color: colorVariant.bg }}>
                    {Math.abs(token.priceChange24h).toFixed(0)}%
                  </span>
                </div>
              </div>
              <span className="contents">
                <div className="flex flex-row gap-1 shrink-0 w-fit h-6 px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border transition-all duration-300" style={{ borderColor: pillVariations.pill1, backgroundColor: `${pillVariations.pill1}20` }}>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <img src="/images/cook.png" alt="chef" className="w-5 h-5" />
                  </div>
                  <span className="text-[12px] font-medium" style={{ color: pillVariations.pill1 }}>0%</span>
                </div>
              </span>
              <span className="contents">
                <div className="flex flex-row gap-1 shrink-0 w-fit h-6 px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border transition-all duration-300" style={{ borderColor: pillVariations.pill2, backgroundColor: `${pillVariations.pill2}20` }}>
                  <img src="/images/target.png" alt="crosshair" className="w-4 h-4" />
                  <span className="text-[12px] font-medium" style={{ color: pillVariations.pill2 }}>0%</span>
                </div>
              </span>
              <span className="contents">
                <div className="flex flex-row gap-1 shrink-0 w-fit h-6 px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border transition-all duration-300" style={{ borderColor: pillVariations.pill3, backgroundColor: `${pillVariations.pill3}20` }}>
                  <img src="/images/ghost.png" alt="ghost" className="w-4 h-4" />
                  <span className="text-[12px] font-medium" style={{ color: pillVariations.pill3 }}>0%</span>
                </div>
              </span>
              <span className="contents">
                <div className="flex flex-row gap-1 shrink-0 w-fit h-6 px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border transition-all duration-300" style={{ borderColor: pillVariations.pill4, backgroundColor: `${pillVariations.pill4}20` }}>
                  <div className="flex justify-center items-center min-w-3.5 min-h-3.5 max-w-3.5 max-h-3.5">
                    <img src="/images/database.png" alt="boxes" className="w-5 h-5" />
                  </div>
                  <span className="text-[12px] font-medium" style={{ color: pillVariations.pill4 }}>0%</span>
                </div>
              </span>
            </div>

            {/* --- Bottom Pills Row (Mobile) --- */}
            <div className="flex sm:hidden md:flex lg:flex xl:hidden flex-row w-full h-6 gap-1 px-3 justify-start items-end">
              <div>
                <div className="flex flex-row gap-1 shrink-0 h-6 px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border transition-all duration-300" style={{ borderColor: colorVariant.bg, backgroundColor: `${colorVariant.bg}20` }}>
                  <img src="/images/profile.png" alt="user-star" className="w-4 h-4" />
                  <span className="text-[12px] font-medium transition-colors duration-300" style={{ color: colorVariant.bg }}>
                    {Math.abs(token.priceChange24h).toFixed(0)}%
                  </span>
                </div>
              </div>
              <span className="contents">
                <div className="flex flex-row gap-1 shrink-0 w-fit h-6 px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border transition-all duration-300" style={{ borderColor: pillVariations.pill1, backgroundColor: `${pillVariations.pill1}20` }}>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <img src="/images/cook.png" alt="chef" className="w-5 h-5" />
                  </div>
                  <span className="text-[12px] font-medium" style={{ color: pillVariations.pill1 }}>0%</span>
                </div>
              </span>
               <span className="contents">
                <div className="flex flex-row gap-1 shrink-0 w-fit h-6 px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border transition-all duration-300" style={{ borderColor: pillVariations.pill2, backgroundColor: `${pillVariations.pill2}20` }}>
                  <img src="/images/target.png" alt="crosshair" className="w-4 h-4" />
                  <span className="text-[12px] font-medium" style={{ color: pillVariations.pill2 }}>0%</span>
                </div>
              </span>
              <span className="contents">
                <div className="flex flex-row gap-1 shrink-0 w-fit h-6 px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border transition-all duration-300" style={{ borderColor: pillVariations.pill3, backgroundColor: `${pillVariations.pill3}20` }}>
                  <img src="/images/ghost.png" alt="ghost" className="w-4 h-4" />
                  <span className="text-[12px] font-medium" style={{ color: pillVariations.pill3 }}>0%</span>
                </div>
              </span>
              <span className="contents">
                <div className="flex flex-row gap-1 shrink-0 w-fit h-6 px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border transition-all duration-300" style={{ borderColor: pillVariations.pill4, backgroundColor: `${pillVariations.pill4}20` }}>
                  <div className="flex justify-center items-center min-w-3.5 min-h-3.5 max-w-3.5 max-h-3.5">
                    <img src="/images/database.png" alt="boxes" className="w-5 h-5" />
                  </div>
                  <span className="text-[12px] font-medium" style={{ color: pillVariations.pill4 }}>0%</span>
                </div>
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
});

TokenRow.displayName = 'TokenRow';