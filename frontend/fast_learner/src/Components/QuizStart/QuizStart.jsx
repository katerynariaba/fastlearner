import React from 'react';
import { Button, Card } from 'react-bootstrap';

const QuizStart = ({ onQuizStart }) => {
    return(
        <Card>
            <Card.Body>
                <div>
                    <h1>Start the test</h1>
                    <p style={{fontSize: "22px"}}>Good luck!</p>
                    <p style={{color: "gray", fontSize: "14px"}}>You cannot leave this browser tab during the testing</p>
                    <Button variant="warning" onClick={onQuizStart}>Start</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default QuizStart;