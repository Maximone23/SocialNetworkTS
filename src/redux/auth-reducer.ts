import {authAPI} from "../api/api";
import {AxiosResponse} from "axios";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const SET_USER_DATA = 'SET_USER_DATA'




type DataSetUserType = {
    userId: number | null
    email: string | null
    login: string | null
}
export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}



let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}




const authReducer = (state: InitialStateType = initialState, action: ActionTypes):InitialStateType => {


    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
        }


        default:
            return state
    }

}


type ActionTypes = setAuthUserDataActionType

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    data: DataSetUserType
}




export const setAuthUserData = (userId: number, email: string, login: string): setAuthUserDataActionType => ({type: SET_USER_DATA, data: {userId, email, login}})
export const getAuthUserData = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
    return async (dispatch) => {
        await authAPI.me()
            .then((response: AxiosResponse) => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    dispatch(setAuthUserData(id, email, login))
                }

            })
    }
}



export default authReducer