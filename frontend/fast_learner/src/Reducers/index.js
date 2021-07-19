import { combineReducers } from 'redux';
import { categories } from './CategoryReducer';
import { authentication } from './AuthenticationReducer';
import { users } from './UsersReducer';
import { alert } from './AlertReducer';
import { registration } from './RegistrationReducer';
import { courses } from './CoursesReducer';
import { searchCourses } from './SearchReducer';
import { comments } from './CommentReducer';
import { lessons } from './LessonReducer';
import { videos } from './VideoReducer';
import { certificate } from './CertificateReducer';
import { questions } from './QuestionReducer';
import { results } from './ResultReducer';

const rootReducer = combineReducers({
  categories,
  authentication,
  users,
  alert,
  registration,
  courses,
  searchCourses,
  comments,
  lessons,
  videos,
  certificate,
  questions,
  results
});

export default rootReducer;