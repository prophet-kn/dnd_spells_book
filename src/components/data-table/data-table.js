import React, { Component } from 'react'
import './../../App.css'
import Data from '.././../data/spells.json'
import ReactHtmlParser from 'react-html-parser'
import _ from 'lodash'
import FilterDataButtons from '../filter-data-buttons/filter-data-buttons'

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
      showFilter: false,
      filterSearch: '',
      filterType: 'All',
      filterClass: 'All',
      filterLevel: 'All',
      filterSchool: 'All',
      filters: []
    }

    this.setFilter = this.setFilter.bind(this)
    this.addClassName = this.addClassName.bind(this)
  }

  addClassName(e, i) {
    let spellState = this.state
    spellState.showList = spellState.showList === i ? false : i
    this.setState(spellState)
  }

  addFilterClass(e) {
    let filterState = this.state
    filterState.showFilter = filterState.showFilter === false ? true : false
    this.setState(filterState)
  }

  searchBar() {
    return (
      <div>
        <input placeholder={"Search"} className={"search-input"} onChange={(e) => {
          this.setState({filterSearch: e.target.value})
          }}/>
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
    let sortFilters= this.state.filters
    const filteredData =  _.chain(Data)
    .orderBy('s_name')
    .filter((spell) => {
      return _.includes(sortFilters['School of Magic'], spell.s_school) || sortFilters['School of Magic'] === undefined
    })
    .filter((spell) => {
      return _.includes(sortFilters['Level'], spell.s_lvl) || sortFilters['Level'] === undefined
    })
    .filter((spell) => {
      return _.includes(sortFilters['Effect Type'], spell.s_type) || sortFilters['Effect Type'] === undefined
    })
    .filter((spell) => {
      return _.includes(sortFilters['Class'], spell.s_class_usage) || sortFilters['Class'] === undefined
    })
    .filter((spell) => {
      return spell.s_name.toLowerCase().includes(this.state.filterSearch.toLowerCase()) || this.state.filterSearch === ''
    })
    .value()
    console.log(sortFilters)

    return (
      <div className={"spell-wrap"}>
        <h1>Spell list</h1>
        {_.orderBy(filteredData, 's_name').map((spell, i) => {
          return (
            <div className={"spell-info"} key={i}>
              <div className={this.state.showList === i ? "spell-dropdown" : "spell-dropdown hide-child"}>
                <div className={"spell-name"} onClick={(e) => {this.addClassName(e, i)}}>
                  {spell.s_name}
                  <div className={"spell-tooltip"}>
                    {spell.s_lvl} level spell
                  </div>
                </div>
                {(() => {
                  if (this.state.showList === i) {
                    return (
                      <div className={"spell-definitions"}>
                        <div className={"spell-top-level"}><i>{spell.s_lvl} Level {spell.s_school} spell {spell.s_ritual === true ? '(ritual)' : ''}</i></div>
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

  render() {
    return (
      <div className={"dndapp-table"}>
        <div className={"dndapp-selectors"}>
          {this.searchBar()}
          <div className={this.state.showFilter === true ? "filter-wrapper" : "filter-wrapper hide-child"} onClick={(e) => {this.addFilterClass(e)}}>
            <h2>Filters</h2>
          </div>
          {(() => {
            if (this.state.showFilter === true) {
              return (
                <div className={this.state.showFilter === true ? "filter-dropdown" : "filter-dropdown hide-child"}>
                  <FilterDataButtons title={'Level'} values={uniqueLevel} setFilter={this.setFilter} />
                  <FilterDataButtons title={'Class'} values={uniqueClass} setFilter={this.setFilter} />
                  <FilterDataButtons title={'School of Magic'} values={uniqueSchool} setFilter={this.setFilter} />
                  <FilterDataButtons title={'Effect Type'} values={uniqueType} setFilter={this.setFilter} />
                </div>
              )
            }
          })()}
        </div>
        <div className={"dndapp-data"}>
          {this.dataTable()}
        </div>
      </div>
    )
  }

}

export default DataTable
