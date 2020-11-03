import React from "react"
import Header from "./Header"
import axios, {AxiosResponse} from "axios";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {setAuthUserDataAC} from "../../redux/auth-reducer";
import {connect} from "react-redux";


type MapStatePropsType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    setAuthUserData: (userId: number, email: string, login: string) => void
}

export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<any, any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then((response: AxiosResponse) => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }

            })
    }

    render() {
        return <Header userId={this.props.userId}
                       email={this.props.email}
                       login={this.props.login}
                       isAuth={this.props.isAuth}
                       setAuthUserData={this.props.setAuthUserData}/>
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
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        setAuthUserData: (userId: number, email: string, login: string) => {
            dispatch(setAuthUserDataAC(userId, email, login))
        }
    }
}


export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType > (mapStateToProps, mapDispatchToProps)(HeaderContainer);