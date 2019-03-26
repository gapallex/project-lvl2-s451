
import fs from 'fs';
import gendiff from '../src';

test('gendiff', () => {
  expect(gendiff('__test__/__fixtures__/b.json', '__test__/__fixtures__/a.json'))
    .toBe(fs.readFileSync('__test__/__fixtures__/result.txt', 'utf8'));
});
