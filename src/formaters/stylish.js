import { isObject } from '../utils.js';

const getIndent = (depth, spaces = 4, offset = 0) =>
  ' '.repeat(depth * spaces - offset);

const stringify = (data, depth) => {
  if (Array.isArray(data)) {
    return `[${data}]`;
  }
  if (!isObject(data)) {
    return `${data}`;
  }

  const currentIndent = getIndent(depth, 4, 2);
  const bracketIndent = getIndent(depth - 1, 4, 0);

  const result = Object.entries(data).map(
    ([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`
  );

  return `{\n${result.join('\n')}\n${bracketIndent}}`;
};

export default (diff) => {
  const iter = (node, depth) => {
    const currentIndent = getIndent(depth, 4, 2);
    const bracketIndent = getIndent(depth - 1, 4, 0);
    const newDepth = depth + 1;

    const result = node.flatMap((el) => {
      const { status, key, from, to, value, children } = el;

      switch (status) {
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(value, newDepth)}`;
        case 'deleted':
          return `${currentIndent}- ${key}: ${stringify(value, newDepth)}`;
        case 'updated':
          return [
            `${currentIndent}- ${key}: ${stringify(from, newDepth)}`,
            `${currentIndent}+ ${key}: ${stringify(to, newDepth)}`,
          ];
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(children, newDepth)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${stringify(value, newDepth)}`;
        default:
          throw new Error(`Unknown status: ${status}`);
      }
    });

    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };

  return iter(diff, 1);
};
