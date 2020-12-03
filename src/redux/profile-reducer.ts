import {v1} from "uuid"
import {profileAPI} from '../api/api'
import {ThunkAction} from 'redux-thunk'
import {AppStateType} from './redux-store'
import {ProfileType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {FormAction, stopSubmit} from "redux-form";

//Types
export type PostType = {
    id: string
    message: string
    likesCount: number
}
export type InitialStateType = {
    posts:  Array<PostType>
    profile: any
    status: string
}
type ProfileActionTypes = AddPostActionType
    | setUserProfileActionType
    | setStatusActionType
    | DeletePostActionType
    | SavePhotoSuccessActionType


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
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: any
}

//Action
const ADD_POST = 'profile/ADD-POST'
const DELETE_POST = 'profile/DELETE-POST'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const SET_STATUS = 'profile/SET-STATUS'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE-PHOTO_SUCCESS'

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
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state
    }
}

//ActionCreators
export const addPost = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText})
export const deletePost = (postId: string): DeletePostActionType => ({type: DELETE_POST, postId})
export const setUserProfile = (profile: any): setUserProfileActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: any): setStatusActionType => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos: any): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

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
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}
export const savePhoto = (file: any): ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionTypes> => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}
export const saveProfile = (profile: ProfileType): ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionTypes | FormAction> => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        let response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === 0) {
            if (userId != null) {
                dispatch(getUserProfile(userId))
                debugger
            }
            else {
                throw new Error("userId can't be null")
            }
        } else {
            dispatch(stopSubmit('edit-profile', {'contacts':{'facebook': response.data.messages[0]} }))
            return Promise.reject(response.data.messages[0])
        }
    }
}

export default profileReducer