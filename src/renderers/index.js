import treeRenderer from './treeRenderer';
import listRenderer from './listRenderer';

const renderAst = (ast, liftValue, renderer) => {
  const iter = (lift, tree) => {
    const renderNode = (acc, node) => {
      const render = renderer[node.type];
      return acc.concat(render(lift, node, iter));
    };
    return tree.reduce(renderNode, []).join('\n');
  };
  return iter(liftValue, ast);
};

const renderers = {
  tree: ast => `{\n${renderAst(ast, 0, treeRenderer)}\n}`,
  list: ast => renderAst(ast, [], listRenderer),
};

export default (format, ast) => {
  const render = renderers[format];
  return render(ast);
};
