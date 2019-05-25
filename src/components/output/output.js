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

    this.classFilter = this.classFilter.bind(this);
  };

  classFilter(c_class) {
    this.setState({
      data: this.data
    });
  };

  render() {
    return (
      <div className={"dndapp-wrapper"}>
        <DataTable
          data={this.state.data}
          classFilter={this.classFilter}
        />
      </div>
    );

  };

};

export default Output;
