import React from "react";
import style from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";

function Profile() {
    return (
        <div>
            <div>
                <img src="https://i.pinimg.com/originals/c6/17/8d/c6178d23d7fb64e625aa8686e84ee455.png" alt=""/>
            </div>
            <div>
                ava + descr
            </div>
            <MyPosts />
        </div>
    )
}
export default Profile;