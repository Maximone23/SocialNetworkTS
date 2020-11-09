import {DialogType, MessageType, sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";


type MapStatePropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
}

type MapDispatchPropsType = {
    updateMessageChange: (body: string) => void;
    sendMessage: () => void;
}



let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateMessageChange: (body: string) => {
            dispatch(updateNewMessageBodyAC(body))

        },
        sendMessage: () => {
            dispatch(sendMessageAC())
        }
    }
}


let AuthRedirectComponent = WithAuthRedirect(Dialogs)

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);