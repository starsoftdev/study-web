import { validatorFactory } from '../../../../utils/reduxForm';

const schema = {
  noteData: { presence: true },
};

export default validatorFactory(schema);
