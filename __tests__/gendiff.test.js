import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const cases = [
  ['stylish', 'json'],
  ['stylish', 'yml'],
  ['stylish', 'yaml'],
  ['plain', 'json'],
  ['plain', 'yml'],
  ['plain', 'yaml'],
  ['json', 'json'],
  ['json', 'yml'],
  ['json', 'yaml'],
];

describe('gendiff: file comparison', () => {
  test.each(cases)('Format: %s, file extension: %s', (outputFormat, ext) => {
    const before = getFixturePath(`file1.${ext}`);
    const after = getFixturePath(`file2.${ext}`);
    const expected = fs.readFileSync(
      getFixturePath(`result.${outputFormat}.txt`),
      'utf8'
    );

    expect(gendiff(before, after, outputFormat)).toBe(expected);
  });
});
