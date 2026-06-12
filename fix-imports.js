import fs from 'fs';
import path from 'path';

function fixImports(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixImports(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      content = content.replace(/['"]\.\.\/\.\.\/(components|context|data|firebase|assets)(.*)['"]/g, "'@/src/$1$2'");
      content = content.replace(/['"]\.\.\/(components|context|data|firebase|assets)(.*)['"]/g, "'@/src/$1$2'");
      content = content.replace(/['"]\.\/(components|context|data|firebase|assets)(.*)['"]/g, "'@/src/$1$2'");

      fs.writeFileSync(fullPath, content);
    }
  }
}

fixImports('./app');
