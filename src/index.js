import fs from 'fs';
import _ from 'lodash';

const getObj = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const diff = (firstObj, secondObj) => {
  const uniqKeys = _.union(_.keys(firstObj), _.keys(secondObj));
  const getNode = (label, key, obj) => `${label} ${key}: ${obj[key]}`;
  const setDiff = (acc, key) => {
    if (_.has(firstObj, key) && !_.has(secondObj, key)) {
      return acc.concat(getNode('-', key, firstObj));
    }

    if (!_.has(firstObj, key) && _.has(secondObj, key)) {
      return acc.concat(getNode('+', key, secondObj));
    }

    if (firstObj[key] === secondObj[key]) {
      return acc.concat(getNode(' ', key, firstObj));
    }

    return acc.concat(getNode('-', key, firstObj), getNode('+', key, secondObj));
  };

  const resultArray = uniqKeys.reduce(setDiff, []);
  return `{\n${resultArray.join('\n')}\n}`;
};

export default (firstFilePath, secondFilePath) => diff(
  getObj(firstFilePath),
  getObj(secondFilePath),
);
