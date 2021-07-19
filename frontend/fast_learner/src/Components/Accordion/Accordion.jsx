import React from 'react';
import './Accordion.css';

import { LessonAccordion } from '..';

export class Accordion extends React.Component {
    render() {
        return (
            <div className="accordion">
                {this.props.lessons.map((lesson) => 
                    <LessonAccordion 
                        key={lesson.title} 
                        lesson={lesson} 
                    />
                )}
            </div>
        );
    }
}

export default Accordion;