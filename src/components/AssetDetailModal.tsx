import React, { useState } from 'react';
import { MarketAsset } from '../types/market';

interface AssetDetailModalProps {
  asset: MarketAsset | null;
  onClose: () => void;
  onOpenSupercharts: (symbol: string) => void;
  onExecuteTrade: (symbol: string, side: 'BUY' | 'SELL', shares: number, price: number) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  onOpenSupercharts,
  onExecuteTrade
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL'>('1D');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tradeShares, setTradeShares] = useState(10);
  const [orderToast, setOrderToast] = useState<string | null>(null);

  if (!asset) return null;

  // Generate dynamic chart points based on timeframe
  const basePrice = asset.price;
  const isUp = asset.changePercent >= 0;
  
  // Synthetic line data for visual chart
  const pointCount = 24;
  const chartPoints: { time: string; price: number }[] = Array.from({ length: pointCount }, (_, i) => {
    const variance = (Math.sin(i * 0.4) * 0.015 + (i / pointCount) * (isUp ? 0.02 : -0.02)) * basePrice;
    const price = Number((basePrice * 0.98 + variance).toFixed(2));
    return {
      time: `${9 + Math.floor(i / 3)}:${(i % 3) * 20 || '00'}`,
      price
    };
  });

  // Calculate SVG path
  const minP = Math.min(...chartPoints.map(p => p.price));
  const maxP = Math.max(...chartPoints.map(p => p.price));
  const range = maxP - minP || 1;
  const height = 180;
  const width = 600;

  const pathD = chartPoints.reduce((acc, p, idx) => {
    const x = (idx / (chartPoints.length - 1)) * width;
    const y = height - ((p.price - minP) / range) * (height - 30) - 15;
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, '');

  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  const hoveredPoint = hoverIndex !== null ? chartPoints[hoverIndex] : chartPoints[chartPoints.length - 1];

  const handleTrade = (side: 'BUY' | 'SELL') => {
    onExecuteTrade(asset.symbol, side, tradeShares, asset.price);
    setOrderToast(`Successfully executed ${side} ${tradeShares} shares of ${asset.symbol} at $${asset.price.toFixed(2)}`);
    setTimeout(() => setOrderToast(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131722]/50 backdrop-blur-xs">
      <div 
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-6 pb-4 border-b border-[#E0E3EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm text-white shadow-xs"
              style={{ backgroundColor: asset.badgeBg || '#131722' }}
            >
              {asset.badgeText || asset.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#131722]">{asset.symbol}</h2>
                <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded-full bg-[#F0F3FA] text-[#787B86]">
                  {asset.category}
                </span>
                {asset.rating && (
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    asset.rating.includes('Buy') ? 'bg-[#E8F5F2] text-[#089981]' : 'bg-[#ebedfa] text-[#0049db]'
                  }`}>
                    {asset.rating}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#787B86]">{asset.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onOpenSupercharts(asset.symbol);
                onClose();
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#0049db] hover:bg-[#2962FF] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">candlestick_chart</span>
              Supercharts
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Price & Delta Banner */}
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div className="text-3xl font-extrabold text-[#131722] tabular-nums tracking-tight">
                {hoveredPoint.price > 1000 ? hoveredPoint.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : hoveredPoint.price.toFixed(2)} {asset.currency || 'USD'}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-sm font-bold flex items-center gap-0.5 tabular-nums ${isUp ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                  <span className="material-symbols-outlined text-[16px]">
                    {isUp ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                  {isUp ? `+${asset.change.toFixed(2)}` : asset.change.toFixed(2)} ({isUp ? `+${asset.changePercent.toFixed(2)}%` : `${asset.changePercent.toFixed(2)}%`})
                </span>
                <span className="text-xs text-[#787B86]">Today • Market Real-time</span>
              </div>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-1 p-1 bg-[#F0F3FA] rounded-full border border-[#E0E3EB]">
              {(['1D', '5D', '1M', '6M', '1Y', 'ALL'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    timeframe === tf
                      ? 'bg-[#131722] text-white shadow-xs'
                      : 'text-[#787B86] hover:text-[#131722]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chart SVG */}
          <div 
            className="w-full bg-[#FAF9FF] border border-[#E0E3EB] rounded-2xl p-4 relative cursor-crosshair overflow-hidden"
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="flex items-center justify-between text-xs text-[#787B86] mb-2">
              <span>Telemetry Sparkline ({timeframe})</span>
              <span className="font-semibold text-[#131722]">
                Hover: {hoveredPoint.time} • ${hoveredPoint.price.toFixed(2)}
              </span>
            </div>

            <div className="relative w-full h-[180px]">
              <svg 
                className="w-full h-full" 
                viewBox={`0 0 ${width} ${height}`} 
                preserveAspectRatio="none"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const xRel = (e.clientX - rect.left) / rect.width;
                  const idx = Math.min(pointCount - 1, Math.max(0, Math.round(xRel * (pointCount - 1))));
                  setHoverIndex(idx);
                }}
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isUp ? '#089981' : '#F23645'} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={isUp ? '#089981' : '#F23645'} stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                <line x1="0" y1="45" x2={width} y2="45" stroke="#E0E3EB" strokeDasharray="3 3" />
                <line x1="0" y1="90" x2={width} y2="90" stroke="#E0E3EB" strokeDasharray="3 3" />
                <line x1="0" y1="135" x2={width} y2="135" stroke="#E0E3EB" strokeDasharray="3 3" />

                {/* Area and Line */}
                <path d={areaD} fill="url(#chartGradient)" />
                <path d={pathD} fill="none" stroke={isUp ? '#089981' : '#F23645'} strokeWidth="2.5" strokeLinecap="round" />

                {/* Hover circle indicator */}
                {hoverIndex !== null && (
                  <>
                    <line 
                      x1={(hoverIndex / (pointCount - 1)) * width} 
                      y1="0" 
                      x2={(hoverIndex / (pointCount - 1)) * width} 
                      y2={height} 
                      stroke="#787B86" 
                      strokeWidth="1" 
                      strokeDasharray="2 2" 
                    />
                    <circle
                      cx={(hoverIndex / (pointCount - 1)) * width}
                      cy={height - ((hoveredPoint.price - minP) / range) * (height - 30) - 15}
                      r="5"
                      fill={isUp ? '#089981' : '#F23645'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Key Fundamentals & Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#F0F3FA] rounded-xl">
              <span className="text-[11px] font-semibold text-[#787B86] uppercase">Market Cap</span>
              <div className="text-sm font-bold text-[#131722] mt-0.5 tabular-nums">
                {asset.marketCap || '$245.8B'}
              </div>
            </div>
            <div className="p-3 bg-[#F0F3FA] rounded-xl">
              <span className="text-[11px] font-semibold text-[#787B86] uppercase">Volume</span>
              <div className="text-sm font-bold text-[#131722] mt-0.5 tabular-nums">
                {asset.volume || '34.8M'}
              </div>
            </div>
            <div className="p-3 bg-[#F0F3FA] rounded-xl">
              <span className="text-[11px] font-semibold text-[#787B86] uppercase">P/E Ratio</span>
              <div className="text-sm font-bold text-[#131722] mt-0.5 tabular-nums">
                {asset.peRatio ? `${asset.peRatio}x` : '32.4x'}
              </div>
            </div>
            <div className="p-3 bg-[#F0F3FA] rounded-xl">
              <span className="text-[11px] font-semibold text-[#787B86] uppercase">Div Yield</span>
              <div className="text-sm font-bold text-[#131722] mt-0.5 tabular-nums">
                {asset.dividendYield !== undefined ? `${asset.dividendYield}%` : '0.45%'}
              </div>
            </div>
          </div>

          {/* 52-Week Range Bar */}
          <div className="p-4 bg-white border border-[#E0E3EB] rounded-2xl">
            <div className="flex items-center justify-between text-xs text-[#787B86] mb-2 font-semibold">
              <span>52W Low: ${asset.low52w?.toFixed(2) || (asset.price * 0.72).toFixed(2)}</span>
              <span className="text-[#131722] font-bold">52-Week Price Range</span>
              <span>52W High: ${asset.high52w?.toFixed(2) || (asset.price * 1.08).toFixed(2)}</span>
            </div>
            <div className="w-full h-2.5 bg-[#F0F3FA] rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-[#0049db] rounded-full"
                style={{ width: `${asset.range52wPct || 82}%` }}
              />
            </div>
          </div>

          {/* Paper Trade Action Box */}
          <div className="p-4 bg-[#F0F3FA] rounded-2xl border border-[#E0E3EB] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left w-full sm:w-auto">
              <span className="text-xs font-bold text-[#131722] block">Simulate Order Execution</span>
              <span className="text-xs text-[#787B86]">Instant paper fill at market price</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="flex items-center border border-[#E0E3EB] rounded-lg bg-white px-2 py-1">
                <span className="text-xs text-[#787B86] mr-2">Qty:</span>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={tradeShares}
                  onChange={(e) => setTradeShares(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-xs font-bold text-[#131722] outline-hidden text-right"
                />
              </div>

              <button
                onClick={() => handleTrade('BUY')}
                className="px-4 py-2 bg-[#089981] hover:bg-[#077d69] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Buy {tradeShares}
              </button>

              <button
                onClick={() => handleTrade('SELL')}
                className="px-4 py-2 bg-[#F23645] hover:bg-[#d62433] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Sell {tradeShares}
              </button>
            </div>
          </div>

          {orderToast && (
            <div className="p-3 bg-[#E8F5F2] border border-[#089981]/30 rounded-xl text-xs font-bold text-[#089981] text-center animate-in fade-in">
              {orderToast}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
