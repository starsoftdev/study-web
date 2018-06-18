import {
  DELETE_MEDIA_TYPE_SUCCESS,
} from './constants';

const initialState = {
};

export default function mediaTrackingReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_MEDIA_TYPE_SUCCESS:
      return {
        ...state,
        values: {
          ...state.values,
          mediaType: state.values.mediaType.filter((item, index) => {
            return index !== action.index;
          }),
        },
      };
    default:
      return state;
  }
}
