import React from 'react'
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, Input} from "../Common/FormsControls/FormsControls"
import {required} from "../../utils/validators/validators"
import {login} from "../../redux/auth-reducer"
import {connect} from "react-redux"
import {Redirect} from 'react-router-dom'
import {AppStateType} from "../../redux/redux-store"
import styles from "./../Common/FormsControls/FormsControls.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type MapStateToPropsType = {
    isAuth: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField("Email", 'email', [required], Input)}
            {createField("Password", "password", [required], Input, {type: "password"})}
            {createField("checkbox", "checkbox", [], Input, {type: "checkbox"}, "remember me")}
            {props.error && <div className={styles.formSummaryError}>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

export const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }

}

export default connect<MapStateToPropsType, {}, {}, AppStateType>(mapStateToProps, {login})(Login)