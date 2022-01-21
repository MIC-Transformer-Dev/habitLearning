import * as api from '../api';
import { FETCH_ALL_USER, FETCH_USER, START_LOADING_USER, END_LOADING_USER } from '../constants/actionTypes';

export const getUsers = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_USER });
        const { data } = await api.fetchUsers(page);
        dispatch({ type: FETCH_ALL_USER, payload: data });
        dispatch({ type: END_LOADING_USER });
    } catch (error) {
        console.log(error.message);
    }
}

export const getUser = (name) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_USER });
        const { data } = await api.fetchUser(name);
        dispatch({ type: FETCH_USER, payload: data });
        dispatch({ type: END_LOADING_USER });
    } catch (error) {
        console.log(error);
    }
}

