/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import parseFile from './parsers.js';
import chooseFormat from './formatters/index.js';
import difference from './difference.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);
  const diff = difference(data1, data2);
  return chooseFormat(diff, format);
};

export default genDiff;
