#!/usr/bin/env node
import { Command } from 'commander';
import process from 'process';
import genDiff from '../src/index.js'; 

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format (stylish, plain, json)', 'stylish')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2, options) => {
    try {
      const result = genDiff(filepath1, filepath2, options.format);
      console.log(result);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();