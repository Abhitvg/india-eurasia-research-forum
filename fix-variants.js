import fs from 'fs';
import path from 'path';

function fixVariants(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixVariants(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      let newContent = content.replace(/const itemVariants = \{/g, "const itemVariants: any = {");
      newContent = newContent.replace(/const containerVariants = \{/g, "const containerVariants: any = {");
      newContent = newContent.replace(/const fadeInUp = \{/g, "const fadeInUp: any = {");
      newContent = newContent.replace(/const staggerContainer = \{/g, "const staggerContainer: any = {");
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
      }
    }
  }
}

fixVariants('./app');
fixVariants('./src/components');
