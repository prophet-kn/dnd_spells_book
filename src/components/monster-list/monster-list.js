import React, { Component } from 'react'
import _ from 'lodash'
import FilterDataButtons from '../filter-data-buttons/filter-data-buttons'
import Data from './../../data/monsters.json'
import MonsterItem from './../monster-item/monster-item'

const getAllSizes = _.chain(Data)
  .map(function(data) {
    return data.size
  })
  .sort().flatten().sort().uniq().value()

const getAllTypes = _.chain(Data)
  .map(function(data) {
    return data.type
  })
  .sort().flatten().sort().uniq().value()

const getChallenge = _.chain(Data)
  .map(function(data) {
    return data.Challenge
  })
  .sort().flatten().sort().uniq().value()

const getAlignment = _.chain(Data)
  .map(function(data) {
    return data.alignment
  })
  .sort().flatten().sort().uniq().value()

class MonsterList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterSearch: '',
      filterButton: false,
      filters: {
        Size: [],
        Type: [],
        Alignment: [],
        Challenge: []
      }
    }

    this.setFilter = this.setFilter.bind(this)
    this.searchBar = this.searchBar.bind(this)
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

  onClickFilter() {
    this.setState({
      filterButton: this.state.filterButton !== true
    })
  }

  filterDropdowns() {
    return (
      <div className={this.state.filterButton === true ? 'filter-dropdown active' : 'filter-dropdown hidden'}>
        <svg width='30' height='30' viewBox='0 0 12 16' className={'filter-close'} onClick={this.onClickFilter.bind(this)}><path fillRule='evenodd' d='M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z'></path></svg>
        <FilterDataButtons title={'Size'} values={getAllSizes} setFilter={this.setFilter} />
        <FilterDataButtons title={'Type'} values={getAllTypes} setFilter={this.setFilter} />
        <FilterDataButtons title={'Alignment'} values={getAlignment} setFilter={this.setFilter} />
        <FilterDataButtons title={'Challenge'} values={getChallenge} setFilter={this.setFilter} />
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

  searchBar() {
    return (
      <div className={'filter-search'}>
        <input placeholder={'Search'} className={'search-input'} onChange={(e) => {
          this.setState({ filterSearch: e.target.value })
        }}/>
      </div>
    )
  }

  monsterTable() {
    const sortFilters = this.state.filters
    const filteredData = _.chain(Data)

      .orderBy('name')
      .filter((monsterData) => {
        return _.includes(sortFilters.Size, monsterData.size) || sortFilters.Size.length === 0
      })
      .filter((monsterData) => {
        return _.includes(sortFilters.Type, monsterData.type) || sortFilters.Type.length === 0
      })
      .filter((monsterData) => {
        return _.includes(sortFilters.Alignment, monsterData.alignment) || sortFilters.Alignment.length === 0
      })
      .filter((monsterData) => {
        return _.includes(sortFilters.Challenge, monsterData.Challenge) || sortFilters.Challenge.length === 0
      })
      .filter((monsterData) => {
        return monsterData.name.toLowerCase().includes(this.state.filterSearch.toLowerCase()) || this.state.filterSearch === ''
      })
      .value()

    return (
      <div>
        {_.orderBy(filteredData, 'name').map((monsterData, i) => {
          return (
            <div className={'monster-info'} key={i}>
              <MonsterItem monsterData={monsterData} key={i} />
            </div>
          )
        })}
        {filteredData.length === 0
          ? <div className={'monster-undefined'}>
            Sorry, no monsters found, which is weird considering the JSON file, lol.
          </div>
          : null}
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

        {this.monsterTable()}
      </div>
    )
  }
}

export default MonsterList
