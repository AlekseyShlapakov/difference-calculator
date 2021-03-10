import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const correctOutput = (format) => readFile(`${format}.txt`);

const extensions = ['json', 'yml'];
const formats = ['stylish', 'plain', 'json'];

describe.each(formats)('Generate differences tests', (format) => {
  test.each(extensions)(`For %s file type with ${format} format`, (extension) => {
    const filePath1 = getFixturePath(`file1.${extension}`);
    const filePath2 = getFixturePath(`file2.${extension}`);
    expect(genDiff(filePath1, filePath2, format)).toEqual(correctOutput(format));
  });
});
