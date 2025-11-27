import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';
import parse from '../src/parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe('parse', () => {
  test('should parse valid JSON file', () => {
    const validJsonPath = getFixturePath('valid.json');
    const result = parse(validJsonPath);
    expect(result).toEqual({ key: 'value' });
  });

  test('should throw error for non-existent file', () => {
    const nonExistentPath = getFixturePath('nonexistent.json');
    expect(() => parse(nonExistentPath)).toThrow();
  });

  test('should throw SyntaxError for invalid JSON', () => {
    const invalidJsonPath = getFixturePath('invalid.json');
    expect(() => parse(invalidJsonPath)).toThrow();
  });

  test('should handle relative paths', () => {
    const relativePath = './__fixtures__/valid.json';
    const result = parse(relativePath);
    expect(result).toEqual({ key: 'value' });
  });
});

describe('genDiff', () => {
  test('test genDiff function', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    expect(genDiff(file1, file2)).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  });
});