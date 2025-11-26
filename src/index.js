// точка входа библиотеки
import parse from './parsers.js'

export const gendiff = (filepath1, filepath2) => {
    const file1 = parse(filepath1)
    const file2 = parse(filepath2)
    return {
        file1: file1,
        file2: file2
    };
};

export default gendiff