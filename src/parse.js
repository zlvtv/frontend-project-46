import fs from 'fs';
import path from 'path';
import process from 'process';

export const parse = (filepath) => {
  try {
    const absolutePath = path.resolve(process.cwd(), filepath);
        
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`File not found: ${filepath}`);
    }
        
    const content = fs.readFileSync(absolutePath, 'utf8');
    return JSON.parse(content);
        
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in ${filepath}: ${error.message}`);
    }
    throw error;
  }
};

export default parse;