import React from 'react'
import Data from '.././../data/eldritch-invocations.json'
import ReactHtmlParser from 'react-html-parser'
import _ from 'lodash'
import FilterDataButtons from '../filter-data-buttons/filter-data-buttons'
import TogglePin from '../toggle-pin/toggle-pin'
import DataTable from './../data-table/data-table'

let sortPact = _.chain(Data)
let uniquePact = sortPact.map(function(pact) {
  return pact.ei_pact
})
.sort()
.flatten()
.uniq()
.value()

let sortPrerequisite = _.chain(Data)
let uniquePrerequisite = sortPrerequisite.map(function(prerequisite) {
  return prerequisite.ei_prerequisite
})
.sort()
.flatten()
.uniq()
.value()

let uniqueLevel = Array.from(Array(20), (e,i)=>i+1)

class InvocationsTable extends DataTable {
  constructor(props) {
    super(props)
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
        'Level': [],
        'Pact': [],
        'Prerequisite': []
      }
    }
  }

  filterDropdowns() {
    return (
      <div className={this.state.filterButton === true ? "filter-dropdown active" : "filter-dropdown hidden"}>
        <div className={"filter-close"} onClick={this.onClickFilter.bind(this)}></div>
        <FilterDataButtons title={'Level'} values={uniqueLevel} setFilter={this.setFilter} />
        <FilterDataButtons title={'Pact'} values={uniquePact} setFilter={this.setFilter} />
        <FilterDataButtons title={'Prerequisite'} values={uniquePrerequisite} setFilter={this.setFilter} />
      </div>
    )
  }

  dataTable() {
    let sortFilters = this.state.filters
    const filteredData =  _.chain(Data)
    .orderBy('ei_name')
    .filter((invocation) => {
      return _.lt(invocation.ei_lvl, parseFloat(sortFilters['Level'][0]) + 1) || sortFilters['Level'].length === 0
    })
    .filter((invocation) => {
      return _.includes(sortFilters['Pact'], invocation.ei_pact) || sortFilters['Pact'].length === 0
    })
    .filter((invocation) => {
      return _.includes(sortFilters['Prerequisite'], invocation.ei_prerequisite) || sortFilters['Prerequisite'].length === 0
    })
    .filter((invocation) => {
      return invocation.ei_name.toLowerCase().includes(this.state.filterSearch.toLowerCase()) || this.state.filterSearch === ''
    })
    .value()

    return (
      <div className={"spell-wrap"}>
        <h1>Eldritch Invocations</h1>
        {_.orderBy(filteredData, 'ei_name').map((invocation, i) => {
          return (
            <div className={"spell-info"} key={i}>
              <div className={this.state.showList === i ? "spell-dropdown" : "spell-dropdown hide-child"}>
                <div className={"spell-name"} onClick={(e) => {this.addClassName(e, i)}}>
                  <span>{invocation.ei_name}</span>
                  <div className={"spell-tooltip"}>L: {invocation.ei_lvl}</div>
                </div>
                <TogglePin type={invocation.ei_id} key={i} onPin={this.onPin} />
                {(() => {
                  if (this.state.showList === i) {
                    return (
                      <div className={"spell-definitions"}>
                        <div className={"spell-top-level"}>
                          <i>Prerequisites:</i>
                        </div>
                        <div className={"spell-details"}>
                          <div className={"spell-prerequisite"}><b>Warlock level:</b> {invocation.ei_lvl == null ? "none" : invocation.ei_lvl}</div>
                          <div className={"spell-prerequisite"}><b>Pact:</b> {invocation.ei_pact == null ? "none" : invocation.ei_pact}</div>
                          <div className={"spell-prerequisite"}><b>Spell:</b> {invocation.ei_prerequisite == null ? "none" : invocation.ei_prerequisite}</div>
                        </div>
                        <div className={"spell-description"}>{ReactHtmlParser(invocation.ei_description)}</div>
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
          Sorry, no invocations found for this criteria!
        </div>
        : null}
      </div>
    )
  }

  dataTablePinned() {
    let pinnedInvocations = this.state.pin
    console.log(this.state)
    const filteredData =  _.chain(Data)
    .orderBy('ei_name')
    .filter((invocation) => {
      return _.includes(pinnedInvocations['id'], invocation.ei_id)
    })
    .value()

    if (filteredData.length > 0) {
      return (
        <div className={"spell-wrap"}>
          <h1>Pinned Eldritch Invocations</h1>
          {_.orderBy(filteredData, 'ei_name').map((invocation, i) => {
            return (
              <div className={"spell-info"} key={i}>
                <div className={this.state.showListPinned === i ? "spell-dropdown" : "spell-dropdown hide-child"}>
                  <div className={"spell-name"} onClick={(e) => {this.addClassNamePinned(e, i)}}>
                    <span>{invocation.ei_name}</span>
                    <div className={"spell-tooltip"}>L: {invocation.ei_lvl}</div>
                  </div>
                  <svg className={"spell-remove-pin"} onClick={(e) => {this.removePin(invocation.ei_id)}} width="20" height="20" viewBox="0 0 12 16" version="1.1" aria-hidden="true"><path fillRule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
                  {(() => {
                    if (this.state.showListPinned === i) {
                      return (
                        <div className={"spell-definitions"}>
                          <div className={"spell-top-level"}>
                            <i>Prerequisites:</i>
                          </div>
                          <div className={"spell-details"}>
                            <div className={"spell-prerequisite"}><b>Warlock level:</b> {invocation.ei_lvl == null ? "none" : invocation.ei_lvl}</div>
                            <div className={"spell-prerequisite"}><b>Pact:</b> {invocation.ei_pact == null ? "none" : invocation.ei_pact}</div>
                            <div className={"spell-prerequisite"}><b>Spell:</b> {invocation.ei_prerequisite == null ? "none" : invocation.ei_prerequisite}</div>
                          </div>
                          <div className={"spell-description"}>{ReactHtmlParser(invocation.ei_description)}</div>
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
}

export default InvocationsTable
