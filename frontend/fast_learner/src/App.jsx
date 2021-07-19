import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './Helpers';
import { alertActions } from './Actions';
import { PrivateRoute } from './Components/PrivateRoute';

import { 
    MainPage,
    CoursesPage,
    LoginPage,
    RegisterPage,
    CategoryPage,
    CoursePage,
    CabinetPage,
    EditPage,
    UserCoursesPage,
    LessonsPage,
    LessonPage,
    QuizPage,
    UserPage,
    ResultPage
} from './Containers/';

import './App.css';

class App extends React.Component {
  constructor(props) {
      super(props);

      history.listen((location, action) => {
          props.clearAlerts();
      });
  }

  render() {
      const { alert } = this.props;
      return (
        <>
            {alert.message &&
                <div className={`alert ${alert.type}`}>
                    <button aria-hidden="true" data-dismiss="alert" className="close" type="button">×</button> 
                    <strong>{alert.message}</strong> 
                </div>
            }
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route path="/courses/categories/:id" exact={true} component={CategoryPage} />
                    <Route path="/courses/:id" render={(props) => <CoursePage key={props.match.params.id} {...props} />} />
                    <Route path="/courses" component={CoursesPage} />
                    <Route path="/lessons/:id" component={LessonsPage} />
                    <Route path="/registration" component={RegisterPage} /> 
                    <Route path="/login" component={LoginPage} /> 
                    <PrivateRoute path="/edit-profile" component={EditPage} />
                    <PrivateRoute path="/cabinet" component={CabinetPage} />
                    <PrivateRoute path="/user-courses" component={UserCoursesPage} />
                    <Route path="/lesson/:videoName" component={LessonPage} />
                    <Route path="/quiz/:id" component={QuizPage} />
                    <Route path="/users/:id" component={UserPage} />
                    <Route path="/history/:id" component={ResultPage} />
                </Switch>
            </Router>
        </>
      );
  }
}

function mapState(state) {
  const { alert } = state;
  return {
      alert
  };
}

const mapDispatchToProps = dispatch => ({
    clearAlerts: () => dispatch(alertActions.clear())
})

const connectedApp = connect(mapState, mapDispatchToProps)(App);
export { connectedApp as App };

