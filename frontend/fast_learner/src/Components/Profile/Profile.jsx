import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserAvatar } from '..';
import {Row, Col, Button} from 'react-bootstrap';
import { userActions } from '../../Actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTwitter, 
    faInstagram, 
    faFacebook,
    faLinkedin
  } from '@fortawesome/free-brands-svg-icons'

import './Profile.css';

class Profile extends React.Component {
    componentDidMount() {
        this.props.profile();
    }

    render() {
        const { user } = this.props;
        return (
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
                        <Col md="2">
                            <Link className="btn profile-edit-btn" to="/edit-profile">Edit Profile</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <p className="user-description">{user?.description}</p>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
  }

  function mapState(state) {
    const { users } = state;
    return {
        user: users.user
    };
}

const actionCreators = {
    profile: userActions.profile
}
  
  const connectedProfile = connect(mapState, actionCreators)(Profile);
  export { connectedProfile as Profile };
  