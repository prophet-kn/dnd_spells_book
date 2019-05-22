import React, { Component } from 'react';
import './../App.css';
import ClassData from './../data/spells.json';

class ClassSelector extends Component {
  render() {
    return (
      <div>
        {ClassData.map((classes, index)=>{
          return classes.s_class_usage.s_class;
        })}
      </div>
    );
  }
}

export default ClassSelector;
