import { motion } from "framer-motion";
import { Link } from "wouter";
import { Github, ExternalLink, ArrowLeft, Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiFirebase, SiTypescript, SiExpress, SiDocker } from "react-icons/si";

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

export default function Projects() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-mono text-xl font-bold tracking-tighter text-primary" data-testid="text-logo">
            Sami<span className="text-foreground">Hassan</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-mono text-primary uppercase tracking-widest">Portfolio</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4" data-testid="text-projects-heading">
            My Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed" data-testid="text-projects-subheading">
            A collection of full-stack applications, APIs, and tools I've built — from production-grade backends
            to polished user interfaces.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6 mb-16"
        >
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6">
            Featured
          </h2>
          {projects.filter(p => p.featured).map(project => (
            <motion.div key={project.id} variants={cardVariants}>
              <Card
                className="bg-card/50 border-white/10 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group"
                data-testid={`card-project-${project.id}`}
              >
                <CardContent className="p-6 md:p-8">
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
                      <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors" data-testid={`text-project-title-${project.id}`}>
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
                      <a href={project.github} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors" data-testid={`link-github-${project.id}`}>
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                      <a href={project.live} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors" data-testid={`link-live-${project.id}`}>
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects Grid */}
        <div>
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6">
            Other Projects
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {projects.filter(p => !p.featured).map(project => (
              <motion.div key={project.id} variants={cardVariants}>
                <Card
                  className="h-full bg-card/50 border-white/10 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group"
                  data-testid={`card-project-${project.id}`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-primary border-primary/30 font-mono text-xs">
                        {project.category}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors" data-testid={`link-github-${project.id}`}>
                          <Github className="w-4 h-4" />
                        </a>
                        <a href={project.live} className="text-muted-foreground hover:text-primary transition-colors" data-testid={`link-live-${project.id}`}>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-snug" data-testid={`text-project-title-${project.id}`}>
                      {project.title}
                    </h3>
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 py-10 border-t border-white/5 bg-background">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Sami Hassan. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-github-footer">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-linkedin-footer">
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
