import React from 'react';
import s from './Login.module.css';
import sForm from '../common/FormsControls/FormControls.module.css';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormControls";
import {required} from "../../utils/validators/validator";
import {connect} from "react-redux";
import {loginThunkCreater} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"}
                       name={"email"}
                       component={Input}
                       validate={[required]}
                />
            </div>
            <div>
                <Field placeholder={"Password"}
                       type={"password"}
                       name={"password"}
                       component={Input}
                       validate={[required]}
                />
            </div>
            <div className={s.loginCheckbox}>
                <Field type={"checkbox"}
                       name={"rememberMe"}
                       component={Input}/> Remember me
            </div>
            {props.error && <div className={sForm.formControlSummaryError}>
                                {props.error}
                            </div>}
            <div>
                <button>
                    Login
                </button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1 className={s.loginHeader}>
                LOGIN
            </h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
    login: loginThunkCreater
} )(Login);