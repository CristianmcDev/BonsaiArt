import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

import { RootReducer } from './reducers/RootReducer';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';

//Comment this section in deploy
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
const loggerMiddleware = createLogger();

export const actualStore = createStore(
    RootReducer,
    loadState(),
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
);

//Uncomment this section in deploy
//export const actualStore = createStore(
//     RootReducer,
//     loadState()
// );

actualStore.subscribe(() => {
    saveState(actualStore.getState());
});


ReactDOM.render(<Provider store={actualStore}><App /></Provider>, document.getElementById('root') || document.createElement('div'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
