
import fs from 'fs';
import genDiff from '../src';

const files = {
  json: {
    before: '__tests__/__fixtures__/b.json',
    after: '__tests__/__fixtures__/a.json',
  },

  yml: {
    before: '__tests__/__fixtures__/b.yml',
    after: '__tests__/__fixtures__/a.yml',
  },

  ini: {
    before: '__tests__/__fixtures__/b.ini',
    after: '__tests__/__fixtures__/a.ini',
  },

  result: fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8'),
};

test.each([
  [files.json.before, files.json.after, files.result],
  [files.yml.before, files.yml.after, files.result],
  [files.ini.before, files.ini.after, files.result],
])(
  '%s & %s',
  (before, after, result) => {
    expect(genDiff(before, after)).toBe(result);
  },
);
