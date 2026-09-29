import React, { useState, useMemo } from 'react';
import { Shield, Search, FileText, CheckCircle2, Cpu, Layers } from 'lucide-react';

interface DocumentChunk {
  id: string;
  source: string;
  category: 'Balance Sheet' | 'P&L Statement' | 'Tax & Compliance' | 'Audit Note';
  rawText: string;
  maskedText: string;
  x: number; // 2D PCA coordinate
  y: number;
  piiItems: string[];
}

const SAMPLE_CHUNKS: DocumentChunk[] = [
  {
    id: "chunk-01",
    source: "FY24_Q3_BalanceSheet.pdf",
    category: "Balance Sheet",
    rawText: "Total current assets recorded at $14,850,000. Operating cash held at Chase Bank Acct #9842-1049-8821 under CFO Johnathan Miller (SSN: 849-21-9943, PAN: ABCDE1234F).",
    maskedText: "Total current assets recorded at $14,850,000. Operating cash held at Chase Bank Acct [REDACTED_ACCT_NO] under CFO [REDACTED_NAME] (SSN: [REDACTED_SSN], PAN: [REDACTED_PAN]).",
    x: 25,
    y: 35,
    piiItems: ["Acct #9842-1049-8821", "Johnathan Miller", "SSN: 849-21-9943", "PAN: ABCDE1234F"],
  },
  {
    id: "chunk-02",
    source: "Executive_Comp_Audit.csv",
    category: "Audit Note",
    rawText: "Director compensation package includes base salary of $420,000 payable to wire IBAN US33CHAS000123456789 for tax ID TAX-883-9912. Verified by auditor Sarah Jenkins.",
    maskedText: "Director compensation package includes base salary of $420,000 payable to wire IBAN [REDACTED_IBAN] for tax ID [REDACTED_TAX_ID]. Verified by auditor [REDACTED_NAME].",
    x: 32,
    y: 70,
    piiItems: ["IBAN US33CHAS...", "TAX-883-9912", "Sarah Jenkins"],
  },
  {
    id: "chunk-03",
    source: "Q4_Income_Statement.xlsx",
    category: "P&L Statement",
    rawText: "Gross revenue of $48.2M with EBITDA margin of 28.4%. Operating expenses normalized at $34.5M excluding non-recurring cloud infrastructure amortizations.",
    maskedText: "Gross revenue of $48.2M with EBITDA margin of 28.4%. Operating expenses normalized at $34.5M excluding non-recurring cloud infrastructure amortizations.",
    x: 75,
    y: 40,
    piiItems: [],
  },
  {
    id: "chunk-04",
    source: "Tax_Filing_Form_10K.pdf",
    category: "Tax & Compliance",
    rawText: "Statutory tax provision of $3.2M deposited to Department of Revenue under Corporate GSTIN 24AAACG1234F1Z5 by compliance lead Rajesh Patel (Tel: +91-9876543210).",
    maskedText: "Statutory tax provision of $3.2M deposited to Department of Revenue under Corporate GSTIN [REDACTED_GSTIN] by compliance lead [REDACTED_NAME] (Tel: [REDACTED_PHONE]).",
    x: 60,
    y: 80,
    piiItems: ["GSTIN 24AAACG...", "Rajesh Patel", "+91-9876543210"],
  },
  {
    id: "chunk-05",
    source: "Liquidity_Risk_Report.pdf",
    category: "Balance Sheet",
    rawText: "Short-term treasury yield portfolio generates 4.85% annual return with zero covenant defaults across all tiered commercial paper investments.",
    maskedText: "Short-term treasury yield portfolio generates 4.85% annual return with zero covenant defaults across all tiered commercial paper investments.",
    x: 40,
    y: 25,
    piiItems: [],
  },
  {
    id: "chunk-06",
    source: "R&D_Expenditure_Breakdown.pdf",
    category: "P&L Statement",
    rawText: "AI model training and compute clusters accounted for $4.1M in Q3, resulting in a 42% reduction in automated financial retrieval pipeline inference latency.",
    maskedText: "AI model training and compute clusters accounted for $4.1M in Q3, resulting in a 42% reduction in automated financial retrieval pipeline inference latency.",
    x: 82,
    y: 60,
    piiItems: [],
  },
];

export const FinancialRAGVisualizer: React.FC = () => {
  const [activeQuery, setActiveQuery] = useState("What was the gross revenue and EBITDA margin in Q4?");
  const [piiMaskingEnabled, setPiiMaskingEnabled] = useState(true);
  const [selectedChunk, setSelectedChunk] = useState<DocumentChunk>(SAMPLE_CHUNKS[2]);
  const [customInputText, setCustomInputText] = useState(
    "Transfer $125,000 from Treasury Acct #4419-8291-0021 (Owner: David Vance, PAN: BPKPV9821M) for Q3 AWS cloud invoice."
  );

  // Live PII Regex Engine simulator
  const liveMaskedResult = useMemo(() => {
    let text = customInputText;
    const detected: { type: string; val: string }[] = [];

    // Account numbers
    const acctRegex = /(?:Acct\s*#?|account\s*number[:\s]*)\s*([0-9\-]+)/gi;
    text = text.replace(acctRegex, (match, p1) => {
      detected.push({ type: "Bank Account", val: p1 });
      return `Acct [REDACTED_ACCT_${p1.slice(-4)}]`;
    });

    // PAN / Tax ID
    const panRegex = /\b([A-Z]{5}[0-9]{4}[A-Z]{1})\b/g;
    text = text.replace(panRegex, (match) => {
      detected.push({ type: "PAN Card / Tax ID", val: match });
      return `[REDACTED_PAN]`;
    });

    // Names in context
    const nameRegex = /(?:Owner|CFO|Lead|Director|auditor|under CFO)\s*:\s*([A-Z][a-z]+\s+[A-Z][a-z]+)/gi;
    text = text.replace(nameRegex, (match, p1) => {
      detected.push({ type: "Individual Name", val: p1 });
      return `Owner: [REDACTED_NAME]`;
    });

    // SSN
    const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
    text = text.replace(ssnRegex, (match) => {
      detected.push({ type: "SSN Identifier", val: match });
      return `[REDACTED_SSN]`;
    });

    return { masked: text, detected };
  }, [customInputText]);

  // Compute mock cosine similarity
  const queryRankings = useMemo(() => {
    const q = activeQuery.toLowerCase();
    return SAMPLE_CHUNKS.map((chunk) => {
      let score = 0.25;
      const text = chunk.rawText.toLowerCase();

      if (q.includes("revenue") || q.includes("ebitda")) {
        if (chunk.id === "chunk-03") score = 0.94;
        if (chunk.id === "chunk-06") score = 0.78;
      } else if (q.includes("cash") || q.includes("assets") || q.includes("balance")) {
        if (chunk.id === "chunk-01") score = 0.92;
        if (chunk.id === "chunk-05") score = 0.84;
      } else if (q.includes("tax") || q.includes("compliance") || q.includes("gstin")) {
        if (chunk.id === "chunk-04") score = 0.95;
        if (chunk.id === "chunk-02") score = 0.74;
      } else if (q.includes("salary") || q.includes("compensation") || q.includes("audit")) {
        if (chunk.id === "chunk-02") score = 0.91;
        if (chunk.id === "chunk-01") score = 0.68;
      } else {
        const words = q.split(" ");
        let matches = 0;
        words.forEach(w => {
          if (w.length > 3 && text.includes(w)) matches++;
        });
        score = Math.min(0.96, Math.max(0.35, 0.45 + matches * 0.15));
      }

      return {
        ...chunk,
        similarity: parseFloat(score.toFixed(3)),
      };
    }).sort((a, b) => b.similarity - a.similarity);
  }, [activeQuery]);

  const presetQueries = [
    "What was the gross revenue and EBITDA margin in Q4?",
    "Show liquid cash reserves and CFO bank holdings",
    "Find statutory corporate tax deposits and GSTIN records",
    "Review executive compensation and wire transfer audit logs",
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm w-full max-w-full">
      {/* Header bar */}
      <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            <Cpu className="w-4 h-4 shrink-0" />
            <span className="truncate">Interactive Data Visualizer · Project 1</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 break-words">
            Privacy-Guard AI · Vector Space & PII Engine
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time semantic vector retrieval via ChromaDB with pre-indexing PII sanitization.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-500 dark:text-slate-400">PII Masking:</span>
            <button
              onClick={() => setPiiMaskingEnabled(!piiMaskingEnabled)}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                piiMaskingEnabled 
                  ? 'bg-blue-50 dark:bg-cyan-500/20 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/40' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {piiMaskingEnabled ? 'ACTIVE (Zero-Leak)' : 'DISABLED'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
        {/* Left Column: ChromaDB Vector Scatter Space & Retrieval Rankings */}
        <div className="lg:col-span-7 p-4 sm:p-6 space-y-6 min-w-0">
          {/* Query Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Search className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Query ChromaDB Vector Index</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={activeQuery}
                onChange={(e) => setActiveQuery(e.target.value)}
                placeholder="Type a financial analytical question..."
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-500"
              />
            </div>
            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {presetQueries.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveQuery(preset)}
                  className={`text-xs px-2.5 py-1 rounded-lg text-left transition-colors truncate max-w-full cursor-pointer ${
                    activeQuery === preset
                      ? 'bg-blue-50 dark:bg-cyan-500/20 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/30 font-medium'
                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* 2D Vector Embedding Space Projection */}
          <div className="bg-slate-50/70 dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Dense Vector Embedding Space (384-d → 2D PCA)
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">Metric: Cosine Distance</span>
            </div>

            <div className="relative h-56 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800/80 overflow-hidden p-3 shadow-inner">
              {/* Coordinate grid */}
              <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
              
              {/* Origin axes */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 dark:bg-slate-800 pointer-events-none" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 pointer-events-none" />

              {/* Document nodes */}
              {queryRankings.map((chunk) => {
                const isSelected = selectedChunk.id === chunk.id;
                const isTopMatch = queryRankings[0].id === chunk.id;

                return (
                  <button
                    key={chunk.id}
                    onClick={() => setSelectedChunk(chunk)}
                    style={{ left: `${chunk.x}%`, top: `${chunk.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 cursor-pointer ${
                      isSelected ? 'z-20 scale-125' : 'z-10 hover:scale-110'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border shadow-md transition-all ${
                        isTopMatch
                          ? 'bg-blue-600 text-white dark:bg-cyan-500 dark:text-slate-950 border-blue-500 dark:border-cyan-300 ring-4 ring-blue-500/20'
                          : isSelected
                          ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 border-emerald-500'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {(chunk.similarity * 100).toFixed(0)}
                    </div>
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] rounded-md whitespace-nowrap shadow-xl z-30 transition-opacity">
                      {chunk.source} · Sim: {chunk.similarity}
                    </div>
                  </button>
                );
              })}

              <div className="absolute bottom-2 left-2 text-[10px] text-slate-500 font-mono">
                Click nodes to inspect chunk payload & privacy veil
              </div>
            </div>
          </div>

          {/* Ranked Retrieval Similarity Bar Chart */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Top-k Cosine Similarity Ranked Chunks</span>
              <span className="font-mono text-blue-600 dark:text-cyan-400">k=5 Nearest Neighbors</span>
            </div>

            <div className="space-y-2">
              {queryRankings.slice(0, 4).map((chunk, idx) => (
                <div
                  key={chunk.id}
                  onClick={() => setSelectedChunk(chunk)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    selectedChunk.id === chunk.id
                      ? 'bg-blue-50/70 dark:bg-cyan-950/30 border-blue-200 dark:border-cyan-500/40 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-400">0{idx + 1}.</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{chunk.source}</span>
                      <span className="text-[11px] text-slate-500">· {chunk.category}</span>
                    </div>
                    <span className="font-mono font-semibold text-blue-600 dark:text-cyan-400">
                      {(chunk.similarity * 100).toFixed(1)}% match
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        idx === 0 ? 'bg-blue-600 dark:bg-cyan-400' : 'bg-slate-400 dark:bg-slate-500'
                      }`}
                      style={{ width: `${chunk.similarity * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Chunk Inspector & Live PII Redaction Sandbox */}
        <div className="lg:col-span-5 p-4 sm:p-6 space-y-6 bg-slate-50/50 dark:bg-slate-900/40">
          {/* Selected Chunk Details */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>Retrieved Chunk Inspector</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Indexed in ChromaDB
              </span>
            </div>

            <div className="bg-white dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-slate-800/80 pb-2">
                <span className="text-slate-500 dark:text-slate-400">Source: <strong className="text-slate-800 dark:text-slate-200">{selectedChunk.source}</strong></span>
                <span className="font-mono text-blue-600 dark:text-cyan-300 text-[11px] font-medium">{selectedChunk.category}</span>
              </div>

              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-1">
                  {piiMaskingEnabled ? "Sanitized Payload (Stored in Vector DB):" : "Raw Payload (PII Exposed):"}
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-300 leading-relaxed max-h-28 overflow-y-auto">
                  {piiMaskingEnabled ? selectedChunk.maskedText : selectedChunk.rawText}
                </div>
              </div>

              {selectedChunk.piiItems.length > 0 && (
                <div className="pt-1">
                  <span className="text-[11px] text-amber-700 dark:text-amber-400/90 font-medium block mb-1">
                    Redacted Tokens ({selectedChunk.piiItems.length}):
                  </span>
                  <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                    {selectedChunk.piiItems.map((item, i) => (
                      <span key={i} className="bg-amber-50 dark:bg-slate-800 px-2 py-0.5 rounded text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live PII Masking Simulator */}
          <div className="bg-white dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-slate-200">
                <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Live PII Redaction Test Bench</span>
              </div>
              <span className="text-[10px] font-mono text-blue-600 dark:text-cyan-400 font-semibold">Zero Data Leakage</span>
            </div>

            <textarea
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              rows={3}
              placeholder="Paste custom financial record with PAN, SSN, or Account Number..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl p-2.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 font-mono focus:outline-none focus:border-blue-600 dark:focus:border-cyan-500"
            />

            <div className="p-2.5 bg-emerald-50/50 dark:bg-slate-900/90 rounded-xl border border-emerald-200/60 dark:border-slate-800">
              <div className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider mb-1">
                Masked Output Stream:
              </div>
              <p className="text-xs font-mono text-emerald-800 dark:text-emerald-300 leading-relaxed break-words">
                {liveMaskedResult.masked}
              </p>
            </div>

            {liveMaskedResult.detected.length > 0 && (
              <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Live Detected Entities:</span>
                <div className="space-y-0.5">
                  {liveMaskedResult.detected.map((d, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[10px] font-mono bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-md">
                      <span className="text-amber-700 dark:text-amber-400 font-medium">{d.type}</span>
                      <span className="text-slate-600 dark:text-slate-400 truncate max-w-[160px]">{d.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
