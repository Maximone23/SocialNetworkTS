import {v1} from "uuid";


const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
    dialogs: [
        {id: v1(), name: 'Maxim'},
        {id: v1(), name: 'Dmitry'},
        {id: v1(), name: 'Elena'},
        {id: v1(), name: 'Andrew'},
        {id: v1(), name: 'Daria'},
        {id: v1(), name: 'Irina'}
    ] as Array<DialogType>,
    messages: [
        {id: v1(), message: 'Hi'},
        {id: v1(), message: 'How are u?'},
        {id: v1(), message: 'Yo'},
        {id: v1(), message: 'Yo'},
        {id: v1(), message: 'Yo'}
    ] as Array<MessageType>
}
export type MessageType = {
    id: string
    message: string
}
export type DialogType = {
    id: string
    name: string
}
type InitialStateType = typeof initialState

const dialogsReducer = (state: InitialStateType = initialState, action: PostsActionTypes) => {


    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {...state, messages: [...state.messages, {id: v1(), message: body}]}
        default:
            return state
    }
}
type sendMessageACActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

type PostsActionTypes = sendMessageACActionType

export const sendMessage = (newMessageBody: string): sendMessageACActionType =>  ({type: SEND_MESSAGE, newMessageBody })



export default dialogsReducer