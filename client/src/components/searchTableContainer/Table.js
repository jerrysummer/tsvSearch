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
      <Table 
        striped 
        compact='very'
      >
        <Table.Header>
          <Table.Row>
            {headersShown.map(header => <Table.HeaderCell key={header}>{header}</Table.HeaderCell>)}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data && data.map((row, idx) => <TableRow row={row} key={idx}/>)}
        </Table.Body>
      </Table>

    );
  }
}

export default DataTable;

