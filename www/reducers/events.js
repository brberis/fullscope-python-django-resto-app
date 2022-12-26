import {
    LOAD_EVENT_CATEGORIES_SUCCESS,
    LOAD_EVENT_CATEGORIES_FAIL,
    LOAD_EVENTS_SUCCESS,
    LOAD_EVENTS_FAIL,
    LOAD_EVENT_SUCCESS,
    LOAD_EVENT_FAIL,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_FAIL,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL,
  } from '../actions/types';
  
  const initialState = {
    eventCategories: null,
    events: null,
    loading: false,
  };
  
  const eventsReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case LOAD_EVENT_CATEGORIES_SUCCESS:
        return {
          ...state,
          eventCategories: payload,
        };
      case LOAD_EVENT_CATEGORIES_FAIL:
        return {
          ...state,
        };
      case LOAD_EVENTS_SUCCESS:
        return {
          ...state,
          events: payload,
        };
      case LOAD_EVENTS_FAIL:
        return {
          ...state,
        };
      case CREATE_EVENT_SUCCESS:
        return {
          ...state,
        };
      default:
        return state;
    }
  };
  
  export default eventsReducer;
  