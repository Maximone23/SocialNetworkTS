import React from "react"
import Header from "./Header"
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";

type MapStatePropsType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    logout: () => void
}

export type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    render() {
        return <Header {...this.props}/>
    }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userId: state.auth.userId,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}


export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps, {logout})(HeaderContainer);