import React from 'react';
import { Token } from '@/types';
import { formatPrice, formatCurrency, formatPercent, getPriceColor } from '@/utils/format';
import { Tooltip } from './ui/Tooltip';
import { Copy, ExternalLink } from 'lucide-react';

interface TokenDetailModalProps {
  token: Token | null;
  onClose: () => void;
}

export const TokenDetailModal: React.FC<TokenDetailModalProps> = ({ token, onClose }) => {
  if (!token) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 z-999 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-[#0B0E11] border border-[#1C212B] rounded-sm max-w-md w-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1C212B] flex items-center justify-center">
              {token.image ? (
                <img src={token.image} alt={token.symbol} className="w-full h-full rounded-full" />
              ) : (
                <span className="font-bold">{token.symbol[0]}</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">{token.symbol}</h2>
              <p className="text-sm text-slate-400">{token.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-100">✕</button>
        </div>

        {/* Price Section */}
        <div className="mb-6 p-4 bg-[#1C212B]/50 rounded-sm">
          <p className="text-slate-400 text-sm mb-2">Current Price</p>
          <p className="text-2xl font-bold text-slate-100 mb-2">{formatPrice(token.currentPrice)}</p>
          <p className={`text-sm font-medium ${getPriceColor(token.priceChange24h)}`}>
            {formatPercent(token.priceChange24h)} (24h)
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-[#1C212B]/50 rounded-sm">
            <p className="text-xs text-slate-400 mb-1">Market Cap</p>
            <p className="text-sm font-medium text-slate-100">{token.marketCap ? formatCurrency(token.marketCap) : 'N/A'}</p>
          </div>
          <div className="p-3 bg-[#1C212B]/50 rounded-sm">
            <p className="text-xs text-slate-400 mb-1">24h Volume</p>
            <p className="text-sm font-medium text-slate-100">{token.volume24h ? formatCurrency(token.volume24h) : 'N/A'}</p>
          </div>
          <div className="p-3 bg-[#1C212B]/50 rounded-sm">
            <p className="text-xs text-slate-400 mb-1">Liquidity</p>
            <p className="text-sm font-medium text-slate-100">{token.liquidity ? formatCurrency(token.liquidity) : 'N/A'}</p>
          </div>
          <div className="p-3 bg-[#1C212B]/50 rounded-sm">
            <p className="text-xs text-slate-400 mb-1">Holders</p>
            <p className="text-sm font-medium text-slate-100">{token.holders ? token.holders.toLocaleString() : 'N/A'}</p>
          </div>
        </div>

        {/* Contract Address */}
        <div className="mb-6">
          <p className="text-xs text-slate-400 mb-2">Contract Address</p>
          <div className="flex items-center gap-2 p-2 bg-[#1C212B]/50 rounded-sm">
            <code className="text-xs text-slate-300 flex-1 truncate">{token.contractAddress}</code>
            <button
              onClick={() => copyToClipboard(token.contractAddress)}
              className="p-2 hover:bg-[#1C212B] rounded transition-colors"
            >
              <Copy size={14} className="text-slate-400 hover:text-slate-100" />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span className={`
            inline-block px-3 py-1 rounded text-xs font-medium
            ${token.status === 'new_pair' ? 'bg-purple-500/10 text-purple-400' : ''}
            ${token.status === 'final_stretch' ? 'bg-orange-500/10 text-orange-400' : ''}
            ${token.status === 'migrated' ? 'bg-green-500/10 text-green-400' : ''}
          `}>
            {token.status === 'new_pair' && '🆕 New Pair'}
            {token.status === 'final_stretch' && '🎯 Final Stretch'}
            {token.status === 'migrated' && '✅ Migrated'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-[#3B82F6] text-white py-2 rounded-sm font-medium hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2">
            <ExternalLink size={16} />
            View on Explorer
          </button>
          <button onClick={onClose} className="flex-1 bg-[#1C212B] text-slate-100 py-2 rounded-sm font-medium hover:bg-[#2A2F3A] transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
