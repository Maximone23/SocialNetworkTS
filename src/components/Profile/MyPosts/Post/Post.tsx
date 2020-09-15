import React from "react";
import style from "./Post.module.css"
import photo from "../../../../assets/image/user-photo.png"


export type PostsType = {
    id: number
    message: string
    likesCount: number
}

function Post(props: PostsType) {
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