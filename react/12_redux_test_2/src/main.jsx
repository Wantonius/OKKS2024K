import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import contactReducer from './reducers/contactReducer';

const store = createStore(contactReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
)
