import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type ProfilePropsType = {
    profile: any
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: any) => void
}

function Profile({profile, updateStatus, isOwner, status, savePhoto}: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;