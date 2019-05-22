import React, { Component } from 'react';
import './../App.css';
import SchoolData from './../data/spells.json';

class SchoolSelector extends Component {
  render() {
    return (
      <select className="school-selector">
        <option school={"none"}>School of Magic</option>
        {SchoolData.map((school, i)=>{
          return (
            <option school={school.s_school} key={i}>{school.s_school}</option>
          );
        })}
      </select>
    );
  }
}

export default SchoolSelector;
