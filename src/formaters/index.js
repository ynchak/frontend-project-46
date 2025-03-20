import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const output = {
  stylish,
  plain,
  json,
};

const format = (diff, formatType) => {
  if (!Object.hasOwn(output, formatType)) {
    throw new Error(`Unknown output format: ${formatType}`);
  }
  return output[formatType](diff);
};

export default format;
