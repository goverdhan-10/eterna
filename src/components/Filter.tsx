import React, { useState } from "react";

// Pixel-perfect replica of the provided filter modal image.
// This component uses Tailwind CSS classes. If your project doesn't
// have Tailwind installed, either add it or convert the classes to your CSS.
// The component references the uploaded image at the local path below
// (the environment will transform this path to a usable URL):
const ILLUSTRATION_URL = "/mnt/data/c9172ba1-9284-40bc-b888-a726bf8eac32.png";

const protocols = [
  "Pump",
  "Bags",
  "Daos.fun",
  "Believe",
  "Boop",
  "Raydium",
  "Pump AMM",
  "Mayhem",
  "Moonshot",
  "Candle",
  "Jupiter Studio",
  "LaunchLab",
  "Meteora AMM",
  "Orca",
  "Bonk",
  "Heaven",
  "Sugar",
  "Moonit",
  "Dynamic BC",
  "Meteora AMM V2",
];

const quoteTokens = ["SOL", "USDC", "USD1"];

export default function Filter({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("New Pairs");
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
    setSelectedProtocols(protocols.slice());
  }
  function unselectAllProtocols() {
    setSelectedProtocols([]);
  }

  return (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

    {/* Modal */}
    <div className="relative w-[35vw] min-w-[340px] h-[50vh] min-h-[420px] rounded-2xl bg-[#111214] shadow-xl border border-[#242428] overflow-hidden">

      {/* Top header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e1f22] relative">

        <h3 className="text-base font-semibold text-white">Filters</h3>

        {/* CLEAN CROSS BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center"
        >
          <img src="/images/close.svg" className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-2">
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
      <div className="px-4 pt-4 pb-4 h-[calc(100%-120px)] overflow-y-auto">

        {/* Protocols Header */}
        <div className="text-sm text-[#aeb6bb] mb-2">Protocols</div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-2 gap-2">
          {protocols.map((p, i) => (
            <button
              key={p + i}
              onClick={() => toggleProtocol(p)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border select-none ${
                selectedProtocols.includes(p)
                  ? "bg-[#164e35] text-white border-transparent"
                  : "bg-transparent text-[#9aa0a6] border border-[#2a2b2d]"
              }`}
            >
              <span
                className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${
                  selectedProtocols.includes(p)
                    ? "bg-white/10"
                    : "bg-[#0f1112]"
                }`}
              >
                {p[0]}
              </span>
              <span className="truncate">{p}</span>
            </button>
          ))}
        </div>

        {/* Select All */}
        <div className="flex items-center justify-end mt-2">
          <button
            onClick={selectAllProtocols}
            className="text-xs mr-2 px-2 py-1 rounded-full bg-[#0f1012] border border-[#2b2b2d]"
          >
            Select All
          </button>
          <button
            onClick={unselectAllProtocols}
            className="text-xs px-2 py-1 rounded-full bg-[#0f1012] border border-[#2b2b2d]"
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
              className={`px-3 py-1.5 rounded-full text-xs border ${
                selectedTokens.includes(t)
                  ? "bg-[#0f3b64] text-white border-transparent"
                  : "bg-transparent text-[#9aa0a6] border border-[#2a2b2d]"
              }`}
            >
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
              className="w-full rounded-md px-3 py-1.5 bg-[#0c0c0d] border border-[#232426] text-xs text-white placeholder:text-[#495056]"
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
              className="w-full rounded-md px-3 py-1.5 bg-[#0c0c0d] border border-[#232426] text-xs text-white placeholder:text-[#495056]"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-full bg-[#1a1b1d] border border-[#252627] text-xs">
              Import
            </button>
            <button className="px-3 py-1.5 rounded-full bg-[#1a1b1d] border border-[#252627] text-xs">
              Export
            </button>
          </div>

          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#7c4dff] text-white text-sm shadow-md">
            Apply All
          </button>
        </div>
      </div>
    </div>
  </div>
);

}
