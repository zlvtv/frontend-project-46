import _ from 'lodash';

const makeLine = (status, prop = '', value, prevValue = '') => {
  const formatValue = (value) => {
    if (_.isBoolean(value)) return value; 
    if (_.isNumber(value)) return value; 
    if (value === null) return null; 
    if (_.isObject(value) && value !== null) return '[complex value]'; 
    return `'${value}'`;
  };

  switch (status) {
  case 'added':
    return `Property '${prop}' was added with value: ${formatValue(value)}`;
  case 'removed':
    return `Property '${prop}' was removed`;
  case 'updated':
    return `Property '${prop}' was updated. From ${formatValue(prevValue)} to ${formatValue(value)}`;
  default:
    throw new Error(`Invalid status: ${status}`);
  };
};

const getPrevValue = (data, key, sign) => {
  const otherSign = sign === '+' ? '-' : '+';
  const found = data.find(([s, k]) => k === key && s === otherSign);
  return found ? found[2] : undefined;
};

export const plain = (data, prop = '') => {
  const lines = data.reduce((acc, [sign, key, value]) => {
    const path = prop === '' ? `${key}` : `${prop}.${key}`;
    
    if (_.isArray(value)) {
      const nestedLines = plain(value, path);
      if (nestedLines) {
        acc.push(nestedLines);
      }
      return acc;
    }

    let status = '';
    const prevValue = getPrevValue(data, key, sign);

    switch (sign) {
    case '+':
      status = (prevValue !== undefined) ? 'updated' : 'added';
      break;
    case '-':
      if (prevValue === undefined) {
        status = 'removed';
      }
      break;
    case ' ':
      break;
    default:
      throw new Error(`Invalid sign: ${sign}`);
    };

    if (status) {
      const line = makeLine(status, path, value, prevValue);
      acc.push(line);
    }

    return acc;
  }, []); 

  return `${lines.join('\n')}`;
};

export default plain;