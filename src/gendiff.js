import buildDiff from './ast.js';
import parse from './parses/index.js';
import { getData, getExt } from './utils.js';

const loadfile = (filepath) => {
  const data = getData(filepath);
  const ext = getExt(filepath);
  return parse(data, ext);
};

const gendiff = (filepath1, filepath2) => {
  const obj1 = loadfile(filepath1);
  const obj2 = loadfile(filepath2);
  const diff = buildDiff(obj1, obj2);
  return diff;
};

export default gendiff;
