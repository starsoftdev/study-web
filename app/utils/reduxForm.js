import forEach from 'lodash/forEach';
import validator from 'validate.js';
import customValidators from './customValidators';

/**
 * Function used to create validators with Validate.js
 */
export function validatorFactory(schema) {
  // adding custom validators
  forEach(customValidators, item => validator.validators[item.name] = item.validator);

  return values => {
    const errors = validator(values, schema);
    forEach(errors, (item, key) => // eslint-disable-line
      errors[key] = item[0]
    );
    // It should return empty object, otherwise redux-form complains
    return errors || {};
  };
}

export function asyncValidatorFactory(asyncSchema) {
  // adding custom validators
  forEach(customValidators, item => validator.validators[item.name] = item.validator);

  return values => {
    return new Promise(resolve => {
      validator.async(values, asyncSchema).then(() => resolve()).catch(err => {
        const asyncErrors = {}
        forEach(err, (item, key) =>
          asyncErrors[key] = item[0]
        );
        resolve(asyncErrors);
      });
    });
  };
}
