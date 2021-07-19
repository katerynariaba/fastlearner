import React from 'react';

import { Table } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faAlignLeft,
    faUserEdit,
    faClock,
    faUserGraduate,
    faGlobe,
    faCheck
} from '@fortawesome/free-solid-svg-icons'

export const CourseTable = (props) => {
    const {author, duration, numberOfStudents, categoryTitle, language, skillLevel} = props;
    return (
        <div>
            <Table responsive="lg" className="course-table">
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faUserEdit} />
                    </td>
                    <td>Author:</td>
                    <td>{author}</td>
                </tr>
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faClock} />
                    </td>
                    <td>Duration:</td>
                    <td>{duration} h</td>
                </tr>
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faUserGraduate} />
                    </td>
                    <td>Students:</td>
                    <td>{numberOfStudents}</td>
                </tr>
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faAlignLeft} />
                    </td>
                    <td>Category:</td>
                    <td>{categoryTitle}</td>
                </tr>
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faGlobe} />
                    </td>
                    <td>Language:</td>
                    <td>{language}</td>
                </tr>
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faCheck} />
                    </td>
                    <td>Skill level:</td>
                    <td>{skillLevel}</td>
                </tr>
            </Table>
        </div>
    )
}