import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  switch (path.extname(filePath)) {
    case '.yml':
      return yaml.safeLoad(content);
    case '.json':
      return JSON.parse(content);
    default:
      console.log(`\nError: format "${path.extname(filePath)}" is not supported\n`);
      return null;
  }
};
