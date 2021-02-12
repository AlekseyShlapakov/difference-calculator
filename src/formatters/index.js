import getStylish from './stylish.js';
import getPlain from './plain.js';

const chooseFormat = (difference, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return getStylish(difference);
    case 'plain':
      return getPlain(difference);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default chooseFormat;
