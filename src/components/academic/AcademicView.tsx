import React, { useState } from 'react';
import { ACADEMIC_DATA } from '../../data/portfolioData';
import { GraduationCap, Award, BookOpen, CheckCircle2, Building2 } from 'lucide-react';

export const AcademicView: React.FC = () => {
  const [selectedSemesterIdx, setSelectedSemesterIdx] = useState<number>(0);
  const activeSemester = ACADEMIC_DATA.curriculumSemesters[selectedSemesterIdx];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <GraduationCap className="w-4 h-4" />
          <span>Academic Background & AI Specialization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Parul University · B.Tech Artificial Intelligence
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Rigorous curriculum spanning machine learning, statistical data analysis, computer vision, deep learning foundations, and network systems engineering in Vadodara, Gujarat.
        </p>
      </div>

      {/* University & Degree Snapshot Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-sm">
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Building2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span className="font-semibold text-slate-900 dark:text-white">{ACADEMIC_DATA.institution}</span>
            <span aria-hidden="true">·</span>
            <span>{ACADEMIC_DATA.campusLocation}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {ACADEMIC_DATA.degree}
          </h2>
          <div className="text-sm text-blue-600 dark:text-cyan-400 font-medium">
            Specialization: {ACADEMIC_DATA.specialization}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
            Timeline: <strong className="text-slate-800 dark:text-slate-200">{ACADEMIC_DATA.timeline}</strong>
          </p>
        </div>

        {/* CGPA Badge Box */}
        <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Cumulative GPA
          </div>
          <div className="text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {ACADEMIC_DATA.cgpa}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Scale: 10.0 · First Class with Distinction
          </div>
        </div>
      </div>

      {/* Certifications & Verified Coursework */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Certifications & Verified Coursework</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACADEMIC_DATA.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-2.5 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                  {cert.score}
                </span>
                <span className="text-[11px] text-slate-400">{cert.date}</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{cert.title}</h4>
              <div className="text-xs text-blue-600 dark:text-cyan-300 font-medium">{cert.issuer}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                <strong className="text-slate-700 dark:text-slate-300">Key Focus:</strong> {cert.topics}
              </p>
              <div className="pt-2 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Academic Credential</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Semester by Semester Curriculum Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <span>AI Curriculum & Coursework Roadmap</span>
          </h3>
        </div>

        {/* Semester Tabs */}
        <div className="flex flex-wrap gap-2">
          {ACADEMIC_DATA.curriculumSemesters.map((sem, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSemesterIdx(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedSemesterIdx === idx
                  ? 'bg-slate-900 text-white dark:bg-cyan-500/20 dark:text-cyan-300 dark:border dark:border-cyan-500/40 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>{sem.semester}</span>
              <span className="text-[10px] text-slate-400 ml-1.5">({sem.year})</span>
            </button>
          ))}
        </div>

        {/* Course Table for Selected Semester */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 text-xs">
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">{activeSemester.semester}</span>
              <span className="text-slate-400 ml-2">· {activeSemester.year}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-cyan-400 font-medium">
              {activeSemester.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSemester.courses.map((course, cIdx) => (
              <div
                key={cIdx}
                className="bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-blue-600 dark:text-cyan-400 font-medium">{course.code}</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{course.grade} ({course.credits} Credits)</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{course.name}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  {course.focus}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
            <strong className="text-blue-600 dark:text-cyan-400 block mb-1">Semester Capstone & Lab Achievements:</strong>
            <span>{activeSemester.highlights}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
