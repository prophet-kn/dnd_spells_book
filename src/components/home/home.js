import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SpellsTable from '../../components/data-table/spells-table'
import FeatsTable from '../../components/data-table/feats-table'
import DiceRolls from '../../components/dice-roll/dice-roll'
import NPCRandomizer from '../../components/npc-randomizer/npc-randomizer'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 'default',
      navigationToggle: false,
    }
  }

  pickView = (e) => {
    let thisView = e.currentTarget.getAttribute('view')

    this.setState({
      currentView: thisView
    })
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
          <span>Prophet&#39;s<br></br>Companion<br></br>v0.60:41ph4</span>
        </div>
        }
        <div className={'lander-button'} view={'spellsTable'} onClick={(e) => {this.pickView(e)}}>
          <span>List of Spells</span>
        </div>
        <div className={'lander-button'} view={'featsTable'} onClick={(e) => {this.pickView(e)}}>
          <span>List of Feats</span>
        </div>
        <div className={'lander-button'} view={'diceRoll'} onClick={(e) => {this.pickView(e)}}>
          <span>Dice Roll</span>
        </div>
        <div className={'lander-button'} view={'npcRandomizer'} onClick={(e) => {this.pickView(e)}}>
          <span>NPC Randomizer</span>
        </div>
        <div className={'lander-button disabled'} view={'monsterList'}>
          <span>Monster List</span>
        </div>
        <div className={'lander-button disabled'} view={'classFeatures'}>
          <span>Class Features</span>
        </div>
        <div className={'lander-button disabled'} view={'featsList'}>
          <span>List of Feats</span>
        </div>
        <div className={'lander-button disabled'} view={'characterSheet'}>
          <span>Character Sheet</span>
        </div>
        <div className={'lander-button disabled'} view={'musicBoard'}>
          <span>Music Board</span>
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
    else if (this.state.currentView === 'spellsTable') {
      return <SpellsTable />
    }
    else if (this.state.currentView === 'featsTable') {
      return <FeatsTable />
    }
    else if (this.state.currentView === 'diceRoll') {
      return <DiceRolls />
    }
    else if (this.state.currentView === 'npcRandomizer') {
      return <NPCRandomizer />
    }
  }

  render() {
    return (
      <Router>
        <div className={'dndapp-lander'}>
          <div className={'dndapp-menu'}>
            <div className={'lander-logo'}>
              <Link to={'/'} className="nav-link">Prophet&#39;s<br></br>Companion<br></br>v0.60:41ph4</Link>
            </div>
            <div className={'lander-button'} view={'spellsTable'} onClick={(e) => {this.pickView(e)}}>
              <Link to={'/spells'} className="nav-link">List of Spells</Link>
            </div>
            <div className={'lander-button'} view={'featsTable'} onClick={(e) => {this.pickView(e)}}>
              <Link to={'/feats'} className="nav-link">List of Feats</Link>
            </div>
            <div className={'lander-button'} view={'diceRoll'} onClick={(e) => {this.pickView(e)}}>
              <Link to={'/dice'} className="nav-link">Dice Roll</Link>
            </div>
            <div className={'lander-button'} view={'npcRandomizer'} onClick={(e) => {this.pickView(e)}}>
              <Link to={'/npcs'} className="nav-link">NPC Randomizer</Link>
            </div>
            <div className={'lander-button disabled'} view={'monsterList'}>
              <span>Monster List</span>
            </div>
            <div className={'lander-button disabled'} view={'classFeatures'}>
              <span>Class Features</span>
            </div>
            <div className={'lander-button disabled'} view={'featsList'}>
              <span>List of Feats</span>
            </div>
            <div className={'lander-button disabled'} view={'characterSheet'}>
              <span>Character Sheet</span>
            </div>
            <div className={'lander-button disabled'} view={'musicBoard'}>
              <span>Music Board</span>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default Home
