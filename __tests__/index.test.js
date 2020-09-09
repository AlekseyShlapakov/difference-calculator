/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

test('difference between two files', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.resolve(__dirname, '..', '__tests__/__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

  const filePath1 = '__tests__/__fixtures__/file1.json';
  const filePath2 = '__tests__/__fixtures__/file2.json';
  const correctOutput = readFile('result.txt');
  expect(genDiff(filePath1, filePath2)).toEqual(correctOutput);
});
