import _ from 'lodash';

const getTypeOfValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getPlain = (diff) => {
  const iter = (node, depth) => node.flatMap((elem) => {
    const {
      key, value, type, beforeValue, children,
    } = elem;

    // const outputValue = _.isObject(value) ? '[complex value]' : value;
    // const outputBeforeValue = _.isObject(beforeValue) ? '[complex value]' : beforeValue;
    const path = `${[...depth, key].join('.')}`;

    switch (type) {
      case 'added':
        return `Property '${path}' was added with value: ${getTypeOfValue(value)}`;
      case 'deleted':
        return `Property '${path}' was removed`;
      case 'not changed':
        return [];
      case 'changed':
        return `Property '${path}' was updated. From ${getTypeOfValue(beforeValue)} to ${getTypeOfValue(value)}`;
      case 'parents':
        return iter(children, [path]);
      default:
        throw new Error(`Type error: ${type}`);
    }
  });

  return iter(diff, []).join('\n');
};

export default getPlain;
