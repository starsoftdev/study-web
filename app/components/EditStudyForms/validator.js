import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  site_address: { presence: true },
};

const editStudyFields = Object.keys(schema);

export { editStudyFields };

export default validatorFactory(schema);
