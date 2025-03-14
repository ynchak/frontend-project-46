const buildDiff = (obj1, obj2) => {
  const uniqKeys = [
    ...new Set([...Object.keys(obj1), ...Object.keys(obj2)]),
  ].toSorted();

  return uniqKeys.flatMap((key) => {
    const hasKey1 = Object.hasOwn(obj1, key);
    const hasKey2 = Object.hasOwn(obj2, key);

    if (!hasKey1) return { status: 'added', key, value: obj2[key] };
    if (!hasKey2) return { status: 'deleted', key, value: obj1[key] };
    if (obj1[key] === obj2[key])
      return { status: 'unchanged', key, value: obj1[key] };

    return [
      { status: 'deleted', key, value: obj1[key] },
      { status: 'added', key, value: obj2[key] },
    ];
  });
};
export default buildDiff;
