const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
    dialogs: [
        {id: 1, name: 'Maxim'},
        {id: 2, name: 'Dmitry'},
        {id: 3, name: 'Elena'},
        {id: 4, name: 'Andrew'},
        {id: 5, name: 'Daria'},
        {id: 6, name: 'Irina'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are u?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ] as Array<MessageType>,
    newMessageBody: '' as string
}
type MessageType = {
    id: number
    message: string
}
type DialogType = {
    id: number
    name: string
}
type InitialStateType = typeof initialState

const dialogsReducer = (state: InitialStateType = initialState, action: PostsActionTypes) => {


    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state
        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messages.push({id: 6, message: body})
            return state
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