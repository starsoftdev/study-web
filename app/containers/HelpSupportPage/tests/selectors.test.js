import expect from 'expect';

import { selectHelpSupportPageDomain, selectCompanyTypes } from '../selectors';
import { DEFAULT_COMPANY_TYPES } from '../constants';

describe('HelpSupportPage/selectors', () => {
  describe('selectHelpSupportPageDomain', () => {
    const helpSupportPageDomainSelector = selectHelpSupportPageDomain();
    it('should select helpSupport page state', () => {
      const helpSupportPageState = {
        companyTypes: [],
      };
      const mockedState = {
        helpSupportPage: helpSupportPageState,
      };
      expect(helpSupportPageDomainSelector(mockedState)).toEqual(helpSupportPageState);
    });
  });

  describe('selectCompanyTypes', () => {
    const companyTypesSelector = selectCompanyTypes();
    it('should select company types', () => {
      const mockedState = {
        helpSupportPage: {
          companyTypes: DEFAULT_COMPANY_TYPES,
        },
      };
      expect(companyTypesSelector(mockedState)).toEqual(DEFAULT_COMPANY_TYPES);
    });
  });
});
