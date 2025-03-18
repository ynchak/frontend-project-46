import path from 'node:path';
import fs from 'node:fs';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

export const getData = (filepath) => {
  const fullPath = getFullPath(filepath);
  const data = fs.readFileSync(fullPath, 'utf8');
  return data;
};
export const isObject = (value) =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const getExt = (filepath) => path.extname(filepath);
