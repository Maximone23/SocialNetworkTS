import React from "react"
import style from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader"
import ProfileStatus1 from "./ProfileStatus"



type ProfileInfoProps = {
    profile: any
    status: string
    updateStatus: (status: string) => void
}

function ProfileInfo(props: ProfileInfoProps) {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={style.descrBlock}>
                <div>{props.profile.fullName}</div>
                <img src={props.profile.photos.large} alt={'ProfilePhoto'}/>
                <div>{props.profile.aboutMe}</div>
                <ProfileStatus1 status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;