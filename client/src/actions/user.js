import * as api from '../api';
import { FETCH_ALL_USER, FETCH_USER, START_LOADING, END_LOADING } from '../constants/actionTypes';

export const getUsers = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchUsers(page);
        dispatch({ type: FETCH_ALL_USER, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchUser(id);
        dispatch({ type: FETCH_USER, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

