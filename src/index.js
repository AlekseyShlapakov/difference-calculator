/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import _ from 'lodash';
import parseFile from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const data1 = parseFile(filePath1);

  const data2 = parseFile(filePath2);

  const sharedData = _.union(Object.keys(data1), Object.keys(data2))
    .sort()
    .map((key) => {
      if (!_.has(data1, key)) {
        return `+ ${key}: ${data2[key]}`;
      }
      if (!_.has(data2, key)) {
        return `- ${key}: ${data1[key]}`;
      }
      if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
        return `  ${key}: ${data1[key]}`;
      }
      if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
        return `- ${key}: ${data1[key]}
  + ${key}: ${data2[key]}`;
      }
    })
    .join('\n  ');

  const newData = `
{
  ${sharedData}
}`.trim();

  return newData;
};

// genDiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.yml');
// console.log(('genDiff'), genDiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.yml'));

export default genDiff;
