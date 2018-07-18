import { CLEAR_STUDY_SOURCES, FETCH_STUDY_SOURCES, FETCH_STUDY_SOURCES_SUCCESS, FETCH_STUDY_SOURCES_ERROR } from '../constants/studySources';

export const initialState = {
  studySources: {
    details: [],
    fetching: false,
  },
};

export default function studySourcesReducer(state, action) {
  switch (action.type) {
    case CLEAR_STUDY_SOURCES:
      return {
        ...state,
        studySources: {
          details: [],
          fetching: false,
        },
      };
    case FETCH_STUDY_SOURCES:
      return {
        ...state,
        studySources: {
          details: [],
          fetching: true,
        },
      };
    case FETCH_STUDY_SOURCES_SUCCESS:
      return {
        ...state,
        studySources: {
          details: action.payload.map((item) => {
            return {
              source: { value: item.source_id, label: item.type },
              sourceName: item.sourceName,
              studySourceId: item.studySourceId,
              isMediaType: item.isMediaType,
            };
          }),
          fetching: false,
        },
      };
    case FETCH_STUDY_SOURCES_ERROR:
      return {
        ...state,
        studySources: {
          details: [],
          fetching: false,
        },
      };
    default:
      return state;
  }
}
