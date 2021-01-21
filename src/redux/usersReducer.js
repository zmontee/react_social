import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [/*{
        id: '1',
        photoUrl: 'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png',
        followed: false,
        fullName: 'Andrey D.',
        status: 'So good to be me.',
        location: {city: 'Kyiv', country: 'Ukraine'}
    },
        {
            id: '2',
            photoUrl: 'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png',
            followed: true,
            fullName: 'Elsa C.',
            status: 'I am so pretty.',
            location: {city: 'New York', country: 'USA'}
        },
        {
            id: '3',
            photoUrl: 'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png',
            followed: false,
            fullName: 'Kostya K.',
            status: 'I am looking for job',
            location: {city: 'Lviv', country: 'Ukraine'}

        }*/],
    pageSize: 5,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,
                    action.userId,
                    "id",
                    {followed: true})
                /*users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: true}
                        }
                        return u;
                    }
                )*/
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,
                    action.userId,
                    "id",
                    {followed: false})
                /*users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })*/
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

//Action creators
export const accesFollow = (userId) => ({type: FOLLOW, userId});
export const accesUnfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount};
}
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (followingInProgress, userId) => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId};
}

export const getUsersThunkCreator = (currentPage, pageSize) => /*async*/ (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    /*let responce = await usersAPI.getUsers(currentPage, pageSize);*/
    usersAPI.getUsers(currentPage, pageSize).then(responce => {
        dispatch(setUsers(responce.data.items));
    })
    dispatch(toggleIsFetching(false));
    /*dispatch(setUsers(responce.data.items));*/


    /*dispatch(setTotalUsersCount(responce.data.totalCount));*/ //set all users from server
}

const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, id));
    let responce = await apiMethod(id);
    if (responce.data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleFollowingProgress(false, id));
}

export const unfollowThunkCreator = (id) => async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);
    let actionCreator = accesUnfollow;
    followUnfollowFlow(dispatch, id, apiMethod, actionCreator);
}
export const followThunkCreator = (id) => async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI);
    let actionCreator = accesFollow;
    followUnfollowFlow(dispatch, id, apiMethod, actionCreator);
}


export default usersReducer;