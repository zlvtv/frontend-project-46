import _ from 'lodash';

const sortDiff = (arr) => _.orderBy(arr, [1, 0], ['asc', 'desc']);

export const buildDiff = (obj1, obj2) => {
  const allKeys = _.union(_.keys(obj1), _.keys(obj2));
  const result = [];

  allKeys.forEach(key => {
    const hasInObj1 = _.has(obj1, key);
    const hasInObj2 = _.has(obj2, key);
        
    if (!hasInObj1) {
      result.push(['+', key, obj2[key]]);
    } else if (!hasInObj2) {
      result.push(['-', key, obj1[key]]);
    } else if (obj1[key] === obj2[key]) {
      result.push(['=', key, obj1[key]]);
    } else {
      result.push(['-', key, obj1[key]], ['+', key, obj2[key]]);
    }
  });

  return sortDiff(result);
};

export default buildDiff;