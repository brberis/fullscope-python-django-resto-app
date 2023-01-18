import {
  LOAD_CONTACTS_SUCCESS,
  LOAD_CONTACTS_FAIL,
  LOAD_CONTACT_SUCCESS,
  LOAD_CONTACT_FAIL,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_HOST;
const createUrl = (urlSection) => API_URL + urlSection;



export const loadContacts = () => async dispatch => {
  try {
      const res = await fetch(createUrl('/api-v1/contacts'), {
          method: 'GET',
          headers: {
              Accept: 'application/json',
          },
      });
      const data = await res.json();
      if (res.status === 200) {
          console.log('CONTACT_DATA', data);
          dispatch({
              type: LOAD_CONTACTS_SUCCESS,
              payload: data,
          });
      } else {
          dispatch({
              type: LOAD_CONTACTS_FAIL,
          });
      }
    } catch (err) {
      dispatch({
        type: LOAD_SERVICES_FAIL,
      });
    }
  };


  export const createContact = (contact) => async dispatch => {
    const body = JSON.stringify(contact);

    try {
          const res = await fetch(createUrl('/api-v1/contacts'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body
      });
    
      if (res.status === 201) {
        dispatch({
          type: CREATE_CONTACT_SUCCESS,
        });
      } else {
        dispatch({
          type: CREATE_CONTACT_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: CREATE_CONTACT_FAIL,
      });
    }
  };


  