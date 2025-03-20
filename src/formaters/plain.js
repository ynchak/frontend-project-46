const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const formatPlain = (diff) => {
  const iter = (nodes, path = '') =>
    nodes
      .flatMap(({ status, key, from, to, value, children }) => {
        const currentPath = path ? `${path}.${key}` : key;
        switch (status) {
          case 'added':
            return `Property '${currentPath}' was added with value: ${stringify(
              value
            )}`;
          case 'removed':
            return `Property '${currentPath}' was removed`;
          case 'updated':
            return `Property '${currentPath}' was updated. From ${stringify(
              from
            )} to ${stringify(to)}`;
          case 'nested':
            return iter(children, currentPath);
          case 'unchanged':
            return [];
          default:
            throw new Error(`Unknown status: ${status}`);
        }
      })
      .join('\n');

  return iter(diff);
};

export default formatPlain;
