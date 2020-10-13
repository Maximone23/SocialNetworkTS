import {v1} from "uuid";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
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
    ] as Array<MessageType>,
    newMessageBody: '' as string
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
        case UPDATE_NEW_MESSAGE_BODY:
            return {...state, newMessageBody: action.body}
        case SEND_MESSAGE:
            let body = state.newMessageBody
            return {...state, newMessageBody: '', messages: [...state.messages, {id: v1(), message: body}]}
        default:
            return state
    }
}
type sendMessageACActionType = {
    type: typeof SEND_MESSAGE
}
type updateNewMessageBodyACActionType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY
    body: string
}
type PostsActionTypes = sendMessageACActionType | updateNewMessageBodyACActionType

export const sendMessageAC = (): sendMessageACActionType =>  ({type: SEND_MESSAGE })
export const updateNewMessageBodyAC = (body: string): updateNewMessageBodyACActionType => ({type: UPDATE_NEW_MESSAGE_BODY, body: body })



export default dialogsReducer