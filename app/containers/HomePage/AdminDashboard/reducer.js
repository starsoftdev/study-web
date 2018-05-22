import _ from 'lodash';
import { normalizePhoneDisplay } from '../../../../app/common/helper/functions';

import {
  FETCH_NOTE,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_ERROR,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_ERROR,
  EDIT_NOTE,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_ERROR,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
  FETCH_STUDIES_DASHBOARD,
  FETCH_STUDIES_DASHBOARD_SUCCESS,
  FETCH_STUDIES_DASHBOARD_ERROR,
  FETCH_FIVE_9_LIST,
  FETCH_FIVE_9_LIST_SUCCESS,
  FETCH_FIVE_9_LIST_ERROR,
  FETCH_TOTALS_DASHBOARD,
  FETCH_TOTALS_DASHBOARD_SUCCESS,
  FETCH_TOTALS_DASHBOARD_ERROR,
  FETCH_SITE_LOCATIONS_SUCCESS,
  CLEAR_FILTERS,
  UPDATE_DASHBOARD_STUDY_SUCCESS,
  FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS,
  FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS_SUCCESS,
  FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS_ERROR,
  FETCH_STUDY_CAMPAIGNS,
  FETCH_STUDY_CAMPAIGNS_ERROR,
  FETCH_STUDY_CAMPAIGNS_SUCCESS,
  CHANGE_STUDY_STATUS_SUCCESS,
  TOGGLE_STUDY,
  TOGGLE_ALL_STUDIES,

  UPDATE_THANK_YOU_PAGE,
  UPDATE_THANK_YOU_PAGE_SUCCESS,
  UPDATE_THANK_YOU_PAGE_ERROR,
  RESET_THANK_YOU_PAGE_STATE,

  UPDATE_PATIENT_THANK_YOU_EMAIL,
  UPDATE_PATIENT_THANK_YOU_EMAIL_SUCCESS,
  UPDATE_PATIENT_THANK_YOU_EMAIL_ERROR,
  RESET_PATIENT_THANK_YOU_EMAIL_STATE,

  UPDATE_FACEBOOK_LANDING_PAGE,
  UPDATE_FACEBOOK_LANDING_PAGE_SUCCESS,
  UPDATE_FACEBOOK_LANDING_PAGE_ERROR,

  UPDATE_LANDING_PAGE,
  UPDATE_LANDING_PAGE_SUCCESS,
  UPDATE_LANDING_PAGE_ERROR,
  RESET_LANDING_PAGE_STATE,

  CHANGE_STUDY_AD,
  CHANGE_STUDY_AD_SUCCESS,
  CHANGE_STUDY_AD_ERROR,

  REMOVE_STUDY_AD,
  REMOVE_STUDY_AD_SUCCESS,
  REMOVE_STUDY_AD_ERROR,

  RESET_CHANGE_STUDY_AD_STATE,
  FETCH_MESSAGING_NUMBERS,
  FETCH_MESSAGING_NUMBERS_SUCCESS,
  FETCH_MESSAGING_NUMBERS_ERROR,
  SET_HOVER_ROW_INDEX,

  FETCH_CUSTOM_NOTIFICATION_EMAILS,
  FETCH_CUSTOM_NOTIFICATION_EMAILS_SUCCESS,
  FETCH_CUSTOM_NOTIFICATION_EMAILS_ERROR,

  FETCH_STUDY_INDICATION_TAG,
  FETCH_STUDY_INDICATION_TAG_SUCCESS,
  FETCH_STUDY_INDICATION_TAG_ERROR,

  FETCH_CAMPAIGNS_BY_STUDY,
  FETCH_CAMPAIGNS_BY_STUDY_SUCCESS,
  FETCH_CAMPAIGNS_BY_STUDY_ERROR,

  EDIT_CAMPAIGN,
  EDIT_CAMPAIGN_SUCCESS,
  EDIT_CAMPAIGN_ERROR,

  DELETE_CAMPAIGN,
  DELETE_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN_ERROR,

  EDIT_STUDY_LEAD_SOURCES,
  EDIT_STUDY_LEAD_SOURCES_SUCCESS,
  EDIT_STUDY_LEAD_SOURCES_ERROR,

  DELETE_STUDY_LEAD_SOURCE,
  DELETE_STUDY_LEAD_SOURCE_ERROR,
  DELETE_STUDY_LEAD_SOURCE_SUCCESS,
} from './constants';

import {
  FETCH_LEVELS_SUCCESS,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_CRO_SUCCESS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_PROTOCOLS_SUCCESS,
  FETCH_USERS_BY_ROLE_SUCCESS,
  FETCH_STUDY_LEAD_SOURCES,
  FETCH_STUDY_LEAD_SOURCES_SUCCESS,
  FETCH_STUDY_LEAD_SOURCES_ERROR,
} from '../../App/constants';

const initialState = {
  note: {
    details: [],
    fetching: false,
    error: null,
  },
  editNoteProcess: {
    saving: false,
    deleting: false,
    error: null,
  },
  values: {
    filters: [],
  },
  studies: {
    details: [],
    fetching: false,
    error: null,
  },
  five9List: {
    details: [],
    fetching: false,
    error: null,
  },
  totals: {
    details: {},
    fetching: false,
    error: null,
  },
  updateLandingPageProcess: {
    success: false,
    saving: false,
    error: null,
  },
  updateFacebookLandingPageProcess: {
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
  changeStudyAdProcess: {
    success: false,
    saving: false,
    error: null,
  },
  allClientUsers: {
    details: [],
    fetching: false,
    error: null,
  },
  allCustomNotificationEmails: {
    details: [],
    fetching: false,
    error: null,
  },
  taggedIndicationsForStudy: {
    details: [],
    fetching: false,
    error: null,
  },
  updateTaggedIndicationsForStudyProcess: {
    success: false,
    saving: false,
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
  campaigns: {
    details: [],
    fetching: false,
    error: null,
  },
  editCampaignProcess: {
    saving: false,
    error: false,
  },
  deleteCampaignProcess: {
    deleting: false,
    error: false,
  },
  deletedLeadSource: {
    index: null,
    details: null,
  },
  deleteStudyLeadSourceProcess: {
    deleting: false,
    error: false,
  },
  editStudyLeadSourcesProcess: {
    saving: false,
    error: false,
  },
  studyLeadSources: {
    details: [],
    fetching: false,
    error: null,
  },
  updatedStudyAd: null,
  removedStudyAd: null,
  levels: [],
  siteLocations: [],
  siteNames: [],
  indications: [],
  sponsors: [],
  protocols: [],
  cro: [],
  usersByRoles: {},
  hoverRowIndex: null,
};

export default function dashboardPageReducer(state = initialState, action) {
  let totalActive = 0;
  let totalInactive = 0;
  let newStudiesList = [];
  let foundUserIndex = null;

  switch (action.type) {

    case FETCH_STUDY_LEAD_SOURCES:
      return {
        ...state,
        studyLeadSources: {
          details: state.studyLeadSources.details,
          fetching: true,
          error: null,
        },
      };

    case FETCH_STUDY_LEAD_SOURCES_SUCCESS:
      return {
        ...state,
        studyLeadSources: {
          details: action.payload.map((item) => {
            return {
              source: { value: item.source_id, label: item.type },
              source_name: item.source_name,
              studySourceId: item.studySourceId,
              landingPageId: item.landingPageId,
              recruitmentPhone: normalizePhoneDisplay(item.recruitmentPhone),
              messagingNumber: item.phoneNumberId ? { value: item.phoneNumberId, label:item.phoneNumber } : null,
              googleUrl: item.googleUrl,
              url: item.url,
              studyId: item.studyId,
              landingPageUrl: item.landingPageUrl,
              patientsCount: parseInt(item.patientsCount),
            };
          }),
          fetching: false,
          error: null,
        },
      };

    case FETCH_STUDY_LEAD_SOURCES_ERROR:
      return {
        ...state,
        studyLeadSources: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };

    case EDIT_STUDY_LEAD_SOURCES:
      return {
        ...state,
        editStudyLeadSourcesProcess: {
          saving: true,
          error: false,
        },
      };

    case EDIT_STUDY_LEAD_SOURCES_SUCCESS: {
      const studiesCopy = state.studies.details.map(study => {
        if (study.study_id === action.studyId) {
          return {
            ...study,
            callTracking: action.callTracking,
          };
        } else {
          return study;
        }
      });

      return {
        ...state,
        editStudyLeadSourcesProcess: {
          saving: false,
          error: false,
        },
        studyLeadSources: {
          details: action.leadSources.map((item) => {
            return {
              ...item,
            };
          }),
          fetching: false,
          error: null,
        },
        studies: {
          details: studiesCopy,
          fetching: false,
          error: null,
        },
      };
    }
    case EDIT_STUDY_LEAD_SOURCES_ERROR:
      return {
        ...state,
        editStudyLeadSourcesProcess: {
          saving: false,
          error: true,
        },
      };

    case DELETE_STUDY_LEAD_SOURCE:
      return {
        ...state,
        deleteStudyLeadSourceProcess: {
          deleting: true,
          error: false,
        },
        deletedLeadSource: {
          index: null,
          details: null,
        },
      };

    case DELETE_STUDY_LEAD_SOURCE_SUCCESS:
      return {
        ...state,
        deleteStudyLeadSourceProcess: {
          deleting: false,
          error: false,
        },
        deletedLeadSource: {
          index: action.index,
          details: action.leadSource,
        },
      };

    case DELETE_STUDY_LEAD_SOURCE_ERROR:
      return {
        ...state,
        deleteStudyLeadSourceProcess: {
          deleting: false,
          error: true,
        },
        deletedLeadSource: {
          index: null,
          details: null,
        },
      };

    case FETCH_STUDY_INDICATION_TAG:
      return {
        ...state,
        taggedIndicationsForStudy: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_STUDY_INDICATION_TAG_SUCCESS:
      return {
        ...state,
        taggedIndicationsForStudy: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_STUDY_INDICATION_TAG_ERROR:
      return {
        ...state,
        taggedIndicationsForStudy: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_NOTE:
      return {
        ...state,
        note: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_NOTE_SUCCESS:
      return {
        ...state,
        note: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_NOTE_ERROR:
      return {
        ...state,
        note: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case ADD_NOTE:
      return {
        ...state,
        editNoteProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case ADD_NOTE_SUCCESS: {
      const newNotes = [
        ...state.note.details,
      ];
      newNotes.push(action.payload);
      return {
        ...state,
        note: {
          details: newNotes,
          fetching: false,
          error: action.payload,
        },
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    }
    case ADD_NOTE_ERROR:
      return {
        ...state,
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case EDIT_NOTE:
      return {
        ...state,
        editNoteProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case EDIT_NOTE_SUCCESS: {
      const newNotes = [
        ...state.note.details,
      ];
      foundUserIndex = _.findIndex(newNotes, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newNotes.splice(foundUserIndex, 1, action.payload);
      }
      return {
        ...state,
        note: {
          details: newNotes,
          fetching: false,
          error: action.payload,
        },
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    }
    case EDIT_NOTE_ERROR:
      return {
        ...state,
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case DELETE_NOTE:
      return {
        ...state,
        editNoteProcess: {
          saving: false,
          deleting: true,
          error: null,
        },
      };
    case DELETE_NOTE_SUCCESS: {
      const newNotes = [
        ...state.note.details,
      ];
      foundUserIndex = _.findIndex(newNotes, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newNotes.splice(foundUserIndex, 1);
      }
      return {
        ...state,
        note: {
          details: newNotes,
          fetching: false,
          error: action.payload,
        },
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    }
    case DELETE_NOTE_ERROR:
      return {
        ...state,
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
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
        const studiesCopy = [
          ...state.studies.details,
        ];
        newStudiesList = studiesCopy.concat(action.payload.studies);
      }
      return {
        ...state,
        studies: {
          details: newStudiesList,
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
    case FETCH_FIVE_9_LIST:
      return {
        ...state,
        five9List: {
          details: state.five9List.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_FIVE_9_LIST_SUCCESS:
      return {
        ...state,
        five9List: {
          details: action.payload.details,
          fetching: false,
          error: null,
        },
      };
    case FETCH_FIVE_9_LIST_ERROR:
      return {
        ...state,
        five9List: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_TOTALS_DASHBOARD:
      return {
        ...state,
        totals: {
          details: state.totals.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_TOTALS_DASHBOARD_SUCCESS:
      return {
        ...state,
        totals: {
          details: action.payload.totals,
          fetching: false,
          error: true,
        },
      };
    case FETCH_TOTALS_DASHBOARD_ERROR:
      return {
        ...state,
        totals: {
          details: action.payload.totals,
          fetching: false,
          error: null,
        },
      };
    case FETCH_LEVELS_SUCCESS:
      return {
        ...state,
        levels: action.payload,
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
    case UPDATE_DASHBOARD_STUDY_SUCCESS: {
      let studiesCopy;
      if (action.updatedStudyParams.site) {
        studiesCopy = state.studies.details.map(study => {
          if (study.study_id === action.studyId) {
            let emailNotifications;
            if (action.updatedStudyParams.emailNotifications) {
              emailNotifications = action.formValues.emailNotifications.filter(emailNotification => {
                return emailNotification.isChecked;
              }).map(emailNotification => {
                return emailNotification.userId;
              });
            } else {
              emailNotifications = study.emailNotifications;
            }
            // map the messaging number back
            let textNumberId = study.text_number_id;
            let phoneNumber = study.phone_number;
            if (action.updatedStudyParams.messagingNumber) {
              textNumberId = action.updatedStudyParams.messagingNumber;
              const phoneNumberObject = _.find(action.formValues.messagingNumbers, { value: action.updatedStudyParams.messagingNumber });
              phoneNumber = phoneNumberObject.label;
            }
            return {
              ...study,
              ...action.updatedStudyParams,
              emailNotifications,
              text_number_id: textNumberId,
              phone_number: phoneNumber,
            };
          } else {
            return study;
          }
        });
      } else {
        studiesCopy = state.studies.details.map(study => {
          if (study.study_id === action.studyId) {
            let emailNotifications;
            if (action.updatedStudyParams.emailNotifications) {
              // combine the updated study objects because we then need to transform it out
              emailNotifications = action.formValues.emailNotifications.filter(emailNotification => {
                return emailNotification.isChecked;
              }).map(emailNotification => {
                return emailNotification.userId;
              });
            } else {
              emailNotifications = study.emailNotifications;
            }
            return {
              ...study,
              ...action.updatedStudyParams,
              emailNotifications,
            };
          } else {
            return study;
          }
        });
      }

      const study = _.find(studiesCopy, (item) => (item.study_id === action.studyId));
      if (study && typeof action.updatedStudyParams.isPublic !== 'undefined') {
        study.isPublic = action.updatedStudyParams.isPublic;
        if (study.isPublic) {
          totalActive++;
          totalInactive--;
        } else {
          totalActive--;
          totalInactive++;
        }
      }
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
    }
    case FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS:
      return {
        ...state,
        allClientUsers: {
          details: state.allClientUsers.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        allClientUsers: {
          details: action.payload.map(e => (e.isChecked ? e : state.allClientUsers.details.find((el) => (el.user_id === e.user_id && el.isChecked)) || e)),
          fetching: false,
          error: null,
        },
      };
    case FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS_ERROR:
      return {
        ...state,
        allClientUsers: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_CUSTOM_NOTIFICATION_EMAILS:
      return {
        ...state,
        allCustomNotificationEmails: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_CUSTOM_NOTIFICATION_EMAILS_SUCCESS:
      return {
        ...state,
        allCustomNotificationEmails: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_CUSTOM_NOTIFICATION_EMAILS_ERROR:
      return {
        ...state,
        allCustomNotificationEmails: {
          details: [],
          fetching: false,
          error: action.payload,
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
    case CHANGE_STUDY_STATUS_SUCCESS: {
      const studiesCopy = [
        ...state.studies.details,
      ];
      // iterate through every study
      _.forEach(studiesCopy, (study, key) => {
        // then iterate through the response of studies and re-calculate the stats
        const studyIndex = _.findIndex(action.payload.studies, (item) => (item === study.study_id));
        // check for a nonexistent index, otherwise set the study status accordingly
        if (studyIndex !== -1) {
          studiesCopy[key].isPublic = action.payload.status === 'active';
        }
        if (studiesCopy[key].isPublic) {
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
    }
    case TOGGLE_STUDY: {
      const studiesCopy = [
        ...state.studies.details,
      ];
      const study = _.find(studiesCopy, (item) => (action.id === item.study_id));
      if (study) {
        study.selected = action.status;
      }

      return {
        ...state,
        studies: {
          details: studiesCopy,
          fetching: false,
          error: null,
        },
      };
    }
    case TOGGLE_ALL_STUDIES:
      return {
        ...state,
        studies: {
          details: state.studies.details.map(study => ({
            ...study,
            selected: action.status,
          })),
          fetching: false,
          error: null,
        },
      };
    case UPDATE_FACEBOOK_LANDING_PAGE:
      return {
        ...state,
        updateFacebookLandingPageProcess: {
          success: false,
          saving: true,
          error: null,
        },
      };
    case UPDATE_FACEBOOK_LANDING_PAGE_SUCCESS:
      return {
        ...state,
        updateFacebookLandingPageProcess: {
          success: true,
          saving: false,
          error: null,
        },
      };
    case UPDATE_FACEBOOK_LANDING_PAGE_ERROR:
      return {
        ...state,
        updateFacebookLandingPageProcess: {
          success: false,
          saving: false,
          error: true,
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
    case CHANGE_STUDY_AD:
      return {
        ...state,
        updatedStudyAd: null,
        changeStudyAdProcess: {
          success: false,
          saving: true,
          error: null,
        },
      };
    case CHANGE_STUDY_AD_SUCCESS:
      return {
        ...state,
        updatedStudyAd: action.payload.imgSrc,
        changeStudyAdProcess: {
          success: true,
          saving: false,
          error: null,
        },
      };
    case CHANGE_STUDY_AD_ERROR:
      return {
        ...state,
        updatedStudyAd: null,
        changeStudyAdProcess: {
          success: false,
          saving: false,
          error: true,
        },
      };
    case REMOVE_STUDY_AD:
      return {
        ...state,
        removedStudyAdId: null,
      };
    case REMOVE_STUDY_AD_SUCCESS:
      return {
        ...state,
        removedStudyAdId: action.studyId,
        updatedStudyAd: null,
      };
    case REMOVE_STUDY_AD_ERROR:
      return {
        ...state,
        removedStudyAdId: null,
      };
    case RESET_CHANGE_STUDY_AD_STATE:
      return {
        ...state,
        updatedStudyAd: null,
        changeStudyAdProcess: {
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
    case SET_HOVER_ROW_INDEX:
      return {
        ...state,
        hoverRowIndex: action.index,
      };
    case FETCH_CAMPAIGNS_BY_STUDY:
      return {
        ...state,
        campaigns: {
          details: state.campaigns.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_CAMPAIGNS_BY_STUDY_SUCCESS:
      return {
        ...state,
        campaigns: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_CAMPAIGNS_BY_STUDY_ERROR:
      return {
        ...state,
        campaigns: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case EDIT_CAMPAIGN:
      return {
        ...state,
        editCampaignProcess: {
          saving: true,
          error: null,
        },
      };
    case EDIT_CAMPAIGN_SUCCESS: {
      // updating the campaigns with the edited object
      const updatedCampaigns = state.campaigns.details.map(item => (item.id === action.payload.campaignId
        ? {
          ...item,
          dateFrom: action.payload.dateFrom,
          dateTo: action.payload.dateTo,
          customPatientGoal: action.payload.customPatientGoal,
          patientQualificationSuite: action.payload.patientQualificationSuite,
          level_id: action.payload.levelId,
        } :
        item
      ));
      const studiesCopy = state.studies.details.map(study => {
        if (study.study_id === action.payload.studyId && study.campaign_id === action.payload.campaignId) {
          return {
            ...study,
            campaign_id: action.payload.campaignId,
            campaign_datefrom: action.payload.dateFrom,
            campaign_dateto: action.payload.dateTo,
            campaign_length: action.campaignInfo.campaignLength,
            level_id: action.payload.levelId,
            level_name: action.campaignInfo.levelName,
            custom_patient_goal: action.payload.customPatientGoal,
            five_9_value: action.payload.five9value,
          };
        } else {
          return study;
        }
      });
      return {
        ...state,
        editCampaignProcess: {
          saving: false,
          error: null,
        },
        campaigns: {
          details: updatedCampaigns,
          fetching: false,
          error: null,
        },
        studies: {
          ...state.studies,
          details: studiesCopy,
        },
      };
    }
    case EDIT_CAMPAIGN_ERROR:
      return {
        ...state,
        editCampaignProcess: {
          saving: false,
          error: action.payload,
        },
      };

    case DELETE_CAMPAIGN:
      return {
        ...state,
        deleteCampaignProcess: {
          deleting: true,
          error: null,
        },
      };

    case DELETE_CAMPAIGN_SUCCESS: {
      return {
        ...state,
        deleteCampaignProcess: {
          deleting: false,
          error: null,
        },
      };
    }

    case DELETE_CAMPAIGN_ERROR:
      return {
        ...state,
        deleteCampaignProcess: {
          deleting: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
