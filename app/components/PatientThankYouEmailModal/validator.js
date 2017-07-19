import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  thankYouEmailBlock: {
    presence: false,
  },
  thankYouEmailSubject: {
    presence: false,
  },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
