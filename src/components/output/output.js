import React, { Component } from 'react';
import _ from 'lodash';
import '.././../App.css';
import Data from './../../data/spells.json';

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

class Output extends Component {
  constructor(props) {
    super(props);
    this.state = {Data};
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
      <div className={"dndapp-wrapper"}>
        <div className={"dndapp-selectors"}>

          <h2>School of Magic</h2>
          <select className="selector">
            <option school={"all"}>All</option>
            {uniqueSchool.map((school, i) => {
              return (
                <option school={school.s_school} key={i}>{school.s_school}</option>
              );
            })}
          </select>

          <h2>Class</h2>
          <select className="selector">
            <option classtype={"all"}>All</option>
            {printUniqueClass.map((classes, c) => {
              return <option classtype={classes} key={c}>{classes}</option>;
            })}
          </select>

          <h2>Spell level</h2>
          <select className="selector">
            <option level={"all"}>All</option>
            {uniqueLevel.map((levels, i) => {
              return (
                <option levels={levels.s_lvl} key={i}>{levels.s_lvl}</option>
              );
            })}
          </select>
        </div>

        <div className={"dndapp-data"}>
          {Data.map((spell, i) => {
            return (
              <div className={"spell-info"} key={i}>
                <div className={"spell-dropdown"}>
                  <div className={"spell-name"}>
                    {spell.s_name}
                  </div>
                  <div className={"spell-definitions hidden"}>
                    <div className={"spell-top-level"}>Level {spell.s_lvl} {spell.s_school} spell</div>
                    <div className={"spell-casting-time"}>Casting Time: {spell.s_cast_time}</div>
                    <div className={"spell-range"}>Range: {spell.s_range} feet</div>
                    <div className={"spell-components"}>Components: {spell.s_components}</div>
                    <div className={"spell-duration"}>Duration {spell.s_duration}</div>
                    <div className={"spell-description"}>{spell.s_description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

  }

}

export default Output;
