import {applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunk from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer"

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

let store = createStore(rootReducer, applyMiddleware(thunk))

export type ReduxStoreType = typeof store

export default store