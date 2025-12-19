import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export const getFormatter = (formatName) => {
  const formatters = {
    stylish,
    plain,
    json,
  };
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}. Available: ${Object.keys(formatters).join(', ')}`);
  }
    
  return formatters[formatName];
}; 

export default getFormatter;