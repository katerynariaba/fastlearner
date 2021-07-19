import React from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { Input } from "../Input/Input";
import { userActions } from '../../../Actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import './LoginForm.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.props.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.validationSchema = Yup.object().shape({
            email: Yup.string()
                .email("Must be a valid email address")
                .max(50, "Email must be less than 50 characters")
                .required("Email is required"),
            password: Yup.string()
                .max(50, "Password must be less than 50 characters")
                .required("Password is required"),
        });
    }

    handleSubmit(values) {
        this.setState({ submitted: true });

        const { email, password } = values;

        if (email && password) {
            this.props.login(email, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        return (
            <div id="login-form">
                <h1 className="login-form-title">
                    sign in
            </h1>
                <Formik
                    initialValues={{ password: "", email: "", }}
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
                        <Form className="login-form" name="form" onSubmit={handleSubmit}>
                            <Input
                                inputId="email-login-input"
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={touched.email && errors.email ? "error" : null}
                                symbol={<FontAwesomeIcon icon={faEnvelope} />}
                            ></Input>
                                {touched.email && errors.email ? (
                                    <div className="error-message">{errors.email}</div>
                                ) : null}
                            <Input
                                inputId="password-login-input"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className={touched.password && errors.password ? "error" : null}
                                symbol={<FontAwesomeIcon icon={faLock} />}
                            ></Input>
                                {touched.password && errors.password ? (
                                    <div className="error-message">{errors.password}</div>
                                ) : null}

                            <Form.Group className="login-btn-group">
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                                {loggingIn}
                            </Form.Group>

                            <div className="login-button-group login-btn-link">
                                <Button variant="link" href="/registration">Registration</Button>
                                <p>  or  </p>
                                <Button variant="link" href="/registration">Forgot password?</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(userActions.login(email, password)),
    logout: () => dispatch(userActions.logout())
})

const connectedLoginForm = connect(mapState, mapDispatchToProps)(LoginForm);
export { connectedLoginForm as LoginForm };