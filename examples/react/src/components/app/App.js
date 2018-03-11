import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import Button from '../button';

import appActions from '../../action-creators/app';

import './App.css';

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    appRegistry: PropTypes.object.isRequired,
    log: PropTypes.array
  };

  static defaultProps = {
    log: []
  };

  handleDispatchActionClick = () => {
    const { appAction } = this.props;
    appAction();
  };

  handleEmitRegistryEvent = () => {
    const { appRegistry } = this.props;
    appRegistry.emit('foo', null)
  };

  _renderLog = () => {
    const { log } = this.props;

    return log.map( entry => (
      <li key={entry.timestamp} className="App-console-body-line">{entry.message}</li>
    ));
  };

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <div className="App">
          <h1 className="App-title">Hadron App Registry Redux Middleware Demo</h1>

          <div className="App-console">
            <div className="App-console-header">console</div>
            <ul className="App-console-body">
              {this._renderLog()}
            </ul>
          </div>

          <nav className="App-nav">
            <Button onClick={this.handleEmitRegistryEvent}>Emit Registry Event</Button>
            <Button onClick={this.handleDispatchActionClick}>Dispatch Redux Action</Button>
          </nav>
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  log: state.app.log
});

export default connect(mapStateToProps, appActions)(App);
export { App };
