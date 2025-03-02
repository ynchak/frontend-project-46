import parseJson from './json.js';

const parsers = {
  '.json': parseJson,
};

export default (data, type) => {
  if (!Object.hasOwn(parsers, type)) {
    return new Error(`unknow format type: ${type}`);
  }
  return parsers[type](data);
};
