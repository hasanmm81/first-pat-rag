import React, { useState } from 'react';
import { HEATMAP_DATA, CRYPTO_ASSETS } from '../data/mockMarketData';
import { HeatmapItem } from '../types/market';

interface HeatmapScreenProps {
  onSelectSymbol: (symbol: string) => void;
  onOpenSupercharts: (symbol: string) => void;
}

export const HeatmapScreen: React.FC<HeatmapScreenProps> = ({
  onSelectSymbol,
  onOpenSupercharts
}) => {
  const [marketType, setMarketType] = useState<'stocks' | 'crypto'>('stocks');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [hoveredItem, setHoveredItem] = useState<HeatmapItem | null>(null);

  const sectors = ['All', 'Technology', 'Consumer Cyclical', 'Communication Services', 'Financial', 'Healthcare', 'Energy'];

  const displayedItems = marketType === 'stocks'
    ? (selectedSector === 'All' ? HEATMAP_DATA : HEATMAP_DATA.filter(i => i.sector === selectedSector))
    : CRYPTO_ASSETS.map(c => ({
        symbol: c.symbol,
        name: c.name,
        price: c.price,
        changePercent: c.changePercent,
        marketCapNumber: c.symbol === 'BTC/USD' ? 1720 : c.symbol === 'ETH/USD' ? 330 : 90,
        sector: 'Crypto Assets'
      }));

  // Helper function for tile background color
  const getTileBg = (pct: number) => {
    if (pct >= 3.0) return 'bg-[#089981] text-white';
    if (pct >= 1.0) return 'bg-[#089981]/80 text-white';
    if (pct > 0.0) return 'bg-[#089981]/50 text-white';
    if (pct === 0.0) return 'bg-[#787B86] text-white';
    if (pct > -1.0) return 'bg-[#F23645]/50 text-white';
    if (pct > -3.0) return 'bg-[#F23645]/80 text-white';
    return 'bg-[#F23645] text-white';
  };

  return (
    <div className="w-full max-w-[1380px] mx-auto px-4 lg:px-14 py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#131722] tracking-tight">Market Heatmaps</h1>
          <p className="text-sm text-[#787B86] mt-1">
            Visual treemap displaying capital allocation, sector breadth, and relative price performance.
          </p>
        </div>

        {/* Heatmap Type Toggle */}
        <div className="flex items-center gap-1 bg-[#F0F3FA] p-1 rounded-xl border border-[#E0E3EB]">
          <button
            onClick={() => setMarketType('stocks')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              marketType === 'stocks' ? 'bg-white text-[#131722] shadow-xs' : 'text-[#787B86]'
            }`}
          >
            S&amp;P 500 Equities
          </button>
          <button
            onClick={() => setMarketType('crypto')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              marketType === 'crypto' ? 'bg-white text-[#131722] shadow-xs' : 'text-[#787B86]'
            }`}
          >
            Crypto Ecosystem
          </button>
        </div>
      </div>

      {/* Sector filter tabs */}
      {marketType === 'stocks' && (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                selectedSector === sec
                  ? 'bg-[#131722] text-white border-[#131722]'
                  : 'bg-white text-[#787B86] border-[#E0E3EB] hover:bg-[#F0F3FA]'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      )}

      {/* Heatmap Legend */}
      <div className="flex items-center justify-between text-xs text-[#787B86] bg-white p-3 rounded-xl border border-[#E0E3EB]">
        <div className="flex items-center gap-2">
          <span>Performance Delta:</span>
          <div className="flex items-center gap-1">
            <span className="w-5 h-3.5 bg-[#F23645] rounded-xs inline-block" title="-3% or less"></span>
            <span className="text-[10px]">&lt;-3%</span>
            <span className="w-5 h-3.5 bg-[#F23645]/60 rounded-xs inline-block ml-1" title="-1% to 0%"></span>
            <span className="w-5 h-3.5 bg-[#787B86] rounded-xs inline-block ml-1" title="0%"></span>
            <span className="w-5 h-3.5 bg-[#089981]/60 rounded-xs inline-block ml-1" title="0% to +1%"></span>
            <span className="w-5 h-3.5 bg-[#089981] rounded-xs inline-block ml-1" title="+3% or more"></span>
            <span className="text-[10px] ml-1">&gt;+3%</span>
          </div>
        </div>
        <span className="hidden sm:inline">Tiles scaled by market capitalization</span>
      </div>

      {/* Treemap Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 bg-[#FAF9FF] p-4 rounded-3xl border border-[#E0E3EB] min-h-[460px]">
        {displayedItems.map((item) => {
          const isMega = item.marketCapNumber > 1500;
          return (
            <div
              key={item.symbol}
              onClick={() => onSelectSymbol(item.symbol)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`${
                isMega ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
              } ${getTileBg(item.changePercent)} rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] shadow-xs relative overflow-hidden group`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`font-extrabold ${isMega ? 'text-2xl' : 'text-base'} tracking-tight`}>
                    {item.symbol}
                  </span>
                  <span className="text-[10px] uppercase font-bold opacity-80">
                    {item.sector.split(' ')[0]}
                  </span>
                </div>
                <div className="text-xs opacity-90 truncate max-w-[140px] mt-0.5 font-medium">
                  {item.name}
                </div>
              </div>

              <div>
                <div className={`font-bold ${isMega ? 'text-xl' : 'text-sm'} tabular-nums`}>
                  ${item.price.toFixed(2)}
                </div>
                <div className="font-extrabold text-sm tabular-nums mt-0.5">
                  {item.changePercent >= 0 ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                </div>
              </div>

              {/* Direct chart shortcut hover button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenSupercharts(item.symbol);
                }}
                className="absolute top-2 right-2 p-1.5 bg-black/30 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="View Chart"
              >
                <span className="material-symbols-outlined text-[16px]">show_chart</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Hover Information Snapshot */}
      {hoveredItem && (
        <div className="p-4 bg-white rounded-2xl border border-[#E0E3EB] shadow-lg flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg text-[#131722]">{hoveredItem.symbol}</span>
            <span className="text-sm text-[#787B86]">{hoveredItem.name}</span>
            <span className="text-xs px-2 py-0.5 bg-[#F0F3FA] rounded-md font-semibold text-[#787B86]">
              {hoveredItem.sector}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-[#131722] tabular-nums">
              ${hoveredItem.price.toFixed(2)}
            </span>
            <span className={`text-sm font-bold tabular-nums ${hoveredItem.changePercent >= 0 ? 'text-[#089981]' : 'text-[#F23645]'}`}>
              {hoveredItem.changePercent >= 0 ? `+${hoveredItem.changePercent}%` : `${hoveredItem.changePercent}%`}
            </span>
            <button
              onClick={() => onOpenSupercharts(hoveredItem.symbol)}
              className="px-3 py-1 bg-[#0049db] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#2962FF]"
            >
              Open Supercharts
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
