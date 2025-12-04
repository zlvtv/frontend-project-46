import genDiff from '../../src/index.js';
import { getFixturePath } from './index.test.js';
import { plain } from '../../src/formatters/plain.js';
import { EXPECTED_DIFF_PLAIN } from '../../__fixtures__/genDiff/expectedDiff.js';

describe('plain format', () => {
  describe('same file extensions', () => {
    test('JSON + JSON', () => {
      const file1 = getFixturePath('file1.json', 'genDiff');
      const file2 = getFixturePath('file2.json', 'genDiff');
      expect(genDiff(file1, file2, 'plain')).toEqual(EXPECTED_DIFF_PLAIN);
    });

    test('YAML + YAML (plain format)', () => {
      const file1 = getFixturePath('file1.yml', 'genDiff');
      const file2 = getFixturePath('file2.yaml', 'genDiff');
      expect(genDiff(file1, file2, 'plain')).toEqual(EXPECTED_DIFF_PLAIN);
    });
  });

  describe('mixed formats', () => {
    test('JSON + YAML (plain format)', () => {
      const file1 = getFixturePath('file1.json', 'genDiff');
      const file2 = getFixturePath('file2.yaml', 'genDiff');
      expect(genDiff(file1, file2, 'plain')).toEqual(EXPECTED_DIFF_PLAIN);
    });
    test('YAML + JSON (plain format)', () => {
      const file1 = getFixturePath('file1.yml', 'genDiff');
      const file2 = getFixturePath('file2.json', 'genDiff');
      expect(genDiff(file1, file2, 'plain')).toEqual(EXPECTED_DIFF_PLAIN);
    });
  });
  test('plain handles empty diff', () => {
    expect(plain([])).toBe('');
  });
  test('plain handles nested objects in values', () => {
    const diff = [['+', 'key', { nested: 'value' }]];
    expect(plain(diff)).toBe('Property \'key\' was added with value: [complex value]');
  });
  test('plain handles invalid sign', () => {
    expect(() => plain(['*', 'key', 'value'])).toThrow('Invalid sign: *');
  });
  test('plain handles invalid status in makeLine', () => {
    expect(() => plain(['*', 'key', 'value'])).toThrow('Invalid sign: *');
  });
});