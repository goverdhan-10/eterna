"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Wallet, 
  ChevronRight,
  ChevronLeft,
  Globe
} from 'lucide-react';

// ==========================================
// 1. SVG ICONS (Extracted for Readability)
// ==========================================

const LogoIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 sm:w-9 sm:h-9 text-slate-100">
    <g clipPath="url(#clip0_88_28967)">
      <path d="M24.1384 17.3876H11.8623L18.0001 7.00012L24.1384 17.3876Z" fill="currentColor"></path>
      <path d="M31 29.0003L5 29.0003L9.96764 20.5933L26.0324 20.5933L31 29.0003Z" fill="currentColor"></path>
    </g>
    <defs>
      <clipPath id="clip0_88_28967">
        <rect width="26" height="22" fill="white" transform="translate(5 7)"></rect>
      </clipPath>
    </defs>
  </svg>
);

const WordmarkIcon = () => (
  <svg width="102" height="21" viewBox="0 0 103 19" fill="none" xmlns="http://www.w3.org/2000/svg" className=" hidden 2xl:block text-slate-100">
    <path d="M56.1914 18.3745V1.33447H59.7434L64.8074 15.3265L69.8714 1.33447H73.4234V18.3745H70.8314V5.89447L66.2474 18.3505H63.3674L58.7834 5.89447V18.3745H56.1914Z" fill="currentColor"></path>
    <path d="M45.9362 18.7584C40.9922 18.7584 37.9922 15.3984 37.9922 9.87844C37.9922 4.35844 40.9922 0.950439 45.9362 0.950439C50.9282 0.950439 53.9042 4.35844 53.9042 9.87844C53.9042 15.3984 50.9282 18.7584 45.9362 18.7584ZM45.9362 16.3824C49.2482 16.3824 51.2162 13.9824 51.2162 9.87844C51.2162 5.77444 49.2482 3.32644 45.9362 3.32644C42.6482 3.32644 40.6802 5.77444 40.6802 9.87844C40.6802 13.9824 42.6482 16.3824 45.9362 16.3824Z" fill="currentColor"></path>
    <path d="M33.1055 18.3745V1.33447H35.6975V18.3745H33.1055Z" fill="currentColor"></path>
    <path d="M16.9023 18.3745L22.5663 9.83047L16.9503 1.33447H19.9983L24.1983 7.81447L28.3263 1.33447H31.3503L25.7343 9.78247L31.4223 18.3745H28.3743L24.1503 11.7985L19.9263 18.3745H16.9023Z" fill="currentColor"></path>
    <path d="M0.980469 18.3745L7.12447 1.33447H10.4125L16.5565 18.3745H13.7965L12.2365 13.9345H5.27647L3.74047 18.3745H0.980469ZM6.09247 11.5825H11.4445L8.75647 3.80647L6.09247 11.5825Z" fill="currentColor"></path>
    <path d="M90.9961 18.4742V10.1494H91.8914L91.9385 11.7987C92.2684 10.6835 92.9438 10.1494 94.0276 10.1494H94.7501V11.1547H93.9962C92.7396 11.1547 92.0328 12.0186 92.0328 13.4008V18.4742H90.9961Z" fill="currentColor"></path>
    <path d="M81.2461 18.4741V7.32202H85.1572C87.6075 7.32202 89.0525 8.57859 89.0525 10.6519C89.0525 12.7253 87.6075 13.9818 85.1572 13.9818H82.3142V18.4741H81.2461ZM82.3142 12.9452H85.1572C86.9792 12.9452 87.9216 12.1441 87.9216 10.6519C87.9216 9.14405 86.9792 8.35869 85.1572 8.35869H82.3142V12.9452Z" fill="currentColor"></path>
  </svg>
);

const AccountIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#94A3B8] group-hover:text-slate-200 transition-colors">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const TranslateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#94A3B8] group-hover:text-slate-200 transition-colors">
    <path d="m5 8 6 6"></path>
    <path d="m4 14 6-6 2-3"></path>
    <path d="M2 5h12"></path>
    <path d="M7 2h1"></path>
    <path d="m22 22-5-10-5 10"></path>
    <path d="M14 18h6"></path>
  </svg>
);

const FeatureIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#94A3B8] group-hover:text-slate-200 transition-colors">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F43F5E] group-hover:text-[#FB7185] transition-colors">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" x2="9" y1="12" y2="12"></line>
  </svg>
);

// ==========================================
// 2. REUSABLE UI HELPERS
// ==========================================

const Tooltip = ({ children, text, width = "w-max" }: { children: React.ReactNode; text: string; width?: string }) => (
  <div className="relative flex items-center group z-10000">
    {children}
    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10001 pointer-events-none ${width}`}>
      <div className="bg-[#13161B] text-slate-200 text-xs font-medium py-2 px-3 rounded-sm shadow-2xl border border-[#2A2F3A] text-center leading-tight whitespace-nowrap">
        {text}
      </div>
      <div className="w-2 h-2 bg-[#13161B] border-r border-b border-[#2A2F3A] transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
    </div>
  </div>
);

const CircleIconButton = ({ icon, onClick, className = "" }: { icon: string; onClick?: () => void; className?: string }) => (
  <button 
    onClick={onClick}
    className={`bg-[#1C212B] hover:bg-[#2A2F3A] flex flex-row w-8 h-8 justify-center items-center rounded-full ${className}`}
  >
    <img src={icon} alt="icon" className="w-4.5 h-4.5" />
  </button>
);

// ==========================================
// 3. DROPDOWN COMPONENTS
// ==========================================

const NetworkDropdown = ({ isOpen }: { isOpen: boolean }) => (
  <div className={`absolute top-[calc(100%+4px)] left-0 z-9999 min-w-40 bg-[#0B0E11] border border-[#1C212B] rounded-sm shadow-xl transition-all duration-200 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
    <div className="p-1 flex flex-col gap-1">
      <button type="button" className="relative w-full px-3 h-10 text-left text-sm bg-[#1C212B]/40 hover:bg-[#1C212B]/80 text-slate-100 rounded-sm transition-all duration-150 active:scale-95">          <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img alt="Solana" width="18" height="18" src="/images/sol.svg" className="shrink-0" />
            <span className="text-sm font-medium truncate">Solana</span>
          </div>
        </div>
      </button>
      <button type="button" className="relative w-full px-3 h-10 text-left text-sm hover:bg-[#1C212B]/80 text-slate-400 hover:text-slate-100 rounded-sm transition-all duration-150 active:scale-95">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img alt="BNB" width="18" height="18" src="/images/bnb.svg" className="shrink-0" />
            <span className="text-sm font-medium truncate">BNB</span>
          </div>
        </div>
      </button>
    </div>
  </div>
);

const WalletDropdown = ({ isOpen }: { isOpen: boolean }) => (
  <div className={`
    absolute top-[calc(100%+12px)] right-0 z-9999 w-64 
    bg-[#0B0E11] border border-[#1C212B] rounded-sm shadow-2xl 
    flex flex-col transition-all duration-200 origin-top-right overflow-visible
    ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}
  `}>
    <div className="border-b border-[#1C212B] flex flex-col p-4 gap-1 items-start w-full">
      <div className="flex flex-row w-full h-6 gap-1 justify-between items-center">
        <div className="flex flex-row gap-1 items-center flex-1">
          <Tooltip text="Combined value of Solana, Perpetuals, and Yield accounts" width="w-44">
            <span className="text-[#94A3B8] text-xs leading-4 font-normal tracking-tighter border-b border-dashed border-[#94A3B8]/20 hover:border-slate-100 hover:text-slate-100 transition-colors cursor-help">
              Total Value
            </span>
          </Tooltip>
        </div>
        <div className="flex items-center gap-1">
          <Tooltip text="Copy Primary SOL address">
            <button className="flex flex-row gap-1 px-1 h-6 items-center rounded-sm hover:bg-[#1C212B]/60 transition-colors hover:[&>img]:opacity-100 hover:[&>span]:text-slate-200">
              <img src="/images/copy.png" alt="copy" className="w-3 h-3 opacity-60 transition-opacity" />
              <span className="text-[#94A3B8] text-xs leading-4 font-normal transition-colors">Solana</span>
            </button>
          </Tooltip>
          <Tooltip text="Copy Perps address">
            <button className="flex flex-row gap-1 px-1 h-6 items-center rounded-sm hover:bg-[#1C212B]/60 transition-colors hover:[&>img]:opacity-100 hover:[&>span]:text-slate-200">
              <img src="/images/copy.png" alt="copy" className="w-3 h-3 opacity-60 transition-opacity" />
              <span className="text-[#94A3B8] text-xs leading-4 font-normal transition-colors">Perps</span>
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-row items-center gap-1">
        <span className="text-slate-100 text-lg leading-6 font-normal">$0</span>
      </div>
    </div>
    <div className="border-b border-[#1C212B]/50 h-12 flex flex-row justify-between items-center hover:bg-[#1C212B]/40 cursor-pointer px-4 [&:hover>div>img[alt='Exchange']]:opacity-100">
      <Tooltip text="Primary SOL wallet Balance">
        <div className="flex flex-row gap-1 h-6 items-center">
          <img src="/images/sol.svg" width={18} height={18} alt="SOL" />
          <span className="text-slate-100 text-base leading-5 font-medium">0</span>
        </div>
      </Tooltip>
      <div className="flex flex-row gap-1 h-6 justify-center items-center">
        <img src="/images/exchange.png" width={16} height={16} alt="Exchange" className="opacity-60 transition-opacity" />
      </div>
      <div className="flex flex-row gap-1 h-6 justify-center items-center">
        <img src="/images/usdc.svg" width={20} height={20} alt="USDC" />
        <span className="text-slate-100 text-base leading-5 font-medium">0</span>
      </div>
    </div>
    <div className="flex flex-row p-4 pb-5 gap-4 justify-start items-center">
      <button className="bg-[#3B82F6] flex-1 h-7 px-3 flex flex-row justify-center items-center rounded-full hover:bg-[#2563EB] transition-colors shadow-lg shadow-blue-900/20">
        <span className="text-[#0B0E11] text-xs leading-4 font-bold">Deposit</span>
      </button>
      <button className="bg-[#1C212B] flex-1 h-7 px-3 flex flex-row justify-center items-center rounded-full hover:bg-[#2A2F3A] transition-colors">
        <span className="text-slate-100 text-xs leading-4 font-bold">Withdraw</span>
      </button>
    </div>
  </div>
);

const SettingsDropdown = ({ isOpen }: { isOpen: boolean }) => (
  <div className={`
    absolute top-[calc(100%+12px)] right-0 z-9999 w-60
    bg-[#0B0E11] border border-[#1C212B] rounded-sm shadow-2xl 
    flex flex-col transition-all duration-200 origin-top-right overflow-hidden py-2
    ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}
  `}>
    <button className="flex flex-row items-center gap-3 px-4 py-3 hover:bg-[#666d83] transition-colors group w-full text-left">
      <AccountIcon />
      <span className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">Account and Security</span>
    </button>

    <button className="flex flex-row items-center gap-3 px-4 py-3 hover:bg-[#666d83] transition-colors group w-full text-left">
      <TranslateIcon />
      <span className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">Auto Translate</span>
    </button>

    <button className="flex flex-row items-center gap-3 px-4 py-3 hover:bg-[#666d83] transition-colors group w-full text-left">
      <FeatureIcon />
      <span className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">Feature Updates</span>
    </button>

    <button className="flex flex-row items-center gap-3 px-4 py-3 hover:bg-[#666d83] transition-colors group w-full text-left mt-1">
      <LogoutIcon />
      <span className="text-[#F43F5E] text-sm font-medium group-hover:text-[#FB7185] transition-colors">Log Out</span>
    </button>
  </div>
);

// ==========================================
// 4. MAIN COMPONENT
// ==========================================

export default function Topbar() {
  const [active, setActive] = useState("Pulse");
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const walletDropdownRef = useRef<HTMLDivElement>(null);
  const settingsDropdownRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({ 
        left: direction === "left" ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNetworkDropdownOpen(false);
      }
      if (walletDropdownRef.current && !walletDropdownRef.current.contains(event.target as Node)) {
        setIsWalletDropdownOpen(false);
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target as Node)) {
        setIsSettingsDropdownOpen(false);
      }
    };

    if (isNetworkDropdownOpen || isWalletDropdownOpen || isSettingsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isNetworkDropdownOpen, isWalletDropdownOpen, isSettingsDropdownOpen]);

  const navItems = [
    "Discover", "Pulse", "Trackers", "Perpetuals", "Yield", "Vision", "Portfolio", "Rewards"
  ];

  return (
    <>
      {/* Clickable Backdrop */}
      {(isNetworkDropdownOpen || isWalletDropdownOpen || isSettingsDropdownOpen) && (
        <div 
          className="fixed inset-0 z-9998"
          onClick={() => {
            setIsNetworkDropdownOpen(false);
            setIsWalletDropdownOpen(false);
            setIsSettingsDropdownOpen(false);
          }}
        />
      )}
      
      {/* FIX APPLIED HERE: Changed z-50 to z-[60] so it sits above PageContent (z-50) */}
      <div className="border-b border-[#1C212B] z-60 relative flex flex-row w-full h-[52px] sm:h-16 min-h-12 sm:min-h-16 px-4 sm:px-4 lg:px-6 gap-4 sm:gap-4 lg:gap-6 justify-between sm:justify-start items-center bg-[#0B0E11]">
      
        {/* --- LOGO --- */}
        <div className="flex flex-row flex-0 gap-0 justify-start items-center w-auto min-w-max">
          <a href="/?chain=sol">
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center">
                <LogoIcon />
                <WordmarkIcon />
              </div>
            </div>
          </a>
        </div>

        {/* --- NAV ITEMS (Scrollable) --- */}
        <div className="relative hidden sm:flex flex-1 min-w-0 ml-4 group h-full items-center">
          <div className="absolute left-0 top-0 bottom-0 z-40 flex items-center bg-linear-to-r from-[#0B0E11] via-[#0B0E11] to-transparent pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button onClick={() => handleScroll('left')} className="pointer-events-auto h-full px-1 hover:text-white text-[#94A3B8] transition-colors flex items-center">
              <ChevronLeft size={20} className="mb-0.5" />
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 z-40 flex items-center bg-linear-to-l from-[#0B0E11] via-[#0B0E11] to-transparent pl-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button onClick={() => handleScroll('right')} className="pointer-events-auto h-full px-1 hover:text-white text-[#94A3B8] transition-colors flex items-center">
              <ChevronRight size={20} className="mb-0.5" />
            </button>
          </div>

          <div className="flex overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" ref={scrollContainerRef}>
            <div className="flex flex-row gap-0.5 justify-start items-center">
              {navItems.map((item) => (
                <a key={item} href="/?chain=sol">
                  <button 
                    onClick={() => setActive(item)}
                    className={`
                      flex flex-row h-8 text-nowrap px-2 xl:px-3.5 
                      justify-start items-center [transition:none] duration-0 
                      hover:bg-[#3B82F6]/20 hover:text-[#3B82F6] hover:[transition:background-color_135ms_ease-in-out,color_135ms_ease-in-out] rounded-sm 
                      ${active === item ? "text-[#3B82F6]" : "text-slate-100"}
                    `}>
                    <span className="text-sm font-medium">{item}</span>
                  </button>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- SEARCH BAR --- */}
        <button className="hidden sm:flex shrink-0 whitespace-nowrap border-[#1C212B] font-normal border flex-row h-8 sm:px-2 md:px-2 lg:px-2 2xl:pl-3 2xl:pr-1.5 gap-2 justify-center items-center rounded-full hover:bg-[#1C212B]/35 transition-colors duration-125 cursor-pointer">
          <img src="/images/search.png" alt="Search" className="w-4.5 h-4.5" />
          <span className="text-xs text-[#94A3B8] font-medium hidden 2xl:block">Search by token or CA...</span>
          <div className="hidden 2xl:flex border-[#1C212B] border text-xs h-5 flex-row px-2 gap-2 justify-center items-center rounded-full">
            <span className="text-slate-100">/</span>
          </div>
        </button>

        {/* --- SOL DROPDOWN (Desktop) --- */}
        <div className="hidden sm:block">
          <div className="relative flex" ref={dropdownRef}>
            <div className="w-full">
              <button onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)} className="hover:brightness-125 border-2 flex shrink-0 flex-row h-8 pl-2 pr-1.5 gap-1.5 justify-center items-center rounded-full transition-all duration-150 ease-in-out active:scale-95" style={{ borderColor: 'rgba(20, 241, 149, 0.1)' }}>
                <img alt="Solana" loading="lazy" width="16" height="16" src="/images/sol.svg" className="w-4 h-4" />
                <span className="text-sm text-slate-100 font-medium">SOL</span>
                <ChevronDown className="text-slate-100" size={18} />
              </button>
            </div>
            <NetworkDropdown isOpen={isNetworkDropdownOpen} />
          </div>
        </div>

        {/* --- RIGHT ACTIONS --- */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="hidden sm:flex bg-[#3B82F6] h-8 px-3 flex-row justify-start items-center rounded-full hover:bg-[#2563EB]">
            <span className="text-nowrap text-[#0F141C] text-sm font-bold">Deposit</span>
          </button>

          {/* Mobile Icons */}
          <div className="flex sm:hidden items-center gap-2">
            <div className="relative flex" ref={dropdownRef}>
               <div className="w-full">
                  <button onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)} className="hover:brightness-125 border-2 flex shrink-0 flex-row h-8 pl-2 pr-1.5 gap-1.5 justify-center items-center rounded-full transition-all duration-150 ease-in-out active:scale-95" style={{ borderColor: 'rgba(20, 241, 149, 0.1)' }}>
                    <img alt="Solana" loading="lazy" width="16" height="16" src="/images/sol.svg" className="w-4 h-4" />
                    <span className="text-sm text-slate-100 font-medium">SOL</span>
                    <ChevronDown className="text-slate-100" size={18} />
                  </button>
               </div>
               <NetworkDropdown isOpen={isNetworkDropdownOpen} />
            </div>
            
            <div className="relative flex">
              <button className="bg-[#1C212B] hover:bg-[#2A2F3A] flex flex-row h-8 px-2 gap-1 justify-center items-center rounded-full">
                  <Globe className="text-slate-100" size={16} />
                  <span className="text-xs text-nowrap font-medium text-slate-100">GLOBAL</span>
                  <ChevronDown className="text-slate-100" size={16} />
              </button>
            </div>
            <div className="relative flex"><CircleIconButton icon="/images/bell.png" className="px-1.25 gap-2 w-8 h-8" /></div>
            <div className="relative flex"><CircleIconButton icon="/images/wal2.png" className="px-2.5 gap-2 w-8 h-8" /></div>
            <div className="relative flex"><CircleIconButton icon="/images/profile.png" className="px-2.5 gap-2 w-8 h-8" /></div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-4">
            <CircleIconButton icon="/images/star.png" className="px-1.25 gap-2 w-8 h-8" />

            <div className="relative flex">
              <div className="w-full">
                <CircleIconButton icon="/images/bell.png" className="px-1.25 gap-2 w-8 h-8" />
              </div>
            </div>

            <div className="relative flex" ref={walletDropdownRef}>
              <div className="w-full">
                <div className="shrink-0">
                  <button onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)} className="w-fit min-w-max bg-[#1C212B] flex flex-row h-8 px-3 py-2 gap-2 justify-center items-center rounded-full hover:bg-opacity-80 transition-colors hover:bg-[#2A2F3A]">
                    <Wallet className="text-slate-100" size={18} />
                    <div className="hidden xl:flex shrink-0 whitespace-nowrap flex-row gap-1 justify-start items-center">
                      <img alt="SOL" loading="lazy" width="16" height="16" src="/images/sol.svg" className="w-4 h-4" />
                      <span className="text-sm font-semibold text-slate-100">0</span>
                    </div>
                    <div className="hidden xl:block shrink-0 w-0.5 h-full bg-[#2A2F3A]"></div>
                    <div className="hidden xl:flex shrink-0 whitespace-nowrap flex-row gap-1 justify-start items-center">
                      <img alt="USDC" loading="lazy" width="18" height="18" src="/images/usdc.svg" />
                      <span className="text-sm font-semibold text-slate-100">0</span>
                    </div>
                    <ChevronDown className="text-slate-100" size={18} />
                  </button>
                </div>
              </div>
              <WalletDropdown isOpen={isWalletDropdownOpen} />
            </div>

            {/* Settings/Profile Dropdown Trigger */}
            <div className="relative flex" ref={settingsDropdownRef}>
              <div className="w-full">
                <CircleIconButton 
                  icon="/images/profile.png" 
                  onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)} 
                  className="px-1.25 gap-2 w-8 h-8" 
                />
              </div>
              <SettingsDropdown isOpen={isSettingsDropdownOpen} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}