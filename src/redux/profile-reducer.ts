import {v1} from "uuid"
import {profileAPI, usersAPI} from "../api/api"
import {AxiosResponse} from "axios"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'

let initialState = {
    posts: [
        {id: v1(), message: 'Hi, how are u?', likesCount: 23},
        {id: v1(), message: 'It`s my first post', likesCount: 15}
    ] as Array<PostType>,
    profile: null,
    status: '' as string
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
                message: action.newPostText,
                likesCount: 0
            }
            return {...state, posts: [newPost, ...state.posts]}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
            case SET_STATUS:
            return {...state, status: action.status}
        default:
            return state

    }

}
type ProfileActionTypes = AddPostActionType |
    setUserProfileActionType |
    setStatusActionType


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


export const addPost = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile: any): setUserProfileActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: any): setStatusActionType => ({type: SET_STATUS, status})

export const getUserProfile = (userId: string): ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionTypes> => {
    return async(dispatch) => {
        await usersAPI.getProfile(userId)
            .then((response: AxiosResponse) => {
                dispatch(setUserProfile(response.data))
            })
    }
}
export const getStatus = (userId: string): ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionTypes> => {
    return async(dispatch) => {
        await profileAPI.getStatus(userId)
            .then((response: AxiosResponse) => {
                dispatch(setStatus(response.data))
            })
    }
}
export const updateStatus = (status: any): ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionTypes> => {
    return async(dispatch) => {
        await profileAPI.updateStatus(status)
            .then((response: AxiosResponse) => {
                debugger
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    }
}


export default profileReducer