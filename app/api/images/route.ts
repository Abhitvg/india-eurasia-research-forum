import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getImages(dir: string, base: string, result: string[] = []) {
  if (!fs.existsSync(dir)) return result;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getImages(fullPath, base, result);
    } else {
      if (/\.(jpg|jpeg|png|webp|svg|gif|avif)$/i.test(file)) {
        result.push(fullPath.replace(base, '').replace(/\\/g, '/'));
      }
    }
  }
  return result;
}

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const images = getImages(publicDir, publicDir);
    return NextResponse.json(images);
  } catch (e) {
    return NextResponse.json([]);
  }
}
