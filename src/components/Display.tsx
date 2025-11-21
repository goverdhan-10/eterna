import React from 'react';
import { 
  Zap, 
  Sun, 
  Search, 
  Hash, 
  Eye, 
  Square, 
  Loader2, 
  LayoutGrid,
  EyeOff
} from 'lucide-react';

export default function DisplayDropdown() {
  return (
    <div 
      className="absolute right-0 mt-2 z-[9999] w-[344px] bg-[#111215] border border-[#2d2f39] rounded-[4px] shadow-2xl font-sans text-[#9ca3af] select-none overflow-hidden"
       // Position for demo purposes
    >
      <div className="flex flex-col h-full max-h-[518px]">
        
        {/* Metrics Section */}
        <div className="flex flex-col gap-[12px] px-[16px] py-[16px] flex-shrink-0">
          <span className="text-[12px]">Metrics</span>
          <div className="flex flex-row gap-[8px]">
            {/* Small Button */}
            <button className="flex-1 h-[52px] rounded-[4px] border border-[#2d2f39]/50 hover:bg-[#2d2f39]/40 transition-colors bg-transparent">
              <div className="flex flex-col gap-[4px] justify-start items-center pt-[8px]">
                <div className="flex flex-row gap-[4px] items-center text-[#555a66]">
                  <span className="text-[12px]">MC</span>
                  <span className="text-[12px] font-medium">77K</span>
                </div>
                <span className="text-[12px] text-[#555a66]">Small</span>
              </div>
            </button>
            
            {/* Large Button (Active) */}
            <button className="flex-1 h-[52px] rounded-[4px] border border-[#2d2f39]/50 bg-[#2d2f39]">
              <div className="flex flex-col gap-[4px] justify-start items-center pt-[8px]">
                <div className="flex flex-row gap-[4px] items-center text-[#9ca3af]">
                  <span className="text-[12px] pt-[2px]">MC</span>
                  <span className="text-[16px] font-medium text-white">77K</span>
                </div>
                <span className="text-[12px]">Large</span>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Buy Section */}
        <div className="flex flex-col gap-[12px] px-[16px] flex-shrink-0">
          <span className="text-[12px]">Quick Buy</span>
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-row gap-[8px]">
              
              {/* Small 7 */}
              <button className="flex-1 h-[52px] rounded-[4px] bg-[#2d2f39] border border-[#2d2f39]/50">
                <div className="flex flex-col gap-[4px] items-center pt-[10px]">
                  <div className="h-[16px] flex items-end">
                    <div className="w-[20px] h-[8px] bg-[#3b82f6] rounded-full flex justify-center items-center gap-[1px]">
                      <Zap size={6} fill="#090909" strokeWidth={0} className="text-[#090909]" />
                      <span className="text-[6px] font-bold text-[#090909]">7</span>
                    </div>
                  </div>
                  <span className="text-[12px]">Small</span>
                </div>
              </button>

              {/* Large 7 */}
              <button className="flex-1 h-[52px] rounded-[4px] bg-transparent border border-[#2d2f39]/50 hover:bg-[#2d2f39]/40">
                <div className="flex flex-col gap-[4px] items-center pt-[10px]">
                  <div className="h-[16px] flex items-end">
                    <div className="w-[24px] h-[10px] bg-[#3b82f6] rounded-full flex justify-center items-center gap-[1px]">
                        <Zap size={7} fill="#090909" strokeWidth={0} className="text-[#090909]" />
                        <span className="text-[7px] font-bold text-[#090909]">7</span>
                    </div>
                  </div>
                  <span className="text-[12px] text-[#555a66]">Large</span>
                </div>
              </button>

              {/* Mega 7 */}
              <button className="flex-1 h-[52px] rounded-[4px] bg-transparent border border-[#2d2f39]/50 hover:bg-[#2d2f39]/40">
                <div className="flex flex-col gap-[4px] items-center pt-[10px]">
                  <div className="h-[16px] flex items-end">
                    <div className="w-[32px] h-[14px] bg-[#3b82f6] rounded-[2px] flex justify-center items-center gap-[1px]">
                        <Zap size={7} fill="#090909" strokeWidth={0} className="text-[#090909]" />
                        <span className="text-[7px] font-bold text-[#090909]">7</span>
                    </div>
                  </div>
                  <span className="text-[12px] text-[#555a66]">Mega</span>
                </div>
              </button>

              {/* Ultra 7 (Gradient) */}
              <button className="flex-1 h-[52px] rounded-[4px] bg-transparent border border-[#2d2f39]/50 hover:bg-[#2d2f39]/40">
                <div className="flex flex-col gap-[4px] items-center pt-[10px]">
                  <div className="h-[16px] flex items-end">
                    <div className="relative w-[40px] h-[18px] rounded-[1px] bg-[#3b82f6]/20 flex justify-center items-center overflow-hidden">
                      <div className="absolute w-[24px] h-[12px] bottom-0 right-0 translate-x-1 translate-y-1 rounded-full opacity-10 bg-[radial-gradient(circle,_rgb(255,255,255)_0%,_rgba(255,255,255,0)_70%)] z-10"></div>
                      <Zap size={8} fill="#60a5fa" strokeWidth={0} className="text-[#60a5fa]" />
                      <span className="text-[8px] font-bold text-[#60a5fa]">7</span>
                    </div>
                  </div>
                  <span className="text-[12px] text-[#555a66]">Ultra</span>
                </div>
              </button>

            </div>
          </div>
          
          {/* Grey Toggle */}
          <button className="flex items-center gap-[8px] px-[12px] h-[36px] w-full rounded-[4px] hover:bg-[#2d2f39]/60 transition-colors group">
            <Sun size={16} className="text-[#9ca3af] group-hover:text-white transition-colors" />
            <span className="text-[14px] font-medium text-white">Grey</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-row gap-[8px] px-[16px] mt-[8px] w-full h-[36px] items-center border-b border-[#2d2f39] pb-[3px] flex-shrink-0">
            <button className="h-[32px] px-[12px] bg-[#2d2f39] rounded-full flex items-center justify-center text-white">
                <span className="text-[14px] font-medium">Layout</span>
            </button>
            <button className="h-[32px] px-[12px] text-[#555a66] hover:text-[#9ca3af] rounded-full flex items-center justify-center">
                <span className="text-[14px] font-medium">Metrics</span>
            </button>
            <button className="h-[32px] px-[12px] text-[#555a66] hover:text-[#9ca3af] rounded-full flex items-center justify-center">
                <span className="text-[14px] font-medium">Row</span>
            </button>
            <button className="h-[32px] px-[12px] text-[#555a66] hover:text-[#9ca3af] rounded-full flex items-center justify-center">
                <span className="text-[14px] font-medium">Extras</span>
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden py-[16px]">
            <div className="flex flex-col gap-[12px]">
                {/* List Items */}
                <div className="flex flex-col gap-[4px] px-[16px]">
                    {[
                        { icon: Search, label: 'Show Search Bar', iconFill: true },
                        { icon: Hash, label: 'No Decimals', iconFill: false },
                        { icon: Eye, label: 'Show Hidden Tokens', iconFill: false },
                        { icon: Eye, label: 'Unhide on Migrated', iconFill: false, indent: true },
                        { icon: Square, label: 'Circle Images', iconFill: false },
                        { icon: Loader2, label: 'Progress Bar', iconFill: false },
                        { icon: LayoutGrid, label: 'Spaced Tables', iconFill: false },
                    ].map((item, idx) => (
                        <div key={idx} className={item.indent ? "pl-[12px]" : ""}>
                             <button className="flex items-center gap-[8px] px-[12px] h-[36px] w-full rounded-[4px] hover:bg-[#2d2f39]/60 transition-colors group text-left">
                                <div className="flex items-center">
                                    <item.icon 
                                        size={16} 
                                        fill={item.iconFill ? "currentColor" : "none"} 
                                        className="text-[#9ca3af] group-hover:text-white transition-colors" 
                                    />
                                </div>
                                <span className="text-[14px] font-medium text-white">{item.label}</span>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-[#2d2f39]/50 my-[4px] mx-0 w-full"></div>

                {/* Customize Rows */}
                <div className="flex flex-col gap-[12px] px-[16px]">
                    <span className="text-[12px] text-[#9ca3af]">Customize rows</span>
                    <div className="flex flex-col gap-[8px]">
                        {/* Row 1 */}
                        <div className="flex flex-row gap-[8px]">
                            <PillButton text="Image Reuse" active={false} />
                            <PillButton text="Market Cap" active={true} />
                            <PillButton text="Volume" active={true} />
                            <PillButton text="Fees" active={true} />
                        </div>
                        {/* Row 2 */}
                        <div className="flex flex-row gap-[8px]">
                            <PillButton text="TX" active={true} />
                            <PillButton text="Socials" active={true} />
                            <PillButton text="Holders" active={true} />
                            <PillButton text="Pro Traders" active={true} />
                            <PillButton text="KOLs" active={true} />
                        </div>
                        {/* Row 3 */}
                        <div className="flex flex-row gap-[8px]">
                            <PillButton text="Dev Migrations" active={true} />
                            <PillButton text="Dev Creations" active={true} />
                            <PillButton text="Top 10 Holders" active={true} />
                        </div>
                        {/* Row 4 */}
                        <div className="flex flex-row gap-[8px]">
                            <PillButton text="Dev Holding" active={true} />
                            <PillButton text="Tracked Dev" active={true} />
                            <PillButton text="Funding Time" active={true} />
                        </div>
                        {/* Row 5 */}
                        <div className="flex flex-row gap-[8px]">
                            <PillButton text="Sniper" active={true} />
                            <PillButton text="Insider" active={true} />
                            <PillButton text="Bundler" active={true} />
                            <PillButton text="Tax" active={false} />
                            <PillButton text="Dex Paid" active={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

function PillButton({ text, active }: { text: string; active: boolean }) {
  return (
    <button 
        className={`
            whitespace-nowrap flex items-center px-[7px] h-[28px] rounded-[4px] border text-[12px] font-medium transition-colors
            ${active 
                ? "border-[#2d2f39] bg-[#2d2f39]/60 hover:bg-[#2d2f39] text-[#9ca3af]" 
                : "border-[#2d2f39]/50 hover:bg-[#2d2f39]/30 bg-transparent text-[#555a66]"
            }
        `}
    >
        {text}
    </button>
  );
}