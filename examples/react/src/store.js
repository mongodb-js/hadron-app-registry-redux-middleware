import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger';
import AppRegistry from 'hadron-app-registry';

import hadronAppRegistryReduxMiddleware from '@mongodb-js/hadron-app-registry-redux-middleware';
import consoleLogger from './middleware/consoleLogger';
import reducers from './reducers';
import { eventsToActions, actionsToEvents } from './constants/eventActionMapping';

const appRegistry = new AppRegistry();

let middleware = [
  logger,
  consoleLogger,
  hadronAppRegistryReduxMiddleware( appRegistry, eventsToActions, actionsToEvents )
];

const store = composeWithDevTools( applyMiddleware(...middleware) )(createStore)(reducers);

// HMR reducers in development only
if (process.env.NODE_ENV !== 'production' && module.hot) {
  // Because Webpack 2+ has built-in support for ES2015 modules,
  // you won't need to re-require the hot module reloaded dependencies
  module.hot.accept('./reducers', () => store.replaceReducer(reducers) );
}

export default store;
export { store, appRegistry };
