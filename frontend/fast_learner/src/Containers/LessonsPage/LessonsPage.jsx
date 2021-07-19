import React from 'react';
import { connect } from 'react-redux';

import { lessonsActions, certificateActions } from '../../Actions';

import { courseActions, commentActions } from '../../Actions';
import { Container, Col, Row, Button } from 'react-bootstrap';
import cerficate from '../../Assets/Images/cetificate.png'
import { 
    NaviBar, 
    Footer, 
    TopBlock,
    LessonAccordion
} from '../../Components';
import { courses } from '../../Reducers/CoursesReducer';

class LessonsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { courseId: null }
        this.state = { link: null }
    }

    componentDidMount() {
        const courseId = this.props.match.params.id;

        this.setState({
            courseId,
        });
        this.props.getByCourseId(courseId);
        this.props.getById(courseId);
      }

    render() {
        const { lessons, getCertificate, course } = this.props;
        const courseId = this.props.match.params.id;
        return (
            <div id="wrapper">
                <Container fluid>
                    <div className="site-inner">
                        <NaviBar />
                        <div id="courses-content">
                            <TopBlock title="Lessons" />
                            <Row>
                                <Col lg="3">
                                </Col>
                                <Col lg="6">
                                    <Container>
                                        <div className="accordion">
                                            {lessons.items && lessons.items.map((lesson) => 
                                                <LessonAccordion key={lesson?.title} lesson={lesson} />)
                                            }
                                        </div>
                                    </Container>
                                </Col>
                                <Col lg="3">
                                    <Row>
                                        <Button href={`/history/${courseId}`} variant="warning" style={{marginTop:"5px"}}>Questionnaire history</Button>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <Footer />
                    </div>
                </Container>
            </div>
        );
    }
}

function mapState(state) {
    const { lessons, certificate, courses } = state;
    return {
        course: courses.course, 
        lessons,
        certificate
    };
}

const actionCreators = {
    getByCourseId: lessonsActions.getByCourseId,
    getCertificate: certificateActions.getCertificate,
    getById: courseActions.getById
}

const connectedLessonsPage = connect(mapState, actionCreators)(LessonsPage);
export { connectedLessonsPage as LessonsPage };