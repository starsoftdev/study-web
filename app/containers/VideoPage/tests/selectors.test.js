import expect from 'expect';

import { selectVideoPageDomain, selectCompanyTypes } from '../selectors';
import { DEFAULT_COMPANY_TYPES } from '../constants';

describe('VideoPage/selectors', () => {
  describe('selectVideoPageDomain', () => {
    const videoPageDomainSelector = selectVideoPageDomain();
    it('should select video page state', () => {
      const videoPageState = {
        companyTypes: [],
      };
      const mockedState = {
        videoPage: videoPageState,
      };
      expect(videoPageDomainSelector(mockedState)).toEqual(videoPageState);
    });
  });

  describe('selectCompanyTypes', () => {
    const companyTypesSelector = selectCompanyTypes();
    it('should select company types', () => {
      const mockedState = {
        videoPage: {
          companyTypes: DEFAULT_COMPANY_TYPES,
        },
      };
      expect(companyTypesSelector(mockedState)).toEqual(DEFAULT_COMPANY_TYPES);
    });
  });
});
