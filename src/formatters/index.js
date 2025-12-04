import stylish from './stylish.js';
import plain from './plain.js';

export const getFormatter = (formatName) => {
  const formatters = {
    stylish,
    plain,
  };
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}. Available: ${Object.keys(formatters).join(', ')}`);
  }
    
  return formatters[formatName];
}; 

export default getFormatter;