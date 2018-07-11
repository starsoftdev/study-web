import Promise from 'bluebird';
import { validateStudyNumber } from './actions';

export const asyncValidate = (values, dispatch) => {
  if (values.studyId) {
    return new Promise((resolve, reject) => {
      const studyId = parseInt(values.studyId);
      dispatch(validateStudyNumber(values.vendorId, studyId, resolve, reject));
    });
  }
  return Promise.resolve();
};
