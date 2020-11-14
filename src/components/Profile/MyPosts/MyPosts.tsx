import React from "react";
import style from "./MyPosts.module.css"
import Post from "./Post/Post";
import {PostType} from "../../../redux/profile-reducer";
import {InjectedFormProps, Field, reduxForm } from "redux-form";

type MyPostsType = {
    posts: Array<PostType>
    addPost: (values: string) => void
}

type AddNewPostFormType = {
    newPostText: any //?????????????????????????????????????
}

function MyPosts(props: MyPostsType) {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}
    id={p.id} key={p.id}/>);

    const onAddPost = (values: AddNewPostFormType) => {
        props.addPost(values.newPostText);
    }
    return (
            <div className={style.postsBlock}>
                <h3>My posts</h3>
                <AddNewPostFormRedux onSubmit={onAddPost}/>
                <div className={style.posts}>
                    {postsElements}
                </div>
            </div>
    )
}

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"newPostText"} component={"textarea"}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm<AddNewPostFormType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;