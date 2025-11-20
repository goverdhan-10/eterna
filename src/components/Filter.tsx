import { useState } from "react";

const protocols = [
  { name: "Pump", icon: "pump" },
  { name: "Bags", icon: "bags" },
  { name: "Daos.fun", icon: "daosfun" },
  { name: "Boop", icon: "boop" },
  { name: "Raydium", icon: "ray" },
  { name: "Pump AMM", icon: "pump-amm-tem" }, // Matching filename from image
  { name: "Mayhem", icon: "mayhem" },
  { name: "Moonshot", icon: "moonshot-new" }, // Matching filename from image
  { name: "Candle", icon: "candle" },
  { name: "Jupiter Studio", icon: "jupstudio" },
  { name: "LaunchLab", icon: "launchlab" },
  { name: "Launch Coin", icon: "launch-a-coin" },
  { name: "Orca", icon: "orca" },
  { name: "Bonk", icon: "bonk" },
  { name: "Heaven", icon: "heaven" },
  { name: "Sugar", icon: "sugar" },
  { name: "Moonit", icon: "moonit" },
  { name: "Virtual Curve", icon: "virtual-curve" },
  { name: "Solana", icon: "sol" },
  { name: "BNB", icon: "bnb" },
];

const quoteTokens = ["SOL", "USDC", "USD1"];

export default function Filter({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("New Pairs");
  // We store the protocol 'name' in the selected array
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [excludeKeywords, setExcludeKeywords] = useState("");

  function toggleProtocol(name: string) {
    setSelectedProtocols((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  }

  function toggleToken(t: string) {
    setSelectedTokens((prev) => (prev.includes(t) ? prev.filter((p) => p !== t) : [...prev, t]));
  }

  function selectAllProtocols() {
    setSelectedProtocols(protocols.map(p => p.name));
  }
  function unselectAllProtocols() {
    setSelectedProtocols([]);
  }

  return (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

    {/* Modal */}
    <div className="relative w-[35vw] min-w-[340px] h-[50vh] min-h-[420px] rounded-2xl bg-[#111214] shadow-xl border border-[#242428] overflow-hidden flex flex-col">

      {/* Top header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e1f22] relative shrink-0">

        <h3 className="text-base font-semibold text-white">Filters</h3>

        {/* CLEAN CROSS BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center"
        >
          <img src="/images/close.png" className="w-3.5 h-3.5" alt="Close" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-2 shrink-0">
        <div className="flex gap-4 border-b border-[#1b1c1f]">
          {["New Pairs", "Final Stretch", "Migrated"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-2 pt-1 text-sm font-medium ${
                activeTab === t
                  ? "text-white border-b-2 border-[#3b82f6]"
                  : "text-[#9aa0a6]"
              }`}
            >
              {t}
            </button>
          ))}

          <div className="ml-auto flex items-center">
            {/* refresh icon */}
            <button className="w-7 h-7 rounded-md flex items-center justify-center">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12a9 9 0 10-3.2 6.6"
                  stroke="#9aa0a6"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M21 3v6h-6"
                  stroke="#9aa0a6"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="px-4 pt-4 pb-4 overflow-y-auto flex-1">

        {/* Protocols Header */}
        <div className="text-sm text-[#aeb6bb] mb-2">Protocols</div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-2 gap-2">
          {protocols.map((p, i) => (
            <button
              key={p.name + i}
              onClick={() => toggleProtocol(p.name)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-full text-xs border select-none transition-colors ${
                selectedProtocols.includes(p.name)
                  ? "bg-[#164e35] text-white border-transparent"
                  : "bg-transparent text-[#9aa0a6] border border-[#2a2b2d] hover:border-[#3f4145]"
              }`}
            >
              {/* Icon Image */}
              <div className={`w-5 h-5 shrink-0 rounded-full overflow-hidden ${
                  selectedProtocols.includes(p.name) ? "opacity-100" : "opacity-80"
              }`}>
                <img 
                    // Assuming images are in public/images/filename.png
                    src={`/images/${p.icon}.svg`} 
                    alt={p.name}
                    className="w-full h-full object-cover"
                />
              </div>
              
              <span className="truncate">{p.name}</span>
            </button>
          ))}
        </div>

        {/* Select All */}
        <div className="flex items-center justify-end mt-2">
          <button
            onClick={selectAllProtocols}
            className="text-xs mr-2 px-2 py-1 rounded-full bg-[#0f1012] border border-[#2b2b2d] text-[#9aa0a6] hover:text-white"
          >
            Select All
          </button>
          <button
            onClick={unselectAllProtocols}
            className="text-xs px-2 py-1 rounded-full bg-[#0f1012] border border-[#2b2b2d] text-[#9aa0a6] hover:text-white"
          >
            Unselect All
          </button>
        </div>

        {/* Quote Tokens */}
        <div className="mt-4 text-sm text-[#aeb6bb]">Quote Tokens</div>
        <div className="flex gap-2 mt-2">
          {quoteTokens.map((t) => (
            <button
              key={t}
              onClick={() => toggleToken(t)}
              className={`px-3 py-1.5 rounded-full text-xs border flex items-center gap-2 ${
                selectedTokens.includes(t)
                  ? "bg-[#0f3b64] text-white border-transparent"
                  : "bg-transparent text-[#9aa0a6] border border-[#2a2b2d]"
              }`}
            >
              {/* Optional: Add icons for Quote tokens if available in the image list */}
              {t === 'SOL' && <img src="/images/sol.svg" className="w-3.5 h-3.5 rounded-full" />}
              {t === 'USDC' && <img src="/images/usdc.svg" className="w-3.5 h-3.5 rounded-full" />}
              {t === 'USD1' && <img src="/images/usd1.svg" className="w-3.5 h-3.5 rounded-full" />}
              {t}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-[#9aa0a6] mb-1 block">
              Search Keywords
            </label>
            <input
              value={searchKeywords}
              onChange={(e) => setSearchKeywords(e.target.value)}
              placeholder="keyword1, keyword2..."
              className="w-full rounded-md px-3 py-1.5 bg-[#0c0c0d] border border-[#232426] text-xs text-white placeholder:text-[#495056] focus:outline-none focus:border-[#3b82f6]"
            />
          </div>
          <div>
            <label className="text-xs text-[#9aa0a6] mb-1 block">
              Exclude Keywords
            </label>
            <input
              value={excludeKeywords}
              onChange={(e) => setExcludeKeywords(e.target.value)}
              placeholder="keyword1, keyword2..."
              className="w-full rounded-md px-3 py-1.5 bg-[#0c0c0d] border border-[#232426] text-xs text-white placeholder:text-[#495056] focus:outline-none focus:border-[#3b82f6]"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-full bg-[#1a1b1d] border border-[#252627] text-xs text-[#9aa0a6] hover:text-white hover:border-[#3f4145]">
              Import
            </button>
            <button className="px-3 py-1.5 rounded-full bg-[#1a1b1d] border border-[#252627] text-xs text-[#9aa0a6] hover:text-white hover:border-[#3f4145]">
              Export
            </button>
          </div>

          <button className="px-4 py-2 rounded-full bg-linear-to-r from-[#3b82f6] to-[#7c4dff] text-white text-sm shadow-md hover:opacity-90">
            Apply All
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}