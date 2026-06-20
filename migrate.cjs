const fs = require('fs');
const path = require('path');

function convertToNext(code, isPage) {
  let newCode = `"use client";\n\n` + code;
  
  // Replace import { Link, useLocation } from 'react-router-dom';
  newCode = newCode.replace(/import\s*\{([^}]*)\}\s*from\s*['"]react-router-dom['"];/g, (match, imports) => {
    let nextImports = [];
    if (imports.includes('Link')) nextImports.push(`import Link from 'next/link';`);
    if (imports.includes('useLocation')) nextImports.push(`import { usePathname } from 'next/navigation';`);
    if (imports.includes('useParams')) nextImports.push(`import { useParams } from 'next/navigation';`);
    return nextImports.join('\n');
  });
  
  // Replace useLocation() with usePathname()
  newCode = newCode.replace(/useLocation\(\)/g, "usePathname()");
  newCode = newCode.replace(/const location = /g, "const pathname = ");
  newCode = newCode.replace(/location\.pathname/g, "pathname");

  // Replace <Link to="..."> with <Link href="...">
  newCode = newCode.replace(/<Link([^>]+)to=/g, "<Link$1href=");
  
  // Strip out SEOHead
  newCode = newCode.replace(/import\s+SEOHead\s+from\s+['"][^'"]+['"];?/g, '');
  // Remove <SEOHead ... /> including multi-line
  newCode = newCode.replace(/<SEOHead[^>]*(\/>|<\/SEOHead>)/g, '');

  if (isPage) {
     // Replace default export name to avoid conflicts if needed, or just append Client
     // e.g. export default function About() -> export default function AboutClient()
     newCode = newCode.replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)/, 'export default function $1Client');
  }

  return newCode;
}

function processDir(srcDir, destDir, isPage) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, isPage ? file.replace('.tsx', 'Client.tsx') : file);
      
      const code = fs.readFileSync(srcPath, 'utf8');
      const nextCode = convertToNext(code, isPage);
      fs.writeFileSync(destPath, nextCode, 'utf8');
      console.log(`Converted ${srcPath} -> ${destPath}`);
    }
  }
}

// Convert Pages -> Client Components
processDir(
  path.join(__dirname, 'scratch/react_ui_archive/src/pages'),
  path.join(__dirname, 'src/components'),
  true
);

// Convert Header & Footer
const headerCode = fs.readFileSync(path.join(__dirname, 'scratch/react_ui_archive/src/components/Header.tsx'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'src/components/Header.tsx'), convertToNext(headerCode, false), 'utf8');

const footerCode = fs.readFileSync(path.join(__dirname, 'scratch/react_ui_archive/src/components/Footer.tsx'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'src/components/Footer.tsx'), convertToNext(footerCode, false), 'utf8');

// Also update app/page wrappers if needed, but we will do that manually or with a simple map.
console.log('Conversion complete.');
