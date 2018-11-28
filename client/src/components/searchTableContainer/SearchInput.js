import React, { Component } from 'react';
import ReactAutocomplete from 'react-autocomplete'


class SearchInput extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <ReactAutocomplete
          items={this.props.autoSuggestVals.map(val => {return({id:val, label:"val"})})}
          shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
          getItemValue={item => item.label}
          renderItem={(item, highlighted) =>
            <div
              key={item.id}
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
            >
              {item.label}
            </div>
          }
          value={this.props.name}
          onChange={e => this.setState({ value: e.target.value })}
          onSelect={value => this.setState({ value })}
        />
      </div>
    );
  }
}

export default SearchInput;
