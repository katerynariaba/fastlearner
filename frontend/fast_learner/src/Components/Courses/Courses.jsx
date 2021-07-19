import React from 'react';
import { connect } from 'react-redux';

import { courseActions } from '../../Actions';
import {Container, Row, Col} from 'react-bootstrap';
import { RecomCourse } from '../Cards/RecomCourse/RecomCourse';

import './Courses.css';

class Courses extends React.Component {
    componentDidMount() {
        this.props.getRecom(this.props.category);
      }
    render() {
        const { courses } = this.props;
        return (
        <div id="courses-recom">
            <Container>
                <div>
                    <Row>
                        {courses.items && courses.items.map((course, key) =>
                            <Col lg={3} md={6} sm={12}>
                                <RecomCourse
                                    id={course.id}
                                    key={course.id}
                                    title={course.title}
                                    img={course.image}
                                />
                            </Col> 
                        )}
                    </Row>
                </div>
            </Container>
        </div>
    );
}
}

function mapState(state) {
    const { courses } = state;
    return { courses };
}

const actionCreators = {
    getRecom: courseActions.getRecom
}

const connectedCourses = connect(mapState, actionCreators)(Courses);
export { connectedCourses as Courses };