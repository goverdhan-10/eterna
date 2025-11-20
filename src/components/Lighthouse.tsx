import React from 'react';
import { 
  BarChart2, 
  Users, 
  Sparkles, 
  RefreshCcw, 
  Layers 
} from 'lucide-react';

export default function MarketLighthouse() {
  return (
    <div className="w-[360px] bg-[#0e1115] border border-white/10 rounded-lg shadow-2xl p-3 font-sans select-none text-slate-300">
      
      {/* --- Header --- */}
      <div className="flex items-center justify-between mb-3 pl-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#34d399] rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
          <span className="text-slate-200 text-[13px] font-semibold tracking-wide">Market Lighthouse</span>
        </div>
        <div className="flex gap-3 text-[11px] font-bold text-slate-500">
          <button className="hover:text-slate-300 transition-colors">5m</button>
          <button className="hover:text-slate-300 transition-colors">1h</button>
          <button className="hover:text-slate-300 transition-colors">6h</button>
          <button className="text-[#5872c8]">24h</button>
        </div>
      </div>

      {/* --- Top Stats Row --- */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* Total Trades */}
        <div className="bg-[#13161b] border border-white/5 rounded-[6px] p-2.5 flex flex-col justify-between h-[52px]">
          <div className="text-slate-500 text-[10px] font-medium leading-none">Total Trades</div>
          <div className="flex justify-between items-end mt-1">
            <div className="flex items-center gap-1.5 text-slate-200 font-bold text-[13px]">
               <BarChart2 size={14} className="text-slate-500 stroke-[2.5]" />
               9.62M
            </div>
            <span className="text-[#34d399] text-[11px] font-bold">+21.36%</span>
          </div>
        </div>

        {/* Traders */}
        <div className="bg-[#13161b] border border-white/5 rounded-[6px] p-2.5 flex flex-col justify-between h-[52px]">
          <div className="text-slate-500 text-[10px] font-medium leading-none">Traders</div>
          <div className="flex justify-between items-end mt-1">
            <div className="flex items-center gap-1.5 text-slate-200 font-bold text-[13px]">
               <Users size={14} className="text-slate-500 stroke-[2.5]" />
               426K
            </div>
            <span className="text-[#34d399] text-[11px] font-bold">+20.73%</span>
          </div>
        </div>
      </div>

      {/* --- 24h Vol --- */}
      <div className="mb-5 px-0.5">
        <div className="flex justify-between items-end mb-1.5">
          <span className="text-slate-400 text-[11px] font-medium">24h Vol</span>
          <div className="flex items-center gap-1">
            <span className="text-slate-200 text-[12px] font-bold">$1.69B</span>
            <span className="text-[#34d399] text-[11px] font-bold">+9.13%</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex h-[3px] w-full rounded-full overflow-hidden mb-1.5">
           <div className="w-[62%] bg-[#34d399] shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
           <div className="w-[38%] bg-[#ec4899] shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
        </div>
        
        {/* Sub Values */}
        <div className="flex justify-between text-[11px] font-bold">
           <div className="flex gap-1">
             <span className="text-[#34d399]">5.72M</span>
             <span className="text-slate-600">/</span>
             <span className="text-[#34d399]">$857M</span>
           </div>
           <div className="flex gap-1">
             <span className="text-[#ec4899]">3.9M</span>
             <span className="text-slate-600">/</span>
             <span className="text-[#ec4899]">$833M</span>
           </div>
        </div>
      </div>

      {/* --- Token Stats Header --- */}
      <div className="flex items-center gap-1.5 text-slate-400 text-[12px] font-medium mb-2 px-0.5">
        <Layers size={14} className="stroke-[2]" />
        <span>Token Stats</span>
      </div>

      {/* --- Token Stats Row --- */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {/* Created */}
        <div className="bg-[#13161b] border border-white/5 rounded-[6px] p-2.5 flex flex-col justify-between h-[52px]">
          <div className="text-slate-500 text-[10px] font-medium leading-none">Created</div>
          <div className="flex justify-between items-end mt-1">
            <div className="flex items-center gap-1.5 text-slate-200 font-bold text-[13px]">
               <Sparkles size={14} className="text-slate-500 stroke-[2.5]" />
               34.4K
            </div>
            <span className="text-[#34d399] text-[11px] font-bold">+8.162%</span>
          </div>
        </div>

        {/* Migrations */}
        <div className="bg-[#13161b] border border-white/5 rounded-[6px] p-2.5 flex flex-col justify-between h-[52px]">
          <div className="text-slate-500 text-[10px] font-medium leading-none">Migrations</div>
          <div className="flex justify-between items-end mt-1">
            <div className="flex items-center gap-1.5 text-[#5872c8] font-bold text-[13px]">
               <RefreshCcw size={14} className="text-[#5872c8] stroke-[2.5]" />
               5.45K
            </div>
            <span className="text-[#34d399] text-[11px] font-bold">+0.702%</span>
          </div>
        </div>
      </div>

      {/* --- Top Launchpads --- */}
      <div className="mb-3">
        <div className="text-slate-500 text-[11px] font-medium mb-2 px-0.5">Top Launchpads</div>
        <div className="grid grid-cols-3 gap-2">
           
           {/* Launchpad 1: Pump */}
           <div className="bg-[#13161b] border border-white/5 rounded-full h-[34px] px-1 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#1a2026] shrink-0 ml-0.5">
                 <img src="/images/pump.svg" alt="pump" className="w-4 h-4 object-contain" />
              </div>
              <div className="flex flex-col leading-none -mt-0.5">
                <span className="text-[#34d399] text-[11px] font-bold tracking-tight">$223M</span>
                <span className="text-[#34d399] text-[9px] font-semibold mt-[1px]">+27.84%</span>
              </div>
           </div>

           {/* Launchpad 2: Bonk/Doge */}
           <div className="bg-[#13161b] border border-white/5 rounded-full h-[34px] px-1 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#1a2026] shrink-0 ml-0.5">
                 <img src="/images/bonk.svg" alt="bonk" className="w-4 h-4 object-contain" />
              </div>
              <div className="flex flex-col leading-none -mt-0.5">
                <span className="text-[#eab308] text-[11px] font-bold tracking-tight">$6.8M</span>
                <span className="text-[#f472b6] text-[9px] font-semibold mt-[1px]">-0.0%</span>
              </div>
           </div>

           {/* Launchpad 3: Curve */}
           <div className="bg-[#13161b] border border-white/5 rounded-full h-[34px] px-1 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#1a2026] shrink-0 ml-0.5">
                 <img src="/images/virtual-curve.svg" alt="vc" className="w-4 h-4 object-contain" />
              </div>
              <div className="flex flex-col leading-none -mt-0.5">
                <span className="text-[#f472b6] text-[11px] font-bold tracking-tight">$6.16M</span>
                <span className="text-[#f472b6] text-[9px] font-semibold mt-[1px]">-5.18%</span>
              </div>
           </div>

        </div>
      </div>

      {/* --- Top Protocols --- */}
      <div>
        <div className="text-slate-500 text-[11px] font-medium mb-2 px-0.5">Top Protocols</div>
        <div className="grid grid-cols-3 gap-2">
           
           {/* Protocol 1 */}
           <div className="bg-[#13161b] border border-white/5 rounded-full h-[34px] px-1 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#251815] shrink-0 ml-0.5 border border-orange-900/30">
                 {/* Simplified striped circle icon */}
                 <div className="w-3.5 h-3.5 rounded-full bg-[repeating-linear-gradient(45deg,#f97316,#f97316_2px,transparent_2px,transparent_4px)] opacity-80"></div>
              </div>
              <div className="flex flex-col leading-none -mt-0.5">
                <span className="text-slate-200 text-[11px] font-bold tracking-tight">$274M</span>
                <span className="text-[#f472b6] text-[9px] font-semibold mt-[1px]">-25.7%</span>
              </div>
           </div>

           {/* Protocol 2 */}
           <div className="bg-[#13161b] border border-white/5 rounded-full h-[34px] px-1 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#251815] shrink-0 ml-0.5 border border-orange-900/30">
                 <div className="w-3.5 h-3.5 rounded-full bg-[repeating-linear-gradient(45deg,#f97316,#f97316_2px,transparent_2px,transparent_4px)] opacity-80"></div>
              </div>
              <div className="flex flex-col leading-none -mt-0.5">
                <span className="text-slate-200 text-[11px] font-bold tracking-tight">$191M</span>
                <span className="text-[#34d399] text-[9px] font-semibold mt-[1px]">+16.46%</span>
              </div>
           </div>

           {/* Protocol 3 (Raydium approx) */}
           <div className="bg-[#13161b] border border-white/5 rounded-full h-[34px] px-1 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#1e2330] shrink-0 ml-0.5 border border-blue-900/30">
                 <span className="text-[#5872c8] font-bold text-[10px]">R</span>
              </div>
              <div className="flex flex-col leading-none -mt-0.5">
                <span className="text-slate-200 text-[11px] font-bold tracking-tight">$52M</span>
                <span className="text-[#34d399] text-[9px] font-semibold mt-[1px]">+19.4%</span>
              </div>
           </div>

        </div>
      </div>

    </div>
  );
}