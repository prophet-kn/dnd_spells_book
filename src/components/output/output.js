import React, { Component } from 'react'
import DataTable from './../data-table/data-table'
import DiceRolls from './../dice-roll/dice-roll'

class Output extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 'default',
      navigationToggle: false,
    }

    this.escFunction = this.escFunction.bind(this)
  }

  toggleNavigation = () => {
    if (this.state.navigationToggle === false) {
      this.setState({
        navigationToggle: true
      })
    }
    else {
      this.setState({
        navigationToggle: false
      })
    }
  }

  pickView = (e) => {
    let thisView = e.currentTarget.getAttribute('view')

    this.setState({
      currentView: thisView
    })
  }

  escFunction(event) {
    if (event.keyCode === 27 && this.state.currentView !== 'default') {
      this.setState({currentView: 'default'})
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false)
  }

  navigation = () => {
  if (this.state.currentView !== 'default') {
      return (
        <div className={this.state.navigationToggle === false ? "dndapp-navigation" : "dndapp-navigation toggled"} onClick={() => this.toggleNavigation()}>
          <div className={"dndapp-navigation-burger"}>
            {this.state.navigationToggle === false
            ? <svg width="50" height="50" viewBox="0 0 8 16" className={"burger"}><path fillRule="evenodd" d="M8 4v1H0V4h8zM0 8h8V7H0v1zm0 3h8v-1H0v1z"></path></svg>
            : <svg width="30" height="30" viewBox="0 0 12 16"><path fillRule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
            }
          </div>
          {this.state.navigationToggle === false
          ?
            null
          :
            <div className={"dnd-navigation-menu"}>
              {this.menuItems()}
            </div>
          }
        </div>
      )
    }
  }

  menuItems = () => {
    return (
      <div className={"dndapp-menu"}>
        {this.state.currentView !== 'default'
        ?
          <div className={'lander-button'} view={'default'} onClick={(e) => {this.pickView(e)}}>
            <span>Prophet's Companion</span>
          </div>
        :
        <div className={'lander-logo'}>
          <span>Prophet&#39;s<br></br>Companion<br></br>v0.50:41ph4</span>
        </div>
        }
        <div className={'lander-button'} view={'dataTable'} onClick={(e) => {this.pickView(e)}}>
          <span>List of Spells</span>
        </div>
        <div className={'lander-button'} view={'diceRoll'} onClick={(e) => {this.pickView(e)}}>
          <span>Dice Roll</span>
        </div>
        <div className={'lander-button disabled'} view={'characterSheet'}>
          <span>Character Sheet</span>
        </div>
        <div className={'lander-button disabled'} view={'musicBoard'}>
          <span>Music Board</span>
        </div>
        <div className={'lander-button disabled'} view={'NPCRandomizer'}>
          <span>NPC Randomizer</span>
        </div>
      </div>
    )
  }

  showView = () => {
    if (this.state.currentView === 'default') {
      return (
        <div className={'dndapp-lander'}>
          {this.menuItems()}
          <div className={'dndapp-lander-extra'}>
            <span>You can help expanding the app by contributing to the open source repository.</span>
            <div className={'dndapp-lander-extra-button'}>
              <a href="https://github.com/prophet-kn/dnd_spells_book" target="_blank" rel="noopener noreferrer"><span>Contribute</span></a>
            </div>
          </div>
        </div>
      )
    }
    else if (this.state.currentView === 'dataTable') {
      return <DataTable />
    }
    else if (this.state.currentView === 'diceRoll') {
      return <DiceRolls />
    }
  }

  render() {
    return (
      <div className={"dndapp-wrapper"}>
        {this.navigation()}
        {this.showView()}
      </div>
    )

  }

}

export default Output
