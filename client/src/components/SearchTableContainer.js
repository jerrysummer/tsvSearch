import React, { Component } from 'react';
import axios from 'axios';
import Styled from 'styled-components'

import SearchInput from './searchTableContainer/SearchInput';
import Table from './searchTableContainer/Table';

const Wrapper = Styled.div`
  height: fit-content;
  width: fit-content;
`

class SearchTableContainer extends Component {
  constructor() {
    super();
    this.state = {
      name:'',
      data: [],
      autoSuggest: []
    };
  }

  componentDidMount() {
    axios
      .get('/api/autosuggest')
      .then(res => this.setState({autoSuggest : res.data}))
  }

  handleChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const route = `/api/search?name=${this.state.name.toUpperCase()}`
    axios
      .get(route)
      .then(res => console.log("search: ", res.data))
  }

  render() {
    return (
      <Wrapper>
        <SearchInput
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          name={this.state.name}
        />
        <Table
          data={this.state.data}
        />
      </Wrapper>
    );
  }
}

export default SearchTableContainer;
