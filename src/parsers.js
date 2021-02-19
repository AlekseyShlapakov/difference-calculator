import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filePath) => {
  const configPath = path.resolve(process.cwd(), filePath);
  const format = path.extname(configPath);
  const data = fs.readFileSync(configPath, 'utf8');

  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    default:
      throw new TypeError(`Unknown format - ${format}`);
  }
};

export default parseFile;
