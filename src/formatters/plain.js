import _ from 'lodash';

const getTypeOfValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const formatPlain = (diff) => {
  const iter = (node, depth) => node.flatMap((elem) => {
    const {
      key, value1, type, value2, children,
    } = elem;

    const path = `${[...depth, key].join('.')}`;

    switch (type) {
      case 'added':
        return `Property '${path}' was added with value: ${getTypeOfValue(value1)}`;
      case 'deleted':
        return `Property '${path}' was removed`;
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${path}' was updated. From ${getTypeOfValue(value2)} to ${getTypeOfValue(value1)}`;
      case 'nested':
        return iter(children, [path]);
      default:
        throw new Error(`Type error: ${type}`);
    }
  });

  return iter(diff, []).filter((val) => !_.isNull(val)).join('\n');
};

export default formatPlain;
