import React, { ChangeEvent } from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}
type DialogsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageChange: (body: string) => void
    newMessageBody: string
    sendMessageAC: () => void
}



function Dialogs(props: DialogsType) {


    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = props.messages.map(m => <Message message={m.message} id={m.id}/>);
    let newMessageBodyValue = props.newMessageBody

    let onSendMessageClick = () => {
        props.sendMessageAC()
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.newMessageChange(body)
    }
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                <div>{messagesElements}</div>
                <div><textarea placeholder="Enter Your Message"
                               onChange={onNewMessageChange}
                               value={newMessageBodyValue}/></div>
                <div><button onClick={onSendMessageClick}>Send</button></div>
            </div>
        </div>
    )
}

export default Dialogs;