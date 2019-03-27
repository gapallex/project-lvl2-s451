
import fs from 'fs';
import gendiff from '../src';

test('.json format', () => {
  expect(gendiff('__tests__/__fixtures__/b.json', '__tests__/__fixtures__/a.json'))
    .toBe(fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8'));
});

test('.yml fornat', () => {
  expect(gendiff('__tests__/__fixtures__/b.yml', '__tests__/__fixtures__/a.yml'))
    .toBe(fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8'));
});
