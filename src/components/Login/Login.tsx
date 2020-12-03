import React from 'react'
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, Input} from "../Common/FormsControls/FormsControls"
import {required} from "../../utils/validators/validators"
import {login} from "../../redux/auth-reducer"
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from 'react-router-dom'
import {AppStateType} from "../../redux/redux-store"
import styles from "./../Common/FormsControls/FormsControls.module.css"

type LoginFormValuesType = {
    captcha: string
    email: string
    password: string
    rememberMe: boolean
}
type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
    = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", 'email', [required], Input)}
            {createField("Password", "password", [required], Input, {type: "password"})}
            {createField("checkbox", "checkbox", [], Input, {type: "checkbox"}, "remember me")}
            {captchaUrl && <img src={captchaUrl} alt={''}/>}
            {captchaUrl && createField('Simbols for image', 'captcha', [required], Input) }
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

export const Login = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}



