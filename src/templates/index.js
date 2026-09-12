/**
 * Template Registry
 * Import and register all university templates here.
 * To add a new university: import its config and add to the `templates` object.
 */
import mnsuConfig from './mnsu/config';
import harvardConfig from './harvard/config';
import mitConfig from './mit/config';

const templates = {
  mnsu: mnsuConfig,
  harvard: harvardConfig,
  mit: mitConfig,
};

export default templates;
