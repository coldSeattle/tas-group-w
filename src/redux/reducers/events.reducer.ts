import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
} from '../actionTypes/eventActionTypes';

const initialState = {
  events: [],
  isLoading: false,
  error: null,
};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_EVENTS_SUCCESS:
      return { ...state, isLoading: false, events: action.payload.events };
    case FETCH_EVENTS_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
};
