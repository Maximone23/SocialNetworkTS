import React from "react";
import style from "./ProfileInfo.module.css";

function ProfileInfo() {
    return (
        <div>
            <div>
                <img src="https://i.pinimg.com/originals/c6/17/8d/c6178d23d7fb64e625aa8686e84ee455.png" alt=""/>
            </div>
            <div className={style.descrBlock}>
                ava + descr
            </div>
        </div>
    )
}
export default ProfileInfo;