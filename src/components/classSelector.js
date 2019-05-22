import React, { Component } from 'react';
import './../App.css';
import ClassData from './../data/spells.json';

class ClassSelector extends Component {
  render() {
    return (
      <select className="class-selector">
        <option classtype={"none"}>Select Class</option>
        {ClassData.map((classes, i)=>{
          return classes.s_class_usage.map((key, k)=>{
            return <option classtype={key.c_class} key={k}>{key.c_class}</option>;
          });
        })}
      </select>
    );
  }
}

export default ClassSelector;
