import React, { Component } from 'react';
import _ from 'lodash';
import '.././../App.css';
import Data from './../../data/spells.json';

/*let uniqueClass = _.chain(Data)
let printUniqueClass = uniqueClass.map(function(classes) {
  return classes.s_class_usage.map(c => c.c_class)
})
.flatten()
.uniq()
.value();*/

class ClassSelector extends Component {
  constructor() {
    super();
    this.state = {
      data: Data,
      filterClass: ''
    }
  }

  render() {
    return (
      <div className={"selector"}>
        <h2>Class</h2>
        <select onChange={(e) => {this.setState({filterClass: e.target.value})}}>
          <option classtype={"all"}>All</option>
          <option classtype={"Wizard"}>Wizard</option>
          <option classtype={"Sorcerer"}>Sorcerer</option>
          <option classtype={"Paladin"}>Paladin</option>
          <option classtype={"Cleric"}>Cleric</option>
        </select>
      </div>
    )
  }

}

export default ClassSelector;
