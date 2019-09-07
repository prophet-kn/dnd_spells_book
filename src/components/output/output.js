import React, { Component } from 'react'
import DataTable from './../data-table/data-table'

class Output extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 'default'
    }
  }

  pickView(e) {
    const thisView = e.target.getAttribute('view')

    this.setState({
      currentView: thisView
    })
  }

  goBack = () => {
    if (this.state.currentView !== 'default') {
      return (
        <svg onClick={(e) => this.setState({currentView: 'default'})} width="30" height="30" className={"go-back"} viewBox="0 0 14 16" version="1.1" aria-hidden="true"><path fillRule="evenodd" d="M6 3.5c3.92.44 8 3.125 8 10-2.312-5.062-4.75-6-8-6V11L.5 5.5 6 0v3.5z"></path></svg>
      )
    }
  }

  showView = () => {
    if (this.state.currentView === 'default') {
      return (
        <div className={'dndapp-lander'}>
          <div className={'lander-button'} view={'dataTable'} onClick={(e) => {this.pickView(e)}}>
            List of Spells
          </div>
          <div className={'lander-button'} view={'diceRoll'} onClick={(e) => {this.pickView(e)}}>
            Dice Roll
          </div>
          <div className={'lander-button'} view={'soundEffects'} onClick={(e) => {this.pickView(e)}}>
            Sound Effects
          </div>
          <div className={'lander-button'} view={'characterSheet'} onClick={(e) => {this.pickView(e)}}>
            Character Sheet
          </div>
        </div>
      )
    }
    else if (this.state.currentView === 'dataTable') {
      return <DataTable/>
    }
  }

  render() {
    return (
      <div className={"dndapp-wrapper"}>
        {this.goBack()}
        {this.showView()}
      </div>
    )

  }

}

export default Output
