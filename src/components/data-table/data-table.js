import React, { Component } from 'react'
import Data from '.././../data/spells.json'
import ReactHtmlParser from 'react-html-parser'
import _ from 'lodash'
import FilterDataButtons from '../filter-data-buttons/filter-data-buttons'
import TogglePin from '../toggle-pin/toggle-pin'
/*
<svg width="256" height="256" class="octicon octicon-chevron-down" viewBox="0 0 10 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path></svg>
<svg width="256" height="256" class="octicon octicon-chevron-left" viewBox="0 0 8 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 3L7 4.5 3.25 8 7 11.5 5.5 13l-5-5 5-5z"></path></svg>
*/
let sortLevel = _.chain(Data)
let uniqueLevel = sortLevel.map(function(level) {
  return level.s_lvl
})
.sort()
.flatten()
.uniq()
.value()

let sortSchool = _.chain(Data)
let uniqueSchool = sortSchool.map(function(school) {
  return school.s_school
})
.sort()
.flatten()
.uniq()
.value()

let sortType = _.chain(Data)
let uniqueType = sortType.map(function(type) {
  return type.s_type
})
.sort()
.flatten()
.uniq()
.value()

let sortClass = _.chain(Data)
let uniqueClass = sortClass.map(function(classes) {
  return classes.s_class_usage
})
.sort()
.flatten()
.uniq()
.value()

class DataTable extends Component {
  constructor(props) {
    super()
    this.state = {
      data: Data,
      showList: false,
      filterSearch: '',
      filterButton: false,
      pin: {
        'id': []
      },
      filters: {
        'School of Magic': [],
        'Level': [],
        'Effect Type': [],
        'Class': []
      }
    }

    this.onPin = this.onPin.bind(this)
    this.removePin = this.removePin.bind(this)
    this.setFilter = this.setFilter.bind(this)
    this.addClassName = this.addClassName.bind(this)
  }

  addClassName(e, i) {
    let spellState = this.state
    spellState.showList = spellState.showList === i ? false : i
    this.setState(spellState)
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
        <FilterDataButtons title={'Level'} values={uniqueLevel} setFilter={this.setFilter} />
        <FilterDataButtons title={'Class'} values={uniqueClass} setFilter={this.setFilter} />
        <FilterDataButtons title={'School of Magic'} values={uniqueSchool} setFilter={this.setFilter} />
        <FilterDataButtons title={'Effect Type'} values={uniqueType} setFilter={this.setFilter} />
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
    .orderBy('s_name')
    .filter((spell) => {
      return _.includes(sortFilters['School of Magic'], spell.s_school) || sortFilters['School of Magic'].length === 0
    })
    .filter((spell) => {
      return _.includes(sortFilters['Level'], spell.s_lvl) || sortFilters['Level'].length === 0
    })
    .filter((spell) => {
      return _.includes(sortFilters['Effect Type'], spell.s_type) || sortFilters['Effect Type'].length === 0
    })
    .filter((spell) => {
      return sortFilters['Class'].some(c => spell.s_class_usage.includes(c)) || sortFilters['Class'].length === 0
    })
    .filter((spell) => {
      return spell.s_name.toLowerCase().includes(this.state.filterSearch.toLowerCase()) || this.state.filterSearch === ''
    })
    .value()

    return (
      <div className={"spell-wrap"}>
        <h1>Spell list</h1>
        {_.orderBy(filteredData, 's_name').map((spell, i) => {
          return (
            <div className={"spell-info"} key={i}>
              <div className={this.state.showList === i ? "spell-dropdown" : "spell-dropdown hide-child"}>
                <div className={"spell-name"} onClick={(e) => {this.addClassName(e, i)}}>
                  <span>{spell.s_name}</span>
                  <div className={"spell-tooltip"}>L: {spell.s_lvl.slice(0, 1)}</div>
                </div>
                <TogglePin type={spell.s_id} key={i} onPin={this.onPin} />
                {(() => {
                  if (this.state.showList === i) {
                    return (
                      <div className={"spell-definitions"}>
                        <div className={"spell-top-level"}>
                          <i>{spell.s_lvl} Level {spell.s_school} spell {spell.s_ritual === true ? '(ritual)' : ''}</i>
                        </div>
                        <div className={"spell-details"}>
                          <div className={"spell-casting-time"}><b>Casting Time:</b> {spell.s_cast_time}</div>
                          <div className={"spell-range"}><b>Range:</b> {spell.s_range}</div>
                          <div className={"spell-components"}><b>Components:</b> {spell.s_components}</div>
                          <div className={"spell-duration"}><b>Duration:</b> {spell.s_duration}</div>
                        </div>
                        <div className={"spell-description"}>{ReactHtmlParser(spell.s_description)}</div>
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
    .orderBy('s_name')
    .filter((spell) => {
      return _.includes(pinnedSpells['id'], spell.s_id)
    })
    .value()

    if (filteredData.length > 0) {
      return (
        <div className={"spell-wrap"}>
          <h1>Pinned Spell list</h1>
          {_.orderBy(filteredData, 's_name').map((spell, i) => {
            return (
              <div className={"spell-info"} key={i}>
                <div className={this.state.showList === i ? "spell-dropdown" : "spell-dropdown hide-child"}>
                  <div className={"spell-name"} onClick={(e) => {this.addClassName(e, i)}}>
                    <span>{spell.s_name}</span>
                    <div className={"spell-tooltip"}>L: {spell.s_lvl.slice(0, 1)}</div>
                  </div>
                  <svg className={"spell-remove-pin"} onClick={(e) => {this.removePin(spell.s_id)}} width="20" height="20" viewBox="0 0 12 16" version="1.1" aria-hidden="true"><path fillRule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
                  {(() => {
                    if (this.state.showList === i) {
                      return (
                        <div className={"spell-definitions"}>
                          <div className={"spell-top-level"}>
                            <i>{spell.s_lvl} Level {spell.s_school} spell {spell.s_ritual === true ? '(ritual)' : ''}</i>
                          </div>
                          <div className={"spell-details"}>
                            <div className={"spell-casting-time"}><b>Casting Time:</b> {spell.s_cast_time}</div>
                            <div className={"spell-range"}><b>Range:</b> {spell.s_range}</div>
                            <div className={"spell-components"}><b>Components:</b> {spell.s_components}</div>
                            <div className={"spell-duration"}><b>Duration:</b> {spell.s_duration}</div>
                          </div>
                          <div className={"spell-description"}>{ReactHtmlParser(spell.s_description)}</div>
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

export default DataTable
