import stylish from './stylish.js';

const output = {
  stylish,
  // plain,
  // json,
};

const format = (diff, formatType) => {
  if (!Object.hasOwn(output, formatType)) {
    throw new Error(`Unknown output format: ${formatType}`);
  }
  return output[formatType](diff);
};

export default format;
