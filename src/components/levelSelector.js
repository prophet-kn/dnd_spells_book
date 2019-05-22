import React, { Component } from 'react';
import './../App.css';
import LevelData from './../data/spells.json';

class LevelSelector extends Component {
  render() {
    return (
      <select className="level-selector">
        <option value="">Select Level</option>
        {LevelData.map((levels, i)=>{
          return <option value={levels.s_lvl} key={i}>{levels.s_lvl}</option>;
        })}
      </select>
    );
  }
}

export default LevelSelector;

