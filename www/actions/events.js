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

  } from './types';
  
const API_URL = process.env.NEXT_PUBLIC_API_HOST;
const createUrl = (urlSection) => API_URL + urlSection;

  export const loadEventCategories = () => async dispatch => {
    try {
      const res = await fetch(createUrl('/api/event-categories'), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
  
      const data = await res.json();
  
      if (res.status === 200) {
        dispatch({
          type: LOAD_EVENT_CATEGORIES_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: LOAD_EVENT_CATEGORIES_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: LOAD_EVENT_CATEGORIES_FAIL,
      });
    }
  };
  
  export const loadEvents = () => async dispatch => {
    try {
         const res = await fetch(createUrl('/api/events'), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
  
      const data = await res.json();
  
      if (res.status === 200) {
        dispatch({
          type: LOAD_EVENTS_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: LOAD_EVENTS_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: LOAD_EVENTS_FAIL,
      });
    }
  };

  export const createEvents = (event) => async dispatch => {
    const body = JSON.stringify(event);
    console.log('>>>BODYYY', body);

    try {
         const res = await fetch(createUrl('/api/event-create'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body
      });
    
      if (res.status === 201) {
        dispatch({
          type: CREATE_EVENT_SUCCESS,
        });
      } else {
        dispatch({
          type: CREATE_EVENT_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: CREATE_EVENT_FAIL,
      });
    }
  };


  