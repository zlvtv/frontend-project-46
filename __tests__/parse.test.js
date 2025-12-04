import { getFixturePath } from './formatters/index.test.js';
import { parse } from '../src/parse.js'; 
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