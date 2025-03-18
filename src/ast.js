import { isObject } from './utils.js';

const buildDiff = (obj1, obj2) => {
  const uniqKeys = [
    ...new Set([...Object.keys(obj1), ...Object.keys(obj2)]),
  ].toSorted();

  return uniqKeys.flatMap((key) => {
    const hasKey1 = Object.hasOwn(obj1, key);
    const hasKey2 = Object.hasOwn(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!hasKey1) return [{ status: 'added', key, value: value2 }];
    if (!hasKey2) return [{ status: 'deleted', key, value: value1 }];

    if (isObject(value1) && isObject(value2)) {
      return [{ status: 'nested', key, children: buildDiff(value1, value2) }];
    }

    if (value1 !== value2) {
      return [{ status: 'updated', key, from: value1, to: value2 }];
    }

    return [{ status: 'unchanged', key, value: value1 }];
  });
};
export default buildDiff;
