/* eslint-disable no-case-declarations */

import { forEach, map, remove, cloneDeep, findIndex, concat, sortBy } from 'lodash';
import { getItem } from '../../utils/localStorage';

import {
  SET_AUTH_STATE,
  SET_USER_DATA,

  FETCH_INDICATIONS_SUCCESS,
  FETCH_SOURCES_SUCCESS,
  FETCH_LEVELS_SUCCESS,

  FETCH_COUPON,
  FETCH_COUPON_SUCCESS,
  FETCH_COUPON_ERROR,

  CLEAR_COUPON,

  FETCH_REWARDS,
  FETCH_REWARDS_SUCCESS,
  FETCH_REWARDS_ERROR,

  FETCH_REWARDS_BALANCE_SUCCESS,
  REDEEM_SUCCESS,

  FETCH_CARDS,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,

  FETCH_PROTOCOLS,
  FETCH_PROTOCOLS_SUCCESS,
  FETCH_PROTOCOLS_ERROR,

  SAVE_CARD,
  SAVE_CARD_SUCCESS,
  SAVE_CARD_ERROR,

  DELETE_CARD,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_ERROR,

  ADD_CREDITS,
  ADD_CREDITS_SUCCESS,
  ADD_CREDITS_ERROR,
  FETCH_EVENTS,

  FETCH_CLIENT_SITES,
  FETCH_CLIENT_SITES_SUCCESS,
  FETCH_CLIENT_SITES_ERROR,

  FETCH_SITE_PATIENTS,
  FETCH_SITE_PATIENTS_SUCCESS,
  FETCH_SITE_PATIENTS_ERROR,
  UPDATE_SITE_PATIENTS,

  FETCH_CLIENT_CREDITS,
  FETCH_CLIENT_CREDITS_SUCCESS,
  FETCH_CLIENT_CREDITS_ERROR,

  FETCH_PATIENT_MESSAGES,
  FETCH_PATIENT_MESSAGES_SUCCESS,
  FETCH_PATIENT_MESSAGES_ERROR,
  UPDATE_PATIENT_MESSAGES,

  FETCH_PATIENT_MESSAGE_UNREAD_COUNT_SUCCESS,

  SEARCH_SITE_PATIENTS_SUCCESS,
  SEARCH_SITE_PATIENTS_ERROR,

  MARK_AS_READ_PATIENT_MESSAGES,

  FETCH_CLIENT_ROLES,
  FETCH_CLIENT_ROLES_SUCCESS,
  FETCH_CLIENT_ROLES_ERROR,

  FETCH_SITE,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_ERROR,

  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,

  CLEAR_SELECTED_SITE,
  CLEAR_SELECTED_USER,

  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,

  SAVE_SITE,
  SAVE_SITE_SUCCESS,
  SAVE_SITE_ERROR,

  SAVE_USER,
  SAVE_USER_SUCCESS,
  SAVE_USER_ERROR,
  UPDATE_USER_SUCCESS,

  GET_CREDITS_PRICE_SUCCESS,

  CHANGE_USERS_TIMEZONE,
  CHANGE_USERS_TIMEZONE_SUCCESS,
  CHANGE_USERS_TIMEZONE_ERROR,

  FETCH_LANDING,
  FETCH_LANDING_SUCCESS,
  FETCH_LANDING_ERROR,
  CLEAR_LANDING,
  PATIENT_SUBSCRIBED,
  PATIENT_SUBSCRIPTION_ERROR,
  FIND_OUT_PATIENTS_POSTED,

  CLINICAL_TRIALS_SEARCH,
  CLINICAL_TRIALS_SEARCH_SUCCESS,
  CLINICAL_TRIALS_SEARCH_ERROR,
  CLEAR_CLINICAL_TRIALS_SEARCH,
  LIST_SITE_NOW_SUCCESS,
  RESET_LIST_SITE_NOW_SUCCESS,
  GET_PROPOSAL_SUCCESS,
  RESET_GET_PROPOSAL_SUCCESS,
  LEARN_ABOUT_FUTURE_TRIALS_SUCCESS,
  RESET_LEARN_ABOUT_FUTURE_TRIALS,
  NEW_CONTACT_SUCCESS,
  RESET_NEW_CONTACT_SUCCESS,
  PRIVACY_REQUEST_SUCCESS,
  RESET_PRIVACY_REQUEST_SUCCESS,

  GET_CNS_INFO,
  GET_CNS_INFO_ERROR,
  GET_CNS_INFO_SUCCESS,
  SUBMIT_CNS,
  SUBMIT_CNS_SUCCESS,
  SUBMIT_CNS_ERROR,

  ADD_MESSAGES_COUNT_STAT,
  DELETE_MESSAGES_COUNT_STAT,

  PATIENT_CATEGORIES_FETCHED,
  FETCH_PATIENT_CATEGORIES_ERROR,

  GET_TIMEZONE,
  GET_TIMEZONE_SUCCESS,
  GET_TIMEZONE_ERROR,
} from './constants';

import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '../../containers/LoginPage/constants';

import {
  CHANGE_IMAGE_SUCCESS,
} from '../../containers/ProfilePage/constants';

import {
  SORT_SUCCESS,
} from '../../containers/HomePage/constants';

const initialState = {
  loggedIn: !!getItem('auth_token'),
  loginError: null,
  submittingLoginForm: false,
  userData: null,
  pageEvents: null,
  baseData: {
    studies: {
      details: [],
      fetching: false,
      error: null,
    },
    sites: {
      details: [],
      fetching: false,
      error: null,
    },
    indications: [],
    subscriptionError: null,
    subscribedFromLanding: null,
    findOutPosted: null,
    listSiteNowSuccess: null,
    getProposalSuccess: null,
    learnAboutFutureTrialsSuccess: null,
    newContactsSuccess: null,
    privacyRequest: null,
    sources: [],
    levels: [],
    landing: {
      details: null,
      fetching: false,
      error: null,
    },
    coupon: {
      details: null,
      fetching: false,
      error: null,
    },
    cards: {
      details: null,
      fetching: false,
      error: null,
    },
    trials: {
      details: null,
      total: null,
      wrongPostalCode: false,
      fetching: false,
      error: null,
    },
    savedCard: {
      details: null,
      saving: false,
      error: null,
    },
    deletedCard: {
      details: null,
      deleting: false,
      error: null,
    },
    addCredits: {
      details: null,
      adding: false,
      error: null,
    },
    sitePatients: {
      details: [],
      fetching: false,
      error: null,
    },
    clientCredits: {
      details: {},
      fetching: false,
      error: null,
    },
    patientMessages: {
      details: [],
      fetching: false,
      error: null,
      stats: {
        emailsSent: 0,
        unreadText: 0,
        textTotal: 0,
      },
    },
    rewards: [],
    rewardsBalance: {},
    protocols: {
      details: [],
      fetching: false,
      error: null,
    },
    clientRoles: {
      details: [],
      fetching: false,
      error: null,
    },
    selectedSite: {
      details: null,
      fetching: false,
      error: null,
    },
    selectedUser: {
      details: null,
      fetching: false,
      error: null,
    },
    deletedUser: {
      details: null,
      deleting: false,
      error: null,
    },
    deletedClientRole: {
      details: null,
      deleting: false,
      error: null,
    },
    savedSite: {
      details: null,
      saving: false,
      error: null,
    },
    savedUser: {
      details: null,
      saving: false,
      error: null,
    },
    availPhoneNumbers: [],
    creditsPrice: {},
    changeUsersTimezoneState: {
      saving: false,
    },
    globalPMSPaginationOptions: {
      hasMoreItems: false,
      page: 1,
      search: '',
    },
    cnsInfo: {
      details: {},
      fetching: false,
      error: null,
    },
    cnsSubmitProcess: {},
    patientCategories: [],
    formsTempTimezone: '',
  },
};

export default function appReducer(state = initialState, action) {
  let foundIndex = -1;
  const cardsCollection = cloneDeep(state.baseData.cards.details);
  const clientRolesCollection = map(state.baseData.clientRoles.details, cloneDeep);
  const sitesCopy = map(state.baseData.sites.details, cloneDeep);
  const patientsCopy = cloneDeep(state.baseData.sitePatients.details);
  let sitePatientsCollection = [];
  let unreadCount = 0;
  let patientMessagesCollection = [];
  let baseDataInnerState = null;
  let resultState = null;
  let userRoleType = '';
  let temRoleID = null;
  let newPatientsList = [];

  switch (action.type) {
    case SET_AUTH_STATE:
      resultState = {
        ...state,
        loggedIn: action.payload.newAuthState,
      };
      break;
    case LOGIN_ERROR:
      resultState = {
        ...state,
        loginError: action.payload,
        submittingLoginForm: false,
      };
      break;
    case LOGIN_REQUEST:
      resultState = {
        ...state,
        submittingLoginForm: true,
      };
      break;
    case LOGIN_SUCCESS:
      resultState = {
        ...state,
        submittingLoginForm: false,
      };
      break;
    case SET_USER_DATA:
      if (action.payload.userData) {
        if (action.payload.userData.roleForSponsor) {
          userRoleType = 'sponsor';
        } else if (action.payload.userData.roleForClient) {
          userRoleType = 'client';
        } else if (action.payload.userData.roleForCallCenter) {
          userRoleType = 'callCenter';
        } else if (action.payload.userData.roles && action.payload.userData.roles.length > 0) {
          userRoleType = 'dashboard';
        } else {
          userRoleType = '';
        }
      }
      resultState = {
        ...state,
        userData: action.payload.userData,
        userRoleType,
      };
      break;
    case CHANGE_IMAGE_SUCCESS:
      resultState = {
        ...state,
        userData: { ...state.userData, profileImageURL: action.payload.profileImageURL },
      };
      break;
    case FETCH_EVENTS:
      resultState = {
        ...state,
        pageEvents: action.payload,
      };
      break;
    case FETCH_INDICATIONS_SUCCESS:
      baseDataInnerState = {
        indications: action.payload,
      };
      break;
    case SORT_SUCCESS:
      baseDataInnerState = {
        studies: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_LANDING:
      baseDataInnerState = {
        subscriptionError: null,
        landing: {
          details: null,
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_LANDING_SUCCESS:
      baseDataInnerState = {
        landing: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_LANDING_ERROR:
      baseDataInnerState = {
        landing: {
          details: null,
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case CLEAR_LANDING:
      baseDataInnerState = {
        subscriptionError: null,
        subscribedFromLanding: null,
        landing: {
          details: null,
          fetching: false,
          error: null,
        },
      };
      break;
    case CLINICAL_TRIALS_SEARCH:
      baseDataInnerState = {
        trials: {
          details: cloneDeep(state.baseData.trials.details),
          total: state.baseData.trials.total,
          wrongPostalCode: state.baseData.trials.wrongPostalCode,
          fetching: true,
          error: null,
        },
      };
      break;
    case CLINICAL_TRIALS_SEARCH_SUCCESS:
      const trialsCollection = concat(state.baseData.trials.details, action.payload.data);
      if (trialsCollection && trialsCollection[0] === null) {
        trialsCollection.splice(0, 1);
      }
      baseDataInnerState = {
        trials: {
          details: trialsCollection,
          total: action.payload.total,
          wrongPostalCode: action.payload.wrongPostalCode,
          fetching: false,
          error: null,
        },
      };
      break;
    case CLINICAL_TRIALS_SEARCH_ERROR:
      baseDataInnerState = {
        trials: {
          details: cloneDeep(state.baseData.trials.details),
          total: state.baseData.trials.total,
          wrongPostalCode: state.baseData.trials.wrongPostalCode,
          fetching: false,
          error: null,
        },
      };
      break;
    case CLEAR_CLINICAL_TRIALS_SEARCH:
      baseDataInnerState = {
        trials: {
          details: null,
          total: null,
          wrongPostalCode: false,
          fetching: false,
          error: null,
        },
      };
      break;
    case PATIENT_SUBSCRIBED:
      baseDataInnerState = {
        subscribedFromLanding: action.payload,
      };
      break;
    case FIND_OUT_PATIENTS_POSTED:
      baseDataInnerState = {
        findOutPosted: action.payload,
      };
      break;
    case LIST_SITE_NOW_SUCCESS:
      baseDataInnerState = {
        listSiteNowSuccess: true,
      };
      break;
    case RESET_LIST_SITE_NOW_SUCCESS:
      baseDataInnerState = {
        listSiteNowSuccess: null,
      };
      break;
    case GET_PROPOSAL_SUCCESS:
      baseDataInnerState = {
        getProposalSuccess: true,
      };
      break;
    case RESET_GET_PROPOSAL_SUCCESS:
      baseDataInnerState = {
        getProposalSuccess: null,
      };
      break;
    case LEARN_ABOUT_FUTURE_TRIALS_SUCCESS:
      baseDataInnerState = {
        learnAboutFutureTrialsSuccess: true,
      };
      break;
    case RESET_LEARN_ABOUT_FUTURE_TRIALS:
      baseDataInnerState = {
        learnAboutFutureTrialsSuccess: null,
      };
      break;
    case NEW_CONTACT_SUCCESS:
      baseDataInnerState = {
        newContactsSuccess: true,
      };
      break;
    case RESET_NEW_CONTACT_SUCCESS:
      baseDataInnerState = {
        newContactsSuccess: null,
      };
      break;
    case PRIVACY_REQUEST_SUCCESS:
      baseDataInnerState = {
        privacyRequest: true,
      };
      break;
    case RESET_PRIVACY_REQUEST_SUCCESS:
      baseDataInnerState = {
        privacyRequestSuccess: null,
      };
      break;
    case PATIENT_SUBSCRIPTION_ERROR:
      baseDataInnerState = {
        subscriptionError: action.payload,
      };
      break;
    case FETCH_SOURCES_SUCCESS:
      baseDataInnerState = {
        sources: action.payload,
      };
      break;
    case FETCH_LEVELS_SUCCESS: {
      const levels = action.payload.map(l => {
        switch (l.name) {
          case 'Ruby':
            return { ...l, price: 5297, posts: 108, texts: 400, emailCredits: 200 };
          case 'Diamond':
            return { ...l, price: 3297, posts: 64, texts: 300, emailCredits: 150 };
          case 'Platinum':
            return { ...l, price: 1797, posts: 32, texts: 200, emailCredits: 100 };
          case 'Gold':
            return { ...l, price: 797, posts: 10, texts: 50, emailCredits: 25 };
          case 'Silver':
            return { ...l, price: 297, posts: 3, texts: 15, emailCredits: 7 };
          case 'Bronze':
            return { ...l, price: 97, posts: 1, texts: 5, emailCredits: 2 };
          default:
            return l;
        }
      });
      baseDataInnerState = {
        levels,
      };
      break;
    }
    case FETCH_COUPON:
      baseDataInnerState = {
        coupon: {
          details: null,
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_COUPON_SUCCESS:
      baseDataInnerState = {
        coupon: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_COUPON_ERROR:
      baseDataInnerState = {
        coupon: {
          details: null,
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case CLEAR_COUPON:
      baseDataInnerState = {
        coupon: {
          details: null,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_REWARDS:
      baseDataInnerState = {
        rewards: [],
      };
      break;
    case FETCH_REWARDS_SUCCESS:
      baseDataInnerState = {
        rewards: action.payload,
      };
      break;
    case FETCH_REWARDS_ERROR:
      baseDataInnerState = {
        rewards: [],
      };
      break;
    case FETCH_REWARDS_BALANCE_SUCCESS: {
      const { siteId } = action;
      baseDataInnerState = {
        rewardsBalance: {
          ...state.baseData.rewardsBalance,
          [siteId || 0]: action.payload,
        },
      };
      break;
    }
    case REDEEM_SUCCESS: {
      const { siteId, balance, points } = action.payload;
      baseDataInnerState = {
        rewardsBalance: {
          ...state.baseData.rewardsBalance,
          [siteId]: balance,
          0: parseInt(state.baseData.rewardsBalance[0]) + parseInt(points),
        },
      };
      break;
    }
    case FETCH_PROTOCOLS:
      baseDataInnerState = {
        protocols: {
          details: [],
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_PROTOCOLS_SUCCESS:
      baseDataInnerState = {
        protocols: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_PROTOCOLS_ERROR:
      baseDataInnerState = {
        protocols: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case FETCH_CARDS:
      baseDataInnerState = {
        cards: {
          details: null,
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_CARDS_SUCCESS:
      baseDataInnerState = {
        cards: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_CARDS_ERROR:
      baseDataInnerState = {
        cards: {
          details: null,
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case SAVE_CARD:
      baseDataInnerState = {
        savedCard: {
          details: null,
          saving: true,
          error: null,
        },
      };
      break;
    case SAVE_CARD_SUCCESS:
      cardsCollection.data.push(action.payload);
      baseDataInnerState = {
        cards: {
          details: cardsCollection,
          fetching: false,
          error: null,
        },
        savedCard: {
          details: action.payload,
          saving: false,
          error: null,
        },
      };
      break;
    case SAVE_CARD_ERROR:
      baseDataInnerState = {
        savedCard: {
          details: null,
          saving: false,
          error: action.payload,
        },
      };
      break;
    case DELETE_CARD:
      baseDataInnerState = {
        deletedCard: {
          details: null,
          deleting: true,
          error: null,
        },
      };
      break;
    case DELETE_CARD_SUCCESS:
      remove(cardsCollection.data, { id: action.payload.id });
      baseDataInnerState = {
        cards: {
          details: cardsCollection,
          fetching: false,
          error: null,
        },
        deletedCard: {
          details: action.payload,
          deleting: false,
          error: null,
        },
      };
      break;
    case DELETE_CARD_ERROR:
      baseDataInnerState = {
        deletedCard: {
          details: null,
          deleting: false,
          error: action.payload,
        },
      };
      break;
    case ADD_CREDITS:
      baseDataInnerState = {
        addCredits: {
          details: null,
          adding: true,
          error: null,
        },
      };
      break;
    case ADD_CREDITS_SUCCESS:
      cardsCollection.data.push(action.payload);
      baseDataInnerState = {
        addCredits: {
          details: action.payload,
          adding: false,
          error: null,
        },
      };
      break;
    case ADD_CREDITS_ERROR:
      baseDataInnerState = {
        addCredits: {
          details: null,
          adding: false,
          error: action.payload,
        },
      };
      break;
    case FETCH_CLIENT_SITES:
      baseDataInnerState = {
        sites: {
          details: [],
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_CLIENT_SITES_SUCCESS:
      baseDataInnerState = {
        sites: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_CLIENT_SITES_ERROR:
      baseDataInnerState = {
        sites: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case FETCH_SITE_PATIENTS:
      baseDataInnerState = {
        sitePatients: {
          details: state.baseData.sitePatients.details,
          fetching: true,
          error: null,
        },
        globalPMSPaginationOptions: {
          hasMoreItems: false,
          page: state.baseData.globalPMSPaginationOptions.page,
        },
      };
      break;
    case FETCH_SITE_PATIENTS_SUCCESS:
      if (action.page === 1) {
        newPatientsList = action.payload;
      } else {
        newPatientsList = patientsCopy.concat(action.payload);
      }
      baseDataInnerState = {
        sitePatients: {
          details: newPatientsList,
          fetching: false,
          error: null,
        },
        globalPMSPaginationOptions: {
          hasMoreItems: action.hasMoreItems,
          page: action.page,
        },
      };
      break;
    case FETCH_SITE_PATIENTS_ERROR:
      baseDataInnerState = {
        sitePatients: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case UPDATE_SITE_PATIENTS:
      unreadCount = 0;
      sitePatientsCollection = state.baseData.sitePatients.details.map(item => {
        const patientData = item;
        if (patientData.id === action.newMessage.patient_id && patientData.study_id === action.newMessage.study_id) {
          const countUnread = patientData.count_unread;
          if (countUnread) {
            if (action.newMessage.twilioTextMessage.direction === 'outbound-api') {
              patientData.count_unread = parseInt(countUnread);
            } else {
              patientData.count_unread = parseInt(countUnread) + 1;
              unreadCount = 1;
            }
          } else if (action.newMessage.twilioTextMessage.direction === 'outbound-api') {
            patientData.count_unread = 0;
          } else {
            patientData.count_unread = 1;
            unreadCount = 1;
          }
          patientData.twtm_max_date_created = action.newMessage.twilioTextMessage.dateCreated;
          patientData.last_message_body = action.newMessage.twilioTextMessage.body;
          patientData.last_message_date = action.newMessage.twilioTextMessage.dateCreated;
        }
        return patientData;
      });
      sitePatientsCollection = sortBy(sitePatientsCollection, item => item.twtm_max_date_created);
      baseDataInnerState = {
        sitePatients: {
          details: sitePatientsCollection,
          fetching: false,
          error: null,
        },
        patientMessages: {
          details: state.baseData.patientMessages.details,
          fetching: false,
          error: null,
          stats: {
            textTotal: state.baseData.patientMessages.stats.textTotal,
            emailsSent: state.baseData.patientMessages.stats.emailsSent,
            unreadTexts: state.baseData.patientMessages.stats.unreadTexts,
          },
        },
      };
      break;
    case MARK_AS_READ_PATIENT_MESSAGES:
      sitePatientsCollection = map(state.baseData.sitePatients.details, item => {
        const patientData = Object.assign({}, item);
        if (patientData.id === action.patientId) {
          unreadCount = patientData.count_unread;
          patientData.count_unread = 0;
        }
        return patientData;
      });
      baseDataInnerState = {
        sitePatients: {
          details: sitePatientsCollection,
          fetching: false,
          error: null,
        },
        patientMessages: {
          details: state.baseData.patientMessages.details,
          fetching: false,
          error: null,
          stats: {
            textTotal: state.baseData.patientMessages.stats.textTotal || 0,
            emailsSent: state.baseData.patientMessages.stats.emailsSent || 0,
            unreadTexts: (state.baseData.patientMessages.stats.unreadTexts - unreadCount) || 0,
          },
        },
      };
      break;
    case GET_CNS_INFO:
      baseDataInnerState = {
        cnsInfo: {
          details: state.baseData.cnsInfo.details,
          fetching: true,
          error: null,
        },
      };
      break;
    case GET_CNS_INFO_ERROR:
      baseDataInnerState = {
        cnsInfo: {
          details: {},
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case GET_CNS_INFO_SUCCESS:
      baseDataInnerState = {
        cnsInfo: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case SUBMIT_CNS:
      baseDataInnerState = {
        cnsSubmitProcess: {
          submitting: true,
          error: null,
        },
      };
      break;
    case SUBMIT_CNS_SUCCESS:
      baseDataInnerState = {
        cnsSubmitProcess: {
          submitting: false,
          error: null,
        },
      };
      break;
    case SUBMIT_CNS_ERROR:
      baseDataInnerState = {
        cnsSubmitProcess: {
          submitting: false,
          error: action.payload,
        },
      };
      break;
    case FETCH_CLIENT_CREDITS:
      baseDataInnerState = {
        clientCredits: {
          details: state.baseData.clientCredits.details,
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_CLIENT_CREDITS_SUCCESS:
      baseDataInnerState = {
        clientCredits: {
          details: {
            customerCredits: state.baseData.clientCredits.details.customerCredits,
            emailCredits: state.baseData.clientCredits.details.emailCredits,
            ...action.payload.customerCredits,
          },
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_CLIENT_CREDITS_ERROR:
      baseDataInnerState = {
        clientCredits: {
          details: state.baseData.clientCredits.details,
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case FETCH_PATIENT_MESSAGES:
      baseDataInnerState = {
        patientMessages: {
          ...state.baseData.patientMessages,
          details: [],
          fetching: true,
          error: null,
          stats: {
            textTotal: state.baseData.patientMessages.stats.textTotal || 0,
            emailsSent: state.baseData.patientMessages.stats.emailsSent || 0,
            unreadTexts: state.baseData.patientMessages.stats.unreadTexts || 0,
          },
        },
      };
      break;
    case FETCH_PATIENT_MESSAGES_SUCCESS:
      baseDataInnerState = {
        patientMessages: {
          ...state.baseData.patientMessages,
          details: action.payload,
          fetching: false,
          error: null,
          stats: {
            textTotal: state.baseData.patientMessages.stats.textTotal || 0,
            emailsSent: state.baseData.patientMessages.stats.emailsSent || 0,
            unreadTexts: state.baseData.patientMessages.stats.unreadTexts || 0,
          },
        },
      };
      break;
    case ADD_MESSAGES_COUNT_STAT:
      baseDataInnerState = {
        patientMessages: {
          ...state.baseData.patientMessages,
          details: state.baseData.patientMessages.details,
          fetching: false,
          error: null,
          stats: {
            textTotal: state.baseData.patientMessages.stats.textTotal || 0,
            emailsSent: state.baseData.patientMessages.stats.emailsSent || 0,
            unreadTexts: (parseInt(state.baseData.patientMessages.stats.unreadTexts) + action.payload) || 0,
          },
        },
      };
      break;
    case DELETE_MESSAGES_COUNT_STAT:
      baseDataInnerState = {
        patientMessages: {
          ...state.baseData.patientMessages,
          details: state.baseData.patientMessages.details,
          fetching: false,
          error: null,
          stats: {
            textTotal: state.baseData.patientMessages.stats.textTotal || 0,
            emailsSent: state.baseData.patientMessages.stats.emailsSent || 0,
            unreadTexts: (state.baseData.patientMessages.stats.unreadTexts - action.payload) || 0,
          },
        },
      };
      break;
    case FETCH_PATIENT_MESSAGES_ERROR:
      baseDataInnerState = {
        patientMessages: {
          ...state.baseData.patientMessages,
          details: [],
          fetching: false,
          error: action.payload,
          stats: {
            textTotal: 0,
            emailsSent: 0,
            unreadText: 0,
          },
        },
      };
      break;
    case UPDATE_PATIENT_MESSAGES:
      patientMessagesCollection = concat(state.baseData.patientMessages.details, action.newMessage);
      baseDataInnerState = {
        patientMessages: {
          ...state.baseData.patientMessages,
          details: patientMessagesCollection,
          fetching: false,
          error: null,
          stats: {
            textTotal: state.baseData.patientMessages.stats.textTotal || 0,
            emailsSent: state.baseData.patientMessages.stats.emailsSent || 0,
            unreadTexts: state.baseData.patientMessages.stats.unreadText || 0,
          },
        },
      };
      break;
    case FETCH_PATIENT_MESSAGE_UNREAD_COUNT_SUCCESS:
      baseDataInnerState = {
        patientMessages: {
          ...state.baseData.patientMessages,
          stats: {
            textTotal: action.payload.textTotal || 0,
            emailsSent: action.payload.emailsSent || 0,
            unreadTexts: action.payload.unreadTexts || 0,
          },
        },
      };
      break;
    case SEARCH_SITE_PATIENTS_SUCCESS:
      sitePatientsCollection = map(state.baseData.sitePatients.details, item => {
        let patientData = null;
        patientData = item;
        patientData.show = false;
        forEach(payload, dataItem => {
          if (dataItem.id === patientData.id && dataItem.study_id === patientData.study_id) {
            patientData.show = true;
          }
        });
        return patientData;
      });
      // return state;
      baseDataInnerState = {
        sitePatients: {
          details: sitePatientsCollection,
          fetching: false,
          error: null,
        },
      };
      break;
    case SEARCH_SITE_PATIENTS_ERROR:
      return state;
    case FETCH_CLIENT_ROLES:
      baseDataInnerState = {
        clientRoles: {
          details: [],
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_CLIENT_ROLES_SUCCESS:
      baseDataInnerState = {
        clientRoles: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_CLIENT_ROLES_ERROR:
      baseDataInnerState = {
        clientRoles: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case FETCH_SITE:
      baseDataInnerState = {
        selectedSite: {
          details: null,
          id: action.id,
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_SITE_SUCCESS:
      baseDataInnerState = {
        selectedSite: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_SITE_ERROR:
      baseDataInnerState = {
        selectedSite: {
          details: null,
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case FETCH_USER:
      baseDataInnerState = {
        selectedUser: {
          details: null,
          id: action.id,
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_USER_SUCCESS:
      baseDataInnerState = {
        selectedUser: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_USER_ERROR:
      baseDataInnerState = {
        selectedUser: {
          details: null,
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case CLEAR_SELECTED_SITE:
      baseDataInnerState = {
        selectedSite: {
          details: null,
          fetching: false,
          error: null,
        },
      };
      break;
    case CLEAR_SELECTED_USER:
      baseDataInnerState = {
        selectedUser: {
          details: null,
          fetching: false,
          error: null,
        },
      };
      break;
    case DELETE_USER:
      baseDataInnerState = {
        deletedUser: {
          details: null,
          deleting: true,
          error: null,
        },
      };
      break;
    case DELETE_USER_SUCCESS:
      forEach(sitesCopy, item => {
        forEach(item.roles, role => {
          if (role.user_id === action.payload.id) {
            temRoleID = role.id;
            return false;
          }
          return true;
        });
      });
      forEach(sitesCopy, item => {
        return remove(item.roles, { id: temRoleID }).length <= 0;
      });

      forEach(clientRolesCollection, item => {
        if (item.user_id === action.payload.id) {
          temRoleID = item.id;
          return false;
        }
        return true;
      });
      remove(clientRolesCollection, { id: temRoleID });

      baseDataInnerState = {
        deletedUser: {
          details: action.payload,
          deleting: false,
          error: null,
        },
        sites: {
          details: sitesCopy,
          fetching: false,
          error: null,
        },
        clientRoles: {
          details: clientRolesCollection,
          fetching: false,
          error: null,
        },
        selectedUser: {
          details: null,
          fetching: false,
          error: null,
        },
      };
      break;
    case DELETE_USER_ERROR:
      baseDataInnerState = {
        deletedUser: {
          details: null,
          deleting: false,
          error: action.payload,
        },
        selectedUser: {
          details: null,
          fetching: false,
          error: null,
        },
      };
      break;
    case SAVE_SITE:
      baseDataInnerState = {
        savedSite: {
          details: null,
          saving: true,
          error: null,
        },
      };
      break;
    case SAVE_SITE_SUCCESS:
      foundIndex = findIndex(sitesCopy, { id: action.payload.id });
      const payload = {
        ...action.payload,
      };
      if (!action.payload.roles) {
        payload.roles = [];
      }
      if (foundIndex === -1) {
        sitesCopy.push(payload);
      } else {
        payload.roles = sitesCopy[foundIndex].roles;
        sitesCopy[foundIndex] = payload;
      }
      baseDataInnerState = {
        savedSite: {
          details: payload,
          saving: false,
          error: null,
        },
        sites: {
          details: sitesCopy,
          fetching: false,
          error: null,
        },
        selectedSite: {
          details: null,
          fetching: false,
          error: null,
        },
      };
      break;
    case SAVE_SITE_ERROR:
      baseDataInnerState = {
        savedSite: {
          details: null,
          saving: false,
          error: action.payload,
        },
        selectedSite: {
          details: null,
          fetching: false,
          error: null,
        },
      };
      break;
    case SAVE_USER:
      baseDataInnerState = {
        savedUser: {
          details: null,
          saving: true,
          error: null,
        },
      };
      break;
    case SAVE_USER_SUCCESS:
      if (action.payload.userType === 'admin') {
        forEach(sitesCopy, item => {
          foundIndex = findIndex(item.roles, { id: action.payload.userResultData.id });
          if (foundIndex > -1) {
            item.roles.splice(foundIndex, 1);
            foundIndex = -1;
            return false;
          }
          return true;
        });
      } else if (action.payload.userType === 'nonAdmin') {
        forEach(sitesCopy, item => {
          if (item.id === action.payload.userResultData.siteId) {
            foundIndex = findIndex(item.roles, { id: action.payload.userResultData.id });
            if (foundIndex !== -1) {
              item.roles[foundIndex].user = action.payload.userResultData.user; // eslint-disable-line
            } else {
              item.roles.splice(foundIndex, 1);
            }
            return false;
          }
          return true;
        });
        if (foundIndex < 0) {
          foundIndex = findIndex(sitesCopy, { id: action.payload.userResultData.siteId });
          if (foundIndex > -1) {
            sitesCopy[foundIndex].roles.push(action.payload.userResultData);
          }
        }
      }
      foundIndex = findIndex(clientRolesCollection, (item) => (item.user_id === action.payload.userResultData.user.id));
      if (action.payload.userType === 'admin') {
        if (foundIndex < 0) {
          clientRolesCollection.push(action.payload.userResultData);
        } else {
          clientRolesCollection[foundIndex] = action.payload.userResultData;
        }
      } else if (action.payload.userType === 'nonAdmin') {
        if (foundIndex > -1) {
          clientRolesCollection[foundIndex] = action.payload.userResultData;
        }
      }
      // if (action.payload.userResultData.header === 'Add User') {
      //   // if (action.payload.userResultData.siteId && action.payload.userResultData.siteId !== '0') {
      //   //   foundIndex = findIndex(sitesCopy, { id: action.payload.userResultData.siteId });
      //   //   sitesCopy[foundIndex].roles.push(action.payload.userResultData.user);
      //   // } else {
      //   clientRolesCollection.push(action.payload.userResultData);
      //   // }
      // }

      baseDataInnerState = {
        savedUser: {
          details: action.payload,
          saving: false,
          error: null,
        },
        sites: {
          details: sitesCopy,
          fetching: false,
          error: null,
        },
        clientRoles: {
          details: clientRolesCollection,
          fetching: false,
          error: null,
        },
        selectedUser: {
          details: null,
          fetching: false,
          error: null,
        },
      };
      break;
    case SAVE_USER_ERROR:
      baseDataInnerState = {
        savedUser: {
          details: null,
          saving: false,
          error: action.payload,
        },
        selectedUser: {
          details: null,
          fetching: false,
          error: null,
        },
      };
      break;
    case GET_CREDITS_PRICE_SUCCESS:
      baseDataInnerState = {
        creditsPrice: action.payload,
      };
      break;
    case CHANGE_USERS_TIMEZONE:
      baseDataInnerState = {
        changeUsersTimezoneState: {
          saving: true,
        },
      };
      break;
    case CHANGE_USERS_TIMEZONE_SUCCESS:
      baseDataInnerState = {
        changeUsersTimezoneState: {
          saving: false,
        },
      };

      resultState = {
        ...state,
        userData: {
          ...state.userData,
          timezone: action.payload.timezone,
          city: action.payload.city,
          address: action.payload.address,
          needSetup: action.payload.needSetup,
        },
        baseData: {
          ...state.baseData,
          ...baseDataInnerState,
        },
      };
      break;
    case UPDATE_USER_SUCCESS:
      resultState = {
        ...state,
        userData: Object.assign(state.userData, action.payload),
      };
      break;
    case CHANGE_USERS_TIMEZONE_ERROR:
      baseDataInnerState = {
        changeUsersTimezoneState: {
          saving: false,
        },
      };
      break;
    case PATIENT_CATEGORIES_FETCHED:
      baseDataInnerState = {
        patientCategories: action.payload,
      };
      break;
    case FETCH_PATIENT_CATEGORIES_ERROR:
      baseDataInnerState = {
        patientCategories: [],
      };
      break;
    case GET_TIMEZONE:
      baseDataInnerState = {
        formsTempTimezone: '',
      };
      break;
    case GET_TIMEZONE_SUCCESS:
      baseDataInnerState = {
        formsTempTimezone: action.payload.timezone,
      };
      break;
    case GET_TIMEZONE_ERROR:
      baseDataInnerState = {
        formsTempTimezone: '',
      };
      break;
    default:
      return state;
  }

  if (!resultState) {
    resultState = {
      ...state,
      baseData: {
        ...state.baseData,
        ...baseDataInnerState,
      },
    };
  }

  return resultState;
}
