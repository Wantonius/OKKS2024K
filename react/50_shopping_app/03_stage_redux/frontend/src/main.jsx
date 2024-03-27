import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import {createStore,applyMiddleware,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {thunk} from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import shoppingReducer from './reducers/shoppingReducer';

const rootReducer = combineReducers({
	login:loginReducer,
	shopping:shoppingReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  </React.StrictMode>,
)
