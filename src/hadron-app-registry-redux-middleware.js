/**
 * Redux middleware which wraps the Hadron App Registry to facilitate the integration between
 * Hadron App components which may use different state or store implementations (eg: Reflux, MobX).
 *
 * The middleware listens to relevant Hadron App Registry events and dispatches them as Redux actions.
 * It is also able to intercept relevant dispatched Redux actions and emit them as events in the Hadron App Registry.
 *
 * @param {Object} appRegistry - the Hadron App Registry instance
 * @param {Object} eventsToActions - an object mapping appRegistry event names (key) to Redux action types (value)
 * @param {Object} actionsToEvents - an object mapping Redux action types (key) to appRegistry event names (value)
 *
 * @returns {Object} - the result of the next action.
 **/
const hadronAppRegistryReduxMiddleware = (appRegistry, eventsToActions = {}, actionsToEvents = {}) => {
  if (!appRegistry) {
    throw Error('An instance of the hadron-app-registry was not provided to the hadron-app-registry-redux-middleware');
  }

  const onEventDispatchAction = (dispatch, actionType, eventName, error, ...args) => {
    return error
      ? dispatch({ type: actionType, payload: error, error: true, meta: { appRegistryEvent: eventName } })
      : dispatch({ type: actionType, payload: { args }, meta: { appRegistryEvent: eventName } });
  };

  return ({ dispatch }) => {
    // Setup the "on" listener bindings for each event name provided to the hadron-app-middleware
    Object.keys(eventsToActions).forEach(eventName => {
      appRegistry.on(eventName, onEventDispatchAction.bind(this, dispatch, eventsToActions[eventName], eventName));
    });

    return next => action => {
      // If the Redux action should be emitted, emit the event name and payload to the appRegistry
      if (Object.keys(actionsToEvents).includes(action.type)) {
        const eventName = actionsToEvents[action.type];
        appRegistry.emit(eventName, action.error, action.payload);
      }

      return next(action);
    };
  };
};

export default hadronAppRegistryReduxMiddleware;
export { hadronAppRegistryReduxMiddleware };
