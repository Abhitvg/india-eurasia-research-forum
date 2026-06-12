import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';
const APP_DIR = './app';

const pagesToMigrate = [
  { src: 'Home.tsx', dest: 'page.tsx' },
  { src: 'About.tsx', dest: 'about/page.tsx' },
  { src: 'Contact.tsx', dest: 'contact/page.tsx' },
  { src: 'Team.tsx', dest: 'our-people/page.tsx' },
  { src: 'WriteForUs.tsx', dest: 'write-for-us/page.tsx' },
  { src: 'Events.tsx', dest: 'events/page.tsx' },
  { src: 'VolgaToGanga.tsx', dest: 'events/volga-to-ganga/page.tsx' },
  { src: 'IERFTalks.tsx', dest: 'events/ierf-talks/page.tsx' },
  { src: 'Publications.tsx', dest: 'research/page.tsx' },
  { src: 'PublicationDetail.tsx', dest: 'research/[id]/page.tsx' },
  { src: 'DigiEurasia.tsx', dest: 'digieurasia/page.tsx' },
  { src: 'Admin.tsx', dest: 'admin/page.tsx' },
];

function processContent(content) {
  let c = content;
  // Convert react-router-dom Link to next/link
  c = c.replace(/import\s+{([^}]*)}?\s+from\s+['"]react-router-dom['"];?/g, (match, imports) => {
    let nextImports = [];
    let navImports = [];
    if (imports.includes('Link')) nextImports.push('Link');
    if (imports.includes('useNavigate')) navImports.push('useRouter');
    if (imports.includes('useLocation')) navImports.push('usePathname');
    if (imports.includes('useParams')) navImports.push('useParams');
    
    let res = '';
    if (nextImports.length) res += `import Link from 'next/link';\n`;
    if (navImports.length) res += `import { ${navImports.join(', ')} } from 'next/navigation';\n`;
    return res;
  });

  c = c.replace(/useNavigate\(\)/g, 'useRouter()');
  c = c.replace(/useLocation\(\)/g, 'usePathname()');
  c = c.replace(/<Link([^>]+)to=/g, '<Link$1href=');
  c = c.replace(/window\.scrollTo\([^)]+\);?/g, '// window.scrollTo() removed for Next.js');
  
  if (!c.includes('"use client"') && !c.includes("'use client'")) {
    c = '"use client";\n\n' + c;
  }
  return c;
}

if (!fs.existsSync(APP_DIR)) {
  fs.mkdirSync(APP_DIR);
}

for (const p of pagesToMigrate) {
  const srcPath = path.join(SRC_DIR, 'pages', p.src);
  if (fs.existsSync(srcPath)) {
    const destPath = path.join(APP_DIR, p.dest);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    
    const content = fs.readFileSync(srcPath, 'utf-8');
    const newContent = processContent(content);
    fs.writeFileSync(destPath, newContent);
    console.log(`Moved ${p.src} -> ${p.dest}`);
  }
}

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const newContent = processContent(content);
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated component: ${fullPath}`);
      }
    }
  }
}

processDir(path.join(SRC_DIR, 'components'));
processDir(path.join(SRC_DIR, 'context'));
