import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const format = (difference, type = 'stylish') => {
  switch (type) {
    case 'stylish':
      return formatStylish(difference);
    case 'plain':
      return formatPlain(difference);
    case 'json':
      return formatJson(difference);
    default:
      throw new Error(`Unknown format: ${type}`);
  }
};

export default format;
