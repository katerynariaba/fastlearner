import React from 'react';
import { connect } from 'react-redux';

import {  Button, Form} from 'react-bootstrap';
import { Input } from '../..';
import { userActions } from '../../../Actions';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import './PasswordForm.css';

class PasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.validPasswordSchema = Yup.object().shape({
            password: Yup.string()
                .min(6, "Password must have at least 6 characters")
                .max(50, "Password must be less than 50 characters"),
            confpassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        });
    }

    handleSubmit(password) {
        if (password) 
        {
            this.props.editPassword(password);
        }
    }

    render() {
        const { editingPass } = this.props;
        return (
            <Formik
                initialValues={{ 
                    password: "", 
                    confpassword: ""
                }}
                validationSchema={this.validPasswordSchema}
                onSubmit={(values) => this.handleSubmit(values)}
                >
                    {( {values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur, 
                        handleSubmit
                    }) => (
                    <Form className="edit-form" name="form" onSubmit={handleSubmit}>
                        <Input
                            inputId="password-edit-input"
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
                            inputId="passwordConf-edit-input"
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

                        <Form.Group className="editPas-btn-group">
                            <Button variant="primary" type="submit">
                                Change password
                            </Button>
                            {editingPass}
                        </Form.Group>
                    </Form>
                )}
                </Formik>
        );
    }
  }
  
  function mapState(state) {
    const { editingPass } = state.users;
    return { editingPass };
  }
  
  const mapDispatchToProps = dispatch => ({
    editPassword: ( password ) => 
        dispatch(userActions.editPassword( password ))
})

  const connectedPasswordForm = connect(mapState, mapDispatchToProps)(PasswordForm);
  export { connectedPasswordForm as PasswordForm };
  