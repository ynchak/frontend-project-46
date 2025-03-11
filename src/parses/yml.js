import yaml from 'js-yaml';

const parseYml = (data) => yaml.load(data);

export default parseYml;
