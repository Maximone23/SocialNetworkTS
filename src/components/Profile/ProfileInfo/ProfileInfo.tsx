import React from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader";


type ProfileInfoProps = {
    profile: any
}

function ProfileInfo(props: ProfileInfoProps) {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img className={style.headerImg}  src="https://i.pinimg.com/originals/c6/17/8d/c6178d23d7fb64e625aa8686e84ee455.png" alt="headerImg"/>
            </div>
            <div className={style.descrBlock}>
                <div>{props.profile.fullName}</div>
                <img src={props.profile.photos.large} alt={'ProfilePhoto'}/>
                <div>{props.profile.aboutMe}</div>
            </div>
        </div>
    )
}
export default ProfileInfo;