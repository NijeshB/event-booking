import path from 'path';
import moduleAlias from 'module-alias';
import { isProduction } from './utils/helpers';
// Determine the base directory dynamically
const baseDir = isProduction ? 'dist' : 'src';

moduleAlias.addAliases({
  '@utils': path.join(process.cwd(), baseDir, 'utils'),
  '@validators': path.join(process.cwd(), baseDir, 'validators'),
  '@exceptions': path.join(process.cwd(), baseDir, 'exceptions'),
  '@controllers': path.join(process.cwd(), baseDir, 'controllers'),
  '@middleware': path.join(process.cwd(), baseDir, 'middleware'),
  '@db': path.join(process.cwd(), baseDir, 'db'),
  '@model': path.join(process.cwd(), baseDir, 'model'),
  '@customTypes': path.join(process.cwd(), baseDir, 'customTypes'),
  // '@types': path.join(process.cwd(), baseDir, 'types'),
  // Add more aliases as neenpm run ded
});

import logger from '@utils/logger';

logger.info(`🔗 Module aliases set for ${process.env.NODE_ENV})`);
