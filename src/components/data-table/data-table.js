import React, { Component } from 'react'
import _ from 'lodash'

class DataTable extends Component {
  constructor(props) {
    super()

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
