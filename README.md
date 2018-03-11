# hadron-app-registry-redux-middleware

[Redux](https://redux.js.org) middleware which wraps the [Hadron App Registry](https://github.com/mongodb-js/hadron-app-registry) to facilitate the integration between Hadron App components which may use different state or store implementations (eg: [Reflux](https://github.com/reflux/refluxjs), [MobX](https://github.com/mobxjs/mobx)).

The middleware listens to relevant Hadron App Registry events and dispatches them as Redux actions. It is also able to intercept relevant dispatched Redux actions and emit them as events in the Hadron App Registry.

## Getting Started

```
$ npm install --save @mongodb-js/hadron-app-registry-redux-middleware
```

or

```
$ yarn add @mongodb-js/hadron-app-registry-redux-middleware
```

Alternatively, you may use the provided UMD builds directly in the `<script>` tag of an HTML page.

## Usage Example

Create and apply the middleware to the Redux store, passing an instance of the `hadron-app-registry` as the first argument, along with any mappings for `eventsToActions` and `actionsToEvents`.

```javascript
import { createStore, applyMiddleware } from 'redux';
import AppRegistry from 'hadron-app-registry';
import hadronAppRegistryReduxMiddleware from '@mongodb-js/hadron-app-registry-redux-middleware';
import reducers from './reducers';

const appRegistry = new AppRegistry();

// map appRegistry event names (key) to Redux action types (value)
const eventsToActions = {
  'foo-event': 'FOO',
  'bar-event': 'BAR'
};

// map Redux action types (key) to appRegistry event names (value)
const actionsToEvents = {
  'FIZZ': 'fizz-event',
  'BUZZ': 'buzz-event'
};

let store = createStore(
  reducers,
  applyMiddleware(
    hadronAppRegistryReduxMiddleware(
      appRegistry,
      eventsToActions,
      actionsToEvents
    )
  )
);
```

## Change Log

This project adheres to [Semantic Versioning](http://semver.org/).
Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/reactjs/redux/releases) page.

## License

Apache 2.0
