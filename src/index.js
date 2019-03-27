import _ from 'lodash';
import getObj from './parsers';

const genDiff = (firstObj, secondObj) => {
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

export default (firstFilePath, secondFilePath) => genDiff(
  getObj(firstFilePath),
  getObj(secondFilePath),
);
