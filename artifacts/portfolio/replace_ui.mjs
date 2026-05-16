import fs from 'fs';
let content = fs.readFileSync('src/pages/home.tsx', 'utf8');

// Replace Navbar
content = content.replace(
  /<nav className="sticky top-0 z-50 w-full border-b border-white\/5 bg-background\/80 backdrop-blur-md">[\s\S]*?<\/nav>/,
  `<nav className="glass-navbar mx-4 md:mx-auto max-w-7xl mt-4 flex items-center justify-between">
        <div className="font-mono text-xl font-bold tracking-tighter text-primary" data-testid="text-logo">
          Sami<span className="text-foreground">Hassan</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {['Home', 'About', 'Tech Stack', 'Projects', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="hover:text-primary transition-colors focus:outline-none"
              data-testid={\`link-\${item.toLowerCase().replace(' ', '-')}\`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>`
);

// Replace Buttons in Hero
content = content.replace(
  /<Button size="lg" className="font-semibold" data-testid="button-view-projects">\s*View Projects\s*<ArrowRight className="ml-2 w-4 h-4" \/>\s*<\/Button>/g,
  `<button className="glass-button glass-noise text-primary" data-testid="button-view-projects">
                      View Projects
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>`
);
content = content.replace(
  /<Button\s*size="lg"\s*variant="outline"\s*onClick=\{\(\) => scrollToSection\('contact'\)\}\s*className="font-semibold hover:bg-primary\/10 border-white\/10"\s*data-testid="button-contact-hero"\s*>\s*Contact Me\s*<\/Button>/g,
  `<button
                    onClick={() => scrollToSection('contact')}
                    className="glass-button glass-noise"
                    data-testid="button-contact-hero"
                  >
                    Contact Me
                  </button>`
);

// Replace Tech Stack Cards
content = content.replace(
  /<Card className="bg-card\/50 border-white\/10 hover:border-primary\/50 hover:-translate-y-1 transition-all duration-300">/g,
  `<div className="glass-card glass-noise h-full flex flex-col">`
);

// Replace Featured Project Cards
content = content.replace(
  /<Card\s*className="bg-card\/50 border-white\/10 hover:border-primary\/40 hover:-translate-y-1 transition-all duration-300 group"\s*data-testid=\{`card-project-\$\{project\.id\}`\}\s*>/g,
  `<div
                        className="glass-card glass-noise group"
                        data-testid={\`card-project-\${project.id}\`}
                      >`
);

// Replace Other Project Cards
content = content.replace(
  /<Card\s*className="h-full bg-card\/50 border-white\/10 hover:border-primary\/40 hover:-translate-y-1 transition-all duration-300 group"\s*>/g,
  `<div className="glass-card glass-noise h-full flex flex-col group">`
);

// Replace Contact Card
content = content.replace(
  /<Card className="bg-background\/50 border-white\/10 backdrop-blur-sm">/g,
  `<div className="glass-card glass-noise">`
);

// Replace CardContents and closing Cards
content = content.replace(/<CardContent/g, '<div');
content = content.replace(/<\/CardContent>/g, '</div>');
content = content.replace(/<\/Card>/g, '</div>');

// Replace standard input/textarea classes to match glass
content = content.replace(
  /className="bg-background border-white\/10 focus-visible:ring-primary"/g,
  `className="bg-white/5 border-white/10 focus-visible:ring-primary backdrop-blur-md rounded-xl text-white placeholder:text-white/40"`
);
content = content.replace(
  /className="min-h-\[150px\] bg-background border-white\/10 focus-visible:ring-primary resize-none"/g,
  `className="min-h-[150px] bg-white/5 border-white/10 focus-visible:ring-primary resize-none backdrop-blur-md rounded-xl text-white placeholder:text-white/40"`
);

// Replace Submit button
content = content.replace(
  /<Button type="submit" className="w-full font-semibold" disabled=\{submitContactMutation\.isPending\} data-testid="button-submit-contact">/g,
  `<button type="submit" className="glass-button glass-noise w-full mt-4" disabled={submitContactMutation.isPending} data-testid="button-submit-contact">`
);
content = content.replace(
  /<\/Button>\s*<\/form>/,
  `</button>\n                    </form>`
);

fs.writeFileSync('src/pages/home.tsx', content);
