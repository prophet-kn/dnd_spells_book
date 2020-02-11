import React, { Component } from 'react'
import Data from '.././../data/feats.json'
import _ from 'lodash'
import FilterDataButtons from '../filter-data-buttons/filter-data-buttons'
import SpellItem from './../spell-item/feat-item'

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

const thisUrl = new URL(window.location)
const spellParamUrls = new URLSearchParams(thisUrl.searchParams)

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

    this.setFilter = this.setFilter.bind(this)
    this.pinStatus = this.pinStatus.bind(this)
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

  pinStatus(toggle, id) {
    let queryIds = this.state.pin

    if (!queryIds['ids']) {
      queryIds['ids'] = []
    }

    if (toggle !== false && _.includes(queryIds['ids'], id) === false) {
      queryIds['ids'].push(id)
    }
    else if (toggle !== true && _.includes(queryIds['ids'], id) === false) {
      queryIds['ids'].push(id)
    }
    else {
      queryIds['ids'] = queryIds['ids'].filter(f => f !== id)
    }

    spellParamUrls.set('f_id', this.state.pin['ids'])

    const oldPath = (window.location.pathname + window.location.search).substr(1)
    var newPath = oldPath
    const fRegex = /\?f_id=[\d,]*/gi;

    if (fRegex.test(oldPath)) {
      newPath = oldPath.replace(fRegex, '?f_id=' + spellParamUrls.get('f_id'))
    } else {
      newPath = oldPath + '?f_id=' + spellParamUrls.get('f_id')
    }

    window.history.replaceState({}, '', newPath)

    this.setState({
      pin: queryIds
    })
  }

  componentDidMount() {
    const idRegex = /\?f_id=([\d,]*)/;
    let firstLoaderUrl = window.location.search.match(idRegex)[1].split(',')
    let initialState = this.state.pin

    if (!initialState['ids']) {
      initialState['ids'] = []
    }

    initialState['ids'] = firstLoaderUrl.map(int => parseInt(int)).filter(int => !Number.isNaN(int))

    this.setState({
      pin: initialState
    })
  }

  dataTable() {
    let pinnedSpells = this.state.pin

    const pinnedData =  _.chain(Data)
    .orderBy('s_name')
    .filter((spell) => {
      return _.includes(pinnedSpells['ids'], spell.f_id)
    })
    .value()

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
      <div className={"dndapp-data"}>
        {pinnedData.length > 0 ?
          <div className={"spell-wrap pinned"}>
            <h1>Pinned Spell list</h1>
            {_.orderBy(pinnedData, 's_name').map((spell, i) => {
              return (
                <div className={"spell-info"} key={i}>
                  <SpellItem spell={spell} key={i} pinStatus={this.pinStatus} />
                </div>
              )
            })}
          </div>
        :
          null
        }
        <div className={"spell-wrap"}>
          <h1>Spell list</h1>
          {_.orderBy(filteredData, 's_name').map((spell, i) => {
            return (
              <div className={"spell-info"} key={i}>
                <SpellItem spell={spell} key={i} pinStatus={this.pinStatus} />
              </div>
            )
          })}
          {filteredData.length === 0 ?
            <div className={"spell-undefined"}>
              Sorry, no spells found for this criteria!
            </div>
          : null}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={"dndapp-table"}>
        <div className={"dndapp-selectors"}>
          {this.searchBar()}
          {this.filterFilter()}
          {this.filterDropdowns()}
        </div>

        {this.dataTable()}
      </div>
    )
  }
}

export default FeatsTable
