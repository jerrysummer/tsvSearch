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
        {this.props.data.map((row, idx) => {
          return(
            <div key={idx}>
              {JSON.stringify(row)}
            </div>
          )
        })}
      </div>
    );
  }
}

export default Table;

