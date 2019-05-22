import React, { Component } from 'react';
import './../App.css';
import ClassData from './../data/spells.json';

class ClassSelector extends Component {
  render() {
    return (
      <div className="class-selector">
        {ClassData.map((classes, i)=>{
          return classes.s_class_usage.map((key, k)=>{
            return key.c_class;
          });
        })}
      </div>
    );
  }
}

export default ClassSelector;
