import React from "react";
import style from "./MyPosts.module.css"
import Post from "./Post/Post";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";

export type MessageType = {
    message: string
    likesCount: number
}

function MyPosts(props: any) {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}  />);

    let newPostElement = React.createRef()
    let addPost = () => {
        props.dispatch(addPostAC());
    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch(updateNewPostTextAC(text));
    }
    return (
            <div className={style.postsBlock}>
                <h3>My posts</h3>
                <div>
                    <div>
                        <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                    </div>
                    <div>
                        <button onClick={addPost}>Add post</button>
                    </div>
                </div>
                <div className={style.posts}>
                    {postsElements}
                </div>
            </div>
    )
}
export default MyPosts;