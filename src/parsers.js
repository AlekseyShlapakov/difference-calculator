import fs from 'fs';
// import ini from 'ini';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = () => {
  const configPath = 'path/to/eslint';
  const format = path.extname(configPath);
  const data = fs.readSync(configPath);

  let parse;
  if (format === '.json') {
    parse = JSON.parse(data);
  } else if (format === '.yml') {
    parse = yaml.safeLoad(data);
  }

  // else if (format === '.ini') {
  // parse = ini.parse;
  // }
  return parse;
};

export default parseFile;
