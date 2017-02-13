import { validatorFactory } from 'utils/reduxForm';

const schema = {
  recruitmentPhone: { presence: true },
};

const editStudyFields = Object.keys(schema);

export { editStudyFields };

export default validatorFactory(schema);
