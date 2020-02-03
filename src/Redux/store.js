import { createStore, combineReducers } from 'redux';
import TodoData from './Reducers/TodoReducer';

const rootReducer = combineReducers({TodoData})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;