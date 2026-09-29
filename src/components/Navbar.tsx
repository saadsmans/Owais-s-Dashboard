import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';
import { 
  FileDown, 
  Menu, 
  X, 
  Home, 
  Cpu, 
  Terminal, 
  GraduationCap, 
  FileText, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isDarkMode,
  onToggleTheme 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'projects', label: 'Projects & Visualizers', icon: Cpu },
    { id: 'skills', label: 'Skills & Lab', icon: Terminal },
    { id: 'academic', label: 'Academic & AI', icon: GraduationCap },
    { id: 'resume', label: 'Resume', icon: FileText },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out flex flex-col items-center pointer-events-none ${
        isScrolled ? 'pt-3 px-3 sm:px-6' : 'pt-0 px-0'
      }`}
    >
      {/* Top Header Bar / Morphing Pill */}
      <div
        className={`pointer-events-auto transition-all duration-300 ease-out w-full ${
          isScrolled
            ? 'max-w-5xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700/60 shadow-lg shadow-slate-200/50 dark:shadow-2xl dark:shadow-cyan-950/20 rounded-full px-4 sm:px-6 py-2'
            : 'max-w-7xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 rounded-none px-4 sm:px-6 lg:px-8 py-3.5'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('overview')}
            className="text-left group cursor-pointer focus:outline-none shrink-0"
          >
            <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              {PORTFOLIO_OWNER.name}
            </span>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-50 dark:bg-cyan-500/20 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/40 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Theme Toggle, Resume & Mobile Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle color theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => handleNavClick('resume')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Resume</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors pointer-events-auto cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-blue-600 dark:text-cyan-400" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Standard Floating Dropdown Box */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full max-w-sm px-3 pt-2 pointer-events-auto transition-all duration-200">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-xl p-3 space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/80 mb-1 flex items-center justify-between">
              <span>Navigation Menu</span>
              <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-mono font-medium">B.Tech AI</span>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 dark:bg-cyan-500/20 text-blue-700 dark:text-cyan-300 font-semibold border border-blue-200 dark:border-cyan-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                </button>
              );
            })}

            {/* Quick Actions inside mobile dropdown */}
            <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800/80">
              <button
                onClick={() => handleNavClick('resume')}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>View Full Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
