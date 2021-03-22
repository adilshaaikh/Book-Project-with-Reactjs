import { SAVE_BOOK_REQUEST, FETCH_BOOK_REQUEST, UPDATE_BOOK_REQUEST, BOOK_SUCCESS,DELETE_BOOK_REQUEST,BOOK_FAILURE } from './bookTypes';

const initialState = {
    books: [],
    error: ''
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SAVE_BOOK_REQUEST:
            return {
                ...state
            };
            case DELETE_BOOK_REQUEST:
            return {
                ...state
            };
        case FETCH_BOOK_REQUEST:
            return {
                ...state
            };
        case UPDATE_BOOK_REQUEST:
            return {
                ...state
            };
        case BOOK_SUCCESS:
            return {
                books: action.payload,
                error: ''
            };
        case BOOK_FAILURE:
            return {
                books: [],
                error: action.payload
            };
        default:
            return state;
    }

}

export default reducer;