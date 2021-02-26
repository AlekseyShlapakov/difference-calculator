import _ from 'lodash';

const makeIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
  const indent = makeIndent(depth);
  const indentOfEnd = makeIndent(depth - 1);

  if (!_.isObject(value)) {
    return value;
  }

  const data = Object.keys(value).map((key) => {
    if (_.isObject(value[key])) {
      return `${indent}  ${key}: ${stringify(value[key], depth + 1)}`;
    }
    return `${indent}  ${key}: ${value[key]}`;
  });
  return `{\n${data.join('\n')}\n${indentOfEnd}  }`;
};

const formatStylish = (diff) => {
  const iter = (node, depth) => node.flatMap((elem) => {
    const {
      key, value1, type, value2, children,
    } = elem;
    const indent = makeIndent(depth);

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(value1, depth + 1)}`;
      case 'deleted':
        return `${indent}- ${key}: ${stringify(value1, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${key}: ${value1}`;
      case 'changed':
        return `${indent}- ${key}: ${stringify(value2, depth + 1)}\n${indent}+ ${key}: ${stringify(value1, depth + 1)}`;
      case 'nested':
        return `${indent}  ${key}: {\n${iter(children, depth + 1)}\n${indent}  }`.split(',');
      default:
        throw new Error(`Type error: ${type}`);
    }
  });

  return `{\n${iter(diff, 1).join('\n')}\n}`;
};

export default formatStylish;
