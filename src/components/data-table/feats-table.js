import React, { Component } from 'react'
import Data from '.././../data/feats.json'
import ReactHtmlParser from 'react-html-parser'
import _ from 'lodash'
import FilterDataButtons from '../filter-data-buttons/filter-data-buttons'
import TogglePin from '../toggle-pin/toggle-pin'

let sortRacePrerequisite = _.chain(Data)
let uniqueRacePrerequisite = sortRacePrerequisite.map(function(prerequisite_race) {
  return prerequisite_race.f_prerequisite_race
})
.flatten()
.sort()
.uniq()
.value()

let sortSkillPrerequisite = _.chain(Data)
let uniqueSkillPrerequisite = sortSkillPrerequisite.map(function(prerequisite_skill) {
  return prerequisite_skill.f_prerequisite_skill
})
.flatten()
.sort()
.uniq()
.value()

class FeatsTable extends Component {
  constructor(props) {
    super()
    this.state = {
      data: Data,
      showList: false,
      showListPinned: false,
      filterSearch: '',
      filterButton: false,
      pin: {
        'id': []
      },
      filters: {
        'Race prerequisite': [],
        'Skill prerequisite': []
      }
    }

    this.onPin = this.onPin.bind(this)
    this.removePin = this.removePin.bind(this)
    this.setFilter = this.setFilter.bind(this)
    this.addClassName = this.addClassName.bind(this)
    this.addClassNamePinned = this.addClassNamePinned.bind(this)
  }

  addClassName(e, i) {
    let spellState = this.state
    spellState.showList = spellState.showList === i ? false : i
    this.setState(spellState)
  }

  addClassNamePinned(e, i) {
    let pinState = this.state
    pinState.showListPinned = pinState.showListPinned === i ? false : i
    this.setState(pinState)
  }

  onPin(toggle, id) {
    const queryIds = this.state.pin

    if (!queryIds['id']) {
      queryIds['id'] = []
    }

    if (toggle !== false) {
      queryIds['id'].push(id)
    }
    else {
      queryIds['id'] = queryIds['id'].filter(f => f !== id)
    }

    this.setState({
      pin: queryIds
    })
  }

  removePin(id) {
    const queryIds = this.state.pin

    if (_.includes(queryIds['id'], id) === true) {
      queryIds['id'] = queryIds['id'].filter(f => f !== id)

      this.setState({
        pin: queryIds
      })
    }
  }

  searchBar() {
    return (
      <div className={"filter-search"}>
        <input placeholder={"Search"} className={"search-input"} onChange={(e) => {
          this.setState({filterSearch: e.target.value})
          }}/>
      </div>
    )
  }

  onClickFilter() {
    this.setState({
      filterButton: this.state.filterButton === true ? false : true,
    })
  }

  filterFilter() {
    return (
      <div className={"filter-filter"} onClick={this.onClickFilter.bind(this)}>
        <div className={"filter-field"}>
          Filters
        </div>
      </div>
    )
  }

  filterDropdowns() {
    return (
      <div className={this.state.filterButton === true ? "filter-dropdown active" : "filter-dropdown hidden"}>
        <div className={"filter-close"} onClick={this.onClickFilter.bind(this)}></div>
        <FilterDataButtons title={'Race prerequisite'} values={uniqueRacePrerequisite} setFilter={this.setFilter} />
        <FilterDataButtons title={'Skill prerequisite'} values={uniqueSkillPrerequisite} setFilter={this.setFilter} />
      </div>
    )
  }

  setFilter(type, filter, value) {
    const newFilters = this.state.filters
    if (!newFilters[type]) {
      newFilters[type] = []
    }

    if (value.toggled === true) {
      newFilters[type].push(filter.type)
    }
    else {
      newFilters[type] = newFilters[type].filter(f => f !== filter.type)
    }

    this.setState({
      filters: newFilters
    })
  }

  dataTable() {
    let sortFilters = this.state.filters
    const filteredData =  _.chain(Data)
    .orderBy('f_name')
    .filter((spell) => {
      return sortFilters['Race prerequisite'].some(c => spell.f_prerequisite_race.includes(c)) || sortFilters['Race prerequisite'].length === 0
    })
    .filter((spell) => {
      return sortFilters['Skill prerequisite'].some(c => spell.f_prerequisite_skill.includes(c)) || sortFilters['Skill prerequisite'].length === 0
    })
    .filter((spell) => {
      return spell.f_name.toLowerCase().includes(this.state.filterSearch.toLowerCase()) || this.state.filterSearch === ''
    })
    .value()

    return (
      <div className={"spell-wrap"}>
        <h1>Spell list</h1>
        {_.orderBy(filteredData, 'f_name').map((spell, i) => {
          return (
            <div className={"spell-info"} key={i}>
              <div className={this.state.showList === i ? "spell-dropdown" : "spell-dropdown hide-child"}>
                <div className={"spell-name"} onClick={(e) => {this.addClassName(e, i)}}>
                  <span>{spell.f_name}</span>
                </div>
                <TogglePin type={spell.f_id} key={i} onPin={this.onPin} />
                {(() => {
                  if (this.state.showList === i) {
                    return (
                      <div className={"spell-definitions"}>
                        <div className={"spell-top-level"}>
                          <i>Prerequisites:</i>
                        </div>
                        <div className={"spell-details"}>
                          <div className={"spell-prerequisite-race"}><b>Race:</b> {Array.isArray(spell.f_prerequisite_race) ? spell.f_prerequisite_race.join(", ") : spell.f_prerequisite_race}</div>
                          <div className={"spell-prerequisite-skill"}><b>Skill:</b> {Array.isArray(spell.f_prerequisite_skill) ? spell.f_prerequisite_skill.join(", ") : spell.f_prerequisite_skill}</div>
                        </div>
                        <div className={"spell-description"}>{ReactHtmlParser(spell.f_description)}</div>
                      </div>
                    )
                  }
                })()}
              </div>
            </div>
          )
        })}
        {filteredData.length === 0 ?
        <div className={"spell-undefined"}>
          Sorry, no spells found for this criteria!
        </div>
        : null}
      </div>
    )
  }

  dataTablePinned() {
    let pinnedSpells = this.state.pin
    const filteredData =  _.chain(Data)
    .orderBy('f_name')
    .filter((spell) => {
      return _.includes(pinnedSpells['id'], spell.f_id)
    })
    .value()

    if (filteredData.length > 0) {
      return (
        <div className={"spell-wrap"}>
          <h1>Pinned Spell list</h1>
          {_.orderBy(filteredData, 'f_name').map((spell, i) => {
            return (
              <div className={"spell-info"} key={i}>
                <div className={this.state.showListPinned === i ? "spell-dropdown" : "spell-dropdown hide-child"}>
                  <div className={"spell-name"} onClick={(e) => {this.addClassNamePinned(e, i)}}>
                    <span>{spell.f_name}</span>
                  </div>
                  <svg className={"spell-remove-pin"} onClick={(e) => {this.removePin(spell.f_id)}} width="20" height="20" viewBox="0 0 12 16" version="1.1" aria-hidden="true"><path fillRule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
                  {(() => {
                    if (this.state.showListPinned === i) {
                      return (
                        <div className={"spell-definitions"}>
                          <div className={"spell-top-level"}>
                            <i>Prerequisites:</i>
                          </div>
                          <div className={"spell-details"}>
                            <div className={"spell-prerequisite-race"}><b>Race:</b> {Array.isArray(spell.f_prerequisite_race) ? spell.f_prerequisite_race.join(", ") : spell.f_prerequisite_race}</div>
                            <div className={"spell-prerequisite-skill"}><b>Skill:</b> {Array.isArray(spell.f_prerequisite_skill) ? spell.f_prerequisite_skill.join(", ") : spell.f_prerequisite_skill}</div>
                          </div>
                          <div className={"spell-description"}>{ReactHtmlParser(spell.f_description)}</div>
                        </div>
                      )
                    }
                  })()}
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }

  render() {
    return (
      <div className={"dndapp-table"}>
        <div className={"dndapp-selectors"}>
          {this.searchBar()}
          {this.filterFilter()}
          {this.filterDropdowns()}
        </div>
        <div className={"dndapp-data"}>
          {this.dataTablePinned()}
          {this.dataTable()}
        </div>
      </div>
    )
  }
}

export default FeatsTable
