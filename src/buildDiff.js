import _ from 'lodash';

const sortDiff = (arr) => _.orderBy(arr, [1, 0], ['asc', 'desc']);

export const iter = (obj1, obj2) => {
  const result = [];
  const allKeys = _.union(_.keys(obj1), _.keys(obj2));
  allKeys.forEach(key => {
    const hasInObj1 = _.has(obj1, key);
    const hasInObj2 = _.has(obj2, key);
    if (hasInObj1 && hasInObj2) {
      if (typeof(obj1[key]) === 'object' &&  typeof(obj2[key]) === 'object') {
        const innerDiff = iter((typeof(obj1[key]) === 'object' ? obj1[key] : {}), (typeof(obj2[key]) === 'object' ? obj2[key] : {}));
        result.push([' ', key, innerDiff]);
      }
      else ((obj1[key] === obj2[key]) && (typeof(obj1[key]) === typeof(obj2[key]))) ? result.push([' ', key, obj1[key]]) : result.push(['-', key, obj1[key]], ['+', key, obj2[key]]);
    }
    else if (!hasInObj1) {
      result.push(['+', key, obj2[key]]);
    }
    else if (!hasInObj2) {
      result.push(['-', key, obj1[key]]);
    }
  });
  return sortDiff(result);
};

export const buildDiff = (obj1, obj2) => iter(obj1, obj2);

export default buildDiff;