#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const difference = genDiff(filepath1, filepath2);
    console.log(difference);
  });

program.parse(process.argv);
