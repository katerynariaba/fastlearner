import { Link } from "react-router-dom";

import './MyCourse.css'

import { 
    Row, 
    Col, 
    Button 
} from 'react-bootstrap';
import cerficate from '../../../Assets/Images/cetificate.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'

export const MyCourse = (props) => {
  const { title, img, id, author, onClick, isComleted, getCertificate, userId} = props;
  return (
    <Row className="my-course">
        <Col lg="4" className="my-course-img">
            <img src={img} />
        </Col>
            <Col lg="6" className="my-course-title">
                <Link to={`courses/${id}`} className="my-course-link">
                    <h2>{title}</h2>
                </Link>
                <h4>{author}</h4>
            </Col>
        <Col lg="2" className="my-course-btn">
            <Row>
                <Col lg="6"></Col>
                <Col lg="6">
                    <Link to={`lessons/${id}`} className="my-course-link">
                        <Button variant="info" style={{marginTop: "10px", paddingLeft: "5px", paddingRight: "5px"}}>Lessons</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col lg="4"></Col>
                <Col lg="8">
                    <Button variant="danger" onClick={onClick} style={{marginTop: "10px", fontSize: "10px", marginLeft: "30px", paddingTop: "5px", paddingBottom: "5px", paddingLeft: "5px", paddingRight: "5px"}}>
                        Unsubscribe
                    </Button>  
                </Col>
                
            </Row>
            <CertificateButton 
                    isComleted={isComleted} 
                    getCertificate={getCertificate}
                    cerficate = {cerficate}
                    courseTitle= {title}
                    courseId= {id}
                    userId = {userId}
                />
            
        </Col>
    </Row>
  );
};

function CertificateButton({ isComleted, getCertificate, cerficate, courseId, courseTitle, userId }) {
    const baseUrl = 'https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=';
    const name = encodeURI(courseTitle);
    const certicivatePath = `https://localhost:44389/cerificate/${courseId}/${userId}`;

    if (isComleted) {
      return (
        <Row>
            <Col lg="9" style={{cursor: "pointer"}}>
                <img src={cerficate} onClick={getCertificate} height="60px" width="60px" style={{marginTop: "80px", marginLeft:"75px"}}/>
            </Col>
            <Col lg="2">
                <Button href={`${baseUrl}${name}&organizationName=FastLearner&issueYear=2021&issueMonth=4&expirationYear=2028&expirationMonth=4&certUrl=${certicivatePath}&certId=234567689`} target="_blank" style={{marginTop: "95px", fontSize: "17px"}}><FontAwesomeIcon icon={faLinkedin} /></Button>
            </Col>
        </Row>
        )
    }
    return (
        <p style={{color: "gray", fontSize: "10px", marginTop: "80px", marginLeft: "10px"}}>
            After successfully passing all the tests for this 
            course, you will be able to obtain a certificate. 
        </p>      
    )
}


