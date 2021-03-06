import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createMemoryHistory } from 'history';
import routes from './routes';
import configureStore from './store';

import * as ipcRenderer from './ipcRenderer';
// import 'antd/dist/antd.css';

const syncHistoryWithStore = (store, history) => {
  const { routing } = store.getState();
  if(routing && routing.location) {
    history.replace(routing.location);
  }
};

const setting = ipcRenderer.readSetting();
console.log(setting);
const initialState = {
  setting
};
const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);
syncHistoryWithStore(store, routerHistory);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

class App extends Component {
  render() {
    return <Provider store={store}>
      <ConnectedRouter history={routerHistory}>
        {routes}
      </ConnectedRouter>
    </Provider>
  }
}

ReactDOM.render(
  <App/>,
  rootElement
);
