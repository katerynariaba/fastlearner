import React from 'react';
import { connect } from 'react-redux';

import { 
    Form, 
    Button,
    Row,
    Col
} from 'react-bootstrap';
import { commentActions } from '../../../Actions';

import './CommentForm.css';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            comment: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });

        if (this.state.comment) {
            this.props.add(
                this.state.comment,
                this.props.courseId,
            );
        }
    }

    render() {
        const { adding } = this.props;
        return (
            <Form className="comment-form" name="form" onSubmit={this.handleSubmit}>
                <Row>
                    <Col lg="4">
                        <h3 className="pull-left">New Comment</h3>
                    </Col>
                    <Col lg="7">
                    </Col>
                    <Col lg="1">
                        <Form.Group>
                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                            {adding}
                        </Form.Group>
                    </Col>
                </Row>
                
                <fieldset>
                    <Row>
                        <Col xs="12" lg="12" sm="12" xsHidden>
                            <Form.Group controlId="comment-input">
                                <Form.Control 
                                    as="textarea" 
                                    type="text"
                                    name="comment"
                                    rows={3} 
                                    id="message"
                                    placeholder="Your comment"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>
            </Form>
                   
        );
    }
}

function mapState(state) {
    const { adding } = state.comments;
    return { adding };
}

const mapDispatchToProps = dispatch => ({
   add: ( comment, courseId ) => dispatch(commentActions.add( comment, courseId ))
})

const connectedCommentForm = connect(mapState, mapDispatchToProps)(CommentForm);
export { connectedCommentForm as CommentForm };