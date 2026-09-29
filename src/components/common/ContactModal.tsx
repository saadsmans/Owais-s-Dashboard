import React, { useState } from 'react';
import { PORTFOLIO_OWNER } from '../../data/portfolioData';
import { X, Mail, Phone, Send, CheckCircle2, Check, Copy, ExternalLink } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const copyText = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getSubjectText = () => {
    return subject.trim() 
      ? `[Portfolio Inquiry] ${subject.trim()} - from ${name}` 
      : `[Internship / Job Inquiry] from ${name}`;
  };

  const getBodyText = () => {
    return `Hello Bhola Mohammed Owais,\n\n${message.trim()}\n\n---\nSender: ${name}\nEmail: ${email}\nSent via Portfolio Website`;
  };

  const generateMailtoUrl = () => {
    const s = encodeURIComponent(getSubjectText());
    const b = encodeURIComponent(getBodyText());
    return `mailto:${PORTFOLIO_OWNER.email}?subject=${s}&body=${b}`;
  };

  const generateGmailWebUrl = () => {
    const s = encodeURIComponent(getSubjectText());
    const b = encodeURIComponent(getBodyText());
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${PORTFOLIO_OWNER.email}&su=${s}&body=${b}`;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    // Dispatch to email client
    window.location.href = generateMailtoUrl();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            <Mail className="w-4 h-4" />
            <span>Direct Inbox Connection</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Send Inquiry to Bhola Mohammed Owais
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Your inquiry is routed directly to <strong>{PORTFOLIO_OWNER.email}</strong>.
          </p>
        </div>

        {/* Contact Info Pills */}
        <div className="grid grid-cols-1 gap-2.5 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Mail className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span>{PORTFOLIO_OWNER.email}</span>
            </div>
            <button
              onClick={() => copyText(PORTFOLIO_OWNER.email, 'email')}
              className="text-[11px] text-blue-600 dark:text-cyan-400 hover:underline font-semibold cursor-pointer"
            >
              {copiedField === 'email' ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{PORTFOLIO_OWNER.phone}</span>
            </div>
            <button
              onClick={() => copyText(PORTFOLIO_OWNER.phone, 'phone')}
              className="text-[11px] text-blue-600 dark:text-cyan-400 hover:underline font-semibold cursor-pointer"
            >
              {copiedField === 'phone' ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <a
              href={PORTFOLIO_OWNER.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-300 transition-colors text-[11px] font-medium shadow-xs"
            >
              <span>GitHub: @Owaisbhola</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href={PORTFOLIO_OWNER.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-300 transition-colors text-[11px] font-medium shadow-xs"
            >
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Form or Success Dispatch */}
        {sent ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-900 dark:text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Message Prepared for {PORTFOLIO_OWNER.email}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Your message from <strong>{name}</strong> ({email}) is formatted and addressed to Owais's inbox.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={generateGmailWebUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span>Open in Gmail</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
              <a
                href={generateMailtoUrl()}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-colors"
              >
                Default App
              </a>
              <button
                onClick={() => setSent(false)}
                className="text-xs text-slate-500 underline ml-auto cursor-pointer"
              >
                Edit message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-500"
            />
            <input
              type="email"
              required
              placeholder="Your Contact Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="Subject (e.g. Data Analyst Internship Opportunity)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-500"
            />
            <textarea
              required
              rows={3}
              placeholder="Write your message / inquiry here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-500"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-950 font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message Directly to Owais</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
