import React from 'react';
import { PORTFOLIO_OWNER, PROJECTS, SKILL_CATEGORIES } from '../../data/portfolioData';
import { FinancialRAGVisualizer } from '../visualizers/FinancialRAGVisualizer';
import { BehavioralTruthVisualizer } from '../visualizers/BehavioralTruthVisualizer';
import { CivicEyeGeoVisualizer } from '../visualizers/CivicEyeGeoVisualizer';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  GraduationCap, 
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

interface OverviewViewProps {
  onNavigate: (tab: string, projectId?: string) => void;
  onOpenContact: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="space-y-20 sm:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative pt-4 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Bold Editorial Typography & Narrative */}
            <div className="lg:col-span-7 space-y-5">
              {/* Academic kicker - Unboxed with separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="text-blue-700 dark:text-cyan-400 font-semibold">Parul University</span>
                <span aria-hidden="true">·</span>
                <span>B.Tech CSE (Artificial Intelligence)</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">CGPA 7.57</span>
                <span aria-hidden="true">·</span>
                <span>Vadodara, India</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight text-balance leading-[1.15]">
                Turning complex data & multimodal signals into <span className="text-blue-600 dark:text-cyan-400">actionable intelligence</span>.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                I am an AI-specialized Computer Science undergraduate with hands-on experience engineering end-to-end data pipelines, privacy-preserving financial RAG systems, and multimodal biometric analytics using <strong className="text-slate-900 dark:text-white font-semibold">Python, SQL, Pandas, ChromaDB, and OpenCV</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-950 font-semibold text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Academic Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('skills')}
                  className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-medium text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Terminal className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span>Interactive Data Lab</span>
                </button>
              </div>

              {/* Quantitative Proof Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="p-3 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                  <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">3</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Production Systems</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                  <div className="text-2xl font-bold font-mono text-blue-600 dark:text-cyan-400 tabular-nums">99.4%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">PII Masking Accuracy</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                  <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">468 pts</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Face Mesh Tracking</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                  <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">&lt;45ms</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Geo Query Latency</div>
                </div>
              </div>
            </div>

            {/* Right Column: Candidate Profile Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-200/40 dark:shadow-none space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white tracking-wide">Candidate Profile Snapshot</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Seeking Internship
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Target Roles</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">Data Analyst / Scientist / AI Intern</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Education</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">Parul University (2023 - 2027)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Core Stack</span>
                    <span className="font-mono text-blue-700 dark:text-cyan-300 font-medium">Python · SQL · Pandas · ChromaDB</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Certifications</span>
                    <span className="font-medium text-emerald-700 dark:text-emerald-300">NPTEL Computer Networks</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Location</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">Vadodara, Gujarat (Open to Remote)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenContact}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white border border-transparent dark:border-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Connect with Bhola Mohammed Owais</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Project Spotlight 1: Privacy-Guard AI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-1">
              Academic Project · 01
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Privacy-Guard AI – Financial RAG Assistant
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Engineered a zero-data-leakage pipeline that redacts PII before indexing sensitive financial documents into ChromaDB for high-precision semantic retrieval.
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects', 'privacy-guard-ai')}
            className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View Deep Architecture & Code</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Interactive Widget */}
        <FinancialRAGVisualizer />
      </section>

      {/* 3. Interactive Project Spotlight 2: Behavioral Truth Analysis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Academic Project · 02
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Multimodal Behavioral Truth & Stress Analysis
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Captures synchronized facial micro-expressions (OpenCV/MediaPipe 468 landmarks) and acoustic stress signatures (Librosa) for real-time behavioral analytics.
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects', 'behavioral-truth-analysis')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View Signal Processing Specs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Interactive Widget */}
        <BehavioralTruthVisualizer />
      </section>

      {/* 4. Interactive Project Spotlight 3: CivicEye Platform */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              Academic Project · 03
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              CivicEye – Rural Service Technician Booking Platform
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              MERN-stack dispatch architecture connecting rural communities with technicians using MongoDB 2dsphere geospatial proximity routing.
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects', 'civiceye-rural-service')}
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View Full-Stack Specs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Interactive Widget */}
        <CivicEyeGeoVisualizer />
      </section>

      {/* 5. Core Technical Capabilities Matrix Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            Skills Taxonomy
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Engineered for Data Science & AI Internships
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Rigorous mathematical foundation paired with modern AI frameworks and data engineering tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.slice(0, 3).map((category, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm"
            >
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{category.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{category.description}</p>
              
              <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                {category.skills.slice(0, 4).map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{skill.name}</span>
                      <span className="font-mono text-blue-600 dark:text-cyan-400 font-semibold tabular-nums">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 dark:bg-cyan-400 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('skills')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <span>Open Interactive Data Sandbox & Query Lab</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          </button>
        </div>
      </section>

      {/* 6. Academic Alignment & Parul University Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Foundation · Parul University</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              B.Tech Computer Science & Engineering (Artificial Intelligence)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Consistently maintaining a <strong>7.57 CGPA</strong> with certified coursework in Machine Learning, Computer Vision, and NPTEL Computer Networks.
            </p>
          </div>

          <button
            onClick={() => onNavigate('academic')}
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-400 dark:hover:bg-emerald-300 dark:text-slate-950 font-semibold text-sm transition-all shadow-sm cursor-pointer"
          >
            Inspect Academic Curriculum
          </button>
        </div>
      </section>
    </div>
  );
};
