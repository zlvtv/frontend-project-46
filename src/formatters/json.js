import _ from 'lodash';

const formatDiff = (diff) => {
  const result = {};
  const keys = [...new Set(diff.map(([_, key]) => key))];

  keys.forEach((key) => {
    const items = diff.filter(([_, k]) => k === key);

    const added = items.find(([sign]) => sign === '+');
    const removed = items.find(([sign]) => sign === '-');
    const unchanged = items.find(([sign]) => sign === ' ');

    if (added && removed) {
      result[key] = {
        type: 'updated',
        oldValue: removed[2],
        newValue: added[2]
      };
    } else if (added) {
      const value = added[2];
      result[key] = _.isArray(value) && isDiffArray(value)
        ? {
            type: 'nested',
            children: formatDiff(value)
          }
        : {
            type: 'added',
            value: value
          };
    } else if (removed) {
      const value = removed[2];
      result[key] = _.isArray(value) && isDiffArray(value)
        ? {
            type: 'nested',
            children: formatDiff(value)
          }
        : {
            type: 'removed',
            value: value
          };
    } else if (unchanged) {
      const value = unchanged[2];
      result[key] = _.isArray(value) && isDiffArray(value)
        ? {
            type: 'nested',
            children: formatDiff(value)
          }
        : {
            type: 'unchanged',
            value: value
          };
    }
  });

  return result;
};

const isDiffArray = (arr) => {
  return Array.isArray(arr) && arr.every(item => Array.isArray(item) && ['+', '-', ' '].includes(item[0]));
};

export const json = (data) => {
  return JSON.stringify(formatDiff(data), null, 2);
};

export default json;
