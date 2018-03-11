import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store, appRegistry } from './store';

import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App store={store} appRegistry={appRegistry} />, document.getElementById('root'));
registerServiceWorker();
