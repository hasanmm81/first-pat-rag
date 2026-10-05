import { MarketAsset, CandleData, OrderBook, EconomicEvent, EarningsEvent, HeatmapItem } from '../types/market';

export const MAJOR_INDICES: MarketAsset[] = [
  {
    symbol: 'SPX',
    name: 'S&P 500',
    category: 'indices',
    price: 5980.50,
    change: 26.80,
    changePercent: 0.45,
    marketCap: '$47.8T',
    subtext: 'SPX • S&P',
    badgeText: '500',
    badgeBg: '#E53935',
    sparkline: [5940, 5952, 5948, 5965, 5958, 5972, 5968, 5980.50],
    rating: 'Buy',
    high52w: 6025.50,
    low52w: 4890.20,
    range52wPct: 92
  },
  {
    symbol: 'NDX',
    name: 'Nasdaq 100',
    category: 'indices',
    price: 21120.80,
    change: 171.85,
    changePercent: 0.82,
    marketCap: '$23.4T',
    subtext: 'NDX • NASDAQ',
    badgeText: '100',
    badgeBg: '#0088CC',
    sparkline: [20920, 20980, 20950, 21040, 21010, 21090, 21060, 21120.80],
    rating: 'Strong Buy',
    high52w: 21250.00,
    low52w: 16750.30,
    range52wPct: 96
  },
  {
    symbol: 'DJI',
    name: 'Dow 30',
    category: 'indices',
    price: 43840.10,
    change: -65.70,
    changePercent: -0.15,
    marketCap: '$14.2T',
    subtext: 'DJI • DOW JONES',
    badgeText: '30',
    badgeBg: '#00BCD4',
    sparkline: [43980, 43920, 43950, 43890, 43860, 43880, 43810, 43840.10],
    rating: 'Hold',
    high52w: 44480.00,
    low52w: 36800.50,
    range52wPct: 88
  },
  {
    symbol: 'RUT',
    name: 'US 2000',
    category: 'indices',
    price: 2210.40,
    change: 7.05,
    changePercent: 0.32,
    marketCap: '$3.1T',
    subtext: 'RUT • RUSSELL',
    badgeText: '2K',
    badgeBg: '#7E57C2',
    sparkline: [2195, 2200, 2192, 2206, 2202, 2212, 2208, 2210.40],
    rating: 'Buy',
    high52w: 2260.00,
    low52w: 1890.00,
    range52wPct: 76
  }
];

export const WORLD_INDICES: MarketAsset[] = [
  {
    symbol: 'NI225',
    name: 'Japan 225 Index',
    country: 'Japan',
    category: 'world-stocks',
    price: 38720.50,
    change: 474.20,
    changePercent: 1.24,
    range52wPct: 78,
    sparkline: [38200, 38350, 38500, 38720.50],
    rating: 'Buy'
  },
  {
    symbol: 'UKX',
    name: 'FTSE 100 Index',
    country: 'United Kingdom',
    category: 'world-stocks',
    price: 8298.15,
    change: -31.60,
    changePercent: -0.38,
    range52wPct: 65,
    sparkline: [8340, 8320, 8310, 8298.15],
    rating: 'Hold'
  },
  {
    symbol: 'DAX',
    name: 'DAX Index',
    country: 'Germany',
    category: 'world-stocks',
    price: 19530.40,
    change: 120.30,
    changePercent: 0.62,
    range52wPct: 91,
    sparkline: [19400, 19460, 19490, 19530.40],
    rating: 'Strong Buy'
  },
  {
    symbol: 'PX1',
    name: 'CAC 40 Index',
    country: 'France',
    category: 'world-stocks',
    price: 7542.80,
    change: -9.10,
    changePercent: -0.12,
    range52wPct: 52,
    sparkline: [7570, 7550, 7560, 7542.80],
    rating: 'Hold'
  },
  {
    symbol: 'HSI',
    name: 'Hang Seng Index',
    country: 'Hong Kong',
    category: 'world-stocks',
    price: 20580.20,
    change: 374.50,
    changePercent: 1.85,
    range52wPct: 70,
    sparkline: [20100, 20300, 20450, 20580.20],
    rating: 'Buy'
  },
  {
    symbol: 'NIFTY',
    name: 'Nifty 50 Index',
    country: 'India',
    category: 'world-stocks',
    price: 24399.40,
    change: 116.30,
    changePercent: 0.48,
    range52wPct: 84,
    sparkline: [24250, 24310, 24350, 24399.40],
    rating: 'Strong Buy'
  }
];

export const MEGA_CAP_STOCKS: MarketAsset[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    category: 'us-stocks',
    price: 143.60,
    change: 3.96,
    changePercent: 2.84,
    marketCap: '$3.52T',
    volume: '128.4M',
    volumeNumeric: 128400000,
    peRatio: 58.4,
    dividendYield: 0.03,
    beta: 1.68,
    high52w: 149.77,
    low52w: 45.11,
    range52wPct: 94,
    badgeText: 'NV',
    badgeBg: '#76B900',
    sparkline: [138.5, 139.8, 141.2, 140.5, 142.1, 143.60],
    rating: 'Strong Buy'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    category: 'us-stocks',
    price: 234.90,
    change: 1.68,
    changePercent: 0.72,
    marketCap: '$3.58T',
    volume: '48.2M',
    volumeNumeric: 48200000,
    peRatio: 34.6,
    dividendYield: 0.43,
    beta: 1.05,
    high52w: 237.23,
    low52w: 164.08,
    range52wPct: 98,
    badgeText: 'AP',
    badgeBg: '#131722',
    sparkline: [232.8, 233.5, 233.1, 234.2, 234.90],
    rating: 'Buy'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    category: 'us-stocks',
    price: 208.10,
    change: 2.77,
    changePercent: 1.35,
    marketCap: '$2.18T',
    volume: '41.5M',
    volumeNumeric: 41500000,
    peRatio: 42.1,
    dividendYield: 0,
    beta: 1.15,
    high52w: 211.80,
    low52w: 118.35,
    range52wPct: 95,
    badgeText: 'AZ',
    badgeBg: '#FF9900',
    sparkline: [204.2, 205.8, 206.5, 207.3, 208.10],
    rating: 'Strong Buy'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    category: 'us-stocks',
    price: 180.45,
    change: -0.76,
    changePercent: -0.42,
    marketCap: '$2.24T',
    volume: '22.8M',
    volumeNumeric: 22800000,
    peRatio: 23.8,
    dividendYield: 0.44,
    beta: 1.02,
    high52w: 191.75,
    low52w: 129.40,
    range52wPct: 82,
    badgeText: 'GO',
    badgeBg: '#4285F4',
    sparkline: [181.8, 181.2, 180.9, 180.2, 180.45],
    rating: 'Buy'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    category: 'us-stocks',
    price: 338.74,
    change: 13.59,
    changePercent: 4.18,
    marketCap: '$1.08T',
    volume: '74.9M',
    volumeNumeric: 74900000,
    peRatio: 112.4,
    dividendYield: 0,
    beta: 2.34,
    high52w: 358.64,
    low52w: 138.80,
    range52wPct: 89,
    badgeText: 'TS',
    badgeBg: '#E82127',
    sparkline: [322.0, 326.5, 331.0, 334.8, 338.74],
    rating: 'Buy'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    category: 'us-stocks',
    price: 425.20,
    change: 1.19,
    changePercent: 0.28,
    marketCap: '$3.16T',
    volume: '19.4M',
    volumeNumeric: 19400000,
    peRatio: 33.2,
    dividendYield: 0.75,
    beta: 0.91,
    high52w: 468.35,
    low52w: 366.50,
    range52wPct: 78,
    badgeText: 'MS',
    badgeBg: '#00A4EF',
    sparkline: [423.5, 424.1, 424.8, 425.20],
    rating: 'Strong Buy'
  }
];

export const HIGHEST_VOLUME_STOCKS = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', volume: '128.4M vol', changePercent: 2.84, price: 143.60 },
  { symbol: 'MU', name: 'Micron Technology, Inc.', volume: '82.1M vol', changePercent: 5.60, price: 104.25 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', volume: '74.9M vol', changePercent: 4.18, price: 338.74 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', volume: '56.2M vol', changePercent: -1.12, price: 137.90 }
];

export const MOST_VOLATILE_STOCKS = [
  { symbol: 'DRCT', name: 'Direct Digital Holdings', price: 3.42, changePercent: 48.2 },
  { symbol: 'AMOD', name: 'Alpha Modus Holdings', price: 1.18, changePercent: -22.6 },
  { symbol: 'FLUX', name: 'Flux Power Holdings', price: 4.95, changePercent: 19.8 },
  { symbol: 'RPGL', name: 'Republic Power Group', price: 0.84, changePercent: -15.4 }
];

export const EARNINGS_CALENDAR: EarningsEvent[] = [
  { symbol: 'PKE', name: 'Park Aerospace Corp.', date: 'Today', timing: 'BMO', timingLabel: 'Today', estimatedEps: '0.16 USD', reportedEps: '0.18 USD', surprise: '+12.5%' },
  { symbol: 'VFS', name: 'VinFast Auto Ltd.', date: 'Today', timing: 'AMC', timingLabel: 'Today', estimatedEps: '-0.27 USD' },
  { symbol: 'RPM', name: 'RPM International Inc.', date: 'Tomorrow', timing: 'BMO', timingLabel: 'Tomorrow', estimatedEps: '1.95 USD' },
  { symbol: 'DAL', name: 'Delta Air Lines, Inc.', date: 'This Week', timing: 'BMO', timingLabel: 'This Week', estimatedEps: '1.52 USD' }
];

export const CRYPTO_ASSETS: MarketAsset[] = [
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin',
    category: 'crypto',
    price: 94310.00,
    change: 2872.40,
    changePercent: 3.14,
    marketCap: '$1.72T',
    volume: '$48.6B',
    sparkline: [91200, 92100, 92900, 93400, 94310.00],
    rating: 'Strong Buy'
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum',
    category: 'crypto',
    price: 3480.20,
    change: 83.30,
    changePercent: 2.45,
    marketCap: '$329.6B',
    volume: '$22.1B',
    sparkline: [3380, 3410, 3440, 3460, 3480.20],
    rating: 'Buy'
  },
  {
    symbol: 'USDT',
    name: 'Tether USDt',
    category: 'crypto',
    price: 1.000,
    change: 0.00,
    changePercent: 0.00,
    marketCap: '$132.4B',
    sparkline: [1.0, 1.0, 1.0, 1.0]
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    category: 'crypto',
    price: 648.50,
    change: 11.45,
    changePercent: 1.80,
    marketCap: '$94.2B',
    sparkline: [635, 640, 642, 648.50]
  },
  {
    symbol: 'XRP',
    name: 'XRP',
    category: 'crypto',
    price: 1.58,
    change: 0.101,
    changePercent: 6.85,
    marketCap: '$89.8B',
    sparkline: [1.44, 1.48, 1.52, 1.58]
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    category: 'crypto',
    price: 0.999,
    change: -0.0001,
    changePercent: -0.01,
    marketCap: '$39.5B',
    sparkline: [0.999, 1.0, 0.999]
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    category: 'crypto',
    price: 198.40,
    change: 9.15,
    changePercent: 4.84,
    marketCap: '$93.1B',
    sparkline: [186, 189, 194, 198.40]
  }
];

export const FUTURES_COMMODITIES: MarketAsset[] = [
  {
    symbol: 'GC1!',
    name: 'Gold',
    category: 'futures',
    price: 2682.40,
    change: 16.20,
    changePercent: 0.61,
    currency: 'USD',
    subtext: 'COMEX Metal',
    sparkline: [2660, 2670, 2675, 2682.40],
    rating: 'Strong Buy'
  },
  {
    symbol: 'CL1!',
    name: 'Light Crude',
    category: 'futures',
    price: 68.42,
    change: -0.86,
    changePercent: -1.24,
    currency: 'USD',
    subtext: 'NYMEX Energy',
    sparkline: [69.5, 69.1, 68.8, 68.42],
    rating: 'Hold'
  },
  {
    symbol: 'SI1!',
    name: 'Silver',
    category: 'futures',
    price: 31.450,
    change: 0.348,
    changePercent: 1.12,
    currency: 'USD',
    subtext: 'COMEX Metal',
    sparkline: [31.0, 31.2, 31.35, 31.450]
  },
  {
    symbol: 'NG1!',
    name: 'Natural Gas',
    category: 'futures',
    price: 3.240,
    change: 0.120,
    changePercent: 3.84,
    currency: 'USD',
    subtext: 'NYMEX Energy',
    sparkline: [3.10, 3.16, 3.20, 3.240]
  },
  {
    symbol: 'HG1!',
    name: 'Copper',
    category: 'futures',
    price: 4.182,
    change: -0.019,
    changePercent: -0.45,
    currency: 'USD',
    subtext: 'COMEX Metal',
    sparkline: [4.21, 4.19, 4.20, 4.182]
  },
  {
    symbol: 'ES1!',
    name: 'E-mini S&P 500',
    category: 'futures',
    price: 5984.75,
    change: 28.50,
    changePercent: 0.48,
    currency: 'USD',
    subtext: 'CME Equity Index',
    sparkline: [5950, 5965, 5972, 5984.75]
  }
];

export const FOREX_PAIRS = [
  { symbol: 'EURUSD', name: 'EUR to USD (EURUSD)', price: 1.0542, changePercent: -0.21 },
  { symbol: 'USDJPY', name: 'USD to JPY (USDJPY)', price: 154.68, changePercent: 0.38 },
  { symbol: 'GBPUSD', name: 'GBP to USD (GBPUSD)', price: 1.2678, changePercent: -0.14 },
  { symbol: 'AUDUSD', name: 'AUD to USD (AUDUSD)', price: 0.6514, changePercent: 0.26 },
  { symbol: 'USDCAD', name: 'USD to CAD (USDCAD)', price: 1.4012, changePercent: 0.15 },
  { symbol: 'USDCHF', name: 'USD to CHF (USDCHF)', price: 0.8845, changePercent: 0.08 }
];

export const CURRENCY_INDICES = [
  { symbol: 'DXY', name: 'Dollar Index', price: 106.84, changePercent: 0.22 },
  { symbol: 'EXY', name: 'Euro Index', price: 94.80, changePercent: -0.18 },
  { symbol: 'JXY', name: 'Yen Index', price: 65.12, changePercent: -0.41 }
];

export const GOVERNMENT_BONDS = [
  { symbol: 'US01Y', name: '1 Year (US01Y)', price: 95.743, yieldRate: '4.459% yield', changePercent: 0.01 },
  { symbol: 'US02Y', name: '2 Years (US02Y)', price: 99.891, yieldRate: '4.808% yield', changePercent: 0.04 },
  { symbol: 'US10Y', name: '10 Years (US10Y)', price: 95.129, yieldRate: '5.264% yield', changePercent: 0.09 },
  { symbol: 'US30Y', name: '30 Years (US30Y)', price: 92.910, yieldRate: '5.617% yield', changePercent: 0.09 }
];

export const CORPORATE_BONDS = [
  {
    name: 'Petroleos Mexicanos',
    coupon: '7.69% (Fixed)',
    maturity: 'Jan 2050',
    type: 'HIGH YIELD',
    rating: 'BB-'
  },
  {
    name: 'SBL Holdings, Inc.',
    coupon: '7.20% (Fixed)',
    maturity: 'Oct 2034',
    type: 'HIGH YIELD',
    rating: 'B+'
  },
  {
    name: 'Walmart Inc. 4.1%',
    coupon: 'YTM: 4.29%',
    maturity: 'Apr 2027',
    type: 'INVESTMENT GRADE',
    rating: 'AA'
  },
  {
    name: 'Apple Inc. 3.85%',
    coupon: 'YTM: 3.92%',
    maturity: 'Aug 2029',
    type: 'INVESTMENT GRADE',
    rating: 'AAA'
  }
];

export const POPULAR_ETFS = [
  { symbol: 'SPY', name: 'SPDR S&P 500', desc: 'AUM $580B', changePercent: 0.46 },
  { symbol: 'QQQ', name: 'Invesco QQQ', desc: 'Nasdaq 100 Tracker', changePercent: 0.81 },
  { symbol: 'IBIT', name: 'iShares Bitcoin', desc: 'Spot BTC ETF', changePercent: 3.20 },
  { symbol: 'GLD', name: 'SPDR Gold Shares', desc: 'Physical Gold Trust', changePercent: 0.58 }
];

export const ECONOMIC_PULSE = [
  { label: 'US GDP Growth', value: '+2.8%', detail: 'Annualized Q3' },
  { label: 'US Interest Rate', value: '4.75%', detail: 'Target Range 4.50-4.75%' },
  { label: 'US Inflation YoY', value: '2.6%', detail: 'Headline CPI' },
  { label: 'Unemployment Rate', value: '4.1%', detail: 'U-3 Metric' }
];

export const HEATMAP_DATA: HeatmapItem[] = [
  // Technology
  { symbol: 'NVDA', name: 'NVIDIA', price: 143.60, changePercent: 2.84, marketCapNumber: 3520, sector: 'Technology' },
  { symbol: 'AAPL', name: 'Apple', price: 234.90, changePercent: 0.72, marketCapNumber: 3580, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft', price: 425.20, changePercent: 0.28, marketCapNumber: 3160, sector: 'Technology' },
  { symbol: 'AVGO', name: 'Broadcom', price: 172.40, changePercent: 3.12, marketCapNumber: 805, sector: 'Technology' },
  { symbol: 'AMD', name: 'AMD', price: 137.90, changePercent: -1.12, marketCapNumber: 223, sector: 'Technology' },
  { symbol: 'CRM', name: 'Salesforce', price: 298.50, changePercent: 1.45, marketCapNumber: 286, sector: 'Technology' },
  
  // Consumer Cyclical
  { symbol: 'AMZN', name: 'Amazon', price: 208.10, changePercent: 1.35, marketCapNumber: 2180, sector: 'Consumer Cyclical' },
  { symbol: 'TSLA', name: 'Tesla', price: 338.74, changePercent: 4.18, marketCapNumber: 1080, sector: 'Consumer Cyclical' },
  { symbol: 'HD', name: 'Home Depot', price: 395.20, changePercent: -0.65, marketCapNumber: 392, sector: 'Consumer Cyclical' },
  { symbol: 'MCD', name: "McDonald's", price: 292.10, changePercent: 0.15, marketCapNumber: 210, sector: 'Consumer Cyclical' },

  // Communication Services
  { symbol: 'GOOGL', name: 'Alphabet', price: 180.45, changePercent: -0.42, marketCapNumber: 2240, sector: 'Communication Services' },
  { symbol: 'META', name: 'Meta Platforms', price: 585.30, changePercent: 1.95, marketCapNumber: 1480, sector: 'Communication Services' },
  { symbol: 'NFLX', name: 'Netflix', price: 890.10, changePercent: 2.10, marketCapNumber: 382, sector: 'Communication Services' },

  // Financial
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 242.80, changePercent: 0.85, marketCapNumber: 695, sector: 'Financial' },
  { symbol: 'BAC', name: 'Bank of America', price: 46.20, changePercent: -0.32, marketCapNumber: 358, sector: 'Financial' },
  { symbol: 'V', name: 'Visa', price: 312.40, changePercent: 0.45, marketCapNumber: 630, sector: 'Financial' },

  // Healthcare
  { symbol: 'LLY', name: 'Eli Lilly', price: 795.50, changePercent: -1.80, marketCapNumber: 755, sector: 'Healthcare' },
  { symbol: 'UNH', name: 'UnitedHealth', price: 540.20, changePercent: 0.90, marketCapNumber: 498, sector: 'Healthcare' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 154.30, changePercent: -0.15, marketCapNumber: 371, sector: 'Healthcare' },

  // Energy
  { symbol: 'XOM', name: 'Exxon Mobil', price: 118.20, changePercent: -1.45, marketCapNumber: 470, sector: 'Energy' },
  { symbol: 'CVX', name: 'Chevron', price: 158.40, changePercent: -0.92, marketCapNumber: 290, sector: 'Energy' }
];

export const UPCOMING_ECONOMIC_EVENTS: EconomicEvent[] = [
  { id: '1', time: '08:30 EST', country: 'US', flag: '🇺🇸', event: 'Consumer Price Index (CPI YoY)', impact: 'High', actual: '2.6%', forecast: '2.6%', previous: '2.4%' },
  { id: '2', time: '08:30 EST', country: 'US', flag: '🇺🇸', event: 'Core CPI (MoM)', impact: 'High', actual: '0.3%', forecast: '0.3%', previous: '0.3%' },
  { id: '3', time: '14:00 EST', country: 'US', flag: '🇺🇸', event: 'FOMC Meeting Minutes', impact: 'High', actual: 'Dovish bias noted', forecast: '-', previous: '-' },
  { id: '4', time: '04:00 EST', country: 'EU', flag: '🇪🇺', event: 'ECB President Lagarde Speech', impact: 'Medium', actual: 'Completed', forecast: '-', previous: '-' },
  { id: '5', time: '19:50 EST', country: 'JP', flag: '🇯🇵', event: 'Bank of Japan Monetary Policy Summary', impact: 'High', actual: 'Hawkish shift', forecast: 'Hawkish', previous: 'Neutral' }
];

/**
 * Deterministic generator for interactive candlestick historical bars
 */
export function generateCandles(basePrice: number, count = 48, trend = 0.001): CandleData[] {
  const candles: CandleData[] = [];
  let currentPrice = basePrice * 0.96;
  const now = Date.now();
  const stepMs = 15 * 60 * 1000; // 15m intervals

  for (let i = 0; i < count; i++) {
    const timestamp = now - (count - i) * stepMs;
    const timeStr = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const volatility = currentPrice * 0.006;
    const change = (Math.random() - 0.48) * volatility + (currentPrice * trend);
    
    const open = currentPrice;
    const close = Math.max(1, open + change);
    const high = Math.max(open, close) + Math.random() * volatility * 0.7;
    const low = Math.min(open, close) - Math.random() * volatility * 0.7;
    const volume = Math.floor(25000 + Math.random() * 85000);

    candles.push({
      time: timeStr,
      timestamp,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume
    });

    currentPrice = close;
  }
  return candles;
}

/**
 * Generates an active orderbook ladder for a given price
 */
export function generateOrderBook(midPrice: number): OrderBook {
  const bids = [];
  const asks = [];
  let runningBidTotal = 0;
  let runningAskTotal = 0;

  for (let i = 1; i <= 8; i++) {
    const bidPrice = Number((midPrice * (1 - i * 0.0004)).toFixed(2));
    const bidSize = Number((Math.random() * 20 + 2).toFixed(2));
    runningBidTotal += bidSize;
    bids.push({ price: bidPrice, size: bidSize, total: Number(runningBidTotal.toFixed(2)) });

    const askPrice = Number((midPrice * (1 + i * 0.0004)).toFixed(2));
    const askSize = Number((Math.random() * 20 + 2).toFixed(2));
    runningAskTotal += askSize;
    asks.push({ price: askPrice, size: askSize, total: Number(runningAskTotal.toFixed(2)) });
  }

  return { bids, asks };
}
