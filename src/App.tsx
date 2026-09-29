import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OverviewView } from './components/overview/OverviewView';
import { ProjectsView } from './components/projects/ProjectsView';
import { SkillsView } from './components/skills/SkillsView';
import { AcademicView } from './components/academic/AcademicView';
import { ResumeView } from './components/resume/ResumeView';
import { ContactModal } from './components/common/ContactModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [targetProjectId, setTargetProjectId] = useState<string | undefined>(undefined);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  
  // Theme state: defaults to light theme, persists in localStorage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      return saved === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleNavigate = (tab: string, projectId?: string) => {
    setActiveTab(tab);
    if (projectId) {
      setTargetProjectId(projectId);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col antialiased transition-colors duration-200 w-full max-w-full overflow-x-hidden`}>
      {/* Sticky Pill-morphing Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => handleNavigate(tab)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-20 sm:pt-24 pb-12 w-full max-w-full overflow-x-hidden">
        {activeTab === 'overview' && (
          <OverviewView
            onNavigate={handleNavigate}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsView
            initialProjectId={targetProjectId}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsView />
        )}

        {activeTab === 'academic' && (
          <AcademicView />
        )}

        {activeTab === 'resume' && (
          <ResumeView />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Direct Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
