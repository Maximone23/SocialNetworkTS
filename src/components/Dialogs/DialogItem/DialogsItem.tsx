import React from "react";
import style from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";


function DialogItem(props: any) {
    let path = "/dialogs/" + props.id
    return (
        <div className={`${style.dialog} ${style.active}`}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}


export default DialogItem;