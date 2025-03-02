import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

export const getData = (filepath) => {
  const fullPath = getFullPath(filepath);
  const data = fs.readFileSync(fullPath, 'utf8');
  return data;
};

export const getExt = (filepath) => path.extname(filepath);
