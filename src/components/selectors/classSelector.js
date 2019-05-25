import React, { Component } from 'react';
import _ from 'lodash';
import '.././../App.css';
import Data from './../../data/spells.json';

let uniqueClass = _.chain(Data)
let printUniqueClass = uniqueClass.map(function(classes) {
  return classes.s_class_usage.map(c => c.c_class)
})
.flatten()
.uniq()
.value();

class ClassSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {Data};
  }

  render() {
    return (
      <div className={"selector"}>
        <h2>Class</h2>
        <select>
          <option classtype={"all"}>All</option>
          {printUniqueClass.map((classes, c) => {
            return <option classtype={classes} key={c}>{classes}</option>;
          })}
        </select>
      </div>
    )
  }

}

export default ClassSelector;
