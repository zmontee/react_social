import React from 'react';
import s from './Users.module.css';
import UsersItem from "./UsersItem/UsersItem";
import Preloader from '../common/Preloader/Preloader';

const Users = (props) => {

    let usersElements = props.users.map(u => <UsersItem
        id={u.id}
        smallPhoto={u.photos.small}
        followed={u.followed}
        name={u.name}
        status={u.status}
        follow={props.follow}
        unfollow={props.unfollow}
        followingInProgress={props.followingInProgress}
    />)

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (<div>
        <div className={s.pages}>
            {pages.map(p => {
                return <span className={props.currentPage === p && s.selectedPage}
                             onClick={() => props.onPageChanged(p)}>{p}</span>
            })}
        </div>
        {props.isFetching ? <Preloader /> : usersElements}

    </div>)
}

export default Users;