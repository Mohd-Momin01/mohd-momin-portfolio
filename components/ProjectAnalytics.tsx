import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  Percent, 
  Layers, 
  DollarSign, 
  Activity, 
  Users, 
  ArrowUpRight, 
  BarChart3, 
  LineChart as LineIcon, 
  PieChart as PieIcon 
} from 'lucide-react';

// Custom dark theme styles matching Momin's portfolio
const colors = {
  emerald: '#10b981', // brand-accent
  cyan: '#06b6d4',    // brand-cyan
  darkCard: '#0A0A0A',
  border: 'rgba(255, 255, 255, 0.08)',
  textSecondary: '#94a3b8',
  tooltipBg: '#111827',
  gridColor: 'rgba(255, 255, 255, 0.03)'
};

// --- DATA DEFINITIONS ---

// 1. Sales Data Dashboard Metrics
const salesTrendData = [
  { name: 'Jan', Sales: 45000, Target: 40000 },
  { name: 'Feb', Sales: 52000, Target: 42000 },
  { name: 'Mar', Sales: 49000, Target: 45000 },
  { name: 'Apr', Sales: 63000, Target: 48000 },
  { name: 'May', Sales: 58000, Target: 50000 },
  { name: 'Jun', Sales: 68000, Target: 55000 },
];

const salesCategoryData = [
  { name: 'Technology', value: 45, color: colors.emerald },
  { name: 'Finance', value: 30, color: colors.cyan },
  { name: 'Retail & Consumer', value: 25, color: '#3b82f6' },
];

// 2. Stock Trend Analysis Metrics
const stockTrendData = [
  { day: 'Day 1', Price: 150.2, MA50: 148.5, Volume: 12000 },
  { day: 'Day 5', Price: 154.5, MA50: 149.1, Volume: 15000 },
  { day: 'Day 10', Price: 148.3, MA50: 149.6, Volume: 9000 },
  { day: 'Day 15', Price: 162.1, MA50: 151.2, Volume: 18000 },
  { day: 'Day 20', Price: 158.9, MA50: 152.4, Volume: 11000 },
  { day: 'Day 25', Price: 167.4, MA50: 154.1, Volume: 21000 },
  { day: 'Day 30', Price: 175.6, MA50: 156.3, Volume: 25000 },
];

// 3. Customer Churn & Retention Metrics
const churnCohortData = [
  { month: 'Month 1', Retention: 100 },
  { month: 'Month 2', Retention: 92 },
  { month: 'Month 3', Retention: 85 },
  { month: 'Month 4', Retention: 79 },
  { month: 'Month 5', Retention: 74 },
  { month: 'Month 6', Retention: 70 },
];

const churnDriverData = [
  { name: 'Price Sensitivity', HighRisk: 35, MediumRisk: 25, LowRisk: 15 },
  { name: 'Competitor Offer', HighRisk: 25, MediumRisk: 30, LowRisk: 20 },
  { name: 'Customer Service', HighRisk: 15, MediumRisk: 40, LowRisk: 30 },
  { name: 'Missing Features', HighRisk: 30, MediumRisk: 35, LowRisk: 25 },
];

type ProjectTab = 'sales' | 'stock' | 'churn';

const ProjectAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectTab>('sales');

  const customTooltipStyle = {
    backgroundColor: colors.tooltipBg,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#ffffff',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '12px'
  };

  return (
    <div 
      id="analytics-playground"
      className="mt-16 w-full bg-brand-card rounded-2xl border border-white/5 p-6 md:p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header and Switchers */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-accent font-mono text-sm mb-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            Interactive BI Sandbox
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white">Dynamic Project Analytics Playground</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Select a project below to interact with custom dashboards, trend lines, and segment analyses rendered dynamically.
          </p>
        </div>

        {/* Tab Controls - Premium Compact Dashboard Tabs */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-1.5 p-1 bg-black/50 backdrop-blur-md rounded-lg border border-white/5 self-stretch sm:self-auto w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('sales')}
            className={`relative flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-[11px] md:text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer col-span-1 ${
              activeTab === 'sales'
                ? 'text-brand-accent bg-brand-accent/[0.08]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <BarChart3 className={`w-3.5 h-3.5 transition-colors duration-200 ${activeTab === 'sales' ? 'text-brand-accent' : 'text-slate-400'}`} />
            <span className="truncate">Sales Sandbox</span>
            {activeTab === 'sales' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-1 right-1 h-[2px] bg-brand-accent rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('stock')}
            className={`relative flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-[11px] md:text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer col-span-1 ${
              activeTab === 'stock'
                ? 'text-brand-cyan bg-brand-cyan/[0.08]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <LineIcon className={`w-3.5 h-3.5 transition-colors duration-200 ${activeTab === 'stock' ? 'text-brand-cyan' : 'text-slate-400'}`} />
            <span className="truncate">Stock Insights</span>
            {activeTab === 'stock' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-1 right-1 h-[2px] bg-brand-cyan rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('churn')}
            className={`relative flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-[11px] md:text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer col-span-2 sm:col-span-auto ${
              activeTab === 'churn'
                ? 'text-emerald-400 bg-emerald-500/[0.08]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <PieIcon className={`w-3.5 h-3.5 transition-colors duration-200 ${activeTab === 'churn' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="truncate">Customer Churn</span>
            {activeTab === 'churn' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-1 right-1 h-[2px] bg-emerald-400 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        </div>
      </div>

      {/* Main Dashboard Render Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="min-h-[380px]"
        >
          {/* TAB 1: SALES PERFORMANCE */}
          {activeTab === 'sales' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Stat Cards */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-brand-accent/30 transition-all">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-brand-accent" /> TOTAL REVENUE
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">$335K</span>
                    <span className="text-xs text-brand-accent flex items-center font-mono">+12% YoY</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-brand-accent/30 transition-all">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-cyan" /> TARGET HIT RATE
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">115.4%</span>
                    <span className="text-xs text-brand-cyan flex items-center font-mono">Above KPI</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-brand-accent/30 transition-all">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-400" /> CATEGORIES
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">3 Majors</span>
                    <span className="text-xs text-blue-400 flex items-center font-mono">Cleaned</span>
                  </div>
                </div>
              </div>

              {/* Monthly Trend Chart */}
              <div className="lg:col-span-6 bg-black/20 border border-white/5 rounded-xl p-4 min-h-[300px] flex flex-col">
                <h4 className="text-sm font-semibold text-slate-200 mb-4 font-mono flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand-accent" /> Monthly Sales Revenue vs. Target (USD)
                </h4>
                <div className="w-full flex-grow h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.gridColor} />
                      <XAxis dataKey="name" stroke={colors.textSecondary} fontSize={11} tickLine={false} />
                      <YAxis stroke={colors.textSecondary} fontSize={11} tickLine={false} />
                      <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                      <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }} />
                      <Bar dataKey="Sales" fill={colors.emerald} name="Actual Sales" radius={[4, 4, 0, 0]} />
                      <Line type="monotone" dataKey="Target" stroke={colors.cyan} strokeWidth={2.5} name="Target Forecast" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Pie Chart */}
              <div className="lg:col-span-3 bg-black/20 border border-white/5 rounded-xl p-4 flex flex-col">
                <h4 className="text-sm font-semibold text-slate-200 mb-4 font-mono">Sales Contribution</h4>
                <div className="w-full flex-grow h-[180px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesCategoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {salesCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={customTooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  {salesCategoryData.map((cat, i) => (
                    <div key={i} className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                        {cat.name}
                      </div>
                      <span className="text-white font-bold">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STOCK MARKET INSIGHTS */}
          {activeTab === 'stock' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Stat Cards */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-brand-cyan/30 transition-all">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-cyan" /> ALPHA OUTPERFORMANCE
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">+2.4%</span>
                    <span className="text-xs text-brand-accent flex items-center font-mono">vs Nifty50</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-brand-cyan/30 transition-all">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-brand-accent" /> VOLATILITY BETA
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">0.92</span>
                    <span className="text-xs text-emerald-400 flex items-center font-mono">Low Risk</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-brand-cyan/30 transition-all">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-amber-400" /> HISTORICAL SHARPE
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">1.85</span>
                    <span className="text-xs text-amber-400 flex items-center font-mono">Excellent</span>
                  </div>
                </div>
              </div>

              {/* Price Line Chart */}
              <div className="lg:col-span-9 bg-black/20 border border-white/5 rounded-xl p-4 min-h-[300px] flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <h4 className="text-sm font-semibold text-slate-200 font-mono flex items-center gap-2">
                    <Activity className="w-4 h-4 text-brand-cyan" /> Stock Price Trend & 50-Day Moving Average
                  </h4>
                  <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">Interval: Daily 30D</span>
                </div>
                <div className="w-full flex-grow h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stockTrendData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.gridColor} />
                      <XAxis dataKey="day" stroke={colors.textSecondary} fontSize={11} tickLine={false} />
                      <YAxis stroke={colors.textSecondary} fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                      <Tooltip contentStyle={customTooltipStyle} />
                      <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }} />
                      <Line type="monotone" dataKey="Price" stroke={colors.cyan} strokeWidth={2.5} name="Asset Price ($)" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="MA50" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="5 5" name="50D Moving Avg" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMER CHURN & RETENTION */}
          {activeTab === 'churn' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Stat Cards */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-brand-accent" /> RETENTION RATE
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">84.5%</span>
                    <span className="text-xs text-brand-accent flex items-center font-mono">Strong</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-blue-400" /> LIFETIME VALUE
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">22 Mos</span>
                    <span className="text-xs text-blue-400 flex items-center font-mono">Average</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand-cyan" /> SAVED REVENUE ROI
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">240%</span>
                    <span className="text-xs text-brand-cyan flex items-center font-mono">Campaign ROI</span>
                  </div>
                </div>
              </div>

              {/* Retention Area Curve */}
              <div className="lg:col-span-5 bg-black/20 border border-white/5 rounded-xl p-4 min-h-[300px] flex flex-col">
                <h4 className="text-sm font-semibold text-slate-200 mb-4 font-mono flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" /> Cohort Retention Decay Curve (%)
                </h4>
                <div className="w-full flex-grow h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={churnCohortData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.emerald} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={colors.emerald} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.gridColor} />
                      <XAxis dataKey="month" stroke={colors.textSecondary} fontSize={11} tickLine={false} />
                      <YAxis stroke={colors.textSecondary} fontSize={11} tickLine={false} domain={[50, 100]} />
                      <Tooltip contentStyle={customTooltipStyle} />
                      <Area type="monotone" dataKey="Retention" stroke={colors.emerald} strokeWidth={2.5} fillOpacity={1} fill="url(#colorRetention)" name="Retention %" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stacked Drivers Bar Chart */}
              <div className="lg:col-span-4 bg-black/20 border border-white/5 rounded-xl p-4 min-h-[300px] flex flex-col">
                <h4 className="text-sm font-semibold text-slate-200 mb-4 font-mono flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-cyan" /> Churn Drivers by Segment Risk
                </h4>
                <div className="w-full flex-grow h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={churnDriverData} layout="vertical" margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.gridColor} horizontal={false} />
                      <XAxis type="number" stroke={colors.textSecondary} fontSize={10} tickLine={false} />
                      <YAxis dataKey="name" type="category" stroke={colors.textSecondary} fontSize={9} width={90} tickLine={false} />
                      <Tooltip contentStyle={customTooltipStyle} />
                      <Bar dataKey="HighRisk" name="High Risk" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="MediumRisk" name="Med Risk" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="LowRisk" name="Low Risk" stackId="a" fill={colors.emerald} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectAnalytics;
