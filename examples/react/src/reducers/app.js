const initialState = {
  log: []
};

const logRegistryEventToReduxAction = (from, to) => {
  return `Hadron App Registry event emitted: '${from}', dispatching Redux action: '${to}'`;
}

const logReduxActionToRegistryEvent = (from, to) => {
  return `Redux action dispatched: '${from}', emmitting Hadron App Registry event: '${to}'`;
}

const formatLogMessage = (log, {from, to}) => {
  const message = log.meta && log.meta.appRegistryEvent
    ? logRegistryEventToReduxAction(from, to)
    : logReduxActionToRegistryEvent(from, to);

  return {
    timestamp: Date.now(),
    message
  };
};

const app = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case 'APP_CONSOLE_LOGGER':
      return {
        ...state,
        log: [ formatLogMessage(payload, meta), ...state.log ]
      };

    default:
      return state;
  }
};

export default app;
export { app };
