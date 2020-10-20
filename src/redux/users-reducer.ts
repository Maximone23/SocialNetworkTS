
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT'


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
    error: '' as string
}

export type InitialStateType = typeof initialState


const usersReducer = (state: InitialStateType = initialState, action: UsersPageActionTypes):InitialStateType => {


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
        default:
            return state
    }

}


type UsersPageActionTypes = followACActionType | unfollowACActionType | setUsersACActionType | setCurrentPageACActionType | setUsersTotalCountACActionType

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


export const followAC = (userID: number) :followACActionType => ({type: FOLLOW, id: userID})
export const unfollowAC = (userID: number) :unfollowACActionType => ({type: UNFOLLOW, id: userID})
export const setUsersAC = (items: Array<UsersType>) :setUsersACActionType => ({type: SET_USERS, items})
export const setCurrentPageAC = (currentPage: number) :setCurrentPageACActionType => ({type: SET_CURRENT_PAGE, currentPage})
export const setUsersTotalCountAC = (count: number) :setUsersTotalCountACActionType => ({type: SET_USERS_TOTAL_COUNT, count})


export default usersReducer