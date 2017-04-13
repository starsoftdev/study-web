import _ from 'lodash';

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
  FETCH_ALL_CLIENT_USERS,
  FETCH_ALL_CLIENT_USERS_SUCCESS,
  FETCH_ALL_CLIENT_USERS_ERROR,
  FETCH_STUDY_CAMPAIGNS,
  FETCH_STUDY_CAMPAIGNS_ERROR,
  FETCH_STUDY_CAMPAIGNS_SUCCESS,
  CHANGE_STUDY_STATUS_SUCCESS,
  TOGGLE_STUDY,

  UPDATE_THANK_YOU_PAGE,
  UPDATE_THANK_YOU_PAGE_SUCCESS,
  UPDATE_THANK_YOU_PAGE_ERROR,
  RESET_THANK_YOU_PAGE_STATE,

  UPDATE_PATIENT_THANK_YOU_EMAIL,
  UPDATE_PATIENT_THANK_YOU_EMAIL_SUCCESS,
  UPDATE_PATIENT_THANK_YOU_EMAIL_ERROR,
  RESET_PATIENT_THANK_YOU_EMAIL_STATE,

  UPDATE_LANDING_PAGE,
  UPDATE_LANDING_PAGE_SUCCESS,
  UPDATE_LANDING_PAGE_ERROR,
  RESET_LANDING_PAGE_STATE,

  CHANGE_STUDY_ADD,
  CHANGE_STUDY_ADD_SUCCESS,
  CHANGE_STUDY_ADD_ERROR,
  RESET_CHANGE_STUDY_ADD_STATE,
  FETCH_MESSAGING_NUMBERS,
  FETCH_MESSAGING_NUMBERS_SUCCESS,
  FETCH_MESSAGING_NUMBERS_ERROR,
} from './constants';

import {
  FETCH_LEVELS_SUCCESS,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_CRO_SUCCESS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_PROTOCOLS_SUCCESS,
  FETCH_USERS_BY_ROLE_SUCCESS,
  ADD_EMAIL_NOTIFICATION_USER,
  ADD_EMAIL_NOTIFICATION_USER_SUCCESS,
  ADD_EMAIL_NOTIFICATION_USER_ERROR,
} from '../../App/constants';

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
    study: null,
  },
  updateLandingPageProcess: {
    success: false,
    saving: false,
    error: null,
  },
  updateThankYouPageProcess: {
    success: false,
    saving: false,
    error: null,
  },
  updatePatientThankYouEmailProcess: {
    success: false,
    saving: false,
    error: null,
  },
  changeStudyAddProcess: {
    success: false,
    saving: false,
    error: null,
  },
  allClientUsers: {
    details: [],
    fetching: false,
    error: null,
  },
  messagingNumbers: {
    details: [],
    fetching: false,
    error: null,
  },
  addNotificationProcess: {
    saving: false,
    error: null,
    savedUser: null,
  },
  studyCampaigns: {
    details: [],
    fetching: false,
    error: null,
  },
  paginationOptions: {
    hasMoreItems: true,
    page: 1,
  },
  updatedStudyAd: null,
  levels: [],
  siteLocations: [],
  siteNames: [],
  indications: [],
  sponsors: [],
  protocols: [],
  cro: [],
  usersByRoles: {},
};

export default function dashboardPageReducer(state = initialState, action) {
  const studiesCopy = _.cloneDeep(state.studies.details);
  let savedStudy = null;
  let foundKey = null;
  let totalActive = 0;
  let totalInactive = 0;
  let newStudiesList = [];

  switch (action.type) {
    case FETCH_STUDIES_DASHBOARD:
      return {
        ...state,
        studies: {
          details: state.studies.details,
          fetching: true,
          error: null,
        },
        paginationOptions: {
          hasMoreItems: false,
          page: state.paginationOptions.page,
        },
      };
    case FETCH_STUDIES_DASHBOARD_SUCCESS:
      if (action.page === 1) {
        newStudiesList = action.payload.studies;
      } else {
        newStudiesList = studiesCopy.concat(action.payload.studies);
      }
      return {
        ...state,
        studies: {
          details: newStudiesList,
          fetching: false,
          error: null,
        },
        totals: {
          details: action.payload.totals,
          fetching: false,
          error: null,
        },
        paginationOptions: {
          hasMoreItems: action.hasMoreItems,
          page: action.page,
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
          study: null,
        },
      };
    case UPDATE_DASHBOARD_STUDY_SUCCESS:
      savedStudy = action.payload.studies[0];
      foundKey = _.findKey(studiesCopy, (item) => (item.study_id === savedStudy.study_id));
      if (foundKey) {
        savedStudy.selected = true;
        studiesCopy[foundKey] = savedStudy;
      }
      _.forEach(studiesCopy, (study, key) => {
        if (studiesCopy[key].is_active) {
          totalActive++;
        } else {
          totalInactive++;
        }
      });
      return {
        ...state,
        totals: {
          details: {
            ...state.totals.details,
            total_active: totalActive,
            total_inactive: totalInactive,
          },
          fetching: false,
          error: null,
        },
        studies: {
          details: studiesCopy,
          fetching: false,
          error: null,
        },
        updateStudyProcess: {
          saving: false,
          error: null,
          study: savedStudy,
        },
      };
    case UPDATE_DASHBOARD_STUDY_ERROR:
      return {
        ...state,
        updateStudyProcess: {
          saving: false,
          error: null,
          study: null,
        },
      };
    case FETCH_ALL_CLIENT_USERS:
      return {
        ...state,
        allClientUsers: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_ALL_CLIENT_USERS_SUCCESS:
      return {
        ...state,
        allClientUsers: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_ALL_CLIENT_USERS_ERROR:
      return {
        ...state,
        allClientUsers: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case ADD_EMAIL_NOTIFICATION_USER:
      return {
        ...state,
        addNotificationProcess: {
          saving: true,
          error: null,
          savedUser: null,
        },
      };
    case ADD_EMAIL_NOTIFICATION_USER_SUCCESS:
      return {
        ...state,
        addNotificationProcess: {
          saving: false,
          error: null,
          savedUser: action.payload,
        },
      };
    case ADD_EMAIL_NOTIFICATION_USER_ERROR:
      return {
        ...state,
        addNotificationProcess: {
          saving: false,
          error: action.payload,
          savedUser: null,
        },
      };
    case FETCH_STUDY_CAMPAIGNS:
      return {
        ...state,
        studyCampaigns: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_STUDY_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        studyCampaigns: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_STUDY_CAMPAIGNS_ERROR:
      return {
        ...state,
        studyCampaigns: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case CHANGE_STUDY_STATUS_SUCCESS:

      _.forEach(studiesCopy, (study, key) => {
        foundKey = _.findKey(action.payload.studies, (item) => (item === study.study_id));
        if (foundKey) {
          studiesCopy[key].is_active = action.payload.status === 'active';
        }
        if (studiesCopy[key].is_active) {
          totalActive++;
        } else {
          totalInactive++;
        }
      });

      return {
        ...state,
        totals: {
          details: {
            ...state.totals.details,
            total_active: totalActive,
            total_inactive: totalInactive,
          },
          fetching: false,
          error: null,
        },
        studies: {
          details: studiesCopy,
          fetching: false,
          error: null,
        },
      };

    case TOGGLE_STUDY:
      foundKey = _.findKey(studiesCopy, (item) => (action.id === item.study_id));
      if (foundKey) {
        studiesCopy[foundKey].selected = action.status;
      }

      return {
        ...state,
        studies: {
          details: studiesCopy,
          fetching: false,
          error: null,
        },
      };
    case UPDATE_LANDING_PAGE:
      return {
        ...state,
        updateLandingPageProcess: {
          success: false,
          saving: true,
          error: null,
        },
      };
    case UPDATE_LANDING_PAGE_SUCCESS:
      return {
        ...state,
        updateLandingPageProcess: {
          success: true,
          saving: false,
          error: null,
        },
      };
    case UPDATE_LANDING_PAGE_ERROR:
      return {
        ...state,
        updateLandingPageProcess: {
          success: false,
          saving: false,
          error: true,
        },
      };
    case RESET_LANDING_PAGE_STATE:
      return {
        ...state,
        updateLandingPageProcess: {
          success: false,
          saving: false,
          error: null,
        },
      };
    case CHANGE_STUDY_ADD:
      return {
        ...state,
        updatedStudyAd: null,
        changeStudyAddProcess: {
          success: false,
          saving: true,
          error: null,
        },
      };
    case CHANGE_STUDY_ADD_SUCCESS:
      return {
        ...state,
        updatedStudyAd: action.payload.imgSrc,
        changeStudyAddProcess: {
          success: true,
          saving: false,
          error: null,
        },
      };
    case CHANGE_STUDY_ADD_ERROR:
      return {
        ...state,
        updatedStudyAd: null,
        changeStudyAddProcess: {
          success: false,
          saving: false,
          error: true,
        },
      };
    case RESET_CHANGE_STUDY_ADD_STATE:
      return {
        ...state,
        updatedStudyAd: null,
        changeStudyAddProcess: {
          success: false,
          saving: false,
          error: null,
        },
      };
    case UPDATE_THANK_YOU_PAGE:
      return {
        ...state,
        updateThankYouPageProcess: {
          success: false,
          saving: true,
          error: null,
        },
      };
    case UPDATE_THANK_YOU_PAGE_SUCCESS:
      return {
        ...state,
        updateThankYouPageProcess: {
          success: true,
          saving: false,
          error: null,
        },
      };
    case UPDATE_THANK_YOU_PAGE_ERROR:
      return {
        ...state,
        updateThankYouPageProcess: {
          success: false,
          saving: false,
          error: true,
        },
      };
    case RESET_THANK_YOU_PAGE_STATE:
      return {
        ...state,
        updateThankYouPageProcess: {
          success: false,
          saving: false,
          error: null,
        },
      };
    case UPDATE_PATIENT_THANK_YOU_EMAIL:
      return {
        ...state,
        updatePatientThankYouEmailProcess: {
          success: false,
          saving: true,
          error: null,
        },
      };
    case UPDATE_PATIENT_THANK_YOU_EMAIL_SUCCESS:
      return {
        ...state,
        updatePatientThankYouEmailProcess: {
          success: true,
          saving: false,
          error: null,
        },
      };
    case UPDATE_PATIENT_THANK_YOU_EMAIL_ERROR:
      return {
        ...state,
        updatePatientThankYouEmailProcess: {
          success: false,
          saving: false,
          error: true,
        },
      };
    case RESET_PATIENT_THANK_YOU_EMAIL_STATE:
      return {
        ...state,
        updatePatientThankYouEmailProcess: {
          success: false,
          saving: false,
          error: null,
        },
      };
    case FETCH_MESSAGING_NUMBERS:
      return {
        ...state,
        messagingNumbers: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_MESSAGING_NUMBERS_SUCCESS:

      return {
        ...state,
        messagingNumbers: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_MESSAGING_NUMBERS_ERROR:
      return {
        ...state,
        messagingNumbers: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };


    default:
      return state;
  }
}
