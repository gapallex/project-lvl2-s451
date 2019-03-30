import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParse from './parsers';
import render from './render';

const getData = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileExtName = path.extname(filePath);
  const parse = getParse(fileExtName);
  return parse(content);
};

const buildAst = (obj1, obj2) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const getNode = (type, key, rest) => ({ type, key, ...rest });
  const setDiff = (acc, key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return acc.concat(getNode('deleted', key, { value: obj1[key] }));
    }

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return acc.concat(getNode('added', key, { value: obj2[key] }));
    }

    if (obj1[key] === obj2[key]) {
      return acc.concat(getNode('unchanged', key, { value: obj1[key] }));
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return acc.concat(
        getNode('hasChildren', key, { children: buildAst(obj1[key], obj2[key]) }),
      );
    }
    return acc.concat(
      getNode('changed', key, { beforeValue: obj1[key], afterValue: obj2[key] }),
    );
  };

  return uniqKeys.reduce(setDiff, []);
};

export default (firstFilePath, secondFilePath) => render(
  buildAst(
    getData(firstFilePath),
    getData(secondFilePath),
  ),
);
