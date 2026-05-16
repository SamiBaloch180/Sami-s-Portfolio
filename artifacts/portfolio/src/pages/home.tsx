import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Code2, Server, Database, Wrench, ArrowRight, ExternalLink } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { SiJavascript, SiTypescript, SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiDocker, SiGit, SiPostman } from "react-icons/si";

const techIconMap: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  React: { icon: SiReact, color: "text-cyan-400" },
  "Node.js": { icon: SiNodedotjs, color: "text-green-500" },
  MongoDB: { icon: SiMongodb, color: "text-green-400" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "text-teal-400" },
  Firebase: { icon: SiFirebase, color: "text-orange-400" },
  TypeScript: { icon: SiTypescript, color: "text-blue-400" },
  "Express.js": { icon: SiExpress, color: "text-gray-300" },
  Docker: { icon: SiDocker, color: "text-blue-500" },
};

const projects = [
  {
    id: 1,
    title: "DevConnect — Developer Collaboration Platform",
    description:
      "A full-stack platform that connects developers for pair programming, project collaboration, and knowledge sharing. Features real-time chat, project rooms, and skill-based matching.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    github: "#",
    live: "#",
    featured: true,
    category: "Full Stack",
  },
  {
    id: 2,
    title: "TaskFlow — Project Management App",
    description:
      "A Kanban-style project management tool with drag-and-drop boards, team collaboration, and real-time updates. Built with a focus on performance and clean UI.",
    tech: ["React", "TypeScript", "Express.js", "MongoDB"],
    github: "#",
    live: "#",
    featured: true,
    category: "Full Stack",
  },
  {
    id: 3,
    title: "ShopNow — E-Commerce API",
    description:
      "A robust REST API for a modern e-commerce platform. Includes authentication, product management, order processing, and payment integration endpoints.",
    tech: ["Node.js", "Express.js", "MongoDB", "Docker"],
    github: "#",
    live: "#",
    featured: false,
    category: "Backend",
  },
  {
    id: 4,
    title: "FireTrack — Real-Time Analytics Dashboard",
    description:
      "A live analytics dashboard that visualizes user activity and business metrics in real time. Uses Firebase for data sync and Recharts for beautiful data visualization.",
    tech: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    github: "#",
    live: "#",
    featured: false,
    category: "Frontend",
  },
  {
    id: 5,
    title: "AuthVault — Auth Microservice",
    description:
      "A production-ready authentication microservice with JWT refresh tokens, OAuth2 social login, rate limiting, and role-based access control. Containerized with Docker.",
    tech: ["Node.js", "Express.js", "MongoDB", "Docker"],
    github: "#",
    live: "#",
    featured: false,
    category: "Backend",
  },
  {
    id: 6,
    title: "PortfolioGen — Resume Builder",
    description:
      "A dynamic portfolio and resume generator that lets developers create stunning personal sites from a single JSON config. Exports to PDF and deploys with one click.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    github: "#",
    live: "#",
    featured: false,
    category: "Frontend",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;


const skillCategories = {
  Frontend: [
    { name: 'React/Next.js', percent: 95, color: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' },
    { name: 'TypeScript', percent: 90, color: 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]' },
    { name: 'Tailwind CSS', percent: 92, color: 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' },
    { name: 'Framer Motion', percent: 88, color: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' },
  ],
  Backend: [
    { name: 'Node.js', percent: 90, color: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' },
    { name: 'Express.js', percent: 85, color: 'bg-gray-400 shadow-[0_0_10px_rgba(156,163,175,0.5)]' },
    { name: 'MongoDB', percent: 88, color: 'bg-green-600 shadow-[0_0_10px_rgba(22,163,74,0.5)]' },
    { name: 'PostgreSQL', percent: 80, color: 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]' },
  ],
  Design: [
    { name: 'Figma', percent: 90, color: 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]' },
    { name: 'UI/UX Principles', percent: 85, color: 'bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]' },
    { name: 'Responsive Design', percent: 95, color: 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]' },
    { name: 'Prototyping', percent: 88, color: 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.5)]' },
  ]
};

export default function Home() {
  
  const [activeSkillTab, setActiveSkillTab] = useState<keyof typeof skillCategories>('Frontend');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const { toast } = useToast();
  const submitContactMutation = useSubmitContact();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (data: ContactFormValues) => {
    submitContactMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({ title: "Message sent", description: "Thanks for reaching out! I'll get back to you soon." });
          form.reset();
        },
        onError: (err: any) => {
          const errorMessage = err?.data?.error || err?.message || "Failed to send message. Please try again later.";
          toast({ title: "Error", description: errorMessage, variant: "destructive" });
        },
      }
    );
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Navbar */}
      <nav className={`glass-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="flex items-center justify-center gap-4 sm:gap-8 text-sm font-medium text-muted-foreground mx-auto">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item === 'Skills' ? 'skills' : item.toLowerCase())}
              className="hover:text-primary transition-colors focus:outline-none"
              data-testid={`link-${item.toLowerCase()}`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-[calc(100vh-4rem)] flex items-center pt-16 pb-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6" data-testid="badge-availability">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Available for opportunities
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4" data-testid="text-hero-heading">
                  Hi, I'm{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">
                    Sami Hassan
                  </span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-mono text-muted-foreground mb-6" data-testid="text-hero-subheading">
                  Full Stack Developer
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground/80 mb-10 max-w-xl leading-relaxed" data-testid="text-hero-tagline">
                  I build scalable web applications using modern technologies.
                  Bridging the gap between robust backend systems and intuitive user interfaces.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/projects">
                    <button className="glass-button glass-noise text-primary" data-testid="button-view-projects">
                      View Projects
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="glass-button glass-noise"
                    data-testid="button-contact-hero"
                  >
                    Contact Me
                  </button>
                </div>
              </motion.div>

              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-2xl rounded-3xl" />
                  <img
                    src="/sami.png"
                    alt="Sami Hassan"
                    className="relative w-64 md:w-80 drop-shadow-2xl"
                    data-testid="img-hero-photo"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-card/30 border-y border-white/5">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4" data-testid="text-about-heading">
                <span className="w-8 h-[2px] bg-primary"></span>
                About Me
              </h2>

              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
                {/* Photo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex-shrink-0"
                >
                  <div className="relative w-56 h-72 md:w-64 md:h-80">
                    <div className="absolute -inset-3 rounded-2xl bg-gradient-to-b from-primary/20 to-transparent blur-xl" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-primary/20">
                      <img
                        src="/sami.png"
                        alt="Sami Hassan"
                        className="w-full h-full object-cover object-top"
                        data-testid="img-about-photo"
                      />
                    </div>
                    {/* Accent corner */}
                    <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-lg border-2 border-primary/40 bg-background" />
                  </div>
                </motion.div>

                {/* Text */}
                <div className="flex-1 space-y-5 text-muted-foreground/90 leading-relaxed text-lg">
                  <p>
                    As a Full Stack Developer, I am passionate about creating end-to-end solutions that are not only
                    performant and secure but also provide an exceptional user experience. My journey in software
                    development has been driven by a continuous desire to learn and master modern web technologies.
                  </p>
                  <p>
                    I approach development with an engineering mindset — valuing clean code, scalable architecture,
                    and maintainability. Whether I'm designing database schemas, architecting APIs, or building
                    responsive frontend components, I focus on delivering high-quality software that solves
                    real-world problems.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {['Problem Solver', 'Clean Code', 'Scalable Systems', 'Continuous Learner'].map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full text-sm font-mono bg-primary/10 text-primary border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="skills" className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4" data-testid="text-tech-heading">
                <span className="w-8 h-[2px] bg-primary"></span>
                Skills
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card glass-noise h-full flex flex-col">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                      <Code2 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4" data-testid="text-category-frontend">Frontend</h3>
                    <ul className="space-y-3">
                      {[
                        { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
                        { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-400' },
                        { name: 'React', icon: SiReact, color: 'text-cyan-400' },
                        { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-teal-400' },
                      ].map(tech => (
                        <li key={tech.name} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group cursor-default">
                          <tech.icon className={`w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity ${tech.color}`} />
                          <span className="font-mono text-sm">{tech.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="glass-card glass-noise h-full flex flex-col">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                      <Server className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4" data-testid="text-category-backend">Backend</h3>
                    <ul className="space-y-3">
                      {[
                        { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
                        { name: 'Express.js', icon: SiExpress, color: 'text-gray-300' },
                      ].map(tech => (
                        <li key={tech.name} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group cursor-default">
                          <tech.icon className={`w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity ${tech.color}`} />
                          <span className="font-mono text-sm">{tech.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="glass-card glass-noise h-full flex flex-col">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                      <Database className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4" data-testid="text-category-database">Database & Cloud</h3>
                    <ul className="space-y-3">
                      {[
                        { name: 'MongoDB', icon: SiMongodb, color: 'text-green-400' },
                        { name: 'Firebase', icon: SiFirebase, color: 'text-orange-400' },
                      ].map(tech => (
                        <li key={tech.name} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group cursor-default">
                          <tech.icon className={`w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity ${tech.color}`} />
                          <span className="font-mono text-sm">{tech.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="glass-card glass-noise h-full flex flex-col">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                      <Wrench className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4" data-testid="text-category-tools">Tools & DevOps</h3>
                    <ul className="space-y-3">
                      {[
                        { name: 'Docker', icon: SiDocker, color: 'text-blue-500' },
                        { name: 'Git', icon: SiGit, color: 'text-orange-500' },
                        { name: 'Postman', icon: SiPostman, color: 'text-orange-600' },
                      ].map(tech => (
                        <li key={tech.name} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group cursor-default">
                          <tech.icon className={`w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity ${tech.color}`} />
                          <span className="font-mono text-sm">{tech.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-card/30 border-y border-white/5">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-mono text-primary uppercase tracking-widest">Portfolio</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-12" data-testid="text-projects-heading">
                My Projects
              </h2>

              {/* Featured Projects */}
              <div className="space-y-6 mb-16">
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
                  Featured
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {projects.filter(p => p.featured).map(project => (
                    <motion.div key={project.id} variants={cardVariants}>
                      <div
                        className="glass-card glass-noise group"
                        data-testid={`card-project-${project.id}`}
                      >
                        <div className="p-6 md:p-8">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <Badge variant="outline" className="text-primary border-primary/30 font-mono text-xs">
                                  {project.category}
                                </Badge>
                                <Badge className="bg-primary/10 text-primary border-0 font-mono text-xs">
                                  Featured
                                </Badge>
                              </div>
                              <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-muted-foreground leading-relaxed mb-5">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => {
                                  const entry = techIconMap[t];
                                  return (
                                    <span key={t} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-white/10 text-xs font-mono text-muted-foreground">
                                      {entry && <entry.icon className={`w-3.5 h-3.5 ${entry.color}`} />}
                                      {t}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="flex md:flex-col gap-3 md:items-end flex-shrink-0">
                              <a href={project.github} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                                <Github className="w-4 h-4" />
                                Code
                              </a>
                              <a href={project.live} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors">
                                <ExternalLink className="w-4 h-4" />
                                Live
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Other Projects */}
              <div>
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
                  Other Projects
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {projects.filter(p => !p.featured).map(project => (
                    <motion.div key={project.id} variants={cardVariants}>
                      <div className="glass-card glass-noise h-full flex flex-col group">
                        <div className="p-6 flex flex-col h-full">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline" className="text-primary border-primary/30 font-mono text-xs">
                              {project.category}
                            </Badge>
                            <div className="flex items-center gap-2">
                              <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="w-4 h-4" />
                              </a>
                              <a href={project.live} className="text-muted-foreground hover:text-primary transition-colors">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                          <h4 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                            {project.title}
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-auto">
                            {project.tech.map(t => {
                              const entry = techIconMap[t];
                              return (
                                <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-background border border-white/10 text-xs font-mono text-muted-foreground">
                                  {entry && <entry.icon className={`w-3 h-3 ${entry.color}`} />}
                                  {t}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        <section id="contact" className="py-24 bg-card/30 border-t border-white/5">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-contact-heading">Get In Touch</h2>
                <p className="text-muted-foreground" data-testid="text-contact-subheading">
                  Have a question or want to work together? Leave a message.
                </p>
              </div>

              <div className="glass-card glass-noise">
                <div className="p-6 md:p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="bg-white/5 border-white/10 focus-visible:ring-primary backdrop-blur-md rounded-xl text-white placeholder:text-white/40" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" className="bg-white/5 border-white/10 focus-visible:ring-primary backdrop-blur-md rounded-xl text-white placeholder:text-white/40" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="How can I help you?" className="min-h-[150px] bg-white/5 border-white/10 focus-visible:ring-primary resize-none backdrop-blur-md rounded-xl text-white placeholder:text-white/40" {...field} data-testid="input-message" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <button type="submit" className="glass-button glass-noise w-full mt-4" disabled={submitContactMutation.isPending} data-testid="button-submit-contact">
                        {submitContactMutation.isPending ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  </Form>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-background">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-mono text-lg font-bold tracking-tighter text-muted-foreground">
            Sami<span className="text-primary/70">Hassan</span>
          </div>
          <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            © 2026 Sami Hassan. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/SamiBaloch180" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-github">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/sami-hassan-a47ab127a/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-linkedin">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-email">
              <Mail className="w-5 h-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
