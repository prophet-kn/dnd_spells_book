import React, { Component } from 'react'
import Data from './../../data/spells.json'
import _ from 'lodash'
import FilterDataButtons from '../filter-data-buttons/filter-data-buttons'
import SpellItem from './../items/spell-item'

const sortLevel = _.chain(Data)
const uniqueLevel = sortLevel.map(function(level) {
  return level.s_lvl
})
  .sort()
  .flatten()
  .uniq()
  .value()

const sortSchool = _.chain(Data)
const uniqueSchool = sortSchool.map(function(school) {
  return school.s_school
})
  .sort()
  .flatten()
  .uniq()
  .value()

const sortType = _.chain(Data)
const uniqueType = sortType.map(function(type) {
  return type.s_type
})
  .sort()
  .flatten()
  .uniq()
  .value()

const sortDamageType = _.chain(Data)
const uniqueDamageType = sortDamageType.map(function(damageType) {
  return damageType.s_damage_type
})
  .sort()
  .flatten()
  .uniq()
  .value()

const sortClass = _.chain(Data)
const uniqueClass = sortClass.map(function(classes) {
  return classes.s_class_usage
})
  .sort()
  .flatten()
  .uniq()
  .value()

const sortRitual = _.chain(Data)
const uniqueRitual = sortRitual.map(function(rituals) {
  return rituals.s_ritual
})
  .sort()
  .flatten()
  .uniq()
  .value()

const sortRange = _.chain(Data)
const uniqueRange = sortRange.map(function(ranges) {
  return ranges.s_range
})
  .sort()
  .flatten()
  .uniq()
  .value()

const thisUrl = new URL(window.location)
const spellParamUrls = new URLSearchParams(thisUrl.searchParams)

class SpellsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: Data,
      filterSearch: '',
      filterButton: false,
      pin: {
        ids: []
      },
      filters: {
        'School of Magic': [],
        Level: [],
        'Effect Type': [],
        'Damage Type': [],
        Class: [],
        Ritual: [],
        Range: []
      }
    }

    this.setFilter = this.setFilter.bind(this)
    this.pinStatus = this.pinStatus.bind(this)
  }

  searchBar() {
    return (
      <div className={'filter-search'}>
        <input placeholder={'Search'} className={'search-input'} onChange={(e) => {
          this.setState({ filterSearch: e.target.value })
        }}/>
      </div>
    )
  }

  onClickFilter() {
    this.setState({
      filterButton: this.state.filterButton !== true
    })
  }

  filterFilter() {
    return (
      <div className={'filter-filter'} onClick={this.onClickFilter.bind(this)}>
        <div className={'filter-field'}>
          Filters
        </div>
      </div>
    )
  }

  filterDropdowns() {
    return (
      <div className={this.state.filterButton === true ? 'filter-dropdown active' : 'filter-dropdown hidden'}>
        <svg width="30" height="30" viewBox="0 0 12 16" className={'filter-close'} onClick={this.onClickFilter.bind(this)}><path fillRule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
        <FilterDataButtons title={'Level'} values={uniqueLevel} setFilter={this.setFilter} />
        <FilterDataButtons title={'Class'} values={uniqueClass} setFilter={this.setFilter} />
        <FilterDataButtons title={'School of Magic'} values={uniqueSchool} setFilter={this.setFilter} />
        <FilterDataButtons title={'Effect Type'} values={uniqueType} setFilter={this.setFilter} />
        <FilterDataButtons title={'Damage Type'} values={uniqueDamageType} setFilter={this.setFilter} />
        <FilterDataButtons title={'Ritual'} values={uniqueRitual} setFilter={this.setFilter} />
        <FilterDataButtons title={'Range'} values={uniqueRange} setFilter={this.setFilter} />
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
    } else {
      newFilters[type] = newFilters[type].filter(f => f !== filter.type)
    }

    this.setState({
      filters: newFilters
    })
  }

  pinStatus(toggle, id) {
    const queryIds = this.state.pin

    if (!queryIds.ids) {
      queryIds.ids = []
    }

    if (toggle !== false && _.includes(queryIds.ids, id) === false) {
      queryIds.ids.push(id)
    } else if (toggle !== true && _.includes(queryIds.ids, id) === false) {
      queryIds.ids.push(id)
    } else {
      queryIds.ids = queryIds.ids.filter(f => f !== id)
    }

    const oldPath = ('/' + window.location.search).substr(1)
    var newPath = oldPath
    const sRegex = /\?s_id=[\d,]*/gi

    spellParamUrls.set('s_id', this.state.pin.ids)

    if (sRegex.test(oldPath)) {
      newPath = oldPath.replace(sRegex, '?s_id=' + spellParamUrls.get('s_id'))
    } else {
      newPath = oldPath + '?s_id=' + spellParamUrls.get('s_id')
    }

    window.history.replaceState({}, '', newPath)

    this.setState({
      pin: queryIds
    })
  }

  componentDidMount() {
    const idRegex = /\?s_id=([\d,]*)/

    if (window.location.search.match(idRegex)) {
      const firstLoaderUrl = window.location.search.match(idRegex)[1].split(',')
      const initialState = this.state.pin

      if (!initialState.ids) {
        initialState.ids = []
      }

      initialState.ids = firstLoaderUrl.map(int => parseInt(int)).filter(int => !Number.isNaN(int))

      this.setState({
        pin: initialState
      })
    }
  }

  dataTable() {
    const pinnedSpells = this.state.pin

    const pinnedData = _.chain(Data)
      .orderBy('s_name')
      .filter((spell) => {
        return _.includes(pinnedSpells.ids, spell.s_id)
      })
      .value()

    const sortFilters = this.state.filters

    const filteredData = _.chain(Data)
      .orderBy('s_name')
      .filter((spell) => {
        return _.includes(sortFilters['School of Magic'], spell.s_school) || sortFilters['School of Magic'].length === 0
      })
      .filter((spell) => {
        return _.includes(sortFilters.Level, spell.s_lvl) || sortFilters.Level.length === 0
      })
      .filter((spell) => {
        return sortFilters['Effect Type'].some(c => spell.s_type.includes(c)) || sortFilters['Effect Type'].length === 0
      })
      .filter((spell) => {
        return _.includes(sortFilters['Damage Type'], spell.s_damage_type) || sortFilters['Damage Type'].length === 0
      })
      .filter((spell) => {
        return sortFilters.Class.some(c => spell.s_class_usage.includes(c)) || sortFilters.Class.length === 0
      })
      .filter((spell) => {
        return _.includes(sortFilters.Ritual, spell.s_ritual) || sortFilters.Ritual.length === 0
      })
      .filter((spell) => {
        return _.includes(sortFilters.Range, spell.s_range) || sortFilters.Range.length === 0
      })
      .filter((spell) => {
        return spell.s_name.toLowerCase().includes(this.state.filterSearch.toLowerCase()) || this.state.filterSearch === ''
      })
      .value()

    return (
      <div className={'dndapp-data'}>
        {pinnedData.length > 0
          ? <div className={'list-wrap pinned'}>
            <h1>Pinned spell list</h1>
            {_.orderBy(pinnedData, 's_name').map((spell, i) => {
              return (
                <div className={'item-wrap'} key={i}>
                  <SpellItem spell={spell} key={i} pinStatus={this.pinStatus} />
                </div>
              )
            })}
          </div>
          : null
        }
        <div className={'list-wrapper'}>
          <h1>Spell list</h1>
          {_.orderBy(filteredData, 's_name').map((spell, i) => {
            return (
              <div className={'item-wrapper'} key={i}>
                <SpellItem spell={spell} key={i} pinStatus={this.pinStatus} />
              </div>
            )
          })}
          {filteredData.length === 0
            ? <div className={'item-undefined'}>
              Sorry, no spells found for this criteria!
            </div>
            : null}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={'dndapp-table'}>
        <div className={'dndapp-selectors'}>
          {this.searchBar()}
          {this.filterFilter()}
          {this.filterDropdowns()}
        </div>

        {this.dataTable()}
      </div>
    )
  }
}

export default SpellsTable
