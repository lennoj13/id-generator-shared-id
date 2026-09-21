/**
 * Template Registry
 * Import and register all university templates here.
 */
import mnsuConfig from './mnsu/config.js';
import harvardConfig from './harvard/config.js';
import mitConfig from './mit/config.js';
import stanfordConfig from './stanford/config.js';
import yaleConfig from './yale/config.js';
import oxfordConfig from './oxford/config.js';
import berkeleyConfig from './berkeley/config.js';

const templates = {
  mnsu: mnsuConfig,
  harvard: harvardConfig,
  mit: mitConfig,
  stanford: stanfordConfig,
  yale: yaleConfig,
  oxford: oxfordConfig,
  berkeley: berkeleyConfig,
};

export default templates;
