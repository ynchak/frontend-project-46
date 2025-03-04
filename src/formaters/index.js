const statuses = {
  added: '  +',
  unchanged: '   ',
  deleted: '  -',
};
const format = (diff) => {
  const result = diff.map((line) => {
    const { status, key, value } = line;
    if (!Object.hasOwn(statuses, status)) {
      return new Error(`unknown status: ${status}`);
    }
    return `${statuses[status]} ${key}: ${value}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default format;
