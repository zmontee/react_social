import {profileAPI, usersAPI} from "../api/api";
import {setUsers, toggleIsFetching} from "./usersReducer";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const LIKE = 'LIKE';
const UNLIKE = 'UNLIKE';
const TOGGLE_IS_LIKING_PROGRESS = 'TOGGLE_IS_LIKING_PROGRESS';
const SAVE_PHOTO = 'SAVE_PHOTO';
const SAVE_PROFILE = 'SAVE_PROFILE';

const initialState = {
    posts: [
        {id: 1, message: 'Hey! How r u?', liked: false, likesCount: 3},
        {id: 2, message: 'React is cool.', liked: false, likesCount: 5},
        {id: 3, message: 'Today I\'m gonna learn react!', liked: true, likesCount: 1},
        {id: 4, message: 'Hello everybody. It\'s my first post!', liked: false, likesCount: 0},
        {id: 5, message: 'Yeah! I did it!', liked: false, likesCount: 2},
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            let id = (state.posts.length + 1);
            let message = action.newPostText;
            let likesCount = 0;
            let newPost = {
                id: id,
                message: message,
                likesCount: likesCount
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case LIKE:
            debugger;
            return {
                ...state,
                posts: state.posts.map(p => {
                    if(p.id === action.postId) {
                        return {...p, liked: true, likesCount: p.likesCount+1}
                    }
                    return p;
                })
            }
        case UNLIKE:
            return {
                ...state,
                posts: state.posts.map(p => {
                    if(p.id === action.postId) {
                        return {...p, liked: false, likesCount: p.likesCount-1}
                    }
                    return p;
                })
            }
        case TOGGLE_IS_LIKING_PROGRESS:
            return {
                ...state,
                likingInProgress: action.likingInProgress
                    ?   [...state.likingInProgress, action.postId]
                    :   state.likingInProgress.filter(id => id != action.postId)
            }
        case SAVE_PHOTO:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                }
            }
        default:
            return state;
    }
}

export const likeActionCreator = (postId) => ({type: LIKE, postId});
export const unlikeActionCreator = (postId) => ({type: UNLIKE, postId});
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const deletePostActionCreator = (postId) => ({type: DELETE_POST, postId});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const savePhotoActionCreator = (photos) => ({type: SAVE_PHOTO, photos});
export const saveProfileActionCreator = (profile) => ({type: SAVE_PROFILE, profile})

export const getProfileThunkCreator = (userId, currentUserId) => {
    if(!userId) {
        userId = currentUserId;
    }

    return async (dispatch) => {
        let responce = await usersAPI.getProfile(userId);
        dispatch(setUserProfile(responce.data));
    }
}

export const getStatusThunkCreator = (userId) => async (dispatch) => {
        let responce = await profileAPI.getStatus(userId);
        dispatch(setStatus(responce.data));
    }


export const updateStatusThunkCreator = (status) => async (dispatch) => {
       let responce = await profileAPI.updateStatus(status)
        if (responce.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
}

export const savePhotoThunkCreator = (file) => async (dispatch) => {
    let responce = await profileAPI.savePhoto(file)
    if (responce.data.resultCode === 0) {
        dispatch(savePhotoActionCreator(responce.data.data.photos));
    }
}

export const saveProfileThunkCreator = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let responce = await profileAPI.saveProfile(profile)
    if (responce.data.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId));
    } else {
        dispatch(stopSubmit("editProfile", {_error: responce.data.messages[0]}));
        return Promise.reject(responce.data.messages[0])
    }
}

export default profileReducer;