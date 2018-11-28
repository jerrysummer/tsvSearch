import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'


class DataTable extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { data } = this.props;
    console.log('data: ', data);
    const headers = data[0]? Object.keys(data[0]) : [];
    console.log('headers: ', headers);

    return (

      <div>
        {/* {this.props.data.map((row, idx) => {
          return(
            <div key={idx}>
              {JSON.stringify(row)}
            </div>
          )
        })} */}
        <Table fixed>
          <Table.Header>
            <Table.Row>
              {headers.map(title => <Table.HeaderCell>{title}</Table.HeaderCell>)}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data && data.map(row => {
              return (
                <Table.Row>
                  {headers.map(title => {
                    return (
                      <Table.Cell>
                        {row[title]}
                      </Table.Cell>
                    )
                  })}
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>

      </div>
    );
  }
}

export default DataTable;

