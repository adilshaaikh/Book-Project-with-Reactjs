
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from './userTypes';

import axios from 'axios';

export const fetchUser =()=>{

    return dispatch =>{
        dispatch(fetchUserRequest());
        axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole").
        then(response=>{
                dispatch(fetchUserSuccess(response.data));
        }).
        catch(error =>{
                    dispatch(fetchUserFailure(error.message));
        });
    }
}

const fetchUserRequest = Users => {
    return {
        type: FETCH_USER_REQUEST,
        payload: Users
    };
};

const fetchUserSuccess = error => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: error 
    };
};

const fetchUserFailure = () => {
    return {
        type: FETCH_USER_FAILURE
    };
};
