import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {Form, Button} from 'react-bootstrap';
import {Input} from "../Input/Input";
import { userActions } from '../../../Actions';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faUser, 
    faUserTag, 
    faEnvelope, 
    faLock
} from '@fortawesome/free-solid-svg-icons'

import './RegisterForm.css';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.validationSchema = Yup.object().shape({
            firstName: Yup.string()
                .min(2, "First name must have at least 2 characters")
                .max(100, "First name must be less than 100 characters")
                .required("First name is required"),
            lastName: Yup.string()
                .min(2, "Last name must have at least 2 characters")
                .max(100, "Last name must be less than 100 characters")
                .required("Last name is required"),
            login: Yup.string()
                .min(2, "Login must have at least 2 characters")
                .max(100, "Login must be less than 100 characters")
                .required("Login is required"),
            email: Yup.string()
                .email("Must be a valid email address")
                .max(50, "Email must be less than 50 characters")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must have at least 6 characters")
                .max(50, "Password must be less than 50 characters")
                .required("Password is required"),
            confpassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        });
    }

    handleSubmit(user) {
        this.setState({ submitted: true });
        if (user.firstName && user.lastName && user.email && user.password && user.login) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        return (
            <div id="register-form">
                <h1 className="register-form-title">
                    Sign up
                </h1>
                <Formik
                    initialValues={{ 
                        firstName: "", 
                        lastName: "", 
                        login: "", 
                        password: "", 
                        email: "", 
                        confpassword: ""
                    }}
                    validationSchema={this.validationSchema}
                    onSubmit={(values) => this.handleSubmit(values)}
                >
                    {( {values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur, 
                        handleSubmit
                    }) => (
                    <Form className="register-form" name="form" onSubmit={handleSubmit}>
                        <Input
                            inputId="firstname-register-input"
                            type="text"
                            placeholder="First name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            name="firstName"
                            className={touched.firstName && errors.firstName ? "error" : null}
                            symbol={<FontAwesomeIcon icon={faUser}/>}
                        ></Input>
                        {touched.firstName && errors.firstName ? (
                                    <div className="error-message">{errors.firstName}</div>
                                ) : null}
                        <Input
                            inputId="lastname-register-input"
                            type="text"
                            placeholder="Last name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            name="lastName"
                            className={touched.lastName && errors.lastName ? "error" : null}
                            symbol={<FontAwesomeIcon icon={faUser}/>}
                        ></Input>
                        {touched.lastName && errors.lastName ? (
                                    <div className="error-message">{errors.lastName}</div>
                                ) : null}
                        <Input
                            inputId="login-register-input"
                            type="text"
                            placeholder="Login"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.login}
                            name="login"
                            className={touched.login && errors.login ? "error" : null}
                            symbol={<FontAwesomeIcon icon={faUserTag}/>}
                        ></Input>
                        {touched.login && errors.login ? (
                                    <div className="error-message">{errors.login}</div>
                                ) : null}
                        <Input
                            inputId="email-register-input"
                            type="text"
                            placeholder="Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            name="email"
                            className={touched.email && errors.email ? "error" : null}
                            symbol={<FontAwesomeIcon icon={faEnvelope}/>}
                        ></Input>
                        {touched.email && errors.email ? (
                                    <div className="error-message">{errors.email}</div>
                                ) : null}
                        <Input
                            inputId="password-register-input"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            name="password"
                            className={touched.password && errors.password ? "error" : null}
                            symbol={<FontAwesomeIcon icon={faLock}/>}
                        ></Input>
                        {touched.password && errors.password ? (
                                    <div className="error-message">{errors.password}</div>
                                ) : null}
                        <Input
                            inputId="confirm-register-input"
                            type="password"
                            placeholder="Repeat password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confpassword}
                            name="confpassword"
                            className={touched.confpassword && errors.confpassword ? "error" : null}
                            symbol={<FontAwesomeIcon icon={faLock}/>}
                        ></Input>
                        {touched.confpassword && errors.confpassword ? (
                                    <div className="error-message">{errors.confpassword}</div>
                                ) : null}
                        <Form.Group className="register-btn-group">
                            <Button variant="primary" type="submit" className="register-btn">
                                Sign up
                            </Button>
                            {registering}
                            <Link to="/login" className="btn btn-link cancel-btn">
                                Cancel
                            </Link>
                        </Form.Group>
                    </Form>
                    )}
                    </Formik>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const mapDispatchToProps = dispatch => ({
    register: ( user ) => 
        dispatch(userActions.register( user ))
})

const connectedRegisterForm = connect(mapState, mapDispatchToProps)(RegisterForm);
export { connectedRegisterForm as RegisterForm };