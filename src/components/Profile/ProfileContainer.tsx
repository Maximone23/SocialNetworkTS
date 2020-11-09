import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile} from "../../redux/profile-reducer";
import { RouteComponentProps, withRouter } from 'react-router-dom';



type PathParamType = {
    userId: string
}
type MapStatePropsType = {
    profile: any
}

type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamType>


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        debugger
        if(!userId) {
            userId = '2'
        }
        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile

    }
}


let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)