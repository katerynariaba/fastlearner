import React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'
import { videoActions } from '../../Actions';
import { lessonsActions } from '../../Actions';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { 
    NaviBar, 
    TopBlock
} from '../../Components';

class LessonPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { videoName: null }
    }

    componentDidMount() {
        const videoName = this.props.match.params.videoName;

        this.setState({
          videoName,
        });
        this.props.getVideo(videoName);
      }
  render () {
    const { video } = this.props;
    return(
        <div id="wrapper">
        <Container fluid>
            <div className="site-inner">
                <NaviBar />
                <div id="lesson-content">
                    <TopBlock title=" " className="top-lesson"/>
                    <Container fluid className="lesson-page">
                        <Row>
                            <Col lg="1">
                            </Col>
                            <Col lg="5">
                                <div className="video-lesson" style={{marginTop: "5px"}}>
                                    <ReactPlayer 
                                        url={`https://localhost:44389/video/${this.props.match.params.videoName}`}
                                        playing={false} 
                                        muted={false} 
                                        controls={true}
                                        playIcon
                                        width="780px"
                                        height="450px"
                                    />
                                </div>
                            </Col>
                            <Col lg="4">
                                <p className="lesson-desc" style={{marginTop: "20px"}}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eius vero voluptates corrupti cupiditate quas ex, dicta maxime magnam numquam iusto ipsum aspernatur, quam enim hic illo possimus architecto nam! Error quod unde illo facere porro amet obcaecati maxime, cumque, earum laboriosam ducimus explicabo, corrupti nisi repellat fuga incidunt atque ipsa sunt! Quod cum officia placeat dolor ducimus, alias explicabo dolorem laboriosam ratione nulla iure minus dicta quae quaerat expedita. Dolore corrupti unde voluptatibus delectus. 
                                </p>
                                <Link to="/quiz/2">
                                    <Button variant="warning">Quiz</Button>
                                </Link>
                            </Col>
                            <Col lg="1">
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Container>
    </div>
        )
    }
}



function mapState(state) {
    const { video, lessons } = state;
    return { 
        video,
        lesson: lessons.lesson
    };
}

const actionCreators = {
    getVideo: videoActions.getVideo,
    getById: lessonsActions.getById
}

const connectedLessonPage = connect(mapState, actionCreators)(LessonPage);
export { connectedLessonPage as LessonPage };
