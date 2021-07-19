import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons'

import './Comment.css';

const Comment = (props) => {
    const {content, dateTime, img, login, id, onClick, user} = props;
    return (
        <div class="media">
            <div className="pull-left">
                <img 
                    className="media-object" 
                    src={img}
                    alt="User avatar"
                />
            </div>
            <div className="media-body">
                <Row>
                    <Col lg="11">
                        <h4 className="media-heading">{login}</h4>
                    </Col>
                    <Col lg="1">
                        <DeleteButton onClick={onClick} user={user} />
                    </Col>
                </Row>
                <p>{content}</p>
                <ul className="list-unstyled list-inline media-detail pull-left">
                    <li>
                        <FontAwesomeIcon icon={faCalendarAlt} className="ico"/>
                        {(new Date(dateTime)).toLocaleDateString()}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faClock} className="ico"/>
                        {(new Date(dateTime)).toLocaleTimeString()}
                    </li>
                </ul>
            </div>
        </div>
    )
}

function DeleteButton({ onClick, user }) {
    if (user?.role === 1) {
        return (  
            <Button variant="link" onClick={onClick}>X</Button>
        )
    }
    return(
        <p></p>
    )
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
  }

  
const actionCreators = {
}
  
  const connectedComment = connect(mapStateToProps, actionCreators)(Comment);
  export { connectedComment as Comment };