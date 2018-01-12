/**
 * Created by mike on 6/20/16.
 */

try {
  const Validate = require('git-validate'); // eslint-disable-line

  Validate.configureHook('pre-commit#develop', ['lint:fix']);
  Validate.installHooks('pre-commit#develop');
  Validate.configureHook('pre-commit#master', ['lint:fix']);
  Validate.installHooks('pre-commit#master');
} catch (err) {
  console.error(err);
}

