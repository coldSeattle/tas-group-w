import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
} from '../actionTypes/eventActionTypes';

export const fetchEventsRequest = payload => {
  return { type: FETCH_EVENTS_REQUEST, payload };
};

export const fetchEventsSuccess = events => {
  return { type: FETCH_EVENTS_SUCCESS, payload: { events } };
};

export const fetchEventsError = error => {
  return { type: FETCH_EVENTS_ERROR, payload: { error } };
};
