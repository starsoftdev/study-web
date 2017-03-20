import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  hours: {
    presence: {
      message: '^Hours cannot be blank',
    },
  },
  minutes: {
    presence: {
      message: '^Minutes cannot be blank',
    },
  },
  amPm: {
    presence: {
      message: '^AM/PM cannot be blank',
    },
  },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
