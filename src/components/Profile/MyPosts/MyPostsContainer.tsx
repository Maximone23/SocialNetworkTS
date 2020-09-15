import React from "react";
import {addPost, InitialStateType, updateNewPostText} from "../../../redux/profile-reducer";
import {Dispatch} from "redux";
import MyPosts from "./MyPosts";
import {ReduxStoreType} from "../../../redux/redux-store";

type ProfileType = {
    store: ReduxStoreType
}


function MyPostsContainer(props: ProfileType) {
    let state = props.store.getState().profilePage
    let onAddPost = (): void => {
        props.store.dispatch(addPost());
    }
    let onPostChange = (text: string): void => {
        let action = updateNewPostText(text)
        props.store.dispatch(action);
    }
    return (
        <MyPosts
            updateNewPostText={onPostChange}
            addPost={onAddPost}
            posts={state.posts}
            newPostText={state.newPostText}/>
    )
}

export default MyPostsContainer;