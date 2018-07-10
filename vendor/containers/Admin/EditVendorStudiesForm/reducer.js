import {
  ADD_STUDY_NUMBER,
  DELETE_STUDY_NUMBER,
  FETCH_VENDOR_STUDIES_SUCCEEDED,
  SET_SELECTED_VENDOR_ID,
  SUBMIT_VENDOR_STUDIES_SUCCEEDED,
} from './constants';

const initialState = {
  asyncValidating: false,
  asyncErrors: {},
  values: {},
  vendorStudies: [],
};

export default function editVendorStudiesFormReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STUDY_NUMBER: {
      const values = Object.assign({}, state.values);
      delete values.studyId;
      return {
        ...state,
        vendorStudies: [
          ...state.vendorStudies,
          {
            studyId: action.studyId,
            isNew: true,
          },
        ],
        values,
      };
    }
    case DELETE_STUDY_NUMBER: {
      const study = _.find(state.vendorStudies, { studyId: action.studyId });
      if (study.isNew) {
        return {
          ...state,
          vendorStudies: state.vendorStudies.filter(vendorStudy => {
            return vendorStudy.studyId === action.studyId;
          }),
        };
      } else {
        return {
          ...state,
          vendorStudies: state.vendorStudies.map(vendorStudy => {
            if (vendorStudy.studyId === action.studyId) {
              return {
                ...vendorStudy,
                toDelete: true,
              };
            } else {
              return vendorStudy;
            }
          }),
        };
      }
    }
    case FETCH_VENDOR_STUDIES_SUCCEEDED:
      return {
        ...state,
        vendorStudies: action.response,
      };
    case SET_SELECTED_VENDOR_ID:
      return {
        ...state,
        values: {
          ...state.values,
          vendorId: action.vendorId,
        },
      };
    case SUBMIT_VENDOR_STUDIES_SUCCEEDED:
      return {
        ...state,
        vendorStudies: [
          ...state.vendorStudies,
          action.response,
        ],
      };
    default:
      return state;
  }
}