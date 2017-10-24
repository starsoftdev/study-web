import validator from 'validate.js';
import forEach from 'lodash/forEach';

const schema = {
  firstName: { presence: true },
  lastName: { presence: true },
  email: { presence: true, email: true },
};

export function validatorFactory() {
  return values => {
    const customErrors = {};
    if (!values.protocols) {
      customErrors.protocols = ['Protocols can\'t be blank'];
    }
    forEach(values, (value, key) => { // eslint-disable-line
      if (key === 'protocols' && value.length <= 1) {
        if ((value.length === 0) || (value.length === 1 && value[0].isAdmin === false)) {
          customErrors.protocols = ['Protocols can\'t be blank'];
        }
      }
    });

    let errors = validator(values, schema);
    errors = { ...errors, ...customErrors };
    forEach(errors, (item, key) => // eslint-disable-line
      errors[key] = item[0]
    );
    // It should return empty object, otherwise redux-form complains
    return errors || {};
  };
}

export default validatorFactory();

