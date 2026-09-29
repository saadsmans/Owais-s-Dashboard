import React from 'react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';
import { Linkedin, Github, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              {PORTFOLIO_OWNER.name}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-md">
              {PORTFOLIO_OWNER.role} · B.Tech CSE (Artificial Intelligence) at Parul University, Vadodara.
              Specialized in end-to-end data pipelines, multimodal computer vision, and RAG systems.
            </p>
            <div className="flex items-center gap-4 pt-2 text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>{PORTFOLIO_OWNER.location}</span>
              </span>
              <span className="flex items-center gap-1.5 text-[11px]">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>CGPA 7.57</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-300">
              Navigation
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('overview')} className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">
                  Executive Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">
                  Interactive Projects & Widgets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('skills')} className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">
                  Skills & Data Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academic')} className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">
                  Academic Curriculum & AI Focus
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resume')} className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">
                  Printable Resume
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-300">
              Connect & Links
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={`mailto:${PORTFOLIO_OWNER.email}`}
                  className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-slate-700 dark:text-slate-300"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>{PORTFOLIO_OWNER.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PORTFOLIO_OWNER.phone}`}
                  className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-slate-700 dark:text-slate-300"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{PORTFOLIO_OWNER.phone}</span>
                </a>
              </li>
              <li className="flex flex-wrap items-center gap-2.5 pt-2">
                <a
                  href={PORTFOLIO_OWNER.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-400 dark:hover:border-cyan-500/40 transition-colors shadow-xs"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" />
                  <span className="text-xs font-medium">GitHub</span>
                </a>
                <a
                  href={PORTFOLIO_OWNER.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-400 dark:hover:border-cyan-500/40 transition-colors shadow-xs"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span className="text-xs font-medium">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_OWNER.name} · Parul University B.Tech Artificial Intelligence
          </div>
          <div>
            Data Science & AI Engineering Portfolio · Vadodara, Gujarat, India
          </div>
        </div>
      </div>
    </footer>
  );
};
