import React, { useState, useEffect, useRef } from 'react';
import { 
  MAJOR_INDICES, 
  WORLD_INDICES, 
  MEGA_CAP_STOCKS, 
  CRYPTO_ASSETS, 
  FUTURES_COMMODITIES, 
  FOREX_PAIRS, 
  POPULAR_ETFS, 
  GOVERNMENT_BONDS 
} from '../data/mockMarketData';
import { MarketAsset } from '../types/market';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectSymbol }) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Stocks' | 'Crypto' | 'Indices' | 'Futures' | 'Forex'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent will toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Flatten searchable symbols
  const allSearchable: { symbol: string; name: string; type: string; price: number; changePercent: number }[] = [
    ...MAJOR_INDICES.map(i => ({ symbol: i.symbol, name: i.name, type: 'Indices', price: i.price, changePercent: i.changePercent })),
    ...WORLD_INDICES.map(i => ({ symbol: i.symbol, name: i.name, type: 'Indices', price: i.price, changePercent: i.changePercent })),
    ...MEGA_CAP_STOCKS.map(i => ({ symbol: i.symbol, name: i.name, type: 'Stocks', price: i.price, changePercent: i.changePercent })),
    ...CRYPTO_ASSETS.map(i => ({ symbol: i.symbol, name: i.name, type: 'Crypto', price: i.price, changePercent: i.changePercent })),
    ...FUTURES_COMMODITIES.map(i => ({ symbol: i.symbol, name: i.name, type: 'Futures', price: i.price, changePercent: i.changePercent })),
    ...FOREX_PAIRS.map(i => ({ symbol: i.symbol, name: i.name, type: 'Forex', price: i.price, changePercent: i.changePercent })),
    ...POPULAR_ETFS.map(i => ({ symbol: i.symbol, name: i.name, type: 'Stocks', price: 420.50, changePercent: i.changePercent })),
    ...GOVERNMENT_BONDS.map(i => ({ symbol: i.symbol, name: i.name, type: 'Bonds', price: i.price, changePercent: i.changePercent }))
  ];

  const filtered = allSearchable.filter(item => {
    const matchesFilter = filterType === 'All' || item.type.toLowerCase() === filterType.toLowerCase();
    const matchesQuery = item.symbol.toLowerCase().includes(query.toLowerCase()) || 
                         item.name.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#131722]/50 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E0E3EB] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#787B86] text-[24px]">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbols, indices, commodities (e.g. NVDA, SPX, BTC, Gold)..."
            className="w-full text-base text-[#131722] placeholder-[#787B86] outline-hidden font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-[#787B86] hover:text-[#131722] p-1 rounded-full hover:bg-[#F0F3FA]"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 bg-[#F0F3FA] rounded-md text-[#787B86] hover:text-[#131722]"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-[#FAF9FF] border-b border-[#E0E3EB]/70 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {(['All', 'Stocks', 'Crypto', 'Indices', 'Futures', 'Forex'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === cat
                  ? 'bg-[#131722] text-white'
                  : 'bg-white text-[#787B86] border border-[#E0E3EB] hover:bg-[#F0F3FA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-[#E0E3EB]/60 flex-1 p-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#787B86]">
              <span className="material-symbols-outlined text-[40px] text-[#C3C5D8] mb-2">manage_search</span>
              <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-[#787B86] mt-1">Try searching for tickers like NVDA, AAPL, SPX, or BTC</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.symbol}
                onClick={() => {
                  onSelectSymbol(item.symbol);
                  onClose();
                }}
                className="p-3 hover:bg-[#F0F3FA] rounded-xl flex items-center justify-between cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F0F3FA] group-hover:bg-white group-hover:shadow-xs border border-[#E0E3EB] flex items-center justify-center font-bold text-xs text-[#131722]">
                    {item.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#131722] group-hover:text-[#2962FF] transition-colors">
                        {item.symbol}
                      </span>
                      <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#ebedfa] text-[#0049db]">
                        {item.type}
                      </span>
                    </div>
                    <div className="text-xs text-[#787B86] truncate max-w-xs">{item.name}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-sm text-[#131722] tabular-nums">
                    {item.price > 1000 ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : item.price.toFixed(2)}
                  </div>
                  <div
                    className={`text-xs font-semibold tabular-nums ${
                      item.changePercent >= 0 ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {item.changePercent >= 0 ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#FAF9FF] border-t border-[#E0E3EB] text-[11px] text-[#787B86] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Navigation: <kbd className="bg-white border px-1 rounded">↑</kbd> <kbd className="bg-white border px-1 rounded">↓</kbd></span>
            <span>Select: <kbd className="bg-white border px-1 rounded">Enter</kbd></span>
          </div>
          <span>TradingView Fast Telemetry Search</span>
        </div>
      </div>
    </div>
  );
};
