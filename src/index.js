import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from "redux";
import { Provider} from "react-redux";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import rootReducer from './reducer';
import { screens } from './constants';


const initialState = {
  alert: {
    showAlert: false,
    alertMessage: ""
  },
  screen: screens.ADD_MEMBERS.name,
  members: [],
  items: []
}

const store = createStore(rootReducer, initialState);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
