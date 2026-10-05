import React, { useState } from 'react';
import { UPCOMING_ECONOMIC_EVENTS, EARNINGS_CALENDAR } from '../data/mockMarketData';

interface CalendarScreenProps {
  onSelectSymbol: (symbol: string) => void;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({ onSelectSymbol }) => {
  const [activeTab, setActiveTab] = useState<'economic' | 'earnings'>('economic');

  return (
    <div className="w-full max-w-[1380px] mx-auto px-4 lg:px-14 py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#131722] tracking-tight">Market Calendar</h1>
          <p className="text-sm text-[#787B86] mt-1">
            Global macroeconomic prints, interest rate decisions, and corporate earnings telemetry.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 bg-[#F0F3FA] p-1 rounded-xl border border-[#E0E3EB]">
          <button
            onClick={() => setActiveTab('economic')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'economic' ? 'bg-white text-[#131722] shadow-xs' : 'text-[#787B86]'
            }`}
          >
            Economic Calendar
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'earnings' ? 'bg-white text-[#131722] shadow-xs' : 'text-[#787B86]'
            }`}
          >
            Earnings &amp; IPOs
          </button>
        </div>
      </div>

      {activeTab === 'economic' ? (
        <div className="bg-white rounded-2xl border border-[#E0E3EB] shadow-xs overflow-hidden">
          <div className="p-4 bg-[#FAF9FF] border-b border-[#E0E3EB] flex items-center justify-between">
            <span className="font-bold text-sm text-[#131722]">High Impact Economic Releases (Today &amp; This Week)</span>
            <span className="text-xs text-[#787B86]">Timezone: Eastern Standard Time (EST)</span>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#787B86] text-[11px] font-semibold uppercase border-b border-[#E0E3EB] bg-white">
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Country</th>
                  <th className="py-3 px-4">Event</th>
                  <th className="py-3 px-4 text-center">Impact</th>
                  <th className="py-3 px-4 text-right">Actual</th>
                  <th className="py-3 px-4 text-right">Forecast</th>
                  <th className="py-3 px-4 text-right">Previous</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E3EB]/60 text-sm">
                {UPCOMING_ECONOMIC_EVENTS.map((event) => (
                  <tr key={event.id} className="hover:bg-[#F0F3FA] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-[#131722]">{event.time}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{event.flag}</span>
                        <span className="font-semibold text-xs text-[#131722]">{event.country}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#131722]">{event.event}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        event.impact === 'High' ? 'bg-[#FDECEE] text-[#F23645]' : 'bg-[#ebedfa] text-[#0049db]'
                      }`}>
                        {event.impact}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#089981] tabular-nums">{event.actual}</td>
                    <td className="py-3.5 px-4 text-right text-xs text-[#787B86] tabular-nums">{event.forecast}</td>
                    <td className="py-3.5 px-4 text-right text-xs text-[#787B86] tabular-nums">{event.previous}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E0E3EB] shadow-xs overflow-hidden">
          <div className="p-4 bg-[#FAF9FF] border-b border-[#E0E3EB] flex items-center justify-between">
            <span className="font-bold text-sm text-[#131722]">Corporate Earnings Calendar</span>
            <span className="text-xs text-[#787B86]">EPS consensus provided by institutional consensus</span>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#787B86] text-[11px] font-semibold uppercase border-b border-[#E0E3EB] bg-white">
                  <th className="py-3 px-4">Symbol / Company</th>
                  <th className="py-3 px-4">Reporting Date</th>
                  <th className="py-3 px-4 text-center">Timing</th>
                  <th className="py-3 px-4 text-right">Est EPS</th>
                  <th className="py-3 px-4 text-right">Reported EPS</th>
                  <th className="py-3 px-4 text-right">Surprise</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E3EB]/60 text-sm">
                {EARNINGS_CALENDAR.map((e) => (
                  <tr key={e.symbol} className="hover:bg-[#F0F3FA] transition-colors cursor-pointer group" onClick={() => onSelectSymbol(e.symbol)}>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#131722] group-hover:text-[#0049db]">{e.symbol}</div>
                      <div className="text-xs text-[#787B86]">{e.name}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-xs text-[#131722]">{e.date}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F0F3FA] text-[#131722]">
                        {e.timing === 'BMO' ? 'Before Open' : 'After Close'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-xs text-[#131722]">{e.estimatedEps}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-xs font-bold text-[#089981]">
                      {e.reportedEps || 'Pending'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-xs text-[#089981]">
                      {e.surprise || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(ev) => {
                          ev.stopPropagation();
                          onSelectSymbol(e.symbol);
                        }}
                        className="px-3 py-1 bg-[#F0F3FA] hover:bg-[#ebedfa] text-xs font-bold text-[#0049db] rounded-lg transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
