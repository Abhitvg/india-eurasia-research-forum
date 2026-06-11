import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const versionFilePath = path.join(__dirname, '../public/version.json');

const newVersionData = {
  version: '1.0.0', // You can increment this or let buildTime act as the unique build ID
  buildTime: Date.now(),
};

fs.writeFileSync(versionFilePath, JSON.stringify(newVersionData, null, 2), 'utf8');
console.log(`Generated public/version.json with buildTime: ${newVersionData.buildTime}`);
