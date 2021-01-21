import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.logo}>
                <NavLink to='/profile'>
                    <img
                        src="https://image.flaticon.com/icons/png/512/1588/1588022.png"
                        alt="logo"/>
                    <div className={s.logo_name}>Social</div>
                </NavLink>
            </div>
            <div className={s.login}>
                {props.isAuth
                    ? <div className={s.userAuth}>
                        <div className={s.userAuthName}>
                            {props.login}
                        </div>
                        <button onClick={props.logout} className={s.logout}>
                            logout
                        </button>
                    </div>
                    : <NavLink to='/login'>
                    Login
                </NavLink>}
            </div>
        </header>
    )
}

export default Header;