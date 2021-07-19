import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../Helpers';
import { alertActions } from '../../Actions';
import {Container, Col, Row, Button} from 'react-bootstrap';
import { 
    NaviBar, 
    UserAvatar
} from '../../Components';
import { userActions } from '../../Actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTwitter, 
    faInstagram, 
    faFacebook,
    faLinkedin
  } from '@fortawesome/free-brands-svg-icons'

import './UserPage.css';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
  
        history.listen((location, action) => {
            props.clearAlerts();
        });
    }

    componentDidMount() {
        this.id = this.props.match.params.id;
        this.props.getById(this.id);
    }

    render() {
        const { user } = this.props;
        return (
            <div className="profile-page">
                <Container fluid>
                    <div className="site-inner">
                        <NaviBar />
                        <div className="container-cabinet">
                <div className="wrap-cabinet">
                    <Row>
                        <Col md="5">
                            <UserAvatar avatar={user?.photo} className="avatar"/>
                        </Col>
                        <Col md="5">
                            <div className="profile-head">
                                <h2>
                                    {user?.firstName} {user?.lastName}
                                </h2>
                                <h3>
                                    {user?.email}
                                </h3>
                                <h2 className="user-social-icons">
                                    <Button href={user?.facebookUrl} target="_blank">
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </Button>
                                    <Button href={user?.twitterUrl} target="_blank">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </Button>
                                    <Button href={user?.instagramUrl} target="_blank">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </Button>
                                    <Button href={user?.linkendinUrl} target="_blank">
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </Button>
                                </h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <p className="user-description">{user?.description}</p>
                        </Col>
                    </Row>
                    <Row>
                    <Col md="12">

                        </Col>
                    </Row>
                </div>
            </div>
        
                    </div>
                </Container>
            </div>        
        );
    }
  }
  
  function mapState(state) {
    const { alert, users } = state;
    return {
        alert,
        user:users.user
    };
  }
  
  const mapDispatchToProps = dispatch => ({
      clearAlerts: () => dispatch(alertActions.clear()),
      getById: userActions.getById
  })
  
  const connectedUserPage = connect( mapState, mapDispatchToProps )(UserPage);
  export { connectedUserPage as UserPage };
  