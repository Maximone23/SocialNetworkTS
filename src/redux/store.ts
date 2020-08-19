// type MessageType = {
//     id: number
//     message: string
// }
// type DialogsType = {
//     id: number
//     name: string
// }
// type PostType = {
//     id: number
//     message: string
//     likesCount: number
// }
// type profilePageType = {
//     dialogs: Array<PostType>
//     newPostText: string
// }
// type dialogsPageType = {
//     posts: Array<DialogsType>
//     messages: Array<MessageType>
// }
// type SidebarType ={}
// type RootStateType ={
//     profilePage: profilePageType
//     dialogsPage: dialogsPageType
//     sidebar: SidebarType
// }


import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are u?', likesCount: 23},
                {id: 2, message: 'It`s my first post', likesCount: 15}
            ],
            newPostText: 'static Text'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Maxim'},
                {id: 2, name: 'Dmitry'},
                {id: 3, name: 'Elena'},
                {id: 4, name: 'Andrew'},
                {id: 5, name: 'Daria'},
                {id: 6, name: 'Irina'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are u?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'}
            ],
            newMessageBody: ''
        },
        sidebar: {}
    },
    getState() {
        return this._state
    },
    _callSubscriber() {

    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber();



    }
}




export default store;
