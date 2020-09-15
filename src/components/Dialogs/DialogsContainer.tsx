import React from "react";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import {ReduxStoreType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";


type PropsType = {
    store: ReduxStoreType
}


function DialogsContainer(props: PropsType) {

    let state = props.store.getState().dialogsPage


    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageAC())
    }
    let newMessageChange = (body: string) => {
        props.store.dispatch(updateNewMessageBodyAC(body))
    }
    return <Dialogs dialogs={state.dialogs}
                    messages={state.messages}
                    newMessageChange={newMessageChange}
                    sendMessageAC={onSendMessageClick}
                    newMessageBody={state.newMessageBody}/>
}

export default DialogsContainer;