import React, { Component } from 'react';
import './../App.css';
import SchoolData from './../data/spells.json';

class SchoolSelector extends Component {
  render() {
    return (
      <select className="school-selector">
        <option value="">School of Magic</option>
        {SchoolData.map((school, i)=>{
          return <option value={school.s_school} key={i}>{school.s_school}</option>;
        })}
      </select>
    );
  }
}

export default SchoolSelector;
