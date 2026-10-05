import React, { useState } from 'react';
import { 
  MAJOR_INDICES, 
  WORLD_INDICES, 
  MEGA_CAP_STOCKS, 
  HIGHEST_VOLUME_STOCKS, 
  MOST_VOLATILE_STOCKS, 
  EARNINGS_CALENDAR, 
  CRYPTO_ASSETS, 
  FUTURES_COMMODITIES, 
  FOREX_PAIRS, 
  CURRENCY_INDICES, 
  GOVERNMENT_BONDS, 
  CORPORATE_BONDS, 
  POPULAR_ETFS, 
  ECONOMIC_PULSE 
} from '../data/mockMarketData';
import { MarketAsset, AssetCategory } from '../types/market';

interface MarketsOverviewProps {
  onSelectSymbol: (symbol: string) => void;
  onOpenSupercharts: (symbol?: string) => void;
  onOpenScreener: (filterPreset?: string) => void;
  onOpenHeatmaps: () => void;
  onOpenCalendar: () => void;
}

export const MarketsOverview: React.FC<MarketsOverviewProps> = ({
  onSelectSymbol,
  onOpenSupercharts,
  onOpenScreener,
  onOpenHeatmaps,
  onOpenCalendar
}) => {
  const [activeCategory, setActiveCategory] = useState<AssetCategory>('indices');
  const [usStockTab, setUsStockTab] = useState<'mega' | 'active' | 'gainers'>('mega');
  const [perspective, setPerspective] = useState('Markets, everywhere');
  const [showPerspectiveMenu, setShowPerspectiveMenu] = useState(false);

  const categories: { id: AssetCategory; label: string }[] = [
    { id: 'indices', label: 'Indices' },
    { id: 'us-stocks', label: 'US stocks' },
    { id: 'world-stocks', label: 'World stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'futures', label: 'Futures' },
    { id: 'forex', label: 'Forex' },
    { id: 'gov-bonds', label: 'Government bonds' },
    { id: 'corp-bonds', label: 'Corporate bonds' },
    { id: 'etfs', label: 'ETFs' },
    { id: 'economy', label: 'Economy' }
  ];

  const handleCategoryClick = (catId: AssetCategory) => {
    setActiveCategory(catId);
    const element = document.getElementById(`sec-${catId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Sub-Header Title Area */}
      <section className="w-full max-w-[1380px] mx-auto px-4 lg:px-14 pt-8 pb-4">
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <div className="relative inline-block">
            <button 
              onClick={() => setShowPerspectiveMenu(!showPerspectiveMenu)}
              className="inline-flex items-center gap-2 cursor-pointer group"
            >
              <h1 className="text-[38px] sm:text-[52px] font-extrabold text-[#131722] tracking-tight group-hover:text-[#0049db] transition-colors">
                {perspective}
              </h1>
              <span className="material-symbols-outlined text-[32px] sm:text-[38px] text-[#131722] group-hover:translate-y-1 transition-transform">
                keyboard_arrow_down
              </span>
            </button>

            {showPerspectiveMenu && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E0E3EB] py-2 z-40 text-left">
                {[
                  'Markets, everywhere',
                  'US Equities & Mega-Tech',
                  'Global Macro & Yields',
                  'Crypto & Digital Assets',
                  'Commodities & Energy'
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setPerspective(item);
                      setShowPerspectiveMenu(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm font-semibold text-left transition-colors flex items-center justify-between ${
                      perspective === item ? 'bg-[#2962FF]/10 text-[#2962FF]' : 'text-[#131722] hover:bg-[#F0F3FA]'
                    }`}
                  >
                    <span>{item}</span>
                    {perspective === item && (
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-[15px] sm:text-[17px] text-[#787B86] max-w-xl font-normal leading-relaxed">
            High-velocity institutional intelligence, real-time telemetry, and panoramic cross-asset flow.
          </p>
        </div>

        {/* Category Pill Strip */}
        <div className="w-full flex items-center justify-center mt-6">
          <div className="flex items-center gap-1.5 p-1 bg-[#F0F3FA] rounded-full overflow-x-auto max-w-full shadow-inner scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-4 py-2 rounded-full text-[14px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#131722] text-white shadow-sm'
                    : 'text-[#131722] hover:bg-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="w-full max-w-[1380px] mx-auto px-4 lg:px-14 py-8 flex flex-col gap-14">
        {/* 1. INDICES SECTION */}
        <section className="flex flex-col gap-6" id="sec-indices">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 group cursor-pointer" onClick={() => onSelectSymbol('SPX')}>
              <h2 className="text-2xl sm:text-[28px] font-bold text-[#131722] group-hover:text-[#0049db] transition-colors">
                Indices
              </h2>
              <span className="material-symbols-outlined text-[24px] text-[#131722] group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button className="px-3 py-1 rounded-full bg-[#F0F3FA] text-[11px] font-bold text-[#787B86] hover:text-[#131722]">
                Overview
              </button>
              <button 
                onClick={onOpenHeatmaps}
                className="px-3 py-1 rounded-full hover:bg-[#F0F3FA] text-[11px] font-bold text-[#787B86] hover:text-[#131722] cursor-pointer"
              >
                Major Heatmap
              </button>
              <button 
                onClick={() => onOpenScreener('indices')}
                className="text-[13px] text-[#0049db] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                See all major indices
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Hero Index Cards (S&P 500, Nasdaq 100, Dow 30, US 2000) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MAJOR_INDICES.map((idx) => {
              const isUp = idx.changePercent >= 0;
              return (
                <div
                  key={idx.symbol}
                  onClick={() => onSelectSymbol(idx.symbol)}
                  className="bg-[#F0F3FA] hover:bg-[#ebedfa] rounded-2xl p-5 flex flex-col justify-between transition-all cursor-pointer shadow-xs hover:shadow-md group border border-transparent hover:border-[#E0E3EB]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-xs"
                        style={{ backgroundColor: idx.badgeBg }}
                      >
                        {idx.badgeText}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[17px] font-bold text-[#131722] group-hover:text-[#0049db] transition-colors leading-tight">
                          {idx.name}
                        </span>
                        <span className="text-[11px] font-semibold uppercase text-[#787B86] mt-0.5">
                          {idx.subtext}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-[#787B86] opacity-0 group-hover:opacity-100 transition-opacity">
                      insights
                    </span>
                  </div>

                  {/* Sparkline */}
                  <div className="my-4">
                    <svg className={`w-full h-12 ${isUp ? 'text-[#089981]' : 'text-[#F23645]'}`} fill="none" viewBox="0 0 160 48">
                      <path 
                        d={isUp 
                          ? "M0 38 Q 30 35, 60 22 T 110 26 T 160 8" 
                          : "M0 12 Q 35 15, 75 32 T 120 28 T 160 40"
                        } 
                        fill="none" 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeWidth="2.5"
                      />
                      <path 
                        d={isUp 
                          ? "M0 38 Q 30 35, 60 22 T 110 26 T 160 8 L 160 48 L 0 48 Z" 
                          : "M0 12 Q 35 15, 75 32 T 120 28 T 160 40 L 160 48 L 0 48 Z"
                        } 
                        fill="currentColor" 
                        fillOpacity="0.08"
                      />
                    </svg>
                  </div>

                  <div className="flex items-baseline justify-between pt-2">
                    <span className="text-2xl font-bold text-[#131722] tabular-nums">
                      {idx.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tabular-nums ${
                      isUp ? 'bg-[#E8F5F2] text-[#089981]' : 'bg-[#FDECEE] text-[#F23645]'
                    }`}>
                      <span className="material-symbols-outlined text-[14px]">
                        {isUp ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                      <span>{isUp ? `+${idx.changePercent}%` : `${idx.changePercent}%`}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* World Indices Table & Mini Technical Gauge */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2" id="sec-world-stocks">
            {/* Table (2 cols on lg) */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xs border border-[#E0E3EB] p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#131722]">public</span>
                  <h3 className="text-lg font-bold text-[#131722]">World indices</h3>
                </div>
                <span className="text-[11px] font-bold text-[#787B86] uppercase tracking-wider">
                  STREAMING REAL-TIME
                </span>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[#787B86] text-[11px] font-semibold uppercase border-b border-[#E0E3EB]">
                      <th className="py-2.5 px-3">Index Symbol</th>
                      <th className="py-2.5 px-3">Country</th>
                      <th className="py-2.5 px-3 text-right">Last Price</th>
                      <th className="py-2.5 px-3 text-right">Chg %</th>
                      <th className="py-2.5 px-3 text-right hidden sm:table-cell">52W Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0E3EB]/60 text-sm">
                    {WORLD_INDICES.map((idx) => {
                      const isUp = idx.changePercent >= 0;
                      return (
                        <tr
                          key={idx.symbol}
                          onClick={() => onSelectSymbol(idx.symbol)}
                          className="hover:bg-[#F0F3FA] transition-colors cursor-pointer group"
                        >
                          <td className="py-3 px-3 flex items-center gap-2">
                            <span className="font-bold text-[#131722] group-hover:text-[#0049db]">
                              {idx.symbol}
                            </span>
                            <span className="text-xs text-[#787B86] truncate max-w-[120px]">
                              {idx.name}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-xs text-[#787B86]">{idx.country}</td>
                          <td className="py-3 px-3 text-right font-semibold text-[#131722] tabular-nums">
                            {idx.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold tabular-nums inline-block ${
                              isUp ? 'bg-[#E8F5F2] text-[#089981]' : 'bg-[#FDECEE] text-[#F23645]'
                            }`}>
                              {isUp ? `+${idx.changePercent}%` : `${idx.changePercent}%`}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right hidden sm:table-cell">
                            <div className="w-24 h-1.5 bg-[#F0F3FA] rounded-full overflow-hidden inline-block align-middle border border-[#E0E3EB]">
                              <div
                                className="bg-[#0049db] h-full rounded-full"
                                style={{ width: `${idx.range52wPct}%` }}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Global Sentiment Fear & Greed Card */}
            <div className="bg-[#F0F3FA] rounded-2xl p-6 flex flex-col justify-between border border-[#E0E3EB]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-[#131722]">Global Sentiment</span>
                  <span className="text-xs font-bold bg-[#E8F5F2] text-[#089981] px-2.5 py-0.5 rounded-full">
                    Greed (68)
                  </span>
                </div>
                <p className="text-xs text-[#787B86] leading-relaxed mb-6">
                  Aggregate breadth across 34 global exchanges displays sustained risk-on bias driven by mega-cap tech expansion and stabilized central bank expectations.
                </p>

                {/* Gauge Visual */}
                <div className="flex flex-col items-center justify-center my-2">
                  <svg className="w-52 h-28" viewBox="0 0 200 100">
                    <path
                      d="M 20 90 A 80 80 0 0 1 180 90"
                      fill="none"
                      stroke="#E0E3EB"
                      strokeLinecap="round"
                      strokeWidth="16"
                    />
                    <path
                      d="M 20 90 A 80 80 0 0 1 145 32"
                      fill="none"
                      stroke="#089981"
                      strokeLinecap="round"
                      strokeWidth="16"
                    />
                    <circle cx="100" cy="90" fill="#131722" r="6" />
                    <line
                      stroke="#131722"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                      x1="100"
                      x2="135"
                      y1="90"
                      y2="40"
                    />
                  </svg>
                  <div className="flex justify-between w-full px-2 text-[#787B86] text-[11px] font-semibold mt-1">
                    <span>Extreme Fear</span>
                    <span>Neutral</span>
                    <span>Extreme Greed</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3.5 flex items-center justify-between mt-4 shadow-xs border border-[#E0E3EB]">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#089981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#089981]"></span>
                  </span>
                  <span className="text-xs font-bold text-[#131722]">Market Bell Status</span>
                </div>
                <span className="text-xs font-bold text-[#089981]">NYSE OPEN</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. US STOCKS SECTION */}
        <section className="flex flex-col gap-6 pt-4" id="sec-us-stocks">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 group cursor-pointer" onClick={() => onSelectSymbol('NVDA')}>
              <h2 className="text-2xl sm:text-[28px] font-bold text-[#131722] group-hover:text-[#0049db] transition-colors">
                US stocks
              </h2>
              <span className="material-symbols-outlined text-[24px] text-[#131722] group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setUsStockTab('mega')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  usStockTab === 'mega' ? 'bg-[#131722] text-white' : 'hover:bg-[#F0F3FA] text-[#131722]'
                }`}
              >
                Mega Caps
              </button>
              <button 
                onClick={() => setUsStockTab('active')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  usStockTab === 'active' ? 'bg-[#131722] text-white' : 'hover:bg-[#F0F3FA] text-[#131722]'
                }`}
              >
                Most Active
              </button>
              <button 
                onClick={() => setUsStockTab('gainers')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  usStockTab === 'gainers' ? 'bg-[#131722] text-white' : 'hover:bg-[#F0F3FA] text-[#131722]'
                }`}
              >
                Top Gainers
              </button>
            </div>
          </div>

          {/* Mega Cap Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {MEGA_CAP_STOCKS.map((stock) => {
              const isUp = stock.changePercent >= 0;
              return (
                <div
                  key={stock.symbol}
                  onClick={() => onSelectSymbol(stock.symbol)}
                  className="bg-[#F0F3FA] hover:bg-[#ebedfa] p-4 rounded-2xl cursor-pointer transition-all flex flex-col justify-between group border border-transparent hover:border-[#E0E3EB] shadow-xs"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                      style={{ 
                        backgroundColor: `${stock.badgeBg}20`, 
                        color: stock.badgeBg 
                      }}
                    >
                      {stock.badgeText}
                    </div>
                    <span className="text-[10px] font-bold text-[#787B86] uppercase">NASDAQ</span>
                  </div>

                  <div>
                    <div className="font-bold text-sm text-[#131722] group-hover:text-[#0049db] transition-colors truncate">
                      {stock.name.split(' ')[0]}
                    </div>
                    <div className="text-sm font-bold text-[#131722] mt-0.5 tabular-nums">
                      ${stock.price.toFixed(2)}
                    </div>
                    <div className={`text-xs font-bold mt-1 flex items-center gap-0.5 tabular-nums ${
                      isUp ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}>
                      <span>{isUp ? `+${stock.changePercent}%` : `${stock.changePercent}%`}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3-Column Stock Submodules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {/* Highest Volume Stocks */}
            <div className="bg-white rounded-2xl shadow-xs border border-[#E0E3EB] p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#131722]">Highest volume stocks</h3>
                  <button onClick={() => onOpenScreener('volume')} className="text-xs text-[#0049db] font-bold hover:underline">
                    See all
                  </button>
                </div>

                <div className="flex flex-col divide-y divide-[#E0E3EB]/60">
                  {HIGHEST_VOLUME_STOCKS.map((s) => {
                    const isUp = s.changePercent >= 0;
                    return (
                      <div
                        key={s.symbol}
                        onClick={() => onSelectSymbol(s.symbol)}
                        className="py-2.5 flex items-center justify-between hover:bg-[#F0F3FA] px-2 rounded-lg transition-colors cursor-pointer group"
                      >
                        <div>
                          <div className="font-bold text-sm text-[#131722] group-hover:text-[#0049db]">
                            {s.symbol}
                          </div>
                          <div className="text-xs text-[#787B86]">{s.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-[#131722] tabular-nums">{s.volume}</div>
                          <div className={`text-xs font-bold tabular-nums ${isUp ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                            {isUp ? `+${s.changePercent}%` : `${s.changePercent}%`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => onOpenScreener('volume')}
                className="w-full mt-4 py-2 bg-[#F0F3FA] hover:bg-[#ebedfa] rounded-full text-xs font-bold text-[#131722] transition-colors text-center cursor-pointer border border-[#E0E3EB]"
              >
                Open Market Movers Screener
              </button>
            </div>

            {/* Most Volatile Stocks */}
            <div className="bg-white rounded-2xl shadow-xs border border-[#E0E3EB] p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#131722]">Most volatile stocks</h3>
                  <button onClick={() => onOpenScreener('volatile')} className="text-xs text-[#0049db] font-bold hover:underline">
                    See all
                  </button>
                </div>

                <div className="flex flex-col divide-y divide-[#E0E3EB]/60">
                  {MOST_VOLATILE_STOCKS.map((s) => {
                    const isUp = s.changePercent >= 0;
                    return (
                      <div
                        key={s.symbol}
                        onClick={() => onSelectSymbol(s.symbol)}
                        className="py-2.5 flex items-center justify-between hover:bg-[#F0F3FA] px-2 rounded-lg transition-colors cursor-pointer group"
                      >
                        <div>
                          <div className="font-bold text-sm text-[#131722] group-hover:text-[#0049db]">
                            {s.symbol}
                          </div>
                          <div className="text-xs text-[#787B86]">{s.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-[#131722] tabular-nums">${s.price.toFixed(2)}</div>
                          <div className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block tabular-nums ${
                            isUp ? 'bg-[#E8F5F2] text-[#089981]' : 'bg-[#FDECEE] text-[#F23645]'
                          }`}>
                            {isUp ? `+${s.changePercent}%` : `${s.changePercent}%`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => onOpenScreener('volatile')}
                className="w-full mt-4 py-2 bg-[#F0F3FA] hover:bg-[#ebedfa] rounded-full text-xs font-bold text-[#131722] transition-colors text-center cursor-pointer border border-[#E0E3EB]"
              >
                View Volatility Scanner
              </button>
            </div>

            {/* Earnings Calendar */}
            <div className="bg-white rounded-2xl shadow-xs border border-[#E0E3EB] p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#131722]">Earnings Calendar</h3>
                  <button onClick={onOpenCalendar} className="text-xs text-[#0049db] font-bold hover:underline">
                    See all
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {EARNINGS_CALENDAR.slice(0, 3).map((e) => (
                    <div
                      key={e.symbol}
                      onClick={() => onSelectSymbol(e.symbol)}
                      className="p-2.5 bg-[#F0F3FA] rounded-xl flex items-center justify-between hover:bg-[#ebedfa] transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${
                            e.timingLabel === 'Today' ? 'bg-[#0049db]' : 'bg-[#787B86]'
                          }`}>
                            {e.timingLabel === 'Today' ? 'TODAY' : 'TMRW'}
                          </span>
                          <span className="font-bold text-sm text-[#131722]">{e.symbol}</span>
                        </div>
                        <div className="text-xs text-[#787B86] mt-0.5">{e.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-semibold text-[#787B86] uppercase">EST EPS</div>
                        <div className={`text-xs font-bold tabular-nums ${e.estimatedEps.startsWith('-') ? 'text-[#F23645]' : 'text-[#131722]'}`}>
                          {e.estimatedEps}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-[#E0E3EB]">
                <span className="text-xs text-[#787B86]">Next IPO: Armada (XRPN)</span>
                <button onClick={onOpenCalendar} className="text-xs text-[#0049db] font-bold hover:underline cursor-pointer">
                  IPO Tracker
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CRYPTO & COMMODITIES MULTI-ASSET MATRIX */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4" id="sec-crypto">
          {/* Crypto Panel */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 group cursor-pointer" onClick={() => onSelectSymbol('BTC/USD')}>
                <h2 className="text-2xl sm:text-[28px] font-bold text-[#131722] group-hover:text-[#0049db] transition-colors">
                  Crypto
                </h2>
                <span className="material-symbols-outlined text-[24px] text-[#131722] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>
              <span className="text-xs font-semibold text-[#787B86]">Market Cap: $3.24T</span>
            </div>

            <div className="bg-white rounded-2xl shadow-xs border border-[#E0E3EB] p-5 flex flex-col gap-3">
              {/* Top Row Large Tickers */}
              <div className="grid grid-cols-2 gap-3 pb-2">
                <div
                  onClick={() => onSelectSymbol('BTC/USD')}
                  className="p-4 bg-[#F0F3FA] rounded-xl cursor-pointer hover:bg-[#ebedfa] transition-all border border-transparent hover:border-[#E0E3EB]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#131722]">Bitcoin</span>
                    <span className="text-xs text-[#787B86] font-semibold">BTC</span>
                  </div>
                  <div className="text-xl font-extrabold text-[#131722] mt-2 tabular-nums">$94,310.00</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-[#089981] tabular-nums">+3.14%</span>
                    <span className="text-[11px] text-[#787B86]">Cap $1.72T</span>
                  </div>
                </div>

                <div
                  onClick={() => onSelectSymbol('ETH/USD')}
                  className="p-4 bg-[#F0F3FA] rounded-xl cursor-pointer hover:bg-[#ebedfa] transition-all border border-transparent hover:border-[#E0E3EB]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#131722]">Ethereum</span>
                    <span className="text-xs text-[#787B86] font-semibold">ETH</span>
                  </div>
                  <div className="text-xl font-extrabold text-[#131722] mt-2 tabular-nums">$3,480.20</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-[#089981] tabular-nums">+2.45%</span>
                    <span className="text-[11px] text-[#787B86]">Cap $329.6B</span>
                  </div>
                </div>
              </div>

              {/* Secondary Crypto List */}
              <div className="flex flex-col divide-y divide-[#E0E3EB]/60">
                {CRYPTO_ASSETS.slice(2, 6).map((coin) => {
                  const isUp = coin.changePercent > 0;
                  return (
                    <div
                      key={coin.symbol}
                      onClick={() => onSelectSymbol(coin.symbol)}
                      className="py-2.5 flex items-center justify-between hover:bg-[#F0F3FA] px-2 rounded-lg transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#131722] text-white text-[10px] font-bold flex items-center justify-center">
                          {coin.symbol[0]}
                        </span>
                        <span className="font-bold text-sm text-[#131722] group-hover:text-[#0049db]">
                          {coin.name}
                        </span>
                        <span className="text-xs text-[#787B86] font-semibold">{coin.symbol}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#131722] tabular-nums">
                          ${coin.price.toFixed(coin.price < 2 ? 3 : 2)}
                        </span>
                        <span className={`text-xs font-bold ml-2 tabular-nums ${
                          isUp ? 'text-[#089981]' : coin.changePercent === 0 ? 'text-[#787B86]' : 'text-[#F23645]'
                        }`}>
                          {coin.changePercent >= 0 ? `+${coin.changePercent.toFixed(2)}%` : `${coin.changePercent.toFixed(2)}%`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => onOpenScreener('crypto')}
                className="text-xs text-[#0049db] font-bold hover:underline text-center pt-2 cursor-pointer"
              >
                See all crypto coins &amp; screener →
              </button>
            </div>
          </div>

          {/* Futures & Commodities Panel */}
          <div className="flex flex-col gap-4" id="sec-futures">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 group cursor-pointer" onClick={() => onSelectSymbol('GC1!')}>
                <h2 className="text-2xl sm:text-[28px] font-bold text-[#131722] group-hover:text-[#0049db] transition-colors">
                  Futures and commodities
                </h2>
                <span className="material-symbols-outlined text-[24px] text-[#131722] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>
              <span className="text-xs font-semibold text-[#787B86]">CME / COMEX / NYMEX</span>
            </div>

            <div className="bg-white rounded-2xl shadow-xs border border-[#E0E3EB] p-5 flex flex-col justify-between h-full">
              <div className="grid grid-cols-2 gap-3 pb-3">
                {/* Gold */}
                <div
                  onClick={() => onSelectSymbol('GC1!')}
                  className="p-4 bg-[#F0F3FA] rounded-xl cursor-pointer hover:bg-[#ebedfa] transition-all border border-transparent hover:border-[#E0E3EB]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#131722]">Gold</span>
                    <span className="text-xs text-[#787B86] font-semibold">GC1!</span>
                  </div>
                  <div className="text-xl font-extrabold text-[#131722] mt-2 tabular-nums">2,682.40 USD</div>
                  <div className="text-xs font-bold text-[#089981] mt-1 tabular-nums">+0.61%</div>
                </div>

                {/* Light Crude */}
                <div
                  onClick={() => onSelectSymbol('CL1!')}
                  className="p-4 bg-[#F0F3FA] rounded-xl cursor-pointer hover:bg-[#ebedfa] transition-all border border-transparent hover:border-[#E0E3EB]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#131722]">Light Crude</span>
                    <span className="text-xs text-[#787B86] font-semibold">CL1!</span>
                  </div>
                  <div className="text-xl font-extrabold text-[#131722] mt-2 tabular-nums">68.42 USD</div>
                  <div className="text-xs font-bold text-[#F23645] mt-1 tabular-nums">-1.24%</div>
                </div>
              </div>

              <div className="flex flex-col divide-y divide-[#E0E3EB]/60">
                {FUTURES_COMMODITIES.slice(2, 6).map((fut) => {
                  const isUp = fut.changePercent >= 0;
                  return (
                    <div
                      key={fut.symbol}
                      onClick={() => onSelectSymbol(fut.symbol)}
                      className="py-2.5 flex items-center justify-between hover:bg-[#F0F3FA] px-2 rounded-lg transition-colors cursor-pointer group"
                    >
                      <div>
                        <span className="font-bold text-sm text-[#131722] group-hover:text-[#0049db]">
                          {fut.name} ({fut.symbol})
                        </span>
                        <span className="text-xs text-[#787B86] block">{fut.subtext}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#131722] tabular-nums">
                          {fut.price.toFixed(3)} USD
                        </span>
                        <span className={`text-xs font-bold ml-2 tabular-nums ${isUp ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                          {isUp ? `+${fut.changePercent}%` : `${fut.changePercent}%`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => onOpenScreener('futures')}
                className="text-xs text-[#0049db] font-bold hover:underline text-center pt-2 cursor-pointer"
              >
                See all energy, metals &amp; agricultural futures →
              </button>
            </div>
          </div>
        </section>

        {/* 4. FOREX & GOVERNMENT BONDS (YIELD CURVE) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4" id="sec-forex">
          {/* Forex and Currencies */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 group cursor-pointer" onClick={() => onSelectSymbol('EURUSD')}>
                <h2 className="text-2xl sm:text-[28px] font-bold text-[#131722] group-hover:text-[#0049db] transition-colors">
                  Forex and currencies
                </h2>
                <span className="material-symbols-outlined text-[24px] text-[#131722] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>
              <span className="text-xs font-semibold text-[#787B86]">FX Majors</span>
            </div>

            <div className="bg-white rounded-2xl shadow-xs border border-[#E0E3EB] p-5 flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2 pb-2">
                {CURRENCY_INDICES.map((idx) => {
                  const isUp = idx.changePercent >= 0;
                  return (
                    <div key={idx.symbol} className="p-3 bg-[#F0F3FA] rounded-xl text-center">
                      <span className="text-[11px] font-semibold text-[#787B86]">
                        {idx.symbol} ({idx.name.split(' ')[0]})
                      </span>
                      <div className="text-base font-bold text-[#131722] mt-1 tabular-nums">
                        {idx.price.toFixed(2)}
                      </div>
                      <span className={`text-[11px] font-bold tabular-nums ${isUp ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                        {isUp ? `+${idx.changePercent}%` : `${idx.changePercent}%`}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col divide-y divide-[#E0E3EB]/60">
                {FOREX_PAIRS.slice(0, 4).map((fx) => {
                  const isUp = fx.changePercent >= 0;
                  return (
                    <div
                      key={fx.symbol}
                      onClick={() => onSelectSymbol(fx.symbol)}
                      className="py-2.5 flex items-center justify-between hover:bg-[#F0F3FA] px-2 rounded-lg transition-colors cursor-pointer group"
                    >
                      <span className="font-bold text-sm text-[#131722] group-hover:text-[#0049db]">
                        {fx.name}
                      </span>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#131722] tabular-nums">
                          {fx.price.toFixed(4)}
                        </span>
                        <span className={`text-xs font-bold ml-2 tabular-nums ${isUp ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                          {isUp ? `+${fx.changePercent}%` : `${fx.changePercent}%`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => onOpenScreener('forex')}
                className="text-xs text-[#0049db] font-bold hover:underline text-center pt-2 cursor-pointer"
              >
                See all major forex pairs &amp; crosses →
              </button>
            </div>
          </div>

          {/* Government Bonds & Yield Curve */}
          <div className="flex flex-col gap-4" id="sec-gov-bonds">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 group cursor-pointer" onClick={() => onSelectSymbol('US10Y')}>
                <h2 className="text-2xl sm:text-[28px] font-bold text-[#131722] group-hover:text-[#0049db] transition-colors">
                  Government bonds
                </h2>
                <span className="material-symbols-outlined text-[24px] text-[#131722] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>
              <span className="text-xs font-semibold text-[#787B86]">US Yield Curve</span>
            </div>

            <div className="bg-white rounded-2xl shadow-xs border border-[#E0E3EB] p-5 flex flex-col justify-between">
              {/* Yield Curve SVG */}
              <div className="bg-[#F0F3FA] rounded-xl p-4 mb-3 border border-[#E0E3EB]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-[#131722]">US Treasury Yield Curve</span>
                  <span className="text-[10px] font-bold text-[#787B86] uppercase tracking-wider">
                    INVERTED 2Y-10Y FLATTENING
                  </span>
                </div>

                <div className="w-full h-20 pt-2">
                  <svg className="w-full h-full text-[#0049db]" fill="none" viewBox="0 0 300 70">
                    <path
                      d="M 10 50 C 60 25, 120 18, 180 20 C 240 22, 270 12, 290 8"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    />
                    <circle cx="10" cy="50" fill="currentColor" r="4" />
                    <circle cx="70" cy="28" fill="currentColor" r="4" />
                    <circle cx="140" cy="19" fill="currentColor" r="4" />
                    <circle cx="210" cy="21" fill="currentColor" r="4" />
                    <circle cx="290" cy="8" fill="currentColor" r="4" />
                  </svg>
                </div>

                <div className="flex justify-between text-[#787B86] text-[11px] font-semibold px-1">
                  <span>1M</span>
                  <span>2Y</span>
                  <span>5Y</span>
                  <span>10Y</span>
                  <span>30Y</span>
                </div>
              </div>

              {/* US Treasuries List */}
              <div className="flex flex-col divide-y divide-[#E0E3EB]/60">
                {GOVERNMENT_BONDS.map((bond) => (
                  <div
                    key={bond.symbol}
                    onClick={() => onSelectSymbol(bond.symbol)}
                    className="py-2 flex items-center justify-between hover:bg-[#F0F3FA] px-2 rounded-lg transition-colors cursor-pointer group"
                  >
                    <span className="font-bold text-sm text-[#131722] group-hover:text-[#0049db]">
                      {bond.name}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-[#787B86] tabular-nums">{bond.price.toFixed(3)}</span>
                      <span className="text-xs font-bold text-[#131722] tabular-nums">{bond.yieldRate}</span>
                      <span className="text-xs font-bold text-[#089981] tabular-nums">+{bond.changePercent}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onOpenScreener('bonds')}
                className="text-xs text-[#0049db] font-bold hover:underline text-center pt-2 cursor-pointer"
              >
                See all sovereign debt &amp; international bonds →
              </button>
            </div>
          </div>
        </section>

        {/* 5. CORPORATE BONDS, ETFS & GLOBAL ECONOMY */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4" id="sec-corp-bonds">
          {/* Corporate Bonds */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#E0E3EB] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#131722]">Corporate bonds</h3>
                <span className="text-[10px] font-bold uppercase text-[#787B86] bg-[#F0F3FA] px-2 py-0.5 rounded-full">
                  HIGH YIELD
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {CORPORATE_BONDS.slice(0, 3).map((cb) => (
                  <div key={cb.name} className="p-2.5 bg-[#F0F3FA] rounded-xl hover:bg-[#ebedfa] transition-colors cursor-pointer">
                    <div className="font-bold text-sm text-[#131722]">{cb.name}</div>
                    <div className="flex items-center justify-between mt-1 text-xs text-[#787B86]">
                      <span>Coupon: {cb.coupon}</span>
                      <span className="font-bold text-[#131722]">Mat: {cb.maturity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenScreener('bonds')}
              className="text-xs text-[#0049db] font-bold hover:underline text-center pt-3 cursor-pointer"
            >
              Explore Corporate Debt Screener →
            </button>
          </div>

          {/* Popular ETFs */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#E0E3EB] p-5 flex flex-col justify-between" id="sec-etfs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#131722]">Popular ETFs</h3>
                <span className="text-[10px] font-bold uppercase text-[#787B86] bg-[#F0F3FA] px-2 py-0.5 rounded-full">
                  MOST TRADED
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {POPULAR_ETFS.slice(0, 3).map((etf) => (
                  <div
                    key={etf.symbol}
                    onClick={() => onSelectSymbol(etf.symbol)}
                    className="p-2.5 bg-[#F0F3FA] rounded-xl flex items-center justify-between hover:bg-[#ebedfa] transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#131722]">{etf.symbol} ({etf.name})</div>
                      <div className="text-xs text-[#787B86]">{etf.desc}</div>
                    </div>
                    <span className="text-xs font-bold text-[#089981] bg-[#E8F5F2] px-2 py-0.5 rounded-full tabular-nums">
                      +{etf.changePercent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenScreener('etfs')}
              className="text-xs text-[#0049db] font-bold hover:underline text-center pt-3 cursor-pointer"
            >
              Explore ETF Screener &amp; Flows →
            </button>
          </div>

          {/* Economic Pulse */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#E0E3EB] p-5 flex flex-col justify-between" id="sec-economy">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#131722]">Economic Pulse</h3>
                <span className="text-[10px] font-bold uppercase text-[#787B86] bg-[#F0F3FA] px-2 py-0.5 rounded-full">
                  KEY INDICATORS
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                {ECONOMIC_PULSE.map((ep) => (
                  <div key={ep.label} className="p-2.5 bg-[#F0F3FA] rounded-xl">
                    <span className="text-[11px] font-semibold text-[#787B86]">{ep.label}</span>
                    <div className="text-base font-bold text-[#131722] mt-1 tabular-nums">{ep.value}</div>
                    <span className="text-[10px] text-[#787B86] block mt-0.5">{ep.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenHeatmaps}
              className="text-xs text-[#0049db] font-bold hover:underline text-center pt-3 cursor-pointer"
            >
              Open Global Macro Heatmap →
            </button>
          </div>
        </section>

        {/* Bottom Supercharts CTA Banner */}
        <section className="w-full bg-gradient-to-r from-[#131722] to-[#1e2330] rounded-3xl p-8 lg:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex flex-col gap-3 max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase font-bold text-[#b6c4ff] tracking-wider">
              TRADINGVIEW SUPERCHARTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Look first / Then leap.
            </h2>
            <p className="text-sm text-[#e0e2ee]/80 leading-relaxed">
              Over 60 million traders and investors use our platform to spot opportunities across global markets with institutional-grade charts and custom Pine Script™ strategies.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              onClick={() => onOpenSupercharts('NVDA')}
              className="px-6 py-3 rounded-full bg-[#0049db] hover:bg-[#2962FF] text-white font-bold text-sm transition-all shadow-md cursor-pointer"
            >
              Launch Supercharts
            </button>
            <button
              onClick={() => onOpenScreener('all')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all backdrop-blur-xs cursor-pointer"
            >
              Browse Screener
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
