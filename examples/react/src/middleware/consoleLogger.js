import { eventsToActions, actionsToEvents } from '../constants/eventActionMapping';

/**
 * Redux middleware for the example react app to display the actions dispatched as output.
 * @param {Object} store - the redux store object
 * @param {Function} next - the redux next function
 * @param {Object} action - the dispatched action
 * @returns {Object} - the result of the next(action) call
 */
const consoleLogger = store =>  {
  const log = action => {
    const meta = {
      // When an action becomes an event
      ...(Object.keys(actionsToEvents).includes(action.type)
        ? { from: action.type, to: actionsToEvents[action.type] }
        : {}),

      // When an event becomes an action
      ...(action.meta && Object.keys(eventsToActions).includes(action.meta.appRegistryEvent)
        ? { from: action.meta.appRegistryEvent, to: eventsToActions[action.meta.appRegistryEvent] }
        : {})
    };

    store.dispatch({ type: 'APP_CONSOLE_LOGGER', payload: action, meta });
  };

  return next => action => {
    if (action.type !== 'APP_CONSOLE_LOGGER') {
      log(action)
    }

    return next(action);
  }
}

export default consoleLogger;
export { consoleLogger };
