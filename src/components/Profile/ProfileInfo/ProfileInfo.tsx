import React from "react"
import style from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader"
import ProfileStatus1 from "./ProfileStatus"



type ProfileInfoProps = {
    profile: any
    status: string
    updateStatus: (status: string) => void
}

function ProfileInfo({profile, status, updateStatus}: ProfileInfoProps) {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={style.descrBlock}>
                <div>{profile.fullName}</div>
                <img src={profile.photos.large} alt={'ProfilePhoto'}/>
                <div>{profile.aboutMe}</div>
                <ProfileStatus1 status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;