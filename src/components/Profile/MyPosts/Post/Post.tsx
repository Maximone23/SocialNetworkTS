import React from "react";
import style from "./Post.module.css"
import photo from "../../../../assets/image/user-photo.png"
import {MessageType} from "../MyPosts"

function Post(props: MessageType) {
    return (
        <div className={style.item}>
            <img src={photo} alt=""/>
            {props.message}
            <div>
                <span>like</span>{props.likesCount}
            </div>
        </div>
    )
}
export default Post;