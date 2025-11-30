import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';
import stylish from '../src/format.js';
import parse from '../src/parse.js';
import expectedDiff from '../__fixtures__/genDiff/expectedDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename, subfolder = '') => {
  const basePath = join(__dirname, '..', '__fixtures__');
  return subfolder ? join(basePath, subfolder, filename) : join(basePath, filename);
};

describe('parse', () => {
  describe('valid files', () => {
    test('JSON', () => {
      const path = getFixturePath('valid.json', 'parse');
      const result = parse(path);
      expect(result).toEqual({ key: 'value' });
    });

    test('YAML', () => {
      const path = getFixturePath('valid.yaml', 'parse');
      const result = parse(path);
      expect(result).toEqual({ key: 'value' });
    });

    test('relative paths', () => {
      const path = './__fixtures__/parse/valid.json';
      const result = parse(path);
      expect(result).toEqual({ key: 'value' });
    });
  });

  describe('error handling', () => {
    test('invalid JSON', () => {
      const path = getFixturePath('invalid.json', 'parse');
      expect(() => parse(path)).toThrow();
    });

    test('invalid YAML', () => {
      const path = getFixturePath('invalid.yaml', 'parse');
      expect(() => parse(path)).toThrow();
    });

    test('unsupported format', () => {
      const path = getFixturePath('file.txt', 'parse');
      expect(() => parse(path)).toThrow();
    });

    test('non-existent file', () => {
      const path = getFixturePath('nonexistent.json', 'parse');
      expect(() => parse(path)).toThrow();
    });
  });
});

describe('genDiff', () => {
  describe('same format', () => {
    test('JSON + JSON', () => {
      const file1 = getFixturePath('file1.json', 'genDiff');
      const file2 = getFixturePath('file2.json', 'genDiff');
      expect(stylish(genDiff(file1, file2))).toEqual(expectedDiff);
    });

    test('YAML + YAML', () => {
      const file1 = getFixturePath('file1.yml', 'genDiff');
      const file2 = getFixturePath('file2.yaml', 'genDiff');
      expect(stylish(genDiff(file1, file2))).toEqual(expectedDiff);
    });
  });

  describe('mixed formats', () => {
    test('JSON + YAML', () => {
      const file1 = getFixturePath('file1.json', 'genDiff');
      const file2 = getFixturePath('file2.yaml', 'genDiff');
      expect(stylish(genDiff(file1, file2))).toEqual(expectedDiff);
    });

    test('YAML + JSON', () => {
      const file1 = getFixturePath('file1.yml', 'genDiff');
      const file2 = getFixturePath('file2.json', 'genDiff');
      expect(stylish(genDiff(file1, file2))).toEqual(expectedDiff);
    });
  });
});