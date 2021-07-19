import React from 'react';
import {Jumbotron, Container} from 'react-bootstrap';

import './ImageBlock.css';

export const ImageBlock = () => {
    return (
        <div id="image-block">
            <Container fluid>
                <Jumbotron className="image-block-jumbotron">
                </Jumbotron>
            </Container>
        </div>
    );
}