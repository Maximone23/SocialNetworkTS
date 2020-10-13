import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


let store = createStore(rootReducer)

export type ReduxStoreType = typeof store


export default store