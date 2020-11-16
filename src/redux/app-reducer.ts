import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";


const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'





export type InitialStateType = typeof initialState



let initialState = {
    initialized: false
}




const appReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {


    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
        }


        default:
            return state
    }

}



type ActionTypes = setInitializedSuccessActionType

type setInitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}




export const initializedSuccess = (): setInitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})
export const initializeApp = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
    return async (dispatch) => {
        await dispatch(getAuthUserData())
            .then(() => {
                dispatch(initializedSuccess())
        })
    }
}




export default appReducer