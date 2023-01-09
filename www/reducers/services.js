import {
  LOAD_SERVICE_TYPES_SUCCESS,
  LOAD_SERVICE_TYPES_FAIL,
  LOAD_SERVICES_SUCCESS,
  LOAD_SERVICES_FAIL,
  LOAD_SERVICE_SUCCESS,
  LOAD_SERVICE_FAIL,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAIL,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
} from '../actions/types';

const initialState = {
  serviceTypes: null,
  services: null,
  loading: false,
};

const servicesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_SERVICE_TYPES_SUCCESS:
      return {
        ...state,
        serviceTypes: payload,
      };
    case LOAD_SERVICE_TYPES_FAIL:
      return {
        ...state,
      };
    case LOAD_SERVICES_SUCCESS:
      return {
        ...state,
        services: payload,
      };
    case LOAD_SERVICES_FAIL:
      return {
        ...state,
      };
    case LOAD_SERVICE_SUCCESS:
      return {
        ...state,
        service: payload,
      };
    case LOAD_SERVICE_FAIL:
      return {
        ...state,
      };
    case CREATE_SERVICE_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default servicesReducer;
