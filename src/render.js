import _ from 'lodash';

const margin = (deepth, extraSpace) => ' '.repeat(0 + deepth + extraSpace);

const stringify = (deepth, value) => {
  if (_.isObject(value)) {
    const values = _.keys(value)
      .map(key => `${margin(deepth, 6)}  ${key}: ${stringify(deepth + 4, value[key])}`)
      .join('\n');
    return `{\n${values}\n${margin(deepth, 4)}}`;
  }
  return value;
};

const renderAst = (ast) => {
  const iter = (deepth, tree) => {
    const nodesRenderers = {

      deleted: node => `${margin(deepth, 2)}- ${node.key}: ${stringify(
        deepth,
        node.value,
      )}`,

      unchanged: node => `${margin(deepth, 2)}  ${node.key}: ${stringify(
        deepth,
        node.value,
      )}`,

      added: node => `${margin(deepth, 2)}+ ${node.key}: ${stringify(
        deepth,
        node.value,
      )}`,

      changed: node => [
        `${margin(deepth, 2)}- ${node.key}: ${stringify(deepth, node.beforeValue)}`,
        `${margin(deepth, 2)}+ ${node.key}: ${stringify(deepth, node.afterValue)}`,
      ],

      hasChildren: node => `${margin(deepth, 2)}  ${node.key}: ${iter(
        deepth + 4,
        node.children,
      )}`,

    };

    const renderNode = (acc, node) => {
      const render = nodesRenderers[node.type];
      return acc.concat(render(node));
    };
    return `{\n${tree.reduce(renderNode, [])
      .join('\n')}\n${margin(deepth, 0)}}`;
  };
  return iter(0, ast);
};

export default renderAst;
