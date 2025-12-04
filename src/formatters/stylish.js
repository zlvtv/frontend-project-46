import _ from 'lodash';

const formatObject = (data, depth = 1) => {
  const indent = ' '.repeat(4);
  const currentIndent = indent.repeat(depth);
  const closingIndent = indent.repeat(depth - 1);
  const lines = Object.entries(data).map(([key, value]) => {
    return `${currentIndent}${key}: ${formatValue(value, depth)}`;
  });
  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

const formatValue = (data, depth = 1) => {
  if(_.isObject(data)) {
    return formatObject(data, depth + 1);
  }
  return data;
};

export const stylish = (data, depth = 1) => {
  const indent = ' '.repeat(4);
  const currentIndent = indent.repeat(depth).slice(0, -2);
  const closingIndent = indent.repeat(depth - 1);
  const lines = data.map(([sign, key, value]) => {
    const formattedValue = _.isArray(value) 
      ? stylish(value, depth + 1)
      : formatValue(value, depth);
    return `${currentIndent}${sign} ${key}: ${formattedValue}`;
  }); 
  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

export default stylish;