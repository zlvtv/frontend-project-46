import _ from 'lodash';

const getPrevValue = (data, key, sign) => {
  const otherSign = sign === '+' ? '-' : '+';
  const found = data.find(([s, k]) => k === key && s === otherSign);
  return found ? found[2] : undefined;
};

const makeObject = (data, depth = 1) => {
  let formattedValue = '';
  let result = {};
  for (const [sign, key, value] of data) {
    result[key] = {};
    let prevValue =  getPrevValue(data, key, sign);

    if (_.isArray(value)) {
      result[key]['type'] = 'nested';
      formattedValue = makeObject(value, depth + 1);
      result[key]['children'] = formattedValue;
    } else {
      switch (sign) {
      case '+':
        result[key]['type'] = (prevValue !== undefined) ? 'updated' : 'added';
        break;
      case '-':
        if (prevValue === undefined) {
          result[key]['type'] = 'removed';
        }
        break;
      case ' ':
        result[key]['type'] = 'unchanged';
        break;
      default:
        throw new Error(`Invalid sign: ${sign}`);
      }

      if (result[key]['type'] === 'updated') {
        result[key]['prevValue'] = prevValue;
        result[key]['newValue'] = value;
      } else {
        result[key]['value'] = value;
      }
    }
  };
  return result;
};

export const json = (data) => {
  return JSON.stringify(makeObject(data, 1), null, 2);
};

export default json;