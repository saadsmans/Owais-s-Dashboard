import React, { useState, useRef } from 'react';
import { PORTFOLIO_OWNER, ACADEMIC_DATA } from '../../data/portfolioData';
import { 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Send, 
  CheckCircle2, 
  Mail, 
  ExternalLink,
  Loader2,
  FileCheck
} from 'lucide-react';
import { downloadResumePdf, openResumePdfInNewTab } from '../../utils/resumePdfGenerator';

export const ResumeView: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderSubject, setSenderSubject] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const resumeRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadPdf = () => {
    setIsDownloadingPdf(true);
    setDownloadSuccess(false);

    try {
      downloadResumePdf('Bhola_Mohammed_Owais_Resume.pdf');
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Error initiating PDF download:', err);
      // Fallback to open in new tab
      try {
        openResumePdfInNewTab();
      } catch (e) {
        window.print();
      }
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleOpenPdfTab = () => {
    try {
      openResumePdfInNewTab();
    } catch (err) {
      console.error('Could not open in new tab:', err);
      window.print();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getSubjectText = () => {
    return senderSubject.trim() 
      ? `[Portfolio Inquiry] ${senderSubject.trim()} - from ${senderName}` 
      : `[Internship / Job Inquiry] from ${senderName}`;
  };

  const getBodyText = () => {
    return `Hello Bhola Mohammed Owais,\n\n${senderMessage.trim()}\n\n---\nSender: ${senderName}\nEmail: ${senderEmail}\nSubject: ${senderSubject.trim() || 'Internship / Project Inquiry'}\nSent via Owais's Portfolio Website`;
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(getSubjectText());
    const body = encodeURIComponent(getBodyText());
    return `mailto:${PORTFOLIO_OWNER.email}?subject=${subject}&body=${body}`;
  };

  const generateGmailWebUrl = () => {
    const subject = encodeURIComponent(getSubjectText());
    const body = encodeURIComponent(getBodyText());
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${PORTFOLIO_OWNER.email}&su=${subject}&body=${body}`;
  };

  const generateOutlookWebUrl = () => {
    const subject = encodeURIComponent(getSubjectText());
    const body = encodeURIComponent(getBodyText());
    return `https://outlook.live.com/mail/0/deeplink/compose?to=${PORTFOLIO_OWNER.email}&subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMessage) return;

    const mailtoUrl = generateMailtoUrl();
    // Dispatch to default email client
    window.location.href = mailtoUrl;
    setFormSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
      {/* Action Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 print:hidden">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Curriculum Vitae & Resume
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Verified academic resume of Bhola Mohammed Owais · B.Tech CSE (AI) at Parul University.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => copyToClipboard(PORTFOLIO_OWNER.email, 'email')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer shadow-xs"
          >
            {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />}
            <span>{copiedField === 'email' ? 'Email Copied!' : 'Copy Email'}</span>
          </button>

          <button
            onClick={handleOpenPdfTab}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer shadow-xs"
            title="Preview PDF in New Window"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>Preview in Tab</span>
          </button>

          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            title="Open Print Dialog"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-75 ${
              downloadSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-950'
            }`}
          >
            {isDownloadingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Preparing PDF...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <FileCheck className="w-3.5 h-3.5" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pristine Resume Document matching the exact PDF layout */}
      <div 
        ref={resumeRef}
        className="bg-white text-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8 sm:p-12 font-sans border border-slate-200 dark:border-slate-700 print:border-none print:shadow-none print:p-0"
      >
        {/* Header Block */}
        <div className="text-center space-y-1.5 border-b border-slate-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Bhola Mohammed Owais
          </h1>
          <div className="text-sm font-semibold text-slate-700">
            Data Analyst | Data Scientist | AI Engineer Intern
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600 pt-1">
            <span>{PORTFOLIO_OWNER.location}</span>
            <span aria-hidden="true">|</span>
            <span>{PORTFOLIO_OWNER.phone}</span>
            <span aria-hidden="true">|</span>
            <a href={`mailto:${PORTFOLIO_OWNER.email}`} className="text-blue-700 hover:underline">
              {PORTFOLIO_OWNER.email}
            </a>
            <span aria-hidden="true">|</span>
            <a href={PORTFOLIO_OWNER.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
              LinkedIn
            </a>
            <span aria-hidden="true">|</span>
            <a href={PORTFOLIO_OWNER.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
              GitHub
            </a>
          </div>
        </div>

        {/* Section: Professional Summary */}
        <div className="py-5 border-b border-slate-200 space-y-2">
          <h2 className="text-xs font-extrabold tracking-wider uppercase text-slate-950">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed text-justify">
            {PORTFOLIO_OWNER.professionalSummary}
          </p>
        </div>

        {/* Section: Technical Skills */}
        <div className="py-5 border-b border-slate-200 space-y-2.5">
          <h2 className="text-xs font-extrabold tracking-wider uppercase text-slate-950">
            Technical Skills
          </h2>
          <div className="space-y-1.5 text-xs text-slate-800">
            <div>
              <strong className="text-slate-950">Programming:</strong> Python, SQL, Java, C
            </div>
            <div>
              <strong className="text-slate-950">Data Analysis:</strong> Pandas, NumPy, Data Preprocessing, Data Cleaning, Exploratory Data Analysis, Feature Extraction
            </div>
            <div>
              <strong className="text-slate-950">AI / Machine Learning:</strong> Machine Learning, Computer Vision, RAG Systems, Vector Embeddings, Semantic Search, OpenCV, MediaPipe, Librosa, Ollama
            </div>
            <div>
              <strong className="text-slate-950">Databases:</strong> SQL, SQLite, MongoDB, ChromaDB (Vector Database), SQLAlchemy
            </div>
            <div>
              <strong className="text-slate-950">Backend & Web:</strong> Flask, Express.js, React.js, REST APIs, Tailwind CSS, WebRTC
            </div>
            <div>
              <strong className="text-slate-950">Tools & Cloud:</strong> AWS, Git, VS Code
            </div>
          </div>
        </div>

        {/* Section: Projects */}
        <div className="py-5 border-b border-slate-200 space-y-5">
          <h2 className="text-xs font-extrabold tracking-wider uppercase text-slate-950">
            Projects
          </h2>

          {/* Project 1 */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap justify-between items-baseline text-xs">
              <strong className="text-slate-950 text-sm">Privacy-Guard AI – Financial RAG Assistant</strong>
              <span className="font-mono text-slate-600 text-[11px]">Python, Flask, ChromaDB, SQLite, Pandas</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-800">
              <li>Built a privacy-focused Retrieval-Augmented Generation (RAG) pipeline for secure retrieval and analysis of financial documents.</li>
              <li>Integrated ChromaDB vector embeddings to improve semantic search accuracy across large document datasets.</li>
              <li>Automated a PII masking system that protects sensitive financial data before indexing and querying.</li>
              <li>Developed a Flask-based real-time query interface for document interaction and data exploration.</li>
            </ul>
          </div>

          {/* Project 2 */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap justify-between items-baseline text-xs">
              <strong className="text-slate-950 text-sm">AI-Based Behavioral Truth Analysis</strong>
              <span className="font-mono text-slate-600 text-[11px]">Python, Flask, MongoDB, OpenCV, MediaPipe, Librosa</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-800">
              <li>Designed a multimodal analysis system that processes 2 signal types (facial and voice) to generate behavioral insights.</li>
              <li>Developed blink detection and facial tracking modules with MediaPipe and OpenCV for real-time data capture.</li>
              <li>Extracted and analyzed pitch and stress-based audio features with Librosa for pattern recognition.</li>
              <li>Enabled real-time data streaming, collection, and monitoring using Flask, WebRTC, and MongoDB.</li>
            </ul>
          </div>

          {/* Project 3 */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap justify-between items-baseline text-xs">
              <strong className="text-slate-950 text-sm">CivicEye – Rural Service Technician Booking Platform</strong>
              <span className="font-mono text-slate-600 text-[11px]">React.js, Express.js, MongoDB, Tailwind CSS</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-800">
              <li>Built a full-stack platform connecting rural users with local technicians through booking and service-management workflows.</li>
              <li>Designed structured MongoDB data models and RESTful APIs (Express.js) for efficient data retrieval and management.</li>
              <li>Developed responsive user interfaces with React.js and Tailwind CSS.</li>
            </ul>
          </div>
        </div>

        {/* Section: Education */}
        <div className="py-5 border-b border-slate-200 space-y-1.5">
          <h2 className="text-xs font-extrabold tracking-wider uppercase text-slate-950">
            Education
          </h2>
          <div className="flex justify-between items-baseline text-xs">
            <div>
              <strong className="text-slate-950">{ACADEMIC_DATA.institution}</strong>, Vadodara, India
            </div>
            <span className="text-slate-600">Expected May 2027</span>
          </div>
          <div className="text-xs text-slate-800">
            {ACADEMIC_DATA.degree} – {ACADEMIC_DATA.specialization} | <strong className="text-slate-950">CGPA: {ACADEMIC_DATA.cgpa}</strong>
          </div>
        </div>

        {/* Section: Certifications & Coursework */}
        <div className="py-5 space-y-1.5">
          <h2 className="text-xs font-extrabold tracking-wider uppercase text-slate-950">
            Certifications & Coursework
          </h2>
          <div className="text-xs text-slate-800 space-y-1">
            <div>
              <strong className="text-slate-950">NPTEL Certification</strong> – Computer Networks
            </div>
            <div>
              <strong className="text-slate-950">Coursework:</strong> Machine Learning, Data Analysis
            </div>
          </div>
        </div>
      </div>

      {/* Direct Email Inquiry Dispatch Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            <Mail className="w-4 h-4" />
            <span>Direct Inbox Connection</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Send Inquiry Directly to Owais's Inbox
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Inquiries are routed directly to <strong>{PORTFOLIO_OWNER.email}</strong>.
          </p>
        </div>

        {formSent ? (
          <div className="p-5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-sm text-emerald-900 dark:text-emerald-300">
                  Inquiry Dispatched to {PORTFOLIO_OWNER.email}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your message from <strong>{senderName}</strong> ({senderEmail}) has been composed and addressed to Owais. Choose your preferred email client below:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={generateGmailWebUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open in Gmail Web</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={generateOutlookWebUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open in Outlook Web</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={generateMailtoUrl()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Default Mail App</span>
              </a>

              <button
                onClick={() => copyToClipboard(`To: ${PORTFOLIO_OWNER.email}\nSubject: ${getSubjectText()}\n\n${getBodyText()}`, 'dispatch')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {copiedField === 'dispatch' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'dispatch' ? 'Copied Full Message!' : 'Copy Full Text'}</span>
              </button>

              <button
                onClick={() => setFormSent(false)}
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 underline cursor-pointer ml-auto"
              >
                Write new inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Hiring Manager / Recruiter"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                  Your Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                Subject / Role Title
              </label>
              <input
                type="text"
                value={senderSubject}
                onChange={(e) => setSenderSubject(e.target.value)}
                placeholder="e.g. Data Scientist Intern Opportunity / Interview Request"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                Message Content <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={senderMessage}
                onChange={(e) => setSenderMessage(e.target.value)}
                placeholder="We would love to discuss a Data Science / AI opportunity with you..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Direct recipient: <strong className="text-slate-800 dark:text-slate-200">{PORTFOLIO_OWNER.email}</strong>
              </span>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-950 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Owais's Inbox</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
