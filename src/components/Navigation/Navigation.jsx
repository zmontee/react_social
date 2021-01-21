import React from 'react';
import s from './Navigation.module.css';
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <nav className={s.navigation}>
            <div className={s.item}>
                <NavLink to='/profile' activeClassName={s.active}>
                    <i className="fas fa-user-alt"></i>
                    <div className={s.item_link}>Profile</div>
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' activeClassName={s.active}>
                    <i className="fas fa-users"></i>
                    <div className={s.item_link}>Users</div>
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/dialogs' activeClassName={s.active}>
                    <i className="fas fa-comments"></i>
                    <div className={s.item_link}>Messages</div>
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/news' activeClassName={s.active}>
                    <i className="fas fa-newspaper"></i>
                    <div className={s.item_link}>News</div>
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/music' activeClassName={s.active}>
                    <i className="fas fa-music"></i>
                    <div className={s.item_link}>Music</div>
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings' activeClassName={s.active}>
                    <i className="fas fa-cog"></i>
                    <div className={s.item_link}>Settings</div>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navigation;