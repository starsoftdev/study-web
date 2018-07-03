import { validatorFactory } from '../../../../app/utils/reduxForm';

const schema = {
  bmi: {
    numericality: {
      greaterThan: 0,
    },
  },
};

export default validatorFactory(schema);
