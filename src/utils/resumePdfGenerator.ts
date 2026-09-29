import jsPDF from 'jspdf';
import { PORTFOLIO_OWNER } from '../data/portfolioData';

/**
 * Generates a clean, crisp, 100% vector-based standard A4 PDF resume for Bhola Mohammed Owais.
 * Uses native PDF vector drawing commands to guarantee fast, bug-free download across all browsers.
 */
export const generateResumePdfDocument = (): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 595.28 pt
  const margin = 36; // 0.5 inch margins
  const contentWidth = pageWidth - margin * 2; // 523.28 pt

  let y = 38;

  // Header: Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(PORTFOLIO_OWNER.name, pageWidth / 2, y, { align: 'center' });

  y += 16;
  // Subtitle
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(37, 99, 235); // blue-600
  doc.text('Data Analyst | Data Scientist | AI Engineer Intern', pageWidth / 2, y, { align: 'center' });

  y += 14;
  // Contact line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // slate-600
  const contactText = `${PORTFOLIO_OWNER.location}  |  ${PORTFOLIO_OWNER.phone}  |  ${PORTFOLIO_OWNER.email}  |  LinkedIn  |  GitHub: @Owaisbhola`;
  doc.text(contactText, pageWidth / 2, y, { align: 'center' });

  // Divider
  y += 10;
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 14;

  const renderSectionHeader = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), margin, y);
    y += 3;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.6);
    doc.line(margin, y, pageWidth - margin, y);
    y += 11;
  };

  // 1. PROFESSIONAL SUMMARY
  renderSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(PORTFOLIO_OWNER.professionalSummary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 11 + 6;

  // 2. TECHNICAL SKILLS
  renderSectionHeader('Technical Skills');
  const skills = [
    { label: 'Programming:', value: 'Python, SQL, Java, C' },
    { label: 'Data Analysis:', value: 'Pandas, NumPy, Data Preprocessing, Data Cleaning, Exploratory Data Analysis, Feature Extraction' },
    { label: 'AI / Machine Learning:', value: 'Machine Learning, Computer Vision, RAG Systems, Vector Embeddings, Semantic Search, OpenCV, MediaPipe, Librosa, Ollama' },
    { label: 'Databases:', value: 'SQL, SQLite, MongoDB, ChromaDB (Vector Database), SQLAlchemy' },
    { label: 'Backend & Web:', value: 'Flask, Express.js, React.js, REST APIs, Tailwind CSS, WebRTC' },
    { label: 'Tools & Cloud:', value: 'AWS, Git, GitHub, VS Code' },
  ];

  skills.forEach((skill) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(skill.label, margin, y);

    const labelWidth = doc.getTextWidth(skill.label) + 4;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const valueLines = doc.splitTextToSize(skill.value, contentWidth - labelWidth);
    doc.text(valueLines, margin + labelWidth, y);
    y += valueLines.length * 10.5;
  });
  y += 6;

  // 3. PROJECTS
  renderSectionHeader('Projects');
  const projects = [
    {
      title: 'Privacy-Guard AI – Financial RAG Assistant',
      tech: 'Python, Flask, ChromaDB, SQLite, Pandas',
      bullets: [
        'Built a privacy-focused Retrieval-Augmented Generation (RAG) pipeline for secure retrieval and analysis of financial documents.',
        'Integrated ChromaDB vector embeddings to improve semantic search accuracy across large document datasets.',
        'Automated a PII masking system that protects sensitive financial data before indexing and querying.',
        'Developed a Flask-based real-time query interface for document interaction and data exploration.',
      ],
    },
    {
      title: 'AI-Based Behavioral Truth Analysis',
      tech: 'Python, Flask, MongoDB, OpenCV, MediaPipe, Librosa',
      bullets: [
        'Designed a multimodal analysis system that processes 2 signal types (facial and voice) to generate behavioral insights.',
        'Developed blink detection and facial tracking modules with MediaPipe and OpenCV for real-time data capture.',
        'Extracted and analyzed pitch and stress-based audio features with Librosa for pattern recognition.',
        'Enabled real-time data streaming, collection, and monitoring using Flask, WebRTC, and MongoDB.',
      ],
    },
    {
      title: 'CivicEye – Rural Service Technician Booking Platform',
      tech: 'React.js, Express.js, MongoDB, Tailwind CSS',
      bullets: [
        'Built a full-stack platform connecting rural users with local technicians through booking and service-management workflows.',
        'Designed structured MongoDB data models and RESTful APIs (Express.js) for efficient data retrieval and management.',
        'Developed responsive user interfaces with React.js and Tailwind CSS.',
      ],
    },
  ];

  projects.forEach((proj) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(proj.title, margin, y);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.8);
    doc.setTextColor(100, 116, 139);
    doc.text(proj.tech, pageWidth - margin, y, { align: 'right' });
    y += 10.5;

    proj.bullets.forEach((bullet) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.2);
      doc.setTextColor(51, 65, 85);
      doc.text('•', margin + 6, y);
      const bulletLines = doc.splitTextToSize(bullet, contentWidth - 18);
      doc.text(bulletLines, margin + 16, y);
      y += bulletLines.length * 9.8;
    });
    y += 4;
  });
  y += 2;

  // 4. EDUCATION
  renderSectionHeader('Education');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('Parul University, Vadodara, Gujarat, India', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Expected May 2027', pageWidth - margin, y, { align: 'right' });
  y += 11;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const degText = 'Bachelor of Technology in Computer Science and Engineering – Artificial Intelligence  |  ';
  doc.text(degText, margin, y);
  const degWidth = doc.getTextWidth(degText);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('CGPA: 7.57', margin + degWidth, y);
  y += 14;

  // 5. CERTIFICATIONS & COURSEWORK
  renderSectionHeader('Certifications & Coursework');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('NPTEL Certification:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text('Computer Networks', margin + doc.getTextWidth('NPTEL Certification: ') + 4, y);
  y += 11;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Coursework:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text('Machine Learning, Data Analysis, Artificial Intelligence, Database Management Systems', margin + doc.getTextWidth('Coursework: ') + 4, y);

  return doc;
};

/**
 * Triggers direct browser download of the generated PDF.
 */
export const downloadResumePdf = (fileName = 'Bhola_Mohammed_Owais_Resume.pdf'): void => {
  const doc = generateResumePdfDocument();
  const blob = doc.output('blob');
  
  // Create object URL and invisible download anchor
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 1000);
};

/**
 * Opens the generated PDF in a new browser tab for viewing/saving.
 */
export const openResumePdfInNewTab = (): void => {
  const doc = generateResumePdfDocument();
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
};
