/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import _ from 'lodash';

const difference = (data1, data2) => {
  const diff = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))
    .map((key) => {
      if (!_.has(data2, key)) {
        return { key, value: data1[key], type: 'deleted' };
      }
      if (!_.has(data1, key)) {
        return { key, value: data2[key], type: 'added' };
      }
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return { key, type: 'parents', children: difference(data1[key], data2[key]) };
      }
      if (!_.isEqual(data1[key], data2[key])) {
        return {
          key, value: data2[key], type: 'changed', beforeValue: data1[key],
        };
      }
      return { key, value: data1[key], type: 'not changed' };
    });

  return diff;
};

export default difference;
