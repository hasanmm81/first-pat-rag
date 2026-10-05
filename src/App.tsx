/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header, ScreenTab } from './components/Header';
import { TickerTape } from './components/TickerTape';
import { MarketsOverview } from './components/MarketsOverview';
import { SuperchartsScreen } from './components/SuperchartsScreen';
import { ScreenerScreen } from './components/ScreenerScreen';
import { HeatmapScreen } from './components/HeatmapScreen';
import { CalendarScreen } from './components/CalendarScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AssetDetailModal } from './components/AssetDetailModal';
import { 
  MAJOR_INDICES, 
  WORLD_INDICES, 
  MEGA_CAP_STOCKS, 
  CRYPTO_ASSETS, 
  FUTURES_COMMODITIES, 
  FOREX_PAIRS, 
  POPULAR_ETFS, 
  GOVERNMENT_BONDS 
} from './data/mockMarketData';
import { MarketAsset, Position } from './types/market';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenTab>('markets');
  const [chartSymbol, setChartSymbol] = useState<string>('NVDA');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [inspectedAsset, setInspectedAsset] = useState<MarketAsset | null>(null);
  const [screenerPreset, setScreenerPreset] = useState<string>('all');
  
  // Paper trading balance and positions
  const [portfolioBalance, setPortfolioBalance] = useState<number>(100000.00);
  const [positions, setPositions] = useState<Position[]>([]);

  // Find asset helper
  const findAsset = (symbol: string): MarketAsset => {
    const all = [
      ...MEGA_CAP_STOCKS,
      ...MAJOR_INDICES,
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
        sparkline: [428, 432.50]
      })),
      ...GOVERNMENT_BONDS.map(b => ({
        symbol: b.symbol,
        name: b.name,
        category: 'gov-bonds' as const,
        price: b.price,
        change: 0.05,
        changePercent: b.changePercent,
        sparkline: [b.price - 0.2, b.price]
      }))
    ];
    const match = all.find(a => a.symbol.toUpperCase() === symbol.toUpperCase());
    if (match) return match;

    // Fallback template
    return {
      symbol,
      name: `${symbol} Instrument`,
      category: 'us-stocks',
      price: 150.00,
      change: 1.50,
      changePercent: 1.01,
      sparkline: [148, 149, 150.00]
    };
  };

  const handleSelectSymbol = (symbol: string) => {
    const asset = findAsset(symbol);
    setInspectedAsset(asset);
  };

  const handleOpenSupercharts = (symbol?: string) => {
    if (symbol) setChartSymbol(symbol);
    setActiveScreen('supercharts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenScreener = (preset?: string) => {
    if (preset) setScreenerPreset(preset);
    setActiveScreen('screener');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExecuteTrade = (symbol: string, side: 'BUY' | 'SELL', shares: number, price: number) => {
    const tradeCost = shares * price;
    if (side === 'BUY') {
      if (portfolioBalance >= tradeCost) {
        setPortfolioBalance(prev => prev - tradeCost);
        setPositions(prev => [
          ...prev,
          {
            symbol,
            side: 'BUY',
            shares,
            entryPrice: price,
            currentPrice: price,
            pnl: 0,
            pnlPercent: 0,
            timestamp: Date.now()
          }
        ]);
      }
    } else {
      setPortfolioBalance(prev => prev + tradeCost);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#131722] font-sans antialiased">
      {/* Top Fixed Header */}
      <Header
        activeScreen={activeScreen}
        onSelectScreen={(screen) => {
          setActiveScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        portfolioBalance={portfolioBalance}
      />

      {/* Main View Area with pt-16 for fixed header */}
      <main className="w-full pt-16 bg-[#FFFFFF] flex-1 flex flex-col">
        {/* Real-time Ticker Tape Banner */}
        <TickerTape onSelectSymbol={handleSelectSymbol} />

        {/* Dynamic Screen View */}
        {activeScreen === 'markets' && (
          <MarketsOverview
            onSelectSymbol={handleSelectSymbol}
            onOpenSupercharts={handleOpenSupercharts}
            onOpenScreener={handleOpenScreener}
            onOpenHeatmaps={() => {
              setActiveScreen('heatmaps');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCalendar={() => {
              setActiveScreen('calendar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'supercharts' && (
          <SuperchartsScreen
            initialSymbol={chartSymbol}
            onSelectSymbol={(sym) => setChartSymbol(sym)}
            onExecuteTrade={handleExecuteTrade}
            portfolioBalance={portfolioBalance}
          />
        )}

        {activeScreen === 'screener' && (
          <ScreenerScreen
            initialPreset={screenerPreset}
            onSelectSymbol={handleSelectSymbol}
            onOpenSupercharts={handleOpenSupercharts}
          />
        )}

        {activeScreen === 'heatmaps' && (
          <HeatmapScreen
            onSelectSymbol={handleSelectSymbol}
            onOpenSupercharts={handleOpenSupercharts}
          />
        )}

        {activeScreen === 'calendar' && (
          <CalendarScreen onSelectSymbol={handleSelectSymbol} />
        )}

        {activeScreen === 'community' && (
          <CommunityScreen onOpenSupercharts={handleOpenSupercharts} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectScreen={(screen) => {
          setActiveScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectSymbol={handleSelectSymbol}
      />

      {/* Global Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSymbol={handleSelectSymbol}
      />

      {/* Quick Asset Snapshot Drawer */}
      <AssetDetailModal
        asset={inspectedAsset}
        onClose={() => setInspectedAsset(null)}
        onOpenSupercharts={handleOpenSupercharts}
        onExecuteTrade={handleExecuteTrade}
      />
    </div>
  );
}
