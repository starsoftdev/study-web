import validator from 'validate.js';
import forEach from 'lodash/forEach';

function validatorFactory() {
  return values => {
    const schema = {};
    forEach(values, (value, key) => { // eslint-disable-line
      if (key.indexOf('site-phoneNumber') !== -1) {
        schema[key] = {};
        schema[key].format = {
            // must be a phone in the format of (123) 456-7890 or E.164 format phone numbers
          pattern: '^\\(\\d{3}\\)\\s?\\d{3}\\-\\d{4}|\\+?[1-9]\\d{1,14}$',
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
