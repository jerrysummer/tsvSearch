import React, { Component } from 'react';

class Table extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        {this.props.data.map(row => {
          return(
            <div>{JSON.stringify(row)}</div>
          )
        })}
      </div>
    );
  }
}

export default Table;

