import getStylish from './stylish.js';

const chooseFormat = (difference, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return getStylish(difference);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default chooseFormat;
