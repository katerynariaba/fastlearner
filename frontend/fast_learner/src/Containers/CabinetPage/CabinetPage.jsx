import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../Helpers';
import { alertActions } from '../../Actions';
import {Container} from 'react-bootstrap';
import { 
    NaviBar, 
    Profile 
} from '../../Components';

import './CabinetPage.css';

class CabinetPage extends React.Component {
    constructor(props) {
        super(props);
  
        history.listen((location, action) => {
            props.clearAlerts();
        });
    }

    render() {
        return (
            <div className="profile-page">
                <Container fluid>
                    <div className="site-inner">
                        <NaviBar />
                        <Profile />
                    </div>
                </Container>
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
  
  const connectedCabinetPage = connect( mapState, mapDispatchToProps )(CabinetPage);
  export { connectedCabinetPage as CabinetPage };
  