import fs from 'fs';
let content = fs.readFileSync('src/pages/home.tsx', 'utf8');

content = content.replace(
  /import \{ Github, Linkedin, Mail, Code2, Server, Database, Wrench, ArrowRight, ExternalLink \} from "lucide-react";/,
  'import { Github, Linkedin, Mail, Code2, Server, Database, Wrench, ArrowRight, ExternalLink, Moon } from "lucide-react";'
);

content = content.replace(
  /<nav className="glass-navbar mx-4 md:mx-auto max-w-7xl mt-4 flex items-center justify-between">[\s\S]*?<\/nav>/,
  `<nav className="glass-navbar mx-4 md:mx-auto max-w-4xl mt-4 flex items-center justify-between relative px-2 sm:px-6">
        <div className="w-10 hidden sm:block"></div> {/* Spacer for perfect centering */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 text-sm font-medium text-muted-foreground mx-auto">
          {['Home', 'Projects', 'Skills', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item === 'Skills' ? 'skills' : item.toLowerCase())}
              className="hover:text-primary transition-colors focus:outline-none"
              data-testid={\`link-\${item.toLowerCase()}\`}
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-yellow-500 hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label="Toggle theme"
        >
          <Moon className="w-4 h-4 fill-current" />
        </button>
      </nav>`
);

content = content.replace(
  /id="tech-stack"/,
  'id="skills"'
);

content = content.replace(
  /Tech Stack\s*<\/h2>/,
  'Skills\n              </h2>'
);

fs.writeFileSync('src/pages/home.tsx', content);
