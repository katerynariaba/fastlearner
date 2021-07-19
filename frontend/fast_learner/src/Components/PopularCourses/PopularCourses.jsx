import React from 'react';
import { connect } from 'react-redux';

import { courseActions } from '../../Actions';
import { CardDeck, Container } from 'react-bootstrap';
import { Course } from '../Cards/Course/Course';

import './PopularCourses.css';

class PopularCourses extends React.Component {
    componentDidMount() {
        this.props.getPopular();
    }

    render() {
        const { courses } = this.props;
        return (
            <div id="popular-courses">
                <Container>
                <h2>Most popular courses</h2>
                {courses.items &&
                    <CardDeck>
                        {courses.items.map((course, key) =>
                            <Course
                                id={course.id}
                                key={course.id}
                                title={course.title}
                                description={course.description}
                                ns={course.numberOfStudents}
                                img={course.image}
                            />
                        )}
                    </CardDeck>  
                }
                </Container>
            </div>
        );
    }
}

function mapState(state) {
    const { courses} = state;
    return { courses};
}

const actionCreators = {
    getPopular: courseActions.getPopular
}

const connectedPopularCourses = connect(mapState, actionCreators)(PopularCourses);
export { connectedPopularCourses as PopularCourses };