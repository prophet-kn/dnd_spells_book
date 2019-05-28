import React, { Component } from 'react';
import _ from 'lodash';
import '.././../App.css';
import Data from './../../data/spells.json';

let uniqueLevel = _.uniqBy(Data, 's_lvl');

class LevelSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data,
      filterClass: 'All',
    };

    this.selectorLevel = this.selectorLevel.bind(this)
  }

  render() {
    return (
      <div>
        <h2>Spell level</h2>
        <div className={"selector"}>
          <div className={'btn lvl'} value={"all"} onClick={(e) => {this.setState({filterLevel: e.target.innerHTML})}}>All</div>
          {uniqueLevel.map((levels, i) => {
            return (
              <div className={'btn lvl'} value={levels.s_lvl} key={i} onClick={(e) => {this.setState({filterLevel: e.target.innerHTML})}}>{levels.s_lvl}</div>
            );
          })}
        </div>
      </div>
    )
  }

}

export default LevelSelector;
