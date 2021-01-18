import React, { Component } from 'react'
import Data from './../../data/spells.json'
import _ from 'lodash'
import FilterDataButtons from '../filter-data-buttons/filter-data-buttons'
import SpellItem from './../items/spell-item'
import { unique } from '../helpers/helpers'
import ScrollToTop from '../nav/scroll-to-top'

var filterNames = {
  's_lvl': 'Level',
  's_class_usage': 'Class',
  's_school': 'School of Magic',
  's_type': 'Effect Type',
  's_damage_type': 'Damage Type',
  's_ritual': 'Ritual',
  's_range': 'Range',
  's_cast_time': 'Cast Time',
  's_upcastable': 'Upcastable'
}

var uniqueFilters = {}
var initialFilters = {}

for (const [key, value] of Object.entries(filterNames)) {
  uniqueFilters[value] = unique(Data, key)
  initialFilters[value] = []
}

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
      filters: initialFilters
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
        <div className={'filter-buttons-wrapper'}>
          {Object.keys(uniqueFilters).map((key, index) => (
            <FilterDataButtons key={index} title={key} values={uniqueFilters[key]} setFilter={this.setFilter}/>
          ))}
        </div>
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

    var filters = {}

    for (const [key, value] of Object.entries(filterNames)) {
      filters[key] = this.state.filters[value]
    }

    var filteredData = Data
      .filter(function(item) {
        for (const key in filters) {
          if (filters[key].length === 0) {
            continue
          } else if (item[key] instanceof Array && filters[key].some(c => item[key].includes(c)) === false) {
            return false
          } else if ((typeof item[key] === 'string' || typeof item[key] === 'boolean') && filters[key].includes(item[key]) === false) {
            return false
          }
        }
        return true
      })
      .filter((spell) => {
        return spell.s_name.toLowerCase().includes(this.state.filterSearch.toLowerCase()) || this.state.filterSearch === ''
      })

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
        <ScrollToTop />
      </div>
    )
  }
}

export default SpellsTable
