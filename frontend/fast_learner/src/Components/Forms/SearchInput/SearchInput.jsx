import React from 'react';

import {
  InputGroup, 
  FormControl,
  Button
  } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import './SearchInput.css';

export class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: props.query ? props.query : '' }
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    search(){
        this.props.onSearch(this.state.query)
    }

    clear(){
        this.setState({query: ""})
    }

    coursesChange(event){
        this.setState({query: event.target.value})
    }

    onKeyUp(event) {
        if (event.charCode === 13) {
            this.props.onSearch(this.state.query)
        }
    }

    render() {
        return (
        <div id="search-input" className="center">
          <InputGroup className="col-md-12">
                <FormControl
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    onChange={(event) => this.coursesChange(event)} 
                    value={this.state.query}
                    onKeyPress={this.onKeyUp}
                />
                
              <InputGroup.Append>
                <Button 
                  variant="outline-secondary" 
                  onClick={ () => this.search()}>
                    <FontAwesomeIcon icon={faSearch}/>
                </Button>
              </InputGroup.Append>
          </InputGroup>
        </div>
  );
}
}