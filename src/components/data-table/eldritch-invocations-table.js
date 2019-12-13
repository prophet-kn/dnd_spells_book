import React from 'react'
import Data from '.././../data/eldritch-invocations.json'
import ReactHtmlParser from 'react-html-parser'
import _ from 'lodash'
import FilterDataButtons from '../filter-data-buttons/filter-data-buttons'
import TogglePin from '../toggle-pin/toggle-pin'
import DataTable from './../data-table/data-table'
/*
<svg width="256" height="256" class="octicon octicon-chevron-down" viewBox="0 0 10 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path></svg>
<svg width="256" height="256" class="octicon octicon-chevron-left" viewBox="0 0 8 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 3L7 4.5 3.25 8 7 11.5 5.5 13l-5-5 5-5z"></path></svg>
*/
let sortPrerequisite = _.chain(Data)
let uniquePrerequisite = sortPrerequisite.map(function(prerequisite) {
  return prerequisite.ei_prerequisite
})
.sort()
.flatten()
.uniq()
.value()

class SpellsTable extends DataTable {
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
        'Prerequisite': []
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

  filterDropdowns() {
    return (
      <div className={this.state.filterButton === true ? "filter-dropdown active" : "filter-dropdown hidden"}>
        <div className={"filter-close"} onClick={this.onClickFilter.bind(this)}></div>
        <FilterDataButtons title={'Prerequisite'} values={uniquePrerequisite} setFilter={this.setFilter} />
      </div>
    )
  }

  dataTable() {
    let sortFilters = this.state.filters
    const filteredData =  _.chain(Data)
    .orderBy('ei_name')
    .filter((spell) => {
      return _.includes(sortFilters['Prerequisite'], spell.ei_prerequisite) || sortFilters['Prerequisite'].length === 0
    })
    .filter((spell) => {
      return spell.ei_name.toLowerCase().includes(this.state.filterSearch.toLowerCase()) || this.state.filterSearch === ''
    })
    .value()

    return (
      <div className={"spell-wrap"}>
        <h1>Spell list</h1>
        {_.orderBy(filteredData, 'ei_name').map((spell, i) => {
          return (
            <div className={"spell-info"} key={i}>
              <div className={this.state.showList === i ? "spell-dropdown" : "spell-dropdown hide-child"}>
                <div className={"spell-name"} onClick={(e) => {this.addClassName(e, i)}}>
                  <span>{spell.ei_name}</span>
                </div>
                <TogglePin type={spell.ei_id} key={i} onPin={this.onPin} />
                {(() => {
                  if (this.state.showList === i) {
                    return (
                      <div className={"spell-definitions"}>
                        <div className={"spell-details"}>
                          <div className={"spell-prerequisite"}><b>Prerequisite:</b> {spell.ei_prerequisite}</div>
                        </div>
                        <div className={"spell-description"}>{ReactHtmlParser(spell.ei_description)}</div>
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
    .orderBy('ei_name')
    .filter((spell) => {
      return _.includes(pinnedSpells['id'], spell.ei_id)
    })
    .value()

    if (filteredData.length > 0) {
      return (
        <div className={"spell-wrap"}>
          <h1>Pinned Spell list</h1>
          {_.orderBy(filteredData, 'ei_name').map((spell, i) => {
            return (
              <div className={"spell-info"} key={i}>
                <div className={this.state.showListPinned === i ? "spell-dropdown" : "spell-dropdown hide-child"}>
                  <div className={"spell-name"} onClick={(e) => {this.addClassNamePinned(e, i)}}>
                    <span>{spell.ei_name}</span>
                    <div className={"spell-tooltip"}>L: {spell.ei_lvl.slice(0, 1)}</div>
                  </div>
                  <svg className={"spell-remove-pin"} onClick={(e) => {this.removePin(spell.ei_id)}} width="20" height="20" viewBox="0 0 12 16" version="1.1" aria-hidden="true"><path fillRule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
                  {(() => {
                    if (this.state.showListPinned === i) {
                      return (
                        <div className={"spell-definitions"}>
                          <div className={"spell-top-level"}>
                            <i>{spell.ei_lvl} Level {spell.ei_school} spell {spell.ei_ritual === true ? '(ritual)' : ''}</i>
                          </div>
                          <div className={"spell-details"}>
                            <div className={"spell-casting-time"}><b>Casting Time:</b> {spell.ei_cast_time}</div>
                            <div className={"spell-range"}><b>Range:</b> {spell.ei_range}</div>
                            <div className={"spell-components"}><b>Components:</b> {spell.ei_components}</div>
                            <div className={"spell-duration"}><b>Duration:</b> {spell.ei_duration}</div>
                          </div>
                          <div className={"spell-description"}>{ReactHtmlParser(spell.ei_description)}</div>
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

export default SpellsTable
