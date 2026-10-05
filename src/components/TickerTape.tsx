import React, { useEffect, useState } from 'react';

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  rawSymbol: string;
}

interface TickerTapeProps {
  onSelectSymbol: (symbol: string) => void;
}

export const TickerTape: React.FC<TickerTapeProps> = ({ onSelectSymbol }) => {
  const [items, setItems] = useState<TickerItem[]>([
    { symbol: 'SPX', price: '5,980.50', change: '+0.45%', isPositive: true, rawSymbol: 'SPX' },
    { symbol: 'NDX', price: '21,120.80', change: '+0.82%', isPositive: true, rawSymbol: 'NDX' },
    { symbol: 'DJI', price: '43,840.10', change: '-0.15%', isPositive: false, rawSymbol: 'DJI' },
    { symbol: 'BTC/USD', price: '94,310.00', change: '+3.14%', isPositive: true, rawSymbol: 'BTC/USD' },
    { symbol: 'NVDA', price: '143.60', change: '+2.84%', isPositive: true, rawSymbol: 'NVDA' },
    { symbol: 'US 10Y', price: '4.459%', change: '+0.09%', isPositive: true, rawSymbol: 'US10Y' },
    { symbol: 'GOLD', price: '2,682.40', change: '+0.61%', isPositive: true, rawSymbol: 'GC1!' },
    { symbol: 'EUR/USD', price: '1.0542', change: '-0.21%', isPositive: false, rawSymbol: 'EURUSD' },
    { symbol: 'TSLA', price: '338.74', change: '+4.18%', isPositive: true, rawSymbol: 'TSLA' },
    { symbol: 'ETH/USD', price: '3,480.20', change: '+2.45%', isPositive: true, rawSymbol: 'ETH/USD' }
  ]);

  // Subtle real-time tick pulse every 4 seconds to give a lively, institutional feed feel
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        const randomIndex = Math.floor(Math.random() * next.length);
        const item = next[randomIndex];
        // small perturbation
        if (item.symbol === 'NVDA') {
          const newPrice = (143.60 + (Math.random() * 0.4 - 0.2)).toFixed(2);
          next[randomIndex] = { ...item, price: newPrice };
        } else if (item.symbol === 'BTC/USD') {
          const newPrice = (94310 + Math.floor(Math.random() * 40 - 20)).toLocaleString('en-US', { minimumFractionDigits: 2 });
          next[randomIndex] = { ...item, price: newPrice };
        }
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#F0F3FA] py-2 border-b border-[#E0E3EB]/70 overflow-hidden select-none">
      <div className="flex items-center gap-8 whitespace-nowrap animate-marquee px-4 cursor-pointer">
        {/* Render twice for seamless loop */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={`${item.symbol}-${idx}`}
            onClick={() => onSelectSymbol(item.rawSymbol)}
            className="inline-flex items-center gap-2 hover:bg-[#FFFFFF] px-2 py-0.5 rounded-lg transition-colors group"
          >
            <span className="font-semibold text-[13px] text-[#131722] group-hover:text-[#2962FF] transition-colors">
              {item.symbol}
            </span>
            <span className="font-semibold text-[13px] text-[#131722] tabular-nums">
              {item.price}
            </span>
            <span
              className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${
                item.isPositive
                  ? 'bg-[#E8F5F2] text-[#089981]'
                  : 'bg-[#FDECEE] text-[#F23645]'
              }`}
            >
              {item.change}
            </span>
            <span className="text-[#C3C5D8] text-[11px] ml-1">•</span>
          </div>
        ))}
      </div>
    </section>
  );
};
