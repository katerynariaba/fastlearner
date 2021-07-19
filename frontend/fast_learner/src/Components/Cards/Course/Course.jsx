import { Card, Col } from 'react-bootstrap';
import './Course.css'
import { Link } from "react-router-dom";

export const Course = (props) => {
  const { title, description, ns, img, id } = props;
  return (
    <Col lg={4} md={4} sm={12}>
      <Link to={`courses/${id}`}>
        <Card className="course-card">
              <Card.Img variant="top" src={img} />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text className="cors-text">
                <span>{description}</span>
                <span>...</span>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Number of students: {ns}</small>
            </Card.Footer>
          </Card>
      </Link>
    </Col>
  );
};
