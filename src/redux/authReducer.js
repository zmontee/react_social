import {authAPI} from "../api/api";
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => {
    return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}};
}

export const authThunkCreater = () => async (dispatch) => {
        let responce = await authAPI.me();
            if(responce.data.resultCode === 0) {
                let {id, email, login} = responce.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
}


export const loginThunkCreater = (email, password, rememberMe) => async (dispatch) => {
    let responce = await authAPI.login(email, password, rememberMe);
            if(responce.data.resultCode === 0) {
                dispatch(authThunkCreater());
            } else {                    // if wrong password or email
               dispatch(stopSubmit("login", {_error: "Email or password is wrong"}));
            }
    }


export const logoutThunkCreater = () => async (dispatch) => {
       let responce = await authAPI.logout();
            if(responce.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
    }

export default authReducer;