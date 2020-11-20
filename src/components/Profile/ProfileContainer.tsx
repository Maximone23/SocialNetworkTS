import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatus, getUserProfile, savePhoto, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type PathParamType = {
    userId: any
}
type MapStatePropsType = {
    profile: any
    status: any
    authorizedUserId: number | null
    isAuth: boolean
    isOwner: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (photo: any) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamType>


class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return <Profile profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        isOwner={!this.props.match.params.userId}
                        savePhoto={this.props.savePhoto}/>
    }

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        isOwner: state.auth.isOwner
    }
}


export default compose<React.ComponentClass>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)