import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    const values = _.keys(value)
      .map(key => `${key}: ${stringify(value[key])}`)
      .join(', ');
    return `{ ${values} }`;
  }
  return value;
};

const getRootPath = (deepth, lastKey) => deepth.concat(lastKey).join('.');

export default {
  deleted: (deepth, node) => `Property '${getRootPath(
    deepth,
    node.key,
  )}' was removed`,

  added: (deepth, node) => `Property '${getRootPath(
    deepth,
    node.key,
  )}' was added with value: '${stringify(node.value)}'`,

  unchanged: () => [],

  changed: (deepth, node) => `Property '${getRootPath(
    deepth,
    node.key,
  )}' was updated. From '${stringify(node.beforeValue)}' to '${stringify(
    node.afterValue,
  )}'`,

  hasChildren: (deepth, node, iter) => iter(deepth.concat(node.key), node.children),
};
