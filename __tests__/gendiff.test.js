import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

import { dirname } from 'path';

import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const table = ['json', 'yml'];
test.each(table)('flatten files', (ext) => {
  const before = getFixturePath(`file1.flat.${ext}`);
  const after = getFixturePath(`file2.flat.${ext}`);
  const result = fs.readFileSync(getFixturePath('result.flat.txt'), 'utf8');
  expect(gendiff(before, after)).toBe(result);
});
