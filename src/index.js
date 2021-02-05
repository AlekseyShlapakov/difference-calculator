/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import _ from 'lodash';
import parseFile from './parsers.js';
import chooseFormat from './formatters/index.js';

const difference = (data1, data2) => {
  const diff = _.union(Object.keys(data1), Object.keys(data2))
    .sort()
    .map((key) => {
      if (!_.has(data1, key)) {
        return { name: key, value: data2[key], type: 'added' };
      }
      if (!_.has(data2, key)) {
        return { name: key, value: data1[key], type: 'deleted' };
      }
      if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
        return { name: key, value: data1[key], type: 'not changed' };
      }
      if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
        return {
          name: key, value: data2[key], type: 'changed', beforeValue: data1[key],
        };
      }
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return { name: key, type: 'parents', children: difference(data1[key], data2[key]) };
      }
    });

  return diff;
};

const genDiff = (filePath1, filePath2, format) => {
  const data1 = parseFile(filePath1);
  console.log('data1: ', data1);
  const data2 = parseFile(filePath2);
  console.log('data2: ', data2);
  const diff = difference(data1, data2);
  console.log('diff: ', diff);
  return chooseFormat(diff, format);
};

genDiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json');
// console.log(genDiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json'));

export default genDiff;
