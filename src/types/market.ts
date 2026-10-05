export type AssetCategory = 
  | 'indices' 
  | 'us-stocks' 
  | 'world-stocks' 
  | 'crypto' 
  | 'futures' 
  | 'forex' 
  | 'gov-bonds' 
  | 'corp-bonds' 
  | 'etfs' 
  | 'economy';

export interface MarketAsset {
  symbol: string;
  name: string;
  category: AssetCategory;
  price: number;
  change: number;
  changePercent: number;
  currency?: string;
  volume?: string;
  volumeNumeric?: number;
  marketCap?: string;
  peRatio?: number;
  dividendYield?: number;
  beta?: number;
  high52w?: number;
  low52w?: number;
  range52wPct?: number; // 0 - 100 for range bar
  country?: string;
  sparkline: number[];
  badgeText?: string;
  badgeBg?: string;
  badgeTextColor?: string;
  subtext?: string;
  rating?: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
}

export interface CandleData {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export interface EconomicEvent {
  id: string;
  time: string;
  country: string;
  flag: string;
  event: string;
  impact: 'High' | 'Medium' | 'Low';
  actual: string;
  forecast: string;
  previous: string;
}

export interface EarningsEvent {
  symbol: string;
  name: string;
  date: string;
  timing: 'BMO' | 'AMC'; // Before Market Open / After Market Close
  timingLabel: 'Today' | 'Tomorrow' | 'This Week';
  estimatedEps: string;
  reportedEps?: string;
  surprise?: string;
}

export interface HeatmapItem {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  marketCapNumber: number; // for proportional area sizing
  sector: string;
}

export interface Position {
  symbol: string;
  side: 'BUY' | 'SELL';
  shares: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  timestamp: number;
}
