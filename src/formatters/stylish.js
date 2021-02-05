import _ from 'lodash';

const makeIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
  const indent = makeIndent(depth);
  const indentOfEnd = makeIndent(depth - 1);

  if (!_.isObject(value) && value !== null) {
    return value;
  }

  const data = Object.keys(value).map((key) => {
    if (_.isObject(value[key]) && value[key] !== null) {
      return `${indent}  ${key}: ${stringify(value[key], depth + 1)}`;
    }
    return `${indent}  ${key}: ${value[key]}`;
  });
  return `{\n${data.join('\n')}\n${indentOfEnd}  }`;
};

// const data = { hello: 'world', is: true, nested: { count: 5, bububu: { lala: 55} } };
// stringify(data, 2);

// console.log(stringify(data, 2));

const getStylish = (diff) => {
  const iter = (node, depth) => node.map((elem) => {
    const {
      name, value, type, beforeValue, children,
    } = elem;
    const indent = makeIndent(depth);

    switch (type) {
      case 'added':
        return `${indent}+ ${name}: ${stringify(value, depth + 1)}`;
      case 'deleted':
        return `${indent}- ${name}: ${stringify(value, depth + 1)}`;
      case 'not changed':
        return `${indent}  ${name}: ${value}`;
      case 'changed':
        return `${indent}- ${name}: ${stringify(beforeValue, depth + 1)}\n
          ${indent}+ ${name}: ${stringify(value, depth + 1)}`;
      case 'parents':
        return `${indent}  ${name}: {\n${iter(children, depth + 1)}\n${indent}  }`.split(',');
      default:
        throw new Error(`Type error: ${type}`);
    }
  }).flat();

  return `{\n${iter(diff, 1).join('\n')}\n}`;
};

export default getStylish;
