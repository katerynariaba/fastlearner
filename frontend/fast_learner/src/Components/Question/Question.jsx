import React, { useState, useEffect, useRef } from 'react';

import './Question.css';
import { Button, Card, Form } from 'react-bootstrap';

const Question = ({ question, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep, onReset }) => {
    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');
    const radiosWrapper = useRef();

    useEffect(() => {
        const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
        if(findCheckedInput) {
          findCheckedInput.checked = false;
        }

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        }
      }, [question]);
    
    const changeHandler = (e) => {
        setSelected(e.target.value);
        if(error) {
            setError('');
        }
    }

    const handleVisibilityChange = () => {
        if (document.hidden) {
            onSetStep(3);
        } else  {
          
        }
    }

    const nextClickHandler = (e) => {
        if(selected === '') {
            return setError('Please select one option!');
          }
          onAnswerUpdate(prevState => [...prevState, { q: question.content, a: selected }]);
          setSelected('');
          if(activeQuestion < numberOfQuestions - 1) {
            onSetActiveQuestion(activeQuestion + 1);
          }else {
            onSetStep(3);
          }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return(
        <Card>
            <Card.Body>
                <div>
                    <h2 className="mb-5">{question.content}</h2>
                        <Form.Group ref={radiosWrapper} className="question-group">
                            {question.answers.map((answer, i) => (
                                <Form.Label className="question">
                                    <Form.Check
                                    type="radio"
                                    name="answer"
                                    key={i}
                                    id={i + 1}
                                    value={answer.content}
                                    onChange={changeHandler}
                                    onReset={onReset}
                                    />
                                    {answer.content}
                                </Form.Label>
                                
                            ))}
                        </Form.Group>
                    {error && <div className="error-message">{error}</div>}
                </div>
                <Button variant="warning" className="quiz-button" onClick={nextClickHandler}>Next</Button>
            </Card.Body>
        </Card>
    );
}

export default Question;