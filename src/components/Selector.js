import React, { Component } from 'react';
import './../App.css';
import Data from './../data/spells.json';

class SchoolSelector extends Component {
  state = {};

  parseData (response) {
    return response.data;
  }

  onLoad = (data) => {
    this.setState({
      data: this.parseData(Data)
    });
  }

  render () {
    return (
      <div>
        {Data.map((name, i)=>{
          return (
            <div className={"spell-info"}>
              <div className={"spell-dropdown"}>
                <div className={"spell-name"}>
                  {name.s_name}
                </div>
                <div className={"spell-definitions"}>
                  <div className={"spell-top-level"}>Level {name.s_lvl} {name.s_school} spell</div>
                  <div>Casting Time: {name.s_cast_time}</div>
                  <div>Range: {name.s_range} feet</div>
                  <div>Components: {name.s_components}</div>
                  <div>Duration {name.s_duration}</div>
                  <div>{name.s_description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  /*render() {
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

  }*/

}

export default SchoolSelector;
// https://moduscreate.com/blog/ext-js-to-react-load-sort-and-filter-data-with-react/