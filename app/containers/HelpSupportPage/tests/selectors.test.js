import expect from 'expect';

import { selectHelpAndSupportPageDomain, selectCompanyTypes } from '../selectors';
import { DEFAULT_COMPANY_TYPES } from '../constants';

describe('HelpAndSupportPage/selectors', () => {
  describe('selectHelpAndSupportPageDomain', () => {
    const helpAndSupportPageDomainSelector = selectHelpAndSupportPageDomain();
    it('should select refer page state', () => {
      const helpAndSupportPageState = {
        companyTypes: [],
      };
      const mockedState = {
        helpAndSupportPage: helpAndSupportPageState,
      };
      expect(helpAndSupportPageDomainSelector(mockedState)).toEqual(helpAndSupportPageState);
    });
  });

  describe('selectCompanyTypes', () => {
    const companyTypesSelector = selectCompanyTypes();
    it('should select company types', () => {
      const mockedState = {
        helpAndSupportPage: {
          companyTypes: DEFAULT_COMPANY_TYPES,
        },
      };
      expect(companyTypesSelector(mockedState)).toEqual(DEFAULT_COMPANY_TYPES);
    });
  });
});
