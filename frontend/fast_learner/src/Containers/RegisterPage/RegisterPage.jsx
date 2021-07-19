import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../Helpers';
import registerImg from '../../Assets/Images/registration-image.png';
import { RegisterForm} from '../../Components';
import { alertActions } from '../../Actions';

import './RegisterPage.css';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
  
        history.listen((location, action) => {
            props.clearAlerts();
        });
    }

    render() {
        return (
            <div id="register-page" className="limiter">
                <div className="container-register">
                    <div className="wrap-register">
                        <div className="register-pic">
                            <img src={registerImg} alt="registration" className="register-pic"/>
                        </div>
                        <RegisterForm className="register-form"/>
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

const connectedRegisterPage = connect( mapState, mapDispatchToProps )(RegisterPage);
export { connectedRegisterPage as RegisterPage }; 