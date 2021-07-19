import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

import './LessonAccordion.css'

class LessonAccordion extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            visibility: false
        }
    }
    
    handleToggleVisibility() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility,
            }
        })
    }
    render() {
        const activeStatus = this.state.visibility ? 'active' : ''

        return (
            <div>
                <button className="accordion__button" onClick={this.handleToggleVisibility}>
                    {this.props.lesson.title}
                    <span>{
                        this.state.visibility
                        ? <FontAwesomeIcon icon={faMinus} />
                        : <FontAwesomeIcon icon={faPlus} />
                    }</span>
                </button>
                <p className={`accordion__content ${activeStatus}`}>
                    {
                        this.props.lesson.description 
                    }
                    <a href={`/lesson/${this.props.lesson.videoName}`}>
                        <div>
                            <Button style={{backgroundColor: "#fa970c", marginTop: "2px", borderColor: "#fa970c"}}>
                                Learn
                            </Button>
                        </div>
                    </a>
                </p>
            </div>
        );
    }
}

const connectedLessonAccordion = connect()(LessonAccordion);
export { connectedLessonAccordion as LessonAccordion };