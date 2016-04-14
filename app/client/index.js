import { render } from 'react-dom';
import React from 'react';
import Root from './Root';
import makeStore from './makeStore';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const initialState = {};
const store = makeStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

render(<Root store={store} history={history} />, document.getElementById('root'));
