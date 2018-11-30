import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

import TableRow from './table/TableRow';
import { headersShown } from '../../utils/constants';

class DataTable extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { data } = this.props;

    return (

      <div>

        <Table fixed>
          <Table.Header>
            <Table.Row>
              {headersShown.map(header => <Table.HeaderCell>{header}</Table.HeaderCell>)}
            </Table.Row>
          </Table.Header>

          <Table.Body>

            {/* {data && data.map(row => <TableRow row={row}/>)} */}

            {data && data.map(row => {
              return (
                <Table.Row>
                  {headersShown.map(title => {
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

