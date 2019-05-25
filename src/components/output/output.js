import React, { Component } from 'react';
import '.././../App.css';
import Data from './../../data/spells.json';

// Load selector somponents.
import DataTable from './../data-table/data-table'

// Output Component
class Output extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data
    };
  };

  render() {
    return (
      <div className={"dndapp-wrapper"}>
        <DataTable
          data={this.state.data}
        />
      </div>
    );

  };

};

export default Output;
