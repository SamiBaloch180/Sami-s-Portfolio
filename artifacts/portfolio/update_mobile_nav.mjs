import fs from 'fs';

let content = fs.readFileSync('src/pages/home.tsx', 'utf8');

// 1. Add Menu, X to lucide-react import
content = content.replace(
  /import \{ (.*) \} from "lucide-react";/,
  `import { $1, Menu, X } from "lucide-react";`
);

// 2. Add isMobileMenuOpen state
content = content.replace(
  /const \[scrolled, setScrolled\] = useState\(false\);/,
  `const [scrolled, setScrolled] = useState(false);\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);`
);

// 3. Replace the navbar
const newNavbar = `<nav className={\`glass-navbar \${scrolled ? 'scrolled' : ''}\`}>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center gap-4 sm:gap-8 text-sm font-medium text-muted-foreground mx-auto">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
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

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center justify-between w-[60vw] max-w-[280px]">
          <span className="text-sm font-semibold tracking-widest text-foreground">MENU</span>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1 focus:outline-none hover:text-primary transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-[80px] left-4 right-4 rounded-3xl p-6 flex flex-col gap-6 items-center bg-background/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:hidden z-50"
          >
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollToSection(item === 'Skills' ? 'skills' : item.toLowerCase());
                  setIsMobileMenuOpen(false);
                }}
                className="text-muted-foreground hover:text-primary transition-colors focus:outline-none w-full py-2 text-center text-lg font-medium tracking-wide"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </nav>`;

content = content.replace(
  /<nav className=\{`glass-navbar[^>]+>([\s\S]*?)<\/nav>/,
  newNavbar
);

fs.writeFileSync('src/pages/home.tsx', content);
