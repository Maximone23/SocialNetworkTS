import React from "react"
import Header from "./Header"
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserData} from "../../redux/auth-reducer";
import {connect} from "react-redux";

type MapStatePropsType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    getAuthUserData: () => void
}

export type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header userId={this.props.userId}
                       email={this.props.email}
                       login={this.props.login}
                       isAuth={this.props.isAuth}/>
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



export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType > (mapStateToProps, {getAuthUserData})(HeaderContainer);