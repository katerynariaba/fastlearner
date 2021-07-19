import React from 'react';
import { connect } from 'react-redux';
import * as QueryString from 'query-string';

import { courseActions } from '../../Actions';
import { 
    CardDeck,
    Container
} from 'react-bootstrap';
import { 
    SearchInput, 
    Course, 
    NaviBar, 
    Footer, 
    TopBlock,
    Pagin
} from '../../Components';

import './CoursesPage.css';

class CoursesPage extends React.Component {
    state = {
        courses: [],
        currentPage: 1,
        coursesPerPage: 3
      };

    constructor(props) {
        super(props);
        this.state = { query: QueryString.parse(window.location.search)?.search }
        this.handleCoursesSearch = this.handleCoursesSearch.bind(this);
    }
    
    componentDidMount() {
        this.handleCoursesSearch(this.state.query);
    }

    handleCoursesSearch(query) {
        if (query) {
            this.props.search(query);
        } else {
            this.props.getCourses();
        }
    }

    render() {
        const { currentPage, coursesPerPage, courses } = this.props;

        const indexOfLastCourse = currentPage * coursesPerPage;
        const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
        const currentCourses = courses.toString().slice(indexOfFirstCourse, indexOfLastCourse);

        const paginate = pageNum => this.setState({ currentPage: pageNum });

        const nextPage = () => this.setState({ currentPage: currentPage + 1 });

        const prevPage = () => this.setState({ currentPage: currentPage - 1 });

        return (
            <div id="wrapper">
                <Container fluid>
                    <div className="site-inner">
                        <NaviBar />
                        <div id="courses-content">
                            <TopBlock title="Courses" />
                            <SearchInput onSearch={this.handleCoursesSearch} query={this.state.query} />
                            <Container>
                                {courses.items &&
                                <CardDeck courses={currentCourses}>
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
                                <Pagin 
                                    coursessPerPage={coursesPerPage} 
                                    totalCourses={courses.length} 
                                    paginate={paginate} 
                                    nextPage={nextPage} 
                                    prevPage={prevPage}
                                />
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
    const { courses} = state;
    return { courses};
}

const actionCreators = {
    getCourses: courseActions.getAll,
    search: courseActions.search
}

const connectedCoursesPage = connect(mapState, actionCreators)(CoursesPage);
export { connectedCoursesPage as CoursesPage };