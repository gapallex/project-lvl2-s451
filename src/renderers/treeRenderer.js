import _ from 'lodash';

const margin = depth => '    '.repeat(depth);

const stringify = (depth, value) => {
  if (!_.isObject(value)) {
    return value;
  }
  const values = _.keys(value)
    .map(key => `${margin(depth + 1)}    ${key}: ${stringify(depth, value[key])}`)
    .join('\n');
  return `{\n${values}\n${margin(depth + 1)}}`;
};

export default {
  deleted: (depth, node) => `${margin(depth)}  - ${node.key}: ${stringify(
    depth,
    node.value,
  )}`,

  unchanged: (depth, node) => `${margin(depth)}    ${node.key}: ${stringify(
    depth,
    node.value,
  )}`,

  added: (depth, node) => `${margin(depth)}  + ${node.key}: ${stringify(
    depth,
    node.value,
  )}`,

  changed: (depth, node) => [
    `${margin(depth)}  - ${node.key}: ${stringify(depth, node.beforeValue)}`,
    `${margin(depth)}  + ${node.key}: ${stringify(depth, node.afterValue)}`,
  ],

  hasChildren: (depth, node, iter) => `${margin(depth)}    ${node.key}: {\n${iter(
    depth + 1,
    node.children,
  )}\n${margin(depth + 1)}}`,

};
