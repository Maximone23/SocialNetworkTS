import {usersAPI} from '../api/api'
import {AppStateType} from './redux-store'
import {ThunkAction} from 'redux-thunk'
import {Dispatch} from 'redux'
import {updateObjectInArray} from "../utils/object-helpers";

//Types
export type UsersType = {
    id: number
    name: string
    status: string
    photos: UserPhotosType
    followed: boolean
}
type UserPhotosType = {
    small: string
    large: string
}
type UsersPageActionTypes = followACActionType |
    unfollowACActionType |
    setUsersACActionType |
    setCurrentPageACActionType |
    setUsersTotalCountACActionType |
    toggleIsFetchingActionType |
    toggleFollowingActionType

type followACActionType = {
    type: typeof FOLLOW
    id: number
}
type unfollowACActionType = {
    type: typeof UNFOLLOW
    id: number
}
type setUsersACActionType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
type setCurrentPageACActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type setUsersTotalCountACActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    count: number
}
type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type toggleFollowingActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export type InitialStateType = typeof initialState

//Action
const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET-USERS'
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE'
const SET_USERS_TOTAL_COUNT = 'users/SET-USERS-TOTAL-COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE-IS-FOLLOWING-PROGRESS'

//State
let initialState = {
    users: [] as Array<UsersType>,
    totalCount: 0 as number,
    pageSize: 15 as number,
    currentPage: 1 as number,
    error: '' as string,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>
}

const usersReducer = (state: InitialStateType = initialState, action: UsersPageActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u
                })
                // users: updateObjectInArray(state.users, action.id, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: false}
                    }
                    return u
                    // users: updateObjectInArray(state.users, action.id, 'id', {followed: false})
                })
            }

        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_USERS_TOTAL_COUNT:
            return {...state, totalCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

//ActionCreators
export const followSuccess = (userID: number): followACActionType => ({type: FOLLOW, id: userID})
export const unfollowSuccess = (userID: number): unfollowACActionType => ({type: UNFOLLOW, id: userID})
export const setUsers = (users: Array<UsersType>): setUsersACActionType => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): setCurrentPageACActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
export const setUsersTotalCount = (count: number): setUsersTotalCountACActionType => ({
    type: SET_USERS_TOTAL_COUNT,
    count
})
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})
export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

//ThunkCreators
const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: any) => { /////////??????????????????????????
    dispatch(toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}
export const requestUsers = (requestedPage: number, pageSize: number): ThunkAction<Promise<void>, AppStateType, unknown, UsersPageActionTypes> => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(requestedPage))
        const data = await usersAPI.getUsers(requestedPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUsersTotalCount(data.totalCount))
    }
}
export const follow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, UsersPageActionTypes> => {
    return async (dispatch) => {
        debugger
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}
export const unfollow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, UsersPageActionTypes> => {
    return async (dispatch) => {
        debugger
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer