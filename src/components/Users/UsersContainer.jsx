import React from 'react';
import {connect} from "react-redux";
import {
    getUsersThunkCreator,
    setCurrentPage,
    setTotalUsersCount,
    followThunkCreator,
    unfollowThunkCreator, toggleIsFetching, setUsers
} from "../../redux/usersReducer";

import Users from "./Users";
import {usersAPI} from "../../api/api";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSuperSelector
} from "../../redux/usersSelectors";

class UsersAPI extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            <Users users={this.props.users}
                   pageSize={this.props.pageSize}
                   totalUsersCount={this.props.totalUsersCount}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

/*let mapDispatchToProps = (dispatch) => {
    let action;
    return {
        follow: (userId) => {
            action = followActionCreator(userId);
            dispatch(action);
        },
        unfollow: (userId) => {
            action = unfollowActionCreator(userId);
            dispatch(action);
        },
        setUsers: (users) => {
            action = setUsersActionCreator(users);
            dispatch(action);
        },
        setCurrentPage: (currentPage) => {
            action = setCurrentPageActionCreator(currentPage);
            dispatch(action);
        },
        setTotalUsersCount: (totalUsersCount) => {
            action = setTotalUsersCountActionCreator(totalUsersCount);
            dispatch(action);
        },
        toggleIsFetching: (isFetching) => {
            action = toggleIsFetchingActionCreactor(isFetching);
            dispatch(action);
        }
    }
}*/

const UsersContainer = connect(mapStateToProps, {
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    setUsers,
    getUsers: getUsersThunkCreator,
    follow: followThunkCreator,
    unfollow: unfollowThunkCreator
})(UsersAPI);

export default UsersContainer;