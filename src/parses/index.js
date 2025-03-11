import parseJson from './json.js';
import parseYml from './yml.js';

const parsers = {
  '.json': parseJson,
  '.yml': parseYml,
  '.yaml': parseYml,
};

export default (data, type) => {
  if (!Object.hasOwn(parsers, type)) {
    return new Error(`unknow format type: ${type}`);
  }
  return parsers[type](data);
};
