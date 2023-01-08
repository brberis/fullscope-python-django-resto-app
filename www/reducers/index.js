import { combineReducers } from 'redux';
import authReducer from './auth';
import eventReducer from './events';
import serviceReducer from './services';

export default combineReducers({
  auth: authReducer,
  events: eventReducer,
  services: serviceReducer
});
