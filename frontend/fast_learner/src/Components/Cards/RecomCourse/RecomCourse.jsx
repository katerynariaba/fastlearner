import React from 'react';

import {Card} from 'react-bootstrap';
import { Link } from "react-router-dom";

import './RecomCourse.css';

export const RecomCourse = (props) => {
    const {id, title, img} = props;
    return (
        <Card className="sm={4} course-recom-card">
            <Link to={`/courses/${id}`}>
                <Card.Img variant="top" src={img}/>
                <Card.Body>
                    <Card.Title className="recom-course-title">{title}</Card.Title>
                </Card.Body>
            </Link>
        </Card>
    )
}