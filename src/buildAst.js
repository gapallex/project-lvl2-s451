import _ from 'lodash';

const propertyActions = [
  {
    check: ({ obj1, obj2, key }) => _.has(obj1, key) && !_.has(obj2, key),
    process: ({ obj1, key }) => ({ type: 'deleted', key, value: obj1[key] }),
  },

  {
    check: ({ obj1, obj2, key }) => !_.has(obj1, key) && _.has(obj2, key),
    process: ({ obj2, key }) => ({ type: 'added', key, value: obj2[key] }),
  },

  {
    check: ({ obj1, obj2, key }) => obj1[key] === obj2[key],
    process: ({ obj1, key }) => ({ type: 'unchanged', key, value: obj1[key] }),
  },

  {
    check: ({ obj1, obj2, key }) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    process: ({
      obj1, obj2, key, buildAst,
    }) => ({
      type: 'hasChildren', key, children: buildAst(obj1[key], obj2[key]),
    }),
  },

  {
    check: ({ obj1, obj2, key }) => obj1[key] !== obj2[key],
    process: ({ obj1, obj2, key }) => ({
      type: 'changed', key, beforeValue: obj1[key], afterValue: obj2[key],
    }),
  },

];

const findPropertyActions = data => propertyActions.find(({ check }) => check(data));

const buildAst = (obj1, obj2) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const parseNode = (key) => {
    const data = {
      obj1, obj2, key, buildAst,
    };
    const { process } = findPropertyActions(data);
    return process(data);
  };
  return uniqKeys.map(parseNode);
};

export default buildAst;
