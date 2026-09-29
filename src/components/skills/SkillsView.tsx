import React, { useState, useMemo } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { 
  Cpu, 
  Layers, 
  FileSpreadsheet
} from 'lucide-react';

interface SampleRecord {
  id: number;
  entity: string;
  category: 'Corporate' | 'Retail' | 'Executive' | 'Treasury';
  quarter: string;
  revenue: number;
  expenses: number;
  margin: number;
  pii_status: 'Masked' | 'Sensitive';
  outlier_score: number;
}

const RAW_DATASET: SampleRecord[] = [
  { id: 1, entity: "Alpha Corp (PAN: ABCDE1234F)", category: "Corporate", quarter: "Q1", revenue: 450000, expenses: 310000, margin: 31.1, pii_status: "Sensitive", outlier_score: 0.12 },
  { id: 2, entity: "Beta Retail (Acct: 9812-4410)", category: "Retail", quarter: "Q1", revenue: 180000, expenses: 140000, margin: 22.2, pii_status: "Sensitive", outlier_score: 0.45 },
  { id: 3, entity: "Gamma Logistics", category: "Corporate", quarter: "Q2", revenue: 890000, expenses: 560000, margin: 37.0, pii_status: "Masked", outlier_score: 0.88 },
  { id: 4, entity: "Director Wire (TAX-8891)", category: "Executive", quarter: "Q2", revenue: 420000, expenses: 120000, margin: 71.4, pii_status: "Sensitive", outlier_score: 1.95 },
  { id: 5, entity: "Treasury Yield Hub", category: "Treasury", quarter: "Q3", revenue: 620000, expenses: 180000, margin: 70.9, pii_status: "Masked", outlier_score: 0.65 },
  { id: 6, entity: "Omega Solutions", category: "Corporate", quarter: "Q3", revenue: 310000, expenses: 290000, margin: 6.4, pii_status: "Masked", outlier_score: 1.42 },
  { id: 7, entity: "Apex Retail Services", category: "Retail", quarter: "Q4", revenue: 290000, expenses: 210000, margin: 27.5, pii_status: "Masked", outlier_score: 0.28 },
  { id: 8, entity: "Delta Holdings (IBAN 3301)", category: "Executive", quarter: "Q4", revenue: 740000, expenses: 490000, margin: 33.7, pii_status: "Sensitive", outlier_score: 0.52 },
];

export const SkillsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(SKILL_CATEGORIES[0].title);
  const [activeTab, setActiveTab] = useState<'matrix' | 'sandbox'>('matrix');

  // Interactive Sandbox Controls
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [applyMasking, setApplyMasking] = useState<boolean>(true);
  const [minMargin, setMinMargin] = useState<number>(10);

  // Filtered sandbox records
  const processedData = useMemo(() => {
    return RAW_DATASET.filter((row) => {
      if (filterCategory !== 'All' && row.category !== filterCategory) return false;
      if (row.margin < minMargin) return false;
      return true;
    }).map((row) => {
      if (!applyMasking) return row;
      return {
        ...row,
        entity: row.entity.replace(/(\(.*?\))/g, '(REDACTED_PII)'),
        pii_status: 'Masked' as const,
      };
    });
  }, [filterCategory, applyMasking, minMargin]);

  // Aggregated metrics
  const aggregatedStats = useMemo(() => {
    const totalRev = processedData.reduce((acc, r) => acc + r.revenue, 0);
    const totalExp = processedData.reduce((acc, r) => acc + r.expenses, 0);
    const avgMargin = processedData.length > 0
      ? (processedData.reduce((acc, r) => acc + r.margin, 0) / processedData.length).toFixed(1)
      : '0';

    return { totalRev, totalExp, avgMargin, count: processedData.length };
  }, [processedData]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
          <Cpu className="w-4 h-4" />
          <span>Technical Competency & Data Science Matrix</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Engineering & Data Analytics Stack
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Comprehensive breakdown of programming languages, machine learning frameworks, data preprocessing pipelines, vector stores, and an interactive data manipulation sandbox.
        </p>

        {/* View Toggle */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-slate-900 text-white dark:bg-cyan-500/20 dark:text-cyan-300 dark:border dark:border-cyan-500/40 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Categorized Skills Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'sandbox'
                ? 'bg-slate-900 text-white dark:bg-cyan-500/20 dark:text-cyan-300 dark:border dark:border-cyan-500/40 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Interactive Data Wrangling Sandbox</span>
          </button>
        </div>
      </div>

      {activeTab === 'matrix' ? (
        /* Matrix View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Category Tabs List */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              Skill Domains
            </span>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setSelectedCategory(cat.title)}
                className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  selectedCategory === cat.title
                    ? 'bg-white dark:bg-slate-900 border-blue-600 dark:border-cyan-500/50 shadow-sm text-slate-900 dark:text-white ring-1 ring-blue-600/20'
                    : 'bg-white/60 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-900/40'
                }`}
              >
                <div className="font-bold text-sm text-slate-900 dark:text-slate-200">{cat.title}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {cat.description}
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Skill Cards for Active Domain */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            {(() => {
              const current = SKILL_CATEGORIES.find(c => c.title === selectedCategory) || SKILL_CATEGORIES[0];
              return (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{current.title}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{current.description}</p>
                  </div>

                  <div className="space-y-4">
                    {current.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-sm text-slate-900 dark:text-white">{skill.name}</span>
                            <span className="text-xs text-blue-600 dark:text-cyan-400 font-mono ml-2 font-medium">({skill.tags})</span>
                          </div>
                          <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                            {skill.level}% Proficiency
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-950 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-blue-600 dark:bg-cyan-400 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {skill.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      ) : (
        /* Interactive Data Wrangling Sandbox */
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Interactive Pandas Data Sandbox</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Filter, sanitize PII, compute group aggregates, and execute analytical transformations live.
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Category:</span>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-transparent text-slate-900 dark:text-white font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Retail">Retail</option>
                    <option value="Executive">Executive</option>
                    <option value="Treasury">Treasury</option>
                  </select>
                </div>

                <button
                  onClick={() => setApplyMasking(!applyMasking)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                    applyMasking
                      ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40 font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  PII Masking: {applyMasking ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Slider Control for Min Margin */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Filter Margin Threshold (&gt;= {minMargin}%)</span>
                <span className="font-mono text-blue-600 dark:text-cyan-400 font-semibold">{processedData.length} records matched</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={minMargin}
                onChange={(e) => setMinMargin(Number(e.target.value))}
                className="w-full accent-blue-600 dark:accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Summary Aggregates */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-xs text-slate-500 dark:text-slate-400">Filtered Records</div>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">{aggregatedStats.count}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-xs text-slate-500 dark:text-slate-400">Total Revenue</div>
                <div className="text-xl font-bold font-mono text-blue-600 dark:text-cyan-400 mt-0.5">
                  ${(aggregatedStats.totalRev / 1000).toFixed(0)}k
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-xs text-slate-500 dark:text-slate-400">Total Expenses</div>
                <div className="text-xl font-bold font-mono text-slate-700 dark:text-slate-300 mt-0.5">
                  ${(aggregatedStats.totalExp / 1000).toFixed(0)}k
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-xs text-slate-500 dark:text-slate-400">Mean Margin</div>
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {aggregatedStats.avgMargin}%
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-mono border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Entity Descriptor</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Quarter</th>
                    <th className="p-3 text-right">Revenue</th>
                    <th className="p-3 text-right">Expenses</th>
                    <th className="p-3 text-right">Margin</th>
                    <th className="p-3 text-center">PII State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-900 font-mono text-slate-800 dark:text-slate-300">
                  {processedData.map((row) => (
                    <tr key={row.id} className="hover:bg-white dark:hover:bg-slate-900/40 transition-colors">
                      <td className="p-3 text-slate-400">{row.id}</td>
                      <td className="p-3 font-sans font-medium text-slate-900 dark:text-white">{row.entity}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">{row.category}</td>
                      <td className="p-3 text-blue-600 dark:text-cyan-400 font-medium">{row.quarter}</td>
                      <td className="p-3 text-right tabular-nums">${row.revenue.toLocaleString()}</td>
                      <td className="p-3 text-right tabular-nums">${row.expenses.toLocaleString()}</td>
                      <td className="p-3 text-right tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">{row.margin}%</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          row.pii_status === 'Masked'
                            ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-medium'
                            : 'bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-medium'
                        }`}>
                          {row.pii_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
