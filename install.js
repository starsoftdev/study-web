/**
 * Created by mike on 6/20/16.
 */

const Validate = require('git-validate');

Validate.configureHook('pre-commit', ['lint:fix']);
Validate.installHooks('pre-commit');
