import React, { useState } from 'react';

interface CommunityScreenProps {
  onOpenSupercharts: (symbol: string) => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({ onOpenSupercharts }) => {
  const [filter, setFilter] = useState<'All' | 'Pine Script' | 'Macro' | 'Crypto'>('All');

  const ideas = [
    {
      id: 1,
      author: 'Alexander Elder Pro',
      reputation: '48.2k',
      title: 'S&P 500 (SPX): Bullish Trend Continuation into Year-End Target 6,100',
      symbol: 'SPX',
      assetType: 'Index',
      time: '2h ago',
      likes: 342,
      comments: 58,
      desc: 'SPX closed firmly above the 20-day exponential moving average. Volume expansion across breadth indicators suggests institutional accumulation remains intact.',
      bias: 'Long',
      tag: 'Macro'
    },
    {
      id: 2,
      author: 'PineMaster_Dev',
      reputation: '92.1k',
      title: 'Pine Script™ v5: High-Precision Dynamic Supply & Demand Order Blocks',
      symbol: 'NVDA',
      assetType: 'Stock',
      time: '4h ago',
      likes: 820,
      comments: 114,
      desc: 'This open-source indicator tracks institutional liquidity sweeps and identifies high-probability order blocks before continuation breaks.',
      bias: 'Strategy',
      tag: 'Pine Script'
    },
    {
      id: 3,
      author: 'SatoshiFlow',
      reputation: '31.5k',
      title: 'Bitcoin (BTC): Consolidating Above $94,000 Support Before $100K Test',
      symbol: 'BTC/USD',
      assetType: 'Crypto',
      time: '6h ago',
      likes: 512,
      comments: 89,
      desc: 'Exchange reserves hit multi-year lows while ETF spot inflows show sustained net daily additions above $400M.',
      bias: 'Long',
      tag: 'Crypto'
    }
  ];

  const filteredIdeas = filter === 'All' ? ideas : ideas.filter(i => i.tag === filter);

  return (
    <div className="w-full max-w-[1380px] mx-auto px-4 lg:px-14 py-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#131722] tracking-tight">Trading Community &amp; Scripts</h1>
          <p className="text-sm text-[#787B86] mt-1">
            Over 60 million global investors sharing verified chart setups, algorithmic Pine Scripts™, and macro research.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1 bg-[#F0F3FA] p-1 rounded-xl border border-[#E0E3EB]">
          {(['All', 'Pine Script', 'Macro', 'Crypto'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === cat ? 'bg-white text-[#131722] shadow-xs' : 'text-[#787B86]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white rounded-2xl border border-[#E0E3EB] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Author row */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#E0E3EB]/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#0049db] text-white flex items-center justify-center font-bold text-xs">
                    {idea.author[0]}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#131722]">{idea.author}</div>
                    <div className="text-[10px] text-[#787B86]">{idea.reputation} reputation • {idea.time}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  idea.bias === 'Long' ? 'bg-[#E8F5F2] text-[#089981]' : 'bg-[#ebedfa] text-[#0049db]'
                }`}>
                  {idea.bias}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-bold text-base text-[#131722] group-hover:text-[#0049db] transition-colors leading-snug">
                {idea.title}
              </h3>
              <p className="text-xs text-[#787B86] mt-2 line-clamp-3 leading-relaxed">
                {idea.desc}
              </p>
            </div>

            {/* Bottom metadata & Action */}
            <div className="pt-4 mt-4 border-t border-[#E0E3EB]/60 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-[#787B86]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                  {idea.likes}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                  {idea.comments}
                </span>
              </div>

              <button
                onClick={() => onOpenSupercharts(idea.symbol)}
                className="text-xs font-bold text-[#0049db] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Chart {idea.symbol} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
