import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filePath) => {
  const configPath = path.resolve(process.cwd(), filePath);
  const format = path.extname(configPath);
  const data = fs.readFileSync(configPath, 'utf8');

  let parse;
  if (format === '.json') {
    parse = JSON.parse(data);
  } else if (format === '.yml') {
    parse = yaml.load(data);
  }
  return parse;
};

// parseFile('__tests__/__fixtures__/file1.json');
// console.log('parseFile', parseFile('__tests__/__fixtures__/file1.yml'));

export default parseFile;
