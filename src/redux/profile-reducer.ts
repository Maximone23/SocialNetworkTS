import {v1} from "uuid";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

let initialState = {
    posts: [
        {id: v1(), message: 'Hi, how are u?', likesCount: 23},
        {id: v1(), message: 'It`s my first post', likesCount: 15}
    ] as Array<PostType>,
    newPostText: 'static Text' as string,
    profile: null
}
export type PostType = {
    id: string
    message: string
    likesCount: number
}
export type InitialStateType = typeof initialState


const profileReducer = (state: InitialStateType = initialState, action: ProfileActionTypes) => {


    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: v1(),
                message: state.newPostText,
                likesCount: 0
            }
            return {...state, newPostText: '', posts: [...state.posts, newPost]}
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newText}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state

    }

}
type ProfileActionTypes = AddPostACActionType |
    UpdateNewPostTextACActionType |
    setUserProfileACActionType

type UpdateNewPostTextACActionType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}
type setUserProfileACActionType = {
    type: typeof SET_USER_PROFILE
    profile: any
}
type AddPostACActionType = {
    type: typeof ADD_POST
}


export const addPostAC = (): AddPostACActionType => ({type: ADD_POST})

export const updateNewPostTextAC = (text: string): UpdateNewPostTextACActionType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})
export const setUserProfileAC = (profile: any): setUserProfileACActionType => ({type: SET_USER_PROFILE, profile})


export default profileReducer