import fs from 'fs';
import _ from 'lodash';

const getObj = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const diff = (firstObj, secondObj) => {
  const uniqKeys = [...new Set(Object.keys(firstObj).concat(Object.keys(secondObj)))];
  const findDiff = (acc, key) => {
    if (_.has(firstObj, key) && !_.has(secondObj, key)) {
      return [...acc, `- ${key}: ${firstObj[key]}`];
    }

    if (!_.has(firstObj, key) && _.has(secondObj, key)) {
      return [...acc, `+ ${key}: ${secondObj[key]}`];
    }

    if (firstObj[key] === secondObj[key]) {
      return [...acc, `  ${key}: ${firstObj[key]}`];
    }
    return [...acc, `- ${key}: ${firstObj[key]}`, `+ ${key}: ${secondObj[key]}`];
  };
  return `{\n${uniqKeys.reduce(findDiff, []).join('\n')}\n}`;
};

export default (firstFilePath, secondFilePath) => diff(
  getObj(firstFilePath),
  getObj(secondFilePath),
);
