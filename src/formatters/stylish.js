const stringify = (value, depth, spacesCount = 2) => {
  const indent = ' '.repeat(spacesCount * depth);
  const indentOfEnd = ' '.repeat(spacesCount * (depth - 1));

  if (typeof value !== 'object') {
    return value;
  }

  const data = Object.keys(value).map((key) => {
    if (typeof value[key] === 'object') {
      return `${indent}  ${key}: ${stringify(value[key], depth + 1)}`;
    }
    return `${indent}  ${key}: ${value[key]}`;
  });
  return `\n${data.join('\n')}\n${indentOfEnd}`;
};

const data = { hello: 'world', is: true, nested: { count: 5, bububu: { lala: 55} } };
stringify(data, 2);

console.log(stringify(data, 2));

const getStylish = (diff) => {
  const iter = (node, depth, spacesCount = 2) => node.map((elem) => {
    const {
      key, value, type, beforeValue, children,
    } = elem;
    const indent = ' '.repeat(spacesCount * depth);

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
      case 'deleted':
        return `${indent}- ${key}: ${stringify(value, depth + 1)}`;
      case 'not changed':
        return `${indent}  ${key}: ${value}`;
      case 'changed':
        return `${indent}- ${key}: ${stringify(beforeValue, depth + 1)}\n
          ${indent}+ ${key}: ${stringify(value, depth + 1)}`;
      case 'parents':
        return `${indent}  ${key}: {\n${iter(children, depth + 1)}\n${indent}  }`.split(',');
      default:
        throw new Error(`Type error: ${type}`);
    }
  }).flat();

  return `{\n${iter(diff, 1).join('\n')}\n}`;
};

export default getStylish;
