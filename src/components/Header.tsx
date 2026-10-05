import React, { useState } from 'react';

export type ScreenTab = 'markets' | 'supercharts' | 'screener' | 'heatmaps' | 'calendar' | 'community';

interface HeaderProps {
  activeScreen: ScreenTab;
  onSelectScreen: (screen: ScreenTab) => void;
  onOpenSearch: () => void;
  portfolioBalance: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onSelectScreen,
  onOpenSearch,
  portfolioBalance
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'SPX Breakout Alert', desc: 'S&P 500 crossed 5,980 with strong breadth', time: '5m ago', unread: true },
    { id: 2, title: 'NVIDIA Volume Spike', desc: 'NVDA surged past $143.50 with +2.84% gain', time: '18m ago', unread: true },
    { id: 3, title: 'FOMC Minutes Released', desc: 'Fed indicates continued data-dependent policy easing', time: '1h ago', unread: false }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#FFFFFF] border-b border-[#E0E3EB]">
      <div className="h-16 w-full px-4 lg:px-14 flex items-center justify-between gap-4">
        {/* Left: Brand & Search */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <button 
            onClick={() => onSelectScreen('markets')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <img 
              alt="TradingView Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1US6dNuqpSK0E6TFf1XsYmKjQjpLgPuHx-cJjIBuzFubN66YVkdEg5DWJT2YwuBd5DrphfJT4fC2dXVbO2rtHihh_CoKv38msytPXzgOQI__2VuE8V4Zo5aukCyjVezvmU8FgZMiKv6cYVbPDqtMhWy2T0sRnV-hyNz4avSMZ0APvHo_nzqU9ZG8yw7yLBXxoiKaTI7mGWnovtVYhpL6josEh_pV7rG1V4PGb6QiJRuFQznRRjyJ3rJDcPg"
            />
            <span className="font-semibold text-[17px] text-[#131722] tracking-tight">TradingView</span>
          </button>

          {/* Search Trigger */}
          <div 
            onClick={onOpenSearch}
            className="hidden md:flex items-center h-10 w-64 lg:w-80 bg-[#F0F3FA] rounded-full px-3.5 text-[#787B86] cursor-pointer hover:bg-[#ebedfa] transition-colors border border-transparent hover:border-[#E0E3EB]"
          >
            <span className="material-symbols-outlined text-[19px] mr-2 text-[#787B86]">search</span>
            <span className="text-[14px] flex-1 select-none font-normal">Search symbols, indices, news</span>
            <span className="text-[11px] font-semibold bg-[#FFFFFF] border border-[#E0E3EB] px-1.5 py-0.5 rounded text-[#787B86] shadow-xs">
              Ctrl+K
            </span>
          </div>
        </div>

        {/* Center: Main Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-7 h-full">
          <button
            onClick={() => onSelectScreen('markets')}
            className={`h-full flex items-center text-[14px] transition-colors relative cursor-pointer ${
              activeScreen === 'markets'
                ? 'text-[#2962FF] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#2962FF]'
                : 'text-[#434656] hover:text-[#131722] font-medium'
            }`}
          >
            Markets
          </button>
          
          <button
            onClick={() => onSelectScreen('supercharts')}
            className={`h-full flex items-center text-[14px] transition-colors relative cursor-pointer ${
              activeScreen === 'supercharts'
                ? 'text-[#2962FF] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#2962FF]'
                : 'text-[#434656] hover:text-[#131722] font-medium'
            }`}
          >
            Supercharts
          </button>

          <button
            onClick={() => onSelectScreen('screener')}
            className={`h-full flex items-center text-[14px] transition-colors relative cursor-pointer ${
              activeScreen === 'screener'
                ? 'text-[#2962FF] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#2962FF]'
                : 'text-[#434656] hover:text-[#131722] font-medium'
            }`}
          >
            Screeners
          </button>

          <button
            onClick={() => onSelectScreen('heatmaps')}
            className={`h-full flex items-center text-[14px] transition-colors relative cursor-pointer ${
              activeScreen === 'heatmaps'
                ? 'text-[#2962FF] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#2962FF]'
                : 'text-[#434656] hover:text-[#131722] font-medium'
            }`}
          >
            Heatmaps
          </button>

          <button
            onClick={() => onSelectScreen('calendar')}
            className={`h-full flex items-center text-[14px] transition-colors relative cursor-pointer ${
              activeScreen === 'calendar'
                ? 'text-[#2962FF] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#2962FF]'
                : 'text-[#434656] hover:text-[#131722] font-medium'
            }`}
          >
            Calendar
          </button>

          <button
            onClick={() => onSelectScreen('community')}
            className={`h-full flex items-center text-[14px] transition-colors relative cursor-pointer ${
              activeScreen === 'community'
                ? 'text-[#2962FF] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#2962FF]'
                : 'text-[#434656] hover:text-[#131722] font-medium'
            }`}
          >
            Community
          </button>
        </nav>

        {/* Right: Actions, Language, Notifications, Profile, CTA */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Quick search on mobile */}
          <button 
            onClick={onOpenSearch} 
            className="md:hidden p-2 rounded-full text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA]"
            title="Search"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Language Indicator */}
          <button className="hidden sm:flex items-center gap-1 text-[#787B86] hover:text-[#131722] px-2.5 py-1.5 rounded-full hover:bg-[#F0F3FA] transition-colors text-xs font-semibold">
            <span className="material-symbols-outlined text-[19px]">language</span>
            <span>EN</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2 rounded-full text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA] transition-colors"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2962FF] ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E0E3EB] py-3 z-50">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-[#E0E3EB]">
                  <span className="font-semibold text-sm text-[#131722]">Market Alerts</span>
                  <span className="text-[11px] text-[#2962FF] font-semibold cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="divide-y divide-[#E0E3EB]/50 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-[#F0F3FA] transition-colors cursor-pointer text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#131722]">{n.title}</span>
                        <span className="text-[10px] text-[#787B86]">{n.time}</span>
                      </div>
                      <p className="text-xs text-[#787B86] mt-0.5">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar / Balance */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full hover:bg-[#F0F3FA] transition-colors cursor-pointer border border-transparent hover:border-[#E0E3EB]"
            >
              <div className="w-8 h-8 rounded-full bg-[#0049db] flex items-center justify-center text-white font-bold text-xs shadow-xs">
                TV
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[11px] font-semibold text-[#131722] leading-tight">Pro Trader</span>
                <span className="text-[10px] text-[#089981] font-bold tabular-nums">
                  ${portfolioBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E0E3EB] p-3 z-50">
                <div className="pb-2.5 mb-2.5 border-b border-[#E0E3EB]">
                  <div className="font-semibold text-sm text-[#131722]">Institutional Account</div>
                  <div className="text-xs text-[#787B86]">trader@tradingview.com</div>
                  <div className="mt-2 p-2 bg-[#F0F3FA] rounded-xl">
                    <div className="text-[10px] uppercase font-bold text-[#787B86]">Paper Balance</div>
                    <div className="text-sm font-bold text-[#131722] tabular-nums">
                      ${portfolioBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-xs font-medium text-[#131722] gap-1">
                  <button onClick={() => { onSelectScreen('supercharts'); setShowProfileMenu(false); }} className="p-2 hover:bg-[#F0F3FA] rounded-lg text-left flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#2962FF]">candlestick_chart</span>
                    Trading Workstation
                  </button>
                  <button onClick={() => { onSelectScreen('screener'); setShowProfileMenu(false); }} className="p-2 hover:bg-[#F0F3FA] rounded-lg text-left flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#2962FF]">tune</span>
                    Asset Screeners
                  </button>
                  <button onClick={() => { onSelectScreen('heatmaps'); setShowProfileMenu(false); }} className="p-2 hover:bg-[#F0F3FA] rounded-lg text-left flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#2962FF]">grid_view</span>
                    Market Heatmaps
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <button 
            onClick={() => onSelectScreen('supercharts')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0049db] hover:bg-[#2962FF] text-white text-[14px] font-semibold transition-all shadow-xs cursor-pointer"
          >
            Launch Terminal
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#131722] hover:bg-[#F0F3FA]"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#E0E3EB] px-4 py-3 shadow-lg flex flex-col gap-2">
          {(['markets', 'supercharts', 'screener', 'heatmaps', 'calendar', 'community'] as ScreenTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                onSelectScreen(tab);
                setMobileMenuOpen(false);
              }}
              className={`py-2 px-3 rounded-lg text-left capitalize text-sm font-medium ${
                activeScreen === tab ? 'bg-[#2962FF]/10 text-[#2962FF] font-semibold' : 'text-[#131722] hover:bg-[#F0F3FA]'
              }`}
            >
              {tab === 'supercharts' ? 'Supercharts Terminal' : tab}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
