import React from 'react';
import s from './UsersItem.module.css';
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {usersAPI} from "../../../api/api";

const UsersItem = (props) => {
    return (
        <div key={props.id}>
            <div className={s.userWrapper}>
                <div className={s.userPhotoWrapper}>
                    <div className={s.userPhoto}>
                        <NavLink to={'/profile/' + props.id}>
                            <img
                                src={props.smallPhoto != null ? props.smallPhoto : 'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png'}
                                alt='no-photo'/>
                        </NavLink>
                    </div>
                    <div className={s.userFollow}>
                        {props.followed
                            ? <button disabled={props.followingInProgress.some(id => id === props.id)}
                                      onClick={() => props.unfollow(props.id)}
                                      className={s.userFollow}>
                                Unfollow
                            </button>
                            : <button disabled={props.followingInProgress.some(id => id === props.id)}
                                      onClick={() => props.follow(props.id)}
                                      className={s.userFollow}>
                                Follow
                            </button>}
                            {/*? <button disabled={props.followingInProgress.some(id => id === props.id)}
                                      onClick={() => {
                                        props.toggleFollowingProgress(true, props.id);
                                        usersAPI.unfollow(props.id).then(data => {
                                        if (data.resultCode === 0) {
                                            props.accesUnfollow(props.id)
                                        }
                                        props.toggleFollowingProgress(false, props.id);
                                });

                            }} className={s.userFollow}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === props.id)}
                                      onClick={() => {
                                        props.toggleFollowingProgress(true, props.id);
                                        usersAPI.follow(props.id).then(data => {
                                            if (data.resultCode === 0) {
                                                props.accesFollow(props.id);
                                            }
                                            props.toggleFollowingProgress(false, props.id);
                                });
                            }} className={s.userFollow}>Follow</button>}*/}
                    </div>
                </div>
                <div className={s.userDescrWrapper}>
                    <div className={s.userDescrItem}>
                        <NavLink to={'/profile/' + props.id}>
                            <div className={s.userName}>
                                {props.name}
                            </div>
                        </NavLink>
                        <div className={s.userStatus}>
                            {props.status}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UsersItem;