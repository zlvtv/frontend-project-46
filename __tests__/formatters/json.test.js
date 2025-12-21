import genDiff from '../../src/index.js';
import { getFixturePath } from './index.test.js';
import { json } from '../../src/formatters/json.js';
import { EXPECTED_DIFF_JSON } from '../../__fixtures__/genDiff/expectedDiff.js';

describe('json format', () => {
  describe('same file extensions', () => {
    test('JSON + JSON', () => {
      const file1 = getFixturePath('file1.json', 'genDiff');
      const file2 = getFixturePath('file2.json', 'genDiff');
      expect(genDiff(file1, file2, 'json')).toEqual(EXPECTED_DIFF_JSON);
    });

    test('YAML + YAML', () => {
      const file1 = getFixturePath('file1.yml', 'genDiff');
      const file2 = getFixturePath('file2.yaml', 'genDiff');
      expect(genDiff(file1, file2, 'json')).toEqual(EXPECTED_DIFF_JSON);
    });
  });

  describe('mixed formats', () => {
    test('JSON + YAML', () => {
      const file1 = getFixturePath('file1.json', 'genDiff');
      const file2 = getFixturePath('file2.yaml', 'genDiff');
      expect(genDiff(file1, file2, 'json')).toEqual(EXPECTED_DIFF_JSON);
    });

    test('YAML + JSON', () => {
      const file1 = getFixturePath('file1.yml', 'genDiff');
      const file2 = getFixturePath('file2.json', 'genDiff');
      expect(genDiff(file1, file2, 'json')).toEqual(EXPECTED_DIFF_JSON);
    });
  });
});