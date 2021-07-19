import React from 'react';
import { connect } from 'react-redux';

import { courseActions, certificateActions } from '../../Actions';
import { Container } from 'react-bootstrap';
import { 
    NaviBar, 
    Footer, 
    TopBlock,
    MyCourse
} from '../../Components';

import './UserCoursesPage.css';

class UserCoursesPage extends React.Component {
    componentDidMount() {
        this.props.getByUser();
    }
    render() {
        const { courses, unsubscribe, getCertificate, user } = this.props;
        return (
            <div id="wrapper">
                <Container fluid>
                    <div className="site-inner">
                        <NaviBar />
                        <div id="courses-content">
                            <TopBlock title="My courses" />
                            <Container className="my-courses-container">
                                {courses.items && courses.items.map((course, key) =>
                                        <MyCourse 
                                            title={course.title} 
                                            img={course.image} 
                                            id={course.id} 
                                            key={course.id}
                                            author={course.author}
                                            onClick={() => unsubscribe(course.id)}
                                            onClickCerificate={() => getCertificate()}
                                            isComleted={course.isComleted} 
                                            getCertificate={() => getCertificate(course.id)}
                                            userId={user.id}
                                        />
                                )}
                            </Container>
                        </div>
                        <Footer />
                    </div>
                </Container>
            </div>
        );
    }
}



function mapState(state) {
    const { courses, certificate, authentication  } = state;
    const { user } = authentication;
    const { unsubscribing } = state.courses;
    return {
        courses,
        unsubscribing,
        certificate,
        user
    };
}

const actionCreators = {
    getByUser: courseActions.getByUser,
    unsubscribe: courseActions.unsubscribe,
    getCertificate: certificateActions.getCertificate
}

const connectedUserCoursesPage = connect(mapState, actionCreators)(UserCoursesPage);
export { connectedUserCoursesPage as UserCoursesPage };