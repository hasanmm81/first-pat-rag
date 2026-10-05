import React, { useState, useMemo } from 'react';
import { 
  MEGA_CAP_STOCKS, 
  WORLD_INDICES, 
  CRYPTO_ASSETS, 
  FUTURES_COMMODITIES, 
  FOREX_PAIRS, 
  POPULAR_ETFS, 
  GOVERNMENT_BONDS, 
  MOST_VOLATILE_STOCKS, 
  HIGHEST_VOLUME_STOCKS 
} from '../data/mockMarketData';
import { MarketAsset } from '../types/market';

interface ScreenerScreenProps {
  initialPreset?: string;
  onSelectSymbol: (symbol: string) => void;
  onOpenSupercharts: (symbol: string) => void;
}

export const ScreenerScreen: React.FC<ScreenerScreenProps> = ({
  initialPreset = 'all',
  onSelectSymbol,
  onOpenSupercharts
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Stocks' | 'Crypto' | 'Forex' | 'Futures' | 'ETFs'>('All');
  const [filterPreset, setFilterPreset] = useState(initialPreset);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'change' | 'volume' | 'price' | 'marketCap'>('change');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Compile combined dataset
  const combinedList: MarketAsset[] = useMemo(() => {
    const list: MarketAsset[] = [
      ...MEGA_CAP_STOCKS,
      ...WORLD_INDICES,
      ...CRYPTO_ASSETS,
      ...FUTURES_COMMODITIES,
      ...POPULAR_ETFS.map(e => ({
        symbol: e.symbol,
        name: e.name,
        category: 'etfs' as const,
        price: 432.50,
        change: 3.40,
        changePercent: e.changePercent,
        marketCap: e.desc,
        volume: '42.1M',
        sparkline: [428, 430, 432.50],
        rating: 'Buy' as const,
        range52wPct: 88
      })),
      ...MOST_VOLATILE_STOCKS.map(v => ({
        symbol: v.symbol,
        name: v.name,
        category: 'us-stocks' as const,
        price: v.price,
        change: Number((v.price * (v.changePercent / 100)).toFixed(2)),
        changePercent: v.changePercent,
        marketCap: '$1.4B',
        volume: '18.4M',
        sparkline: [v.price * 0.9, v.price],
        rating: 'Hold' as const,
        range52wPct: 45
      }))
    ];
    return list;
  }, []);

  const filteredAssets = useMemo(() => {
    return combinedList.filter((item) => {
      // Tab filter
      if (activeTab === 'Stocks' && item.category !== 'us-stocks' && item.category !== 'world-stocks') return false;
      if (activeTab === 'Crypto' && item.category !== 'crypto') return false;
      if (activeTab === 'Futures' && item.category !== 'futures') return false;
      if (activeTab === 'ETFs' && item.category !== 'etfs') return false;

      // Preset filter
      if (filterPreset === 'gainers' && item.changePercent <= 0) return false;
      if (filterPreset === 'losers' && item.changePercent >= 0) return false;
      if (filterPreset === 'volatile' && Math.abs(item.changePercent) < 3) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return item.symbol.toLowerCase().includes(q) || item.name.toLowerCase().includes(q);
      }
      return true;
    }).sort((a, b) => {
      let valA = a.changePercent;
      let valB = b.changePercent;

      if (sortBy === 'price') {
        valA = a.price;
        valB = b.price;
      }
      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });
  }, [combinedList, activeTab, filterPreset, searchQuery, sortBy, sortOrder]);

  const handleExportCSV = () => {
    const headers = 'Symbol,Name,Category,Price,ChangePct,Rating\n';
    const rows = filteredAssets.map(a => `"${a.symbol}","${a.name}","${a.category}",${a.price},${a.changePercent}%,"${a.rating || 'N/A'}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tradingview_screener_${activeTab.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-[1380px] mx-auto px-4 lg:px-14 py-8 flex flex-col gap-6">
      {/* Screener Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#131722] tracking-tight">Market Screener</h1>
          <p className="text-sm text-[#787B86] mt-1">
            Real-time scanner filtering thousands of instruments across volume, volatility, fundamentals, and momentum.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-full border border-[#E0E3EB] bg-white hover:bg-[#F0F3FA] text-xs font-bold text-[#131722] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export CSV
          </button>
          <button
            onClick={() => onOpenSupercharts('NVDA')}
            className="px-4 py-2 rounded-full bg-[#0049db] hover:bg-[#2962FF] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            Open in Supercharts
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E0E3EB] p-4 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xs">
        {/* Asset Class Tabs */}
        <div className="flex items-center gap-1 bg-[#F0F3FA] p-1 rounded-xl w-full lg:w-auto overflow-x-auto scrollbar-none">
          {(['All', 'Stocks', 'Crypto', 'Futures', 'ETFs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab ? 'bg-white text-[#131722] shadow-xs' : 'text-[#787B86] hover:text-[#131722]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Instruments' },
            { id: 'gainers', label: 'Top Gainers' },
            { id: 'losers', label: 'Top Losers' },
            { id: 'volatile', label: 'High Volatility' }
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => setFilterPreset(preset.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                filterPreset === preset.id
                  ? 'bg-[#131722] text-white border-[#131722]'
                  : 'bg-white text-[#787B86] border-[#E0E3EB] hover:bg-[#F0F3FA]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full lg:w-64 relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#787B86] text-[18px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter symbols..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F0F3FA] rounded-xl border border-transparent focus:border-[#2962FF] outline-hidden text-[#131722]"
          />
        </div>
      </div>

      {/* Screener Data Table */}
      <div className="bg-white rounded-2xl border border-[#E0E3EB] shadow-xs overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FAF9FF] text-[#787B86] text-[11px] font-semibold uppercase border-b border-[#E0E3EB]">
                <th className="py-3 px-4">Symbol / Name</th>
                <th 
                  className="py-3 px-4 text-right cursor-pointer hover:text-[#131722]"
                  onClick={() => {
                    setSortBy('price');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                >
                  Price {sortBy === 'price' && (sortOrder === 'desc' ? '↓' : '↑')}
                </th>
                <th 
                  className="py-3 px-4 text-right cursor-pointer hover:text-[#131722]"
                  onClick={() => {
                    setSortBy('change');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                >
                  24h Change {sortBy === 'change' && (sortOrder === 'desc' ? '↓' : '↑')}
                </th>
                <th className="py-3 px-4 text-right hidden md:table-cell">Volume</th>
                <th className="py-3 px-4 text-right hidden lg:table-cell">Market Cap</th>
                <th className="py-3 px-4 text-center hidden sm:table-cell">52W Range</th>
                <th className="py-3 px-4 text-center">Technical Rating</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB]/60 text-sm">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#787B86]">
                    No instruments match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => {
                  const isUp = asset.changePercent >= 0;
                  return (
                    <tr
                      key={asset.symbol}
                      className="hover:bg-[#F0F3FA] transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4" onClick={() => onSelectSymbol(asset.symbol)}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#FAF9FF] border border-[#E0E3EB] flex items-center justify-center font-bold text-xs text-[#131722]">
                            {asset.symbol.slice(0, 3)}
                          </div>
                          <div>
                            <div className="font-bold text-[#131722] group-hover:text-[#0049db] transition-colors">
                              {asset.symbol}
                            </div>
                            <div className="text-xs text-[#787B86] truncate max-w-[180px]">{asset.name}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold text-[#131722] tabular-nums" onClick={() => onSelectSymbol(asset.symbol)}>
                        ${asset.price > 1000 ? asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : asset.price.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4 text-right" onClick={() => onSelectSymbol(asset.symbol)}>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold tabular-nums inline-block ${
                          isUp ? 'bg-[#E8F5F2] text-[#089981]' : 'bg-[#FDECEE] text-[#F23645]'
                        }`}>
                          {isUp ? `+${asset.changePercent.toFixed(2)}%` : `${asset.changePercent.toFixed(2)}%`}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right text-xs text-[#787B86] tabular-nums hidden md:table-cell" onClick={() => onSelectSymbol(asset.symbol)}>
                        {asset.volume || '18.4M'}
                      </td>

                      <td className="py-3.5 px-4 text-right text-xs text-[#787B86] tabular-nums hidden lg:table-cell" onClick={() => onSelectSymbol(asset.symbol)}>
                        {asset.marketCap || '$210B'}
                      </td>

                      <td className="py-3.5 px-4 text-center hidden sm:table-cell" onClick={() => onSelectSymbol(asset.symbol)}>
                        <div className="w-24 h-2 bg-[#F0F3FA] rounded-full overflow-hidden inline-block align-middle border border-[#E0E3EB]">
                          <div 
                            className="bg-[#0049db] h-full rounded-full" 
                            style={{ width: `${asset.range52wPct || 75}%` }} 
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center" onClick={() => onSelectSymbol(asset.symbol)}>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          (asset.rating || 'Buy').includes('Buy')
                            ? 'bg-[#E8F5F2] text-[#089981]'
                            : 'bg-[#F0F3FA] text-[#787B86]'
                        }`}>
                          {asset.rating || 'Neutral'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenSupercharts(asset.symbol);
                          }}
                          className="p-1.5 rounded-lg text-[#0049db] hover:bg-[#ebedfa] transition-colors"
                          title="Open Chart"
                        >
                          <span className="material-symbols-outlined text-[20px]">candlestick_chart</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer info */}
        <div className="p-4 bg-[#FAF9FF] border-t border-[#E0E3EB] flex items-center justify-between text-xs text-[#787B86]">
          <span>Displaying {filteredAssets.length} verified market assets</span>
          <span>Latency: Real-time institutional telemetry</span>
        </div>
      </div>
    </div>
  );
};
