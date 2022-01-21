import { FETCH_ALL_USER, FETCH_USER, START_LOADING_USER, END_LOADING_USER } from '../constants/actionTypes';

const userReducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING_USER: 
            return { ...state, isLoadingUser: true};
        case END_LOADING_USER: 
            return { ...state, isLoadingUser: false};
        case FETCH_ALL_USER:
            return {
                ...state,
                users: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

export default userReducer;