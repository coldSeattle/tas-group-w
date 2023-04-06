import {
  fetchEventsSuccess,
  fetchEventsError,
} from '../actions/events.actions';
import { FETCH_EVENTS_REQUEST } from '../actionTypes/eventActionTypes';
import { fetchEvents } from '../../services/index.js';

export const eventsMiddleware =
  ({ dispatch }) =>
  next =>
  async action => {
    next(action);

    if (action.type === FETCH_EVENTS_REQUEST) {
      try {
        const response = await fetchEvents(
          action.payload.perPage,
          action.payload.page,
        );
        const events = response.data;

        dispatch(fetchEventsSuccess(events));
      } catch (error) {
        dispatch(fetchEventsError(error.message));
      }
    }
  };
