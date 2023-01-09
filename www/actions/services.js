import {
    LOAD_SERVICE_TYPE_SUCCESS,
    LOAD_SERVICE_TYPE_FAIL,
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

  } from './types';
  
const API_URL = process.env.NEXT_PUBLIC_API_HOST;
const createUrl = (urlSection) => API_URL + urlSection;

  export const loadServiceTypes = () => async dispatch => {
    try {
      const res = await fetch(createUrl('/api-v1/service-types'), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
  
      const data = await res.json();
  
      if (res.status === 200) {
        dispatch({
          type: LOAD_SERVICE_TYPES_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: LOAD_SERVICE_TYPES_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: LOAD_SERVICE_TYPES_FAIL,
      });
    }
  };
  
  export const loadServices = () => async dispatch => {
    try {
        const res = await fetch(createUrl('/api-v1/services'), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
  
      const data = await res.json();
  
      if (res.status === 200) {
        console.log('SERVICE_DATA', data);
        dispatch({
          type: LOAD_SERVICES_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: LOAD_SERVICES_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: LOAD_SERVICES_FAIL,
      });
    }
  };

  export const loadService = (id) => async dispatch => {
    try {
        const res = await fetch(createUrl('/api-v1/services/' + id), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
  
      const data = await res.json();
  
      if (res.status === 200) {
        dispatch({
          type: LOAD_SERVICE_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: LOAD_SERVICE_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: LOAD_SERVICE_FAIL,
      });
    }
  };

  export const createServices = (service) => async dispatch => {
    const body = JSON.stringify(service);

    try {
         const res = await fetch(createUrl('/api-v1/services'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body
      });
    
      if (res.status === 201) {
        dispatch({
          type: CREATE_SERVICE_SUCCESS,
        });
      } else {
        dispatch({
          type: CREATE_SERVICE_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: CREATE_SERVICE_FAIL,
      });
    }
  };

  


  