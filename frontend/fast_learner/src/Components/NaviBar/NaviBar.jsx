import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { categoryActions } from '../../Actions';

import {
  Navbar,
  Nav,
  NavDropdown
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { 
  faTwitter, 
  faInstagram, 
  faFacebook,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'

import './NaviBar.css';

class NaviBar extends React.Component {
  state = {
    theme: '',
    categoriosDropdownVisible: false
  }

  componentDidMount() {
    this.props.getCategories();
    window.addEventListener('scroll', this.listenToScroll);
  }

  listenToScroll = () => {
    if (window.scrollY > 100) {
      if (this.state.theme) {
        return;
      }
      this.setState({ theme: 'navbar-main--light' });
      return;
    }

    if (!this.state.theme) {
      return;
    }

    this.setState({ theme: '' });
  }

  showCategoriesDropdown = () => {
    this.setState({
      categoriosDropdownVisible: true,
    })
  }

  hideCategoriesDropdown = () => {
    this.setState({
      categoriosDropdownVisible: false,
    })
  }

  render() {
    const { categories } = this.props;
    const { categoriosDropdownVisible } = this.state;
    return (
      <div id="main-nav">
        <Navbar className={`navbar-main ${this.state.theme}`} fixed="top">
            <Navbar.Brand>
                <Nav.Link as={Link} to="/">
                  <FontAwesomeIcon icon={faGraduationCap} />
                      Fast Learner
                </Nav.Link>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                <NavDropdown
                    show={categoriosDropdownVisible}
                    title="Categories"
                    onMouseEnter={this.showCategoriesDropdown} 
                    onMouseLeave={this.hideCategoriesDropdown}
                >
                  <NavDropdown.Item as={Link} to="/courses">All categories</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {categories.items &&
                      <div>
                      {categories.items.map((category, key) =>
                          <NavDropdown.Item 
                            as={Link} 
                            to={`/courses/categories/${category.id}`}
                            key={category.id}
                          >
                              {category.title}
                          </NavDropdown.Item>
                      )}
                      </div>
                  }
                </NavDropdown>
                <Nav.Link as={Link} to="/about">About us</Nav.Link>
                <UserButton/>
            </Nav>
            <Nav className="mr-4 nav-brands-icons">
                <Nav.Link href="https://www.facebook.com/" target="_blank">
                    <FontAwesomeIcon icon={faFacebook} />
                </Nav.Link>
                <Nav.Link href="https://www.instagram.com/" target="_blank">
                    <FontAwesomeIcon icon={faInstagram} />
                </Nav.Link>
                <Nav.Link href="https://www.twitter.com/" target="_blank">
                    <FontAwesomeIcon icon={faTwitter} />
                </Nav.Link>
                <Nav.Link href="https://www.linkedin.com/" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} />
                </Nav.Link>
            </Nav>
        </Navbar>
      </div>
    );
  }
}

function UserButton() {
  if (localStorage.getItem('user') != null) {
    return (
      <NavDropdown 
        title="Cabinet" 
        className="cabinet-login-nav"
      >
        <NavDropdown.Item as={Link} to="/cabinet">Profile</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/user-courses">My courses</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} to="/login">Log out</NavDropdown.Item>
      </NavDropdown>)
  }
  return (
    <Nav.Link as={Link} to="/login" className="cabinet-login-nav">
      Login
    </Nav.Link>)
}

function mapState(state) {
  const { categories } = state;
  return { categories };
}

const actionCreators = {
  getCategories: categoryActions.getAll
}

const connectedNaviBar = connect(mapState, actionCreators)(NaviBar);
export { connectedNaviBar as NaviBar };