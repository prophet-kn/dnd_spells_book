import React, { Component } from 'react';
import './../App.css';
import Data from './../data/spells.json';

class SchoolSelector extends Component {
  state = {};
  render() {
    return (
      <div className={"dndapp-selectors"}>
        <select className="selector">
          <option school={"none"}>School of Magic</option>
          {Data.map((school, i)=>{
            return (
              <option school={school.s_school} key={i}>{school.s_school}</option>
            );
          })}
        </select>

        <select className="selector">
          <option classtype={"none"}>Select Class</option>
          {Data.map((classes, i)=>{
            return classes.s_class_usage.map((key, k)=>{
              return <option classtype={key.c_class} key={k}>{key.c_class}</option>;
            });
          })}
        </select>

        <select className="selector">
          <option level={"none"}>Select Level</option>
          {Data.map((levels, i)=>{
            return <option level={levels.s_lvl} key={i}>{levels.s_lvl}</option>;
          })}
        </select>
      </div>
    );

  }

}

export default SchoolSelector;
// https://moduscreate.com/blog/ext-js-to-react-load-sort-and-filter-data-with-react/