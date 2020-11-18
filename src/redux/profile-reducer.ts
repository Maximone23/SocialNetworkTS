import {v1} from "uuid"
import {profileAPI, usersAPI} from '../api/api'
import {ThunkAction} from 'redux-thunk'
import {AppStateType} from './redux-store'

//Types
export type PostType = {
    id: string
    message: string
    likesCount: number
}
export type InitialStateType = typeof initialState
type ProfileActionTypes = AddPostActionType |
    setUserProfileActionType |
    setStatusActionType |
    DeletePostActionType

type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: any
}
type setStatusActionType = {
    type: typeof SET_STATUS
    status: any
}
type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: string
}

//Action
const ADD_POST = 'profile/ADD-POST'
const DELETE_POST = 'profile/DELETE-POST'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const SET_STATUS = 'profile/SET-STATUS'

//State
const initialState = {
    posts: [
        {id: v1(), message: 'Hi, how are u?', likesCount: 23},
        {id: v1(), message: 'It`s my first post', likesCount: 15}
    ] as Array<PostType>,
    profile: null,
    status: '' as string
}

const profileReducer = (state: InitialStateType = initialState, action: ProfileActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: v1(),
                message: action.newPostText,
                likesCount: 0
            }
            return {...state, posts: [newPost, ...state.posts]}
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}

//ActionCreators
export const addPost = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText})
export const deletePost = (postId: string): DeletePostActionType => ({type: DELETE_POST, postId})
export const setUserProfile = (profile: any): setUserProfileActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: any): setStatusActionType => ({type: SET_STATUS, status})

//ThunkCreators
export const getUserProfile = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionTypes> => {
    return async (dispatch) => {
        const response = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}
export const getStatus = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionTypes> => {
    return async (dispatch) => {
        const response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
    }
}
export const updateStatus = (status: any): ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionTypes> => {
    return async (dispatch) => {
        const response = await profileAPI.updateStatus(status)
        debugger
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}

export default profileReducer