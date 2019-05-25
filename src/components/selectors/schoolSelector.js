import React, { Component } from 'react';
import _ from 'lodash';
import '.././../App.css';
import Data from './../../data/spells.json';

let uniqueSchool = _.uniqBy(Data, 's_school');

class SchoolSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {Data};
  }

  render() {
    return (
      <div className={"selector"}>
        <h2>School of Magic</h2>
        <select>
          <option school={"all"}>All</option>
          {uniqueSchool.map((school, i) => {
            return (
              <option school={school.s_school} key={i}>{school.s_school}</option>
            );
          })}
        </select>
      </div>
    )
  }

}

export default SchoolSelector;
