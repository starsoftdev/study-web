import { validatorFactory } from '../../../../common/utils/reduxForm';

const schema = {
  studyId: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
    },
  },
};
const fields = Object.keys(schema);

export { fields };
export default validatorFactory(schema);
