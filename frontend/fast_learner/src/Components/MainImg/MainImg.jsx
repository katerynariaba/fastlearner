import React from 'react';
import { useHistory } from 'react-router';

import { Jumbotron, Container} from 'react-bootstrap';
import { SearchInput } from '../../Components';

import './MainImg.css';

export const MainImg = () => {
    const history = useHistory();

    const handleCoursesSearch = (searchString) => {
        if (searchString) {
            history.push(`/courses?search=${searchString}`);
        } else {
            history.push('/courses');
        }
    }

    return (
        <div id="jumbotron">
            <Container fluid>
                <Jumbotron className="main-jumbotron">
                    <h1>
                        Start learning right now!
                        <span id="second-line">
                            Find what interests you
                        </span>
                    </h1>
                    <div className="main-search-input">
                        <SearchInput onSearch={handleCoursesSearch} />  
                    </div>
                </Jumbotron>
            </Container>
        </div>
    );
}