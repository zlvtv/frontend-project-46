import _ from 'lodash';

const makeLine = (status, prop = '', value, prevValue = '') => {
    switch (status) {
        case 'added':
            return `Property '${prop}' was added with value: `.concat(value);
        case 'removed':
            return `Property '${prop}' was removed`;
        case 'updated':
            return `Property '${prop}' was updated. From '${prevValue}' to '${value}'`;
        default:
            throw new Error(`Invalid status: ${status}`);
    };
};

const getPrevValue = (data, key, sign) => {
    const otherSign = sign === '+' ? '-' : '+';
    const pairObject = data.some(([s, k]) => k === key && s === otherSign);
    return pairObject;
};

const formatValue = (data) => {
    if (_.isBoolean(data)) {
        return val; 
    }
    if (_.isNumber(data)) {
        return val; 
    }
    if (data === null) {
        return 'null'; 
    }
    if (_.isObject(data) && data !== null) {
        return '[complex value]'; 
    }
    return `'${val}'`;
  };
};

export const plain = (data, prop = '') => {
  const lines = data.reduce((acc, [sign, key, value]) => {
    const path = prop === '' ? `${key}` : `${prop}.${key}`;
    let line = '';
    let status = '';
    const prevValue = getPrevValue(data, key, sign);
    switch (sign) {
        case '+':
            status = prevValue ? 'updated' : 'added';
            break;
        case '-':
            status = prevValue ? '' : 'removed';
            break;
        case ' ':
            status = '';
            break;
        default:
            throw new Error(`Invalid sign: ${sign}`);
    };
    if (_.isArray(value)) {
        line = plain(value, path);
    }
    else if (status === 'updated') {
        line = makeLine(status, path, formatValue(value), formatValue(prevValue));
    }
    else if (status !== '') {
        line = makeLine(status, path, formatValue(value));
    }
    if (!data.includes(line) && line !== '') {
       acc.push(line);
    }
    console.log(acc)
    return acc
  }, []); 
  return `${lines.join('\n')}`;
};

export default plain;