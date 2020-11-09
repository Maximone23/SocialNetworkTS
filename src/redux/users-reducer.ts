import {usersAPI} from "../api/api";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {AxiosResponse} from "axios";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


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


let initialState = {
    items: [] as Array<UsersType>,
    totalCount: 0 as number,
    pageSize: 15 as number,
    currentPage: 1 as number,
    error: '' as string,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>
}

export type InitialStateType = typeof initialState


const usersReducer = (state: InitialStateType = initialState, action: UsersPageActionTypes): InitialStateType => {


    switch (action.type) {
        case FOLLOW:
            return {
                ...state, items: state.items.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state, items: state.items.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {...state, items: action.items}
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
    items: Array<UsersType>
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



export const followSucces = (userID: number): followACActionType => ({type: FOLLOW, id: userID})
export const unfollowSucces = (userID: number): unfollowACActionType => ({type: UNFOLLOW, id: userID})
export const setUsers = (items: Array<UsersType>): setUsersACActionType => ({type: SET_USERS, items})
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


export const getUsers = (currentPage: number, pageSize: number): ThunkAction<Promise<void>, AppStateType, unknown, UsersPageActionTypes> => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUsersTotalCount(data.totalCount))
    }
}
export const follow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, UsersPageActionTypes> => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        await usersAPI.follow(userId)
            .then((response: AxiosResponse) => {
                if (response.data.resultCode === 0 ) {
                    dispatch(followSucces(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}
export const unfollow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, UsersPageActionTypes> => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        await usersAPI.unfollow(userId)
            .then((response: AxiosResponse) => {
                if (response.data.resultCode === 0 ) {
                    dispatch(unfollowSucces(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}

export default usersReducer