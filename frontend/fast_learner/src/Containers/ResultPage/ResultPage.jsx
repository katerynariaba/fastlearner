import React from 'react';
import { connect } from 'react-redux';

import { resultActions } from '../../Actions';
import { 
    Container,
    Table
} from 'react-bootstrap';
import { 
    NaviBar, 
    Footer, 
    TopBlock
} from '../../Components';

class ResultPage extends React.Component {
    componentDidMount() {
        this.props.getHistory(2);
    }

    render() {
        const { results } = this.props;

        return (
            <div id="wrapper">
                <Container fluid>
                    <div className="site-inner">
                        <NaviBar />
                        <div id="courses-content">
                            <TopBlock title="History" />
                            <Container className="my-courses-container">
                <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Lesson</th>
                            <th>Percentage</th>
                            <th>Date</th>
                            <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.items && results.items.map((result, key) =>
                                <tr>
                                    <td>{result.questionnaire.title}</td>
                                    <td>{result.percentageResult} %</td>
                                    <td>{(new Date(result.dateTime)).toLocaleDateString()}</td>
                                    <td>{(new Date(result.dateTime)).toLocaleTimeString()}</td>
                                </tr>
                            )}
                        </tbody>
                        </Table>
                        </Container>
                        </div>
                        <Footer />
                    </div>
                </Container>
            </div>
        );
    }
}

function mapState(state) {
    const { results} = state;
    return { results};
}

const actionCreators = {
    getHistory: resultActions.getHistory
}

const connectedResultPage = connect(mapState, actionCreators)(ResultPage);
export { connectedResultPage as ResultPage };