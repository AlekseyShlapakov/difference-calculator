/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';
import difference from './buildAST.js';

const configPath = (filePath) => path.resolve(process.cwd(), filePath);

const getDataType = (filePath) => {
  const data = path.extname(configPath(filePath));
  const dataType = data.slice(1, data.length);
  return dataType;
};

const readFile = (filePath) => fs.readFileSync(configPath(filePath), 'utf8');

const genDiff = (filePath1, filePath2, type = 'stylish') => {
  const dataType1 = getDataType(filePath1);
  const dataType2 = getDataType(filePath2);

  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);

  const parseData1 = parse(data1, dataType1);
  const parseData2 = parse(data2, dataType2);
  const diff = difference(parseData1, parseData2);
  return format(diff, type);
};

export default genDiff;
