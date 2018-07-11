import { validatorFactory } from '../../../../common/utils/reduxForm';

const schema = {
  note: {
    presence: {
      message: '^Note cannot be blank',
    },
  },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
