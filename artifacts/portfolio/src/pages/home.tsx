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
import { Github, Linkedin, Mail, Code2, Server, Database, Wrench, ArrowRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SiJavascript, SiTypescript, SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiDocker, SiGit, SiPostman } from "react-icons/si";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Home() {
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
        onError: () => {
          toast({ title: "Error", description: "Failed to send message. Please try again later.", variant: "destructive" });
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
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="font-mono text-xl font-bold tracking-tighter text-primary" data-testid="text-logo">
            Sami<span className="text-foreground">Hassan</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {['Home', 'About', 'Tech Stack', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="hover:text-primary transition-colors focus:outline-none"
                data-testid={`link-${item.toLowerCase().replace(' ', '-')}`}
              >
                {item}
              </button>
            ))}
            <Link
              href="/projects"
              className="hover:text-primary transition-colors"
              data-testid="link-projects"
            >
              Projects
            </Link>
          </div>
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
                    <Button size="lg" className="font-semibold" data-testid="button-view-projects">
                      View Projects
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => scrollToSection('contact')}
                    className="font-semibold hover:bg-primary/10 border-white/10"
                    data-testid="button-contact-hero"
                  >
                    Contact Me
                  </Button>
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
        <section id="tech-stack" className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4" data-testid="text-tech-heading">
                <span className="w-8 h-[2px] bg-primary"></span>
                Tech Stack
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-card/50 border-white/10 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
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
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-white/10 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
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
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-white/10 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
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
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-white/10 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
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
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
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

              <Card className="bg-background/50 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 md:p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="bg-background border-white/10 focus-visible:ring-primary" {...field} data-testid="input-name" />
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
                              <Input placeholder="john@example.com" className="bg-background border-white/10 focus-visible:ring-primary" {...field} data-testid="input-email" />
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
                              <Textarea placeholder="How can I help you?" className="min-h-[150px] bg-background border-white/10 focus-visible:ring-primary resize-none" {...field} data-testid="input-message" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full font-semibold" disabled={submitContactMutation.isPending} data-testid="button-submit-contact">
                        {submitContactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
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
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-github">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-linkedin">
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
