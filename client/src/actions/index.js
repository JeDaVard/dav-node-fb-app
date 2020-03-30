import axios from 'axios';
import {FETCH_USER, SEND_SURVEY} from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const sendSurvey = (survey, history) => async dispatch => {
    const res = await axios.post('/api/surveys', survey);

    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data})
};