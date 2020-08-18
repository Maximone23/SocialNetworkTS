import React from "react";
import style from "./Post.module.css"
import photo from "../../../../assets/image/user-photo.png"

function Post() {
    return (
        <div className={style.item}>
            <img src={photo} alt=""/>
            Post 1
            <div>
                <span>like</span>
            </div>
        </div>
    )
}
export default Post;