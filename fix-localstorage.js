import fs from 'fs';
import path from 'path';

function fixLocalStorage(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixLocalStorage(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      let newContent = content;
      newContent = newContent.replace(/localStorage\.getItem/g, "(typeof window !== 'undefined' ? localStorage.getItem.bind(localStorage) : () => null)");
      newContent = newContent.replace(/localStorage\.setItem/g, "(typeof window !== 'undefined' ? localStorage.setItem.bind(localStorage) : () => {})");
      newContent = newContent.replace(/localStorage\.removeItem/g, "(typeof window !== 'undefined' ? localStorage.removeItem.bind(localStorage) : () => {})");

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
      }
    }
  }
}

fixLocalStorage('./app');
fixLocalStorage('./src/components');
fixLocalStorage('./src/context');
