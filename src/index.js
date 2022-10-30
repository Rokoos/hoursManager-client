import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux'
import {Provider} from 'react-redux'
import { composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import App from './App';

const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


