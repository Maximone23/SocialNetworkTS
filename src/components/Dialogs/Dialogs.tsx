import React from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogType, MessageType} from "../../redux/dialogs-reducer";
import AddMessageForm, {AddMessageFormType} from "./AddMessageForm/AddMessageForm";


type DialogsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    updateMessageChange: (body: string) => void
    sendMessage: (values: AddMessageFormType) => void
}



function Dialogs(props: DialogsType) {


    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    let messagesElements = props.messages.map(m => <Message message={m.message} id={m.id} key={m.id}/>);

    let addNewMessage = (values: AddMessageFormType) => {
        props.sendMessage(values.newMessageBody)//???????????????????
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}




export default Dialogs;