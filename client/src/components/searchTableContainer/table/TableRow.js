import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

// -----------------------------------------------------------------------------------------
// -------------------------------------- Local imports ------------------------------------
// -----------------------------------------------------------------------------------------
import TableCell from './tableRow/TableCell';
import { headersShown } from '../../../utils/constants';

// -----------------------------------------------------------------------------------------
// -------------------------- SearchTableContainer Components ------------------------------
// -----------------------------------------------------------------------------------------
class DataTable extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
// -----------------------------------------------------------------------------------------
// -------------------------------------- Render -------------------------------------------
// -----------------------------------------------------------------------------------------

  render() {
    const { row } = this.props;
    return (
      <Table.Row>
        {headersShown.map(header => <TableCell header={header} value={row[header]} key={header} />)}
      </Table.Row>
    );
  }
}

export default DataTable;

