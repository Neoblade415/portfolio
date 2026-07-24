import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const publicDir = path.join(process.cwd(), 'public');
const files = fs.readdirSync(publicDir).filter(f => !fs.statSync(path.join(publicDir, f)).isDirectory());

const deadAssets = [];

for (const file of files) {
  if (file === 'robots.txt' || file === 'favicon.ico') continue;
  
  try {
    // Search in src folder and index.html
    const result = execSync(`grep -r "${file}" src index.html 2>/dev/null || true`).toString();
    if (result.trim() === '') {
      deadAssets.push(file);
    }
  } catch (e) {
    // Error means no match found (or grep failed)
    deadAssets.push(file);
  }
}

console.log('Dead Assets:');
console.log(deadAssets.join('\n'));
