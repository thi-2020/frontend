import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer.js';

const middlewares = [ thunk ];

if(process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}
// this env variable is set by create-react-app
// we are only logging for the dev server 

const store = createStore( rootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

export { store, persistor };