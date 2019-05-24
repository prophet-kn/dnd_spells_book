import React, { Component } from 'react';
import _ from 'lodash';
import './../App.css';
import Data from './../data/spells.json';

/**
 * Set vars.
 */
let uniqueSchool = _.uniqBy(Data, 's_school');
let uniqueLevel = _.uniqBy(Data, 's_lvl');

let uniqueClass = _.chain(Data)
let printUniqueClass = uniqueClass.map(function(classes) {
  return classes.s_class_usage.map(c => c.c_class)
})
.flatten()
.uniq()
.value();


class Selector extends Component {
  state = {};

  parseData (response) {
    return response.data;
  }

  onLoad = (Data) => {
    this.setState({
      Data: this.parseData(Data)
    });
  }

  /*render () {
    return (
      <div>
        {Data.map((name, i)=>{
          return (
            <div className={"spell-info"} key={i}>
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
  }*/

  render() {
    return (
      <div className={"dndapp-selectors"}>
        <select className="selector">
          <option school={"none"}>School of Magic</option>
          {uniqueSchool.map((school, i) => {
            return (
              <option school={school.s_school} key={i}>{school.s_school}</option>
            );
          })}
        </select>

        <select className="selector">
          <option classtype={"none"}>Select Class</option>
          {printUniqueClass.map((classes, c) => {
            return <option classtype={classes} key={c}>{classes}</option>;
          })}
        </select>

        <select className="selector">
          <option level={"none"}>Select Level</option>
          {uniqueLevel.map((levels, i) => {
            return (
              <option levels={levels.s_lvl} key={i}>{levels.s_lvl}</option>
            );
          })}
        </select>
      </div>
    );

  }

}

export default Selector;
