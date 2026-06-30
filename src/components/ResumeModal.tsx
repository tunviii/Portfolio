import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Github, Linkedin, Calendar, GraduationCap, Code2, Award, Download, Printer } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Simple print action
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-heading/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-card-bg border border-border w-full max-w-4xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col"
          >
            {/* Header / Actions toolbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-border/50">
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-heading">Tanvi_Resume_2026.pdf</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrint}
                  className="p-2 text-secondary-text hover:text-accent hover:bg-highlight-bg rounded-xl transition-all duration-200 flex items-center gap-1.5 text-xs font-medium font-display"
                  title="Print Resume"
                  id="btn-print-resume"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-secondary-text hover:text-heading hover:bg-highlight-bg rounded-xl transition-all duration-200"
                  aria-label="Close modal"
                  id="btn-close-resume-modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume paper content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white" id="resume-document-content">
              <div className="max-w-3xl mx-auto flex flex-col gap-8 print:gap-6 text-heading">
                
                {/* Heading / Contact info */}
                <div className="border-b border-border/40 pb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4">
                  <div>
                    <h1 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-heading">U Tanvi</h1>
                    <p className="font-display font-medium text-accent mt-1 text-base md:text-lg">Software Engineer & Full Stack Developer</p>
                  </div>
                  <div className="flex items-center gap-4">
  <a
    href="mailto:utanvi07@gmail.com"
    className="p-2 rounded-lg hover:bg-highlight-bg text-muted-text hover:text-accent transition-all duration-200"
    aria-label="Email"
    title="Email"
  >
    <Mail className="w-5 h-5" />
  </a>

  <a
    href="https://github.com/tunviii"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-lg hover:bg-highlight-bg text-muted-text hover:text-accent transition-all duration-200"
    aria-label="GitHub"
    title="GitHub"
  >
    <Github className="w-5 h-5" />
  </a>

  <a
    href="https://www.linkedin.com/in/tanvi-uddandam-5a5654355/"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-lg hover:bg-highlight-bg text-muted-text hover:text-accent transition-all duration-200"
    aria-label="LinkedIn"
    title="LinkedIn"
  >
    <Linkedin className="w-5 h-5" />
  </a>
</div>
                </div>

                {/* Profile Summary */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-xs uppercase tracking-widest text-accent border-b border-border/20 pb-1">Profile Summary</h3>
                  <p className="text-secondary-text text-sm leading-relaxed">
                    Detail-oriented Software Engineer with a solid academic foundation in Information Technology and hands-on internship experience in full-stack development. Passionate about engineering high-performance user interfaces, scalable APIs and meaningful tech solutions.
                  </p>
                </div>

                {/* Education */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-bold text-xs uppercase tracking-widest text-accent border-b border-border/20 pb-1">Education</h3>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <div className="p-2 bg-highlight-bg text-accent rounded-xl hidden sm:block">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-heading">B.E. in Information Technology</h4>
                        <p className="text-secondary-text text-xs mt-0.5">Chaitanya Bharathi Institute of Technology &middot; CGPA: 8.40/10</p>
                      </div>
                    </div>
                    <div className="text-right text-xs font-mono text-muted-text">
                      <span>Sep 2024 – May 2028</span>
                    </div>
                  </div>
                </div>

                {/* Technical Experience */}
                <div className="flex flex-col gap-6">
                  <h3 className="font-display font-bold text-xs uppercase tracking-widest text-accent border-b border-border/20 pb-1">Professional Experience</h3>
                  
                  {/* Experience 1: Rengy */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-display font-bold text-sm text-heading">Full Stack Developer Intern</h4>
                        <p className="text-accent text-xs font-medium">Rengy &middot; Hyderabad</p>
                      </div>
                      <span className="text-xs font-mono text-muted-text">Jun 2026 – Jul 2026</span>
                    </div>
                    <p className="text-secondary-text text-xs leading-relaxed italic">
                      Rengy — Renewable Energy Sales & Operations Platform, India.
                    </p>
                    <ul className="list-disc list-outside ml-4 flex flex-col gap-1 text-secondary-text text-xs leading-relaxed">
                      <li>Revamped the admin dashboard (React 19 + TypeScript + Vite) with modular business-domain modules;
built data-fetching with TanStack Query, Redux Toolkit state, Axios token-refresh interceptors, Tailwind CSS
v4/shadcn UI, ECharts, Google Maps dispatch integration, and role/feature flags.</li>
                      <li>Built REST endpoints across Fastify microservices behind an API gateway with JWT auth, district-scoped
multi-tenant visibility, RBAC with granular permissions, soft-deletes, and audit logging.</li>
                      <li>Maintained the legacy Express + PostgreSQL monolith: APIs for sales, payments, and logistics; integrated
Razorpay, AWS S3, Firebase, Plivo OTP, and OpenAI for PDF extraction; built PDF/DOCX generation and
node</li>
                    </ul>
                  </div>
                 </div> 

                {/* Technical Skills */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-display font-bold text-xs uppercase tracking-widest text-accent border-b border-border/20 pb-1">Technical Skills</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-secondary-text">
                    <div>
                      <span className="font-bold text-heading font-display">Languages & Frameworks:</span> React, Next.js, TypeScript, Python, Node.js, Express, Fastify
                    </div>
                    <div>
                      <span className="font-bold text-heading font-display">Data & Cloud:</span> MongoDB, PostgreSQL, AWS S3, Firestore, 
                    </div>
                    <div>
                      <span className="font-bold text-heading font-display">Tools & Concepts:</span> Git/GitHub, Vite, Postman, RESTful APIs, JWT Authentication, RBAC, Microservices
                    </div>
                  </div>
                </div>

                {/* Certifications */}
<div className="flex flex-col gap-2">
  <h3 className="font-display font-bold text-xs uppercase tracking-widest text-accent border-b border-border/20 pb-1">
    Certifications
  </h3>

  <div className="flex flex-col gap-2 text-xs text-secondary-text">
    <div className="flex items-center gap-2">
      <Award className="w-3.5 h-3.5 text-accent" />
      <span>Microsoft Certified: Azure AI Fundamentals</span>
    </div>

    <div className="flex items-center gap-2">
      <Award className="w-3.5 h-3.5 text-accent" />
      <span>AI Fluency and Frameworks — Anthropic</span>
    </div>
  </div>
</div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
