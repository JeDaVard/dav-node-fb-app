import axios from 'axios';
import {FETCH_SURVEYS, FETCH_USER, REMOVE_SURVEY} from './types';

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

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');

    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const removeSurvey = id => async dispatch => {
    const res = await axios.delete('/api/surveys', {params: {id}});

    dispatch({ type: REMOVE_SURVEY, payload: res.data });
};