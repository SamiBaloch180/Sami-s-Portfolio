import fs from 'fs';
let content = fs.readFileSync('src/pages/home.tsx', 'utf8');

// 1. Import useState, useEffect
if (!content.includes('import { useState, useEffect }')) {
  content = content.replace(
    /import \{ useForm \}/,
    `import { useState, useEffect } from "react";\nimport { useForm }`
  );
}

// 2. Add Sun to lucide-react
if (!content.includes('Sun } from "lucide-react"')) {
  content = content.replace(
    /Moon \} from "lucide-react";/,
    'Moon, Sun } from "lucide-react";'
  );
}

// 3. Add skillCategories before Home function
const skillsData = `
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
`;

if (!content.includes('const skillCategories')) {
  content = content.replace(
    /export default function Home\(\) \{/,
    `${skillsData}\nexport default function Home() {`
  );
}

// 4. Add states and logic inside Home
const stateLogic = `
  const [activeSkillTab, setActiveSkillTab] = useState('Frontend');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') || 
                   (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };
`;

if (!content.includes('const [activeSkillTab')) {
  content = content.replace(
    /export default function Home\(\) \{\n/,
    `export default function Home() {\n${stateLogic}\n`
  );
}

// 5. Replace toggle button in navbar
content = content.replace(
  /<button \s*className="w-10 h-10 rounded-full bg-white\/5 border border-white\/10 flex items-center justify-center text-yellow-500 hover:bg-white\/10 transition-colors flex-shrink-0"\s*aria-label="Toggle theme"\s*>\s*<Moon className="w-4 h-4 fill-current" \/>\s*<\/button>/,
  `<button 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-yellow-500 hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Moon className="w-4 h-4 fill-current" /> : <Sun className="w-4 h-4 fill-current text-orange-500" />}
        </button>`
);

// 6. Replace Skills section
const newSkillsSection = `
        {/* Skills Section */}
        <section id="skills" className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {/* Tabs */}
              <div className="glass-navbar mb-12 inline-flex gap-2 p-1 relative z-10">
                {Object.keys(skillCategories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveSkillTab(cat)}
                    className={\`px-6 py-2 rounded-full font-medium transition-all duration-300 \${activeSkillTab === cat ? 'bg-black/10 dark:bg-white/10 text-foreground shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-muted-foreground hover:text-foreground'}\`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Skill Bars Grid */}
              <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 relative z-0">
                {skillCategories[activeSkillTab].map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="glass-card glass-noise p-6 flex flex-col justify-center border border-black/5 dark:border-white/10"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-lg">{skill.name}</span>
                      <span className="text-muted-foreground text-sm">{skill.percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        className={\`h-full \${skill.color} rounded-full\`}
                        initial={{ width: 0 }}
                        whileInView={{ width: \`\${skill.percent}%\` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
`;

content = content.replace(
  /\{\/\* Skills Section \*\/\}[\s\S]*?<\/section>/,
  newSkillsSection
);

fs.writeFileSync('src/pages/home.tsx', content);
