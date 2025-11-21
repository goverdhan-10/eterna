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
import Global from './Global'; // Ensure this import path is correct

// --- Tooltip Component ---
const TooltipWrapper = ({ children, text }: { children: React.ReactNode; text: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ left: 0, top: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        left: rect.left + rect.width / 2,
        top: rect.top - 8
      });
    }
  };

  const handleMouseEnter = () => {
    updatePosition();
    setIsVisible(true);
  };

  return (
    <div 
      ref={triggerRef}
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className="fixed z-[9999] pointer-events-none flex flex-col items-center transition-opacity duration-150"
          style={{ 
            left: coords.left, 
            top: coords.top, 
            transform: 'translate(-50%, -100%)' 
          }}
        >
          <div className="bg-[#09090b] text-slate-200 text-[10px] font-normal py-1.5 px-2.5 rounded-[4px] whitespace-nowrap shadow-xl border border-white/10 tracking-wide">
            {text}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Footer() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // --- Global Popup State ---
  const [showGlobal, setShowGlobal] = useState(false);
  const [globalRight, setGlobalRight] = useState(0);
  const globalBtnRef = useRef<HTMLButtonElement>(null);
  const globalContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Toggle Global Popup and Calculate Position
  const toggleGlobal = () => {
    if (!showGlobal && globalBtnRef.current) {
      const rect = globalBtnRef.current.getBoundingClientRect();
      // Calculate distance from the right edge of the screen
      const rightDistance = window.innerWidth - rect.right;
      setGlobalRight(rightDistance);
    }
    setShowGlobal(!showGlobal);
  };

  // Close on Click Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If clicking inside the button or the popup, don't close
      if (globalBtnRef.current?.contains(event.target as Node) || 
          (globalContainerRef.current?.contains(event.target as Node))) {
        return;
      }
      setShowGlobal(false);
    };

    if (showGlobal) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showGlobal]);

  return (
    <>
      {/* --- GLOBAL POPUP (Fixed Position) --- */}
      {showGlobal && (
        <div 
          ref={globalContainerRef}
          className="fixed bottom-[42px] z-[9999]"
          style={{ right: globalRight }}
        >
          <Global />
        </div>
      )}

      <div className="group relative h-[36px] bg-[#09090b] border-t border-white/10 w-full font-sans text-[#94a3b8] z-40 select-none">
        
        {/* --- Scroll Arrows --- */}
        <div className="absolute left-0 top-0 bottom-0 z-[60] flex items-center bg-gradient-to-r from-[#09090b] via-[#09090b] to-transparent pr-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <button onClick={() => handleScroll('left')} className="pointer-events-auto h-full px-1 hover:text-white text-[#94A3B8] flex items-center"><ChevronLeft size={16} /></button>
        </div>
        <div className="absolute right-0 top-0 bottom-0 z-[60] flex items-center bg-gradient-to-l from-[#09090b] via-[#09090b] to-transparent pl-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <button onClick={() => handleScroll('right')} className="pointer-events-auto h-full px-1 hover:text-white text-[#94A3B8] flex items-center"><ChevronRight size={16} /></button>
        </div>

        {/* --- Scroll Container --- */}
        <div ref={scrollRef} className="flex flex-row justify-between items-center w-full h-full px-6 gap-4 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* Left Items */}
          <div className="flex flex-row shrink-0 gap-2 items-center">
            <TooltipWrapper text="Trading Settings">
              <button className="text-[#3b82f6] bg-[#3b82f6]/20 flex h-[24px] px-2 gap-1 items-center rounded-[4px] hover:bg-[#3b82f6]/25 transition-colors"><ListFilter size={16} /><span className="text-[12px] font-semibold">PRESET 1</span></button>
            </TooltipWrapper>
            
            <TooltipWrapper text="Active Wallets">
              <button className="group/wallets border border-white/10 flex h-[24px] pl-2 pr-1.5 gap-1.5 items-center rounded-full hover:bg-white/5 transition-colors">
                <img src="/images/wal2.png" alt="Wallet" className="w-3.5 h-3.5 opacity-60 group-hover/wallets:opacity-100" />
                <span className="text-[12px] group-hover/wallets:text-slate-400 font-medium">1</span>
                <div className="flex gap-1 items-center"><img alt="SOL" width="14" height="14" src="/images/sol.svg" className="opacity-80" /><span className="text-[12px] font-medium">0</span></div>
                <ChevronDown size={14} />
              </button>
            </TooltipWrapper>

            <div className="w-px h-5 bg-white/10 shrink-0"></div>
            
            <TooltipWrapper text="Tracker Settings"><button className="-mr-1 min-w-[24px] flex items-center justify-center hover:text-slate-400 hover:bg-white/5 rounded-[4px]"><Settings size={14} /></button></TooltipWrapper>
            
            {[{ label: 'Wallet Tracker', icon: 'wallet.png' , text:"Wallet"}, { label: 'Twitter Tracker', icon: 'x.png',text:"Twitter" }, { label: 'Discover Tracker', icon: 'compass.png',text:"Discover" }, { label: 'Pulse Tracker', icon: 'pulse.png',text:"Pulse" }, { label: 'PnL Tracker', icon: 'bar.png',text:"PnL" }].map((item) => (
              <TooltipWrapper key={item.label} text={item.label}>
                <button className="group relative flex gap-1.5 h-[24px] px-1.5 items-center rounded-[4px] hover:bg-white/5 transition-colors">
                  <img src={`/images/${item.icon}`} className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  <span className="text-[12px] font-medium">{item.text}</span>
                </button>
              </TooltipWrapper>
            ))}

            <div className="hidden lg:flex w-px h-5 bg-white/10 shrink-0"></div>

            
              <div className="relative group/gas">
                <button className="hidden lg:flex flex-row h-[24px] px-0 gap-1 justify-start items-center hover:brightness-110 transition-all">
                  <div className="relative">
                    <div className="relative flex flex-row h-[20px] px-1 gap-1 justify-start items-center rounded-full opacity-30 w-[42px]" style={{ background: 'linear-gradient(to right, rgb(83, 211, 142) 0%, rgb(231, 140, 25) 50%, rgb(255, 70, 98) 100%)' }}></div>
                    <div className="absolute inset-0.5 bg-[#09090b] rounded-full flex gap-0.5 justify-center items-center">
                        <img alt="Pump" className="w-2.5 h-2.5" src="/images/pump.svg" /><img alt="Bonk" className="w-2.5 h-2.5" src="/images/bonk.svg" /><img alt="Curve" className="w-2.5 h-2.5" src="/images/virtual-curve.svg" />
                    </div>
                  </div>
                </button>
                <div className="hidden group-hover/gas:block fixed bottom-[40px] left-[470px] z-[200] pointer-events-auto"><MarketLighthouse /></div>
              </div>

            <div className="hidden lg:flex w-px h-5 bg-white/10 shrink-0"></div>

            <div className="flex gap-3 items-center">
               <TooltipWrapper text="Price of BTC in USD"><button className="text-[#F7931A] hidden 2xl:flex h-[24px] gap-1.5 items-center hover:brightness-110"><img alt="BTC" className="w-4 h-4" src="/images/btc.svg" /><span className="text-[12px] font-normal">$90.5K</span></button></TooltipWrapper>
               <TooltipWrapper text="Price of ETH in USD"><button className="text-[#497493] hidden 2xl:flex h-[24px] gap-1 items-center hover:brightness-110"><img alt="ETH" className="w-4 h-4" src="/images/eth.svg" /><span className="text-[12px] font-normal">$2987</span></button></TooltipWrapper>
               <TooltipWrapper text="Price of SOL in USD"><button className="text-[#14F195] hidden lg:flex h-[24px] gap-1.5 items-center hover:brightness-110"><img alt="SOL" className="w-3.5 h-3.5" src="/images/sol.svg" /><span className="text-[12px] font-normal">$135.31</span></button></TooltipWrapper>
            </div>
          </div>

          {/* Right Items */}
          <div className="flex flex-row shrink-0 gap-2 justify-end items-center">
            <div className="hidden 2xl:flex items-center gap-4">
               <TooltipWrapper text="Estimated Market Price"><span className="text-slate-500 text-[12px] font-medium hover:text-slate-400 cursor-help">$54.2M</span></TooltipWrapper>
               <div className="flex gap-1.5 h-[24px] items-center cursor-help"><img src="/images/pump.png" className="w-3.5 h-3.5 opacity-60" /><span className="text-slate-500 text-[12px] font-normal">0.0<sub>2</sub>41</span></div>
               <div className="flex gap-1.5 h-[24px] items-center cursor-help"><img src="/images/database.png" className="w-3.5 h-3.5 opacity-60" /><span className="text-slate-500 text-[12px] font-normal">0.0<sub>2</sub>92</span></div>
            </div>

            <div className="hidden 2xl:flex w-px h-5 bg-white/10 shrink-0"></div>

            
               <div className="flex h-[24px] xl:px-2 gap-1.5 items-center rounded-[4px] text-[#2ebd6f] xl:bg-[#2ebd6f]/10 border border-[#2ebd6f]/20 cursor-default">
                 <div className="flex items-center justify-center w-2 h-2"><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2ebd6f]"></span></div>
                 <span className="hidden xl:flex text-[11px] font-medium">Connection is stable</span>
               </div>
            

            {/* --- GLOBAL BUTTON (Ref Attached Here) --- */}
            
              <button 
                ref={globalBtnRef}
                onClick={toggleGlobal}
                className={`flex items-center gap-1 px-2 h-[24px] text-[11px] font-bold rounded transition-colors tracking-wide ${showGlobal ? 'bg-white/10 text-slate-200' : 'hover:bg-white/5 text-slate-400'}`}
              >
                <span>GLOBAL</span>
                <ChevronDown size={14} />
              </button>

            <div className="w-px h-5 bg-white/10 shrink-0"></div>

            <div className="text-slate-500 flex gap-1 items-center">
               <TooltipWrapper text="Hide Watchlist Ticker"><button className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] hover:bg-white/5 hover:text-slate-300"><img src="/images/parts.png" className="w-3.5 h-3.5 opacity-70" /></button></TooltipWrapper>
               <TooltipWrapper text="Notifications Settings"><button className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] hover:bg-white/5 hover:text-slate-300"><img src="/images/bell.png" className="w-3.5 h-3.5 opacity-70" /></button></TooltipWrapper>
               <TooltipWrapper text="Customize Theme"><button className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] hover:bg-white/5 hover:text-slate-300"><img src="/images/palette.png" className="w-3.5 h-3.5 opacity-70" /></button></TooltipWrapper>
            </div>

            <div className="hidden md:flex w-px h-5 bg-white/10 shrink-0"></div>

            <div className="hidden md:flex flex-row gap-3 items-center">
               <TooltipWrapper text="Join our Discord"><a href="#" className="hover:opacity-80 w-[20px] flex justify-center"><img src="/images/discord.png" className="w-3.5 h-3.5 opacity-60 hover:opacity-100" /></a></TooltipWrapper>
               <TooltipWrapper text="Follow us on X"><a href="#" className="hover:opacity-80 w-[20px] flex justify-center"><img src="/images/x.png" className="w-3.5 h-3.5 opacity-60 hover:opacity-100" /></a></TooltipWrapper>
            </div>

            
              <a href="#" className="hidden md:flex gap-1.5 h-[24px] px-2 items-center rounded-[4px] hover:bg-white/5 text-slate-400 transition-colors">
                <img src="/images/page.png" className="w-3.5 h-3.5 opacity-60" />
                <span className="hidden lg:flex text-[11px] font-normal">Docs</span>
              </a>
            

          </div>
        </div>
      </div>
    </>
  );
}