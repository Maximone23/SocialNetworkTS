import React from "react";
import style from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";


function DialogItem(props: any) {
    let path = "/dialogs/" + props.id
    return (
        <div className={`${style.dialog} ${style.active}`}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

function Message(props: any) {
    return <div className={style.message}>{props.message}</div>
}

function Dialogs() {
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                <DialogItem name="Maxim" id="1"/>
                <DialogItem name="Dmitry" id="2"/>
                <DialogItem name="Elena" id="3"/>
                <DialogItem name="Daria" id="4"/>
                <DialogItem name="Irina" id="5"/>
            </div>
            <div className={style.messages}>
                <Message message="Hi"/>
                <Message message="How are u?"/>
                <Message message="Yo"/>
            </div>
        </div>
    )
}

export default Dialogs;