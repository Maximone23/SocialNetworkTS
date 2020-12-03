import React, {ChangeEvent, useState} from "react"
import styles from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader"
import userPhoto from '../../../assets/image/user-photo.png'
import ProfileStatus from "./ProfileStatus";
import ProfileDataFormReduxForm, {ProfileType} from "./ProfileDataForm";



type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: any) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

function ProfileInfo({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfileInfoPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }
    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }
    return (
        <div>
            <div className={styles.descrBlock}>
                <div className={styles.userPhoto}>
                    {profile.photos.large ? <img src={profile.photos.large} alt={'ProfilePhoto'}/> :
                        <img src={userPhoto} alt={'ProfilePhoto'}/>}
                </div>
                {isOwner && <div><input type={'file'} onChange={onMainPhotoSelected}/> Change Photo</div>}
                {editMode
                    ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}/>}
                <ProfileStatus status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {
    return (
        <>
            {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
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
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </>
    )

}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contacts: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={styles.contacts}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;