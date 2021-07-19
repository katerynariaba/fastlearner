import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Input } from '..';
import { Button, Form } from 'react-bootstrap';
import { userActions } from '../../../Actions';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faUser, 
    faUserTag, 
    faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import { 
    faTwitter, 
    faInstagram, 
    faFacebook,
    faLinkedin
  } from '@fortawesome/free-brands-svg-icons'

import './EditForm.css';

class EditForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.validEditSchema = Yup.object().shape({
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
            facebookUrl: Yup.string()
                .max(150, "Facebook Url must be less than 150 charecters"),
            twitterUrl: Yup.string()
                .max(150, "Twitter Url must be less than 150 charecters"),
            linkendinUrl: Yup.string()
                .max(150, "Linkendin Url must be less than 150 charecters"),
            instagramUrl: Yup.string()
                .max(150, "Instagram Url must be less than 150 charecters"),
        });
    }

    handleSubmit(user) {
        if (
            user.firstName 
            && user.lastName 
            && user.email 
            && user.login ) 
        {
            this.props.edit(user);
        }
    }

    componentDidMount() {
        this.props.me();
    }

    render() {
        const { user, editing } = this.props;
        return (
            <Formik
                initialValues={{ 
                    firstName: user?.firstName || '', 
                    lastName: user?.lastName || '', 
                    login: user?.login || '', 
                    email: user?.email || '', 
                    twitterUrl: user?.twitterUrl || '',
                    facebookUrl: user?.facebookUrl || '',
                    linkendinUrl: user?.linkendinUrl || '',
                    instagramUrl: user?.instagramUrl || ''
                }}
                validationSchema={this.validEditSchema}
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
                            inputId="firstname-edit-input"
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
                            inputId="lastname-edit-input"
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
                            inputId="login-edit-input"
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
                            inputId="email-edit-input"
                            type="text"
                            placeholder="Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            name="email"
                            className={touched.email && errors.email ? "error" : null}
                            symbol={<FontAwesomeIcon icon={faEnvelope}/>}
                            disabled
                        ></Input>
                        {touched.email && errors.email ? (
                                    <div className="error-message">{errors.email}</div>
                                ) : null}
                        <Input
                            inputId="facebookUrl-edit-input"
                            type="text"
                            placeholder="https://www.facebook.com/"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.facebookUrl}
                            name="facebookUrl"
                            className={touched.facebookUrl && errors.facebookUrl ? "error" : null}
                            symbol={<FontAwesomeIcon icon={faFacebook}/>}
                        ></Input>
                        {touched.facebookUrl && errors.facebookUrl ? (
                                    <div className="error-message">{errors.facebookUrl}</div>
                                ) : null}
                        <Input
                            inputId="twitterUrl-edit-input"
                            type="text"
                            placeholder="https://www.twitter.com/"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.twitterUrl}
                            name="twitterUrl"
                            className={touched.twitterUrl && errors.twitterUrl ? "error" : null}
                            symbol={<FontAwesomeIcon icon={faTwitter}/>}
                        ></Input>
                        {touched.twitterUrl && errors.twitterUrl ? (
                                    <div className="error-message">{errors.twitterUrl}</div>
                                ) : null}
                        <Input
                            inputId="instagramUrl-edit-input"
                            type="text"
                            placeholder="https://www.instagram.com/"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.instagramUrl}
                            name="instagramUrl"
                            className={touched.instagramUrl && errors.instagramUrl ? "error" : null}
                            symbol={<FontAwesomeIcon icon={faInstagram}/>}
                        ></Input>
                        {touched.instagramUrl && errors.instagramUrl ? (
                                    <div className="error-message">{errors.instagramUrl}</div>
                                ) : null}
                        <Input
                            inputId="linkendinUrl-edit-input"
                            type="text"
                            placeholder="https://www.linkendin.com/"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.linkendinUrl}
                            name="linkendinUrl"
                            className={touched.linkendinUrl && errors.linkendinUrl ? "error" : null}
                            symbol={<FontAwesomeIcon icon={faLinkedin}/>}
                        ></Input>
                        {touched.linkendinUrl && errors.linkendinUrl ? (
                                    <div className="error-message">{errors.linkendinUrl}</div>
                                ) : null}

                        <Form.Group className="edit-btn-group">
                            <Button variant="primary" type="submit" className="edit-btn">
                                Edit
                            </Button>
                            {editing}
                            <Link to="/cabinet" className="btn btn-link cancel-btn">
                                Cancel
                            </Link>
                        </Form.Group>
                    </Form>
                )}
                </Formik>
        );
    }
  }
  
  function mapState(state) {
    const { editing } = state.users;
    const { users } = state;
    return {
        user: users.user,
        editing
    };
  }
  
  const mapDispatchToProps = dispatch => ({
    edit: ( user ) => 
        dispatch(userActions.edit( user )),
    me: () => dispatch(userActions.me())
})

  const connectedEditForm = connect(mapState, mapDispatchToProps)(EditForm);
  export { connectedEditForm as EditForm };
  