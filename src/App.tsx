import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  ChevronRight, 
  Menu, 
  X, 
  Check, 
  Sparkles, 
  Send, 
  FileText, 
  ExternalLink,
  MapPin,
  Calendar,
  Layers,
  Code2,
  Terminal,
  Cpu,
  BookmarkCheck,
  CheckCircle2
} from "lucide-react";

import { experiences, projects, skillCategories } from "./data";
import ProjectVisualizer from "./components/ProjectVisualizer";
import ResumeModal from "./components/ResumeModal";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);

  // Contact form state
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  // Refs for scroll container mapping
  const sectionsRef = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null)
  };

  // Track active section during scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for navbar height

      // Find the section currently in view
      for (const [sectionName, ref] of Object.entries(sectionsRef)) {
        const element = ref.current;
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionName);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (sectionId: keyof typeof sectionsRef) => {
    setMobileMenuOpen(false);
    const element = sectionsRef[sectionId].current;
    if (element) {
      const offset = 80; // Navbar offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Form submit validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof formErrors = {};
    
    if (!formState.name.trim()) errors.name = "Please enter your name.";
    if (!formState.email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formState.message.trim()) errors.message = "Please write a brief message.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormStatus("sending");

    // Simulate reliable API contact registration with Tanvi's email endpoint
    setTimeout(() => {
      setFormStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
      // Reset success status after a few seconds
      setTimeout(() => setFormStatus("idle"), 6000);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden font-sans antialiased text-secondary-text">
      
      {/* BACKGROUND ELEMENTS: Ultra-slow floating ambient gradients to reinforce premium feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft floating blob A */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-10 w-125 h-125 rounded-full bg-highlight-bg/40 blur-[120px]"
        />
        {/* Soft floating blob B */}
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 50, -40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-10 w-150 h-150 rounded-full bg-accent/10 blur-[140px]"
        />
        {/* Subtle dot overlay grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#AEBBD8_1px,transparent_1px)] bg-size-[24px_24px] opacity-15" />
      </div>

      {/* STICKY NAVIGATION BAR */}
      <header className="fixed top-0 inset-x-0 z-40 bg-bg/85 backdrop-blur-md border-b border-border/50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Brand Mark */}
          <button 
            onClick={() => scrollToSection("home")} 
            className="flex items-center gap-2.5 hover:opacity-85 transition-opacity"
            id="btn-logo-home"
          >
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-accent to-accent-hover flex items-center justify-center shadow-sm">
              <span className="font-display font-bold text-white text-sm">T</span>
            </div>
            <span className="font-display font-bold text-heading text-lg tracking-tight">tanvi.io</span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {["home", "about", "experience", "projects", "skills"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section as keyof typeof sectionsRef)}
                className={`font-display text-xs font-semibold uppercase tracking-wider transition-colors py-1.5 border-b-2 relative ${
                  activeSection === section 
                    ? "text-heading border-accent" 
                    : "text-muted-text border-transparent hover:text-heading"
                }`}
                id={`nav-${section}`}
              >
                {section}
              </button>
            ))}
          </nav>

          {/* Resume button & Mobile menu toggler */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-white hover:bg-highlight-bg border border-border px-5 py-2 rounded-2xl text-xs font-semibold text-heading transition-all duration-300 shadow-sm shadow-heading/5 font-display"
              id="btn-nav-resume"
            >
              <FileText className="w-3.5 h-3.5 text-accent" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-heading hover:bg-white/50 rounded-xl transition-all border border-transparent hover:border-border"
              aria-label="Toggle Navigation Menu"
              id="btn-mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50 bg-bg px-6 py-6 flex flex-col gap-4 overflow-hidden shadow-lg"
            >
              {["home", "about", "experience", "projects", "skills"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section as keyof typeof sectionsRef)}
                  className={`text-left font-display text-sm font-semibold capitalize py-2 px-3 rounded-xl transition-all ${
                    activeSection === section 
                      ? "bg-white text-heading shadow-sm" 
                      : "text-muted-text hover:text-heading"
                  }`}
                  id={`nav-mobile-${section}`}
                >
                  {section}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResumeOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full mt-2 bg-white border border-border py-2.5 rounded-xl text-sm font-semibold text-heading transition-all font-display"
                id="btn-mobile-nav-resume"
              >
                <FileText className="w-4 h-4 text-accent" />
                <span>Open Resume</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-6 pt-20 relative z-10 flex flex-col gap-24 md:gap-32">
        
        {/* HERO SECTION */}
        <section 
          id="home" 
          ref={sectionsRef.home}
          className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-center gap-12 py-12 md:py-20"
        >
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex flex-col items-start text-left"
          >

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-heading tracking-tight leading-none">
              Hello, I&apos;m Tanvi
            </h1>
            
            {/* Carousel-like dynamic developer badges */}
            <div className="flex flex-wrap gap-2.5 mt-4 mb-6">
              {["Software Engineer", "Full Stack Developer", "AI Enthusiast"].map((badge, idx) => (
                <span 
                  key={idx} 
                  className="font-display text-xs md:text-sm font-medium px-4 py-1.5 bg-highlight-bg text-heading rounded-full border border-border/65 shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </div>

            <p className="text-secondary-text text-base md:text-lg max-w-xl leading-relaxed mb-8">
              I'm a Pre-Final Year Information Technology student passionate about building intelligent, scalable software. I enjoy combining full-stack development with AI to create practical solutions that solve real-world problems.

            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3.5 bg-accent hover:bg-accent-hover active:scale-[0.98] text-white rounded-2xl text-sm font-semibold tracking-wide transition-all shadow-md shadow-heading/10 flex items-center gap-2 group font-display"
                id="btn-hero-projects"
              >
                <span>View Projects</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => setIsResumeOpen(true)}
                className="px-8 py-3.5 bg-white hover:bg-highlight-bg active:scale-[0.98] border border-border text-heading rounded-2xl text-sm font-semibold tracking-wide transition-all shadow-sm flex items-center gap-2 font-display"
                id="btn-hero-resume"
              >
                <FileText className="w-4 h-4 text-accent" />
                <span>View Resume</span>
              </button>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-5 pt-4 border-t border-border/40 w-full sm:w-auto justify-start">
              <span className="text-xs font-mono font-medium text-muted-text uppercase tracking-wider">Connect:</span>
              <a 
                href="https://github.com/tunviii" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-white/50 hover:bg-white border border-border text-secondary-text hover:text-heading rounded-xl transition-all shadow-sm hover:scale-105"
                aria-label="GitHub Profile"
                id="link-github"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/tanvi-uddandam-5a5654355/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-white/50 hover:bg-white border border-border text-secondary-text hover:text-heading rounded-xl transition-all shadow-sm hover:scale-105"
                aria-label="LinkedIn Profile"
                id="link-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="mailto:utanvi07@gmail.com" 
                className="p-2 bg-white/50 hover:bg-white border border-border text-secondary-text hover:text-heading rounded-xl transition-all shadow-sm hover:scale-105"
                aria-label="Email Tanvi"
                id="link-email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Hero Right Content: Profile Photo */}
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, delay: 0.2 }}
  className="flex-1 flex justify-center items-center relative"
>
  {/* Decorative Rings */}
  <div className="absolute w-[320px] h-80 rounded-full border border-border/30 animate-[spin_35s_linear_infinite]" />
  <div className="absolute w-95 h-95 rounded-full border border-dashed border-border/25 animate-[spin_50s_linear_infinite_reverse]" />

  {/* Background Blobs */}
  <div className="absolute -top-6 right-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl" />
  <div className="absolute bottom-8 -left-6 w-24 h-24 rounded-full bg-success-accent/10 blur-2xl" />

  {/* Profile Image */}
  <div className="relative w-100 h-100 rounded-[28px] overflow-hidden border border-border shadow-premium bg-white">
    <img
  src={new URL("../public/profile.jpg", import.meta.url).href}
  alt="Tanvi"
/>
  </div>
</motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section 
          id="about" 
          ref={sectionsRef.about}
          className="scroll-mt-24"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Left side text column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-accent mb-2">01 / Biography</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-heading tracking-tight mb-6">
                About Me
              </h2>
              
              <div className="flex flex-col gap-5 text-secondary-text text-sm md:text-base leading-relaxed">
                <p>
                  I am a third-year Information Technology student at Chaitanya Bharathi Institute of Technology, passionate about building intelligent software that combines thoughtful user experiences with scalable backend systems. My interests span full-stack development, artificial intelligence, and designing applications that solve practical, real-world problems.
                </p>
                <p>
                  Through academic projects and professional experience, I have developed AI-powered applications, real-time systems, and modern web platforms using technologies such as React, Node.js, Express, and MongoDB. Currently, as a Full Stack Developer Intern at Rengy, I am contributing to the development and modernization of web applications while focusing on clean architecture, maintainable code, and performance.
                </p>
                <p>
                  I believe great software is built through simplicity, reliability, and continuous learning. Whether I'm developing AI-driven solutions, designing intuitive interfaces, or optimizing backend workflows, I enjoy creating products that are both technically robust and genuinely useful.
                </p>
              </div>

              {/* Mini Education/Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-8 pt-6 border-t border-border/40 font-display">
                <div className="p-4 bg-white/70 border border-border/70 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-mono uppercase font-semibold text-muted-text">CURRENT INTERNSHIP</span>
                  <h4 className="font-bold text-heading mt-0.5 text-sm">Full Stack Developer Intern</h4>
                  <p className="text-xs text-accent font-medium mt-0.5">Rengy &middot; IT Team</p>
                </div>
                <div className="p-4 bg-white/70 border border-border/70 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-mono uppercase font-semibold text-muted-text">ACADEMIC PATH</span>
                  <h4 className="font-bold text-heading mt-0.5 text-sm">B.E. Information Technology</h4>
                  <p className="text-xs text-accent font-medium mt-0.5">CBIT &middot; 8.40 CGPA</p>
                </div>
              </div>
            </div>

            {/* Right side illustration column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-white border border-border/85 rounded-[20px] p-6 shadow-premium overflow-hidden flex flex-col justify-between">
                
                {/* Visual geometric abstraction */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-accent/15 to-transparent rounded-bl-full" />
                
                <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-4">
  <div className="flex items-center gap-2">
    <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-heading">
      Active Capabilities
    </span>
  </div>
  <Layers className="w-4 h-4 text-muted-text" />
</div>

<div className="flex flex-col gap-3">
  {[
    { name: "React", level: "Frontend" },
    { name: "React Native", level: "Mobile" },
    { name: "Node.js", level: "Backend" },
    { name: "Fastify", level: "Microservices" },
    { name: "MongoDB", level: "Database" },
    { name: "TypeScript", level: "Primary Language" },
    { name: "Python", level: "AI & Analytics" },
    { name: "AWS", level: "Cloud" }
  ].map((tech, idx) => (
    <div
      key={idx}
      className="flex justify-between items-center p-2 rounded-xl hover:bg-highlight-bg transition-colors"
    >
      <span className="font-display font-semibold text-sm text-heading">
        {tech.name}
      </span>

      <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-highlight-bg text-accent">
        {tech.level}
      </span>
    </div>
  ))}
</div>

                <div className="bg-highlight-bg border border-border/50 rounded-lg p-3 relative z-10 text-[11px] flex items-center justify-between font-display">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-accent" />
                    <span className="font-bold text-heading text-xs">AI & Systems Research</span>
                  </div>
                  <span className="text-[10px] text-muted-text font-mono">Status: Active</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section 
          id="experience" 
          ref={sectionsRef.experience}
          className="scroll-mt-24"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-xl mb-16"
            >
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-accent mb-2">02 / Career Path</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-heading tracking-tight mb-4">
                Experience
              </h2>
              <p className="text-secondary-text text-sm md:text-base">
                An active history of building responsive developer tools.
              </p>
            </motion.div>

            {/* Vertical Timeline */}
            <div className="relative border-l border-border w-full pl-6 md:pl-10 ml-2 md:ml-4 flex flex-col gap-12">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline bullet node */}
                  <div className="absolute -left-7.75 md:-left-11.75 top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-white group-hover:bg-accent transition-colors duration-300 z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-bg" />
                  </div>

                  {/* Experience Card */}
                  <div className="bg-card-bg border border-border/80 p-6 md:p-8 rounded-[20px] shadow-premium hover:shadow-premium-hover transition-all duration-300 relative">
                    
                    {/* Header bar of experience card */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4 mb-4">
                      <div>
                        <h3 className="font-display font-extrabold text-base md:text-lg text-heading">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-display font-bold text-xs text-accent">@{exp.company}</span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="font-mono text-[11px] text-muted-text">{exp.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-secondary-text text-sm leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    {/* Contributions Bullet List */}
                    <div className="flex flex-col gap-2.5 mb-6">
                      <span className="font-display font-semibold text-xs tracking-wider uppercase text-heading">Key Accomplishments:</span>
                      <ul className="list-disc list-outside pl-4 flex flex-col gap-2 text-xs md:text-sm text-secondary-text leading-relaxed">
                        {exp.contributions.map((bullet, bIdx) => (
                          <li key={bIdx} className="hover:text-heading transition-colors duration-200">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies list */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
                      {exp.technologies.map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="font-mono text-[10px] font-semibold tracking-tight text-heading bg-highlight-bg border border-border/40 px-2.5 py-1 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section 
          id="projects" 
          ref={sectionsRef.projects}
          className="scroll-mt-24"
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-xl mx-auto mb-16"
          >
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-accent mb-2">03 / Works</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-heading tracking-tight mb-4">
              Projects
            </h2>
            <p className="text-secondary-text text-sm md:text-base">
              A curated selection of core platforms, vector visualizers, and cloud metrics orchestrators built to solve complex developer pain points.
            </p>
          </motion.div>

          {/* Large Project Cards list */}
          <div className="flex flex-col gap-12 md:gap-16">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="bg-white border border-border/80 rounded-[20px] overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col lg:flex-row items-stretch"
              >
                
                {/* Visualizer Frame Column (Hover zoom) */}
                <div className="w-full lg:w-1/2 bg-card-bg border-b lg:border-b-0 lg:border-r border-border/60 p-6 flex items-center justify-center group overflow-hidden relative">
                  <div className="w-full h-full relative z-10">
                    <ProjectVisualizer projectKey={project.image} />
                  </div>
                  {/* Subtle hover backdrop zoom */}
                  <div className="absolute inset-0 bg-border/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Information Details Column */}
                <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col justify-between text-left">
                  <div>
                    {/* Tags Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="font-mono text-[9px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display font-extrabold text-2xl text-heading mb-3 tracking-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-secondary-text text-sm md:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Three key highlights */}
                    <div className="flex flex-col gap-2.5 mb-8">
                      <span className="font-display font-semibold text-xs uppercase tracking-widest text-heading">Highlights & Core Tech:</span>
                      <ul className="flex flex-col gap-2">
                        {project.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs md:text-sm text-secondary-text leading-relaxed">
                            <span className="p-0.5 bg-success-accent/10 rounded-full text-success-accent mt-0.5">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-3 border-t border-border/40 pt-6">
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 bg-card-bg hover:bg-highlight-bg border border-border hover:border-accent text-heading rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-1.5 font-display"
                      id={`btn-project-github-${idx}`}
                    >
                      <Github className="w-4 h-4" />
                      <span>Code Repository</span>
                    </a>
                  </div>

                  {/* Expandable Case Study Box */}
                  <AnimatePresence>
                    {selectedCaseStudy === project.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-6"
                      >
                        <div className="bg-card-bg border border-accent/25 rounded-xl p-5 text-left font-sans text-xs md:text-sm text-secondary-text leading-relaxed flex flex-col gap-2.5">
                          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
                            <BookmarkCheck className="w-4 h-4 text-accent" />
                            <span className="font-display font-bold text-heading text-xs uppercase tracking-wide">Developer Writeup</span>
                          </div>
                          <p className="text-[11px] text-muted-text">
                            This engineering log discusses architectural considerations of this deployment. For complete source specifications, please examine the referenced repository.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section
  id="skills"
  ref={sectionsRef.skills}
  className="scroll-mt-24 pb-32 md:pb-40"
>
          <div className="max-w-5xl mx-auto">
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-xl mx-auto mb-16"
            >
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-accent mb-2">04 / Core Competencies</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-heading tracking-tight mb-4">
                Technical Capabilities
              </h2>
            </motion.div>

            {/* Skills Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-card-bg border border-border/85 rounded-[20px] p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300 text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 border-b border-border/40 pb-3 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                      <h3 className="font-display font-extrabold text-sm text-heading tracking-wide">
                        {cat.category}
                      </h3>
                    </div>
                    
                    {/* Skills pill wrap */}
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="font-display text-xs font-semibold px-3.5 py-1.5 bg-white border border-border/60 hover:border-accent hover:text-accent rounded-full transition-colors duration-200 text-heading shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>


      {/* COMPONENT MODALS: Interactive Resume document */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

    </div>
  );
}
