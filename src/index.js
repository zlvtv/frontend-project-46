import buildDiff from './buildDiff.js';
import parse from './parse.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  return buildDiff(data1, data2);
};

export default genDiff;