/**
 * Created by mike on 6/20/16.
 */

const Validate = require('git-validate')

Validate.installScript('lint', 'eslint .')
Validate.configureHook('pre-commit', [ 'lint' ])
Validate.installHooks('pre-commit')
