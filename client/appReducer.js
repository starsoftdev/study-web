import { combineReducers } from 'redux'

import * as otherReducers from './reducers'
import {reducer as formReducer} from 'redux-form'
const reducers = _.assign({ form: formReducer }, otherReducers)

export default combineReducers(reducers)
