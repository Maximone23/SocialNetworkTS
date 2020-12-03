import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileInfo/ProfileDataForm";

type ProfilePropsType = {
    profile: any
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: any) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

function Profile({profile, updateStatus, isOwner, status, savePhoto, saveProfile}: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;