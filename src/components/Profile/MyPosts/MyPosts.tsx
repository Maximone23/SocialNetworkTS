import React, {ChangeEvent} from "react";
import style from "./MyPosts.module.css"
import Post, {PostsType} from "./Post/Post";

type MyPostsType = {
    posts: Array<PostsType>
    addPost: () => void
    updateNewPostText: (text: string) => void
    newPostText: string
}

function MyPosts(props: MyPostsType) {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}
    id={p.id} key={p.id}/>);

    let newPostElement = props.newPostText
    const onAddPost = (): void => {
        props.addPost();
    }
    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        let text = e.target.value
        props.updateNewPostText(text);
    }
    return (
            <div className={style.postsBlock}>
                <h3>My posts</h3>
                <div>
                    <div>
                        <textarea onChange={onPostChange} value={newPostElement} />
                    </div>
                    <div>
                        <button onClick={onAddPost}>Add post</button>
                    </div>
                </div>
                <div className={style.posts}>
                    {postsElements}
                </div>
            </div>
    )
}
export default MyPosts;