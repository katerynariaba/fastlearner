import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './QuizModal.css';


const QuizModal = ({ onClose, show, results, data }) => {
 
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
      centered
    >
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title id="contained-modal-title-vcenter">
          Your answers
      </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <section className="modal-card-body content">
          <ul>
            {results.map((result, i) => <Result question={data[i]} result={result} />)}
          </ul>
        </section>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Result = ({question, result}) => {
  const rightAnswer = question.answers.find(answer => answer.isCorrect);

  return (
    <li key={question.id} className="mb-6">
      <p className="quest"><strong>{result.q}</strong></p>
      <p className={result.a === rightAnswer.content ? 'correct-background' : 'wrong-background'}>Your answer: {result.a}</p>
      {result.a !== rightAnswer.content && <p className="your-background">Correct answer: {rightAnswer.content}</p>}
    </li> 
  )
}

export default QuizModal;