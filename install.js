/**
 * Created by mike on 6/20/16.
 */

const Validate = require('git-validate');

Validate.configureHook('pre-commit#develop', ['lint:fix']);
Validate.installHooks('pre-commit#develop');
Validate.configureHook('pre-commit#master', ['lint:fix']);
Validate.installHooks('pre-commit#master');
