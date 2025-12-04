import genDiff from '../../src/index.js';
import { getFixturePath } from './index.test.js';
import { stylish } from '../../src/formatters/stylish.js';
import { EXPECTED_DIFF_STYLISH } from '../../__fixtures__/genDiff/expectedDiff.js';

describe('stylish format', () => {
  describe('same file extensions', () => {
    test('JSON + JSON', () => {
      const file1 = getFixturePath('file1.json', 'genDiff');
      const file2 = getFixturePath('file2.json', 'genDiff');
      expect(genDiff(file1, file2, 'stylish')).toEqual(EXPECTED_DIFF_STYLISH);
    });

    test('YAML + YAML', () => {
      const file1 = getFixturePath('file1.yml', 'genDiff');
      const file2 = getFixturePath('file2.yaml', 'genDiff');
      expect(genDiff(file1, file2, 'stylish')).toEqual(EXPECTED_DIFF_STYLISH);
    });
  });

  describe('mixed formats', () => {
    test('JSON + YAML', () => {
      const file1 = getFixturePath('file1.json', 'genDiff');
      const file2 = getFixturePath('file2.yaml', 'genDiff');
      expect(genDiff(file1, file2, 'stylish')).toEqual(EXPECTED_DIFF_STYLISH);
    });

    test('YAML + JSON', () => {
      const file1 = getFixturePath('file1.yml', 'genDiff');
      const file2 = getFixturePath('file2.json', 'genDiff');
      expect(genDiff(file1, file2, 'stylish')).toEqual(EXPECTED_DIFF_STYLISH);
    });
  });
  test('formatObject formats plain objects', () => {
    const diff = [[' ', 'obj', { key: 'value', nested: { inner: 'test' } }]];
    const result = stylish(diff);
  
    expect(result).toContain('key: value');
    expect(result).toContain('nested: {');
    expect(result).toContain('inner: test');
  });

  test('formatObject handles empty objects', () => {
    const diff = [[' ', 'empty', {}]];
    const result = stylish(diff);
  
    expect(result).toContain('empty: {');
  });
});