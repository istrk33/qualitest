import * as path from 'path';
import * as moduleAlias from 'module-alias';

const rootPath = path.resolve(__dirname, '..', '..');

// for prod :
// const rootPath = path.resolve(__dirname, '..', '..', 'dist');
moduleAlias.addAliases({
  '@src': rootPath,
});
