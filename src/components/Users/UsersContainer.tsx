import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import Users from "./Users";
import {
    follow, getUsers,
    setCurrentPage, toggleFollowingProgress, unfollow,
    UsersType
} from "../../redux/users-reducer";
import Preloader from "../Common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type MapStatePropsType = {
    users: Array<UsersType>
    totalCount: number
    error: string
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

export type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    setPage = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> :
                <Users users={this.props.users}
                       totalCount={this.props.totalCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       setPage={this.setPage}
                       followingInProgress={this.props.followingInProgress}
                       toggleFollowingProgress={this.props.toggleFollowingProgress}/>

            }
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.items,
        totalCount: state.usersPage.totalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        error: state.usersPage.error,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}



export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    follow, unfollow, setCurrentPage, toggleFollowingProgress,
    getUsers
})(UsersContainer);