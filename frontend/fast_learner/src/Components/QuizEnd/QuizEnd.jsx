import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { resultActions } from '../../Actions';

import { Button, Card } from 'react-bootstrap';
import { formatTime } from '../_utils';

const QuizEnd = ({ results, data, onReset, onAnswersCheck, time, qId, add }) => {
    const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      const rightAnswer = data[index].answers.find(answer => answer.content === result.a);
      if(rightAnswer?.isCorrect) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
    handleAddResult(qId, correct)
  }, []);

  const handleAddResult = (qId, correctAnswers) => {
		add(qId, correctAnswers)
    };
    

    return(
        <Card>
            <Card.Body>
                    <h3>Your result</h3>
                    <p>{correctAnswers} of {data.length}</p>
                    <p><strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong></p>
                    <p><strong>Your time:</strong> {formatTime(time)}</p>

                    <Button variant="info" onClick={onAnswersCheck} marginRight="5px">Check your answers</Button>
                    <Button variant="success" onClick={onReset}>Try again</Button>
            </Card.Body>
        </Card>
    );
}


const actionCreators = {
  add: resultActions.add
}

const connectedQuizEnd = connect(() => {}, actionCreators)(QuizEnd);
export { connectedQuizEnd as QuizEnd };