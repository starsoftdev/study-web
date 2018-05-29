import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  type: {
    presence: {
      message: '^Please select your type',
    },
  },
  name: {
    presence: {
      message: '^Name cannot be blank',
    },
  },
  email: {
    presence: {
      message: '^Email cannot be blank',
    },
    email: {
      message: '^Email not valid',
    },
    emailDomain : {
      message: '^Invalid Email domain',
    },
  },
  request: {
    presence: {
      message: '^Massage cannot be blank',
    },
  },
  subrequest: {
    presence: {
      message: '^Massage cannot be blank',
    },
  },
  subrequest2: {
    presence: {
      message: '^Massage cannot be blank',
    },
  },
  reCaptcha: { presence: true },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
