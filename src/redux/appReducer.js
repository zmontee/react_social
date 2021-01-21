import {authThunkCreater} from "./authReducer";

const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZED_SUCCES:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initializedSuccessAC = () => {
    return {type: INITIALIZED_SUCCES};
}

export const initializeAppTC = () => (dispatch) => {
    let promise = dispatch(authThunkCreater())
    promise.then(() => {
            dispatch(initializedSuccessAC());
        });
}

export default appReducer;