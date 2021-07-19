import React from 'react';
import { connect } from 'react-redux';
import * as QueryString from 'query-string';

import { courseActions } from '../../Actions';
import { categoryActions } from '../../Actions';
import { 
    CardDeck,
    Container
} from 'react-bootstrap';
import { 
    Course, 
    NaviBar, 
    Footer, 
    TopBlock
} from '../../Components';

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { categoryId: null }
    }

    componentDidMount() {
        const categoryId = this.props.match.params.id;

        this.setState({
            categoryId,
        });
        this.props.getByCategoryId(categoryId);
      }

    render() {
        const { courses, category } = this.props;
        return (
            <div id="wrapper">
                <Container fluid>
                    <div className="site-inner">
                        <NaviBar />
                        <div id="courses-content">
                            <TopBlock title="COURSES" />
                            <Container>
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
                        <Footer />
                    </div>
                </Container>
            </div>
        );
    }
}

function mapState(state) {
    const { courses, category } = state;
    return { courses, category };
}

const actionCreators = {
    getByCategoryId: courseActions.getByCategoryId
}

const connectedCategoryPage = connect(mapState, actionCreators)(CategoryPage);
export { connectedCategoryPage as CategoryPage };