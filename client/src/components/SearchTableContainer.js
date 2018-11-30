import React, { Component } from 'react';
import axios from 'axios';
import Styled from 'styled-components'
import ReactAutocomplete from 'react-autocomplete'

// -----------------------------------------------------------------------------------------
// -------------------------------------- Local imports ------------------------------------
// -----------------------------------------------------------------------------------------
import DataTable from './searchTableContainer/Table';

// -----------------------------------------------------------------------------------------
// ------------------------------------ Styled Components ----------------------------------
// -----------------------------------------------------------------------------------------

const Wrapper = Styled.div`
  height: fit-content;
  width: fit-content;
  font-size: 12px;
`

const InputWrapper = Styled.div`
  float: left;
  margin-bottom: 10px;
`

// -----------------------------------------------------------------------------------------
// -------------------------- SearchTableContainer Components ------------------------------
// -----------------------------------------------------------------------------------------
class SearchTableContainer extends Component {
  constructor() {
    super();
    this.state = {
      name:'espn',
      data: [],
      autoSuggestVals: [],
      error: ''
    };
  }

// -----------------------------------------------------------------------------------------
// --------------------------- Lifecycle and handler methods -------------------------------
// -----------------------------------------------------------------------------------------
  componentDidMount() {
    axios
      .get('/api/autosuggest')
      .then(res => this.setState({autoSuggestVals : res.data}))
      .catch(err => console.log(err.response))
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
      .then(res => {
        this.setState({data: res.data})
      })
      .catch(err => console.log(err.response))
  }

  handleSelect = (name) => {
    this.setState({name}, () => this.makeQuery(name))
  }
// -----------------------------------------------------------------------------------------
// -------------------------------------- Render -------------------------------------------
// -----------------------------------------------------------------------------------------
  render() {
    return (
      <Wrapper>
        <InputWrapper>
          <form onSubmit={this.handleSubmit} >
            <ReactAutocomplete
              items={this.state.autoSuggestVals.map(val => {
                return({
                  id:val.key, 
                  label:`${val.key} (${val.count})`
                })
              })}
              shouldItemRender={(item, value) => 
                this.state.name && 
                item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              getItemValue={item => item.id}
              renderItem={(item, highlighted) =>
                <div
                  key={item.id}
                  style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                >
                  {item.label}
                </div>
              }
              value={this.state.name}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
              inputProps={{placeholder: "Type here to search..."}}
            />
          </form>
        </InputWrapper>

        <DataTable
          data={this.state.data}
        />
      </Wrapper>
    );
  }
}

export default SearchTableContainer;
