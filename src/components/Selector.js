import React, { Component } from 'react';
import './../App.css';
import Data from './../data/spells.json';

class SchoolSelector extends Component {
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
// https://jsbin.com/witokulefu/edit?html,js,output
/*

const items = [{"s_cast_time": "1 action", "s_class_usage": [{"c_class": "Wizard"}, {"c_class": "Sorcerer"} ], "s_components": "V, S", "s_description": "You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or lake 1d6 acid damage. This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th leveI (3d6), and 17th level (4d6).", "s_duration": "Instantaneous", "s_id": 0, "s_lvl": 0, "s_name": "Acid Splash", "s_range": "60 feet", "s_school": "Conjuration", "s_type": "damage"}, {"s_cast_time": "1 action", "s_class_usage": [{"c_class": "Paladin"}, {"c_class": "Cleric"} ], "s_components": "V, S, M (a tiny strip of white cloth)", "s_description": "Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target's hit point maximum and current hit points increase by 5 for the duration. At Higher LeveIs. When you cast this spell using a spell slot of 3rd leveI or higher, a target's hit points increase by an additional 5 for each slot level above 2nd.", "s_duration": "8 hours", "s_id": 1, "s_lvl": 2, "s_name": "Aid", "s_range": "30 feet", "s_school": "Abjuration", "s_type": "support"}, {"s_cast_time": "1 action", "s_class_usage": [{"c_class": "derp test"}, {"c_class": "test class"}, {"c_class": "Paladin"}, {"c_class": "Cleric"} ], "s_components": "ayy", "s_description": "lul", "s_duration": "8 hours", "s_id": 2, "s_lvl": 2, "s_name": "thing", "s_range": "30 feet", "s_school": "Abjuration", "s_type": "test"} ]



const schools = _.uniqBy(items, 's_school')

const classes = _.chain(items)
.map(function(item){
   return item.s_class_usage.map(c => c.c_class)
})
.flatten()
.uniq()
.value()

console.log('schools', schools.map((item) => item.s_school))

console.log('classes', classes)
*/
// lodash 4 
// https://cdn.jsdelivr.net/lodash/4/lodash.min.js