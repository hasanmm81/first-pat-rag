import React from 'react';
import { ScreenTab } from './Header';

interface FooterProps {
  onSelectScreen: (screen: ScreenTab) => void;
  onSelectSymbol: (symbol: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectScreen, onSelectSymbol }) => {
  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#E0E3EB]">
      <div className="w-full max-w-[1380px] mx-auto px-4 lg:px-14 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-[#E0E3EB]">
          {/* Products Column */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-bold uppercase text-[#787B86] tracking-wider mb-1">
              Products
            </span>
            <button onClick={() => onSelectScreen('supercharts')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Supercharts
            </button>
            <button onClick={() => onSelectScreen('community')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Pine Script™
            </button>
            <button onClick={() => onSelectScreen('screener')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Stock Screener
            </button>
            <button onClick={() => onSelectScreen('screener')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              ETF Screener
            </button>
            <button onClick={() => onSelectScreen('screener')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Crypto Screener
            </button>
            <button onClick={() => onSelectScreen('screener')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Forex Screener
            </button>
          </div>

          {/* Markets Column */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-bold uppercase text-[#787B86] tracking-wider mb-1">
              Markets
            </span>
            <button onClick={() => onSelectSymbol('SPX')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Indices
            </button>
            <button onClick={() => onSelectSymbol('NVDA')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Stocks
            </button>
            <button onClick={() => onSelectSymbol('BTC/USD')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Crypto
            </button>
            <button onClick={() => onSelectSymbol('EURUSD')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Forex
            </button>
            <button onClick={() => onSelectSymbol('GC1!')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Futures
            </button>
            <button onClick={() => onSelectSymbol('US10Y')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Bonds
            </button>
          </div>

          {/* Heatmaps & Tools Column */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-bold uppercase text-[#787B86] tracking-wider mb-1">
              Heatmaps &amp; Tools
            </span>
            <button onClick={() => onSelectScreen('heatmaps')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Stock Heatmap
            </button>
            <button onClick={() => onSelectScreen('heatmaps')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Crypto Heatmap
            </button>
            <button onClick={() => onSelectScreen('calendar')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Economic Calendar
            </button>
            <button onClick={() => onSelectScreen('calendar')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Earnings Calendar
            </button>
            <button onClick={() => onSelectScreen('markets')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Market Telemetry
            </button>
          </div>

          {/* Community Column */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-bold uppercase text-[#787B86] tracking-wider mb-1">
              Community
            </span>
            <button onClick={() => onSelectScreen('community')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Trading Ideas
            </button>
            <button onClick={() => onSelectScreen('community')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Custom Scripts
            </button>
            <button onClick={() => onSelectScreen('community')} className="text-left text-sm text-[#131722] hover:text-[#0049db] transition-colors cursor-pointer">
              Live Streams
            </button>
            <span className="text-sm text-[#787B86]">House Rules</span>
            <span className="text-sm text-[#787B86]">Moderators</span>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-bold uppercase text-[#787B86] tracking-wider mb-1">
              Company
            </span>
            <span className="text-sm text-[#131722]">About</span>
            <span className="text-sm text-[#131722]">Features</span>
            <span className="text-sm text-[#131722]">Pricing</span>
            <span className="text-sm text-[#131722]">Careers</span>
            <span className="text-sm text-[#131722]">Help Center</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              alt="TradingView Logo" 
              className="h-6 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1US6dNuqpSK0E6TFf1XsYmKjQjpLgPuHx-cJjIBuzFubN66YVkdEg5DWJT2YwuBd5DrphfJT4fC2dXVbO2rtHihh_CoKv38msytPXzgOQI__2VuE8V4Zo5aukCyjVezvmU8FgZMiKv6cYVbPDqtMhWy2T0sRnV-hyNz4avSMZ0APvHo_nzqU9ZG8yw7yLBXxoiKaTI7mGWnovtVYhpL6josEh_pV7rG1V4PGb6QiJRuFQznRRjyJ3rJDcPg"
            />
            <span className="text-xs text-[#787B86]">
              © 2024 TradingView, Inc. All rights reserved.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#787B86]">
            <a href="#" className="hover:text-[#131722] transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-[#131722] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#131722] transition-colors">Cookies Policy</a>
            <a href="#" className="hover:text-[#131722] transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
