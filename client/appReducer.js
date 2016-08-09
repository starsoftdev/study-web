import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as reducers from './reducers'

export default combineReducers({
  ...reducers,
  form: formReducer,
})
