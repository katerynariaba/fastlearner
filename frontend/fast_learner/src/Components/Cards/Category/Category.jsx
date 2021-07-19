import React from 'react';
import {Card} from 'react-bootstrap';
import { Link } from "react-router-dom";

import './Category.css';

export const Category = (props) => {
    const {id, title, img} = props;
    return (
        <Card className="sm={4} category-card">
            <Link to={`courses/categories/${id}`}>
                <Card.Img variant="top" src={img}/>
                <Card.Body>
                    <Card.Title className="category-title">
                        {title}
                    </Card.Title>
                </Card.Body>
            </Link>
        </Card>
    )
}