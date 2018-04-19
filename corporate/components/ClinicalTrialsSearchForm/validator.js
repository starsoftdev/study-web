import { validatorFactory, asyncValidatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  postalCode: { presence: false },
  distance: { presence: false },
  indicationId: { presence: false },
};

const asyncSchema = {
  countryCode: { presence: false },
  postalCode: {
    asyncValidUSZipCode: true,
  },
};

export const ClinicalTrialsSearchFormValidator = validatorFactory(schema);
export const AsyncClinicalTrialsSearchFormValidator = asyncValidatorFactory(asyncSchema);
