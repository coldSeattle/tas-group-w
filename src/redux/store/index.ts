import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { eventsMiddleware } from '../middlewares/events.middleware';
import { eventsReducer } from '../reducers/events.reducer';

const store = createStore(
  eventsReducer,
  applyMiddleware(thunkMiddleware, eventsMiddleware),
);

export default store;
