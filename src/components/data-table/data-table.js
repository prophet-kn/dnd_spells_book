import React, { Component } from 'react'
import '.././../App.css'
import Data from './../../data/spells.json'
import _ from 'lodash'

let uniqueLevel = _.uniqBy(Data, 's_lvl');
let uniqueSchool = _.uniqBy(Data, 's_school');
let uniqueClass = _.chain(Data)
let printUniqueClass = uniqueClass.map(function(classes) {
  return classes.s_class_usage
})
.flatten()
.uniq()
.value()

class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      data: Data,
      filterClass: 'All',
      filterLevel: 'All',
      filterSchool: 'All',
      showList: false
    }

    this.addClassName = this.addClassName.bind(this)
    this.selectorClass = this.selectorClass.bind(this)
    this.selectorLevel = this.selectorLevel.bind(this)
    this.selectorSchool = this.selectorSchool.bind(this)
  }

  addClassName(e, i) {
    let spellState = this.state
    spellState.showList = spellState.showList === i ? false : i
    this.setState(spellState)
  }

   selectorClass() {
     return (
      <div>
        <h2>Class</h2>
        <div className={"selector"}>
          <div className={'btn class'} classtype={"all"} onClick={(e) => {this.setState({filterClass: e.target.innerHTML})}}>All</div>
          {printUniqueClass.map((usedClasses, c) => {
            return <div className={'btn class'} classtype={usedClasses} key={c} onClick={(e) => {this.setState({filterClass: e.target.innerHTML})}}>{usedClasses}</div>
          })}
        </div>
      </div>
     )
  }

  selectorLevel() {
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

  selectorSchool() {
    return (
      <div>
        <h2>School of Magic</h2>
        <div className={"selector"}>
          <div className={'btn lvl'} value={"all"} onClick={(e) => {this.setState({filterSchool: e.target.innerHTML})}}>All</div>
          {uniqueSchool.map((school, i) => {
            return (
              <div className={'btn school'} school={school.s_school} key={i} onClick={(e) => {this.setState({filterSchool: e.target.innerHTML})}}>{school.s_school}</div>
            );
          })}
        </div>
      </div>
    )
  }

  dataTable() {
    return (
      <div className={"spell-wrap"}>
        <h2>Spell list</h2>
        {this.state.data.map((spell, i) => {
          if (
            (this.state.data.map(s => spell.s_school).indexOf(this.state.filterSchool) > -1 || this.state.filterSchool === 'All') &&
            (this.state.data.map(s => spell.s_lvl).indexOf(this.state.filterLevel) > -1 || this.state.filterLevel === 'All') &&
            (this.state.data.map(s => spell.s_class_usage).flat().indexOf(this.state.filterClass) > -1 || this.state.filterClass === 'All')
            ) {
            return (
              <div className={"spell-info"} key={i}>
                <div className={this.state.showList === i ? "spell-dropdown" : "spell-dropdown hide-child"} >
                  <div className={"spell-name"} onClick={(e) => {this.addClassName(e, i)}}>
                    {spell.s_name}
                  </div>
                  <div className={"spell-definitions"}>
                    <div className={"spell-top-level"}><i>{spell.s_lvl} Level {spell.s_school} spell</i></div>
                    <div className={"spell-details"}>
                      <div className={"spell-casting-time"}><b>Casting Time:</b> {spell.s_cast_time}</div>
                      <div className={"spell-range"}><b>Range:</b> {spell.s_range} feet</div>
                      <div className={"spell-components"}><b>Components:</b> {spell.s_components}</div>
                      <div className={"spell-duration"}><b>Duration:</b> {spell.s_duration}</div>
                    </div>
                    <div className={"spell-description"}>{spell.s_description}</div>
                  </div>
                </div>
              </div>
            )
          }
          else {
            return ''
          }

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
