import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    const values = _.keys(value)
      .map(key => `${key}: ${stringify(value[key])}`)
      .join('\n');
    return `{\n${values}\n}`;
  }
  return value;
};

const renderAst = (ast) => {
  const nodesRenderers = {
    deleted: node => `- ${node.key}: ${stringify(node.value)}`,
    unchanged: node => `  ${node.key}: ${stringify(node.value)}`,
    added: node => `+ ${node.key}: ${stringify(node.value)}`,
    changed: node => [
      `- ${node.key}: ${stringify(node.beforeValue)}`,
      `+ ${node.key}: ${stringify(node.afterValue)}`,
    ],
    hasChildren: node => `  ${node.key}: ${renderAst(node.children)}`,
  };

  const renderNode = (acc, node) => {
    const render = nodesRenderers[node.type];
    return acc.concat(render(node));
  };
  return `{\n${ast.reduce(renderNode, []).join('\n')}\n}`;
};

export default renderAst;
