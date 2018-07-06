/* eslint-disable comma-dangle, no-case-declarations */

import _ from 'lodash';

import {
  FETCH_NOTE,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_ERROR,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_ERROR,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
  FETCH_LANDING,
  FETCH_LANDING_SUCCESS,
  FETCH_LANDING_ERROR,
  EDIT_PATIENT_THANK_YOU,
  EDIT_PATIENT_THANK_YOU_SUCCESS,
  EDIT_PATIENT_THANK_YOU_ERROR,
  UPDATE_THANK_YOU_PAGE,
  UPDATE_THANK_YOU_PAGE_SUCCESS,
  UPDATE_THANK_YOU_PAGE_ERROR,
  RESET_THANK_YOU_PAGE_STATE,
  UPDATE_FACEBOOK_LANDING_PAGE,
  UPDATE_FACEBOOK_LANDING_PAGE_ERROR,
  UPDATE_FACEBOOK_LANDING_PAGE_SUCCESS,
  UPDATE_LANDING_PAGE,
  UPDATE_LANDING_PAGE_SUCCESS,
  UPDATE_LANDING_PAGE_ERROR,
  RESET_LANDING_PAGE_STATE,
  CHANGE_STUDY_AD,
  CHANGE_STUDY_AD_SUCCESS,
  CHANGE_STUDY_AD_ERROR,
  RESET_CHANGE_STUDY_AD_STATE,
  REMOVE_STUDY_AD,
  REMOVE_STUDY_AD_SUCCESS,
  REMOVE_STUDY_AD_ERROR,
  FETCH_LEVELS_SUCCESS,
  FETCH_LEVELS_ERROR,
  FETCH_CAMPAIGNS_BY_STUDY,
  FETCH_CAMPAIGNS_BY_STUDY_SUCCESS,
  FETCH_CAMPAIGNS_BY_STUDY_ERROR,
  FETCH_FIVE_9_LIST,
  FETCH_FIVE_9_LIST_SUCCESS,
  FETCH_FIVE_9_LIST_ERROR,
  EDIT_CAMPAIGN,
  EDIT_CAMPAIGN_SUCCESS,
  EDIT_CAMPAIGN_ERROR,

  DELETE_CAMPAIGN,
  DELETE_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN_ERROR,
} from './constants';

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
  landing: {
    details: null,
    fetching: true,
    error: null,
  },
  updatePatientThankYouEmailProcess: {
    success: false,
    saving: false,
    error: null,
  },
  editMediaTypesProcess: {
    saving: false,
    error: false,
  },
  updateThankYouPageProcess: {
    success: false,
    saving: false,
    error: null,
  },
  updateFacebookLandingPageProcess: {
    success: false,
    saving: false,
    error: null,
  },
  updateLandingPageProcess: {
    success: false,
    saving: false,
    error: null,
  },
  changeStudyAdProcess: {
    success: false,
    saving: false,
    error: null,
  },
  five9List: {
    details: [],
    fetching: false,
    error: null,
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
  updatedStudyAd: null,
  removedStudyAdId: null,
  levels: [],
};

export default function adminStudyEditReducer(state = initialState, action) {
  let foundUserIndex = null;
  switch (action.type) {
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
    case FETCH_LANDING:
      return {
        ...state,
        landing: {
          details: null,
          fetching: true,
          error: null,
        },
      };
    case FETCH_LANDING_SUCCESS:
      return {
        ...state,
        landing: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_LANDING_ERROR:
      return {
        ...state,
        landing: {
          details: null,
          fetching: false,
          error: action.payload,
        },
      };
    case EDIT_PATIENT_THANK_YOU:
      return {
        ...state,
        updatePatientThankYouEmailProcess: {
          success: false,
          saving: true,
          error: null,
        },
      };
    case EDIT_PATIENT_THANK_YOU_SUCCESS:
      return {
        ...state,
        updatePatientThankYouEmailProcess: {
          success: true,
          saving: false,
          error: null,
        },
      };
    case EDIT_PATIENT_THANK_YOU_ERROR:
      return {
        ...state,
        updatePatientThankYouEmailProcess: {
          success: false,
          saving: false,
          error: true,
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
        removedStudyAdId: null,
        changeStudyAdProcess: {
          success: false,
          saving: false,
          error: null,
        },
      };
    case FETCH_LEVELS_SUCCESS:
      return {
        ...state,
        levels: action.payload,
      };
    case FETCH_LEVELS_ERROR:
      return {
        ...state,
        levels: [],
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

    case DELETE_CAMPAIGN_ERROR: {
      return {
        ...state,
        deleteCampaignProcess: {
          deleting: false,
          error: action.payload,
        },
      };
    }
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

    default:
      return state;
  }
}
