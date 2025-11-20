"use client";
import React, { useRef, useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ListFilter,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import MarketLighthouse from './Lighthouse';

// ==========================================
// FIXED TOOLTIP COMPONENT
// Uses position:fixed to escape overflow clipping
// ==========================================
const TooltipWrapper = ({ children, text }: { children: React.ReactNode; text: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ left: 0, top: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        left: rect.left + rect.width / 2, // Center horizontally
        top: rect.top - 8 // Position above the element with 8px gap
      });
    }
  };

  const handleMouseEnter = () => {
    updatePosition();
    setIsVisible(true);
  };

  // Update position if user scrolls while hovering
  useEffect(() => {
    if (isVisible) {
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible]);

  return (
    <div 
      ref={triggerRef}
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {/* Render Tooltip in Fixed Position to escape Footer Overflow */}
      {isVisible && (
        <div 
          className="fixed z-[9999] pointer-events-none flex flex-col items-center transition-opacity duration-150"
          style={{ 
            left: coords.left, 
            top: coords.top, 
            transform: 'translate(-50%, -100%)' 
          }}
        >
          <div className="bg-[#09090b] text-slate-200 text-[10px] font-normal py-1.5 px-2.5 rounded-sm whitespace-nowrap shadow-xl border border-white/10 tracking-wide">
            {text}
          </div>
          {/* Arrow */}
          
        </div>
      )}
    </div>
  );
};

export default function Footer() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    // REMOVED 'overflow-hidden' from here to be safe, though Fixed Tooltip handles it.
    // Added z-40 to ensure footer sits on top of background layers.
    <div className="group relative h-[36px] bg-[#09090b] border-t border-white/10 w-full font-sans text-[#94a3b8] z-40 select-none">
      
      {/* --- Scroll Navigation Arrows --- */}
      <div className="absolute left-0 top-0 bottom-0 z-[60] flex items-center bg-gradient-to-r from-[#09090b] via-[#09090b] to-transparent pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button onClick={() => handleScroll('left')} className="pointer-events-auto h-full px-1 hover:text-white text-[#94A3B8] transition-colors flex items-center">
          <ChevronLeft size={16} />
        </button>
      </div>

      <div className="absolute right-0 top-0 bottom-0 z-[60] flex items-center bg-gradient-to-l from-[#09090b] via-[#09090b] to-transparent pl-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button onClick={() => handleScroll('right')} className="pointer-events-auto h-full px-1 hover:text-white text-[#94A3B8] transition-colors flex items-center">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* --- Main Scroll Container --- */}
      <div 
        ref={scrollRef}
        className="flex flex-row justify-between items-center w-full h-full px-6 gap-4 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >

        {/* ================= LEFT GROUP ================= */}
        <div className="flex flex-row shrink-0 gap-2 items-center">
          
          <TooltipWrapper text="Current Preset">
            <button className="text-[#3b82f6] bg-[#3b82f6]/20 flex flex-row h-[24px] px-2 gap-1 justify-start items-center rounded-[4px] hover:bg-[#3b82f6]/25 transition-colors duration-150 ease-in-out cursor-pointer">
              <ListFilter size={16} />
              <span className="text-[12px] font-semibold">PRESET 1</span>
            </button>
          </TooltipWrapper>

          <TooltipWrapper text="Active Wallet">
            <button className="group/wallets border border-white/10 flex flex-row h-[24px] pl-2 pr-1.5 gap-1.5 justify-start items-center rounded-full hover:bg-white/5 transition-colors duration-125 ease-in-out cursor-pointer">
              <div className="flex flex-row gap-1.5 justify-start items-center">
                <img src="/images/wal2.png" alt="Wallet" className="w-3.5 h-3.5 opacity-60 group-hover/wallets:opacity-100 transition-opacity" />
                <span className="text-[12px] group-hover/wallets:text-slate-400 font-medium text-slate-400 transition-colors">1</span>
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <img alt="SOL" width="14" height="14" src="/images/sol.svg" className="opacity-80" />
                <span className="text-[12px] font-medium text-slate-400">0</span>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </TooltipWrapper>

          <div className="w-px h-5 bg-white/10 shrink-0"></div>

          <TooltipWrapper text="Footer Settings">
            <button className="-mr-1 min-w-[24px] min-h-[24px] flex items-center justify-center text-slate-500 hover:text-slate-400 hover:bg-white/5 transition-colors rounded-[4px]">
              <Settings size={14} />
            </button>
          </TooltipWrapper>

          {[
            { label: 'Wallet', icon: 'wallet.png', hasDot: true, tooltip: 'Wallet Tracker' },
            { label: 'Twitter', icon: 'x.png', hasDot: true, tooltip: 'Twitter Tracker' },
            { label: 'Discover', icon: 'compass.png', hasDot: true, tooltip: 'Discover Tracker' },
            { label: 'Pulse', icon: 'pulse.png', hasDot: true, tooltip: 'Pulse Tracker' },
            { label: 'PnL', icon: 'bar.png', hasDot: false, tooltip: 'PnL Tracker' },
          ].map((item) => (
            <TooltipWrapper key={item.label} text={item.tooltip}>
              <button className="group relative flex flex-row gap-1.5 h-[24px] px-1.5 justify-start items-center rounded-[4px] cursor-pointer hover:bg-white/5 transition-colors">
                {item.hasDot && (
                  <div className="border-[#09090b] absolute top-0 right-0 w-[6px] h-[6px] bg-pink-500 rounded-full"></div>
                )}
                <img 
                  src={`/images/${item.icon}`} 
                  alt={item.label} 
                  className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" 
                />
                <span className="text-slate-400 text-[12px] font-medium whitespace-nowrap">{item.label}</span>
              </button>
            </TooltipWrapper>
          ))}

          <div className="hidden lg:flex w-px h-5 bg-white/10 shrink-0"></div>

          
            <div className="relative group/gas">
              <button className="hidden lg:flex flex-row h-[24px] px-0 gap-1 justify-start items-center hover:brightness-110 transition-all">
                <div className="relative">
                  <div className="relative flex flex-row h-[20px] px-1 gap-1 justify-start items-center rounded-full opacity-30 w-[42px]" 
                       style={{ background: 'linear-gradient(to right, rgb(83, 211, 142) 0%, rgb(231, 140, 25) 50%, rgb(255, 70, 98) 100%)' }}>
                  </div>
                  <div className="absolute inset-0.5 bg-[#09090b] rounded-full flex gap-0.5 justify-center items-center">
                      <img alt="Pump" className="w-2.5 h-2.5" src="/images/pump.svg" />
                      <img alt="Bonk" className="w-2.5 h-2.5" src="/images/bonk.svg" />
                      <img alt="Curve" className="w-2.5 h-2.5" src="/images/virtual-curve.svg" />
                  </div>
                </div>
              </button>
              <div className="hidden group-hover/gas:block fixed bottom-[40px] left-[470px] z-[200] pointer-events-auto">
                <MarketLighthouse />
              </div>
            </div>

          <div className="hidden lg:flex w-px h-5 bg-white/10 shrink-0"></div>

          <div className="flex flex-1 flex-row gap-3 justify-start items-center">
             <TooltipWrapper text="Price of BTC in USD">
               <button className="text-[#F7931A] hidden 2xl:flex flex-row shrink-0 h-[24px] px-0 gap-1.5 justify-start items-center hover:brightness-110 transition-all">
                 <img alt="BTC" className="w-4 h-4" src="/images/btc.svg" />
                 <span className="text-[12px] font-normal">$90.5K</span>
               </button>
             </TooltipWrapper>

             <TooltipWrapper text="Price of ETH in USD">
               <button className="text-[#497493] hidden 2xl:flex flex-row shrink-0 h-[24px] px-0 gap-1 justify-start items-center hover:brightness-110 transition-all">
                 <img alt="ETH" className="w-4 h-4" src="/images/eth.svg" />
                 <span className="text-[12px] font-normal">$2987</span>
               </button>
             </TooltipWrapper>

             <TooltipWrapper text="Price of SOL in USD">
               <button className="text-[#14F195] hidden lg:flex flex-row shrink-0 h-[24px] px-0 gap-1.5 justify-start items-center hover:brightness-110 transition-all">
                 <img alt="SOL" className="w-3.5 h-3.5" src="/images/sol.svg" />
                 <span className="text-[12px] font-normal">$135.31</span>
               </button>
             </TooltipWrapper>
          </div>
        </div>

        {/* ================= RIGHT GROUP ================= */}
        <div className="flex flex-row shrink-0 gap-2 justify-end items-center">
          
          <div className="hidden 2xl:flex items-center gap-4">
             <TooltipWrapper text="Estimated Migration Price">
               <span className="text-slate-500 text-[12px] font-medium hover:text-slate-400 transition-colors">$54.2M</span>
             </TooltipWrapper>

               <div className="flex flex-row gap-1.5 h-[24px] min-h-[24px] justify-start items-center">
                 <img src="/images/pump.png" alt="Gas" className="w-3.5 h-3.5 opacity-60" />
                 <span className="text-slate-500 text-[12px] font-normal">0.0<sub>2</sub>41</span>
               </div>

               <div className="flex flex-row gap-1.5 h-[24px] min-h-[24px] justify-start items-center">
                 <img src="/images/database.png" alt="DB" className="w-3.5 h-3.5 opacity-60" />
                 <span className="text-slate-500 text-[12px] font-normal">0.0<sub>2</sub>92</span>
               </div>
          </div>

          <div className="hidden 2xl:flex w-px h-5 bg-white/10 shrink-0"></div>

             <div className="flex flex-row h-[24px] xl:px-2 gap-1.5 justify-start items-center rounded-[4px] text-[#2ebd6f] xl:bg-[#2ebd6f]/10 cursor-default border border-[#2ebd6f]/20">
               <div className="relative flex items-center justify-center w-2 h-2">
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2ebd6f]"></span>
               </div>
               <span className="hidden xl:flex text-[11px] font-medium">Connection is stable</span>
             </div>

            <button className="flex items-center gap-1 px-2 h-[24px] text-[11px] font-bold rounded hover:bg-white/5 text-slate-400 transition-colors tracking-wide">
              <span>GLOBAL</span>
              <ChevronDown size={14} />
            </button>

          <div className="w-px h-5 bg-white/10 shrink-0"></div>

          <div className="text-slate-500 flex flex-row gap-1 justify-start items-center">
             <TooltipWrapper text="Hide Watchlist Ticker">
               <button className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] transition-colors hover:bg-white/5 hover:text-slate-300">
                 <img src="/images/parts.png" className="w-3.5 h-3.5 opacity-70" alt="Layout" />
               </button>
             </TooltipWrapper>
             <TooltipWrapper text="Notifications Settings">
               <button className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] transition-colors hover:bg-white/5 hover:text-slate-300">
                 <img src="/images/bell.png" className="w-3.5 h-3.5 opacity-70" alt="Notifications" />
               </button>
             </TooltipWrapper>
             <TooltipWrapper text="Customize Theme">
               <button className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] transition-colors hover:bg-white/5 hover:text-slate-300">
                 <img src="/images/palette.png" className="w-3.5 h-3.5 opacity-70" alt="Theme" />
               </button>
             </TooltipWrapper>
          </div>

          <div className="hidden md:flex w-px h-5 bg-white/10 shrink-0"></div>

          <div className="hidden md:flex flex-row gap-3 justify-start items-center">
             <TooltipWrapper text="Join our Discord">
               <a href="#" className="hover:opacity-80 transition-opacity flex items-center justify-center w-[20px]">
                 <img src="/images/discord.png" className="w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-opacity" alt="Discord" />
               </a>
             </TooltipWrapper>
             <TooltipWrapper text="Follow us on X">
               <a href="#" className="hover:opacity-80 transition-opacity flex items-center justify-center w-[20px]">
                 <img src="/images/x.png" className="w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-opacity" alt="X" />
               </a>
             </TooltipWrapper>
          </div>

            <a href="#" className="hidden md:flex flex-row gap-1.5 h-[24px] px-2 justify-start items-center rounded-[4px] hover:bg-white/5 text-slate-400 transition-colors">
              <img src="/images/page.png" className="w-3.5 h-3.5 opacity-60" alt="Docs" />
              <span className="hidden lg:flex text-[11px] font-normal">Docs</span>
            </a>

        </div>
      </div>
    </div>
  );
}