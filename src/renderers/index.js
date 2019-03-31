import treeRenderer from './treeRenderer';
import plainRenderer from './plainRenderer';

const renderAst = (ast, levelAccumulator, renderer) => {
  const iter = (levelAcc, tree) => {
    const renderNode = (acc, node) => {
      const render = renderer[node.type];
      return acc.concat(render(levelAcc, node, iter));
    };
    return tree.reduce(renderNode, []).join('\n');
  };
  return iter(levelAccumulator, ast);
};

const renderers = {
  tree: ast => `{\n${renderAst(ast, 0, treeRenderer)}\n}`,
  plain: ast => renderAst(ast, [], plainRenderer),
};

export default (format, ast) => {
  const render = renderers[format];
  return render(ast);
};
