import fs from 'fs';
import path from 'path';
import getParse from './parsers';
import render from './renderers';
import buildAst from './buildAst';

const getData = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileExtName = path.extname(filePath);
  const parse = getParse(fileExtName);
  return parse(content);
};

export default (firstFilePath, secondFilePath, format) => render(
  format,
  buildAst(
    getData(firstFilePath),
    getData(secondFilePath),
  ),
);
