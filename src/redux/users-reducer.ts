import {v1} from "uuid";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'


export type UsersType = {
    id: string
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: LocationUsersType
}
type LocationUsersType = {
    city: string
    country: string
}



let initialState = {
    users: [
        {
            id: v1(),
            photoUrl: 'https://yt3.ggpht.com/a/AATXAJyh_xFfA_5W5O-vndK8xvpAmmlIaPPKxecoEBym=s900-c-k-c0xffffffff-no-rj-mo',
            followed: false,
            fullName: 'Maxim',
            status: 'student',
            location: {city: 'St.Peterburg', country: 'Russia'}
        },
        {
            id: v1(),
            photoUrl: 'https://yt3.ggpht.com/a/AATXAJyh_xFfA_5W5O-vndK8xvpAmmlIaPPKxecoEBym=s900-c-k-c0xffffffff-no-rj-mo',
            followed: false,
            fullName: 'Dmitry',
            status: 'student',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: v1(),
            photoUrl: 'https://yt3.ggpht.com/a/AATXAJyh_xFfA_5W5O-vndK8xvpAmmlIaPPKxecoEBym=s900-c-k-c0xffffffff-no-rj-mo',
            followed: false,
            fullName: 'Natalia',
            status: 'student',
            location: {city: 'Tyumen', country: 'Russia'}
        },
        {
            id: v1(),
            photoUrl: 'https://yt3.ggpht.com/a/AATXAJyh_xFfA_5W5O-vndK8xvpAmmlIaPPKxecoEBym=s900-c-k-c0xffffffff-no-rj-mo',
            followed: false,
            fullName: 'Alena',
            status: 'student',
            location: {city: 'St.Peterburg', country: 'Russia'}
        }
    ] as Array<UsersType>
}

export type InitialStateType = typeof initialState


const usersReducer = (state: InitialStateType = initialState, action: UsersPageActionTypes):InitialStateType => {


    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }

}


type UsersPageActionTypes = followACActionType | unfollowACActionType | setUsersACActionType

type followACActionType = {
    type: typeof FOLLOW
    id: string
}
type unfollowACActionType = {
    type: typeof UNFOLLOW
    id: string
}
type setUsersACActionType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}


export const followAC = (userID: string) :followACActionType => ({type: FOLLOW, id: userID})
export const unfollowAC = (userID: string) :unfollowACActionType => ({type: UNFOLLOW, id: userID})
export const setUsersAC = (users: Array<UsersType>) :setUsersACActionType => ({type: SET_USERS, users})


export default usersReducer