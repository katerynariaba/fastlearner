import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../Helpers';
import { alertActions } from '../../Actions';
import loginImg from '../../Assets/Images/login-image.png';
import { LoginForm } from '../../Components';

import './LoginPage.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
  
        history.listen((location, action) => {
            props.clearAlerts();
        });
    }

    render() {
        return (
            <div id="login-page" className="limiter">
                <div className="container-login">
                    <div className="wrap-login">
                        <div className="login-pic">
                            <img src={loginImg} alt="login" className="login-pic"/>
                        </div>
                        <LoginForm className="login-form"/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return {
        alert
    };
  }

const mapDispatchToProps = dispatch => ({
    clearAlerts: () => dispatch(alertActions.clear())
})

const connectedLoginPage = connect( mapState, mapDispatchToProps )(LoginPage);
export { connectedLoginPage as LoginPage }; 