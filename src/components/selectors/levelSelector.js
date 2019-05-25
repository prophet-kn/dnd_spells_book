import React, { Component } from 'react';
import _ from 'lodash';
import '.././../App.css';
import Data from './../../data/spells.json';

let uniqueLevel = _.uniqBy(Data, 's_lvl');

class LevelSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {Data};
  }

  render() {
    return (
      <div className={"selector"}>
        <h2>Spell level</h2>
        <select>
          <option level={"all"}>All</option>
          {uniqueLevel.map((levels, i) => {
            return (
              <option levels={levels.s_lvl} key={i}>{levels.s_lvl}</option>
            );
          })}
        </select>
      </div>
    )
  }

}

export default LevelSelector;
