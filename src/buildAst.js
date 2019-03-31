import _ from 'lodash';

const getNode = (obj1, obj2, key, build) => {
  if (_.has(obj1, key) && !_.has(obj2, key)) {
    return { type: 'deleted', key, value: obj1[key] };
  }

  if (!_.has(obj1, key) && _.has(obj2, key)) {
    return { type: 'added', key, value: obj2[key] };
  }

  if (obj1[key] === obj2[key]) {
    return { type: 'unchanged', key, value: obj1[key] };
  }

  if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
    return { type: 'hasChildren', key, children: build(obj1[key], obj2[key]) };
  }
  return {
    type: 'changed', key, beforeValue: obj1[key], afterValue: obj2[key],
  };
};

const buildAst = (obj1, obj2) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const parseNode = (acc, key) => {
    const node = getNode(obj1, obj2, key, buildAst);
    return acc.concat(node);
  };
  return uniqKeys.reduce(parseNode, []);
};

export default buildAst;
