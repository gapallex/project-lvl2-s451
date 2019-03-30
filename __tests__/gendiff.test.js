
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

  result: '__tests__/__fixtures__/result.txt',
};

test.each([
  [files.json.before, files.json.after],
  [files.yml.before, files.yml.after],
  [files.ini.before, files.ini.after],
])(
  '%s & %s',
  (before, after) => {
    expect(genDiff(before, after)).toBe(fs.readFileSync(files.result, 'utf8'));
  },
);
