import React from "react"
import styles from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader"
import userPhoto from './../../../assets/image/user-photo.png'
import ProfileStatus from "./ProfileStatus";



type ProfileInfoProps = {
    profile: any
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: any) => void
}

function ProfileInfo({profile, status, updateStatus, isOwner, savePhoto}: ProfileInfoProps) {
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }
    return (
        <div>
            <div className={styles.descrBlock}>
                <div className={styles.userPhoto}>
                    {profile.photos.large ? <img src={profile.photos.large} alt={'ProfilePhoto'}/> : <img src={userPhoto} alt={'ProfilePhoto'}/>}
                </div>
                {isOwner && <div><input type={'file'} onChange={onMainPhotoSelected}/> Change Photo</div>}
                <div><b>FullName</b>: {profile.fullName}</div>
                <div>
                    <b>Looking for a job</b>: {profile.lookingForAJob ? "Yes" : "No"}
                </div>
                {profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
                    }
                <div>
                    <b>About me</b>: {profile.aboutMe ? "Yes" : "No"}
                </div>
                {/*<div>*/}
                {/*    <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {*/}
                {/*        <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>*/}
                {/*})}*/}
                {/*</div>*/}
                <ProfileStatus status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}
const Contacts = ({contactTitle, contactValue}: any) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;