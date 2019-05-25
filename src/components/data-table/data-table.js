import React, { Component } from 'react'
import '.././../App.css'
import Data from './../../data/spells.json'

class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      data: Data,
      filterClass: 'All',
      filterLevel: 'All',
      filterSchool: 'All'
    }
  }

  selectorClass() {
    return (
      <div className={"selector"}>
        <h2>Class</h2>
        <select onChange={(e) => {this.setState({filterClass: e.target.value})}}>
          <option classtype={"all"}>All</option>
          <option classtype={"Bard"}>Bard</option>
          <option classtype={"Wizard"}>Wizard</option>
          <option classtype={"Sorcerer"}>Sorcerer</option>
          <option classtype={"Paladin"}>Paladin</option>
          <option classtype={"Cleric"}>Cleric</option>

        </select>
      </div>
    )
  }

  selectorLevel() {
    return (
      <div className={"selector"}>
        <h2>Spell level</h2>
        <select onChange={(e) => {this.setState({filterLevel: e.target.value})}}>
          <option level={"all"}>All</option>
          <option level={"0"}>0</option>
          <option level={"1"}>1</option>
          <option level={"2"}>2</option>
          <option level={"3"}>3</option>
          <option level={"4"}>4</option>
          <option level={"5"}>5</option>
          <option level={"6"}>6</option>
          <option level={"7"}>7</option>
          <option level={"8"}>8</option>
          <option level={"9"}>9</option>
        </select>
      </div>
    )
  }

  selectorSchool() {
    return (
      <div className={"selector"}>
        <h2>School of Magic</h2>
        <select onChange={(e) => {this.setState({filterSchool: e.target.value})}}>
          <option school={"all"}>All</option>
          <option school={"Conjuration"}>Conjuration</option>
          <option school={"Abjuration"}>Abjuration</option>

        </select>
      </div>
    )
  }

  dataTable() {
    return (
      <div className={"spell-wrap"}>
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
    )
  }

  render() {
    return (
      <div className={"dndapp-table"}>

        <div className={"dndapp-selectors"}>
          {this.selectorClass()}
          {this.selectorLevel()}
          {this.selectorSchool()}
        </div>

        <div className={"dndapp-data"}>
          {this.dataTable()}
        </div>

      </div>
    )
  }

}

export default DataTable
