import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {Route, withRouter} from 'react-router-dom'
import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import {Login} from './components/Login/Login'
import {connect} from 'react-redux'
import {AppStateType} from './redux/redux-store'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/Common/Preloader/Preloader'
import { withSuspense } from './hoc/withSuspense'
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

type MapStatePropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeApp: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType




class App extends React.Component <PropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path={"/dialogs"} render={withSuspense(DialogsContainer)}/>
                    <Route path={"/profile/:userId?"} render={withSuspense(ProfileContainer)}/>
                    <Route path={"/users"} render={() => <UsersContainer/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: AppStateType ) => {
    return {
        initialized: state.app.initialized
    }

}

export default compose<React.ComponentClass>(
    withRouter,
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
    (mapStateToProps, {initializeApp}))(App);
