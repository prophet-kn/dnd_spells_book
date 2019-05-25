import React, { Component } from 'react';
import '.././../App.css';
import Data from './../../data/spells.json';

// Load selector somponents.
import ClassSelector from './../selectors/classSelector'
import LevelSelector from './../selectors/levelSelector'
import SchoolSelector from './../selectors/schoolSelector'
import DataTable from './../data-table/data-table'

// Output Component
class Output extends Component {
  constructor(props) {
    super(props);
    this.state = {Data};
  }

  render() {
    return (
      <div className={"dndapp-wrapper"}>
        <div className={"dndapp-selectors"}>
          <ClassSelector/>
          <LevelSelector/>
          <SchoolSelector/>
        </div>
        <DataTable/>
      </div>
    );

  }

}

export default Output;
