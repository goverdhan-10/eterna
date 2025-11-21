import React, { useState } from "react";
import { X, RotateCcw, ChevronDown } from "lucide-react";

// --- Data & Configuration ---

const protocols = [
  { name: "Pump", icon: "pump", key: "pump" },
  { name: "Mayhem", icon: "mayhem", key: "mayhem" },
  { name: "Bonk", icon: "bonk", key: "bonk" },
  { name: "Bags", icon: "bags", key: "bags" },
  { name: "Moonshot", icon: "moonshot-new", key: "moonshot" },
  { name: "Heaven", icon: "heaven", key: "heaven" },
  { name: "Daos.fun", icon: "daosfun", key: "daos" },
  { name: "Candle", icon: "candle", key: "candle" },
  { name: "Sugar", icon: "sugar", key: "sugar" },
  { name: "Believe", icon: "launch-a-coin", key: "believe" },
  { name: "Jupiter Studio", icon: "jupstudio", key: "jupiter" },
  { name: "Moonit", icon: "moonit", key: "moonit" },
  { name: "Boop", icon: "boop", key: "boop" },
  { name: "LaunchLab", icon: "launchlab", key: "launchlab" },
  { name: "Dynamic BC", icon: "virtual-curve", key: "dynamic" },
];

// Color map to replicate the specific colored borders/bg per protocol
const protocolColors: Record<string, string> = {
  pump: "#22C55E",    // Green
  mayhem: "#EF4444",  // Red
  bonk: "#F97316",    // Orange
  bags: "#84CC16",    // Lime
  moonshot: "#A855F7",// Purple
  heaven: "#E5E7EB",  // Gray/White
  daos: "#3B82F6",    // Blue
  candle: "#F59E0B",  // Amber
  sugar: "#EC4899",   // Pink
  believe: "#10B981", // Emerald
  jupiter: "#F59E0B", // Orange
  moonit: "#EAB308",  // Yellow
  boop: "#6366F1",    // Indigo
  launchlab: "#06B6D4", // Cyan
  dynamic: "#DC2626", // Red
};

const quoteTokens = [
  { name: "SOL", icon: "sol.svg", color: "#14F195" },
  { name: "USDC", icon: "usdc.svg", color: "#2775CA" },
  { name: "USD1", icon: "usd1.svg", color: "#FFFFFF" }, // Fallback color
];

const auditFields = [
  { label: "Age", hasUnit: true, unit: "m" },
  { label: "Top 10 Holders %", hasUnit: false },
  { label: "Dev Holding %", hasUnit: false },
  { label: "Snipers %", hasUnit: false },
  { label: "Insiders %", hasUnit: false },
  { label: "Bundle %", hasUnit: false },
  { label: "Holders", hasUnit: false },
  { label: "Pro Traders", hasUnit: false },
  { label: "Dev Migrations", hasUnit: false },
  { label: "Dev Pairs Created", hasUnit: false },
];

export default function Filter({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("Final Stretch");
  const [subTab, setSubTab] = useState("Audit");
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>(["Pump"]);
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>(["SOL"]);

  const toggleProtocol = (key: string) => {
    setSelectedProtocols(prev => 
      prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
    );
  };

  const toggleQuote = (name: string) => {
    setSelectedQuotes(prev => 
      prev.includes(name) ? prev.filter(q => q !== name) : [...prev, name]
    );
  };

  return (
    <div className="fixed inset-0 z-[90] flex justify-center items-center p-4">
      {/* Backdrop (Invisible to match exact style request, or standard dim) */}
      {/* <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} /> */}

      {/* Main Modal Container */}
      <div 
        className="bg-[#101114] relative w-[452px] h-[calc(100vh-72px)] max-h-[880px] rounded-[4px] shadow-[0_4px_4px_0_rgba(0,0,0,0.30),0_8px_8px_0_rgba(0,0,0,0.45)] border border-[#2A2F3A] flex flex-col overflow-hidden"
        style={{ transform: 'translateY(4px)' }}
      >
        
        {/* --- Header --- */}
        <div className="flex flex-row w-full min-h-[44px] h-[44px] pl-[16px] pr-[12px] justify-between items-center border-b border-transparent">
          <span className="text-[#F2F4F7] text-[14px] leading-[20px] tracking-[-0.02em] font-medium">Filters</span>
          <button 
            type="button" 
            onClick={onClose}
            className="group flex flex-row p-[4px] w-[24px] h-[24px] justify-center items-center hover:bg-[#2A2F3A]/20 rounded-[4px] transition-colors duration-150 ease-in-out"
          >
            <X className="text-[#98A2B3] w-4 h-4 group-hover:text-[#F2F4F7]" />
          </button>
        </div>

        {/* --- Main Tabs --- */}
        <div className="flex flex-row flex-1 pl-[8px] pr-[12px] min-h-[36px] max-h-[36px] border-b border-[#2A2F3A] justify-between items-center">
          <div className="flex flex-row gap-[16px] justify-start items-center">
            {['New Pairs', 'Final Stretch', 'Migrated'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  group relative text-nowrap flex flex-row px-[8px] gap-[4px] justify-start items-center 
                  rounded-[4px] h-[28px] transition-colors
                  ${activeTab === tab ? '' : 'hover:bg-[#2A2F3A]/40'}
                `}
              >
                {activeTab === tab ? (
                  <div className="border-[#F2F4F7] border-b-[2px] pt-[2px] flex flex-row flex-1 h-[36px] gap-[4px] justify-start items-center">
                    <span className="text-[#F2F4F7] text-[14px] font-medium">{tab}</span>
                  </div>
                ) : (
                  <div className="flex flex-row flex-1 h-[36px] gap-[4px] justify-start items-center">
                    <span className="text-[#98A2B3] text-[14px] font-medium">{tab}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="hidden sm:flex flex-row gap-[16px] justify-end items-center">
            <button className="group flex flex-row p-[6px] h-[24px] w-[24px] gap-[4px] justify-center items-center hover:bg-[#2A2F3A]/60 transition-all duration-150 ease-in-out cursor-pointer rounded-[4px]">
              <RotateCcw className="text-[16px] text-[#98A2B3] w-4 h-4" />
            </button>
          </div>
        </div>

        {/* --- Scrollable Content --- */}
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-hide">
          
          {/* Protocols Section */}
          <div className="flex flex-col gap-[16px] p-[16px] border-b border-[#2A2F3A]/50">
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-row h-[24px] min-h-[24px] justify-between items-center">
                <span className="text-[#98A2B3] text-[12px] leading-[16px] font-normal">Protocols</span>
                <button 
                  type="button" 
                  onClick={() => setSelectedProtocols([])}
                  className="group text-[#F2F4F7] flex flex-row gap-[4px] text-[12px] leading-[16px] font-medium justify-start items-center rounded-full px-[7px] h-[24px] transition-colors duration-125 ease-in-out border-[#2A2F3A] border-[1px] bg-[#2A2F3A]/60 hover:bg-[#2A2F3A]/90"
                >
                  Unselect All
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-[12px]">
                {protocols.map((p) => {
                  const isSelected = selectedProtocols.includes(p.key);
                  const color = protocolColors[p.key] || '#98A2B3';
                  
                  return (
                    <div key={p.key} className="flex flex-row flex-1 gap-[4px] justify-start items-center">
                      <button 
                        onClick={() => toggleProtocol(p.key)}
                        className="group flex flex-row gap-[4px] justify-start items-center flex-shrink-0 min-w-min max-w-none overflow-visible"
                      >
                        <div 
                          className={`
                            relative border-[1px] flex flex-row h-[24px] pl-[5px] pr-[7px] gap-[3px] justify-start items-center rounded-full cursor-pointer transition-all duration-125 ease-in-out
                          `}
                          style={{
                            borderColor: isSelected ? `${color}59` : '#2A2F3A', // 35% opacity vs dark border
                            backgroundColor: isSelected ? `${color}1A` : 'transparent', // 10% opacity
                          }}
                        >
                          <img 
                            src={`/images/${p.icon}.svg`} 
                            alt={p.name} 
                            className="z-30 w-[14px] h-[14px]" 
                          />
                          <span 
                            className="text-[13px] font-medium z-30 text-nowrap transition-colors"
                            style={{ color: isSelected ? color : '#98A2B3' }}
                          >
                            {p.name}
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quote Tokens Section */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-row h-[24px] min-h-[24px] justify-between items-center">
                <span className="text-[#98A2B3] text-[12px] leading-[16px] font-normal">Quote Tokens</span>
                <button 
                  type="button" 
                  onClick={() => setSelectedQuotes([])}
                  className="group text-[#F2F4F7] flex flex-row gap-[4px] text-[12px] leading-[16px] font-medium justify-start items-center rounded-full px-[7px] h-[24px] transition-colors duration-125 ease-in-out border-[#2A2F3A] border-[1px] bg-[#2A2F3A]/60 hover:bg-[#2A2F3A]/90"
                >
                  Unselect All
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-[12px]">
                {quoteTokens.map((q) => {
                  const isSelected = selectedQuotes.includes(q.name);
                  return (
                    <div key={q.name} className="flex flex-row flex-1 gap-[4px] justify-start items-center">
                      <button 
                        onClick={() => toggleQuote(q.name)}
                        className="group flex flex-row gap-[4px] justify-start items-center flex-shrink-0 min-w-min max-w-none overflow-visible"
                      >
                        <div 
                          className="flex flex-row gap-[2px] h-[24px] pl-[4px] pr-[7px] justify-center items-center rounded-full cursor-pointer border-[1px] transition-colors duration-125 ease-in-out"
                          style={{
                            borderColor: isSelected ? `${q.color}59` : '#2A2F3A',
                            backgroundColor: isSelected ? `${q.color}0D` : 'transparent',
                            color: isSelected ? q.color : '#98A2B3'
                          }}
                        >
                          {q.name === 'SOL' ? (
                             <img src={`/images/sol.svg`} alt={q.name} className="w-4 h-4" />
                          ) : (
                             <img src={`/images/${q.icon}`} alt={q.name} className="w-4 h-4" />
                          )}
                          <span className="font-medium tracking-[-0.02em] text-[13px]">{q.name}</span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Search Inputs */}
          <div className="flex flex-col gap-[16px] p-[16px] border-b border-[#2A2F3A]/50">
            <div className="flex flex-row gap-[16px]">
              <div className="flex flex-col gap-[12px] flex-1">
                <span className="text-[#98A2B3] text-[12px] leading-[16px] font-normal">Search Keywords</span>
                <div className="relative flex w-full">
                  <input 
                    placeholder="keyword1, keyword2..." 
                    className="text-[#F2F4F7] placeholder:text-[#475467] text-[12px] leading-[16px] font-normal flex flex-row w-full h-[32px] px-[8px] pr-[8px] gap-[4px] justify-start items-center rounded-[4px] outline-none transition-colors duration-150 ease-in-out bg-transparent border border-[#2A2F3A] hover:border-[#F2F4F7]/10 focus:border-[#F2F4F7]/10 hover:bg-[#2A2F3A]/10 focus:bg-[#2A2F3A]/10 text-left"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[12px] flex-1">
                <span className="text-[#98A2B3] text-[12px] leading-[16px] font-normal">Exclude Keywords</span>
                <div className="relative flex w-full">
                  <input 
                    placeholder="keyword1, keyword2..." 
                    className="text-[#F2F4F7] placeholder:text-[#475467] text-[12px] leading-[16px] font-normal flex flex-row w-full h-[32px] px-[8px] pr-[8px] gap-[4px] justify-start items-center rounded-[4px] outline-none transition-colors duration-150 ease-in-out bg-transparent border border-[#2A2F3A] hover:border-[#F2F4F7]/10 focus:border-[#F2F4F7]/10 hover:bg-[#2A2F3A]/10 focus:bg-[#2A2F3A]/10 text-left"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sub Tabs (Audit / Metrics / Socials) */}
          <div className="flex flex-col pt-[16px] flex-1 overflow-hidden min-h-[252px]">
            <div className="flex flex-row flex-1 px-[16px] min-h-[36px] max-h-[36px] justify-start items-center">
              <div className="flex flex-row flex-1 gap-[16px] justify-start items-center">
                {['Audit', '$ Metrics', 'Socials'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setSubTab(tab)}
                    className={`
                      flex flex-row px-[12px] gap-[4px] justify-start items-center group transition-colors ease-in-out duration-150 rounded-full h-[28px]
                      ${subTab === tab ? 'bg-[#2A2F3A]' : 'hover:bg-[#2A2F3A]/40'}
                    `}
                  >
                    <span className={`text-[14px] font-medium ${subTab === tab ? 'text-[#F2F4F7]' : 'text-[#98A2B3]'}`}>
                      {tab}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Audit Content Scrollable */}
            <div className="flex flex-row flex-1 w-full gap-[16px] justify-start items-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex flex-col h-full p-[16px] pb-[16px] gap-[16px] justify-start items-center flex-1">
                
                {/* Toggles */}
                <div className="flex flex-row w-full gap-[8px] justify-start items-center">
                  {['Dex Paid', "CA ends in 'pump'"].map(label => (
                    <div key={label} className="w-full">
                      <div className="inline-flex flex-row h-[16px] gap-[8px] justify-start items-center cursor-pointer">
                        <div className="border-[1px] border-[#2A2F3A] flex flex-row w-[16px] h-[16px] p-[2px] justify-center items-center rounded-[4px] cursor-pointer hover:bg-[#2A2F3A]/50">
                          <div className="w-[10px] h-[10px] bg-transparent rounded-[1px]"></div>
                        </div>
                        <span className="text-[#F2F4F7] text-[14px] font-medium text-nowrap">{label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Audit Fields */}
                {auditFields.map((field, i) => (
                  <div key={i} className={`flex flex-row w-full gap-[16px] justify-start items-end ${i === auditFields.length - 1 ? 'pb-[20px]' : ''}`}>
                    {/* Min Input */}
                    <div className="flex flex-col w-full gap-[4px]">
                      {i === 0 && <span className="text-[#98A2B3] text-[12px] leading-[16px] font-normal">{field.label}</span>}
                      {i > 0 && <span className="text-[#475467] text-[12px] leading-[16px] font-normal">{field.label}</span>}
                      
                      <div className="flex flex-row gap-[8px] w-full">
                        <div className="flex-1">
                          <div className="flex flex-col w-full gap-[4px] justify-start items-start">
                            <div className="relative flex w-full">
                              <input 
                                type="number"
                                placeholder="Min"
                                className="text-[#F2F4F7] placeholder:text-[#475467] text-[12px] leading-[16px] font-normal flex flex-row w-full h-[32px] px-[8px] pr-[8px] gap-[4px] justify-start items-center rounded-[4px] outline-none transition-colors duration-150 ease-in-out bg-transparent border border-[#2A2F3A] hover:border-[#F2F4F7]/10 focus:border-[#F2F4F7]/10 hover:bg-[#2A2F3A]/10 focus:bg-[#2A2F3A]/10 text-left"
                              />
                            </div>
                          </div>
                        </div>
                        {/* Unit Dropdown for Age */}
                        {field.hasUnit && (
                          <div className="relative flex">
                            <button type="button" className="text-[#F2F4F7] text-[12px] leading-[16px] font-normal px-[8px] h-[32px] rounded-[4px] outline-none transition-colors duration-150 ease-in-out bg-transparent border border-[#2A2F3A] hover:border-[#F2F4F7]/10 focus:border-[#F2F4F7]/10 hover:bg-[#2A2F3A]/10 focus:bg-[#2A2F3A]/10 cursor-pointer flex items-center justify-between gap-[4px] min-w-[48px]">
                              <span>{field.unit}</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Max Input */}
                    <div className="flex flex-col w-full gap-[4px]">
                      <div className="flex flex-row gap-[8px] w-full">
                        <div className="flex-1">
                          <div className="flex flex-col w-full gap-[4px] justify-start items-start">
                            <div className="relative flex w-full">
                              <input 
                                type="number"
                                placeholder="Max"
                                className="text-[#F2F4F7] placeholder:text-[#475467] text-[12px] leading-[16px] font-normal flex flex-row w-full h-[32px] px-[8px] pr-[8px] gap-[4px] justify-start items-center rounded-[4px] outline-none transition-colors duration-150 ease-in-out bg-transparent border border-[#2A2F3A] hover:border-[#F2F4F7]/10 focus:border-[#F2F4F7]/10 hover:bg-[#2A2F3A]/10 focus:bg-[#2A2F3A]/10 text-left"
                              />
                            </div>
                          </div>
                        </div>
                        {field.hasUnit && (
                          <div className="relative flex">
                            <button type="button" className="text-[#F2F4F7] text-[12px] leading-[16px] font-normal px-[8px] h-[32px] rounded-[4px] outline-none transition-colors duration-150 ease-in-out bg-transparent border border-[#2A2F3A] hover:border-[#F2F4F7]/10 focus:border-[#F2F4F7]/10 hover:bg-[#2A2F3A]/10 focus:bg-[#2A2F3A]/10 cursor-pointer flex items-center justify-between gap-[4px] min-w-[48px]">
                              <span>{field.unit}</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* --- Footer --- */}
        <div className="border-t border-[#2A2F3A] hidden sm:flex flex-row w-full h-[68px] justify-between items-center p-[16px] pb-[20px] bg-[#101114]">
          <div className="flex flex-row justify-start items-center gap-[16px]">
            <button type="button" className="bg-[#2A2F3A] flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center hover:bg-[#2A2F3A]/65 cursor-pointer rounded-full transition-colors">
              <span className="text-[#F2F4F7] text-[14px] leading-[16px] font-bold">Import</span>
            </button>
            <button type="button" className="bg-[#2A2F3A] flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center hover:bg-[#2A2F3A]/65 cursor-pointer rounded-full transition-colors">
              <span className="text-[#F2F4F7] text-[14px] leading-[16px] font-bold">Export</span>
            </button>
          </div>
          <div className="flex flex-row justify-end items-center">
            <button type="button" className="bg-[#3B82F6] flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full hover:bg-[#3B82F6]/80 hover:brightness-110 transition-all duration-[150ms] cursor-pointer">
              <span className="text-[14px] font-bold text-white">Apply All</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}