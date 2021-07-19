
import React from 'react';
import { connect } from 'react-redux';

import './Pagination.css';

class Pagin extends React.Component {
    render() {
        const { coursessPerPage, totalCourses, paginate, nextPage, prevPage } = this.props;

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalCourses / coursessPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
                <div class="pagination p1">
                    <ul>
                        <a href="#" onClick={() => prevPage()}>
                            <li>&#60;</li>
                        </a>
                        {pageNumbers.map(num => (
                            <a onClick={() => paginate(num)} href="#" key={num}>
                                <li>{num}</li>
                            </a>
                    ))}
                        <a class="is-active" href="#"><li>1</li></a>
                        <a href="#"><li>2</li></a>
                        <a href="#"><li>3</li></a>
                        <a href="#"><li>4</li></a>
                        <a href="#"><li>5</li></a>
                        <a href="#"><li>6</li></a>
                        <a href="#" onClick={() => nextPage()}>
                            <li>&#62;</li>
                        </a>
                    </ul>
                    </div>
        );
    }
}

const connectedPagin = connect()(Pagin);
export { connectedPagin as Pagin };