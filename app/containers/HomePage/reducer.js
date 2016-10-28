/* eslint-disable comma-dangle, no-case-declarations */
import { forEach, map } from 'lodash';

import {
  FETCH_PATIENT_SIGN_UPS_SUCCEESS,
  FETCH_PATIENT_MESSAGES_SUCCEESS,
  FETCH_REWARDS_POINT_SUCCEESS,
  FETCH_STUDIES,
  FETCH_STUDIES_SUCCESS,
  FETCH_STUDIES_ERROR,
} from './constants';

import {
  RECEIVE_NOTIFICATION,
} from 'containers/GlobalNotifications/constants';

const initialState = {
  patientSignUps: {
    today: 0,
    yesterday: 0,
  },
  patientMessages: {
    unreadTexts: 0,
    unreadEmails: 0,
  },
  rewardsPoint: 0,
  studies: {
    details: [],
    fetching: false,
    error: null,
  },
};

export default function homePageReducer(state = initialState, action) {
  const { payload } = action;
  let newState;
  let entity;
  let entitiesCollection;
  let startDateStr = '';
  let endDateStr = '';

  switch (action.type) {
    case FETCH_PATIENT_SIGN_UPS_SUCCEESS:
      return {
        ...state,
        patientSignUps: {
          today: payload.today,
          yesterday: payload.yesterday,
        },
      };
    case FETCH_PATIENT_MESSAGES_SUCCEESS:
      return {
        ...state,
        patientMessages: {
          unreadTexts: payload.unreadTexts,
          unreadEmails: payload.unreadEmails,
        },
      };
    case FETCH_REWARDS_POINT_SUCCEESS:
      return {
        ...state,
        rewardsPoint: action.payload.rewardPoints,
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
      return {
        ...state,
        studies: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_STUDIES_SUCCESS:
      entitiesCollection = [];

      forEach(payload, (studyIterator) => {
        entity = {
          studyId: studyIterator.id,
          indication: (studyIterator.indication) ? studyIterator.indication.name : '',
          location: '',
          sponsor: '',
          protocol: studyIterator.protocolNumber,
          patientMessagingSuite: (studyIterator.patientMessagingSuite) ? 'On' : 'Off',
          status: studyIterator.status,
          startDate: '',
          endDate: '',
        };
        if (studyIterator.sponsors && studyIterator.sponsors.length > 0) {
          const sponsorContacts = map(studyIterator.sponsors, sponsorContactIterator => sponsorContactIterator.name);
          const sponsorContactsStr = sponsorContacts.join(', ');
          entity.sponsor = sponsorContactsStr;
        }
        if (!studyIterator.sites || studyIterator.sites.length === 0) {
          entitiesCollection.push(entity);
          return true;
        }
        forEach(studyIterator.sites, (siteIterator) => {
          startDateStr = '';
          endDateStr = '';
          if (siteIterator.campaigns && siteIterator.campaigns.length > 0) {
            startDateStr = new Date(siteIterator.campaigns[0].dateFrom).toLocaleDateString();
            endDateStr = new Date(siteIterator.campaigns[0].dateTo).toLocaleDateString();
          }
          entity = {
            ...entity,
            location: siteIterator.location,
            status: siteIterator.status,
            startDate: startDateStr,
            endDate: endDateStr,
          };
          entitiesCollection.push(entity);
        });
        return true;
      });
      return {
        ...state,
        studies: {
          details: entitiesCollection,
          fetching: false,
          error: null,
        },
      };
    case FETCH_STUDIES_ERROR:
      return {
        ...state,
        studies: {
          details: [],
          fetching: false,
          error: payload,
        },
      };
    default:
      return state;
  }
}
