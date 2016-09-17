import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { render } from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { modelReducer, formReducer } from 'react-redux-form';

import reducerTasks from '../imports/modules/tasks/reducers';
import App from '../imports/modules/tasks/containers/main.js';
import Collections from '../imports/lib/collection';
const initialState = {
  text: '',
  priority: ''
};

const store = createStore(
  combineReducers({
   ...reducerTasks,
   task: modelReducer('task', initialState),
   taskForm: formReducer('task', initialState),
  }),
  compose(
    applyMiddleware(thunk.withExtraArgument({ Meteor, Tracker, Collections })),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

Meteor.startup(() => {
  render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('render-target'));
});
