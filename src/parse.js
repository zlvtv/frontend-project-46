import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

const parsers = {
  '.json': (data) => JSON.parse(data), 
  '.yml': (data) => yaml.load(data),
  '.yaml': (data) => yaml.load(data)
};

export const parse = (filepath) => {
  try {
    const absolutePath = path.resolve(process.cwd(), filepath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`File not found: ${filepath}`);
    }

    const ext = path.extname(filepath);
    const parser = parsers[ext];

    const content = fs.readFileSync(absolutePath, 'utf8');
    return parser(content);

  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid format in ${filepath}: ${error.message}`);
    }
    throw error;
  }
};

export default parse;