import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  bmi: {
    numericality: {
      noStrings: true,
      greaterThan: 0,
    },
  },
};

export default validatorFactory(schema);
