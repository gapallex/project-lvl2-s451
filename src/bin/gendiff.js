#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output formats: "plain", "json" or', 'tree')
  .action((firstConfig, secondConfig) => console.log(
    genDiff(firstConfig, secondConfig, program.format),
  ))
  .parse(process.argv);
