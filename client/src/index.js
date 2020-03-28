import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux"
import reduxThunk from 'redux-thunk'

import reducers from './reducers'

//temp code for testing
import axios from 'axios';
window.axios = axios;

// const survey = {title: 'my title', subject: 'my subject', recipients: 'jedavard@gmail.com', body: 'some email body'};
// axios.post('/api/surveys', survey)

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root'));