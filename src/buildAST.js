import _ from 'lodash';

const buildAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const diff = _.sortBy(keys)
    .map((key) => {
      if (!_.has(data2, key)) {
        return { key, value1: data1[key], type: 'deleted' };
      }
      if (!_.has(data1, key)) {
        return { key, value1: data2[key], type: 'added' };
      }
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return { key, type: 'nested', children: buildAST(data1[key], data2[key]) };
      }
      if (!_.isEqual(data1[key], data2[key])) {
        return {
          key, value1: data2[key], type: 'changed', value2: data1[key],
        };
      }
      return { key, value1: data1[key], type: 'unchanged' };
    });

  return diff;
};

export default buildAST;
