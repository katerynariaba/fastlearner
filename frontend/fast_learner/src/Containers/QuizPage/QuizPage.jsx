import React, { useState, useEffect } from 'react';
import { browserHistory } from 'react-router'
import { Button, Modal } from 'react-bootstrap';


import { connect } from 'react-redux';
import Question from '../../Components/Question/Question';
import QuizStart from '../../Components/QuizStart/QuizStart';
import QuizModal from '../../Components/QuizModal/QuizModal';
import './QuizPage.css';
import { questionActions } from '../../Actions';
import { useParams } from 'react-router';
import { QuizEnd } from '../../Components/QuizEnd/QuizEnd';

let interval;

const QuizPage = ({ questions, getById }) => {
    const [step, setStep] = useState(1);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [time, setTime] = useState(0);
    let { id } = useParams();
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
      getById(id);

        if(step === 3) {
          clearInterval(interval);
        }
      }, [step]);

    const quizStartHandler = () => {
        setStep(2);
        interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
          }, 1000);
    }

    const resetClickHandler = () => {
        setActiveQuestion(0);
        setAnswers([]);
        setStep(2);
        setTime(0);
        interval = setInterval(() => {
          setTime(prevTime => prevTime + 1);
        }, 1000);
      }
    
    return (
        <div className="quiz-page">
          <div className="verticaty-center">
            {step === 1 && <QuizStart onQuizStart={quizStartHandler} />}
            {step === 2 && questions.items && <Question 
                question={questions.items[activeQuestion]}
                onAnswerUpdate={setAnswers}
                numberOfQuestions={questions.items.length} 
                activeQuestion={activeQuestion}
                onSetActiveQuestion={setActiveQuestion}
                name={activeQuestion.id}
                onSetStep={setStep}
                onReset={resetClickHandler}
            />}
            {step === 3 && 
                <QuizEnd
                    results={answers}
                    data={questions.items}
                    onReset={resetClickHandler}
                    onAnswersCheck={() => setModalShow(true)}
                    time={time}
                    qId={id}
                />
            }
        <QuizModal 
          show={modalShow}
          onClose={() => setModalShow(false)}
          results={answers}
          data={questions.items}
        />

<div><Button variant="link" href={`/lessons/2`} style={{marginLeft: "145px"}}>Back to lesson</Button></div>
      </div>
      </div>
    );
}

function mapState(state) {
    const { questions } = state;
    return { questions };
}


const actionCreators = {
  getById: questionActions.getById
}

const connectedQuizPage = connect(mapState, actionCreators)(QuizPage);
export { connectedQuizPage as QuizPage };