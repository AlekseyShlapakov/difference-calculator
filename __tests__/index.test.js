/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
// import process from 'process';
import fs from 'fs';
import genDiff from '../src/index.js';

test('difference between two files', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.resolve(__dirname, '..', '__tests__/__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  const correctOutput = readFile('result.txt');
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const filePath3 = getFixturePath('file1.yml');
  const filePath4 = getFixturePath('file2.yml');
  expect(genDiff(filePath1, filePath2)).toEqual(correctOutput);
  expect(genDiff(filePath3, filePath4)).toEqual(correctOutput);
});
