import React from 'react';
import { connect } from 'react-redux';

import { categoryActions } from '../../Actions';
import {Container, Row, Col} from 'react-bootstrap';
import { Category } from '../Cards/Category/Category';

import './Categories.css';

class Categories extends React.Component {
    componentDidMount() {
        this.props.getCategories();
    }
    
    render() {
        const { categories } = this.props;
        return (
        <div id="categories">
            <Container>
                <h2>Categories</h2> 
                <div>
                    <Row>
                        {categories.items && categories.items.map((category, key) =>
                            <Col lg={3} md={6} sm={12}>
                                <Category
                                    id={category.id}
                                    key={category.id}
                                    title={category.title}
                                    img={category.image}
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
    const { categories } = state;
    return { categories };
}

const actionCreators = {
    getCategories: categoryActions.getAll
}

const connectedCategories = connect(mapState, actionCreators)(Categories);
export { connectedCategories as Categories };