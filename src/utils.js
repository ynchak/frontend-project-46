import path from 'node:path';
import fs from 'node:fs';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

export const getData = (filepath) => {
  const fullPath = getFullPath(filepath);
  const data = fs.readFileSync(fullPath, 'utf8');
  return data;
};

export const getExt = (filepath) => path.extname(filepath);
