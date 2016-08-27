/**
 * Created by mike on 6/20/16.
 */

const Validate = require('git-validate')

Validate.configureHook('pre-commit#develop', [ 'pre-commit' ])
Validate.installHooks('pre-commit#develop')
Validate.configureHook('pre-commit#master', [ 'pre-commit' ])
Validate.installHooks('pre-commit#master')
