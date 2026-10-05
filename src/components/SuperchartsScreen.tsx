import React, { useState, useEffect, useMemo } from 'react';
import { generateCandles, generateOrderBook, MAJOR_INDICES, MEGA_CAP_STOCKS, CRYPTO_ASSETS, FUTURES_COMMODITIES } from '../data/mockMarketData';
import { CandleData, OrderBook } from '../types/market';

interface SuperchartsScreenProps {
  initialSymbol?: string;
  onSelectSymbol: (symbol: string) => void;
  onExecuteTrade: (symbol: string, side: 'BUY' | 'SELL', shares: number, price: number) => void;
  portfolioBalance: number;
}

export const SuperchartsScreen: React.FC<SuperchartsScreenProps> = ({
  initialSymbol = 'NVDA',
  onSelectSymbol,
  onExecuteTrade,
  portfolioBalance
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbol);
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1h' | '4h' | '1D' | '1W'>('15m');
  const [chartType, setChartType] = useState<'candles' | 'line' | 'area'>('candles');
  const [indicators, setIndicators] = useState({
    sma20: true,
    ema50: false,
    bollinger: false,
    rsi: true,
    volume: true
  });
  const [activeDrawingTool, setActiveDrawingTool] = useState<string>('crosshair');
  const [sidebarTab, setSidebarTab] = useState<'watchlist' | 'orderbook' | 'trade' | 'news'>('trade');
  
  // Trade execution state
  const [tradeSide, setTradeSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [shares, setShares] = useState(10);
  const [tradeNotice, setTradeNotice] = useState<string | null>(null);

  // Price base reference
  const currentAsset = useMemo(() => {
    const all = [...MEGA_CAP_STOCKS, ...MAJOR_INDICES, ...CRYPTO_ASSETS, ...FUTURES_COMMODITIES];
    return all.find(a => a.symbol === selectedSymbol) || MEGA_CAP_STOCKS[0];
  }, [selectedSymbol]);

  const [candles, setCandles] = useState<CandleData[]>(() => generateCandles(currentAsset.price, 36));
  const [orderBook, setOrderBook] = useState<OrderBook>(() => generateOrderBook(currentAsset.price));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Reset candles when symbol changes
  useEffect(() => {
    setCandles(generateCandles(currentAsset.price, 36));
    setOrderBook(generateOrderBook(currentAsset.price));
  }, [selectedSymbol, currentAsset.price]);

  // Live price tick simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCandles(prev => {
        if (!prev.length) return prev;
        const last = { ...prev[prev.length - 1] };
        const tick = (Math.random() - 0.49) * (last.close * 0.002);
        last.close = Number((last.close + tick).toFixed(2));
        last.high = Math.max(last.high, last.close);
        last.low = Math.min(last.low, last.close);
        return [...prev.slice(0, -1), last];
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const activeCandle = hoverIndex !== null ? candles[hoverIndex] : candles[candles.length - 1] || {
    open: currentAsset.price,
    high: currentAsset.price,
    low: currentAsset.price,
    close: currentAsset.price,
    volume: 50000,
    time: 'Now'
  };

  const isUp = (activeCandle.close >= activeCandle.open);

  // Chart coordinate calculations
  const minPrice = Math.min(...candles.map(c => c.low));
  const maxPrice = Math.max(...candles.map(c => c.high));
  const priceRange = maxPrice - minPrice || 1;
  const maxVolume = Math.max(...candles.map(c => c.volume)) || 1;

  const chartWidth = 840;
  const mainChartHeight = 360;
  const volumeHeight = 70;
  const rsiHeight = 80;
  const candleGap = chartWidth / Math.max(1, candles.length);
  const candleWidth = Math.max(4, candleGap * 0.7);

  const getY = (price: number) => {
    return mainChartHeight - ((price - minPrice) / priceRange) * (mainChartHeight - 40) - 20;
  };

  const handleExecute = () => {
    onExecuteTrade(selectedSymbol, tradeSide, shares, activeCandle.close);
    setTradeNotice(`Order Executed: ${tradeSide} ${shares} ${selectedSymbol} @ $${activeCandle.close.toFixed(2)}`);
    setTimeout(() => setTradeNotice(null), 3500);
  };

  return (
    <div className="w-full flex flex-col bg-[#FFFFFF] min-h-[calc(100vh-64px)]">
      {/* Top Supercharts Toolbar */}
      <div className="h-13 bg-[#FFFFFF] border-b border-[#E0E3EB] px-4 flex items-center justify-between gap-4 overflow-x-auto select-none">
        {/* Symbol Quick Switcher */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={selectedSymbol}
              onChange={(e) => {
                setSelectedSymbol(e.target.value);
                onSelectSymbol(e.target.value);
              }}
              className="bg-[#F0F3FA] text-[#131722] font-bold text-sm rounded-lg px-3 py-1.5 border border-[#E0E3EB] outline-hidden cursor-pointer"
            >
              <optgroup label="US Stocks">
                <option value="NVDA">NVDA • NVIDIA Corporation</option>
                <option value="AAPL">AAPL • Apple Inc.</option>
                <option value="AMZN">AMZN • Amazon.com</option>
                <option value="GOOGL">GOOGL • Alphabet Inc.</option>
                <option value="TSLA">TSLA • Tesla, Inc.</option>
                <option value="MSFT">MSFT • Microsoft Corp.</option>
              </optgroup>
              <optgroup label="Indices">
                <option value="SPX">SPX • S&amp;P 500 Index</option>
                <option value="NDX">NDX • Nasdaq 100</option>
                <option value="DJI">DJI • Dow 30</option>
              </optgroup>
              <optgroup label="Crypto">
                <option value="BTC/USD">BTC/USD • Bitcoin</option>
                <option value="ETH/USD">ETH/USD • Ethereum</option>
              </optgroup>
              <optgroup label="Futures">
                <option value="GC1!">GC1! • Gold Futures</option>
                <option value="CL1!">CL1! • Light Crude Oil</option>
              </optgroup>
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-[#E0E3EB]">
            <span className="text-sm font-bold text-[#131722] tabular-nums">
              ${activeCandle.close.toFixed(2)}
            </span>
            <span className={`text-xs font-bold tabular-nums ${isUp ? 'text-[#089981]' : 'text-[#F23645]'}`}>
              {isUp ? '+' : ''}{((activeCandle.close - activeCandle.open) / activeCandle.open * 100).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Timeframes Bar */}
        <div className="hidden md:flex items-center gap-0.5 bg-[#F0F3FA] p-1 rounded-lg border border-[#E0E3EB]">
          {(['1m', '5m', '15m', '1h', '4h', '1D', '1W'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                timeframe === tf ? 'bg-white text-[#131722] shadow-xs font-bold' : 'text-[#787B86] hover:text-[#131722]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart Style & Indicators */}
        <div className="flex items-center gap-2">
          {/* Chart Style Switcher */}
          <div className="flex items-center bg-[#F0F3FA] p-0.5 rounded-lg border border-[#E0E3EB]">
            <button
              onClick={() => setChartType('candles')}
              className={`p-1.5 rounded text-xs cursor-pointer ${chartType === 'candles' ? 'bg-white shadow-xs text-[#0049db]' : 'text-[#787B86]'}`}
              title="Candlestick Chart"
            >
              <span className="material-symbols-outlined text-[18px]">candlestick_chart</span>
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded text-xs cursor-pointer ${chartType === 'line' ? 'bg-white shadow-xs text-[#0049db]' : 'text-[#787B86]'}`}
              title="Line Chart"
            >
              <span className="material-symbols-outlined text-[18px]">show_chart</span>
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`p-1.5 rounded text-xs cursor-pointer ${chartType === 'area' ? 'bg-white shadow-xs text-[#0049db]' : 'text-[#787B86]'}`}
              title="Area Mountain"
            >
              <span className="material-symbols-outlined text-[18px]">area_chart</span>
            </button>
          </div>

          {/* Indicators dropdown chips */}
          <button
            onClick={() => setIndicators(prev => ({ ...prev, sma20: !prev.sma20 }))}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer border ${
              indicators.sma20 ? 'bg-[#2962FF]/10 text-[#2962FF] border-[#2962FF]/30' : 'bg-white text-[#787B86] border-[#E0E3EB]'
            }`}
          >
            SMA 20
          </button>

          <button
            onClick={() => setIndicators(prev => ({ ...prev, bollinger: !prev.bollinger }))}
            className={`hidden lg:inline-block px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer border ${
              indicators.bollinger ? 'bg-[#2962FF]/10 text-[#2962FF] border-[#2962FF]/30' : 'bg-white text-[#787B86] border-[#E0E3EB]'
            }`}
          >
            Bollinger
          </button>

          <button
            onClick={() => setIndicators(prev => ({ ...prev, rsi: !prev.rsi }))}
            className={`hidden sm:inline-block px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer border ${
              indicators.rsi ? 'bg-[#2962FF]/10 text-[#2962FF] border-[#2962FF]/30' : 'bg-white text-[#787B86] border-[#E0E3EB]'
            }`}
          >
            RSI (14)
          </button>
        </div>
      </div>

      {/* Main Terminal Grid: Left Drawing Toolbar + Center Chart Canvas + Right Info/Order Dock */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Vertical Drawing Toolbar */}
        <div className="w-12 bg-[#FAF9FF] border-r border-[#E0E3EB] flex flex-col items-center py-3 gap-2 select-none">
          {[
            { id: 'crosshair', icon: 'near_me', label: 'Crosshair' },
            { id: 'trendline', icon: 'horizontal_rule', label: 'Trendline' },
            { id: 'fibonacci', icon: 'stacked_line_chart', label: 'Fibonacci' },
            { id: 'brush', icon: 'brush', label: 'Draw' },
            { id: 'text', icon: 'text_fields', label: 'Annotation' },
            { id: 'measure', icon: 'square_foot', label: 'Measure Range' },
            { id: 'clear', icon: 'delete', label: 'Clear Annotations' }
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveDrawingTool(tool.id)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                activeDrawingTool === tool.id ? 'bg-[#0049db] text-white shadow-xs' : 'text-[#787B86] hover:bg-[#ebedfa] hover:text-[#131722]'
              }`}
              title={tool.label}
            >
              <span className="material-symbols-outlined text-[19px]">{tool.icon}</span>
            </button>
          ))}
        </div>

        {/* Center: Chart Canvas */}
        <div className="flex-1 flex flex-col bg-[#FFFFFF] relative overflow-hidden">
          {/* OHLC Telemetry Bar */}
          <div className="h-8 bg-[#FFFFFF] border-b border-[#E0E3EB]/60 px-4 flex items-center gap-4 text-xs font-mono text-[#787B86] select-none overflow-x-auto scrollbar-none">
            <span className="font-bold text-[#131722]">{selectedSymbol}</span>
            <span>{timeframe}</span>
            <span>O: <strong className="text-[#131722] tabular-nums">{activeCandle.open.toFixed(2)}</strong></span>
            <span>H: <strong className="text-[#131722] tabular-nums">{activeCandle.high.toFixed(2)}</strong></span>
            <span>L: <strong className="text-[#131722] tabular-nums">{activeCandle.low.toFixed(2)}</strong></span>
            <span>C: <strong className="text-[#131722] tabular-nums">{activeCandle.close.toFixed(2)}</strong></span>
            <span>Vol: <strong className="text-[#131722] tabular-nums">{activeCandle.volume.toLocaleString()}</strong></span>
            {indicators.sma20 && <span className="text-[#0049db]">SMA(20): ${(activeCandle.close * 0.995).toFixed(2)}</span>}
          </div>

          {/* SVG Candlestick Canvas */}
          <div 
            className="flex-1 relative cursor-crosshair overflow-hidden p-2 select-none"
            onMouseLeave={() => setHoverIndex(null)}
          >
            <svg 
              className="w-full h-full"
              viewBox={`0 0 ${chartWidth} ${mainChartHeight + (indicators.rsi ? rsiHeight : 0)}`}
              preserveAspectRatio="none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const xRel = (e.clientX - rect.left) / rect.width;
                const idx = Math.min(candles.length - 1, Math.max(0, Math.floor(xRel * candles.length)));
                setHoverIndex(idx);
              }}
            >
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2962FF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#2962FF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[0.2, 0.4, 0.6, 0.8].map((pct) => {
                const price = minPrice + priceRange * (1 - pct);
                const y = mainChartHeight * pct;
                return (
                  <g key={pct}>
                    <line x1="0" y1={y} x2={chartWidth} y2={y} stroke="#E0E3EB" strokeDasharray="3 3" />
                    <text x={chartWidth - 50} y={y - 4} fill="#787B86" fontSize="10" fontFamily="monospace">
                      ${price.toFixed(2)}
                    </text>
                  </g>
                );
              })}

              {/* Volume Bars at Bottom of Main Chart */}
              {indicators.volume && candles.map((c, i) => {
                const x = i * candleGap + (candleGap - candleWidth) / 2;
                const vHeight = (c.volume / maxVolume) * volumeHeight;
                const y = mainChartHeight - vHeight;
                const candleIsUp = c.close >= c.open;
                return (
                  <rect
                    key={`vol-${i}`}
                    x={x}
                    y={y}
                    width={candleWidth}
                    height={vHeight}
                    fill={candleIsUp ? '#089981' : '#F23645'}
                    opacity="0.22"
                  />
                );
              })}

              {/* Chart Render: Candlesticks OR Line / Area */}
              {chartType === 'candles' ? (
                candles.map((c, i) => {
                  const xCenter = i * candleGap + candleGap / 2;
                  const xLeft = i * candleGap + (candleGap - candleWidth) / 2;
                  const candleIsUp = c.close >= c.open;
                  const color = candleIsUp ? '#089981' : '#F23645';

                  const yHigh = getY(c.high);
                  const yLow = getY(c.low);
                  const yOpen = getY(c.open);
                  const yClose = getY(c.close);
                  const bodyTop = Math.min(yOpen, yClose);
                  const bodyHeight = Math.max(2, Math.abs(yClose - yOpen));

                  return (
                    <g key={`candle-${i}`}>
                      {/* Wick */}
                      <line
                        x1={xCenter}
                        y1={yHigh}
                        x2={xCenter}
                        y2={yLow}
                        stroke={color}
                        strokeWidth="1.5"
                      />
                      {/* Real Body */}
                      <rect
                        x={xLeft}
                        y={bodyTop}
                        width={candleWidth}
                        height={bodyHeight}
                        fill={color}
                        rx="1"
                      />
                    </g>
                  );
                })
              ) : (
                /* Line / Area rendering */
                (() => {
                  const pathD = candles.reduce((acc, c, idx) => {
                    const x = idx * candleGap + candleGap / 2;
                    const y = getY(c.close);
                    return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }, '');
                  return (
                    <g>
                      {chartType === 'area' && (
                        <path
                          d={`${pathD} L ${chartWidth} ${mainChartHeight} L 0 ${mainChartHeight} Z`}
                          fill="url(#areaGrad)"
                        />
                      )}
                      <path d={pathD} fill="none" stroke="#2962FF" strokeWidth="2.5" />
                    </g>
                  );
                })()
              )}

              {/* Indicator: SMA 20 Overlay Line */}
              {indicators.sma20 && (() => {
                const smaPath = candles.reduce((acc, c, idx) => {
                  const x = idx * candleGap + candleGap / 2;
                  const smaVal = c.close * (1 + Math.sin(idx * 0.3) * 0.008);
                  const y = getY(smaVal);
                  return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                }, '');
                return <path d={smaPath} fill="none" stroke="#FF9800" strokeWidth="1.5" strokeDasharray="4 2" />;
              })()}

              {/* Crosshair Cursor Tracking Line */}
              {hoverIndex !== null && (
                <g>
                  <line
                    x1={hoverIndex * candleGap + candleGap / 2}
                    y1="0"
                    x2={hoverIndex * candleGap + candleGap / 2}
                    y2={mainChartHeight + (indicators.rsi ? rsiHeight : 0)}
                    stroke="#787B86"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <line
                    x1="0"
                    y1={getY(activeCandle.close)}
                    x2={chartWidth}
                    y2={getY(activeCandle.close)}
                    stroke="#787B86"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  {/* Floating Price Tag */}
                  <rect
                    x={chartWidth - 65}
                    y={getY(activeCandle.close) - 10}
                    width="60"
                    height="20"
                    fill="#131722"
                    rx="3"
                  />
                  <text
                    x={chartWidth - 35}
                    y={getY(activeCandle.close) + 4}
                    fill="#FFFFFF"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    ${activeCandle.close.toFixed(2)}
                  </text>
                </g>
              )}

              {/* RSI Sub-Panel */}
              {indicators.rsi && (
                <g transform={`translate(0, ${mainChartHeight})`}>
                  <rect x="0" y="0" width={chartWidth} height={rsiHeight} fill="#FAF9FF" stroke="#E0E3EB" />
                  <line x1="0" y1="24" x2={chartWidth} y2="24" stroke="#E0E3EB" strokeDasharray="2 2" />
                  <line x1="0" y1="56" x2={chartWidth} y2="56" stroke="#E0E3EB" strokeDasharray="2 2" />
                  <text x="10" y="16" fill="#787B86" fontSize="10" fontWeight="bold">RSI (14): 58.4</text>
                  <text x={chartWidth - 30} y="27" fill="#787B86" fontSize="9">70</text>
                  <text x={chartWidth - 30} y="59" fill="#787B86" fontSize="9">30</text>

                  {/* RSI Curve */}
                  <path
                    d={candles.reduce((acc, _, idx) => {
                      const x = idx * candleGap + candleGap / 2;
                      const rsiVal = 50 + Math.sin(idx * 0.4) * 22;
                      const y = rsiHeight - (rsiVal / 100) * rsiHeight;
                      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }, '')}
                    fill="none"
                    stroke="#9C27B0"
                    strokeWidth="1.5"
                  />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Right Collapsible Dock (Watchlist, Order Book, Trade Ticket, News) */}
        <div className="w-80 bg-[#FFFFFF] border-l border-[#E0E3EB] flex flex-col select-none">
          {/* Dock Tabs */}
          <div className="flex items-center border-b border-[#E0E3EB] bg-[#FAF9FF] text-xs font-semibold">
            {[
              { id: 'trade', label: 'Trade' },
              { id: 'orderbook', label: 'Book' },
              { id: 'watchlist', label: 'Watchlist' },
              { id: 'news', label: 'News' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSidebarTab(tab.id as any)}
                className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
                  sidebarTab === tab.id ? 'bg-white text-[#0049db] border-b-2 border-[#0049db] font-bold' : 'text-[#787B86] hover:text-[#131722]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Trade Ticket (Paper Trading) */}
          {sidebarTab === 'trade' && (
            <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                {/* Buy / Sell Selector */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#F0F3FA] rounded-xl">
                  <button
                    onClick={() => setTradeSide('BUY')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tradeSide === 'BUY' ? 'bg-[#089981] text-white shadow-xs' : 'text-[#787B86] hover:text-[#131722]'
                    }`}
                  >
                    BUY / LONG
                  </button>
                  <button
                    onClick={() => setTradeSide('SELL')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tradeSide === 'SELL' ? 'bg-[#F23645] text-white shadow-xs' : 'text-[#787B86] hover:text-[#131722]'
                    }`}
                  >
                    SELL / SHORT
                  </button>
                </div>

                {/* Order Type */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#787B86]">Order Type</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setOrderType('MARKET')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                        orderType === 'MARKET' ? 'bg-[#131722] text-white' : 'bg-[#F0F3FA] text-[#787B86]'
                      }`}
                    >
                      Market
                    </button>
                    <button
                      onClick={() => setOrderType('LIMIT')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                        orderType === 'LIMIT' ? 'bg-[#131722] text-white' : 'bg-[#F0F3FA] text-[#787B86]'
                      }`}
                    >
                      Limit
                    </button>
                  </div>
                </div>

                {/* Units input */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#787B86]">Quantity (Shares/Coins)</label>
                  <div className="flex items-center border border-[#E0E3EB] rounded-xl px-3 py-2 bg-white">
                    <input
                      type="number"
                      min="1"
                      value={shares}
                      onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-sm font-bold text-[#131722] outline-hidden"
                    />
                    <span className="text-xs text-[#787B86] font-semibold">{selectedSymbol}</span>
                  </div>
                </div>

                {/* Estimated Value */}
                <div className="p-3 bg-[#FAF9FF] rounded-xl border border-[#E0E3EB] text-xs space-y-1.5">
                  <div className="flex justify-between text-[#787B86]">
                    <span>Execution Price:</span>
                    <span className="font-bold text-[#131722] tabular-nums">${activeCandle.close.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#787B86]">
                    <span>Order Value:</span>
                    <span className="font-bold text-[#131722] tabular-nums">
                      ${(shares * activeCandle.close).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#787B86] pt-1 border-t border-[#E0E3EB]">
                    <span>Available Cash:</span>
                    <span className="font-bold text-[#089981] tabular-nums">
                      ${portfolioBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleExecute}
                  className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all cursor-pointer ${
                    tradeSide === 'BUY' ? 'bg-[#089981] hover:bg-[#077d69]' : 'bg-[#F23645] hover:bg-[#d62433]'
                  }`}
                >
                  {tradeSide} {shares} {selectedSymbol}
                </button>

                {tradeNotice && (
                  <div className="p-2.5 bg-[#E8F5F2] border border-[#089981]/30 rounded-xl text-xs font-bold text-[#089981] text-center">
                    {tradeNotice}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Order Book & Depth Ladder */}
          {sidebarTab === 'orderbook' && (
            <div className="p-3 flex-1 flex flex-col text-xs font-mono overflow-y-auto">
              <div className="flex justify-between text-[#787B86] pb-1 font-sans text-[11px] uppercase font-bold">
                <span>Price (USD)</span>
                <span>Size</span>
                <span>Total</span>
              </div>

              {/* Asks (Sells in Red) */}
              <div className="flex flex-col-reverse divide-y divide-[#F0F3FA] py-1">
                {orderBook.asks.map((ask, idx) => (
                  <div key={`ask-${idx}`} className="flex justify-between py-1 relative">
                    <div 
                      className="absolute right-0 top-0 bottom-0 bg-[#FDECEE] -z-10" 
                      style={{ width: `${Math.min(100, (ask.total / 100) * 100)}%` }} 
                    />
                    <span className="text-[#F23645] font-semibold">{ask.price.toFixed(2)}</span>
                    <span className="text-[#131722]">{ask.size.toFixed(2)}</span>
                    <span className="text-[#787B86]">{ask.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Spread / Mid Price */}
              <div className="py-2.5 my-1 bg-[#FAF9FF] border-y border-[#E0E3EB] text-center font-bold text-sm text-[#131722]">
                ${activeCandle.close.toFixed(2)} <span className="text-xs text-[#089981] ml-1">● Spread 0.02</span>
              </div>

              {/* Bids (Buys in Green) */}
              <div className="flex flex-col divide-y divide-[#F0F3FA] py-1">
                {orderBook.bids.map((bid, idx) => (
                  <div key={`bid-${idx}`} className="flex justify-between py-1 relative">
                    <div 
                      className="absolute right-0 top-0 bottom-0 bg-[#E8F5F2] -z-10" 
                      style={{ width: `${Math.min(100, (bid.total / 100) * 100)}%` }} 
                    />
                    <span className="text-[#089981] font-semibold">{bid.price.toFixed(2)}</span>
                    <span className="text-[#131722]">{bid.size.toFixed(2)}</span>
                    <span className="text-[#787B86]">{bid.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Watchlist */}
          {sidebarTab === 'watchlist' && (
            <div className="flex-1 overflow-y-auto divide-y divide-[#E0E3EB]/60">
              {[...MEGA_CAP_STOCKS, ...CRYPTO_ASSETS.slice(0, 2)].map((item) => (
                <div
                  key={item.symbol}
                  onClick={() => setSelectedSymbol(item.symbol)}
                  className={`p-3 flex items-center justify-between hover:bg-[#F0F3FA] cursor-pointer transition-colors ${
                    selectedSymbol === item.symbol ? 'bg-[#2962FF]/10 font-bold' : ''
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-[#131722]">{item.symbol}</div>
                    <div className="text-[10px] text-[#787B86] truncate max-w-[120px]">{item.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xs text-[#131722] tabular-nums">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className={`text-[10px] font-bold tabular-nums ${item.changePercent >= 0 ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                      {item.changePercent >= 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: News Feed */}
          {sidebarTab === 'news' && (
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              {[
                { title: `${selectedSymbol} Reports Institutional Accumulation`, time: '14m ago', source: 'Bloomberg Markets' },
                { title: `Analysts Raise Price Targets for ${selectedSymbol} Amid Robust Flow`, time: '1h ago', source: 'Reuters' },
                { title: 'Global Tech Multiples Expand as Central Banks Signal Easing', time: '3h ago', source: 'WSJ' },
                { title: 'Options Volume Surges: Bull Call Spreads Lead Activity', time: '5h ago', source: 'Cboe Telemetry' }
              ].map((n, idx) => (
                <div key={idx} className="p-2.5 bg-[#FAF9FF] hover:bg-[#F0F3FA] rounded-xl cursor-pointer border border-[#E0E3EB]/70 transition-colors">
                  <div className="font-semibold text-xs text-[#131722] leading-snug">{n.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-[#787B86] mt-2">
                    <span>{n.source}</span>
                    <span>{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
