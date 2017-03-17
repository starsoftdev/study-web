
import {
  FETCH_STUDIES_DASHBOARD,
  FETCH_STUDIES_DASHBOARD_SUCCESS,
  FETCH_STUDIES_DASHBOARD_ERROR,
  FETCH_SITE_NAMES_SUCCESS,
  FETCH_SITE_LOCATIONS_SUCCESS,
  CLEAR_FILTERS,
  UPDATE_DASHBOARD_STUDY,
  UPDATE_DASHBOARD_STUDY_SUCCESS,
  UPDATE_DASHBOARD_STUDY_ERROR,
} from './constants';

import {
  FETCH_LEVELS_SUCCESS,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_CRO_SUCCESS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_PROTOCOLS_SUCCESS,
  FETCH_USERS_BY_ROLE_SUCCESS,
} from '../../App/constants';
import _ from 'lodash';

const initialState = {
  values: {
    filters: [],
  },
  studies: {
    details: [],
    fetching: false,
    error: null,
  },
  totals: {
    details: {},
    fetching: false,
    error: null,
  },
  updateStudyProcess: {
    saving: false,
    error: null,
  },
  levels: [],
  siteLocations: [],
  siteNames: [],
  indications: [],
  sponsors: [],
  protocols: [],
  cro: [],
  usersByRoles: {},
  /* studies: [
    {
      status: 'active',
      studyInfo: {
        id: '2835542',
        percentage: '90%',
        members: ['Bruce Wayne', 'Oliver Queen', 'Austin Baron'],
        color: 'RED',
      },
      siteInfo: {
        name: 'Catalina Research Institute',
        siteNumber: 'ABC123',
        protocol: 'A4091059',
        sponsor: 'Pfizer',
        cro: 'inVentiv Health',
        lastLogin: '02/23/2016 at 5:30 PM',
      },
      indication: ['Acne', 'Tier 2'],
      location: '359 East Main Street Suite 3i Mt: Kisco, NY 10549',
      exposureLevel: 'Platinum',
      goal: 50,
      patients: {
        today: 153,
        yesterday: 513,
        campaign: 1237,
        grandTotal: 85,
      },
      days: {
        totalDays: 60,
        daysRan: 34,
        daysLeft: 26,
      },
      campaign: {
        name: 'Run #2',
        startDate: '01/06/16',
        endDate: '01/07/06',
      },
      pageViews: 111,
      facebookClicks: 3,
      rewards: 10,
      credits: 111,
      texts: {
        sent: 23,
        received: 2,
        unread: 3,
      },
      newPatient: 3,
      callAttempted: 4,
      notQualified: 3,
      actionNeeded: 3,
      scheduled: 12,
      consented: 9,
      randomized: 2,
    }, {
      status: 'active',
      studyInfo: {
        id: '2835543',
        percentage: '70%',
        members: ['Ray Palmer', 'Slade Wilson', 'Austin Baron'],
        color: 'YELLOW',
      },
      siteInfo: {
        name: 'Catalina Research Institute',
        siteNumber: 'ABC123',
        protocol: 'A4091059',
        sponsor: 'Pfizer',
        cro: 'inVentiv Health',
        lastLogin: '02/23/2016 at 5:30 PM',
      },
      indication: ['Back Pain', 'Tier 3'],
      location: '455 East Main Street Suite 4i Mt: Kisco, NY 10549',
      exposureLevel: 'Platinum',
      goal: 70,
      patients: {
        today: 153,
        yesterday: 513,
        campaign: 1237,
        grandTotal: 85,
      },
      days: {
        totalDays: 60,
        daysRan: 34,
        daysLeft: 26,
      },
      campaign: {
        name: 'Run #2',
        startDate: '01/06/16',
        endDate: '01/07/06',
      },
      pageViews: 111,
      facebookClicks: 3,
      rewards: 10,
      credits: 111,
      texts: {
        sent: 23,
        received: 2,
        unread: 3,
      },
      newPatient: 3,
      callAttempted: 4,
      notQualified: 3,
      actionNeeded: 3,
      scheduled: 12,
      consented: 9,
      randomized: 2,
    }, {
      status: 'active',
      studyInfo: {
        id: '2835544',
        percentage: '80%',
        members: ['Selina Kyle', 'Penny Worth', 'Austin Baron'],
        color: 'GREEN',
      },
      siteInfo: {
        name: 'Catalina Research Institute',
        siteNumber: 'ABC123',
        protocol: 'A4091059',
        sponsor: 'Pfizer',
        cro: 'inVentiv Health',
        lastLogin: '02/23/2016 at 5:30 PM',
      },
      indication: ['Migraine', 'Tier 1'],
      location: '145 East Main Street Suite 5i Mt: Kisco, NY 10549',
      exposureLevel: 'Platinum',
      goal: 120,
      patients: {
        today: 153,
        yesterday: 513,
        campaign: 1237,
        grandTotal: 85,
      },
      days: {
        totalDays: 60,
        daysRan: 34,
        daysLeft: 26,
      },
      campaign: {
        name: 'Run #2',
        startDate: '01/06/16',
        endDate: '01/07/06',
      },
      pageViews: 111,
      facebookClicks: 3,
      rewards: 10,
      credits: 111,
      texts: {
        sent: 23,
        received: 2,
        unread: 3,
      },
      newPatient: 3,
      callAttempted: 4,
      notQualified: 3,
      actionNeeded: 3,
      scheduled: 12,
      consented: 9,
      randomized: 2,
    }, {
      status: 'active',
      studyInfo: {
        id: '2835548',
        percentage: '70%',
        members: ['James Gordon', 'Will Graham', 'Austin Baron'],
        color: 'PURPLE',
      },
      siteInfo: {
        name: 'Catalina Research Institute',
        siteNumber: 'ABC123',
        protocol: 'A4091059',
        sponsor: 'Pfizer',
        cro: 'inVentiv Health',
        lastLogin: '02/23/2016 at 5:30 PM',
      },
      indication: ['COPD', 'Tier 3'],
      location: '213 East Main Street Suite 4i Mt: Kisco, NY 10549',
      exposureLevel: 'Gold',
      goal: 20,
      patients: {
        today: 153,
        yesterday: 513,
        campaign: 1237,
        grandTotal: 85,
      },
      days: {
        totalDays: 60,
        daysRan: 34,
        daysLeft: 26,
      },
      campaign: {
        name: 'Run #2',
        startDate: '01/06/16',
        endDate: '01/07/06',
      },
      pageViews: 111,
      facebookClicks: 3,
      rewards: 10,
      credits: 111,
      texts: {
        sent: 23,
        received: 2,
        unread: 3,
      },
      newPatient: 3,
      callAttempted: 4,
      notQualified: 3,
      actionNeeded: 3,
      scheduled: 12,
      consented: 9,
      randomized: 2,
    }, {
      status: 'active',
      studyInfo: {
        id: '2835549',
        percentage: '80%',
        members: ['Richard Hendriks', 'Mary Stuart', 'Austin Baron'],
        color: 'RED',
      },
      siteInfo: {
        name: 'Catalina Research Institute',
        siteNumber: 'ABC123',
        protocol: 'A4091059',
        sponsor: 'Pfizer',
        cro: 'inVentiv Health',
        lastLogin: '02/23/2016 at 5:30 PM',
      },
      indication: ['Ring Worm', 'Tier 1'],
      location: '359 East Main Street Suite 3i Mt: Kisco, NY 10549',
      exposureLevel: 'Gold',
      goal: 50,
      patients: {
        today: 153,
        yesterday: 513,
        campaign: 1237,
        grandTotal: 85,
      },
      days: {
        totalDays: 60,
        daysRan: 34,
        daysLeft: 26,
      },
      campaign: {
        name: 'Run #2',
        startDate: '01/06/16',
        endDate: '01/07/06',
      },
      pageViews: 111,
      facebookClicks: 3,
      rewards: 10,
      credits: 111,
      texts: {
        sent: 23,
        received: 2,
        unread: 3,
      },
      newPatient: 3,
      callAttempted: 4,
      notQualified: 3,
      actionNeeded: 3,
      scheduled: 12,
      consented: 9,
      randomized: 2,
    },
  ],*/

  paginationOptions: {
    hasMoreItems: true,
    page: 1,
    activeSort: null,
    activeDirection: null,
    prevSearchFilter: {},
  },
};

export default function dashboardPageReducer(state = initialState, action) {
  const studiesCopy = _.cloneDeep(state.studies.details);
  let savedStudy = null;
  let foundKey = null;
  switch (action.type) {
    case FETCH_STUDIES_DASHBOARD:
      return {
        ...state,
        studies: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_STUDIES_DASHBOARD_SUCCESS:
      return {
        ...state,
        studies: {
          details: action.payload.studies,
          fetching: false,
          error: null,
        },
        totals: {
          details: action.payload.totals,
          fetching: false,
          error: null,
        },
      };
    case FETCH_STUDIES_DASHBOARD_ERROR:
      return {
        ...state,
        studies: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_LEVELS_SUCCESS:
      return {
        ...state,
        levels: action.payload,
      };
    case FETCH_SITE_NAMES_SUCCESS:
      return {
        ...state,
        siteNames: action.payload,
      };
    case FETCH_SITE_LOCATIONS_SUCCESS:
      return {
        ...state,
        siteLocations: action.payload,
      };
    case FETCH_INDICATIONS_SUCCESS:
      return {
        ...state,
        indications: action.payload,
      };
    case FETCH_SPONSORS_SUCCESS:
      return {
        ...state,
        sponsors: action.payload,
      };
    case FETCH_PROTOCOLS_SUCCESS:
      return {
        ...state,
        protocols: action.payload,
      };
    case FETCH_CRO_SUCCESS:
      return {
        ...state,
        cro: action.payload,
      };
    case FETCH_USERS_BY_ROLE_SUCCESS:
      return {
        ...state,
        usersByRoles: action.payload,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        studies: {
          details: [],
          fetching: false,
          error: null,
        },
        totals: {
          details: {},
          fetching: false,
          error: null,
        },
      };
    case UPDATE_DASHBOARD_STUDY:
      return {
        ...state,
        updateStudyProcess: {
          saving: true,
          error: null,
        },
      };
    case UPDATE_DASHBOARD_STUDY_SUCCESS:
      savedStudy = action.payload.studies[0];
      foundKey = _.findKey(studiesCopy, (item) => (item.study_id === savedStudy.study_id));
      if (foundKey) {
        savedStudy.selected = true;
        studiesCopy[foundKey] = savedStudy;
      }
      return {
        ...state,
        studies: {
          details: studiesCopy,
          fetching: false,
          error: null,
        },
        updateStudyProcess: {
          saving: false,
          error: null,
        },
      };
    case UPDATE_DASHBOARD_STUDY_ERROR:
      return {
        ...state,
        updateStudyProcess: {
          saving: false,
          error: null,
        },
      };
    default:
      return state;
  }
}
