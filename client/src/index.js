import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import axios from 'axios';

axios.defaults.baseURL = 'https://devlog-ad.herokuapp.com';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
