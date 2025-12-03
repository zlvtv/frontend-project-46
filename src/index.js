import buildDiff from './buildDiff.js';
import parse from './parse.js';
import getFormatter from '../formatters/index.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const dataDiff = buildDiff(data1, data2);
  const format = getFormatter(formatName);
  return format(dataDiff);
};

export default genDiff;