
import { createSelector } from 'reselect';
import { get } from 'lodash';

const selectFormDomain = () => state => state.form;

export const selectValues = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.values`, {})
);
