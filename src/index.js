import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from "redux";
import { Provider} from "react-redux";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import rootReducer from './reducer';
import { screens } from './constants';

let initialState = {
  alert: {
    showAlert: false,
    alertMessage: ""
  },
  screen: screens.ADD_MEMBERS.name,
  members: [],
  items: []
}

let localStorageState = JSON.parse(localStorage.getItem('reduxState'));

if(localStorageState!=null) {
  localStorageState = {
    ...localStorageState,
    screen: screens.ADD_MEMBERS.name
  }
  initialState = localStorageState
}

const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
