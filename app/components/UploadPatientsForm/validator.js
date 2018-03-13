import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  indication: {
    presence: true,
  },
  site: {
    presence: true,
  },
  studySource: {
    presence: true,
  },
  protocol: {
    presence: true,
  },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
