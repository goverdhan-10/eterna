"use client";
import React from 'react';
import { Server, RefreshCw } from 'lucide-react';

// Data matching the screenshot exactly
const regions = [
  { name: "US-W", latency: 150, color: "#EF4444" }, // Red
  { name: "US-C", latency: 155, color: "#EF4444" }, // Red
  { name: "US-E", latency: 129, color: "#F97316" }, // Orange
  { name: "EU-W", latency: 91,  color: "#EAB308" }, // Yellow
  { name: "EU-C", latency: 98,  color: "#EAB308" }, // Yellow
  { name: "EU-E", latency: 97,  color: "#EAB308" }, // Yellow
  { name: "ASIA", latency: 144, color: "#F97316" }, // Orange
  { name: "ASIA-V2", latency: 56, color: "#EAB308" }, // Yellow (Greenish in logic, but Yellow in image class)
  { name: "AUS", latency: 104, color: "#F97316" }, // Orange
];

export default function Global() {
  return (
    <div className="flex flex-col gap-1 p-1 w-40 bg-[#101114] border border-[#2A2F3A] rounded shadow-2xl">
      
      {/* Header */}
      <div className="pl-2 pr-1 h-6 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-xs text-[#94A3B8]">Regions</span>
        </div>
        <button 
          type="button" 
          className="group flex items-center justify-center w-5 h-5 rounded hover:bg-[#2A2F3A]/20 transition-colors duration-150"
          aria-label="Refresh latencies"
        >
          <RefreshCw size={12} className="text-[#94A3B8] group-hover:text-[#F2F4F7]" />
        </button>
      </div>

      {/* Region List */}
      {regions.map((region) => (
        <button
          key={region.name}
          type="button"
          className="relative flex items-center gap-2 px-3 hover:bg-[#2A2F3A]/60 hover:opacity-100 opacity-90 rounded w-full text-left justify-start h-8 group overflow-hidden transition-all"
        >
          <Server size={16} style={{ color: region.color }} />
          <span className="text-xs font-medium text-[#94A3B8]">
            {region.name}
          </span>
          <div className="grow"></div>
          <span 
            className="text-[11px] tabular-nums font-medium"
            style={{ color: region.color }}
          >
            {region.latency}ms
          </span>
        </button>
      ))}

      {/* Active Item (GLOBAL) */}
      <button 
        type="button" 
        className="relative flex items-center gap-2 px-3 hover:bg-[#2A2F3A]/60 hover:opacity-100 bg-[#2A2F3A]/40 rounded w-full text-left justify-start h-8 group overflow-hidden transition-all"
      >
        {/* Active Indicator Bar */}
        <div className="absolute left-0 w-0.5 h-4 transition-colors duration-300 bg-[#F97316]"></div>
        
        <Server size={16} className="text-[#F97316]" />
        
        <span className="text-xs font-medium text-[#F2F4F7]">
          GLOBAL
        </span>
        
        <div className="grow"></div>
        
        <span className="text-[11px] tabular-nums font-medium text-[#F97316]">
          143ms
        </span>
      </button>

    </div>
  );
}