// Redux dependencies
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import data from './data';

const rootReducer = combineReducers({
    data,
    routing: routerReducer
});

export default rootReducer;