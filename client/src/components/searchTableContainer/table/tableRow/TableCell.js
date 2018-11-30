import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import Styled, { css } from 'styled-components'

// -----------------------------------------------------------------------------------------
// ------------------------------------ Styled Components ----------------------------------
// -----------------------------------------------------------------------------------------

const Lines = Styled.div`
  display: flex;
  white-space: pre;
  height: 20px;
  overflow-y: hidden;
  ${props =>
    props.expand &&
    css`
      height: fit-content;
  `};
`
const Carrot = Styled.div` 
  margin: 5px;
 
  width: 0; 
  height: 0; 
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid green;
  
  ${props =>
    props.expand &&
    css`
      width: 0; 
      height: 0; 
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid green;
  `};
  ${props =>
    !props.hide &&
    css`
      display: none; 
  `};
`

// -----------------------------------------------------------------------------------------
// -------------------------- SearchTableContainer Components ------------------------------
// -----------------------------------------------------------------------------------------
class TableCell extends Component {
  constructor() {
    super();
    this.state = {
      expand: false
    };
  }

  toggleExpand = () => {
    this.setState({expand : !this.state.expand})
  }

  subRender = (header, value) => {
    if(header === "URL") {
      return (
        <Table.Cell>
          <a href={value}>link</a>
        </Table.Cell>
      )
    } else if(header === "Nucleotide Change") {
      return (
        <Table.Cell>
          {value.split(",")}
        </Table.Cell>
      )
    } else if(header === "Other Mappings") {
      return (
        <Table.Cell>
          
          <Lines
            expand={this.state.expand}
            onClick={this.toggleExpand}
          >
            <Carrot
              hide={value.split(",").length > 1}
              expand={this.state.expand}
            />
            <div>
              {value.split(",").join("\n")}
            </div>
          </Lines>
        </Table.Cell>
      )
    }

    return (
      <Table.Cell>
        {value? value: "-"}
      </Table.Cell>
    )
  }
// -----------------------------------------------------------------------------------------
// -------------------------------------- Render -------------------------------------------
// -----------------------------------------------------------------------------------------

  render() {
    const { header, value } = this.props;

    return (
      this.subRender(header, value)
    )
  }
}

export default TableCell;

