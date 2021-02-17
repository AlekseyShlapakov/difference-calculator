/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__tests__/__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const correctOutput = (format) => readFile(`${format}.txt`);

const extensionsAndFormats = [
  ['json', 'stylish'],
  ['yml', 'stylish'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['json', 'json'],
  ['yml', 'json'],
];

test.each(extensionsAndFormats)(
  'from %s to %s', (extension, format) => {
    const filePath1 = getFixturePath(`file1.${extension}`);
    const filePath2 = getFixturePath(`file2.${extension}`);
    expect(genDiff(filePath1, filePath2, format)).toEqual(correctOutput(format));
  },
);
