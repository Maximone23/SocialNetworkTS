import {authAPI, securityAPI} from '../api/api'
import {AppStateType} from './redux-store'
import {ThunkAction} from 'redux-thunk'
import {FormAction, stopSubmit} from 'redux-form'


//Types
type DataSetUserType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
export type InitialStateType = DataSetUserType & {
    isOwner: boolean
    captchaUrl: string | null
}
type ActionTypes = setAuthUserDataActionType | FormAction
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: DataSetUserType
}

//Action
const SET_USER_DATA = 'auth/SET-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET-CAPTCHA-URL-SUCCESS'

//State
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isOwner: false,
    captchaUrl: null
}

const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case GET_CAPTCHA_URL_SUCCESS:
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

//ActionCreators
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})
export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: SET_USER_DATA,
    payload: {captchaUrl}
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
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null)
    : ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
    return async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
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
export const getCaptchaUrl = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
    return async (dispatch) => {
        const response = await securityAPI.getCaptcha()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    }
}

export default authReducer