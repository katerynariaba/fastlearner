import React from 'react';
import { connect } from 'react-redux';

import { 
    NaviBar,
    CommentForm, 
    Comment,
    TopBlock, 
    Footer,
    CourseTable
} from '../../Components';

import { courseActions, commentActions } from '../../Actions';
import { 
    Container, 
    Row, 
    Col,
    Button
} from 'react-bootstrap';

import './CoursePage.css';
import { Courses } from '../../Components/Courses/Courses';

class CoursePage extends React.Component {
    componentDidMount() {
        this.id = this.props.match.params.id;
        this.props.getById(this.id);
        this.props.getByCourseId(this.id);
    }

    render() {
        const { course, comments, subscribe, unsubscribe, remove } = this.props;
        return (
            <div id="wrapper">
                <Container fluid>
                    <div className="site-inner">
                        <NaviBar />
                        <div id="course-content">
                            <TopBlock title={course?.title} />
                            <Container className="course-info-block">
                                <Row>
                                    <Col lg="7">
                                        <img 
                                            src={course?.image} 
                                            alt="course poster"
                                            className="course-image"
                                        />
                                    </Col>
                                    <Col lg="5">
                                        <div className="course-title">
                                            <h2>{course?.title}</h2>
                                        </div>
                                        <CourseTable 
                                            author={course?.author} 
                                            duration={course?.duration} 
                                            numberOfStudents={course?.numberOfStudents}
                                            categoryTitle={course?.category?.title}
                                            language={course?.language} 
                                            skillLevel={course?.skillLevel}
                                        />
                                        <Row>
                                            <Col lg="3"></Col>
                                            <Col lg="6">
                                                <SubscribeButton
                                                    subscribe={() => subscribe(this.id)}
                                                    unsubscribe={() => unsubscribe(this.id)}
                                                    isUserSubscribed={course?.isUserSubscribed}
                                                />
                                            </Col>
                                            <Col lg="3"></Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="course-description">
                                    <Col>
                                        <h2>{course?.description}</h2>
                                    </Col>
                                </Row>
                                <h3 align="center">You may also be interested:</h3>
                                {
                                    course &&
                                    <Courses category={course?.category?.id} />
                                }
                                <div class="content-item" id="comments">
                                    <Container>
                                        <Row>
                                            <Col lg={12}>
                                                <AddComment courseId={this.id}/>
                                                <h3>Comments</h3>
                                                {comments.items && comments.items.map((comment, key) =>
                                                    <Comment
                                                        id={comment?.id}
                                                        key={comment?.id}
                                                        content={comment?.content}
                                                        dateTime={comment?.dateTime}
                                                        img={comment?.user?.photo}
                                                        login={comment?.user?.login}
                                                        onClick={() => remove(comment.id)}
                                                    />
                                                )}
                                            </Col> 
                                        </Row>
                                    </Container>
                                </div>
                            </Container>
                        </div>
                        <Footer />
                    </div>
                </Container>
            </div>
        );
    }
}

function SubscribeButton({ subscribe, unsubscribe, isUserSubscribed }) {
    if (localStorage.getItem('user') === null) {
        return (  
            <div align="center">
                <Button variant="success" disabled>
                    Subscribe
                </Button>
            <p style={{fontSize: "15px", color: "#C0C0C0"}}>
                You must be logged in
            </p>
        </div>
        )
    }

    if (!isUserSubscribed) {
      return (
        <div align="center">
            <Button variant="success" onClick={subscribe}>
                Subscribe
            </Button>
        </div>
        )
    }

    return (
        <div align="center"><Button variant="danger" onClick={unsubscribe}>
          Unsubscribe
      </Button></div>
      
    )
}

function AddComment({ courseId }) {
    if (localStorage.getItem('user') != null) {
      return <CommentForm courseId={courseId} />
    }
    return (  
        <div>
            <p style={{fontSize: "15px", color: "#C0C0C0"}}>
                You had to log in to add your own comments to the course
            </p>
        </div>
    )
}

function mapState(state) {
    const { courses, comments, remove } = state;
    const { subscribing, unsubscribing } = state.courses;
    return { 
        course: courses.course, 
        comments,
        subscribing,
        unsubscribing,
        remove
    };
}

const actionCreators = {
    getById: courseActions.getById,
    getByCourseId: commentActions.getByCourseId,
    remove: commentActions.remove,
    subscribe: courseActions.subscribe,
    unsubscribe: courseActions.unsubscribe
}

const connectedCoursePage = connect(mapState, actionCreators)(CoursePage);
export { connectedCoursePage as CoursePage };
