import { initialState as studySourcesReducerInitialState, default as studySourcesReducer } from './studySources';

const initialState = {
  ...studySourcesReducerInitialState,
};

export default function commonReducer(state = initialState, action) {
  return studySourcesReducer(state, action);
}
