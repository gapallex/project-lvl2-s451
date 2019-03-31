import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) {
    return value;
  }
  const values = _.keys(value)
    .map(key => `${key}: ${stringify(value[key])}`)
    .join(', ');
  return `{ ${values} }`;
};

const getRootPath = (level, lastKey) => level.concat(lastKey).join('.');

const renderers = {
  deleted: (level, node) => `Property '${getRootPath(
    level,
    node.key,
  )}' was removed`,

  added: (level, node) => `Property '${getRootPath(
    level,
    node.key,
  )}' was added with value: '${stringify(node.value)}'`,

  unchanged: () => [],

  changed: (level, node) => `Property '${getRootPath(
    level,
    node.key,
  )}' was updated. From '${stringify(node.beforeValue)}' to '${stringify(
    node.afterValue,
  )}'`,

  hasChildren: (level, node, iter) => iter(level.concat(node.key), node.children),
};

const renderAst = (level, ast) => {
  const renderNode = (acc, node) => {
    const render = renderers[node.type];
    return acc.concat(render(level, node, renderAst));
  };
  return ast.reduce(renderNode, []).join('\n');
};

export default ast => renderAst([], ast);
