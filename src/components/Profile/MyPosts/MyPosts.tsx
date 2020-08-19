import React from "react";
import style from "./MyPosts.module.css"
import Post from "./Post/Post";

export type MessageType = {
    message: string
    likesCount: number
}

function MyPosts(props: any) {


    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}  />);
    return (
            <div className={style.postsBlock}>
                <h3>My posts</h3>
                <div>
                    <div><textarea></textarea></div>
                    <div><button>Add post</button></div>
                </div>
                <div className={style.posts}>
                    {postsElements}
                </div>
            </div>
    )
}
export default MyPosts;