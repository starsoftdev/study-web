import validator from 'validate.js';
import forEach from 'lodash/forEach';

function validatorFactory() {
  return values => {
    const schema = {};
    forEach(values, (value, key) => { // eslint-disable-line
      if (key.indexOf('site-phoneNumber') !== -1) {
        schema[key] = {};
        schema[key].format = {
          // must be a phone in a valid format
          pattern: /^(?:(\+?\d{1,3}) ?)?(?:([\(]?\d+[\)]?)[ -])?(\d{1,5}[\- ]?\d{1,5})$/,
          message: 'Invalid phone number',
        };
      }
    });
    const errors = validator(values, schema);
    forEach(errors, (item, key) => // eslint-disable-line
      errors[key] = item[0]
    );
    // It should return empty object, otherwise redux-form complains
    return errors || {};
  };
}

export default validatorFactory();
