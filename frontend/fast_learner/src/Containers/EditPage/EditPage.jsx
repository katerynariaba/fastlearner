import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../Actions';
import { Container, Col, Row, Button, Modal } from 'react-bootstrap';
import { EditForm, NaviBar, PasswordForm, UserAvatar } from "../../Components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import './EditPage.css';

class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false
        };
      }

    componentDidMount() {
        this.props.me();
    }

    render() {
        const { user, deleteAccount } = this.props;
        return (
            <div className="edit-page">
                <Container fluid>
                    <div className="site-inner">
                        <NaviBar />
                        <div className="container-cabinet">
                            <div className="wrap-edit">
                                <Row>
                                    <Col lg="5">
                                        <h2 className="avatar-text">Change your avatar</h2>
                                        <UserAvatar avatar={user?.photo} className="avatar"/>
                                        <h2 className="password-text">Change password</h2>
                                        <PasswordForm />
                                        <Button 
                                            variant="danger" 
                                            className="trash-button" 
                                            /*onClick={() => deleteAccount(user.id)}*/
                                            onClick={() => this.setState({ modalShow: true })}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </Col>
                                    <Col lg="7">
                                        <h2>Update main information</h2>
                                        <EditForm />
                                    </Col>

                                    <DeleteModal
                                        show={this.state.modalShow}
                                        onHide={() => this.setState({ modalShow: false })}
                                        onClick={() => deleteAccount(user.id)}
                                    />
                                </Row>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>  
        );
    }
  }

  function DeleteModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete your account?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="danger" onClick={props.onClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

function mapState(state) {
    const { users } = state;
    const { deleting } = state.users;
    return {
        user: users.user,
        deleting
    };
  }

const actionCreators = {
    me: userActions.me,
    deleteAccount: userActions.deleteAccount
}

const connectedEditPage = connect(mapState, actionCreators)(EditPage);

export { connectedEditPage as EditPage };
  