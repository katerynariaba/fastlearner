import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../Helpers';
import { alertActions } from '../../Actions';
import {Container} from 'react-bootstrap';
import { 
    NaviBar, 
    Footer, 
    MainImg, 
    Categories,
    PopularCourses
} from '../../Components';

import './MainPage.css';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
  
        history.listen((location, action) => {
            props.clearAlerts();
        });
        console.log(document.visibilityState);
    }
    
    render() {
        return (
            <div id="wrapper">
                <Container fluid>
                    <div className="site-inner">
                        <NaviBar />
                        <div id="content">
                           <MainImg /> 
                           <Categories />
                           <PopularCourses />
                        </div>
                        <Footer />
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

const connectedMainPage = connect( mapState, mapDispatchToProps )(MainPage);
export { connectedMainPage as MainPage }; 
