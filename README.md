# hadron-app-registry-redux-middleware
[![][travis_img]][travis_url] [![][github_issues_img]][github_issues_url] [![github_forks_img]][github_forks_url] [![github_stars_img]][github_stars_url] [![][license_img]][license_url] 

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
  'foo': 'BAR'
};

// map Redux action types (key) to appRegistry event names (value)
const actionsToEvents = {
  'FIZZ': 'buzz'
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

## Demo Example

This project also includes an example demonstrating the middleware in action:

![][demo_img]

To run the demo, clone this project and execute the following:

```bash
$: cd ./examples/react
$: npm install
$: npm start
```

## Change Log

This project adheres to [Semantic Versioning](http://semver.org/).
Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/reactjs/redux/releases) page.

## License

Apache 2.0

[license_img]: https://img.shields.io/github/license/mongodb-js/hadron-app-registry-redux-middleware.svg
[license_url]: https://github.com/mongodb-js/hadron-app-registry-redux-middleware/blob/master/LICENSE

[github_issues_img]: https://img.shields.io/github/issues/mongodb-js/hadron-app-registry-redux-middleware.svg
[github_issues_url]: https://github.com/mongodb-js/hadron-app-registry-redux-middleware/issues

[github_forks_img]: https://img.shields.io/github/forks/mongodb-js/hadron-app-registry-redux-middleware.svg
[github_forks_url]: https://github.com/mongodb-js/hadron-app-registry-redux-middleware/network

[github_stars_img]: https://img.shields.io/github/stars/mongodb-js/hadron-app-registry-redux-middleware.svg
[github_stars_url]: https://github.com/mongodb-js/hadron-app-registry-redux-middleware/stargazers

[travis_img]: https://img.shields.io/travis/mongodb-js/hadron-app-registry-redux-middleware.svg?style=flat-square
[travis_url]: https://travis-ci.org/mongodb-js/hadron-app-registry-redux-middleware

[demo_img]: demo.gif
