import getFormatter from '../../src/formatters/index.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFixturePath = (filename, subfolder = '') => {
  const basePath = join(__dirname, '..', '..', '__fixtures__');
  return subfolder ? join(basePath, subfolder, filename) : join(basePath, filename);
};

test('getFormatter returns stylish for "stylish"', () => {
  const formatter = getFormatter('stylish');
  expect(typeof formatter).toBe('function');
});

test('getFormatter returns plain for "plain"', () => {
  const formatter = getFormatter('plain');
  expect(typeof formatter).toBe('function'); 
});

test('getFormatter throws for unknown format', () => {
  expect(() => getFormatter('unknown')).toThrow('Unknown format');
});