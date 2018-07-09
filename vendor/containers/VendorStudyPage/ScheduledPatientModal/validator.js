import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  hour: {
    presence: {
      message: '^Hour cannot be blank',
    },
  },
  minute: {
    presence: {
      message: '^Minute cannot be blank',
    },
  },
  period: {
    presence: {
      message: '^AM/PM cannot be blank',
    },
  },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
