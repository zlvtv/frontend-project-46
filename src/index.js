import buildDiff from './buildDiff.js';
import format from './format.js';
import parse from './parse.js';

const genDiff = (filepath1, filepath2) => {
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);
    const diff = buildDiff(data1, data2);
    return format(diff);
};

export default genDiff;