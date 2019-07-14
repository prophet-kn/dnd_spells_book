
import React from 'react'
import _ from 'lodash'
// Stupid component, only knows about toggled true/false.
// tell parent when clicked
class Button extends React.Component {
  constructor(props) {
    this.state = {
      toggled: false
    }
  }
  onClick() {
    this.props.onClick(key, value)
    this.setState({
      toggled: this.toggled !== false ? true : false
    })
  }
  render() {
    const classNames === ['Button']
    if(this.state.toggled === true) {
      classNames.push('active')
    }
    return (
      <div className={classNames.join(' ')} onClick={this.onClick.bind(this)}>
        <span>{this.props.label}</span>
      </div>
    )
  }
}
//
class Filters extends React.Component {
  onClick(filter, value) {
    // paladin, false
    // wizard, true
    this.props.setFilter(this.props.type, filter, value)
  }
  render() {
    return (
      <div>
        <h3>{this.props.type}</h3>
        <Button label="Paladin" filterId="paladin"/>
      </div>
    )
  }
}
class DataTable extends React.Component {
  constructor(props) {
    this.state = {
      filters: []
    }
  }
  setFilter(type, filter, value) {
    const newFilters = this.state.filters
    if(!newFilters[type]) {
      newFilters[type] = []
    }
    if(value === true) {
      // Add
      newFilters[type].push(filter)
    } else {
      // Remove filter
      newFilters[type] = newFilters[type].filter(f => f !== filter)
    }

    this.setState({
      filters: newFilters
    })
  }
  render() {
    return (
      <div>
        <Filters type="Class" setFilter={this.setFilter}/>
        <Filters type="Spell level" setFilter={this.setFilter}/>
        <Filters type="School of magic" setFilter={this.setFilter}/>
        <Filters type="Effect type" setFilter={this.setFilter}/>
      </div>
    )
  }
}

/*
    get rid of multiple setState()
    and the filtering functional way
*/