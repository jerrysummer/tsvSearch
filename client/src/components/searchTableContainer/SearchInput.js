import React, { Component } from 'react';
import axios from 'axios';


class SearchInput extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.props.name} onChange={this.props.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SearchInput;
