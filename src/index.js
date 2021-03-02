/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildAST from './buildAST.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);

const getDataType = (filePath) => {
  const data = path.extname(getFullPath(filePath));
  const dataType = data.slice(1, data.length);
  return dataType;
};

const getData = (filePath) => fs.readFileSync(getFullPath(filePath), 'utf8');

const genDiff = (filePath1, filePath2, type = 'stylish') => {
  const parseData1 = parse(getData(filePath1), getDataType(filePath1));
  const parseData2 = parse(getData(filePath2), getDataType(filePath2));
  const diff = buildAST(parseData1, parseData2);
  return format(diff, type);
};

export default genDiff;
