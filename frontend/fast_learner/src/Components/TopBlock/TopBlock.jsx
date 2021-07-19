import React from 'react';
import {Jumbotron, Container} from 'react-bootstrap';
import { useHistory } from 'react-router';

import './TopBlock.css';

export const TopBlock = (props) => {
    return (
        <div id="top-block">
            <Container fluid>
                <Jumbotron className="top-block">
                    <h1>
                        {props.title}
                    </h1>
                </Jumbotron>
            </Container>
        </div>
    );
}