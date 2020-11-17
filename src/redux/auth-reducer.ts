import {authAPI} from "../api/api";
import {AxiosResponse} from "axios";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {FormAction, stopSubmit} from "redux-form";

//Action
const SET_USER_DATA = 'auth/SET-USER-DATA'


type DataSetUserType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
export type InitialStateType = DataSetUserType

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {


    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }


        default:
            return state
    }

}


type ActionTypes = setAuthUserDataActionType | FormAction

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: DataSetUserType
}

//ActionCreators
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

//ThunkCreators
export const getAuthUserData = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
    return async (dispatch) => {
        const response = await authAPI.me()
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}
export const login = (email: string, password: string, rememberMe: boolean): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
    return async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            debugger
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            debugger
            dispatch(stopSubmit("login", {_error: message}))
        }
    }
}
export const logout = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
    return async (dispatch) => {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}


export default authReducer