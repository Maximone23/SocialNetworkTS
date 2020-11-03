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




const authReducer = (state: InitialStateType = initialState, action: UsersPageActionTypes):InitialStateType => {


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


type UsersPageActionTypes = setAuthUserDataACActionType

type setAuthUserDataACActionType = {
    type: typeof SET_USER_DATA
    data: DataSetUserType
}




export const setAuthUserDataAC = (userId: number, email: string, login: string):setAuthUserDataACActionType => ({type: SET_USER_DATA, data: {userId, email, login}})



export default authReducer