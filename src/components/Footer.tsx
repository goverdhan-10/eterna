"use client";
import React, { useRef } from 'react';
import { 
  ChevronDown, 
  ListFilter,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import MarketLighthouse from './Lighthouse';

// --- Reusable Tooltip Component ---
const TooltipWrapper = ({ children, text }: { children: React.ReactNode; text: string }) => (
  <div className="group/tooltip relative flex items-center">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block z-[70] pointer-events-none">
      <div className="bg-black text-slate-200 text-[10px] font-medium py-1 px-2 rounded-[4px] whitespace-nowrap shadow-xl border border-white/10 tracking-wide">
        {text}
      </div>
      <div className="w-2 h-2 bg-black border-r border-b border-white/10 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
    </div>
  </div>
);

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
    <div className="group relative h-[36px] bg-[#09090b] border-t border-white/10 w-full font-sans text-[#94a3b8] overflow-hidden select-none">
      
      {/* --- Scroll Navigation Arrows (TopBar Logic) --- */}
      
      {/* Left Arrow Gradient */}
      <div className="absolute left-0 top-0 bottom-0 z-[60] flex items-center bg-gradient-to-r from-[#09090b] via-[#09090b] to-transparent pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button onClick={() => handleScroll('left')} className="pointer-events-auto h-full px-1 hover:text-white text-[#94A3B8] transition-colors flex items-center">
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Right Arrow Gradient */}
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
          
          {/* 1. PRESET 1 */}
          <TooltipWrapper text="Current Preset">
            <button className="text-[#3b82f6] bg-[#3b82f6]/20 flex flex-row h-[24px] px-2 gap-1 justify-start items-center rounded-[4px] hover:bg-[#3b82f6]/25 transition-colors duration-150 ease-in-out cursor-pointer">
              <ListFilter size={16} />
              <span className="text-[12px] font-semibold">PRESET 1</span>
            </button>
          </TooltipWrapper>

          {/* 2. Wallet Widget */}
          <TooltipWrapper text="Wallet 1">
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

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 shrink-0"></div>

          {/* 3. Settings */}
          <TooltipWrapper text="Settings">
            <button className="-mr-1 min-w-[24px] min-h-[24px] flex items-center justify-center text-slate-500 hover:text-slate-400 hover:bg-white/5 transition-colors rounded-[4px]">
              <Settings size={14} />
            </button>
          </TooltipWrapper>

          {/* 4. Navigation Links with Notification Dots */}
          {[
            { label: 'Wallet', icon: 'wallet.png', hasDot: true },
            { label: 'Twitter', icon: 'x.png', hasDot: true },
            { label: 'Discover', icon: 'compass.png', hasDot: true },
            { label: 'Pulse', icon: 'pulse.png', hasDot: true },
            { label: 'PnL', icon: 'bar.png', hasDot: false },
          ].map((item) => (
            <TooltipWrapper key={item.label} text={item.label}>
              <button className="group relative flex flex-row gap-1.5 h-[24px] px-1.5 justify-start items-center rounded-[4px] cursor-pointer hover:bg-white/5 transition-colors">
                {item.hasDot && (
                  <div className="border-[1px] border-[#09090b] absolute top-0 right-0 w-[6px] h-[6px] bg-pink-500 rounded-full"></div>
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

          {/* Divider (Hidden on Mobile) */}
          <div className="hidden lg:flex w-px h-5 bg-white/10 shrink-0"></div>

          {/* 5. Gradient Gas Widget */}
          <TooltipWrapper text="Gas Priority">
            <div className="relative group/gas">
              <button className="hidden lg:flex flex-row h-[24px] px-0 gap-1 justify-start items-center hover:brightness-110 transition-all">
                <div className="relative">
                  {/* Gradient Background */}
                  <div className="relative flex flex-row h-[20px] px-1 gap-1 justify-start items-center rounded-full opacity-30 w-[42px]" 
                       style={{ background: 'linear-gradient(to right, rgb(83, 211, 142) 0%, rgb(231, 140, 25) 50%, rgb(255, 70, 98) 100%)' }}>
                  </div>
                  {/* Icons Overlay */}
                  <div className="absolute inset-0.5 bg-[#09090b] rounded-full flex gap-0.5 justify-center items-center">
                      <img alt="Pump" className="w-2.5 h-2.5" src="/images/pump.svg" />
                      <img alt="Bonk" className="w-2.5 h-2.5" src="/images/bonk.svg" />
                      <img alt="Curve" className="w-2.5 h-2.5" src="/images/virtual-curve.svg" />
                  </div>
                </div>
              </button>

              {/* Hover Popup - Fixed positioning above footer */}
              <div className="hidden group-hover/gas:block fixed bottom-[40px] left-[470px] z-[200] pointer-events-auto">
                <MarketLighthouse />
            </div>
            </div>
          </TooltipWrapper>

          <div className="hidden lg:flex w-px h-5 bg-white/10 shrink-0"></div>

          {/* 6. Tickers */}
          <div className="flex flex-1 flex-row gap-3 justify-start items-center">
             {/* BTC */}
             <TooltipWrapper text="Bitcoin">
               <button className="text-[#F7931A] hidden 2xl:flex flex-row shrink-0 h-[24px] px-0 gap-1.5 justify-start items-center hover:brightness-110 transition-all">
                 <img alt="BTC" className="w-4 h-4" src="/images/btc.svg" />
                 <span className="text-[12px] font-normal">$90.5K</span>
               </button>
             </TooltipWrapper>

             {/* ETH */}
             <TooltipWrapper text="Ethereum">
               <button className="text-[#497493] hidden 2xl:flex flex-row shrink-0 h-[24px] px-0 gap-1 justify-start items-center hover:brightness-110 transition-all">
                 <img alt="ETH" className="w-4 h-4" src="/images/eth.svg" />
                 <span className="text-[12px] font-normal">$2987</span>
               </button>
             </TooltipWrapper>

             {/* SOL */}
             <TooltipWrapper text="Solana">
               <button className="text-[#14F195] hidden lg:flex flex-row shrink-0 h-[24px] px-0 gap-1.5 justify-start items-center hover:brightness-110 transition-all">
                 <img alt="SOL" className="w-3.5 h-3.5" src="/images/sol.svg" />
                 <span className="text-[12px] font-normal">$135.31</span>
               </button>
             </TooltipWrapper>
          </div>

        </div>

        {/* ================= RIGHT GROUP ================= */}
        <div className="flex flex-row shrink-0 gap-2 justify-end items-center">
          
          {/* 7. Stats (Hidden on small screens) */}
          <div className="hidden 2xl:flex items-center gap-4">
             <TooltipWrapper text="Total Volume">
               <span className="text-slate-500 text-[12px] font-medium hover:text-slate-400 transition-colors cursor-help">$55.6K</span>
             </TooltipWrapper>

             <TooltipWrapper text="Gas Price">
               <div className="flex flex-row gap-1.5 h-[24px] min-h-[24px] justify-start items-center cursor-help">
                 <img src="/images/pump.png" alt="Gas" className="w-3.5 h-3.5 opacity-60" />
                 <span className="text-slate-500 text-[12px] font-normal">0.0<sub>2</sub>41</span>
               </div>
             </TooltipWrapper>

             <TooltipWrapper text="Block Time">
               <div className="flex flex-row gap-1.5 h-[24px] min-h-[24px] justify-start items-center cursor-help">
                 <img src="/images/database.png" alt="DB" className="w-3.5 h-3.5 opacity-60" />
                 <span className="text-slate-500 text-[12px] font-normal">0.0<sub>2</sub>92</span>
               </div>
             </TooltipWrapper>
          </div>

          <div className="hidden 2xl:flex w-px h-5 bg-white/10 shrink-0"></div>

          {/* 8. Connection Status */}
          <TooltipWrapper text="Network Status">
             <div className="flex flex-row h-[24px] xl:px-2 gap-1.5 justify-start items-center rounded-[4px] text-[#2ebd6f] xl:bg-[#2ebd6f]/10 cursor-default border border-[#2ebd6f]/20">
               <div className="relative flex items-center justify-center w-2 h-2">
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2ebd6f]"></span>
               </div>
               <span className="hidden xl:flex text-[11px] font-medium">Connection is stable</span>
             </div>
          </TooltipWrapper>

          {/* 9. Global Selector */}
          <TooltipWrapper text="Region">
            <button className="flex items-center gap-1 px-2 h-[24px] text-[11px] font-bold rounded hover:bg-white/5 text-slate-400 transition-colors tracking-wide">
              <span>GLOBAL</span>
              <ChevronDown size={14} />
            </button>
          </TooltipWrapper>

          <div className="w-px h-5 bg-white/10 shrink-0"></div>

          {/* 10. Layout Tools */}
          <div className="text-slate-500 flex flex-row gap-1 justify-start items-center">
             <TooltipWrapper text="Edit Layout">
               <button className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] transition-colors hover:bg-white/5 hover:text-slate-300">
                 <img src="/images/parts.png" className="w-3.5 h-3.5 opacity-70" alt="Layout" />
               </button>
             </TooltipWrapper>
             <TooltipWrapper text="Notifications">
               <button className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] transition-colors hover:bg-white/5 hover:text-slate-300">
                 <img src="/images/bell.png" className="w-3.5 h-3.5 opacity-70" alt="Notifications" />
               </button>
             </TooltipWrapper>
             <TooltipWrapper text="Theme">
               <button className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] transition-colors hover:bg-white/5 hover:text-slate-300">
                 <img src="/images/palette.png" className="w-3.5 h-3.5 opacity-70" alt="Theme" />
               </button>
             </TooltipWrapper>
          </div>

          <div className="hidden md:flex w-px h-5 bg-white/10 shrink-0"></div>

          {/* 11. Socials & Docs */}
          <div className="hidden md:flex flex-row gap-3 justify-start items-center">
             <TooltipWrapper text="Discord">
               <a href="#" className="hover:opacity-80 transition-opacity flex items-center justify-center w-[20px]">
                 <img src="/images/discord.png" className="w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-opacity" alt="Discord" />
               </a>
             </TooltipWrapper>
             <TooltipWrapper text="Twitter">
               <a href="#" className="hover:opacity-80 transition-opacity flex items-center justify-center w-[20px]">
                 <img src="/images/x.png" className="w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-opacity" alt="X" />
               </a>
             </TooltipWrapper>
          </div>

          <TooltipWrapper text="Documentation">
            <a href="#" className="hidden md:flex flex-row gap-1.5 h-[24px] px-2 justify-start items-center rounded-[4px] hover:bg-white/5 text-slate-400 transition-colors">
              <img src="/images/page.png" className="w-3.5 h-3.5 opacity-60" alt="Docs" />
              <span className="hidden lg:flex text-[11px] font-normal">Docs</span>
            </a>
          </TooltipWrapper>

        </div>

      </div>
    </div>
  );
}