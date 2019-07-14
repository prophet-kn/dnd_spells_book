import React, { Component } from 'react'
import '.././../App.css'
import Data from './../../data/spells.json'
import ReactHtmlParser from 'react-html-parser'
import _ from 'lodash'

let sortLevel = _.orderBy(Data, 's_lvl')
let uniqueLevel = _.uniqBy(sortLevel, 's_lvl')

let sortSchool = _.orderBy(Data, 's_school')
let uniqueSchool = _.uniqBy(sortSchool, 's_school')

let sortType = _.orderBy(Data, 's_type')
let uniqueType = _.uniqBy(sortType, 's_type')

let uniqueClass = _.chain(Data)
let printUniqueClass = uniqueClass.map(function(classes) {
  return classes.s_class_usage
})
.flatten()
.uniq()
.value()

class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      data: Data,
      filterType: 'All',
      filterClass: 'All',
      filterLevel: 'All',
      filterSchool: 'All',
      showList: false,
      showFilter: false,
      selectedSelector: false,
      selectedClass: false,
      selectedLevel: false,
      selectedSchool: false,
      filterSearch: ''
    }

    this.addSearchOption = this.addSearchOption.bind(this)
    this.addSelectionSelectorClass = this.addSelectionSelectorClass.bind(this)
    this.addClassSelectorClass = this.addClassSelectorClass.bind(this)
    this.addLevelSelectorClass = this.addLevelSelectorClass.bind(this)
    this.addSchoolSelectorClass = this.addSchoolSelectorClass.bind(this)
    this.addClassName = this.addClassName.bind(this)
    this.addFilterClass = this.addFilterClass.bind(this)
    this.selectorType = this.selectorType.bind(this)
    this.selectorClass = this.selectorClass.bind(this)
    this.selectorLevel = this.selectorLevel.bind(this)
    this.selectorSchool = this.selectorSchool.bind(this)
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

  addSelectionSelectorClass(e, i) {
    let currentSelection = this.state
    currentSelection.selectedSelector = currentSelection.selectedSelector === i ? false : i
    this.setState(currentSelection)
  }

  addClassSelectorClass(e, i) {
    let currentSelection = this.state
    currentSelection.selectedClass = currentSelection.selectedClass === i ? false : i
    this.setState(currentSelection)
  }

  addLevelSelectorClass(e, i) {
    let currentSelection = this.state
    currentSelection.selectedLevel = currentSelection.selectedLevel === i ? false : i
    this.setState(currentSelection)
  }

  addSchoolSelectorClass(e, i) {
    let currentSelection = this.state
    currentSelection.selectedSchool = currentSelection.selectedSchool === i ? false : i
    this.setState(currentSelection)
  }

  addSearchOption(e, i) {
    let currentSelection = this.state
    currentSelection.filterSearch = currentSelection.filterSearch === i ? false : i
    this.setState(currentSelection)
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

  selectorType() {
    return (
      <div>
        <h2>Effect Type</h2>
        <div className={"selector"}>
          <div className={'btn type'} value={"all"} onClick={(e) => {
            this.setState({
              filterType: e.target.innerHTML,
              selectedSelector: false
            })
            }}>All</div>
          {uniqueType.map((type, i) => {
            return (
              <div className={this.state.selectedSelector === i ? "btn type selected" : "btn type"} value={type.s_type} key={i} onClick={(e) => {
                this.addSelectionSelectorClass(e, i)
                this.setState({filterType: e.target.innerHTML})
              }}>{type.s_type}</div>
            );
          })}
        </div>
      </div>
    )
  }

   selectorClass() {
     return (
      <div>
        <h2>Class</h2>
        <div className={"selector"}>
          <div className={'btn class'} classtype={"all"} onClick={(e) => {
            this.setState({
              filterClass: e.target.innerHTML,
              selectedClass: false
            })
            }}>All</div>
          {_.orderBy(printUniqueClass).map((usedClasses, c) => {
            return <div className={this.state.selectedClass === c ? "btn class selected" : "btn class"} classtype={usedClasses} key={c} onClick={(e) => {
              this.addClassSelectorClass(e, c)
              this.setState({filterClass: e.target.innerHTML})
            }}>{usedClasses}</div>
          })}
        </div>
      </div>
     )
  }

  selectorLevel() {
    return (
      <div>
        <h2>Spell level</h2>
        <div className={"selector"}>
          <div className={'btn lvl'} value={"all"} onClick={(e) => {
            this.setState({
              filterLevel: e.target.innerHTML,
              selectedLevel: false
            })
            }}>All</div>
          {uniqueLevel.map((levels, i) => {
            return (
              <div className={this.state.selectedLevel === i ? "btn lvl selected" : "btn lvl"} value={levels.s_lvl} key={i} onClick={(e) => {
                this.addLevelSelectorClass(e, i)
                this.setState({filterLevel: e.target.innerHTML})
              }}>{levels.s_lvl}</div>
            );
          })}
        </div>
      </div>
    )
  }

  selectorSchool() {
    return (
      <div>
        <h2>School of Magic</h2>
        <div className={"selector"}>
          <div className={'btn school'} value={"all"} onClick={(e) => {
            this.setState({
              filterSchool: e.target.innerHTML,
              selectedSchool: false
            })
            }}>All</div>
          {uniqueSchool.map((school, i) => {
            return (
              <div className={this.state.selectedSchool === i ? "btn school selected" : "btn school"} school={school.s_school} key={i} onClick={(e) => {
                this.addSchoolSelectorClass(e, i)
                this.setState({filterSchool: e.target.innerHTML})
              }}>{school.s_school}</div>
            );
          })}
        </div>
      </div>
    )
  }

  dataTable() {
    const filteredData =  _.chain(Data)
    .orderBy('s_name')
    .filter((spell) => {
      return this.state.filterSchool.indexOf(spell.s_school) > -1 || this.state.filterSchool === 'All'
    })
    .filter((spell) => {
      return this.state.filterLevel.indexOf(spell.s_lvl) > -1 || this.state.filterLevel === 'All'
    })
    .filter((spell) => {
      return this.state.filterType.indexOf(spell.s_type) > -1 || this.state.filterType === 'All'
    })
    .filter((spell) => {
      return this.state.data.map(s => spell.s_class_usage).flat().indexOf(this.state.filterClass) > -1 || this.state.filterClass === 'All'
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
                  {this.selectorClass()}
                  {this.selectorLevel()}
                  {this.selectorSchool()}
                  {this.selectorType()}
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
