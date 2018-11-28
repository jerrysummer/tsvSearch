import React, { Component } from 'react';
import axios from 'axios';
import Styled from 'styled-components'
import ReactAutocomplete from 'react-autocomplete'


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
      autoSuggestVals: []
    };
  }

  componentDidMount() {
    axios
      .get('/api/autosuggest')
      .then(res => this.setState({autoSuggestVals : res.data}))
  }

  handleChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.makeQuery(this.state.name);
  }

  makeQuery = (name) => {
    const route = `/api/search?name=${name.toUpperCase()}`
    axios
      .get(route)
      .then(res => this.setState({data: res.data}))
  }

  handleSelect = (name) => {
    this.setState({name})
  }

  render() {
    return (
      <Wrapper>
        <form onSubmit={this.handleSubmit} >
          <ReactAutocomplete
            items={this.state.autoSuggestVals.map(val => {return({id:val, label:val})})}
            shouldItemRender={(item, value) => this.state.name && item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            getItemValue={item => item.label}
            renderItem={(item, highlighted) =>
              <div
              key={item.id}
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
              >
                {item.label}
              </div>
            }
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            onSelect={this.handleSelect}
            inputProps={{placeholder: "Type here to search..."}}
          />
        </form>

        <Table
          data={this.state.data}
        />
      </Wrapper>
    );
  }
}

export default SearchTableContainer;
