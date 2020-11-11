import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import ProfileInfo from "./ProfileInfo/ProfileInfo";



type PathParamType = {
    userId: string
}
type MapStatePropsType = {
    profile: any
    status: any
}

type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamType>


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = '8290'
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {

        return <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
    }

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}




export default compose<React.ComponentClass>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)