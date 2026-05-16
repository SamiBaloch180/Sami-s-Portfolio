import fs from 'fs';
let content = fs.readFileSync('src/pages/home.tsx', 'utf8');

const injection = `
  const [activeSkillTab, setActiveSkillTab] = useState<keyof typeof skillCategories>('Frontend');
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

  const { toast } = useToast();`;

content = content.replace(
  /export default function Home\(\) \{\r?\n\s*const \{ toast \} = useToast\(\);/,
  `export default function Home() {${injection}`
);

fs.writeFileSync('src/pages/home.tsx', content);
