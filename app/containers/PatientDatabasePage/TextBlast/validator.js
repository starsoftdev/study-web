import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  patients: { presence: { message: '^Error! No patients selected.' } },
};

export default validatorFactory(schema);
