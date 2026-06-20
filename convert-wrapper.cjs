const fs = require('fs');
const path = require('path');

function convertToNext(code) {
  let newCode = `"use client";\n\n` + code;
  newCode = newCode.replace(/import\s*\{([^}]*)\}\s*from\s*['"]react-router-dom['"];/g, (match, imports) => {
    let nextImports = [];
    if (imports.includes('Link')) nextImports.push(`import Link from 'next/link';`);
    if (imports.includes('useLocation')) nextImports.push(`import { usePathname } from 'next/navigation';`);
    return nextImports.join('\n');
  });
  newCode = newCode.replace(/useLocation\(\)/g, "usePathname()");
  return newCode;
}

const code = fs.readFileSync(path.join(__dirname, 'scratch/react_ui_archive/src/components/MainWrapper.tsx'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'src/components/MainWrapper.tsx'), convertToNext(code), 'utf8');
console.log('MainWrapper converted');
