/* eslint-disable comma-dangle, no-case-declarations */
import _, { concat, cloneDeep } from 'lodash';
import moment from 'moment-timezone';

import {
  FETCH_PATIENT_SIGN_UPS_SUCCEESS,
  FETCH_PATIENT_MESSAGES_SUCCEESS,
  FETCH_PRINCIPAL_INVESTIGATOR_TOTALS_SUCCEESS,
  FETCH_STUDIES,
  FETCH_STUDIES_SUCCESS,
  FETCH_STUDIES_ERROR,
  UPDATE_STUDY_LATEST_END_DATE,
  CLEAR_STUDIES_COLLECTION,
  FETCH_PROTOCOLS,
  FETCH_PROTOCOLS_SUCCESS,
  FETCH_PROTOCOLS_ERROR,
  FETCH_PROTOCOL_NUMBERS,
  FETCH_PROTOCOL_NUMBERS_SUCCESS,
  FETCH_PROTOCOL_NUMBERS_ERROR,
  FETCH_INDICATIONS,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_INDICATIONS_ERROR,
  FETCH_INDICATION_LEVEL_PRICE,
  FETCH_INDICATION_LEVEL_PRICE_SUCCESS,
  FETCH_INDICATION_LEVEL_PRICE_ERROR,
  CLEAR_INDICATION_LEVEL_PRICE,
  RENEW_STUDY,
  RENEW_STUDY_SUCCESS,
  RENEW_STUDY_ERROR,
  UPGRADE_STUDY,
  UPGRADE_STUDY_SUCCESS,
  UPGRADE_STUDY_ERROR,
  EDIT_STUDY,
  EDIT_STUDY_SUCCESS,
  EDIT_STUDY_ERROR,
  SET_ACTIVE_SORT,
  NEW_MESSAGE_FOR_PROTOCOL,
  SORT_SUCCESS,
  INCREMENT_STUDY_UNREAD_MESSAGES,
} from './constants';

import {
  ADD_EMAIL_NOTIFICATION_USER,
  ADD_EMAIL_NOTIFICATION_USER_SUCCESS,
  ADD_EMAIL_NOTIFICATION_USER_ERROR,
  ADD_CUSTOM_EMAIL_NOTIFICATION,
  ADD_CUSTOM_EMAIL_NOTIFICATION_SUCCESS,
  ADD_CUSTOM_EMAIL_NOTIFICATION_ERROR,
  FETCH_CLIENT_ADMINS,
  FETCH_CLIENT_ADMINS_SUCCESS,
  FETCH_CLIENT_ADMINS_ERROR,
} from '../../containers/App/constants';

import {
  RECEIVE_NOTIFICATION,
  SEND_STUDY_PATIENT_MESSAGES,
} from '../../containers/GlobalNotifications/constants';

const initialState = {
  patientSignUps: {
    today: 0,
    yesterday: 0,
    total: 0,
  },
  principalInvestigatorTotals: {
    active: 0,
    inactive: 0,
    total: 0,
  },
  patientMessages: {
    unreadTexts: 0,
    unreadEmails: 0,
    total: 0,
  },
  studies: {
    details: [],
    fetching: false,
    error: null,
    total: null,
    active: null,
    inactive: null,
  },
  protocols: {
    details: [],
    fetching: false,
    error: null,
  },
  protocolNumbers: {
    details: [],
    fetching: false,
    error: null,
  },
  indications: {
    details: [],
    fetching: false,
    error: null,
  },
  selectedIndicationLevelPrice: {
    details: null,
    fetching: false,
    error: null,
  },
  renewedStudy: {
    details: null,
    submitting: false,
    error: null,
  },
  upgradedStudy: {
    details: null,
    submitting: false,
    error: null,
  },
  editedStudy: {
    details: null,
    submitting: false,
    error: null,
  },
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
    hasMoreItems: true,
    page: 1,
  },
  queryParams: {
    filter: false,
    name: null,
    siteId: null,
    status: null,
    hasMoreItems: true,
    limit: 15,
    skip: 0,
  },
  addNotificationProcess: {
    saving: false,
    error: null,
    savedUser: null,
  },
  addCustomNotificationEmailProcess: {
    saving: false,
    error: null,
    savedUser: null,
  },
  clientAdmins: {
    details: [],
    fetching: false,
    error: null,
  },
};

export default function homePageReducer(state = initialState, action) {
  const { payload } = action;
  let newState;
  let protocols;
  let queryParams;
  const protocolsCopy = _.cloneDeep(state.protocols.details);
  let newProtocolsList = [];
  let studiesCollection = [];

  switch (action.type) {
    case FETCH_PATIENT_SIGN_UPS_SUCCEESS:
      return {
        ...state,
        patientSignUps: {
          today: payload.today,
          yesterday: payload.yesterday,
          total: payload.total,
        },
      };
    case FETCH_PATIENT_MESSAGES_SUCCEESS:
      return {
        ...state,
        patientMessages: {
          unreadTexts: payload.unreadTexts,
          unreadEmails: payload.unreadEmails,
          total: payload.total,
        },
      };
    case FETCH_PRINCIPAL_INVESTIGATOR_TOTALS_SUCCEESS:
      return {
        ...state,
        principalInvestigatorTotals: {
          active: payload.active,
          inactive: payload.inactive,
          total: payload.total,
        },
      };
    case SEND_STUDY_PATIENT_MESSAGES:
      newState = state;
      return {
        ...state,
        patientMessages: {
          unreadTexts: newState.patientMessages.unreadTexts,
          unreadEmails: newState.patientMessages.unreadEmails,
          total: newState.patientMessages.total + 1,
        },
      };
    case RECEIVE_NOTIFICATION:
      newState = state;
      switch (action.payload.event) {
        case 'create-patient':
          newState = {
            ...state,
            patientSignUps: {
              today: newState.patientSignUps.today + 1,
              yesterday: newState.patientSignUps.yesterday,
            },
          };
          break;
        case 'twilio-message':
          newState = {
            ...state,
            patientMessages: {
              unreadTexts: newState.patientMessages.unreadTexts + 1,
              unreadEmails: newState.patientMessages.unreadEmails,
              total: newState.patientMessages.total + 1,
            },
          };
          break;
        case 'create-reward':
          newState = {
            ...state,
            rewardsPoint: newState.rewardsPoint + action.payload.event_params.points
          };
          break;
        default:
          break;
      }
      return newState;
    case FETCH_STUDIES:
      queryParams = state.queryParams;
      return {
        ...state,
        studies: {
          details: cloneDeep(state.studies.details),
          total: state.studies.total || 0,
          active: state.studies.active || 0,
          inactive: state.studies.inactive || 0,
          fetching: true,
          error: null,
        },
      };
    case FETCH_STUDIES_SUCCESS:
      queryParams = state.queryParams;
      studiesCollection = (queryParams.skip) ? concat(state.studies.details, payload.studies) : payload.studies;

      return {
        ...state,
        studies: {
          details: studiesCollection,
          total: payload.total,
          active: payload.active,
          inactive: payload.inactive,
          fetching: false,
          error: null,
        },
        queryParams: {
          ...queryParams,
          skip: (queryParams.hasMoreItems) ? queryParams.skip + queryParams.limit : queryParams.skip,
          hasMoreItems: payload.hasMoreItems,
        },
      };
    case FETCH_STUDIES_ERROR:
      return {
        ...state,
        studies: {
          details: [],
          total: null,
          active: null,
          inactive: null,
          fetching: false,
          error: payload,
        },
        queryParams: {
          filter: false,
          name: null,
          siteId: null,
          status: null,
          hasMoreItems: true,
          limit: 15,
          skip: 0,
        },
      };
    case UPDATE_STUDY_LATEST_END_DATE:
      studiesCollection = state.studies.details;
      const index = _.findIndex(studiesCollection, (o) => o.studyId === payload.studyId);

      if (index !== -1) {
        const campaignLengthUnit = 'days';
        let campaignLength = 30 * payload.campaignLength;
        if (payload.condenseTwoWeeks) {
          campaignLength = 14;
        }
        const latestDateTo = moment(payload.startDate).endOf('day').add(
          campaignLength - 1,
          campaignLengthUnit
        );

        studiesCollection[index].latestDateTo = latestDateTo.format();
      }

      return {
        ...state,
        studies: {
          details: studiesCollection,
          total: state.studies.total || 0,
          active: state.studies.active || 0,
          inactive: state.studies.inactive || 0,
          fetching: false,
          error: null,
        },
      };
    case CLEAR_STUDIES_COLLECTION:
      return {
        ...state,
        studies: {
          details: [],
          total: null,
          active: null,
          inactive: null,
          fetching: false,
          error: null,
        },
        queryParams: {
          filter: false,
          name: null,
          siteId: null,
          status: null,
          hasMoreItems: true,
          limit: 15,
          skip: 0,
        },
      };
    case FETCH_PROTOCOLS:
      return {
        ...state,
        protocols: {
          details: state.protocols.details,
          fetching: true,
          error: null,
        },
        paginationOptions: {
          activeSort: state.paginationOptions.activeSort,
          activeDirection: state.paginationOptions.activeDirection,
          hasMoreItems: false,
          page: state.paginationOptions.page,
        },
      };
    case FETCH_PROTOCOLS_SUCCESS:
      if (action.page === 1) {
        newProtocolsList = action.payload;
      } else {
        newProtocolsList = protocolsCopy.concat(action.payload);
      }
      return {
        ...state,
        protocols: {
          details: newProtocolsList,
          fetching: false,
          error: null,
        },
        paginationOptions: {
          activeSort: state.paginationOptions.activeSort,
          activeDirection: state.paginationOptions.activeDirection,
          hasMoreItems: action.hasMoreItems,
          page: action.page,
        },
      };
    case FETCH_PROTOCOLS_ERROR:
      return {
        ...state,
        protocols: {
          details: [],
          fetching: false,
          error: payload,
        },
      };
    case FETCH_PROTOCOL_NUMBERS:
      return {
        ...state,
        protocolNumbers: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_PROTOCOL_NUMBERS_SUCCESS:
      return {
        ...state,
        protocolNumbers: {
          details: payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_PROTOCOL_NUMBERS_ERROR:
      return {
        ...state,
        protocolNumbers: {
          details: [],
          fetching: false,
          error: payload,
        },
      };
    case FETCH_INDICATIONS:
      return {
        ...state,
        indications: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_INDICATIONS_SUCCESS:
      return {
        ...state,
        indications: {
          details: payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_INDICATIONS_ERROR:
      return {
        ...state,
        indications: {
          details: [],
          fetching: false,
          error: payload,
        },
      };
    case FETCH_INDICATION_LEVEL_PRICE:
      return {
        ...state,
        selectedIndicationLevelPrice: {
          details: null,
          fetching: true,
          error: null,
        },
      };
    case FETCH_INDICATION_LEVEL_PRICE_SUCCESS:
      return {
        ...state,
        selectedIndicationLevelPrice: {
          details: payload.price,
          fetching: false,
          error: null,
        },
      };
    case FETCH_INDICATION_LEVEL_PRICE_ERROR:
      return {
        ...state,
        selectedIndicationLevelPrice: {
          details: null,
          fetching: false,
          error: payload,
        },
      };
    case CLEAR_INDICATION_LEVEL_PRICE:
      return {
        ...state,
        selectedIndicationLevelPrice: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case RENEW_STUDY:
      return {
        ...state,
        renewedStudy: {
          details: null,
          submitting: true,
          error: null,
        },
      };
    case RENEW_STUDY_SUCCESS:
      return {
        ...state,
        renewedStudy: {
          details: payload,
          submitting: false,
          error: null,
        },
      };
    case RENEW_STUDY_ERROR:
      return {
        ...state,
        renewedStudy: {
          details: null,
          submitting: false,
          error: payload,
        },
      };
    case UPGRADE_STUDY:
      return {
        ...state,
        upgradedStudy: {
          details: null,
          submitting: true,
          error: null,
        },
      };
    case UPGRADE_STUDY_SUCCESS:
      const studies = _.cloneDeep(state.studies.details);
      const study = _.find(studies, (o) => (o.studyId === payload.studyId));
      study.level_id = payload.newLevelId;
      study.patientQualificationSuite = payload.patientQualificationSuite;
      return {
        ...state,
        studies: {
          details: studies,
          fetching: false,
          error: null,
        },
        upgradedStudy: {
          details: payload,
          submitting: false,
          error: null,
        },
      };
    case UPGRADE_STUDY_ERROR:
      return {
        ...state,
        upgradedStudy: {
          details: null,
          submitting: false,
          error: payload,
        },
      };
    case EDIT_STUDY:
      return {
        ...state,
        editedStudy: {
          details: null,
          submitting: true,
          error: null,
        },
      };
    case EDIT_STUDY_SUCCESS:
      return {
        ...state,
        editedStudy: {
          details: payload,
          submitting: false,
          error: null,
        },
      };
    case EDIT_STUDY_ERROR:
      return {
        ...state,
        editedStudy: {
          details: null,
          submitting: false,
          error: payload,
        },
      };
    case SET_ACTIVE_SORT:
      return {
        ...state,
        paginationOptions: {
          activeSort: action.sort,
          activeDirection: action.direction,
          hasMoreItems: state.paginationOptions.hasMoreItems,
          page: state.paginationOptions.page,
        },
      };
    case SORT_SUCCESS:
      return {
        ...state,
        studies: {
          details: payload,
          fetching: false,
          error: null,
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
    case ADD_CUSTOM_EMAIL_NOTIFICATION:
      return {
        ...state,
        addCustomNotificationEmailProcess: {
          saving: true,
          error: null,
          savedUser: null,
        },
      };
    case ADD_CUSTOM_EMAIL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        addCustomNotificationEmailProcess: {
          saving: false,
          error: null,
          savedUser: action.payload,
        },
      };
    case ADD_CUSTOM_EMAIL_NOTIFICATION_ERROR:
      return {
        ...state,
        addCustomNotificationEmailProcess: {
          saving: false,
          error: action.payload,
          savedUser: null,
        },
      };
    case NEW_MESSAGE_FOR_PROTOCOL:
      protocols = _.cloneDeep(state.protocols.details);
      _.forEach(protocols, (item, index) => {
        if (item.protocolNumber === action.protocolNumber) {
          protocols[index].unreadMessageCount = item.unreadMessageCount ? (parseInt(item.unreadMessageCount) + 1).toString() : '1';
        }
      });
      return {
        ...state,
        protocols: {
          details: protocols,
          fetching: false,
          error: null,
        },
      };
    case FETCH_CLIENT_ADMINS:
      return {
        ...state,
        clientAdmins: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_CLIENT_ADMINS_SUCCESS:
      return {
        ...state,
        clientAdmins: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_CLIENT_ADMINS_ERROR:
      return {
        ...state,
        clientAdmins: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };

    case INCREMENT_STUDY_UNREAD_MESSAGES:
      const studiesCopy = _.cloneDeep(state.studies.details);
      const foundStudy = _.find(studiesCopy, (o) => (o.studyId === action.studyId));
      if (foundStudy) {
        foundStudy.unreadMessageCount += 1;
        return {
          ...state,
          studies: {
            details: studiesCopy,
            fetching: false,
            error: null,
          },
        };
      }
      return state;

    default:
      return state;
  }
}
