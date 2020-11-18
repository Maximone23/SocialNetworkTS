import {ThunkAction} from 'redux-thunk'
import {AppStateType} from './redux-store'
import {getAuthUserData} from './auth-reducer'

//Types
export type InitialStateType = typeof initialState
type ActionTypes = setInitializedSuccessActionType
type setInitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

//Action
const INITIALIZED_SUCCESS = 'app/INITIALIZED-SUCCESS'

//State
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




//ActionCreators
export const initializedSuccess = (): setInitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

//ThunkCreators
export const initializeApp = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
    return async (dispatch) => {
        await dispatch(getAuthUserData())
        dispatch(initializedSuccess())
    }
}

export default appReducer