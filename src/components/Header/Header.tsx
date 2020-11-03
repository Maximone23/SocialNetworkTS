import React from "react";
import style from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {HeaderPropsType} from "./HeaderContainer";

function Header(props: HeaderPropsType) {
    return (
        <header className={style.header}>
            <img
                src="https://yt3.ggpht.com/a/AATXAJzeNoiL3bhe-3kaWBgHbx4b9cn0aalFJjs6Gg=s900-c-k-c0xffffffff-no-rj-mo"
                alt="logo"/>
            <div className={style.loginBlock}>
                { props.isAuth ? <div>
                    <div>Login: {props.login}</div>
                    <div>ID: {props.userId}</div>
                    <div>E-mail: {props.email}</div>
                </div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header;