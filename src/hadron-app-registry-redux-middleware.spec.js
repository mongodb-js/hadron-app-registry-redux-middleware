import hadronAppRegistryReduxMiddleware from './hadron-app-registry-redux-middleware';
import AppRegistry from 'hadron-app-registry';

const createMiddleware = (appRegistry, eventsToActions = {}, actionsToEvents = {}) => {
  const store = {
    getState: sinon.stub(),
    dispatch: sinon.stub()
  };

  const next = sinon.stub();

  const invoke = (action) => hadronAppRegistryReduxMiddleware(
    appRegistry,
    eventsToActions,
    actionsToEvents
  )(store)(next)(action);

  return { store, next, invoke };
};

describe('hadronAppRegistryReduxMiddleware', function() {
  const eventsToActions = {
    'foo-event': 'FOO',
    'bar-event': 'BAR'
  };

  const actionsToEvents = {
    'FIZZ': 'fizz-event',
    'BUZZ': 'buzz-event'
  };

  let appRegistry;
  let appRegistryEmitSpy;

  context('with invalid Hadron App Registry', function() {
    it('should throw an error when the middleware is not passed an instance of the hadron-app-registry', function() {
      expect(() => hadronAppRegistryReduxMiddleware()).to.throw();
    });
  });

  context('with valid Hadron App Registry', function() {
    beforeEach(function() {
      appRegistry = new AppRegistry();
      appRegistryEmitSpy = sinon.spy(appRegistry, 'emit');
    });

    afterEach(function() {
      appRegistry.emit.restore();
      appRegistry = null;
    });

    it('should pass through actions from the middleware', function() {
      const { next, invoke } = createMiddleware(appRegistry);
      const action = { type: 'TEST', payload: null };

      invoke(action);
      next.should.have.been.calledWith(action);
    });

    describe('when registering event listeners on the app registry', function() {
      Object.keys(eventsToActions).forEach(function(eventName) {
        it(`should create an event listener for the event: ${eventName}`, function() {
          const { invoke } = createMiddleware(appRegistry, eventsToActions);
          const action = { type: 'TEST', payload: null };

          // Invoke the action to trigger the middleware
          invoke(action);

          expect(appRegistry.listenerCount(eventName)).to.equal(1);
        });
      });
    });

    describe('when the appRegistry emits an event successfully', function() {
      Object.keys(eventsToActions).forEach(function(eventName) {
        it(`should dispatch the action: ${eventsToActions[eventName]} for the event: ${eventName} with the args in the payload`, function() {
          const { invoke, store } = createMiddleware(appRegistry, eventsToActions);
          const arg = 'test';

          // Invoke the action to trigger the middleware and emit appRegistry event
          invoke({});
          appRegistry.emit(eventName, null, arg);

          store.dispatch.should.have.been.calledWith({
            type: eventsToActions[eventName],
            payload: { args: [arg] },
            meta: { appRegistryEvent: eventName }
          });
        });
      });
    });

    describe('when the appRegistry emits an event with an error', function() {
      Object.keys(eventsToActions).forEach(function(eventName) {
        it(`should dispatch the action: ${eventsToActions[eventName]} for the event: ${eventName} with an error payload`, function() {
          const { invoke, store } = createMiddleware(appRegistry, eventsToActions);
          const error = new Error('test error');
          const arg = 'test';

          // Invoke the action to trigger the middleware and emit appRegistry event
          invoke({});
          appRegistry.emit(eventName, error, arg);

          store.dispatch.should.have.been.calledWith({
            type: eventsToActions[eventName],
            payload: error,
            error: true,
            meta: { appRegistryEvent: eventName }
          });
        });
      });
    });

    describe('when dispatching an action that the appRegistry should emit', function() {
      Object.keys(actionsToEvents).forEach(function(actionType) {
        it(`should emit the appRegistry event: ${actionsToEvents[actionType]} for the action type: ${actionType} with the payload as the args`, function() {
          const { invoke } = createMiddleware(appRegistry, {}, actionsToEvents);
          const action = { type: actionType, payload: 'test' };

          // Invoke the action to trigger the middleware
          invoke(action);

          appRegistryEmitSpy.should.have.been.calledWith(actionsToEvents[actionType], undefined, action.payload);
        });
      });
    });

    describe('when dispatching an action with an error that the appRegistry should emit', function() {
      Object.keys(actionsToEvents).forEach(function(actionType) {
        it(`should emit the appRegistry event: ${actionsToEvents[actionType]} for the action type: ${actionType} with error set to true`, function() {
          const { invoke } = createMiddleware(appRegistry, {}, actionsToEvents);
          const error = new Error('test error');
          const action = { type: actionType, payload: error, error: true };

          // Invoke the action to trigger the middleware
          invoke(action);

          appRegistryEmitSpy.should.have.been.calledWith(actionsToEvents[actionType], action.error, action.payload);
        });
      });
    });
  });
});
