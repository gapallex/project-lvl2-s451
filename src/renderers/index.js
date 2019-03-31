import treeRenderer from './treeRenderer';
import plainRenderer from './plainRenderer';
import jsonRenderer from './jsonRenderer';

const renderers = {
  tree: treeRenderer,
  plain: plainRenderer,
  json: jsonRenderer,
};

export default (format, ast) => renderers[format](ast);
