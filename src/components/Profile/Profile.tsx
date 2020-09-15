import React from "react";
import style from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {InitialStateType} from "../../redux/profile-reducer";
import {Dispatch} from "redux";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ReduxStoreType} from "../../redux/redux-store";

type ProfileType = {
    store: ReduxStoreType

}

function Profile(props: ProfileType) {
    return (
        <div>
            <ProfileInfo />
            <MyPostsContainer store={props.store}/>
        </div>
    )
}
export default Profile;