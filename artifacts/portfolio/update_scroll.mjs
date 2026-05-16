import fs from 'fs';

// 1. Update index.css
let cssContent = fs.readFileSync('src/index.css', 'utf8');

// Remove .glass-navbar from the grouped selector
cssContent = cssContent.replace(
  /\.glass-base, \.glass-card, \.glass-button, \.glass-navbar/g,
  '.glass-base, .glass-card, .glass-button'
);

// Update .glass-navbar definition
cssContent = cssContent.replace(
  /\.glass-navbar\s*\{\s*@apply[^}]+\}/,
  `.glass-navbar {
    @apply rounded-full px-6 py-4 fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300;
  }
  .glass-navbar.scrolled {
    @apply backdrop-blur-[20px];
    -webkit-backdrop-filter: blur(20px);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 4px 30px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1), 
      inset 0 0 20px rgba(255, 255, 255, 0.02);
  }`
);

fs.writeFileSync('src/index.css', cssContent);

// 2. Update home.tsx
let tsxContent = fs.readFileSync('src/pages/home.tsx', 'utf8');

const injection = `
  const [activeSkillTab, setActiveSkillTab] = useState<keyof typeof skillCategories>('Frontend');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
`;

tsxContent = tsxContent.replace(
  /const \[activeSkillTab, setActiveSkillTab\] = useState<keyof typeof skillCategories>\('Frontend'\);/,
  injection
);

tsxContent = tsxContent.replace(
  /<nav className="glass-navbar[^"]*"/,
  `<nav className={\`glass-navbar \${scrolled ? 'scrolled' : ''}\`}`
);

fs.writeFileSync('src/pages/home.tsx', tsxContent);
