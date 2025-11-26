#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js' // импорт из точки входа

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format <type>', 'output format (stylish, plain, json)', 'stylish')
  .action((filepath1, filepath2) => {
    const result = gendiff(filepath1, filepath2)
    console.log(result);
  })

program.parse();