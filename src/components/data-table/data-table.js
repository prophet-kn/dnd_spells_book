import React, { Component } from 'react'
import '.././../App.css'
import Data from './../../data/spells.json'
import ClassSelector from './../selectors/classSelector'
import LevelSelector from './../selectors/levelSelector'
import SchoolSelector from './../selectors/schoolSelector'

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data
    }

    this.filterState = {
      filterData: 'dd'
    }
  }

  render() {
    console.log(this.filterState)
    return (
      <div className={"dndapp-table"}>

        <div className={"dndapp-selectors"}>
          <ClassSelector onChange={(e) => {this.setState({filterData: e.target.value})}}/>
          <LevelSelector/>
          <SchoolSelector/>
        </div>

        <div className={"dndapp-data"}>
          {this.state.data.map((spell, i) => {
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
            )
          })}
        </div>

      </div>
    )
  }

}

export default DataTable
