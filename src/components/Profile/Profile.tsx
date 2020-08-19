import React from "react";
import style from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile(props: any) {

    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={props.profilePage.posts}
                     dispatch={props.dispatch}/>
        </div>
    )
}
export default Profile;